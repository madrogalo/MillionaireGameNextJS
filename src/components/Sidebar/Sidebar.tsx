import { PrizeLadder } from "../PrizeLadder";
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

      <div className={styles.sidebarContent}>
        <div className={styles.sidebarItem}>
          <PrizeLadder prize={"$1,000,000"} />
        </div>
        <div className={styles.sidebarItem}>
          <PrizeLadder prize={"$500,000"} />
        </div>

        <div className={styles.sidebarItem}>
          <PrizeLadder prize={"$200,000"} />
        </div>
        <div className={styles.sidebarItem}>
          <PrizeLadder prize={"$100,000"} state="active" />
        </div>
        <div className={styles.sidebarItem}>
          <PrizeLadder prize={"$1,000"} state="inactive" />
        </div>
        <div className={styles.sidebarItem}>
          <PrizeLadder prize={"$500"} state="inactive" />
        </div>
      </div>
    </aside>
  );
};
