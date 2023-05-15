import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems == null) {
    //console.log("empty");
    document.querySelector(
      '.product-list'
    ).innerHTML = `<h3>Find something exciting and add it!</h3>`;
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

// Calculate the total of the cart items
function calculateTotal() {
  const cartItems = getLocalStorage('so-cart');
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].FinalPrice;
  }
  return total;
}

function showCartItems() {
  // Check if the cart is empty
  const cartItems = getLocalStorage('so-cart');
  if (cartItems.length > 0) {
    // Show the cart footer
    const cartFooter = document.querySelector('.cart-footer');
    cartFooter.classList.remove('hide');

    // Calculate the total and insert it into the HTML element
    const totalAmount = document.getElementById('totalAmount');
    const total = calculateTotal();
    totalAmount.textContent = `$${total}`;
  }
}
showCartItems();
