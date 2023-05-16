import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';
import { updateCartItemCount } from './utils.mjs';

const productId = getParam('product');

productDetails(productId);
updateCartItemCount();
