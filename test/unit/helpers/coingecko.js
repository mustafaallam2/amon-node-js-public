const { getCoinIdByCode, getCoinPriceById } = require("../../../src/helpers/coingecko");




describe('Helpers: coingecko', () => {

  it('should get coin id by code correctly', async ()=>{

    const correctCoinId = await getCoinIdByCode('BTC');
    
    expect(correctCoinId).equal('bitcoin');
    
    const incorrectCoinId = await getCoinIdByCode();
    
    expect(incorrectCoinId).equal(undefined);
  
  })

  it('should get coin price by id correctly', async ()=>{

    const coinPrice = await getCoinPriceById('bitcoin');
    
    expect(typeof coinPrice).equal('number');
    
  })

});
