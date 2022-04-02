'use strict';

module.exports = {
  async up (query, transaction) {
      const sql = `
      ALTER TABLE "Coin"
      "price" DOUBLE PRECISION,
      "price_last_sync" bigint
      "coingecko_id" VARCHAR(255)
      ADD CONSTRAINT Coin_code_unique UNIQUE (code);
    `;
    await transaction.sequelize.query(sql, { raw: true, transaction });
  },

  async down (query, transaction) {
    const sql = `
     ALTER TABLE "Coin"
     DROP "price",
     DROP "price_last_sync",
     DROP "coingecko_id",
     DROP CONSTRAINT Coin_code_unique;
   `;
    await transaction.sequelize.query(sql, { raw: true, transaction });
  }
};
