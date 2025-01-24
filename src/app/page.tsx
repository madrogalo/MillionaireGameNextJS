"use client";

import { AnswerOption } from "@/components/AnswerOption";
import { GameLayout } from "@/components/GameLayout";
import { QuestionBox } from "@/components/QuestionBox/QuestionBox";

export default function Home() {
  return (
    <GameLayout>
      <QuestionBox
        question={
          "How old your elder brother was 10 years before you was born, mate?"
        }
      />
      <QuestionBox
        question={
          "How old your elder brother was 10 years before you was born, mate?"
        }
      />

      <AnswerOption state="inactive" text={"10 years"} label="A" />
      <AnswerOption state="correct" text={"10 years"} label="A" />
      <AnswerOption state="wrong" text={"10 years"} label="A" />
      <AnswerOption state="selected" text={"10 years"} label="A" />
    </GameLayout>
  );
}
