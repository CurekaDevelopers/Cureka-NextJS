import { Link } from "react-router-dom";
import { pagePaths } from "../../../routes/constant";
import styles from "./styles.module.scss";

const AdminBreadcrumbs = ({ items }) => {
  return (
    <div className={styles.container}>
      <Link to={pagePaths.adminDashboard} className={styles.mainHeader}>
        Dashboard
      </Link>
      {!!items?.length &&
        items.map((item) => (
          <div key={item.path} className={styles.itemsDiv}>
            <div>/</div>
            <Link to={item.path} className={styles.items}>
              {item.label}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AdminBreadcrumbs;
