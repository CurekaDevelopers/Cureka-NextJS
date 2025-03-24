import styles from "./styles.module.scss";

const Card = ({ children, className = "" }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default Card;
