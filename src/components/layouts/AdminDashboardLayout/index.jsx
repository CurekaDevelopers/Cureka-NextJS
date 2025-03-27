"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useRouter } from "next/navigation";
import AdminFooter from "../../components/admin/AdminFooter";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import { pagePaths } from "../../utils/constants/constant";
import styles from "./styles.module.scss";

const AdminDashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate.push("/backend/Login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <Sidebar />
        <div id="admin-main" className={styles.main}>
          <Outlet />
          <AdminFooter />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
