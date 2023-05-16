import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.ListPrice}</p></a>
  </li>`
}     

export default function productList(category, selector){
    const data = getData(category);
    data.then((list) => {renderListWithTemplate(productCardTemplate, selector, list)});
}
