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
  if (key == 'so-cart') {
    let currentArray = JSON.parse(localStorage.getItem(key)) || [];
    let isFound = false;
    currentArray.forEach(item => {
      console.log(item)
      if(item.Id == data.Id){
        isFound = true
        if (!item.Quantity){
          item.Quantity = 1
        }
        else{
          item.Quantity += 1
        }
      }
    })
    if(!isFound){
      data.Quantity = 1
      currentArray.push(data);
    }

    localStorage.setItem(key, JSON.stringify(currentArray));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(template, parentElement, data, position = 'afterbegin', clear = true) {
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
  let totalNumberOfItems = 0
  cartItems.forEach(product =>{
    totalNumberOfItems += product.Quantity
  })

  // Update the count
  cartItemCount.textContent = totalNumberOfItems;

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

function sendEmail(){
  let email = document.getElementById('email')
  setLocalStorage('email',email)
}
let submit = document.getElementById('newsletter-submit')
submit.setAttribute('onClick',sendEmail)
export function loadBreadcrumbs(mainList, item) {
  // get header
  const header = document.getElementById('main-header');

  // create div
  let div = document.createElement('div');
  div.setAttribute('id', 'breadcrumb-div')

  //create p
  let p = document.createElement('p');

  // create breadcrumb
  let breadcrumb;
  // if the item sent is an array it is from the product list page and should have a number of items
  if (Array.isArray(item)) {
    breadcrumb = `<p><span class="capitalize">${mainList}</span>->(${item.length} items)</p>`;
  } else {
    // if it is just a single item then it should have the item name
    breadcrumb = `<p><span class="capitalize">${mainList}</span>->${item}</p>`;
  }
  p.innerHTML = breadcrumb;

  // put it all together
  header.after(div);
  div.appendChild(p);

  // save the category for later
  setLocalStorage('so-bread', mainList)
}
