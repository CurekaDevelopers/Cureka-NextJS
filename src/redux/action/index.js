import axios from "axios";
import _ from "lodash";
import toast from "react-hot-toast";
import api from "../../utils/api.utils";
import { apiUrls, httpCode } from "../../utils/constants/api.constants";
import { genericErrorMsg } from "../../utils/constants/common.constants";
import {
  setAdminConcerns,
  setAdminListOrders,
  setAdminPopupList,
  setArticleType,
  setBlogs,
  setBlogsComments,
  setBrands,
  setCategories,
  setConcerns,
  setConcernsProduct,
  setCoupons,
  setCuratedAdds,
  setCustomerOrders,
  setEmployees,
  setFaqs,
  setHomePage,
  setListStandardSize,
  setMultipleAdds,
  setPolicy,
  setPreferenceType,
  setPreferences,
  setProductOptions,
  setProductsList,
  setRatingAndReviews,
  setSingleAdds,
  setStandardSizeList,
  setSubCategories,
  setSubSubCategories,
  setSubSubSubCategories,
  setWalletTransactions,
  setabondedCart,
  setallUsers,
} from "../slices/admin.slice";
import { setRoles } from "../slices/auth.slice";
import {
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
  setAddress,
  setCartPopup,
  setCartProducts,
  setCatdata,
  setCategoryPopup,
  setCuratedProducts,
  setFilters,
  setLastProducts,
  setLikeProducts,
  setLoading,
  setNestedCategories,
  setProductPaginationData,
  setProducts,
  setWishlistProducts,
} from "../slices/customer.slice";
import { dispatch } from "../store";

const setErrorToast = (error, customMessage) => {
  const { message, error: isError = false } = _.get(error, "response.data");
  toast.error((isError && message) || customMessage);
};
//Brands management

