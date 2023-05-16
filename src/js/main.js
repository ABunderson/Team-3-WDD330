import productList from './productList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const selector = document.querySelector('.product-list');

productList('tents', selector);

loadHeaderFooter();
