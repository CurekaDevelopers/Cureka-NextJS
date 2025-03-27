"use client";

import { TbPentagon } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { pagePaths } from "../../../utils/constants/constant";
import Impersonation from "../../Impersonation";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";

// Optimize dynamic import with a loading state
const renderPolicypage = dynamic(
  () => import("../../../app/admin/PrivacyPolicyPage/page"),
  { ssr: false, loading: () => <p>Loading...</p> }
);

// Sidebar menu items
const sideBarItems = [
  { label: "Dashboard", path: pagePaths.adminDashboard, id: 2 },
  { label: "Blogs", path: pagePaths.adminBlogs, id: 1 },
  { label: "Brands Management", path: pagePaths.adminBrandManagement, id: 3 },
  {
    label: "Products Management",
    path: pagePaths.adminProductManagement,
    id: 4,
  },
  { label: "Categories Management", path: pagePaths.adminCategories, id: 5 },
  { label: "Orders Management", path: pagePaths.adminOrders, id: 22 },
  {
    label: "Terms & Conditions",
    path: pagePaths.adminTermsAndCondition,
    id: 7,
  },
  {
    label: "Privacy & Policy",
    path: pagePaths.adminPrivacyPolicyPage,
    render: () => renderPolicypage("Privacy & Policy", "privacyPolicy"),
    id: 8,
  },
  {
    label: "Disclaimer of Warranties",
    path: pagePaths.adminDisclaimerOfWarranties,
    render: () =>
      renderPolicypage("Disclaimer of Warranties", "disclaimerOfWarranties"),
    id: 9,
  },
  {
    label: "Cancellation & Refund",
    path: pagePaths.adminCancellationRefund,
    render: () =>
      renderPolicypage("Cancellation & Refund", "cancellationRefund"),
    id: 10,
  },
  { label: "Import Products", path: pagePaths.adminImportProducts, id: 11 },
  {
    label: "Import Product Images",
    path: pagePaths.adminImportProductsImages,
    id: 12,
  },
  {
    label: "Import Product Prices",
    path: pagePaths.adminImportProductsPrices,
    id: 25,
  },
  { label: "Users Management", path: pagePaths.adminUserManagement, id: 13 },
  { label: "Abandoned Cart", path: pagePaths.adminAbandonedCart, id: 14 },
  { label: "Coupons Management", path: pagePaths.adminCoupon, id: 15 },
  { label: "Employees Management", path: pagePaths.adminEmployee, id: 16 },
  {
    label: "Rating & Review Management",
    path: pagePaths.adminRatingAndReview,
    id: 17,
  },
  { label: "FAQ Management", path: pagePaths.adminFaqManagement, id: 18 },
  {
    label: "Single Add Management",
    path: pagePaths.adminSingleAddManagement,
    id: 19,
  },
  {
    label: "Multiple Add Management",
    path: pagePaths.adminMultipleAddManagement,
    id: 20,
  },
  {
    label: "Curated Add Management",
    path: pagePaths.adminCuratedAddManagement,
    id: 21,
  },
  {
    label: "Self Add Management",
    path: pagePaths.adminSelfAddManagement,
    id: 23,
  },
  { label: "Popup Management", path: pagePaths.adminPopupManagement, id: 24 },
  {
    label: "Wallet Transaction",
    path: pagePaths.adminUserWalletTransaction,
    id: 26,
  },
  { label: "Home Page Vision", path: pagePaths.adminHomePageVision, id: 27 },
  { label: "Health Page Mission", path: pagePaths.adminHomePageMision, id: 28 },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      {sideBarItems.map((item) => (
        <Impersonation key={item.id} moduleId={item.id}>
          <Link
            href={item.path}
            prefetch={true} // Enables faster navigation
            className={styles.link}
          >
            <div className={styles.left}>
              <TbPentagon color="#004A98" size={18} />
              <span>{item.label}</span>
            </div>
          </Link>
        </Impersonation>
      ))}
    </div>
  );
};

export default Sidebar;