export const fetchBrands = () => async (dispatch) => {
  try {
    const brands = await api.get(apiUrls.brands);
    dispatch(setBrands(brands.data || []));
  } catch (error) {
    dispatch(setBrands([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching brands!"
    );
  }
};

export const fetchArticleType = () => async (dispatch) => {
  try {
    const articleTypeList = await api.get(apiUrls.articleTypeList);
    dispatch(setArticleType(articleTypeList.data || []));
  } catch (error) {
    dispatch(setArticleType([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching article type!"
    );
  }
};

export const fetchPreferenceType = () => async (dispatch) => {
  try {
    const preferenceTypeList = await api.get(apiUrls.fetchPreferenceTypes);
    dispatch(setPreferenceType(preferenceTypeList.data || []));
  } catch (error) {
    dispatch(setPreferenceType([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching preference type!"
    );
  }
};

export const fetchStandardSizeList = (id) => async (dispatch) => {
  try {
    const payload = {
      artical_type_id: "id",
    };
    const standardSizeList = await api.get(
      apiUrls.standardSizeList + "?artical_type_id=" + id
    );
    dispatch(setStandardSizeList(standardSizeList.data || []));
  } catch (error) {
    dispatch(setStandardSizeList([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching article type!"
    );
  }
};

export const fetchProductsAdmin = () => async (dispatch) => {
  try {
    const products = await api.get(apiUrls.productListForAdmin);
    dispatch(setProductsList(products?.data || []));
  } catch (error) {
    dispatch(setProductsList([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching products!"
    );
  }
};
export const deleteProducts = (id, successCallback) => async (/*dispatch*/) => {
  try {
    const response = await api.delete(apiUrls.deleteProducts(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success("Product  Deleted Successfully.");
      successCallback();
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while deleting blogs."
    );
  }
};

export const updateProduct =
  (id, formData, successCallback) => async (/*dispatch*/) => {
    try {
      const payload = {
        ...formData,
      };
      const response = await api.put(apiUrls.editProductAdmin(id), payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Product updated successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while updating product!"
      );
    }
  };

export const createProduct =
  (formData, successCallback) => async (/*dispatch*/) => {
    try {
      const payload = {
        ...formData,
      };

      const response = await api.post(apiUrls.addProductAdmin, payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Product added successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding product!"
      );
    }
  };
export const createProductSize =
  (formData, successCallback) => async (/*dispatch*/) => {
    try {
      const payload = {
        ...formData,
      };

      const response = await api.post(apiUrls.addProductSizeAdmin, payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Product added successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding product!"
      );
    }
  };
export const productReport =
  (formData, successCallback) => async (/*dispatch*/) => {
    try {
      const payload = {
        ...formData,
      };
      const response = await api.post(apiUrls.productReport, payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Product reported successfully.");
        successCallback(response);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while reporting product!"
      );
    }
  };

export const updateBrand =
  (
    id,
    {
      name,
      image,
      description,
      status,
      brand_image,
      metaTitle,
      metaDescription,
    },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        image,
        description,
        status,
        brand_image,
        metaTitle,
        metaDescription,
      };
      const response = await api.put(apiUrls.updateBrands(id), payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Brand updated successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while updating blog!"
      );
    }
  };

export const createBrand =
  (
    {
      name,
      image,
      description,
      status,
      brand_image,
      metaTitle,
      metaDescription,
    },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        image,
        description,
        status,
        brand_image,
        metaTitle,
        metaDescription,
      };
      const response = await api.post(apiUrls.brands, payload);
      if (response.status === httpCode.CREATED) {
        console.log(response);
        toast.success("Brand Created Successfully. " + response.data.message);
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new brand!"
      );
    }
  };

export const deleteBrands = (id, successCallback) => async (/*dispatch*/) => {
  try {
    const response = await api.delete(apiUrls.deleteBrands(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success("Brand Deleted Successfully.");
      successCallback();
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while deleting blogs."
    );
  }
};

export const fetchConcernsProducts =
  (queryParams = {}) =>
  async (dispatch) => {
    console.log(queryParams, "queryParams");
    try {
      const concerns = await api.get(
        apiUrls.concernsProduct + "/" + queryParams?.item
      );
      dispatch(setConcernsProduct(concerns.data || []));
    } catch (error) {
      dispatch(setConcernsProduct([]));
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while fetching concerns!"
      );
    }
  };
export const fetchConcernsProductsForBrand =
  (queryParams = {}) =>
  async (dispatch) => {
    console.log(queryParams);
    try {
      const concerns = await api.get(
        apiUrls.brandProduct + "/" + queryParams?.item
      );
      dispatch(setConcernsProduct(concerns.data || []));

      dispatch(setProducts(concerns.data?.products || []));
      dispatch(setFilters(concerns.data?.filters || {}));
      dispatch(setProductPaginationData(concerns.data?.pagination || {}));
      // dispatch(setLoading(false));
    } catch (error) {
      dispatch(setConcernsProduct([]));
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while fetching concerns!"
      );
    }
  };

//brandwiseproducts
export const fetchProductsForBrand =
  (queryParams = {}) =>
  async (dispatch) => {
    console.log(queryParams);
    try {
      const concerns = await api.get(
        apiUrls.brandProduct + "/" + queryParams.brandSlug
      );
      dispatch(setConcernsProduct(concerns.data || []));
      dispatch(setCatdata(concerns.data?.catadata || []));

      dispatch(setProducts(concerns.data?.products || []));
      dispatch(setFilters(concerns.data?.filters || {}));
      dispatch(setProductPaginationData(concerns.data?.pagination || {}));
      // dispatch(setLoading(false));
    } catch (error) {
      dispatch(setConcernsProduct([]));
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while fetching concerns!"
      );
    }
  };

export const fetchConcerns = () => async (dispatch) => {
  try {
    const concerns = await api.get(apiUrls.concerns);
    dispatch(setConcerns(concerns.data || []));
  } catch (error) {
    dispatch(setConcerns([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching concerns!"
    );
  }
};

export const fetchAdminConcerns = () => async (dispatch) => {
  try {
    const concerns = await api.get(apiUrls.adminConcerns);
    dispatch(setAdminConcerns(concerns.data || []));
  } catch (error) {
    dispatch(setAdminConcerns([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching concerns!"
    );
  }
};

export const fetchabondedCart = () => async (dispatch) => {
  try {
    const concerns = await api.get(apiUrls.abondedCartList);
    dispatch(setabondedCart(concerns.data?.data || []));
  } catch (error) {
    dispatch(setabondedCart([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching abondedCart!"
    );
  }
};

export const fetchAdminUsers = () => async (dispatch) => {
  try {
    const concerns = await api.get(apiUrls.getAllUsers);
    dispatch(setallUsers(concerns.data?.result || []));
  } catch (error) {
    dispatch(setallUsers([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching Users List!"
    );
  }
};

export const fetchUserWalletTransactions = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.getAdminUserWalletTransactions);
    dispatch(setWalletTransactions(response.data?.txns || []));
  } catch (error) {
    dispatch(setWalletTransactions([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching Users List!"
    );
  }
};

export const fetchPreferencess = () => async (dispatch) => {
  try {
    const preferences = await api.get(apiUrls.fetchPreferenceTypes);
    dispatch(setPreferences(preferences.data || []));
  } catch (error) {
    dispatch(setPreferences([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching preferences!"
    );
  }
};

export const fetchApproveBlogsCommentList = async (id) => {
  try {
    const blogs = await api.get(apiUrls.blogsApprovalList(id));
    return blogs.data || {};
  } catch (error) {
    toast.error(
      `Something went wrong while fetching blog: ${
        error?.response?.data?.error || error.message
      }`
    );

    return {};
  }
};

export const fetchProducts =
  (queryParams = {}) =>
  async (dispatch) => {
    const parameter = queryParams?.slugParams;
    delete queryParams.slugParams;
    let path = apiUrls.products;
    if (queryParams?.url === "top-picks") {
      path = apiUrls.topPicks;
    } else if (queryParams?.url === "new-arrivals") {
      path = apiUrls.newArrivals;
    } else if (queryParams?.url === "shop-by-age") {
      path = apiUrls.shopByAge;
    }
    try {
      dispatch(setLoading(true));

      if (parameter?.subSubCategorySlug) {
        path = apiUrls.subSubCategory + "/" + parameter?.subSubCategorySlug;
      } else if (parameter?.subCategorySlug) {
        path = apiUrls.subCategory + "/" + parameter?.subCategorySlug;
      } else if (parameter?.categorySlug) {
        path = apiUrls.category + "/" + parameter?.categorySlug;
      } else if (parameter?.productSlug) {
        path = apiUrls.concernsProduct + "/" + parameter?.productSlug;
      }

      const productsResponse = await api.get(path, { params: queryParams });
      dispatch(setProducts(productsResponse.data?.products || []));
      dispatch(setFilters(productsResponse.data?.filters || {}));
      dispatch(setCatdata(productsResponse.data?.catadata || []));
      dispatch(setCategoryPopup(productsResponse.data?.popups || []));
      dispatch(
        setProductPaginationData(productsResponse.data?.pagination || {})
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setCatdata([]));
      dispatch(setProductPaginationData({}));
      dispatch(setCategoryPopup([]));
      dispatch(setLoading(false));
      dispatch(setProducts([]));
      dispatch(setFilters({}));
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while fetching concerns!"
      );
    }
  };

export const createConcern =
  (
    { name, image, description, status, metaTitle, metaDescription },
    successCallback,
    failureCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        image,
        description,
        status,
        metaTitle,
        metaDescription,
      };
      const response = await api.post(apiUrls.concerns, payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Concern Created Successfully.");
        successCallback();
      }
    } catch (error) {
      failureCallback(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new concern!"
      );
    }
  };

export const deleteConcerns = (id, successCallback) => async (/*dispatch*/) => {
  try {
    const response = await api.delete(apiUrls.deleteConcerns(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success("Concern Deleted Successfully.");
      successCallback();
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while deleting concern."
    );
  }
};

export const updateConcern =
  (
    id,
    { name, image, description, status, metaTitle, metaDescription },
    successCallback,
    failureCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        image,
        description,
        status,
        metaTitle,
        metaDescription,
      };
      const response = await api.put(apiUrls.deleteConcerns(id), payload);
      if (response.status === httpCode.SUCCESS) {
        successCallback();
      }
    } catch (error) {
      failureCallback(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while updating concerns!"
      );
    }
  };

//Categories
export const createCategory =
  (
    { name, image, description, status, metaTitle, metaDescription },
    successCallback,
    failureCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        image,
        description,
        status,
        metaTitle,
        metaDescription,
      };
      const response = await api.post(apiUrls.categories, payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Category Created Successfully.");
        successCallback();
      }
    } catch (error) {
      failureCallback(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new Category!"
      );
    }
  };

// create artical type api handler
export const articleCategory =
  ({ name, artical_type_id, status }, successCallback, failureCallback) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        status: status ? status : "Active",
        artical_type_id,
      };
      const response = await api.post(apiUrls.addArticalType, payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Standard Article Created Successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new Standard Article!"
      );
      failureCallback(error);
    }
  };
export const updateArticleType =
  (id, { name, status }, successCallback) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        status,
      };
      const response = await api.put(apiUrls.updateArticleType(id), payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Article Type updated successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while updating article type!"
      );
    }
  };
export const deleteArticleType =
  (id, successCallback) => async (/*dispatch*/) => {
    try {
      const response = await api.delete(apiUrls.deleteArticleType(id));
      if (response.status === httpCode.SUCCESS) {
        toast.success("Article Type deleted successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting article type!"
      );
    }
  };

//preference add
export const preferenceCategory =
  ({ name, artical_type_id, status }, successCallback, failureCallback) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        status: status ? status : "Active",
        artical_type_id,
      };
      const response = await api.post(apiUrls.addPreferenceType, payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Preference Created Successfully.");
        successCallback();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new Preference!"
      );
      failureCallback(error);
    }
  };
