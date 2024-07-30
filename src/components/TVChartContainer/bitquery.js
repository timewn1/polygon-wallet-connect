export const endpoint = 'https://graphql.bitquery.io';    

export const GET_COIN_INFO = (baseCurrency, quoteCurrency) => {
  return `
  {
    ethereum(network: matic) {
      dexTrades(
        options: {desc: ["block.height", "transaction.index"], limit: 1}
        baseCurrency: {is: "${baseCurrency}"}
        quoteCurrency: {is: "${quoteCurrency}"}
      ) 
      {
        block {
          height
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S") 
          }
        }
        transaction {
          index
        }
        baseCurrency {
          name
          symbol
          decimals
        }
        quoteCurrency {
          name
          symbol
          decimals
        }
        quotePrice
      }
    }
  }
  `; 
}

export const GET_COIN_BARS = (baseCurrency, quoteCurrency, from, to) => {
  return  `
    {
      ethereum(network: matic) {
        dexTrades(
          options: {asc: "timeInterval.minute"}
          date: {since: "${from}", till: "${to}"}
          baseCurrency: {is: "${baseCurrency}"},
          quoteCurrency: {is: "${quoteCurrency}"},
          tradeAmountUsd: {gt: 10}
        ) 
        {
          timeInterval {
            minute(count: 1, format: "%Y-%m-%dT%H:%M:%SZ")  
          }
          volume: quoteAmount
          high: quotePrice(calculate: maximum)
          low: quotePrice(calculate: minimum)
          open: minimum(of: block, get: quote_price)
          close: maximum(of: block, get: quote_price) 
        }
      }
    }
    `; 
}