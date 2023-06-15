import { checkLogin } from "../js/auth.mjs";
import currentOrders from "../js/currentOrders.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();
// currentOrders will need to send the token to the server with the request or it will be denied. if checkLogin will return the token upon success
const token = checkLogin();

currentOrders("#orders", token);