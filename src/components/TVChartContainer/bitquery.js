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
          options: {asc: "timeInterval.minute"}
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

export const GET_TOKEN_PRICE = (address, now, second, third, fourth, fifth, sixth, yesterday) => {
  return `
    {
      ethereum(network: matic) {
        now: dexTrades(
          options: {desc: ["block.height"], limit: 1}
          time: {till: "${now}"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
        ) {
          block {
            height
          }
          quotePrice
        }
        second: dexTrades(
          options: {desc: ["block.height"], limit: 1}
          time: {till: "${second}"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
        ) {
          block {
            height
          }
          quotePrice
        }
        third: dexTrades(
          options: {desc: ["block.height"], limit: 1}
          time: {till: "${third}"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
        ) {
          block {
            height
          }
          quotePrice
        }
        fourth: dexTrades(
          options: {desc: ["block.height"], limit: 1}
          time: {till: "${fourth}"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
        ) {
          block {
            height
          }
          quotePrice
        }
        fifth: dexTrades(
          options: {desc: ["block.height"], limit: 1}
          time: {till: "${fifth}"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
        ) {
          block {
            height
          }
          quotePrice
        }
        sixth: dexTrades(
          options: {desc: ["block.height"], limit: 1}
          time: {till: "${sixth}"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
        ) {
          block {
            height
          }
          quotePrice
        }
        yesterday: dexTrades(
          options: {desc: ["block.height"], limit: 1}
          time: {till: "${yesterday}"}
          baseCurrency: {is: "${address}"}
          quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
        ) {
          block {
            height
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
        sender: transactions(
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
          gasValue
          hash
          sender {
            address
          }
          address: to {
            address
          }
        }
        receiver: transactions(
          options: {desc: "block.timestamp.time", limit: ${limit}, offset: ${offset}}
          txTo: {is: "${address}"}
        ) {
          block {
            timestamp {
              time(format: "%Y-%m-%d %H:%M:%S")
            }
            height
          }
          success
          gasValue
          hash
          sender {
            address
          }
          address: to {
            address
          }
        }
      }
    }
  `
}

export const GET_ALL_TRANSACTIONS = (from, to, limit, offset) => {
  return `
    {
      ethereum(network: matic) {
        transactions(
          options: {desc: "block.timestamp.time", limit: ${limit}, offset: ${offset}}
          date: {since: "${from}", till: "${to}"}
        ) {
          block {
            timestamp {
              time(format: "%Y-%m-%d %H:%M:%S")
            }
            height
          }
          success
          gasValue
          hash
          sender {
            address
          }
          address: to {
            address
          }
        }
      }
    }
  `
}

export const GET_TOKENS_PRICE = (tokenList, today, yesterday) => {
  return `
    {
      ethereum(network: matic) {
        ${
          tokenList.map((token) => {
            return `
              ${token.id}_0: dexTrades(
                options: {desc: ["block.height"], limit: 1}
                date: {is: "${yesterday}"}
                baseCurrency: {is: "${token.currency.address === '-' ? '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' : token.currency.address}"}
                quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
              ) {
                timeInterval {
                  minute
                }
                quotePrice
              }
              ${token.id}_1: dexTrades(
                options: {desc: ["block.height"], limit: 1}
                date: {is: "${today}"}
                baseCurrency: {is: "${token.currency.address === '-' ? '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' : token.currency.address}"}
                quoteCurrency: {is: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}
              ) {
                timeInterval {
                  minute
                }
                quotePrice
              }
            `
          })
        }
      }
    }
  `
}