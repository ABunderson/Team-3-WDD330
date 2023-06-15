import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = 'so-token';

export async function login(creds, redirect = '/') {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        // because of the default arg provided above...if no redirect is provided send them Home.
        // window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message);
    }
}

export function isTokenValid(token) {
    // check to make sure a token was actually passed in.
    if (token) {
        // decode the token
        const decoded = jwt_decode(token);
        // get the current date
        let currentDate = new Date();
        // JWT exp is in seconds, the time from our current date will be milliseconds.
        if (decoded.exp * 1000 < currentDate.getTime()) {
            //token expiration has passed
            console.log("Token expired.");
            return false;
        } else {
            // token not expired
            console.log("Valid token");
            return true;
        }
        //no token...automatically return false.
    } else return false;
}

export function checkLogin() {
    console.log("login process")
    const token = getLocalStorage(tokenKey);
    const valid = isTokenValid(token);
    if (!valid) {
        localStorage.removeItem(tokenKey);
        const location = window.location;
        window.location = `/login/index.html?redirect=${location.pathname}`;
    } else {
        return token;
    }
}