export const editPreferenceType =
  (id, { name, artical_type_id, status }, successCallback, failureCallback) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        status: status ? status : "Active",
        artical_type_id,
      };
      const response = await api.put(apiUrls.editPreference(id), payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Preference updated Successfully.");
        successCallback();
      }
    } catch (error) {
      failureCallback(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new Preference!"
      );
    }
  };

//preference delete
export const deletePreferenceType =
  (recordToDelete, successCallback) => async () => {
    const { id } = recordToDelete;
    //console.log("successCallback", successCallback)
    try {
      const response = await api.delete(apiUrls.deletePreferenceType(id));
      if (response.status === httpCode.SUCCESS) {
        toast.success("Preference  deleted successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting Preference!"
      );
    }
  };
//end
export const deleteArticalType =
  (recordToDelete, successCallback) => async () => {
    const { id } = recordToDelete;
    console.log("successCallback", successCallback);
    try {
      const response = await api.delete(apiUrls.deleteArticalType(id));
      if (response.status === httpCode.SUCCESS) {
        toast.success("Artical type deleted successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting Article Type!"
      );
    }
  };

// create standard size by artical type api
// export const addStandardSize =
//   ({ name, artical_type_id, status }, successCallback, failureCallback) =>
//   async (/*dispatch*/) => {
//     try {
//       const payload = {
//         name,
//         status: status ? status : "Active",
//         artical_type_id,
//       };
//       const response = await api.post(apiUrls.addStandardSize, payload);
//       if (response.status === httpCode.SUCCESS) {
//         toast.success("Standard Size added successfully.");
//         successCallback();
//       }
//     } catch (error) {
//       failureCallback(error);
//       toast.error(
//         error?.response?.data?.error ||
//           error.message ||
//           "Something went wrong while adding new Standard size!"
//       );
//     }
//   };
export const addStandardSize =
  ({ name, artical_type_id, status }, successCallback, failureCallback) =>
  async () => {
    try {
      const payload = {
        name,
        status: status || "Active", // Use default value more concisely
        artical_type_id,
      };

      const response = await api.post(apiUrls.addStandardSize, payload);

      if (response.status === httpCode.SUCCESS) {
        toast.success("Standard Size added successfully.");
        if (typeof successCallback === "function") {
          successCallback();
        }
      }
    } catch (error) {
      if (typeof failureCallback === "function") {
        failureCallback(error);
      }
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new Standard size!"
      );
    }
  };

export const editStandardSize =
  (id, { name, artical_type_id, status }, successCallback, failureCallback) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        status: status ? status : "Active",
        artical_type_id,
      };
      const response = await api.put(apiUrls.editStandardSize(id), payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Standard Size updated successfully.");
        successCallback();
      }
    } catch (error) {
      failureCallback(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while updating new Standard size!"
      );
    }
  };

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.categories);
    dispatch(setCategories(response.data || []));
  } catch (error) {
    dispatch(setCategories([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching concerns!"
    );
  }
};

export const updateCategory =
  (id, categoryData, successCallback) => async (dispatch) => {
    try {
      const response = await api.put(apiUrls.updateCategory(id), categoryData);

      if (response.status === httpCode.SUCCESS) {
        toast.success("Category updated successfully.");

        // Dispatch action to update state (if needed)
        dispatch({
          type: "UPDATE_CATEGORY_SUCCESS",
          payload: { id, ...categoryData },
        });

        if (typeof successCallback === "function") {
          successCallback();
        }
      } else {
        toast.error("Failed to update category. Please try again.");
      }
    } catch (error) {
      console.error("Update Category Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while updating the category!"
      );
    }
  };

// export const updateCategory =
//   (
//     id,
//     { name, image, description, status, nav_link, metaTitle, metaDescription },
//     successCallback
//   ) =>
//   async (/*dispatch*/) => {
//     try {
//       const payload = {
//         name,
//         image,
//         description,
//         nav_link,
//         status,
//         metaTitle,
//         metaDescription,
//       };
//       const response = await api.put(apiUrls.updateCategory(id), payload);
//       if (response.status === httpCode.SUCCESS) {
//         toast.success("Category updated successfully.");
//         successCallback();
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.error ||
//           error.message ||
//           "Something went wrong while updating categories!"
//       );
//     }
//   };

export const deleteCategories =
  (id, successCallback) => async (/*dispatch*/) => {
    try {
      const response = await api.delete(apiUrls.deleteCategory(id));
      if (response.status === httpCode.SUCCESS) {
        toast.success("Category deleted successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting category!"
      );
    }
  };

//Sub Categories
export const createSubCategory =
  (
    {
      category_name,
      category_id,
      name,
      image,
      description,
      status,
      metaTitle,
      metaDescription,
    },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        category_name,
        category_id,
        name,
        image,
        description,
        status,
        metaTitle,
        metaDescription,
      };
      const response = await api.post(apiUrls.subCategories, payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Sub Category Created Successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new Sub Category!"
      );
    }
  };

export const fetchSubCategories = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.subCategories);
    dispatch(setSubCategories(response.data || []));
  } catch (error) {
    dispatch(setSubCategories([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching concerns!"
    );
  }
};

export const updateSubCategory =
  (
    id,
    {
      category_name,
      category_id,
      name,
      image,
      description,
      status,
      metaTitle,
      metaDescription,
    },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        category_name,
        category_id,
        name,
        image,
        description,
        status,
        metaTitle,
        metaDescription,
      };
      const response = await api.put(apiUrls.updateSubcategory(id), payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Category updated successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while updating sub categories!"
      );
    }
  };

