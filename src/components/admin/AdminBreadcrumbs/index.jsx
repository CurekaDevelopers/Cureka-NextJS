import Link from "next/link";
import { pagePaths } from "../../../utils/constants/constant";
import styles from "./styles.module.scss";

const AdminBreadcrumbs = ({ items }) => {
  return (
    <div className={styles.container}>
      <Link href={pagePaths.adminDashboard} className={styles.mainHeader}>
        Dashboard
      </Link>
      {!!items?.length &&
        items.map((item, index) =>
          item.path ? (
            <div key={item.path || index} className={styles.itemsDiv}>
              <div>/</div>
              <Link href={item.path} className={styles.items}>
                {item.label}
              </Link>
            </div>
          ) : null
        )}
    </div>
  );
};

export default AdminBreadcrumbs;
