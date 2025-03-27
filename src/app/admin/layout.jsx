"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/admin/Sidebar";
import { pagePaths } from "../../utils/constants/constant";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";

const AdminHeader = dynamic(() => import("../../components/admin/AdminHeader"));
const AdminFooter = dynamic(() => import("../../components/admin/AdminFooter"));

export default function AdminLayout({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/backend/Login");
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
}
