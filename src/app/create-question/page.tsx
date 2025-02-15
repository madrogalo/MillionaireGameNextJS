'use client';
import { useState } from 'react';

interface Answer {
  text: string;
  isCorrect: boolean;
}

export default function CreateQuestionPage() {
  const [question, setQuestion] = useState<string>('');
  const [prize, setPrize] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
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
    if (!question || !prize || answers.some((a) => a.text === '')) {
      setMessage('Please fill in all fields.');
      return;
    }

    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, prize, answers }),
    });

    const data = await res.json();
    setMessage(data.success ? '✅ Question added!' : `❌ Error: ${data.error}`);
  };

  return (
    <div>
      <h2>Add Question</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prize"
        value={prize}
        onChange={(e) => setPrize(e.target.value)}
      />

      <h3>Answers</h3>
      {answers.map((answer, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Answer ${index + 1}`}
            value={answer.text}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
          <input
            type="radio"
            name="correct"
            checked={answer.isCorrect}
            onChange={() => handleCorrectChange(index)}
          />
        </div>
      ))}

      <button onClick={handleSubmit}>Add Question</button>
      <p>{message}</p>
    </div>
  );
}
