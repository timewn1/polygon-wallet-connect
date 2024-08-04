const API_KEY = 'BQY9E9fPMVK8GNWijhWqsAo6WauDcRQ5';

export async function fetchMaticPrices(baseCurrency: string, quoteCurrency: string) {
    const endTime = Math.floor(Date.now() / 1000);
    const startTime = endTime - 3600;

    // const query = `
    // {
    //   ethereum(network: matic) {
    //     dexTrades(
    //       baseCurrency: {is: "0x0000000000000000000000000000000000001010"}
    //       quoteCurrency: {is: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"}
    //       time: {between: ["${new Date(startTime * 1000).toISOString()}", "${new Date(endTime * 1000).toISOString()}"]}
    //     ) {
    //       timeInterval {
    //         second(count: 5)
    //       }
    //       quotePrice
    //     }
    //   }
    // }
    // `;

    const query = `{
        ethereum(network: matic) {
            dexTrades(
                options: {asc: "timeInterval.second"}
                time: {between: ["${new Date(startTime * 1000).toISOString()}", "${new Date(endTime * 1000).toISOString()}"]}
                baseCurrency: {is: "${baseCurrency}"},
                quoteCurrency: {is: "${quoteCurrency}"},
                tradeAmountUsd: {gt: 10}
            ) 
            {
                timeInterval {
                    second(count: 15, format: "%Y-%m-%dT%H:%M:%SZ")  
                }
                volume: quoteAmount
                high: quotePrice(calculate: maximum)
                low: quotePrice(calculate: minimum)
                open: minimum(of: block, get: quote_price)
                close: maximum(of: block, get: quote_price) 
            }
        }
    }`

    const response = await fetch('https://graphql.bitquery.io/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    console.log(data);
    return data.data?.ethereum?.dexTrades?.map((trade: any) => ({
        time: trade.timeInterval?.second, 
        open: trade.open, 
        high: trade.high, 
        low: trade.low, 
        close: trade.close 
    }));
}

export async function fetchLatestMaticPrice() {
    const query = `
    {
      ethereum(network: matic) {
        dexTrades(
          baseCurrency: {is: "0x0000000000000000000000000000000000001010"}
          quoteCurrency: {is: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"}
          options: {desc: "block.timestamp.time", limit: 1}
        ) {
          block {
            timestamp {
              time(format: "%Y-%m-%dT%H:%M:%S")
            }
          }
          quotePrice
        }
      }
    }
    `;

    const response = await fetch('https://graphql.bitquery.io/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    const price = data.data.ethereum.dexTrades[0].quotePrice;
    const time = new Date(data.data.ethereum.dexTrades[0].block.timestamp.time).getTime() / 1000;
    return { time, value: price };
}
