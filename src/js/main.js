import productList from './productList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import Alert from './alert.js';
const selector = document.querySelector('.product-list');
loadHeaderFooter();
productList('tents', selector);

const alertInstance = new Alert();
alertInstance.fetchAlertsData().then(() => alertInstance.createAlertElements());
