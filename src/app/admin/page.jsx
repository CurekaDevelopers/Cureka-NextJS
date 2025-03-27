"use client";

import AdminFooter from "../../components/admin/AdminFooter";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { pagePaths } from "../../utils/constants/constant";

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
        <Sidebar />
        <div className={styles.main}>
          <div className={styles.pageContent}></div>
          <AdminFooter />
        </div>
      </div>
    </>
  );
}
