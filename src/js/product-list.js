import { productList, searchProducts } from './productList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const search = getParam('search');

// normal category product list
if (category) {
  productList('.product-list', category);

  // sort by price if it is
  document.getElementById('priceSort').addEventListener('click', () => {
    productList('.product-list', category, 'price');
  });

  document.getElementById('nameSort').addEventListener('click', () => {
    productList('.product-list', category, 'name');
  });
}

// searched product list
if (search != null && search.length === 0) {
  // go to homepage is search is pushed without a value.
  window.location.href = '/index.html';
} else if (search) {
  searchProducts(search, '.product-list');

  document.getElementById('priceSort').addEventListener('click', () => {
    searchProducts(search, '.product-list', 'price');
  });

  document.getElementById('nameSort').addEventListener('click', () => {
    searchProducts(search, '.product-list', 'name');
  });
}
