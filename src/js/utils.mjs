// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  let currentArray = JSON.parse(localStorage.getItem(key)) || [];

  currentArray.push(data);
  localStorage.setItem(key, JSON.stringify(currentArray));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = true ){
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(template, parentElement, data, position = 'afterbegin', clear = true ){
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlString = await template(data);
  parentElement.insertAdjacentHTML(position, htmlString); 
  updateCartItemCount();
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
      const res = await fetch(path);
      
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerLocation = document.querySelector("#main-header");
  const footerLocation = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplateFn, headerLocation);
  renderWithTemplate(footerTemplateFn, footerLocation);
}

export function updateCartItemCount() {
  const cartItems = getLocalStorage('so-cart');
  const cartItemCount = document.getElementById('cartItemCount');
  
  // Update the count
  cartItemCount.textContent = cartItems.length;
  
  // Show/hide based on cart items
  if (cartItems.length > 0) {
    cartItemCount.classList.remove('hide');
  } else {
    cartItemCount.classList.add('hide');
  }
};
export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function clearHTMLWithMessage(selector, message) {
  let htmlEl = document.querySelector(selector);
  // clear the html where the product would be
  htmlEl.innerHTML = "";
  //add an error message
  htmlEl.innerHTML = message;
}