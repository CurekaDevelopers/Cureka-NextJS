import { TbPentagon } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { pagePaths } from "../../../routes/constant";
import Impersonation from "../../Impersonation";
import styles from "./styles.module.scss";

const sideBarItems = [
  {
    label: "Dashboard",
    path: [pagePaths.adminDashboard],
    id: 2
  },
  {
    label: "Blogs",
    path: [pagePaths.adminBlogs],
    id: 1
  },
  {
    label: "Brands Management",
    path: [pagePaths.adminBrandManagement],
    id: 3
  },
  {
    label: "Products Management",
    path: [pagePaths.adminProductManagement],
    id: 4
  },
  {
    label: "Categories Management",
    path: [
      pagePaths.adminCategories,
      pagePaths.adminSubCategory,
      pagePaths.adminSubSubCategory,
      pagePaths.adminSubSubSubCategory,
    ],
    id: 5
  },
  {
    label: "Concerns Management",
    path: [pagePaths.adminConcern],
    id: 6
  },
  {
    label: "Orders Management",
    path: [pagePaths.adminOrders],
    id: 22
  },
  {
    label: "Terms & Conditions",
    path: [pagePaths.adminTermsAndCondition],
    id: 7
  },
  {
    label: "Privacy & Policy",
    path: [pagePaths.adminPrivacyPolicyPage],
    id: 8
  },
  {
    label: "Disclaimer of Warranties",
    path: [pagePaths.adminDisclaimerOfWarranties],
    id: 9
  },
  {
    label: "Cancellation & Refund",
    path: [pagePaths.adminCancellationRefund],
    id: 10
  },
  {
    label: "Import Products",
    path: [pagePaths.adminImportProducts],
    id: 11
  },
  {
    label: "Import Products Images",
    path: [pagePaths.adminImportProductsImages],
    id: 12
  },
  {
    label: "Import Products Prices",
    path: [pagePaths.adminImportProductsPrices],
    id: 25
  },
  {
    label: "Users Management",
    path: [pagePaths.adminUserManagement],
    id: 13
  },
  {
    label: "Abandoned Cart",
    path: [pagePaths.adminAbandonedCart],
    id: 14
  },
  {
    label: "Coupons Management",
    path: [pagePaths.adminCoupon],
    id: 15
  },
  {
    label: "Employees Management",
    path: [pagePaths.adminEmployee],
    id: 16
  },
  {
    label: "Rating & Review Management",
    path: [pagePaths.adminRatingAndReview],
    id: 17
  },
  {
    label: "FAQ Management",
    path: [pagePaths.adminFaqManagement],
    id: 18
  },
  {
    label: "Single Add Management",
    path: [pagePaths.adminSingleAddManagement],
    id: 19
  },
  {
    label: "Multiple Add Management",
    path: [pagePaths.adminMultipleAddManagement],
    id: 20
  },
  {
    label: "Curated Add Management",
    path: [pagePaths.adminCuratedAddManagement],
    id: 21
  },
  {
    label: "Self Add Management",
    path: [pagePaths.adminSelfAddManagement],
    id: 23
  },
  {
    label: "Popup Management",
    path: [pagePaths.adminPopupManagement],
    id: 24
  },
  {
    label: "Wallet Transaction",
    path: [pagePaths.adminUserWalletTransaction],
    id: 26
  },
  {
    label: "Home Page  Vision",
    path: [pagePaths.adminHomePageVision],
    id: 24
  },
  {
    label: "Health Page Mission",
    path: [pagePaths.adminHomePageMision],
    id: 24
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.sidebar}>
      {sideBarItems.map((item) => {
        return (
          <Impersonation moduleId={item.id}>
            <Link
              key={item.path[0]}
              to={item.path[0]}
              className={`${styles.link} ${item.path.includes(pathname) ? styles.selected : ""}`}
            >
              <div className={styles.left}>
                <TbPentagon color="#004A98" />
                {item.label}
              </div>
              <div
                style={{
                  color: "#004A98",
                }}
              >
                {">"}
              </div>
            </Link>
          </Impersonation>
        );
      })}
    </div>
  );
};

export default Sidebar;