export const deleteSubCategories =
  (id, successCallback) => async (/*dispatch*/) => {
    try {
      const response = await api.delete(apiUrls.deleteSubCategory(id));
      if (response.status === httpCode.SUCCESS) {
        toast.success("Sub Category deleted successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting sub category!"
      );
    }
  };

//Sub Sub Categories
export const createSubSubCategory =
  (
    {
      sub_category_name,
      category_id,
      sub_category_id,
      category_name,
      name,
      image,
      description,
      status,
      metaTitle,
      metaDescription,
    },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        sub_category_name,
        category_id,
        sub_category_id,
        category_name,
        name,
        image,
        description,
        status,
        metaTitle,
        metaDescription,
      };
      const response = await api.post(apiUrls.subSubCategories, payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Sub Sub Category Created Successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new Sub Sub Category!"
      );
    }
  };

export const fetchSubsubCategories = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.subSubCategories);
    dispatch(setSubSubCategories(response.data || []));
  } catch (error) {
    dispatch(setSubSubCategories([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching concerns!"
    );
  }
};

export const updateSubsubCategory =
  (id, payload, successCallback) => async (dispatch) => {
    try {
      const response = await api.put(apiUrls.updateSubSubCategory(id), payload);
      if (response.status === httpCode.SUCCESS) {
        //dispatch(setSubSubCategories(response.data || []));
        toast.success("Sub Sub Category updated successfully.");
        successCallback();
      }
    } catch (error) {
      dispatch(setSubSubCategories([]));
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while updating sub sub categories!"
      );
    }
  };

export const deleteSubSubCategories =
  (id, successCallback) => async (/*dispatch*/) => {
    try {
      const response = await api.delete(apiUrls.deleteSubSubCategory(id));
      if (response.status === httpCode.SUCCESS) {
        toast.success("Sub Sub Category deleted successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting sub sub category!"
      );
    }
  };
export const createSubSubSubCategory =
  (
    {
      sub_category_name,
      sub_sub_sub_category_name,
      category_name,
      name,
      image,
      description,
      status,
    },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        sub_sub_sub_category_name,
        sub_category_name,
        category_name,
        name,
        image,
        description,
        status,
      };
      const response = await api.post(apiUrls.subSubSubCategories, payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Sub Sub Sub Category Created Successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new Sub Sub Sub Category!"
      );
    }
  };

export const fetchSubSubSubCategories = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.subSubSubCategories);
    dispatch(setSubSubSubCategories(response.data || []));
  } catch (error) {
    dispatch(setSubSubSubCategories([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching concerns!"
    );
  }
};

export const fetchListStandardSize =
  ({ id }) =>
  async (dispatch) => {
    try {
      const response = await api.get(
        apiUrls.listStandardSize + "?artical_type_id=" + id
      );
      dispatch(setListStandardSize(response.data?.results || []));
    } catch (error) {
      dispatch(setListStandardSize([]));
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while fetching concerns!"
      );
    }
  };
