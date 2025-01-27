'use client';

import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  title: string;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button className={styles.actionButton} onClick={onClick}>
      {title}
    </button>
  );
};
