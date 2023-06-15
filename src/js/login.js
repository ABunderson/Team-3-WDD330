import { getParam, loadHeaderFooter } from './utils.mjs';



loadHeaderFooter();
const redirect = getParam('redirect');


document.querySelector("#loginsubmit").addEventListener("click", (e) => {
    // const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log("click");
    console.log(password);
    // login({ email, password }, redirect);

});

