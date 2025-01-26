import { useState } from "react";
import Image from "next/image";
import styles from "./GameActionModal.module.css";
import { Button } from "../Button";

type GameActionModalProps = {
  isOpen: boolean;
  title: string;
  isGameFinished?: boolean;
  onStart: () => void;
  onRestart: () => void;
};

export const GameActionModal: React.FC<GameActionModalProps> = ({
  isOpen,
  title,
  isGameFinished = false,
  onStart,
  onRestart,
}) => {
  const [isGameOver, setIsGameOver] = useState(isGameFinished);

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
      {!isGameFinished && <div className={styles.modalBackground}></div>}
      <div className={styles.modalContent}>
        <div className={styles.imageContainer}>
          <Image
            src="/hand1.svg"
            alt="Hand img"
            priority
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            {isGameFinished && (
              <div className={styles.subtitle}>Total score:</div>
            )}

            <div className={styles.title}>{title}</div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              title={isGameFinished ? "Try again" : "Start"}
              onClick={handleAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
