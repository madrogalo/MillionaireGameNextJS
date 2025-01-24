import styles from "./Sidebar.module.css";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.openMobile : styles.closedMobile
      }`}
    >
      <button className={styles.closeButton} onClick={closeSidebar}>
        ✕
      </button>
      <ul className={styles.prizes}>
        <li className={styles.prize}>$1,000,000</li>
        <li className={styles.prize}>$500,000</li>
        <li className={`${styles.prize} ${styles.activePrize}`}>$8,000</li>
        <li className={styles.prize}>$4,000</li>
      </ul>
    </aside>
  );
};
