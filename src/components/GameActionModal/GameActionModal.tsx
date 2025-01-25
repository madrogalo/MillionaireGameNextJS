import { useState } from "react";
import styles from "./GameActionModal.module.css";

type GameActionModalProps = {
  isOpen: boolean;
  onStart: () => void;
  onRestart: () => void;
};

export const GameActionModal: React.FC<GameActionModalProps> = ({
  isOpen,
  onStart,
  onRestart,
}) => {
  const [isGameOver, setIsGameOver] = useState(false);

  const handleAction = () => {
    if (isGameOver) {
      onRestart();
    } else {
      onStart();
    }
    closeModal();
  };

  const closeModal = () => {
    setIsGameOver(false);
  };

  if (!isOpen) return null;
  return (
    <div className={styles.gameActionModal}>
      <div className={styles.modalBackground}></div>
      <div className={styles.modalContent}>
        <div className={styles.imageContainer}>👍</div>
        <h1 className={styles.title}>Who wants to be a millionaire?</h1>
        <button className={styles.startButton} onClick={handleAction}>
          {isGameOver ? "Restart Game" : "Start Game"}
        </button>
      </div>
    </div>
  );
};