export const updateSubSubSubCategory = (id, payload) => async (dispatch) => {
  try {
    const response = await api.put(
      apiUrls.updateSubSubSubCategory(id),
      payload
    );
    if (response.status === httpCode.SUCCESS) {
      dispatch(setSubSubSubCategories(response.data || []));
    }
  } catch (error) {
    dispatch(setSubSubSubCategories([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while updating sub sub sub categories!"
    );
  }
};

export const deleteSubSubSubCategories =
  (id, successCallback) => async (/*dispatch*/) => {
    try {
      const response = await api.delete(apiUrls.deleteSubSubSubCategories(id));
      if (response.status === httpCode.SUCCESS) {
        toast.success("Sub Sub Sub Category deleted successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting sub sub sub category!"
      );
    }
  };

export const deleteStandardSizeList =
  (id, successCallback) => async (/*dispatch*/) => {
    try {
      const response = await api.delete(apiUrls.deleteStandardSizeList(id));
      if (response.status === httpCode.SUCCESS) {
        toast.success("Standard Size List deleted successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting standard size list!"
      );
    }
  };

//Rating and Review
export const fetchRatingAndReview = () => async (dispatch) => {
  try {
    const ratingAndReview = await api.get(apiUrls.getAllReviews);
    const {
      data: { results = [] },
    } = ratingAndReview;
    dispatch(setRatingAndReviews(results));
  } catch (error) {
    dispatch(setRatingAndReviews([]));
    toast.error(
      `Something went wrong while fetching review and ratings: ${
        error?.response?.data?.error || error.message
      }`
    );
  }
};

export const editReviewStatus = async (id, status) => {
  try {
    const payload = {
      status: status,
    };
    const response = await api.put(apiUrls.editReviewStatus(id), payload);
    if (response.status === httpCode.SUCCESS) {
      toast.success("Rating and Review updated successfully.");
      return response;
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while updating article type!"
    );
  }
};

//Blogs
export const fetchBlogs = () => async (dispatch) => {
  try {
    const blogs = await api.get(apiUrls.getBlogs);
    dispatch(setBlogs(blogs?.data || []));
  } catch (error) {
    dispatch(setBlogs([]));
    toast.error(
      `Something went wrong while fetching blog: ${
        error?.response?.data?.error || error.message
      }`
    );
  }
};

export const fetchBlogsListUserComment = (id) => async (dispatch) => {
  try {
    const payload = {
      blog_id: id,
    };
    const blogs = await api.get(apiUrls.getBlogsListUserComments, {
      params: payload,
    });
    dispatch(setBlogsComments(blogs.data || []));
  } catch (error) {
    toast.error(
      `Something went wrong while fetching blog: ${
        error?.response?.data?.error || error.message
      }`
    );
    dispatch(setBlogsComments([]));
  }
};

export const fetchBlogsList = async (query = {}) => {
  try {
    const blogs = await api.get(apiUrls.getBlogsList, {
      params: query,
    });
    return blogs.data || {};
  } catch (error) {
    toast.error(
      `Something went wrong while fetching blog: ${
        error?.response?.data?.error || error.message
      }`
    );

    return {};
  }
};

export const fetchBlogBySlug = async (slug) => {
  try {
    const blogs = await api.get(apiUrls.getBlogById(slug));
    return blogs.data || {};
  } catch (error) {
    toast.error(
      `Something went wrong while fetching blog: ${
        error?.response?.data?.error || error.message
      }`
    );

    return {};
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const product = await api.get(apiUrls.getProductBySlug(slug));
    return product.data || {};
  } catch (error) {
    toast.error(
      `Something went wrong while fetching product: ${
        error?.response?.data?.error || error.message
      }`
    );

    return {};
  }
};

export const updateBlogs =
  (
    id,
    {
      category_id,
      title,
      image,
      url,
      description,
      canonical_url,
      og_tag,
      keywords,
      content,
      content1,
      blog_date,
      concern_id,
      thumbnail_image,
      popularity,
      status,
    },
    successCallback
  ) =>
  async (dispatch) => {
    try {
      const payload = {
        category_id,
        title,
        image,
        url,
        description,
        canonical_url,
        og_tag,
        keywords,
        content,
        content1,
        blog_date,
        concern_id,
        thumbnail_image,
        popularity,
        status,
      };
      const response = await api.put(apiUrls.updateBlog(id), payload);
      if (response.status === httpCode.SUCCESS) {
        toast.success("Blog updated successfully.");
        successCallback();
      }
    } catch (error) {
      dispatch(setBlogs([]));
      toast.error(
        `Something went wrong while updating blog: ${
          error?.response?.data?.error || error.message
        }`
      );
    }
  };

export const createBlog =
  (
    {
      category_id,
      title,
      image,
      url,
      description,
      canonical_url,
      og_tag,
      keywords,
      content,
      content1,
      blog_date,
      concern_id,
      thumbnail_image,
      popularity,
      status,
    },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        category_id,
        title,
        image,
        url,
        description,
        canonical_url,
        og_tag,
        keywords,
        content,
        content1,
        blog_date,
        concern_id,
        thumbnail_image,
        popularity,
        status,
      };
      const response = await api.post(apiUrls.createBlog, payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Blog Created Successfully.");
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new blog!"
      );
    }
  };

export const deleteProductFromCart = async (product_id) => {
  try {
    const response = await api.delete(apiUrls.deleteCart(product_id));
    if (response.status === 200) {
      toast.success("Product removed from cart.");
      dispatch(removeFromCart(product_id));
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while removing product from cart"
    );
  }
};
export const postComment = async (formData) => {
  try {
    const payload = {
      ...formData,
    };
    const response = await api.post(apiUrls.addComment, payload);
    if (response.status === httpCode.CREATED) {
      toast.success("Comment post successfully.");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while posting comment!"
    );
  }
};
export const postSellWithUS = async (formData) => {
  try {
    const payload = {
      ...formData,
    };
    const response = await api.post(apiUrls.addSellwithus, payload);
    if (response.status === httpCode.CREATED) {
      toast.success("Date Posted successfully.");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while posyting thr data!"
    );
  }
};
export const deleteBlog = (id, successCallback) => async (dispatch) => {
  try {
    const response = await api.delete(apiUrls.deleteBlog(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success("Blog Deleted Successfully.");
      successCallback();
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while deleting blogs!"
    );
  }
};

export const blogCommentAction =
  ({ id, action }, successCallback) =>
  async (dispatch) => {
    try {
      const payload = {
        blog_comment_id: id,
        action: action,
      };

      const response = await api.post(
        apiUrls.getBlogsUserCommentsAction,
        payload
      );

      if (response.status === httpCode.SUCCESS) {
        dispatch(setBlogs(response.data || []));
        toast.success(response?.data?.message);
        successCallback();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while deleting blogs!"
      );
    }
  };

//Policies
export const fetchPolicy = (slug) => async (dispatch) => {
  try {
    const policies = await api.get(apiUrls.policies(slug));
    if (policies?.data) {
      dispatch(setPolicy(policies.data || {}));
    }
  } catch (error) {
    dispatch(setPolicy({}));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching policy!"
    );
  }
};

export const addPolicy =
  ({ policy_name, policy_content, policy_slug }, successCallback) =>
  async (dispatch) => {
    try {
      const payload = {
        policyName: policy_name,
        policyContent: policy_content,
      };
      const response = await api.post(apiUrls.policies(policy_slug), payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Updated policy Successfully.");
        successCallback();
        dispatch(
          setPolicy({
            policy_name: response.data?.policyName || "",
            policy_content: response.data?.policyContent || "",
          })
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new policy!"
      );
    }
  };

//home vission and mission page
export const fetchHomePage = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.homePageVisionMission);
    if (response && response.data && response.data.data) {
      dispatch(
        setHomePage((response && response.data && response.data.data) || {})
      );
    }
  } catch (error) {
    dispatch(setHomePage({}));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching policy!"
    );
  }
};
export const fetchNestedCategories = () => async (dispatch) => {
  try {
    const policies = await api.get(apiUrls.nestedCategories);
    if (policies.data?.categories) {
      dispatch(setNestedCategories(policies.data?.categories || []));
    }
  } catch (error) {
    dispatch(setNestedCategories([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching Nested Categories!"
    );
  }
};

export const addProductToCart = async (cartItem, dispatch) => {
  try {
    const { product_id, quantity } = cartItem;

    const data = {
      product_id,
      quantity,
    };
    const response = await api.post(apiUrls.cart, data);
    if (response.data?.product_id) {
      toast.success("Cart updated successfully");
      dispatch(addToCart(response.data));
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while adding product to cart"
    );
  }
};

export const moveToCart = async (product_id) => {
  try {
    const data = {
      product_id,
    };
    const response = await api.post(apiUrls.movetocart, data);
    if (response.data?.id) {
      toast.success("Product Moved To Wishlist successfully");
      dispatch(addToCart(response.data));
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while adding product to cart"
    );
  }
};

export const fetchCartProducts = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.getCart);

    // if (response.data?.data?.length) {

    dispatch(setCartProducts(response.data?.data));
    //console.log(response.data?.lastprodcts)
    dispatch(setLastProducts(response.data?.lastprodcts));
    dispatch(setLikeProducts(response.data?.likeproducts));
    dispatch(setCartPopup(response.data?.popup));
    // }
  } catch (error) {
    dispatch(setCartProducts([]));
    dispatch(setLastProducts([]));
    dispatch(setLikeProducts([]));
    dispatch(setCartPopup([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching the cart details"
    );
  }
};

export const fetchCustomerOrders = async () => {
  try {
    const response = await api.get(apiUrls.fetchCustomerOrders);
    return response;
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while posting comment!"
    );
  }
};

