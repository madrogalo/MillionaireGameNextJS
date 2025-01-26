import { useState } from "react";
import { Sidebar } from "../Sidebar";
import styles from "./GameLayout.module.css";
import { GameActionModal } from "../GameActionModal";

type LayoutProps = {
  children: React.ReactNode;
};

export const GameLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isGameActionModal, setGameActionModalOpen] = useState(false);

  const [isGameOver, setIsGameOver] = useState(true);

  const handleStart = () => {
    console.log("Game Started!");
    setGameActionModalOpen(false);
    setIsGameOver(false);
  };

  const handleRestart = () => {
    console.log("Game Restarted!");
    setGameActionModalOpen(false);
    setIsGameOver(false);
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  if (isGameActionModal) {
    return (
      <GameActionModal
        title="Who wants to be a millionaire?"
        isOpen={isGameActionModal}
        onStart={handleStart}
        onRestart={handleRestart}
      />
    );
  }

  if (isGameOver) {
    return (
      <GameActionModal
        title="$8,000 earned"
        isOpen={isGameOver}
        onStart={handleStart}
        onRestart={handleRestart}
        isGameFinished
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
    </div>
  );
};
