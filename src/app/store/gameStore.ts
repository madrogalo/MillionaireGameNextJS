import { create } from "zustand";

type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: number;
  question: string;
  answers: Answer[];
  prize: string;
};

type GameState = {
  isFirstStart: boolean | undefined;
  questions: Question[];
  currentQuestionIndex: number;
  score: string;
  selectedAnswerId: number | null;
  answerState: "inactive" | "correct" | "wrong" | null;
  isGameOver: boolean;
  isGameActionModalOpen: boolean;

  fetchQuestions: () => Promise<void>;
  answerQuestion: (answerId: number, isCorrect: boolean) => void;
  startGame: () => void;
  restartGame: () => void;
  openGameActionModal: () => void;
  closeGameActionModal: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: "$0",
  selectedAnswerId: null,
  answerState: null,
  isGameOver: false,
  isGameActionModalOpen: true,
  isFirstStart: true,
  fetchQuestions: async () => {
    try {
      const response = await fetch("/questions.json");
      const data = await response.json();
      set({ questions: data });
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  },

  answerQuestion: (answerId, isCorrect) => {
    set({
      selectedAnswerId: answerId,
      answerState: isCorrect ? "correct" : "wrong",
    });

    setTimeout(() => {
      if (isCorrect) {
        const { currentQuestionIndex, questions } = get();

        if (currentQuestionIndex + 1 >= questions.length) {
          set({
            isGameOver: true,
            score: questions[currentQuestionIndex].prize,
          });
        } else {
          set({
            currentQuestionIndex: currentQuestionIndex + 1,
            score: questions[currentQuestionIndex].prize,
            selectedAnswerId: null,
            answerState: null,
          });
        }
      } else {
        set({ isGameOver: true });
      }
    }, 1000);
  },

  startGame: () => {
    set({
      currentQuestionIndex: 0,
      score: "$0",
      isGameOver: false,
      isGameActionModalOpen: false,
      isFirstStart: false,
      selectedAnswerId: null,
      answerState: null,
    });
  },

  restartGame: () => {
    set({
      currentQuestionIndex: 0,
      score: "$0",
      isGameOver: false,
      isGameActionModalOpen: get().isFirstStart,
      selectedAnswerId: null,
      answerState: null,
    });
  },

  openGameActionModal: () => set({ isGameActionModalOpen: true }),
  closeGameActionModal: () => set({ isGameActionModalOpen: false }),
}));
