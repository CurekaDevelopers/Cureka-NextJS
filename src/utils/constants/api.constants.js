import urlJoin from "url-join";

export const basePath = "/api/v1/";

export const apiUrls = {
  adminLogin: "/login",
  nonAdminLogin: "/nonAdminLogin",
  brands: "/brands",
  articleTypeList: "/admin-artical-type/list", // list artical types
  fetchArticalTypes: "/admin-artical-type/list",
  fetchPreferenceTypes: "/admin-preference/list",
  standardSizeList: "/admin-artical-type/listStandardSize",
  productsList: "/products",
  fetchCustomerOrders: "/api/v1/checkout/orders", // fetch customer orders
  addProductAdmin: "/admin-product-management/addProduct",
  addProductSizeAdmin: "/admin-product-management/addsize-product",
  productReport: "/curated-products/fetch-product-report",
  updateArticleType: (id) => `/admin-artical-type/editArticalType/${id}`,
  deleteArticleType: (id) => `/admin-artical-type/deleteArticalType/${id}`,
  deleteArticalType: (id) => `/admin-artical-type/deleteArticalType/${id}`,
  deletePreferenceType: (id) => `/admin-preference/deletePreference/${id}`,
  editProductAdmin: (id) => `/admin-product-management/update-products/${id}`,
  productListForAdmin: "/admin-fetch-products",
  deleteProducts: (id) => `/admin-product-management/delete-product/${id}`,
  deleteBrands: (id) => `/brands/${id}`,
  updateBrands: (id) => `/brands/${id}`,
  concerns: "/concerns",
  adminConcerns: "/admin/concerns",
  brandProduct: "/brand-products",
  concernsProduct: "/concern-products",
  deleteConcerns: (id) => `/concerns/${id}`,
  orders: "/orders",
  addComment: "/user/blog/addComment",
  addSellwithus: "sell_with_us/createSellRequest",
  blogsApprovalList: (id) =>
    `admin-blog-management/listApprovedComment?blog_id=${id}`,
  deleteOrders: (id) => `/orders/${id}`,
  categories: "/categories",
  addArticalType: "/admin-artical-type/addArticalType", // create artical type api
  addPreferenceType: "/admin-preference/addPreference", // create preference type api
  editPreference: (id) => `/admin-preference/editPreference/${id}`, // edit preference type
  addStandardSize: "/admin-artical-type/createStandardSize", // create standard size
  editStandardSize: (id) => `/admin-artical-type/updateStandardSize/${id}`,
  deleteCategory: (id) => `/categories/${id}`,
  subCategories: "/sub-categories",
  deleteSubCategory: (id) => `/sub-categories/${id}`,
  subSubCategories: "/sub-sub-categories",
  deleteSubSubCategory: (id) => `/sub-sub-categories/${id}`,
  subSubSubCategories: "/sub-sub-sub-categories",
  listStandardSize: "/admin-artical-type/listStandardSize",
  deleteStandardSizeList: (id) =>
    `/admin-artical-type/deleteStandardSize/${id}`,
  deleteSubSubSubCategories: (id) => `/sub-sub-sub-categories/${id}`,
  updateCategory: (id) => `/categories/${id}`,
  updateSubcategory: (id) => `/sub-categories/${id}`,
  updateSubSubCategory: (id) => `/update-sub-sub-category/${id}`,
  updateSubSubSubCategory: (id) => `/update-sub-sub-sub-category/${id}`,
  changePassword: "/change-password",
  forgotPassword: "/forgot-password",
  createBlog: "create-blog",
  getBlogs: "/list-blog",
  getBlogsList: "/blogs",
  getBlogsListUserComments: "/admin-blog-management/listUserComments",
  getBlogsUserCommentsAction: "/admin-blog-management/approveRejectComment",
  getBlogById: (id) => `/blog/${id}`,
  getProductBySlug: (id) => `/products/${id}`,
  updateBlog: (id) => `/update-blog/${id}`,
  deleteBlog: (id) => `/delete-blog/${id}`,
  policies: (slug) => `/policies/${slug}`,
  adminRegister: "/register",
  nonAdminDelete: "/nonAdminDelete",
  products: "/products",
  newtoppicks: "/new-top-pics",
  newArrivals: "/products-by-group/new-arrivals",
  shopByAge: "/products-by-group/shop-by-age",
  topPicks: "/products-by-group/top-picks",
  category: "category-products",
  subCategory: "/subcategory-products",
  subSubCategory: "/subsubcategory-products",
  fileUploadUrl: (category) =>
    `/upload?category=${category || "uncategorized"}`,
  nestedCategories: "/nested-categories",
  cart: "/cart",
  movetocart: "/movecart",
  coupons: "/coupons",
  deleteCoupons: (id) => `/coupons/deleteCoupon/${id}`,
  editCoupon: (id) => `/coupons/editCoupon/${id}`,
  addCoupon: "/coupons/addCoupon",
  applyCoupon: "/apply_coupon",
  getCart: "/cart",
  deleteCart: (productId) => `/cart/${productId}`,
  wishlist: "/wishlist",
  deleteWishlist: (productId) => `/wishlist/${productId}`,
  addAddress: "addaddress",
  address: "/address",
  addsubscription: "/subscriptions/addSubscriptions",
  addsellwithus: "sell_with_us/createSellRequest",
  addconnectwithus: "subscriptions/connectWithUs",
  updateAddress: (id) => `/address/${id}`,
  sendOtp: urlJoin(basePath, "/auth/send-otp"),
  verifyOtp: urlJoin(basePath, "/auth/verify-otp"),
  emailLogin: urlJoin(basePath, "/auth/user-login"),
  placeOrder: urlJoin(basePath, "/checkout/place-order"),
  getOrder: (orderId) => urlJoin(basePath, "/checkout/orders/", orderId),
  payment: urlJoin(basePath, "/payment"),
  downloadSampleExcelFile: urlJoin(
    basePath,
    "import-products",
    "download-sample-excel-file"
  ),
  downloadSampleExcelFileForImportProductImage: urlJoin(
    basePath,
    "import-products",
    "download-sample-product-image-excel-file"
  ),
  downloadSampleExcelFileForImportProductPrice: urlJoin(
    basePath,
    "import-products",
    "download-sample-product-price-excel-file"
  ),
  uploadProducts: urlJoin(basePath, "import-products", "import"),
  uploadProductsPriceExcelFile: urlJoin(
    basePath,
    "import-products",
    "productpricesimport"
  ),
  uploadProductsOfferExcelFile: urlJoin(
    basePath,
    "import-products",
    "offerproductsimport"
  ),
  downloadSampleExcelFileOffers: urlJoin(
    basePath,
    "import-products",
    "download-sample-product-offer-excel-file"
  ),
  uploadProductsImageExcelFile: urlJoin(
    basePath,
    "import-products",
    "productimagesimport"
  ),
  getAccountDetails: "/user/account/getUserDetails",
  updateAccountDetails: "/user/account/updateUserDetails",
  addReview: "/reviews/addReview",
  getAllReviews: "/reviews/getAllReviews",
  editReviewStatus: (id) => `/reviews/editReviewStatus?id=${id}`,
  shipRocketServiceability: (pickup_postcode, delivery_postcode, weight, cod) =>
    `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickup_postcode}&delivery_postcode=${delivery_postcode}&weight=${weight}&cod=${cod}`,
  shipRocketAuth: "https://apiv2.shiprocket.in/v1/external/auth/login",
  getAddressOnPincode: (pincode) =>
    `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bpincode%5D=${pincode}`,
  getAllFaqs: "/faqs/getAllFaqs",
  addFaq: "/faqs/addFaq",
  deleteFaq: (id) => `/faqs/deleteFaq/${id}`,
  editFaq: (id) => `/faqs/editFaq/${id}`,
  gethomedata: "/reviews/getApprovedReviews",
  fetchCuratedProducts: (id) => `/adds/getCuratedAddsBySlug/${id}`,
  fetchCuratedAdds: (status) => `/adds/getAllCuratedAdds?status=${status}`,
  fetchActiveCuratedAdds: "/adds/getActiveCuratedAdds",
  createCuratedAdd: "/adds/addCuratedAdd",
  deleteCuratedAdd: (id) => `/adds/deleteCuratedAdd/${id}`,
  updateCuratedAdd: (id) => `/adds/editCuratedAdd/${id}`,
  fetchMultipleAdds: (status) => `/adds/getAllMultipleAdds?status=${status}`,
  fetchActiveMultipleAdds: "/adds/getActiveMultipleAdds",
  createMultipleAdd: "/adds/addMultipleAdd",
  deleteMultipleAdd: (id) => `/adds/deleteMultipleAdd/${id}`,
  updateMultipleAdd: (id) => `/adds/editMultipleAdd/${id}`,
  fetchSingleAdds: (status) => `/adds/getAllSingleAdds?status=${status}`,
  fetchActiveSingleAdds: "/adds/getActiveSingleAdds",
  createSingleAdd: "/adds/addSingleAdd",
  deleteSingleAdd: (id) => `/adds/deleteSingleAdd/${id}`,
  updateSingleAdd: (id) => `/adds/editSingleAdd/${id}`,
  abondedCartList: "/abondedCartList",
  getAllUsers: "/user/account/getUsers",
  fetchProductOptions: "/curated-products/fetch-product-options",
  fetchEmployees: "/admin_user/list",
  createEmployee: "/admin_user/addEmployee",
  deleteEmployee: (id) => `/admin_user/deleteEmployee/${id}`,
  updateEmployee: (id) => `/admin_user/editEmployee/${id}`,
  fetchAllRoles: "/roles/getAllRoles",
  fetchAdminOrders: "/api/v1/checkout/adminOrders", // fetch admin orders
  fetchAdminPopupList: "/popup/list", // fetch popup list
  deletePopup: (id) => `/popup/deletePopup/${id}`, // delete popup
  getAdminUserWalletTransactions: "/user/account/adminfetchtxns",
  homePageVisionMission: "/adds/gethomecontent",
  productsSuggestions: "/productsSuggestions",
  relatedProducts: "/related-products",
};

export const httpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  NOT_IMPLEMENTED: 501,
};
