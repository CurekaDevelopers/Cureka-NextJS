import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filter: [],
  loading: false,
  blogs: [],
  productPaginationData: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    itemsPerPage: 0,
  },
  nestedCategories: [],
  cartProducts: [],
  LastProducts: [],
  LikeProducts: [],
  wishlistProducts: [],
  coupons: [],
  address: [],
  ratingAndReviews: [],
  curatedProducts: [],
  cartPopup: [],
  categoryPopup: []
};

export const customerSliceName = "customer";

const customerSlice = createSlice({
  name: customerSliceName,
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCatdata: (state, action) => {
      state.catadata = action.payload;
    },
    setFilters: (state, action) => {
      state.filter = action.payload;
    },
    setProductPaginationData: (state, action) => {
      state.productPaginationData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setNestedCategories: (state, action) => {
      state.nestedCategories = action.payload;
    },
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
    setLastProducts: (state, action) => {
      state.LastProducts = action.payload;
    },
    setLikeProducts: (state, action) => {
      state.LikeProducts = action.payload;
    },
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
    setWishlistProducts: (state, action) => {
      state.wishlistProducts = action.payload;
    },
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingProductIndex = state.cartProducts.findIndex(
        (product) => product.product_id === productToAdd.product_id,
      );

      if (existingProductIndex !== -1) {
        state.cartProducts[existingProductIndex].quantity += productToAdd.quantity || 1;
      } else {
        state.cartProducts.push(productToAdd);
      }
    },
    addToWishlist: (state, action) => {
      const productToAdd = action.payload;
      const existingProductIndex = state.wishlistProducts.findIndex(
        (product) => product.product_id === productToAdd.product_id,
      );

      if (existingProductIndex !== -1) {
        // state.wishlistProducts[existingProductIndex].quantity += productToAdd.quantity || 1;
      } else {
        state.wishlistProducts.push(productToAdd);
      }
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const updatedCartProducts = state.cartProducts.filter(
        (product) => product.product_id !== productIdToRemove,
      );
      state.cartProducts = updatedCartProducts;
    },
    removeFromWishlist: (state, action) => {
      const productIdToRemove = action.payload;
      const updatedWishlistProducts = state.wishlistProducts.filter(
        (product) => product.product_id !== productIdToRemove,
      );
      state.wishlistProducts = updatedWishlistProducts;
    },
    setRatingAndReviews: (state, action) => {
      state.ratingAndReviews = action.payload;
    },
    setCuratedProducts: (state, action) => {
      state.curatedProducts = action.payload;
    },
    setCartPopup: (state, action) => {
      state.cartPopup = action.payload;
    },
    setCategoryPopup: (state, action) => {
      state.categoryPopup = action.payload;
    },
  },
});

const customerReducer = customerSlice.reducer;

export const {
  setProducts,
  setCatdata,
  setFilters,
  setLoading,
  setProductPaginationData,
  setBlogs,
  setNestedCategories,
  setCartProducts,
  setLastProducts,
  setLikeProducts,
  addToCart,
  setWishlistProducts,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
  setCoupons,
  setAddress,
  setRatingAndReviews,
  setCuratedProducts,
  setCartPopup,
  setCategoryPopup
} = customerSlice.actions;

export default customerReducer;
