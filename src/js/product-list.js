import { productList, searchProducts } from './productList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const search = getParam('search');

if (category) {
  productList('.product-list', category);

  document.getElementById('priceSort').addEventListener('click', () => {
    productList('.product-list', category, 'price');
  });
  document.getElementById('nameSort').addEventListener('click', () => {
    productList('.product-list', category, 'name');
  });
}

//go to home page if search is pushed without a value
if (search.length === 0) {
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
