"use client";

import AdminFooter from "../../components/admin/AdminFooter";
import AdminHeader from "../../components/admin/AdminHeader";
import Sidebar from "../../components/admin/Sidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./styles.module.scss";

export default function AdminDashboardPage() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/admin/Login");
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <div className={styles.container}>
        <div id="admin-main" className={styles.main}>
          <div className={styles.pageContent}></div>
          <AdminFooter />
        </div>
      </div>
    </>
  );
}
