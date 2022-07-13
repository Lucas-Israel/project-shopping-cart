const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('1 - se é uma função ', () => {
    expect(typeof getSavedCartItems).toBe('function');
    expect(typeof getSavedCartItems).not.toBe('number');
  });
  it('2 - se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).not.toHaveBeenCalledTimes(2);
  });
  it('3 - se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro.', () => {
    getSavedCartItems('cardItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cardItems');
    expect(localStorage.getItem).not.toHaveBeenCalledWith('xablau');
  });
});
