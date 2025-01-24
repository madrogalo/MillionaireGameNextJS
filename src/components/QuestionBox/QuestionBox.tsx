import styles from "./QuestionBox.module.css";

type QuestionBoxProps = {
  question: string;
};

export const QuestionBox: React.FC<QuestionBoxProps> = ({ question }) => {
  return <div className={styles.questionBox}>{question}</div>;
};
