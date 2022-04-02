const { getCoinPriceById, getCoinIdByCode } = require('../../../helpers/coingecko');
const errors = require('../../../helpers/errors');
const Models = require('../../../models/pg');
const moment = require('moment')
const CoinController = {
  async getCoinByCode(coinCode) {
    const coin = await Models.Coin.findByCoinCode(coinCode);

    errors.assertExposable(coin, 'unknown_coin_code');

    const currentUtcTime = +moment.utc().format('X')

    const isPriceUpdated = coin.price && coin.price_last_sync - currentUtcTime < 3600 
    
    if(isPriceUpdated){
      return coin.filterKeys();
    }
    
    let coingecko_id = coin.coingecko_id

    if(!coingecko_id) {
      coingecko_id = await getCoinIdByCode(coin.code)
      coin.update({
        coingecko_id
      }).catch(()=>{})
    }

    const coinPrice = await getCoinPriceById(coingecko_id)
    const price_last_sync = +moment.utc().format('X')
    
    await coin.update({
      price: coinPrice,
      price_last_sync
    })

    return coin.filterKeys();
    
  },

  async createCoin(coinData) {
    const foundCoin = await Models.Coin.findByCoinCode(coinData.code);
    
    errors.assertExposable(!foundCoin, 'coin_already_exists');
    
    const createdCoin = await Models.Coin.create(coinData);
    
    return createdCoin.filterKeys();
  },
};

module.exports = CoinController;
