import { createContext, useReducer, type ReactNode } from "react";
import questions from "../questions.ts";

type WrapperProps = {
  children: ReactNode;
};

type QuestionType = {
  id: string;
  text: string;
  answers: string[];
  userAnswer: string;
  correctAnswer: string;
};

type StateType = {
  currentQuestion: string;
  allQuestions: QuestionType[];
  correctAnswered: number;
};

export const QuizContext = createContext({
  state: {} as StateType,
  onAnswer: (correctAnswer: string, actualAnwser) => {},
});

type ActionType = {
  type: string;
  payload: string;
};

function questionReducer(state: StateType, action: ActionType) {
  const updatedState = { ...state };

  if (action.type === "CORRECT") {
    updatedState.correctAnswered++;

    const prevQuestion = updatedState.allQuestions.findIndex(
      (q) => q.id === updatedState.currentQuestion,
    );

    if (prevQuestion < updatedState.allQuestions.length - 1) {
      updatedState.currentQuestion =
        updatedState.allQuestions[prevQuestion + 1].id;
      return updatedState;
    } else {
      updatedState.currentQuestion = "completed";
    }
  } else if (action.type === "WRONG") {
    const prevQuestion = updatedState.allQuestions.findIndex(
      (q) => q.id === updatedState.currentQuestion,
    );

    if (prevQuestion < updatedState.allQuestions.length - 1) {
      updatedState.currentQuestion =
        updatedState.allQuestions[prevQuestion + 1].id;
      return updatedState;
    } else {
      updatedState.currentQuestion = "completed";
    }
  }

  return updatedState;
}

export function QuizContextWrapper({ children }: WrapperProps) {
  const [state, questionDispatcher] = useReducer(questionReducer, {
    currentQuestion: "q1",
    allQuestions: questions.map((q) => {
      return { ...q, userAnswer: "" };
    }),
    correctAnswered: 0,
  });

  function handleCorrectAnswer(userAnswer: string) {
    questionDispatcher({ type: "CORRECT", payload: userAnswer });
  }

  function handleWrongAnswer(userAnswer: string) {
    questionDispatcher({ type: "WRONG", payload: userAnswer });
  }

  function handleAnsweringQuestion(
    correctAnswer: string,
    actualAnswer: string,
  ) {
    console.log(`correct -> ${correctAnswer} | actual -> ${actualAnswer}`);

    if (correctAnswer !== actualAnswer) {
      handleWrongAnswer(actualAnswer);
    } else {
      handleCorrectAnswer(actualAnswer);
    }
  }

  const ctxValue = {
    state: state,
    onAnswer: handleAnsweringQuestion,
  };

  return <QuizContext value={ctxValue}>{children}</QuizContext>;
}
