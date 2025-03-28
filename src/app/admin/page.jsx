"use client";

import AdminFooter from "../../components/admin/AdminFooter";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { pagePaths } from "../../utils/constants/constant";
import "./styles/faq.module.scss";
import "./styles/abondcart.module.scss";
import "./styles/artical.module.scss";
import "./styles/blog.module.scss";
import "./styles/blogcreate.module.scss";
import "./styles/blogmain.module.scss";
import "./styles/brand.module.scss";
import "./styles/brandcreate.module.scss";
import "./styles/cancel.module.scss";
import "./styles/category.module.scss";
import "./styles/concern.module.scss";
import "./styles/coupon.module.scss";
import "./styles/createartical.module.scss";
import "./styles/createcategory.module.scss";
import "./styles/createconcern.module.scss";
import "./styles/createcoupon.module.scss";
import "./styles/createcurated.module.scss";
import "./styles/createemployee.module.scss";
import "./styles/createfaq.module.scss";
import "./styles/createmultiple.module.scss";
import "./styles/createorder.module.scss";
import "./styles/createpopup.module.scss";
import "./styles/createproduct.module.scss";
import "./styles/createsingleadd.module.scss";
import "./styles/curated.module.scss";
import "./styles/dashboard.module.scss";
import "./styles/disclaimer.module.scss";
import "./styles/employee.module.scss";
import "./styles/faq.module.scss";
import "./styles/home.module.scss";
import "./styles/importprice.module.scss";
import "./styles/importproduct.module.scss";
import "./styles/mission.module.scss";
import "./styles/multipleadd.module.scss";
import "./styles/orders.module.scss";
import "./styles/popup.module.scss";
import "./styles/privacy.module.scss";
import "./styles/product.module.scss";
import "./styles/productpage.module.scss";
import "./styles/productsize.module.scss";
import "./styles/rating.module.scss";
import "./styles/report.module.scss";
import "./styles/self.module.scss";
import "./styles/selfadd.module.scss";
import "./styles/singleadd.module.scss";
import "./styles/standard.module.scss";
import "./styles/standardsize.module.scss";
import "./styles/terms.module.scss";
import "./styles/uploadcurated.module.scss";
import "./styles/user.module.scss";
import "./styles/vision.module.scss";
import "./styles/blogedit.module.scss";

export default function AdminDashboardPage() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.replace("/backend/Login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // Prevents rendering while checking auth state

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        {/* <Sidebar /> */}
        <div className={styles.main}>
          <div className={styles.pageContent}></div>
          <AdminFooter />
        </div>
      </div>
    </>
  );
}
