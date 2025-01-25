"use client";

import { AnswerOption } from "@/components/AnswerOption";

import { GameLayout } from "@/components/GameLayout";
import { QuestionBox } from "@/components/QuestionBox/QuestionBox";

export default function Home() {
  return (
    <GameLayout>
      <div style={{ marginTop: 150 }}>
        <QuestionBox
          question={
            "How old your elder brother was 10 years before you was born, mate?"
          }
        />
      </div>

      <div
        style={{
          marginTop: 150,

          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <AnswerOption state="inactive" text={"10 years"} label="A" />
        <AnswerOption state="correct" text={"10 years"} label="A" />
        <AnswerOption state="wrong" text={"30 years"} label="A" />
        <AnswerOption state="selected" text={"20 years"} label="A" />
      </div>
    </GameLayout>
  );
}
