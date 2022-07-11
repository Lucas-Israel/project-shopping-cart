require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Se fetchProducts é uma função',() => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Se a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    expect.assertions(2);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalledTimes(2);
  });
  it('Se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect.assertions(2);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
    expect(await fetchProducts('computador')).not.toEqual('xablau');
  });
  it("Se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: 'You must provide an url'", async () => {
    expect.assertions(2);
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'));
    expect(failRequest).not.toEqual(new Error('You must provide'));
  });
});
