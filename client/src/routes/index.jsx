import { Navigate, Route, Routes } from "react-router-dom";
import { pagePaths } from "./constant";
import lazyLoadable from "./lazyLoadable";

const routes = [
  {
    element: lazyLoadable(() => import("../layouts/AdminLayout")),
    path: "admin-layout",
    children: [
      { path: pagePaths.adminLogin, element: lazyLoadable(() => import("../admin/Login")) },
      {
        path: pagePaths.adminForgotPassword,
        element: lazyLoadable(() => import("../admin/ForgotPassword")),
      },
      {
        path: pagePaths.adminResetPassword,
        element: lazyLoadable(() => import("../admin/ResetPassword")),
      },
      {
        path: "admin-dashboard-layout",
        element: lazyLoadable(() => import("../layouts/AdminDashboardLayout"), 2),
        children: [
          {
            path: pagePaths.adminSettings,
            element: lazyLoadable(() => import("../admin/component/Settings"), -1),
          },
          {
            path: pagePaths.adminImportProducts,
            element: lazyLoadable(() => import("../pages/admin/ImportProductsPage"), 11),
          },
          {
            path: pagePaths.adminImportProductsImages,
            element: lazyLoadable(() => import("../pages/admin/ImportProductsImage"), 12),
          },
          {
            path: pagePaths.adminImportProductsPrices,
            element: lazyLoadable(() => import("../pages/admin/ImportProductsPrice"), 25),
          },
          {
            path: pagePaths.adminProfile,
            element: lazyLoadable(() => import("../admin/component/Profile"), -1),
          },
          {
            path: pagePaths.adminDashboard,
            element: lazyLoadable(() => import("../pages/admin/DashboardPage"), 2),
          },
          {
            path: pagePaths.adminBlogs,
            element: lazyLoadable(() => import("../pages/admin/AdminBlogsPage"), 1),
          },
          {
            path: pagePaths.adminCreateBlogs,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateBlogsPage"), 1),
          },
          {
            path: pagePaths.adminCreateBlogsComment,
            element: lazyLoadable(() => import("../pages/admin/AdminBlogsCommentPage"), 1),
          },
          {
            path: pagePaths.adminCreateBlogsEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateBlogsPage"), 1),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateBrandEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateBrandsPage"), 3),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateFaqEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateFaqsPage"), 18),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateSingleAddEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSingleAddPage"), 19),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateSingleAdd,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSingleAddPage"), 19),
          },
          {
            path: pagePaths.adminCreateMultipleAddEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateMultipleAddPage"), 20),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateMultipleAdd,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateMultipleAddPage"), 20),
          },
          {
            path: pagePaths.adminCreateCuratedAddEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateCuratedAddPage"), 21),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateCuratedAdd,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateCuratedAddPage"), 21),
          },
          {
            path: pagePaths.adminCreateSelfAddEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSelfAddPage"), 23),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateSelfAdd,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSelfAddPage"), 23),
          },
          {
            path: pagePaths.adminCreateConcern,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateConcernsPage"), 6),
          },
          {
            path: pagePaths.adminCreateConcernEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateConcernsPage"), 6),
            props: {
              isEditPage: true,
            },
          },
          // {
          //   path: pagePaths.adminCreateOrders,
          //   element: lazyLoadable(() => import("../pages/admin/AdminCreateOrderPage")),
          // },
          // {
          //   path: pagePaths.adminCreateOrdersEdit,
          //   element: lazyLoadable(() => import("../pages/admin/AdminCreateOrderPage")),
          //   props: {
          //     isEditPage: true,
          //   },
          // },
          {
            path: pagePaths.adminCreateProducts,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateProductsPage"), 4),
          },
          {
            path: pagePaths.adminReportExcel,
            element: lazyLoadable(() => import("../pages/admin/AdminReportExcel"), 4),
          },
          {
            path: pagePaths.adminCreateProductEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateProductsPage/EditProduct"), 4),
            props: {
              isEditPage: true,
            }
          },
          {
            path: pagePaths.adminCreateProductSize,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateProductSizePage"), 4),
          },
          {
            path: pagePaths.adminCreateBrand,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateBrandsPage"), 3),
          },
          {
            path: pagePaths.adminCreateFaq,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateFaqsPage"), 18),
          },
          {
            path: pagePaths.adminCreateArticalType,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateArticalPage"), 5),
          },
          {
            path: pagePaths.adminEditArticalType,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateArticalPage"), 5),
            props: {
              isEditPage: true,
            }
          },
          {
            path: pagePaths.adminCreatePreferenceType,
            element: lazyLoadable(() => import("../pages/admin/AdminCreatePreferencePage"), 5),
          },
          {
            path: pagePaths.adminCreateStandardArticalType,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateStandardArticalPage"), 5),
          },
          {
            path: pagePaths.adminEditStandardArticalType,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateStandardArticalPage"), 5),
            props: {
              isEditPage: true,
            }
          },
          {
            path: pagePaths.adminCreateCategory,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateCategoryPage"), 5),
          },
          {
            path: pagePaths.adminCreateProductFaq,
            element: lazyLoadable(() => import("../pages/admin/ProductManagementFaq"), 4),
            props: {
              isEditPage: true,
            }
          },
          {
            path: pagePaths.adminCreateCategoryEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateCategoryPage"), 5),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateSubCategory,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSubCategoryPage"), 5),
          },
          {
            path: pagePaths.adminCreateSubCategoryEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSubCategoryPage"), 5),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateSubSubCategory,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSubSubCategoryPage"), 5),
          },
          {
            path: pagePaths.adminCreateSubSubCategoryEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSubSubCategoryPage"), 5),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreatePreferenceEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreatePreferencePage"), 5),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminCreateSubSubSubCategory,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSubSubSubCategoryPage"), 5),
          },
          {
            path: pagePaths.adminCreateSubSubSubCategoryedit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateSubSubSubCategoryPage"), 5),
          },
          {
            path: pagePaths.adminBrandManagement,
            element: lazyLoadable(() => import("../pages/admin/BrandsManagementPage"), 3),
          },
          {
            path: pagePaths.adminFaqManagement,
            element: lazyLoadable(() => import("../pages/admin/FaqManagementPage"), 18),
          },

          {
            path: pagePaths.adminSingleAddManagement,
            element: lazyLoadable(() => import("../pages/admin/SingleAddManagementPage"), 19),
          },
          {
            path: pagePaths.adminMultipleAddManagement,
            element: lazyLoadable(() => import("../pages/admin/MultipleAddManagementPage"), 20),
          },
          {
            path: pagePaths.adminCuratedAddManagement,
            element: lazyLoadable(() => import("../pages/admin/CuratedAddManagementPage"), 21),
          },
          {
            path: pagePaths.adminSelfAddManagement,
            element: lazyLoadable(() => import("../pages/admin/SelfAddManagementPage"), 23),
          },
          {
            path: pagePaths.adminProductManagement,
            element: lazyLoadable(() => import("../pages/admin/ProductManagement"), 4),
          },
          {
            path: "admin-category-layout",
            element: lazyLoadable(() => import("../layouts/CategoryPageLayout"), 5),
            children: [
              {
                element: lazyLoadable(() => import("../pages/admin/CategoriesManagementPage"), 5),
                path: pagePaths.adminCategories,
              },
              {
                element: lazyLoadable(() => import("../pages/admin/SubCategoriesManagementPage"), 5),
                path: pagePaths.adminSubCategory,
              },
              {
                element: lazyLoadable(
                  () => import("../pages/admin/SubSubCategoriesManagementPage"), 5
                ),
                path: pagePaths.adminSubSubCategory,
              },
              {
                element: lazyLoadable(
                  () => import("../pages/admin/SubSubSubCategoriesManagementPage"), 5
                ),
                path: pagePaths.adminSubSubSubCategory,
              },
              {
                element: lazyLoadable(
                  () => import("../pages/admin/ArticalTypeManagementPage"), 5
                ),
                path: pagePaths.adminArticalType,
              },
              {
                element: lazyLoadable(
                  () => import("../pages/admin/PreferenceTypeManagementPage"), 5
                ),
                path: pagePaths.adminPreferenceType,
              },
              {
                element: lazyLoadable(
                  () => import("../pages/admin/StandardSizeManagement"), 5
                ),
                path: pagePaths.adminStandardSize,
              },
            ],
          },
          {
            path: pagePaths.adminUserManagement,
            element: lazyLoadable(() => import("../pages/admin/UsersManagementPage"), 13),
          },
          {
            path: pagePaths.adminConcern,
            element: lazyLoadable(() => import("../pages/admin/ConcernsManagementPage"), 6),
          },
          {
            path: pagePaths.adminOrders,
            element: lazyLoadable(() => import("../pages/admin/OrderManagementPage"), 22),
          },
          {
            path: pagePaths.adminAbandonedCart,
            element: lazyLoadable(() => import("../pages/admin/AbandonedCartPage")),
          },
          {
            path: pagePaths.adminCoupon,
            element: lazyLoadable(() => import("../pages/admin/CouponsManagement"), 15),
          },
          {
            path: pagePaths.adminCreateCoupon,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateCouponsPage"), 15),
          },
          {
            path: pagePaths.adminCreateCouponEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateCouponsPage"), 15),
            props: {
              isEditPage: true,
            },
          },
          {
            path: pagePaths.adminEmployee,
            element: lazyLoadable(() => import("../pages/admin/EmployeesManagementPage"), 16),
          },
          {
            path: pagePaths.adminCreateEmployee,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateEmployeesPage/AdminCreateEmployee"), 16),
          },
          {
            path: pagePaths.adminCreateEmployeeEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateEmployeesPage/AdminEditEmployee"), 16),
            // props: {
            //   isEditPage: true,
            // },
          },
          {
            path: pagePaths.adminTermsAndCondition,
            element: lazyLoadable(() => import("../pages/admin/PrivacyPolicyPage"), 8),
            props: {
              policyName: "Terms & Conditions",
              policySlug: "termsAndConditions",
            },
          },
          {
            path: pagePaths.adminDisclaimerOfWarranties,
            element: lazyLoadable(() => import("../pages/admin/PrivacyPolicyPage"), 8),
            props: {
              policyName: "Disclaimer of Warranties",
              policySlug: "disclaimer-of-warranties",
            },
          },
          {
            path: pagePaths.adminPrivacyPolicyPage,
            element: lazyLoadable(() => import("../pages/admin/PrivacyPolicyPage"), 8),
            props: {
              policyName: "Privacy & Policy",
              policySlug: "privacy_policy",
            },
          },
          {
            path: pagePaths.adminCancellationRefund,
            element: lazyLoadable(() => import("../pages/admin/PrivacyPolicyPage"), 8),
            props: {
              policyName: "Cancellation & Refund",
              policySlug: "cancellation-refund",
            },
          },
          {
            path: pagePaths.adminRatingAndReview,
            element: lazyLoadable(() => import("../pages/admin/AdminRatingAndReviewPage"), 17),
          },
          {
            path: pagePaths.adminCreateOrder,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateOrderPage"), 22),
          },
          {
            path: pagePaths.adminEditOrder,
            element: lazyLoadable(() => import("../pages/admin/AdminCreateOrderPage/EditAdminOrderPage"), 22),
          },
          {
            path: pagePaths.adminCuratedUploadExcelSheet,
            element: lazyLoadable(() => import("../pages/admin/ImportCuratedUploadImages"), 11),
          },
          {
            path: pagePaths.adminPopupManagement,
            element: lazyLoadable(() => import("../pages/admin/PopupManagement"), 24),
          },
          {
            path: pagePaths.adminPopupManagementAdd,
            element: lazyLoadable(() => import("../pages/admin/AdminCreatePopupPage"), 24),
          },
          {
            path: pagePaths.adminPopupManagementEdit,
            element: lazyLoadable(() => import("../pages/admin/AdminCreatePopupPage/EditPopupPage"), 24),
          },
          {
            path: pagePaths.adminUserWalletTransaction,
            element: lazyLoadable(() => import("../pages/admin/UsersManagementPage/WalletTransactions"), 25),
          },
          {
            path: pagePaths.adminHomePageVision,
            element: lazyLoadable(() => import("../pages/admin/HomePage/Vision"), 25),
          },
          {
            path: pagePaths.adminHomePageMision,
            element: lazyLoadable(() => import("../pages/admin/HomePage/Mission"), 25),
          },
        ],
      },
    ],
  },
  { path: pagePaths.home, element: lazyLoadable(() => import("../views/Home")) },
  { path: pagePaths.hair, element: lazyLoadable(() => import("../views/Hair")) },
  { path: pagePaths.ayurveda, element: lazyLoadable(() => import("../views/Ayurveda")) },
  { path: pagePaths.nutrition, element: lazyLoadable(() => import("../views/Nutrition")) },
  { path: pagePaths.elderly, element: lazyLoadable(() => import("../views/Elderly")) },
  { path: pagePaths.diabetes, element: lazyLoadable(() => import("../views/Diabetes")) },
  { path: pagePaths.jointPain, element: lazyLoadable(() => import("../views/JointPain")) },
  { path: pagePaths.asthma, element: lazyLoadable(() => import("../views/Asthma")) },
  { path: pagePaths.wellness, element: lazyLoadable(() => import("../views/Wellness")) },
  { path: pagePaths.policies, element: lazyLoadable(() => import("../views/Policies")) },
  {
    path: pagePaths.userLogin,
    element: lazyLoadable(() => import("../views/UserLogin")),
  },
  { path: pagePaths.concerns, element: lazyLoadable(() => import("../views/Concerns")) },
  { path: pagePaths.brands, element: lazyLoadable(() => import("../views/Brands")) },
  { path: pagePaths.categories, element: lazyLoadable(() => import("../views/Categories")) },
  { path: pagePaths.subcategories, element: lazyLoadable(() => import("../views/Subcategories")) },
  {
    path: pagePaths.subsubcategories,
    element: lazyLoadable(() => import("../views/Subsubcategories")),
  },
  {
    path: pagePaths.subsubsubcategories,
    element: lazyLoadable(() => import("../views/Subsubsubcategories")),
  },
  { path: pagePaths.listBlogs, element: lazyLoadable(() => import("../views/Listblogs")) },
  { path: pagePaths.aboutUs, element: lazyLoadable(() => import("../views/Aboutus")) },
  { path: pagePaths.blogs, element: lazyLoadable(() => import("../pages/customer/BlogHomePage")) },
  {
    path: pagePaths.blogDetails,
    element: lazyLoadable(() => import("../pages/customer/BlogDetailsPage")),
  },
  { path: pagePaths.cart, element: lazyLoadable(() => import("../views/Cart")) },
  { path: pagePaths.contactUs, element: lazyLoadable(() => import("../views/Contactus")) },
  { path: pagePaths.creams, element: lazyLoadable(() => import("../views/Creams")) },
  { path: pagePaths.faqs, element: lazyLoadable(() => import("../views/FAQ")) },
  { path: pagePaths.offers, element: lazyLoadable(() => import("../views/Offers")) },
  {
    path: pagePaths.account,
    element: lazyLoadable(() => import("../pages/customer/OrdersPage")),
  },
  {
    path: pagePaths.productDetails,
    element: lazyLoadable(() => import("../views/Productdetails")),
  },
  {
    path: pagePaths.productDetails1,
    element: lazyLoadable(() => import("../views/Productdetails")),
  },
  {
    path: pagePaths.productDetails2,
    element: lazyLoadable(() => import("../views/Productdetails")),
  },
  {
    path: pagePaths.productDetails3,
    element: lazyLoadable(() => import("../views/Productdetails")),
  },
  {
    path: pagePaths.privacyPolicy,
    element: lazyLoadable(() => import("../views/Privacypolicy")),
    props: {
      policyName: "Privacy & Policy",
      policySlug: "privacy_policy",
    },
  },
  {
    path: pagePaths.termsAndConditions,
    element: lazyLoadable(() => import("../views/Privacypolicy")),
    props: {
      policyName: "Terms and Conditions",
      policySlug: "termsAndConditions",
    },
  },
  { path: pagePaths.medicalExpert, element: lazyLoadable(() => import("../views/MedicalExpert")) },
  { path: pagePaths.sellwithus, element: lazyLoadable(() => import("../views/SellWithUs/index")) },
  {
    path: pagePaths.cancellationRefund,
    element: lazyLoadable(() => import("../views/Privacypolicy")),
    props: {
      policyName: "Cancellation & Refund",
      policySlug: "cancellation-refund",
    },
  },
  {
    path: pagePaths.disclaimerOfWarranties,
    element: lazyLoadable(() => import("../views/Privacypolicy")),
    props: {
      policyName: "Disclaimer of Warranties",
      policySlug: "disclaimer-of-warranties",
    },
  },
  {
    path: pagePaths.orderPlaced,
    element: lazyLoadable(() => import("../views/OrderPlaced")),
  },
  {
    path: `${pagePaths.topPicks}`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  {
    path: `${pagePaths.newArrivals}`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  {
    path: `${pagePaths.shopByAge}`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  {
    path: `${pagePaths.concernProduct}/:productSlug`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  {
    path: `${pagePaths.home}/:curatedSlug`,
    element: lazyLoadable(() => import("../views/CuratedProducts")),
  },
  {
    path: `${pagePaths.brand}/:brandSlug`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  {
    path: `${pagePaths.brandprod}/:brandSlug`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  { path: pagePaths.products, element: lazyLoadable(() => import("../views/ProductList")) },
  {
    path: `${pagePaths.productCategory}/:categorySlug`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  {
    path: `${pagePaths.productCategory}/:categorySlug/:subCategorySlug`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  {
    path: `${pagePaths.productCategory}/:categorySlug/:subCategorySlug/:subSubCategorySlug`,
    element: lazyLoadable(() => import("../views/ProductList")),
  },
  {
    path: pagePaths.adminCatchAll,
    element: () => <Navigate to={pagePaths.adminLogin} />,
  },
  {
    path: pagePaths.rateProduct,
    element: lazyLoadable(() => import("../views/Rateproduct")),
  },

  {
    path: pagePaths.trackOrder,
    element: lazyLoadable(() => import("../views/Header/TrackOrder")),
  },
  {
    path: pagePaths.thankYou,
    element: lazyLoadable(() => import("../views/Thankyou")),
  },
  {
    path: pagePaths.fasterOrder,
    element: lazyLoadable(() => import("../views/FasterOrder")),
  },
];

function renderRoutes(route) {
  if (!route.children?.length) {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={<route.element {...(route.props || {})} />}
      />
    );
  }
  return (
    <Route key={route.path} element={<route.element {...(route.props || {})} />}>
      {route.children.map((childRoute) => renderRoutes(childRoute))}
    </Route>
  );
}

function AppRouter() {
  return <Routes>{routes.map((route) => renderRoutes(route))}</Routes>;
}
export default AppRouter;
