import { renderListWithTemplate, getLocalStorage, updateCartItemCount, setLocalStorage } from './utils.mjs';


function cartItemTemplate(item, index) {
  // const newItem = `<li class="cart-card divider">
  const newItem = document.createElement('li');
  newItem.setAttribute('class','cart-card divider')
  //   <a href="#" class="cart-card__image">
  const cart_card__image = document.createElement('a')
  cart_card__image.setAttribute('class','cart-card__image')
  cart_card__image.setAttribute('href','#')
  //     <img
  //       src="${item.Images.PrimarySmall}"
  //       alt="${item.Name}"
  //     />
  const img = document.createElement('img')
  img.setAttribute('src',`${item.Images.PrimarySmall}`)
  img.setAttribute('alt',`${item.Name}`)
  cart_card__image.appendChild(img)
  //   </a>
  newItem.appendChild(cart_card__image)
  //   <a href="#">
  const a = document.createElement('a')
  a.setAttribute('href','#')
  //     <h2 class="card__name">${item.Name}</h2>
  const h2 = document.createElement('h2')
  a.setAttribute('class','card__name')
  a.innerHTML = item.Name
  a.appendChild(h2)
  //   </a>
  newItem.appendChild(a)
  //   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  let p = document.createElement('p')
  p.setAttribute('class','cart-card__color')
  p.innerHTML = item.Colors[0].ColorName
  newItem.appendChild(p)
  //   <p class="cart-card__quantity">qty: <button onClick=subtractQuantity>-</button>${item.Quantity}<button onClick=addQuantity>+</button> | <span id="removeFromCart" data-id="${item.Id}" data-index="${index}" class="cart-card__remove removeFromCart">X</span></p>
  const p2 = document.createElement('p')
  p2.setAttribute('class','cart-card__quantity')

  let subButton = document.createElement('input')
  subButton.type = 'button'
  subButton.innerHTML = '-'
  subButton.addEventListener('click',function addQuantity(e){
    const cartItems = getLocalStorage('so-cart');
    cartItems.forEach(product => {if(product.Id == item.Id){ item.Quantity += 1}})
  })
  
  let addButton = document.createElement('input')
  addButton.type = 'button'
  addButton.innerHTML = '+'
  addButton.addEventListener('click',function(){
    console.log('start')
    const cartItems = getLocalStorage('so-cart');
    cartItems.forEach(product => {if(product.Id == item.Id){ item.Quantity += 1}})
    setLocalStorage('so-cart',cartItems)
    location.reload()
    console.log('end')
  })

  // p2.innerHTML = `qty: ` + subButton.outerHTML + `${item.Quantity}` + addButton.outerHTML + ` | <span id="removeFromCart" data-id="${item.Id}" data-index="${index}" class="cart-card__remove removeFromCart">X</span>`
  p2.insertAdjacentHTML('afterbegin','qty: ')
  // p2.appendChild(subButton)
  p2.insertAdjacentHTML('beforeend',`${item.Quantity}`)
  // p2.appendChild()
  // p2.appendChild(addButton)
  p2.insertAdjacentHTML('beforeend',` | <span id="removeFromCart" data-id="${item.Id}" data-index="${index}" class="cart-card__remove removeFromCart">X</span>`)
  // print.appendChild(`)
  newItem.appendChild(p2)
  //   <p class="cart-card__price">$${item.FinalPrice}</p>
  let p3 = document.createElement('p')
  p3.setAttribute('class','cart-card__price')
  p3.innerHTML = `$${item.FinalPrice}`
  newItem.appendChild(p3)
  // </li>`;
  // console.log(newItem)
  let outerStuff = document.createElement('div')
  outerStuff.appendChild(newItem)
  return outerStuff.innerHTML;
}

export default function shoppingCart() {
  const cartItems = localStorage("so-cart");
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
}

// export function addQuantity(id) {
//   console.log(id)
//   // const cartItems = localStorage("so-cart");cartItems.forEach(item => if(item.Id == ${item.Id}){console.log(1)})">+</button> | <s id="removeFromCart" data-id="${item.Id}" data-index="${index}" class="cart-card__remove removeFromCart">X</s
// }
// export function subQuantity(id) {
//   console.log(id)
//   // const cartItems = localStorage("so-cart");cartItems.forEach(item => if(item.Id == ${item.Id}){console.log(1)})">+</button> | <s id="removeFromCart" data-id="${item.Id}" data-index="${index}" class="cart-card__remove removeFromCart">X</s
// }

const key = 'so-cart';

// Calculate the total of the cart items
function calculateTotal() {
  const cartItems = getLocalStorage('so-cart');
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += (cartItems[i].FinalPrice * cartItems[i].Quantity);
  }
  return total.toFixed(2);
}

function displayTotal() {
  // Calculate the total and insert it into the HTML element
  const totalAmount = document.getElementById('totalAmount');
  const total = calculateTotal();
  totalAmount.textContent = `$${total}`;
}

export function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems == null || cartItems.length == 0) {
    //console.log("empty");

    document.querySelector(
      '.product-list'
    ).innerHTML = `<h3>Find something exciting and add it!</h3>`;
  } else {
    const htmlItems = cartItems.map((item, index) =>
      cartItemTemplate(item, index)
    );

    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    document.querySelectorAll('.removeFromCart').forEach((item) => {
      item.addEventListener('click', removeFromCart);
    });
  }
}

function removeFromCart() {
  let currentArray = JSON.parse(localStorage.getItem(key));

  // remove by id
  // const id = event.target.getAttribute('data-id');
  // const currentObject = currentArray.find(item => item.Id === id);
  // const index = currentArray.indexOf(currentObject);

  // remove by index
  const index = event.target.getAttribute('data-index');

  currentArray.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(currentArray));

  renderCartContents();
  displayTotal();
  updateCartItemCount();
}

export function showCartItems() {
  // Check if the cart is empty
  const cartItems = getLocalStorage('so-cart');
  if (cartItems.length > 0) {
    // Show the cart footer
    const cartFooter = document.querySelector('.cart-footer');
    cartFooter.classList.remove('hide');
    displayTotal();
  }
}
