import { useState } from "react";
import { Sidebar } from "../Sidebar";
import styles from "./GameLayout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};
export const GameLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <button className={styles.menuButton} onClick={openSidebar}>
          ☰
        </button>
        {children}
      </main>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};
