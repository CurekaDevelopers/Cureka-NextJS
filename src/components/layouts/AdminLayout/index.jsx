import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

const AdminLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
