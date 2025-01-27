'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/app/store/gameStore';

import { AnswerOption } from '@/components/AnswerOption';
import { GameLayout } from '@/components/GameLayout';
import { QuestionBox } from '@/components/QuestionBox/QuestionBox';
import Spinner from '@/components/Spinner/Spinner';

import styles from './page.module.css';

export default function Home() {
  const {
    questions,
    currentQuestionIndex,
    answerState,
    selectedAnswerId,
    fetchQuestions,
    answerQuestion,
  } = useGameStore();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return <Spinner />;
  const getAlphabetLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };
  return (
    <GameLayout>
      <div className={styles.questionArea}>
        <QuestionBox question={currentQuestion.question} />
      </div>

      <div className={styles.answerSection}>
        {currentQuestion.answers.map((answer, idx) => (
          <div className={styles.answerItem} key={answer.id}>
            <AnswerOption
              state={
                selectedAnswerId === answer.id
                  ? (answerState ?? 'inactive')
                  : 'inactive'
              }
              text={answer.text}
              label={getAlphabetLabel(idx)}
              onClick={() =>
                answerState === null &&
                answerQuestion(answer.id, answer.isCorrect)
              }
            />
          </div>
        ))}
      </div>
    </GameLayout>
  );
}
