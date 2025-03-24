import { RxCrossCircled } from "react-icons/rx";
import styles from "./styles.module.scss";

const RejectButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className={styles.container}>
            <RxCrossCircled size={16} />
        </button>
    );
};

export default RejectButton;
