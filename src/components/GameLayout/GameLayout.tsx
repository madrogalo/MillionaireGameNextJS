import { useState } from "react";
import { Sidebar } from "../Sidebar";
import styles from "./GameLayout.module.css";
import { GameActionModal } from "../GameActionModal";

type LayoutProps = {
  children: React.ReactNode;
};

export const GameLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isGameActionModal, setGameActionModalOpen] = useState(true);

  const handleStart = () => {
    console.log("Game Started!");
    setGameActionModalOpen(false);
  };

  const handleRestart = () => {
    console.log("Game Restarted!");
    setGameActionModalOpen(false);
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  if (isGameActionModal) {
    return (
      <GameActionModal
        isOpen={isGameActionModal}
        onStart={handleStart}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <button className={styles.menuButton} onClick={openSidebar}>
          ☰
        </button>
        {children}
      </main>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      {/* 
      <GameActionModal
        isOpen={isGameActionModal}
        onStart={handleStart}
        onRestart={handleRestart}
      /> */}
    </div>
  );
};
