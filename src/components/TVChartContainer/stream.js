import { getNextTime } from '../../utils/chart';
import { BITQUERY_V1_KEY, BITQUERY_V2_KEY } from '../../config/apiKeys';

const BITQUERY_WS_URL = `wss://streaming.bitquery.io/eap?token=${BITQUERY_V2_KEY}`;

let bitqueryConnection = null;
const subscribes = new Map();

const getData = (_trades) => {
  if (_trades.length === 0) {
    return null;
  }
  const sortedTrades = _trades.sort((a, b) => new Date(a.Block.Time) - new Date(b.Block.Time));

  const volume = sortedTrades.reduce((acc, trade) => acc + Number(trade.Trade.Buy.Amount), 0);
  const low = Math.min(...sortedTrades.map(trade => trade.Trade.Sell.Price_in_terms_of_buy_currency));
  const high = Math.max(...sortedTrades.map(trade => trade.Trade.Sell.Price_in_terms_of_buy_currency));
  const open = sortedTrades[0].Trade.Sell.Price_in_terms_of_buy_currency;
  const close = sortedTrades[sortedTrades.length - 1].Trade.Sell.Price_in_terms_of_buy_currency;
  const time = sortedTrades[sortedTrades.length - 1].Block.Time;

  return {
    time,
    volume,
    low,
    high,
    open,
    close
  };
}

export const connectStream = () => {
  bitqueryConnection = new WebSocket(
    BITQUERY_WS_URL,
    ["graphql-ws"],
    {
      headers: {
        "Sec-WebSocket-Protocol": "graphql-ws",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BITQUERY_V1_KEY}`
      },
    }
  );

  const message = JSON.stringify({
    "type": "start",
    "id": "1",
    "payload": {
      "query": `
        subscription {
          EVM(network: matic) {
            DEXTrades(
              where: {Trade: {Sell: {Currency: {SmartContract: {is: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"}}}, Buy: {Currency: {SmartContract: {is: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"}}}}}
            ) {
              Block {
                Time
              }
              Trade {
                Buy {
                  Amount
                  Buyer
                  Seller
                  Price_in_terms_of_sell_currency: Price
                  Currency {
                    Name
                    Symbol
                    SmartContract
                  }
                  OrderId
                }
                Sell {
                  Amount
                  Buyer
                  Seller
                  Price_in_terms_of_buy_currency: Price
                  Currency {
                    Symbol
                    SmartContract
                    Name
                  }
                  OrderId
                }
                Dex {
                  ProtocolFamily
                  ProtocolName
                  SmartContract
                  ProtocolVersion
                }
              }
            }
          }
        }
      `,
      "variables": {}
    },
    "headers": {
      "Authorization": `Bearer ${BITQUERY_V1_KEY}`
    }
  });

  bitqueryConnection.onmessage = (event) => {
    const response = JSON.parse(event.data);
    console.log('response = ', response);

    if (response.type === 'data') {
      const priceData = getData(response.payload.data.EVM.DEXTrades);

      for (const key of subscribes.keys()) {
        const value = subscribes.get(key);
        const updatedTime = getNextTime(value.time, value.resolution);

        console.log('updatedTime = ', updatedTime)
        console.log('priceData.time = ', new Date(priceData.time).getTime())
        
        if (updatedTime <= new Date(priceData.time).getTime()) {
          priceData.time = updatedTime;
          value.time = updatedTime;
        } else {
          priceData.time = new Date(priceData.time).getTime();
          value.time = new Date(priceData.time).getTime();
        }

        console.log('priceData = ', priceData);
        
        value.callback(priceData);

        subscribes.set(key, value);
      }
    }
  };

  bitqueryConnection.onopen = function(event) {
    console.log('opened!!!');
    bitqueryConnection.send(message);
  };

  bitqueryConnection.onclose = () => {
    console.log("WebSocket disconnected. Retrying in 5 seconds...");
    // setTimeout(connectStream, 5000);
  };
}

export const disconnectStream = () => {
  if (bitqueryConnection) {
    bitqueryConnection.close();
  }
}

export const addSubscribe = (subscribeId, lastTime, resolution, callback) => {
  subscribes.set(subscribeId, {
    time: lastTime,
    resolution: resolution,
    callback: callback
  })
};

export const deleteSubscribe = (subscribeId) => {
  subscribes.delete(subscribeId);
}