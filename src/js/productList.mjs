import { getProductsByCategory } from './externalServices.mjs';
import { renderListWithTemplate, clearHTMLWithMessage } from './utils.mjs';

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

export async function productList(selector, category, sortType) {
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

export async function searchProducts(searchString, selector, sortType) {
  const el = document.querySelector(selector);

  //get all products form the four categories
  const tents = await getProductsByCategory('tents');
  const sleepingBags = await getProductsByCategory('sleeping-bags');
  const hammocks = await getProductsByCategory('hammocks');
  const backpacks = await getProductsByCategory('backpacks');
  let products = tents.concat(sleepingBags, hammocks, backpacks);

  //search all the products for the search string
  searchString = searchString.toLowerCase();
  let searched = products.filter(function (el) {
    return el.Name.toLowerCase().includes(searchString);
  })

  if (searched.length == 0) {
    clearHTMLWithMessage('.products', `<h3>There are no items matching ${searchString}</h3>`)
  }

  // sort
  if (sortType == 'price') {
    searched.sort((p1, p2) => (p1.FinalPrice > p2.FinalPrice) ? 1 : (p1.FinalPrice < p2.FinalPrice) ? -1 : 0);
    let firstCardName = document.getElementsByClassName('card__name')[0]
    if (firstCardName.innerHTML === searched[0].Name) {
      searched.sort((p1, p2) => (p1.FinalPrice < p2.FinalPrice) ? 1 : (p1.FinalPrice > p2.FinalPrice) ? -1 : 0);
    }
  } else if (sortType == 'name') {
    searched.sort((p1, p2) => (p1.Name > p2.Name) ? 1 : (p1.Name < p2.Name) ? -1 : 0);
    let firstCardName = document.getElementsByClassName('card__name')[0]
    if (firstCardName.innerHTML === searched[0].Name) {
      searched.sort((p1, p2) => (p1.Name < p2.Name) ? 1 : (p1.Name > p2.Name) ? -1 : 0);
    }
  }

  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, searched);
  document.querySelector(".title").innerHTML = searchString;
}