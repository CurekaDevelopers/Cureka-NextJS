import {
  setAccessToken,
  setShowLoginModel,
  setUserDetails,
} from "../slices/auth.slice";
import { setCartProducts, setWishlistProducts } from "../slices/customer.slice";
import { dispatch } from "../store";
import { pagePaths } from "../../utils/constants/constant";

export const logoutCustomer = (navigate) => {
  dispatch(setAccessToken(""));
  dispatch(setCartProducts([]));
  dispatch(setWishlistProducts([]));
  dispatch(setShowLoginModel(false));
  dispatch(setUserDetails({}));
  navigate.push(pagePaths.home);
};
