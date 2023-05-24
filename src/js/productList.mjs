import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">
      <span class="product-card__discount">
      -<span id="discount">${100 - Math.round(product.FinalPrice / product.SuggestedRetailPrice * 100)}</span>%</span>
       $${product.ListPrice} 
      <span class="product-card__original-price">List: $${product.SuggestedRetailPrice}</span></p></a>
  </li>`
}     

export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getData(category);
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML = category;
}