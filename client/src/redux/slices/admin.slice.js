import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  articleType: [],
  preferenceType: [],
  standardSizeList: [],
  listStandardSize: [],
  productsList: [],
  categories: [],
  subCategories: [],
  subSubCategories: [],
  subSubSubCategories: [],
  articalTypes: [],
  concerns: [],
  abondedCart: [],
  allusers: [],
  concernsProduct: [],
  blogs: [],
  coupons: [],
  singleAdds: [],
  multipleAdds: [],
  curatedAdds: {
    CURATED: [],
    YOURSELF: []
  },
  ratingAndReviews: [],
  blogsComments: [],
  ratingAndReviews: [],
  policy: {
    policy_name: "",
    policy_content: "",
  },
  customerOrders: [],
  faqs: [],
  orders: [],
  employees: [],
  productOptions: [],
  loading: false,
  customerAdminOrders: [],
  adminPopupList: [],
  concernsPopup: [],
  adminWalletTransaction:[],
  healthPage:[],
  adminConcerns: [],

};

export const adminSliceName = "admin";

const adminSlice = createSlice({
  name: adminSliceName,
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setArticleType: (state, action) => {
      state.articleType = action.payload;
    },
    setPreferenceType: (state, action) => {
      state.preferenceType = action.payload;
    },
    setListStandardSize: (state, action) => {
      state.listStandardSize = action.payload;
    },
    setArticalTypes: (state, action) => {
      state.articalTypes = action.payload;
    },
    setStandardSizeList: (state, action) => {
      state.standardSizeList = action.payload;
    },
    setProductsList: (state, action) => {
      state.productsList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    setSubSubCategories: (state, action) => {
      state.subSubCategories = action.payload;
    },
    setSubSubSubCategories: (state, action) => {
      state.subSubSubCategories = action.payload;
    },
    setConcerns: (state, action) => {
      state.concerns = action.payload;
    },
    setabondedCart: (state, action) => {
      state.abondedCart = action.payload;
    },
    setallUsers: (state, action) => {
      state.allusers = action.payload;
    },
    setPreferences: (state, action) => {
      state.concerns = action.payload;
    },
    setConcernsProduct: (state, action) => {
      state.concernsProduct = action.payload;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setBlogsComments: (state, action) => {
      state.blogsComments = action.payload;
    },
    setPolicy: (state, action) => {
      state.policy = action.payload;
    },
    setHomePage: (state, action) => {
      state.healthPage = action.payload;
    },
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
    setRatingAndReviews: (state, action) => {
      state.ratingAndReviews = action.payload;
    },
    setCustomerOrders: (state, action) => {
      state.customerOrders = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setRatingAndReviews: (state, action) => {
      state.ratingAndReviews = action.payload;
    },
    setFaqs: (state, action) => {
      state.faqs = action.payload;
    },
    setSingleAdds: (state, action) => {
      state.singleAdds = action.payload;
    },
    setMultipleAdds: (state, action) => {
      state.multipleAdds = action.payload;
    },
    setCuratedAdds: (state, action) => {
      state.curatedAdds = action.payload;
    },
    setProductOptions: (state, action) => {
      state.productOptions = action.payload;
    },
    setAdminListOrders: (state, action) => {
      state.customerAdminOrders = action.payload;
    },
    setAdminPopupList: (state, action) => {
      state.adminPopupList = action.payload;
    },
    setConcernPopup: (state, action) => {
      state.concernsPopup = action.payload;
    },
    setWalletTransactions: (state, action) => {
      state.adminWalletTransaction= action.payload;
    },
    setAdminConcerns: (state, action) => {
      state.adminConcerns = action.payload;
    },
  },
});

const adminReducer = adminSlice.reducer;

export const {
  setBrands,
  setArticleType,
  setPreferenceType,
  setListStandardSize,
  setStandardSizeList,
  setProductsList,
  setCategories,
  setArticalTypes,
  setSubCategories,
  setSubSubCategories,
  setSubSubSubCategories,
  setConcerns,
  setabondedCart,
  setallUsers,
  setPreferences,
  setConcernsProduct,
  setBlogs,
  setBlogsComments,
  setPolicy,
  setLoading,
  setCoupons,
  setEmployees,
  setRatingAndReviews,
  setCustomerOrders,
  setFaqs,
  setSingleAdds,
  setCuratedAdds,
  setProductOptions,
  setMultipleAdds,
  setAdminListOrders,
  setAdminPopupList,
  setConcernPopup,
  setWalletTransactions,
  setHomePage,
  setAdminConcerns
} = adminSlice.actions;

export default adminReducer;
