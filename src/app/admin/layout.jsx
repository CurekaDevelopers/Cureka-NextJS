"use client"; // Ensure it's at the top

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/admin/Sidebar";
import { pagePaths } from "../../utils/constants/constant";
import styles from "./styles.module.scss";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminFooter from "../../components/admin/AdminFooter";

const AdminDashboardLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter(); // Correctly initializing useRouter

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(pagePaths.adminLogin); // Redirect to login if not logged in
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.main}>{children}</div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminDashboardLayout;
