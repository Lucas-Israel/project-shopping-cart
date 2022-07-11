require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('1 - Se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
    expect(typeof fetchItem).not.toBe('string');
  });
  it('2 - Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    expect.assertions(2);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalledTimes(2);
  });
  it('3 - Se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('4 - Se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    expect.assertions(1);
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  it('5 - Se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    expect.assertions(2);
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error('You must provide an url'));
    expect(failRequest).not.toEqual(new Error('You must provide'));
  });
});
