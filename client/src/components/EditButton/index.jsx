import { RiEdit2Fill } from "react-icons/ri";
import { SiStandardresume } from "react-icons/si";
import styles from "./styles.module.scss";

const icons = {
  edit: <RiEdit2Fill size={16} />,
  standard: <SiStandardresume size={16} />,
};

const EditButton = ({ onClick, iconType = 'edit' }) => {
  return (
    <button onClick={onClick} className={styles.container}>
      {icons[iconType]}
    </button>
  );
};

export default EditButton;
