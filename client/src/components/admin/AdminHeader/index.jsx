import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setIsLoggedIn } from "../../../redux/slices/auth.slice";
import { pagePaths } from "../../../routes/constant";
import styles from "./styles.module.scss";

export default function AdminHeader() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(setIsLoggedIn(false));
  };

  return (
    <nav className={styles.container}>
      <Link className={styles.homeLink} to={pagePaths.adminDashboard}>
        <img
          src="/images/admin/cureka-admin-logo.svg"
          alt="Logo"
          width="200px"
          height="50px"
          className={styles.logoImage}
        />
      </Link>
      <Button variant="outline-light" className={styles.headerProfileMenu} onClick={onLogout}>
        Logout
      </Button>
    </nav>
  );
}
