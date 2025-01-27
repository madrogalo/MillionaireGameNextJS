import { useState } from "react";
import { Sidebar } from "../Sidebar";
import styles from "./GameLayout.module.css";
import { GameActionModal } from "../GameActionModal";
import { useGameStore } from "@/app/store/gameStore";
import { MenuButton } from "../MenuButton";

type LayoutProps = {
  children: React.ReactNode;
};

export const GameLayout: React.FC<LayoutProps> = ({ children }) => {
  const {
    isGameOver,
    isGameActionModalOpen,
    score,
    closeGameActionModal,
    restartGame,
    startGame,
  } = useGameStore();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  if (isGameActionModalOpen) {
    return (
      <GameActionModal
        title="Who wants to be a millionaire?"
        isOpen={isGameActionModalOpen}
        onStart={() => {
          closeGameActionModal();
          startGame();
        }}
        onRestart={() => {
          closeGameActionModal();
          restartGame();
        }}
      />
    );
  }

  if (isGameOver) {
    return (
      <GameActionModal
        title={`${score} earned`}
        isOpen={isGameOver}
        onStart={() => {
          closeGameActionModal();
          restartGame();
        }}
        onRestart={restartGame}
        isGameFinished
      />
    );
  }

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        {/* <button className={styles.menuButton} onClick={openSidebar}>
          ☰
        </button> */}
        <div className={styles.menuButton}>
          <MenuButton variant="menu" onClick={openSidebar} />
        </div>
        {children}
      </main>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};
