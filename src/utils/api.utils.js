import axios from "axios";
import Cookies from "js-cookie";
import { env } from "../../src/config/env.config.js";
import { logoutCustomer } from "../redux/action/auth.action";
import store from "../redux/store";
import { apiUrls } from "../utils/constants/api.constants.js";

// Function to get Google Analytics Client ID (runs only in the browser)
const getClientIdFromCookie = () => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const gaCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_ga="));

    if (gaCookie) {
      const gaValue = gaCookie.split("=")[1];
      const parts = gaValue.split(".");
      if (parts.length > 2) {
        return `${parts[2]}.${parts[3]}`;
      }
    }
  }
  return null;
};

// Get or set a temporary cookie value
const getOrSetTempData = () => {
  if (typeof window !== "undefined") {
    let existingCookie = Cookies.get("cookieValue");

    if (!existingCookie) {
      existingCookie = Date.now();
      Cookies.set("cookieValue", existingCookie, { expires: 2 }); // Expires in 2 days
    }

    return parseInt(existingCookie);
  }
  return null; // Avoid SSR issues
};

const tempData = getOrSetTempData();

const api = axios.create({
  withCredentials: true,
  baseURL: env.REACT_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logoutCustomer();
      const customError = new Error("Please log in first");
      customError.response = error.response;
      return Promise.reject(customError);
    }
    return Promise.reject(error);
  }
);

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = store.getState().auth.accessToken;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const specificApiUrls = [apiUrls.cart]; // Add specific API endpoints
      if (specificApiUrls.some((apiUrl) => config.url.includes(apiUrl))) {
        config.headers["TempData"] = tempData;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// import axios from "axios";
// import Cookies from "js-cookie";
// import { env } from "../../src/config/env.config.js";
// import { logoutCustomer } from "../redux/action/auth.action";
// import store from "../redux/store";
// import { apiUrls } from "../utils/constants/api.constants";
// const getTheCookie = Cookies.get("cookieValue");
// const getClientIdFromCookie = () => {
//   const gaCookie = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("_ga="));

//   if (gaCookie) {
//     const gaValue = gaCookie.split("=")[1];
//     const parts = gaValue.split(".");
//     if (parts.length > 2) {
//       return `${parts[2]}.${parts[3]}`;
//     }
//   }
//   return null;
// };
// var tempData;
// let gg = getClientIdFromCookie();
// console.log(gg, "Google");
// if (getTheCookie) {
//   // sending exsting value cookie
//   tempData = getTheCookie ? parseInt(getTheCookie) : Date.now();
// } else {
//   // creating new cookie
//   tempData = getTheCookie ? parseInt(getTheCookie) : Date.now();
//   Cookies.set("cookieValue", tempData, { expires: 2 }); //expires in 2 days
// }

// const api = axios.create({
//   withCredentials: true,
//   baseURL: env.REACT_SERVER_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       logoutCustomer();
//       const customError = new Error("Please log in first");
//       customError.response = error.response;
//       return Promise.reject(customError);
//     }

//     return Promise.reject(error);
//   }
// );

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = store.getState().auth.accessToken;

//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     const specificApiUrls = [apiUrls.cart]; // Add your specific endpoints here
//     if (specificApiUrls.some((apiUrl) => config.url.includes(apiUrl))) {
//       config.headers["TempData"] = tempData;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;
