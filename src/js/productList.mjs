import { getProductsByCategory } from './externalServices.mjs';
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
      -<span class="discount">${100 - Math.round(product.FinalPrice / product.SuggestedRetailPrice * 100)}</span>%</span>
       $${product.ListPrice} 
      <span class="product-card__original-price">List: $${product.SuggestedRetailPrice}</span></p></a>
  </li>`
}

export default async function productList(selector, category, sortType) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getProductsByCategory(category);

  // check for sortType and if there is one sort the products
  if (sortType == 'price') {

    // sort by price
    products.sort((p1, p2) => (p1.FinalPrice > p2.FinalPrice) ? 1 : (p1.FinalPrice < p2.FinalPrice) ? -1 : 0);

    // get the name of the current first card on the page
    let firstCardName = document.getElementsByClassName('card__name')[0]

    //compare it to the sorted first card
    if (firstCardName.innerHTML === products[0].Name) {

      // if it matches sort the other direction
      products.sort((p1, p2) => (p1.FinalPrice < p2.FinalPrice) ? 1 : (p1.FinalPrice > p2.FinalPrice) ? -1 : 0);
    }

  } else if (sortType == 'name') {

    //sort by name 
    products.sort((p1, p2) => (p1.Name > p2.Name) ? 1 : (p1.Name < p2.Name) ? -1 : 0);

    // get the name of the current first card on the page
    let firstCardName = document.getElementsByClassName('card__name')[0]

    //compare it to the sorted first card
    if (firstCardName.innerHTML === products[0].Name) {

      // if it matches sort the other direction
      products.sort((p1, p2) => (p1.Name < p2.Name) ? 1 : (p1.Name > p2.Name) ? -1 : 0);
    }
  }
  
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
  document.querySelector(".title").innerHTML = category;
}