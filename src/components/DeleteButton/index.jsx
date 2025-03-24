import { RiDeleteBin5Fill } from "react-icons/ri";
import styles from "./styles.module.scss";

const DeleteButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.container}>
      <RiDeleteBin5Fill size={16} color="#DC3444" />
    </button>
  );
};

export default DeleteButton;