export const fetchCustomerOrdersForAdmin = async () => {
  try {
    const response = await api.get(apiUrls.fetchCustomerOrders);
    dispatch(setCustomerOrders(response.data));
  } catch (error) {
    dispatch(setCustomerOrders([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while posting comment!"
    );
  }
};

export const fetchOrdersForAdmin = async () => {
  try {
    const response = await api.get(apiUrls.fetchAdminOrders);
    dispatch(setAdminListOrders(response.data));
  } catch (error) {
    dispatch(setAdminListOrders([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while posting comment!"
    );
  }
};

export const fetchAdminPopupList = async () => {
  try {
    const response = await api.get(apiUrls.fetchAdminPopupList);
    dispatch(setAdminPopupList(response.data.results));
  } catch (error) {
    dispatch(setAdminPopupList([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while posting comment!"
    );
  }
};
export const deletePopup = async (id, successCallback) => {
  try {
    const response = await api.delete(apiUrls.deletePopup(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    const { message, error: isError } = _.get(error, "response.data");
    toast.error(
      (isError && message) || "Something went wrong while updating Coupon!"
    );
  }
};

export const addRateAndReview = async (data) => {
  try {
    const response = await api.post(apiUrls.addReview, data);
    if ([httpCode.SUCCESS, httpCode.CREATED].includes(response?.status)) {
      toast.success("Rating and Review added successfully.");
      return response;
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while adding Rate and Review!"
    );
  }
};

export const addProductToWishlist = async (product_id) => {
  try {
    const data = {
      product_id,
    };
    const response = await api.post(apiUrls.wishlist, data);
    if (response.data?.id) {
      toast.success("Product added to wishlist.");
      dispatch(addToWishlist(response.data));
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while adding product to wishlist"
    );
  }
};

export const deleteProductFromWishlist = async (product_id) => {
  try {
    const response = await api.delete(apiUrls.deleteWishlist(product_id));
    if (response.status === 200) {
      toast.success("Product removed from wishlist.");
      dispatch(removeFromWishlist(product_id));
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while removing product from wishlist"
    );
  }
};

export const fetchWishlistProducts = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.wishlist);
    if (response.data?.data?.length) {
      dispatch(setWishlistProducts(response.data?.data));
    }
  } catch (error) {
    dispatch(setWishlistProducts([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching the wishlist details"
    );
  }
};

export const fetchAddresses = (accessToken) => async (dispatch) => {
  if (accessToken) {
    try {
      const response = await api.get(apiUrls.address, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the token here
        },
      });
      if (response.data?.length) {
        dispatch(setAddress(response.data));
      }
    } catch (error) {
      dispatch(setAddress([]));
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while fetching address details"
      );
    }
  }
};

export const addUserAddress = async (
  name,
  email,
  mobile_number,
  address,
  pincode,
  address_type,
  landmark,
  city,
  state
) => {
  try {
    const data = {
      name,
      email,
      mobile_number,
      address,
      pincode,
      address_type,
      landmark,
      city,
      state,
    };
    console.log(data, "data");
    // return;
    const response = await api.post(apiUrls.addAddress, data);
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while adding new address"
    );
  }
};

export const updateUserAddress = async (
  id,
  name,
  email,
  mobile,
  address,
  pincode,
  address_type,
  landmark,
  city,
  state
) => {
  try {
    const data = {
      name,
      email,
      mobile,
      address,
      landmark,
      pincode,
      address_type,
      city,
      state,
    };
    const response = await api.put(apiUrls.updateAddress(id), data);
    if (response.status === 200) {
      toast.success("Address updated successfully");
    }
    return response;
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while updating address"
    );
  }
};

export const createOrder = async (data) => {
  try {
    const response = await api.post(apiUrls.placeOrder, data);
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while creating order"
    );
  }
};

export const getPaymentSessionId = async (order_id) => {
  try {
    const data = {
      order_id,
    };
    const response = await api.post(apiUrls.payment, data);
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while creating order"
    );
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await api.get(apiUrls.getOrder(orderId));
    return response.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong fetching order"
    );
  }
};

// Coupons

// export const fetchCoupons = () => async (dispatch) => {
//   try {
//     const orders = await api.get(apiUrls.coupons);
//     dispatch(setCoupons(coupons.data || []));
//   } catch (error) {
//     dispatch(setOrders([]));
//     toast.error(
//       error?.response?.data?.error ||
//         error.message ||
//         "Something went wrong while fetching Coupon!",
//     );
//
//   }
// };

// export const fetchProducts =
//   (queryParams = {}) =>
//   async (dispatch) => {
//     try {
//       dispatch(setLoading(true));
//       const productsResponse = await api.get(apiUrls.products, { params: queryParams });
//       dispatch(setProducts(productsResponse.data?.products || []));
//       dispatch(setFilters(productsResponse.data?.filters || {}));
//       dispatch(setProductPaginationData(productsResponse.data?.pagination || {}));
//       dispatch(setLoading(false));
//     } catch (error) {
//       dispatch(setProductPaginationData({}));
//       dispatch(setLoading(false));
//       dispatch(setProducts([]));
//       dispatch(setFilters({}));
//       toast.error(
//         error?.response?.data?.error ||
//           error.message ||
//           "Something went wrong while fetching concerns!",
//       );
//
//     }
//   };

// Coupons
export const createCoupon = async (
  payload,
  successCallback,
  failureCallback
) => {
  try {
    const response = await api.post(apiUrls.addCoupon, payload);
    if (response.status === httpCode.CREATED) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    failureCallback(error);
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while adding new Coupon!"
    );
  }
};

export const deleteCoupons = async (id, successCallback) => {
  try {
    const response = await api.delete(apiUrls.deleteCoupons(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    const { message, error: isError } = _.get(error, "response.data");
    toast.error(
      (isError && message) || "Something went wrong while updating Coupon!"
    );
  }
};

export const updateCoupon = async (
  id,
  payload,
  successCallback,
  failureCallback
) => {
  try {
    const response = await api.put(apiUrls.editCoupon(id), payload);
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    failureCallback(error);
    const { message, error: isError } = _.get(error, "response.data");
    toast.error(
      (isError && message) || "Something went wrong while updating Coupon!"
    );
  }
};

export const fetchCoupons = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.coupons);
    const coupons = _.get(response, "data.data", []);
    dispatch(setCoupons(response.data.data));
  } catch (error) {
    dispatch(setCoupons([]));
  }
};

