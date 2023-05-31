import productList from './productList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();
const category = getParam('category');
productList('.product-list', category);

document.getElementById('priceSort').addEventListener('click', () => {
  productList('.product-list', category, 'price');
});
document.getElementById('nameSort').addEventListener('click', () => {
  productList('.product-list', category, 'name');
});
