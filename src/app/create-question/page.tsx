'use client';
import { useState, useEffect } from 'react';
import styles from './CreateQuestions.module.css';
import { useGameStore } from '../store/gameStore';

interface Answer {
  text: string;
  isCorrect: boolean;
}

const initialState: Answer[] = [
  { text: '', isCorrect: false },
  { text: '', isCorrect: false },
  { text: '', isCorrect: false },
  { text: '', isCorrect: false },
];

export default function CreateQuestionPage() {
  const { questions, fetchQuestions } = useGameStore();

  const [question, setQuestion] = useState<string>('');
  const [prize, setPrize] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([...initialState]);
  const [message, setMessage] = useState<string>('');

  const handleAnswerChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
  };

  const handleCorrectChange = (index: number) => {
    const newAnswers = answers.map((a, i) => ({
      ...a,
      isCorrect: i === index,
    }));
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (
      !question ||
      !prize ||
      answers.some((a) => a.text === '') ||
      !answers.some((a) => a.isCorrect)
    ) {
      setMessage('Please fill in all fields.');
      setTimeout(() => {
        setMessage('');
      }, 1000);
      return;
    }

    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, prize, answers }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('✅ Question added!');
      setAnswers(initialState);
      setPrize('');
      setQuestion('');
      setTimeout(() => {
        setMessage('');
        fetchQuestions();
      }, 3000);
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Add Question</h2>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Prize"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
          className={styles.input}
        />

        <h3 className={styles.subtitle}>Answers</h3>
        {answers.map((answer, index) => (
          <div key={index} className={styles.answerRow}>
            <input
              type="text"
              placeholder={`Answer ${index + 1}`}
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className={styles.input}
            />
            <input
              type="radio"
              name="correct"
              checked={answer.isCorrect}
              onChange={() => handleCorrectChange(index)}
              className={styles.radio}
            />
          </div>
        ))}

        <button onClick={handleSubmit} className={styles.button}>
          Add Question
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </div>

      <div className={styles.formWrapper}>
        {questions.map((q, idx) => (
          <div key={q.id} className={styles.question}>
            <div className={styles.questionWrapper}>
              <p>
                {idx + 1}. {q.question}
              </p>
              <p className={styles.prize}>{q.prize}</p>
            </div>
            <div className={styles.answerWrapper}>
              {q.answers.map((a) => (
                <div
                  className={`${a.is_correct ? styles.answerCorrect : styles.answer}`}
                  key={a.text}
                >
                  {a.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
