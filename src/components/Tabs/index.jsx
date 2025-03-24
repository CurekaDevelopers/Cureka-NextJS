import styles from "./styles.module.scss";

const Tabs = ({ tabs, onClick, selectedTabId }) => {
  return (
    <div className={styles.container}>
      {!!tabs.length &&
        tabs.map((item) => {
          return (
            <button
              key={item.label}
              onClick={() => onClick(item)}
              className={`${styles.tab} ${selectedTabId === item.id ? styles.selected : ""}`}
            >
              {item.label}
            </button>
          );
        })}
    </div>
  );
};

export default Tabs;
