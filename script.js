const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createPriceDiv = () => {
  const cart = document.querySelector('.cart');
  const priceSec = createCustomElement('div', 'price-section', '');
  const priceDiv = createCustomElement('div', 'total-price', '');
  const priceText = createCustomElement('p', 'total-text', 'Valor Total R$:');
  cart.appendChild(priceSec);
  priceSec.appendChild(priceText);
  priceSec.appendChild(priceDiv);
};

const precoTotal = () => {
  const lista = document.querySelectorAll('li');
  const total = document.querySelector('.total-price');
  let soma = 0;
  lista.forEach((item) => {
    const string = item.innerText.replace(/.*\$/g, '');
    const value = Number(string);
    soma += value;
  });
  total.innerText = parseFloat(soma.toFixed(2));
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.composedPath()[0].remove();
};

const savingCartList = () => {
  const lista = document.querySelectorAll('li');
  const obj = {};
  lista.forEach((item, index) => {
    obj[index] = item.innerText;
  });
  saveCartItems(JSON.stringify(obj));
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => {
    cartItemClickListener(event);
    precoTotal();
    savingCartList();
  });
  return li;
};

const btnAdd = () => {
  const btAdd = document.querySelectorAll('.item__add');
  const ol = document.querySelector('.cart__items');
  btAdd.forEach((btn) => btn.addEventListener('click', async () => {
    const item = await fetchItem(getSkuFromProductItem(btn.parentNode));
    const { id: sku, title: name, price: salePrice } = item;
    ol.appendChild(createCartItemElement({ sku, name, salePrice }));
    savingCartList();
    precoTotal();
  }));
};

const createProducts = async (numero) => {
  const loading = document.querySelector('.loading');
  const lista = await fetchProducts('computador');
  const pai = document.getElementsByClassName('items');
  lista.results.forEach((produto, index) => {
    if (index < numero) {
      const item = createProductItemElement({
        sku: produto.id,
        name: produto.title,
        image: produto.thumbnail,
      });
      pai[0].appendChild(item);
      loading.remove();
    }
  });
  btnAdd();
};

// const listedItemToObject = (string) => {
//   const obj = {};
//   const replaced = string.replaceAll(' | ', ' ');
//   const skuVal = replaced.replaceAll(/ NAME: \w*.*/g, '').replaceAll('SKU: ', '');
//   const nameVal = replaced.replaceAll(/(.*\w*NAME: | PRICE: \$\w*.*)/g, '');
//   const salePriceVal = replaced.replaceAll(/.*PRICE: \$/g, '');
//   obj.sku = skuVal;
//   obj.name = nameVal;
//   obj.salePrice = salePriceVal;
//   return obj;
// };

// const loadCartItems = () => {
//   const load = getSavedCartItems('cartItems');
//   const ol = document.querySelector('.cart__items');
//   const loaded = JSON.parse(load);
//   try {
//     if (loaded === null) throw new Error('Não tem cache');
//     Object.values(loaded).forEach((item) => {
//       const li = createCartItemElement(listedItemToObject(item));
//       ol.appendChild(li);
//       });
//   } catch (error) {
//     return error;
//   }
// };

const loadCartItems = () => {
  const load = getSavedCartItems('cartItems');
  const ol = document.querySelector('.cart__items');
  const loaded = JSON.parse(load);
  try {
    if (loaded === null) throw new Error('Não tem cache');
    Object.values(loaded).forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = item;
      li.addEventListener('click', (event) => {
        cartItemClickListener(event);
        savingCartList();
      });
      ol.appendChild(li);
    });
  } catch (error) {
    return error;
  }
};

const limparCarrinho = () => {
  const btn = document.querySelector('.empty-cart');
  const lista = document.querySelector('ol');
  btn.addEventListener('click', () => {
    while (lista.firstChild) {
      lista.removeChild(lista.lastChild);
    }
    savingCartList();
    precoTotal();
  });
};

const loading = () => {
  const itemsSection = document.querySelector('.items');
  const div = createCustomElement('div', 'loading', 'carregando...');
  itemsSection.appendChild(div);
};

window.onload = () => {
  loading();
  createProducts(50);
  loadCartItems();
  createPriceDiv();
  precoTotal();
  limparCarrinho();
};
