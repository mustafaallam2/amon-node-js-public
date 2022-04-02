const { configParser } = require('../src/helpers/utils');

const getConfigObject = (sourceConfig) => ({
  API: {
    BASE_URL: configParser(sourceConfig, 'string', 'SERVICES_API_BASE_URL', 'http://localhost:3000'),
    PORT: configParser(sourceConfig, 'number', 'PORT', 3000),
    TIMEOUT: configParser(sourceConfig, 'number', 'SERVICES_API_TIMEOUT', 28), // in second
  },
  COINGECKO: {
  BASE_URL: configParser(sourceConfig, 'string', 'COINGECKO_API_BASE_URL', 'https://api.coingecko.com/api/v3/coins'),
  },
});

module.exports = {
  getConfigObject,
};
