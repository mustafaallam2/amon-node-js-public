const path = require('path');
const sinon = require('sinon');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
const CoinController = require(path.join(srcDir, '/services/api/controllers/coin'));
const DB = require(path.join(srcDir, 'modules/db'));

describe('Controller: Coin', () => {
  let sandbox = null;

  sequelizeMockingMocha(DB.sequelize, [path.resolve('test/mocks/coins.json')], { logging: false });

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  describe('getCoinByCode', () => {
    it('should get coin by code', async () => {
      const coinCode = 'BTC';
      const coin = await CoinController.getCoinByCode(coinCode);

      expect(coin.code).to.eq(coinCode);
      expect(Object.keys(coin).length).to.eq(3);
    });

    it('should fail get coin by code', async () => {
      const coinCode = 'AMN';
      expect(CoinController.getCoinByCode(coinCode)).to.be.rejectedWith(Error, 'unknown_coin_code');
    });
  });


  describe('creatCoin', () => {
    it('should not create coin with existing code successfully', async () => {
      const coinData = {
        code: 'BTC',
        name: 'bitcoin'
      };
      expect(CoinController.createCoin(coinData)).to.be.rejectedWith(Error, 'coin_already_exists');

    });

    it('should create coin successfully', async () => {
      const coinData = {
        code: 'BTC2',
        name: 'bitcoin'
      };

      const coin = await CoinController.createCoin(coinData);

      expect(coin.code).to.eq('BTC2');
      expect(Object.keys(coin).length).to.eq(2);
    });

  });
});