export const applyCoupon = async (couponCode, subtotal) => {
  try {
    const response = await api.post(apiUrls.applyCoupon, {
      coupon_code: couponCode,
      subtotal: subtotal,
    });
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || error.message);
    return {};
    successCallback(error);
  }
};

// Employees

export const fetchEmployees = () => async (dispatch) => {
  try {
    const employees = await api.get(apiUrls.fetchEmployees);
    const results = _.get(employees, "data.results");
    dispatch(setEmployees(results || []));
  } catch (error) {
    dispatch(setEmployees([]));
    setErrorToast(error, genericErrorMsg.fetch);
  }
};

export const createEmployee =
  (
    { email, password, first_name, last_name, created_by, roles, status },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        email,
        password,
        first_name,
        last_name,
        created_by,
        roles,
        status,
      };
      const response = await api.post(apiUrls.createEmployee, payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Employee Created Successfully.");
        successCallback();
      }
    } catch (error) {
      successCallback(error);
      setErrorToast(error, genericErrorMsg.create);
    }
  };

export const deleteEmployee = (id, successCallback) => async (/*dispatch*/) => {
  try {
    const response = await api.delete(apiUrls.deleteEmployee(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success("Employee Deleted Successfully.");
      successCallback();
    }
  } catch (error) {
    successCallback(error);
    setErrorToast(error, genericErrorMsg.delete);
  }
};

export const updateEmployee =
  (
    id,
    { email, password, first_name, last_name, updated_by, roles, status },
    successCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        email,
        password,
        first_name,
        last_name,
        updated_by,
        roles,
        status,
      };
      const response = await api.put(apiUrls.updateEmployee(id), payload);
      if (response.status === httpCode.SUCCESS) {
        successCallback();
      }
    } catch (error) {
      successCallback(error);
      setErrorToast(error, genericErrorMsg.update);
    }
  };

// fetch banners
export const fetchbanners = () => async (dispatch) => {
  try {
    const banners = await api.get(apiUrls.bannerslist);
    dispatch(setBanners(banners.data || []));
  } catch (error) {
    dispatch(setBanners([]));
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching banner list!"
    );
  }
};
// export const fetchProducts =
//   (queryParams = {}) =>
//   async (dispatch) => {
//     try {
//       dispatch(setLoading(true));
//       const productsResponse = await api.get(apiUrls.products, { params: queryParams });
//       dispatch(setProducts(productsResponse.data?.products || []));
//       dispatch(setFilters(productsResponse.data?.filters || {}));
//       dispatch(setProductPaginationData(productsResponse.data?.pagination || {}));
//       dispatch(setLoading(false));
//     } catch (error) {
//       dispatch(setProductPaginationData({}));
//       dispatch(setLoading(false));
//       dispatch(setProducts([]));
//       dispatch(setFilters({}));
//       toast.error(
//         error?.response?.data?.error ||
//           error.message ||
//           "Something went wrong while fetching concerns!",
//       );
//
//     }
//   };

export const createBanner =
  ({ name, image, description, status }, successCallback, failureCallback) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        image,
        description,
        status,
      };
      const response = await api.post(apiUrls.bannerslist, payload);
      if (response.status === httpCode.CREATED) {
        toast.success("Banner Created Successfully.");
        successCallback();
      }
    } catch (error) {
      failureCallback(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while adding new banner!"
      );
    }
  };

