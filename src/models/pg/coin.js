const { v4: uuid } = require('uuid');
const { pick } = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Coin = sequelize.define(
    'Coin',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuid(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      // ! should be indexed
      price_last_sync: {
        type: DataTypes.BIGINT,
      },
      coingecko_id: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  Coin.prototype.filterKeys = function () {
    const obj = this.toObject();
    const filtered = pick(obj, 'name', 'code','price');

    return filtered;
  };

  Coin.findByCoinCode = function (code, tOpts = {}) {
    return Coin.findOne(Object.assign({ where: { code } }, tOpts));
  };

  // Coin.createCoin = function (coinData) {
  //   return Coin.create(coinData);
  // };

  return Coin;
};
