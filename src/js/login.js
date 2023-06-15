import { getParam, loadHeaderFooter } from './utils.mjs';
import { login } from './auth.mjs';



loadHeaderFooter();
const redirect = getParam('redirect');

document.forms['login'].addEventListener('submit', (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    // checkoutProcess.checkout(e.target);
    const email = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    login({ email, password }, redirect);
});


