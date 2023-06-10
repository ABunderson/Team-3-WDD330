import { setLocalStorage, getLocalStorage, updateCartItemCount, alertMessage, clearHTMLWithMessage } from './utils.mjs';
import { findProductById } from './externalServices.mjs';

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  try {
    product = await findProductById(productId);
    // once we have the product details we can render out the HTML
    // check to make sure the product actually exists
    if (product) {
      console.log(product);
      renderProductDetails();

      // once the HTML is rendered we can add a listener to Add to Cart button
      document.getElementById("addToCart").addEventListener("click", addToCart);

    } else {
      // if the product does not exist do this
      clearHTMLWithMessage('.product-detail', `<h3>Uh oh! The selected item doesn't exist.</h3>`)
    }
  } catch (e) {
    console.log(e);
    // if the product does not exist do this
    clearHTMLWithMessage('.product-detail', `<h3>Uh oh! The selected item doesn't exist.</h3>`);
  }
}

function addToCart() {
  setLocalStorage("so-cart", product);
  updateCartItemCount();

  // Get the cart icon element
  const cartIcon = document.querySelector(".cartBackpack");

  alertMessage("added to cart!")
  // Add a CSS class to trigger the animation
  cartIcon.classList.add("cartAnimation");

  // Remove the animation class after a certain amount of time
  setTimeout(function () {
    cartIcon.classList.remove("cartAnimation");
  }, 500);

}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#suggestedPrice").innerText = product.SuggestedRetailPrice;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#discount").innerText = 100 - Math.round(product.FinalPrice / product.SuggestedRetailPrice * 100);
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

