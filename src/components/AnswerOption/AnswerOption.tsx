'use client';
import styles from './AnswerOption.module.css';

type AnswerOptionProps = {
  state?: 'inactive' | 'selected' | 'correct' | 'wrong' | 'hover';
  text: string;
  label: string;
  onClick: () => void;
};

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  label,
  text,
  state = 'inactive',
  onClick,
}) => {
  return (
    <div onClick={onClick} className={`${styles.svgWrapper} ${styles[state]}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.text}>{text}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="inherit"
        height="inherit"
        viewBox="0 0 288 56"
        fill="none"
      >
        <path
          d="M16.8175 5.31576C18.9762 2.29361 22.4615 0.5 26.1754 0.5H261.825C265.539 0.5 269.024 2.29361 271.183 5.31576L287.386 28L271.183 50.6842C269.024 53.7064 265.539 55.5 261.825 55.5H26.1754C22.4615 55.5 18.9762 53.7064 16.8175 50.6842L0.614452 28L16.8175 5.31576Z"
          fill="white"
          stroke="#D0D0D8"
          className={`${styles.svgStroke} ${styles[state]}`}
        />
      </svg>
    </div>
  );
};