export const deleteBanner = (id, successCallback) => async (/*dispatch*/) => {
  try {
    const response = await api.delete(apiUrls.deleteBanner(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success("Banner Deleted Successfully.");
      successCallback();
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while deleting banner."
    );
  }
};

export const updateBanner =
  (
    id,
    { name, image, description, status },
    successCallback,
    failureCallback
  ) =>
  async (/*dispatch*/) => {
    try {
      const payload = {
        name,
        image,
        description,
        status,
      };
      const response = await api.put(apiUrls.deleteBanner(id), payload);
      if (response.status === httpCode.SUCCESS) {
        successCallback();
      }
    } catch (error) {
      failureCallback(error);
      toast.error(
        error?.response?.data?.error ||
          error.message ||
          "Something went wrong while updating banner!"
      );
    }
  };

export const getpossibleDeliveryData = async ({
  pickup_postcode,
  delivery_postcode,
  weight,
  cod = 1,
}) => {
  const obj = {
    email: "care@cureka.com",
    password: "Cureka@2024",
  };
  try {
    const shiprocketAuthToken = await axios.post(apiUrls.shipRocketAuth, obj, {
      "Content-Type": "application/json",
    });
    if (shiprocketAuthToken.status === httpCode.SUCCESS) {
      const response = await axios.get(
        apiUrls.shipRocketServiceability(
          pickup_postcode,
          delivery_postcode,
          weight,
          cod
        ),
        {
          headers: {
            Authorization: `Bearer ${shiprocketAuthToken.data.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === httpCode.SUCCESS) {
        if (response.data.status === 200) {
          const filteredResponse =
            response.data.data.available_courier_companies.filter(
              (company) =>
                company.courier_company_id ===
                response.data.data.recommended_courier_company_id
            );
          return filteredResponse[0];
        } else {
          // Handle cases where the `status` field is not 200
          toast.error(
            response.data.message ||
              "No courier service available for the selected locations."
          );
          return null;
        }
      }
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while estimating delivery date!"
    );
  }
};

export const getAddressOnPincode = async (pincode) => {
  try {
    const response = await axios.get(apiUrls.getAddressOnPincode(pincode), {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === httpCode.SUCCESS) {
      return response.data.records[0];
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while fetching brands!"
    );
  }
};

export const getAllFaqs = async () => {
  try {
    const response = await api.get(apiUrls.getAllFaqs);
    const results = _.get(response, "data.results");
    let parsedResult = [];
    if (results) {
      Object.keys(results).map((key) =>
        results[key].map((faq) => parsedResult.push(faq))
      );
    }
    dispatch(setFaqs(parsedResult));
  } catch (error) {
    dispatch(setFaqs([]));

    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong fetching faq"
    );
  }
};

export const addFaq = async (payload, successCallback) => {
  try {
    const response = await api.post(apiUrls.addFaq, payload);
    if (response.status === httpCode.CREATED) {
      successCallback();
      toast.success("Faq added Successfully. " + response.data.message);
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while adding new Faq!"
    );
  }
};

export const deleteFaqs = async (id, successCallback) => {
  try {
    const response = await api.delete(apiUrls.deleteFaq(id));
    if (response.status === httpCode.SUCCESS) {
      successCallback();
      toast.success("Faq Deleted Successfully.");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while deleting Faq."
    );
  }
};

export const editFaq = async (id, payload, successCallback) => {
  try {
    const response = await api.put(apiUrls.editFaq(id), payload);
    if (response.status === httpCode.SUCCESS) {
      successCallback();
    }
  } catch (error) {
    failureCallback(error);
    toast.error(
      error?.response?.data?.error ||
        error.message ||
        "Something went wrong while updating Faq!"
    );
  }
};

// Single Add
export const createSingleAdd = async (
  { image, url },
  successCallback,
  failureCallback
) => {
  const payload = {
    image: image,
    url: url,
  };
  try {
    const response = await api.post(apiUrls.createSingleAdd, payload);
    if (response.status === httpCode.CREATED) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    successCallback();
    setErrorToast(error, genericErrorMsg.create);
  }
};

export const deleteSingleAdd = async (id, successCallback) => {
  try {
    const response = await api.delete(apiUrls.deleteSingleAdd(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    setErrorToast(error, genericErrorMsg.delete);
  }
};

export const updateSingleAdd = async (
  id,
  { image, url, updated_by, status },
  successCallback,
  failureCallback
) => {
  const payload = {
    image: image,
    url: url,
    updated_by: updated_by,
    status: status,
  };
  try {
    const response = await api.put(apiUrls.updateSingleAdd(id), payload);
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    successCallback();
    setErrorToast(error, genericErrorMsg.update);
  }
};

export const fetchSingleAdds =
  (status = "") =>
  async (dispatch) => {
    try {
      const response = await api.get(apiUrls.fetchSingleAdds(status));
      const singleAdds = _.get(response, "data.results", []);
      dispatch(setSingleAdds(singleAdds));
    } catch (error) {
      dispatch(setSingleAdds([]));
      setErrorToast(error, genericErrorMsg.fetch);
    }
  };

// Multiple Adds
export const createMultipleAdd = async (
  { image, url },
  successCallback,
  failureCallback
) => {
  const payload = {
    image: image,
    url: url,
  };
  try {
    const response = await api.post(apiUrls.createMultipleAdd, payload);
    if (response.status === httpCode.CREATED) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    successCallback();
    setErrorToast(error, genericErrorMsg.create);
  }
};

export const deleteMultipleAdd = async (id, successCallback) => {
  try {
    const response = await api.delete(apiUrls.deleteMultipleAdd(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    setErrorToast(error, genericErrorMsg.delete);
  }
};

export const updateMultipleAdd = async (
  id,
  { image, url, updated_by, status },
  successCallback
) => {
  const payload = {
    image: image,
    url: url,
    updated_by: updated_by,
    status: status,
  };
  try {
    const response = await api.put(apiUrls.updateMultipleAdd(id), payload);
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    successCallback();
    setErrorToast(error, genericErrorMsg.update);
  }
};

export const fetchMultipleAdds =
  (status = "") =>
  async (dispatch) => {
    try {
      const response = await api.get(apiUrls.fetchMultipleAdds(status));
      const multipleAdds = _.get(response, "data.results", []);
      dispatch(setMultipleAdds(multipleAdds));
    } catch (error) {
      dispatch(setMultipleAdds([]));
      setErrorToast(error, genericErrorMsg.fetch);
    }
  };

// Curated Adds
export const createCuratedAdd = async (
  { image, url, type, status, products },
  successCallback
) => {
  const payload = {
    image: image,
    url: url,
    type: type,
    status: status,
    products: products,
  };
  try {
    const response = await api.post(apiUrls.createCuratedAdd, payload);
    if (response.status === httpCode.CREATED) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    successCallback();
    setErrorToast(error, genericErrorMsg.create);
  }
};

export const deleteCuratedAdd = async (
  id,
  successCallback,
  failureCallback
) => {
  try {
    const response = await api.delete(apiUrls.deleteCuratedAdd(id));
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    failureCallback();
    setErrorToast(error, genericErrorMsg.delete);
  }
};

export const updateCuratedAdd = async (
  id,
  { image, url, type, status, products, updated_by },
  successCallback,
  failureCallback
) => {
  const payload = {
    image: image,
    url: url,
    type: type,
    status: status,
    products: products,
    updated_by: updated_by,
  };
  try {
    const response = await api.put(apiUrls.updateCuratedAdd(id), payload);
    if (response.status === httpCode.SUCCESS) {
      toast.success(response.data.message);
      successCallback();
    }
  } catch (error) {
    successCallback();
    setErrorToast(error, genericErrorMsg.update);
  }
};

export const fetchCuratedAdds =
  (status = "") =>
  async (dispatch) => {
    try {
      const response = await api.get(apiUrls.fetchCuratedAdds(status));
      const curatedAdds = _.get(response, "data.results", []);
      dispatch(setCuratedAdds(curatedAdds));
    } catch (error) {
      dispatch(setCuratedAdds([]));
      setErrorToast(error, genericErrorMsg.fetch);
    }
  };

export const fetchProductsOptions = () => async (dispatch) => {
  try {
    const response = await api.get(apiUrls.fetchProductOptions);
    const productOptions = _.get(response, "data.data", []);
    dispatch(setProductOptions(productOptions));
  } catch (error) {
    dispatch(setProductOptions([]));
    setErrorToast(error, genericErrorMsg.fetch);
  }
};

export const fetchCuratedProducts = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.get(apiUrls.fetchCuratedProducts(id));
    const { products, pagination = {} } = _.get(response, "data", []);
    dispatch(setCuratedProducts(products[0].products));
    dispatch(setCatdata(products));
    dispatch(setProductPaginationData(pagination));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setCuratedProducts([]));
    dispatch(setProductPaginationData({}));
    dispatch(setCatdata([]));
    dispatch(setLoading(false));
    setErrorToast(error, genericErrorMsg.fetch);
  }
};

export const fetchAllRoles = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.get(apiUrls.fetchAllRoles);
    const roles = _.get(response, "data.results", []);
    dispatch(setRoles(roles));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setRoles([]));
    dispatch(setLoading(false));
    setErrorToast(error, genericErrorMsg.fetch);
  }
};
