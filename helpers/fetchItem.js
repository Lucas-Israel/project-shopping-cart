const fetchItem = async (item) => {
  try {
    const url = `https://api.mercadolibre.com/items/${item}`;
    const promiseFetch = await fetch(url);
    const results = await promiseFetch.json();
    return results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
