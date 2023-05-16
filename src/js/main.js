import productList from './productList.mjs';
import { getLocalStorage } from './utils.mjs';
import { updateCartItemCount } from './utils.mjs';

const selector = document.querySelector('.product-list');

productList('tents', selector);

updateCartItemCount();
