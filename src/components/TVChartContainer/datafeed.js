import axios from 'axios'

import * as Bitquery from './bitquery';
import { addSubscribe, deleteSubscribe } from './stream';
import { BITQUERY_V1_KEY } from '../../config/apiKeys';

import { getResolutionValue } from '../../utils/chart';

const configurationData = {
  supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'],
}

let lastTime = '';

export default {
  // This method is used by the Charting Library to get a configuration of your datafeed
  // (e.g. supported resolutions, exchanges and so on)
  onReady: (callback) => {
    console.log('[onReady]: Method called!!')
    setTimeout(() => callback(configurationData))
  },
  // This method is used by the library to retrieve information about a specific symbol
  // (exchange, price scale, full symbol etc.).
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback,
  ) => {
    const tokens = symbolName.split(",");
    const data = JSON.stringify({
      query: Bitquery.GET_COIN_INFO(tokens[0] || "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", tokens[1] || "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"),
      variables: {
        tokenAddress: symbolName,
      },
    })
    var config = {
      method: 'post',
      url: 'https://graphql.bitquery.io',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': BITQUERY_V1_KEY,
        "mode" : "*"
      },
      data: data,
    }
    const response = await axios(config)

    const coin = response.data.data.ethereum.dexTrades?.[0]?.baseCurrency
    const quoteCoin = response.data.data.ethereum.dexTrades?.[0]?.quoteCurrency

    if (!coin) {
      // onResolveErrorCallback()
      console.log("Could not found chart data")
    } else {
      const symbol = {
        ticker: symbolName,
        name: `${coin.symbol}/${quoteCoin.symbol}`,
        session: '24x7',
        timezone: 'Etc/UTC',
        minmov: 1,
        pricescale: 10000000,
        has_intraday: true,
        intraday_multipliers: ['1', '5', '15', '30', '60'],
        has_empty_bars: true,
        has_weekly_and_monthly: false,
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 1,
        data_status: 'streaming',
      }
      onSymbolResolvedCallback(symbol)
    }
  },
  // This method is used by the charting library to get historical data for the symbol.
  getBars: async (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    first,
  ) => {
    try {
      const tokens = symbolInfo.ticker.split(",");
      const data = JSON.stringify({
        query: Bitquery.GET_COIN_BARS(tokens[0] || "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", tokens[1] || "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", new Date(from*1000).toISOString() , new Date(to*1000).toISOString(), getResolutionValue(resolution) ),
      })
      var config = {
        method: 'post',
        url: 'https://graphql.bitquery.io',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': BITQUERY_V1_KEY,
        },
        data: data,
      }
      const response2 = await axios(config)
      const trades = response2.data.data.ethereum.dexTrades;

      if (trades && trades.length) {
        const bars = trades.map((el) => ({
          time: new Date(el.timeInterval.minute).getTime(), // date string in api response
          low: el.low,
          high: el.high,
          open: Number(el.open),
          close: Number(el.close),
          volume: el.volume,
        }))
  
        lastTime = trades[trades.length - 1].timeInterval.minute;

        console.log('lastTime = ', lastTime);
  
        if (bars.length) {
          onHistoryCallback(bars, { noData: false })
        } else {
          onHistoryCallback(bars, { noData: true })
        }
      }
    } catch (err) {
      console.log({ err })
      // onErrorCallback(err)
    }
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeID,
    onResetCacheNeededCallback,
  ) => {
    console.log('[subscribeBars]: Method call with subscriberUID:', subscribeID);

    addSubscribe(subscribeID, lastTime, resolution, onRealtimeCallback);
  },
  unsubscribeBars: (subscribeID) => {
    deleteSubscribe(subscribeID);
  },
}