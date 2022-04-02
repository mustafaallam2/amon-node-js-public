const request = require("./request");
const { throwExposable } = require("./errors");
const config = require('../../config');

const geckoCoin = {

  async getCoinPriceById(coinId) {
    try {
      // await geckoCoin.getCoinIdByCode(coinData.code)
      const coinGeckoResult = await request.get(`${config.SERVICES.COINGECKO.BASE_URL}/${coinId}`)

      // ! the ?. will cause linting error
      return coinGeckoResult.body?.market_data?.current_price?.usd

    } catch (error) {

      throwExposable('too_busy')
    }
  },
  async getCoinIdByCode(coinCode) {

  try {
    const coinGeckoResult = await request.get(`${config.SERVICES.COINGECKO.BASE_URL}/list`)
  
    const coinId = coinGeckoResult.body?.find((c)=>{ return c.symbol?.toUpperCase() == coinCode?.toUpperCase() })?.id
    
    return coinId
    
  } catch (error) {
    throwExposable('too_busy')
  }
},
}

module.exports = geckoCoin;
