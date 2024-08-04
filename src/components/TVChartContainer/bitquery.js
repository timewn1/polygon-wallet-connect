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

export const GET_COIN_BARS = (baseCurrency, quoteCurrency, from, to, resolution) => {
  return  `
    {
      ethereum(network: matic) {
        dexTrades(
          options: {asc: "timeInterval.minute", limit: 1000}
          date: {since: "${from}", till: "${to}"}
          baseCurrency: {is: "${baseCurrency}"},
          quoteCurrency: {is: "${quoteCurrency}"}
        ) 
        {
          timeInterval {
            minute(count: ${resolution}, format: "%Y-%m-%dT%H:%M:%SZ")  
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

export const GET_TOKEN_LIST = (address) => {
  return `
    {
      ethereum(network: matic) {
        address(address: {is: "${address}"}) {
          balance(in: USD)
          balances {
            currency {
              symbol
              name
              decimals
              properties
              tokenId
              tokenType
              address
            }
            value
          }
        }
      }
    }
  `
}

export const GET_TOKEN_PRICE = (address) => {
  return `
    {
      ethereum(network: matic) {
        dexTrades(
          options: {limit: 1, desc: "timeInterval.minute"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
        ) {
          timeInterval {
            minute(count: 1)
          }
          quotePrice
        }
      }
    }
  `
}

export const GET_TOKEN_HOLDERS = (tokenAddress) => {
  return `
    {
      EVM(network: matic, dataset: archive) {
        TokenHolders(
          date: "2024-08-01"
          tokenSmartContract: "${tokenAddress}"
          limit: { count: 10 }
          orderBy: { descending: Balance_Amount }
        ) {
          Holder {
            Address
          }
          Balance {
            Amount
          }
        }
      }
    }
  `;
}

export const GET_TRANSACTIONS = (address, limit, offset) => {
  return `
    {
      ethereum(network: matic) {
        transactions(
          options: {desc: "block.timestamp.time", limit: ${limit}, offset: ${offset}}
          txSender: {is: "${address}"}
        ) {
          block {
            timestamp {
              time(format: "%Y-%m-%d %H:%M:%S")
            }
            height
          }
          success
          address: to {
            address
            annotation
            smartContract {
              protocolType
              contractType
              currency {
                name
                symbol
              }
            }
          }
          gasValue
          gas_value_usd: gasValue(in: USD)
          gasCurrency {
            symbol
          }
          hash
          currency {
            address
            symbol
          }
        }
      }
    }
  `
}