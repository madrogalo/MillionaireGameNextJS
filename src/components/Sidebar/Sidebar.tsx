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

      <div style={{ marginTop: 150, marginBottom: 150 }}>
        <PrizeLadder prize={"$10,000,000"} />
        <PrizeLadder prize={"$1,000,000"} />
        <PrizeLadder prize={"$100,000"} state="active" />
        <PrizeLadder prize={"$10,000"} state="inactive" />
        <PrizeLadder prize={"$1,000"} state="inactive" />
        <PrizeLadder prize={"$1,000"} state="inactive" />
        <PrizeLadder prize={"$1,000"} state="inactive" />
        <PrizeLadder prize={"$1,000"} state="inactive" />
        <PrizeLadder prize={"$1,000"} state="inactive" />
        <PrizeLadder prize={"$1,000"} state="inactive" />
        <PrizeLadder prize={"$1,000"} state="inactive" />
        <PrizeLadder prize={"$1,000"} state="inactive" />
      </div>
    </aside>
  );
};
