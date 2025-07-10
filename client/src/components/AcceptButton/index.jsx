import { RxCheckCircled } from "react-icons/rx";
import styles from "./styles.module.scss";

const AcceptButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className={styles.container}>
            <RxCheckCircled size={16} />
        </button>
    );
};

export default AcceptButton;
