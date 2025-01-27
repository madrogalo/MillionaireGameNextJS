"use client";

import { useGameStore } from "@/app/store/gameStore";
import { PrizeLadder } from "../PrizeLadder";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { currentQuestionIndex, questions } = useGameStore();

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
        {questions.map((question, index) => (
          <div key={index} className={styles.sidebarItem}>
            <PrizeLadder
              prize={question.prize}
              state={
                currentQuestionIndex === index
                  ? "active"
                  : currentQuestionIndex > index
                  ? "inactive"
                  : "default"
              }
            />
          </div>
        ))}
      </div>
    </aside>
  );
};
