import { RiSendPlaneFill } from "react-icons/ri";
import styles from "./styles.module.scss";

const ReplayButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className={styles.container}>
            <RiSendPlaneFill size={16} />
        </button>
    );
};

export default ReplayButton;