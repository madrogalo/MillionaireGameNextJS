"use client";

import { AnswerOption } from "@/components/AnswerOption";

import { GameLayout } from "@/components/GameLayout";
import { QuestionBox } from "@/components/QuestionBox/QuestionBox";

import styles from "./page.module.css";

export default function Home() {
  return (
    <GameLayout>
      <div className={styles.questionArea}>
        <QuestionBox
          question={
            "How old your elder brother was 10 years before you was born, mate?"
          }
        />
      </div>

      <div className={styles.answerSection}>
        <div className={styles.answerItem}>
          <AnswerOption state="inactive" text={"10 years"} label="A" />
        </div>
        <div className={styles.answerItem}>
          <AnswerOption state="correct" text={"10 years"} label="A" />
        </div>
        <div className={styles.answerItem}>
          <AnswerOption state="wrong" text={"30 years"} label="A" />
        </div>
        <div className={styles.answerItem}>
          <AnswerOption state="selected" text={"20 years"} label="A" />
        </div>
      </div>
    </GameLayout>
  );
}
