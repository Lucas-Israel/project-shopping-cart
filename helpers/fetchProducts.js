const fetchProducts = async (nomeDoProduto) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${nomeDoProduto}`;
    const promiseFetch = await fetch(url);
    const results = await promiseFetch.json();
    return results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
