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
  event.path[0].remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (event) => cartItemClickListener(event));
  return li;
};

const btnAdd = () => {
  const btAdd = document.querySelectorAll('button');
  const ol = document.querySelector('.cart__items');
  btAdd.forEach((btn) => btn.addEventListener('click', async () => {
    const item = await fetchItem(getSkuFromProductItem(btn.parentNode));
    const { id: sku, title: name, price: salePrice } = item;
    ol.appendChild(createCartItemElement({ sku, name, salePrice }));
  }));
};

const createProducts = async (numero) => {
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
    }
  });
  btnAdd();
};

window.onload = () => {
  createProducts(50);
};
