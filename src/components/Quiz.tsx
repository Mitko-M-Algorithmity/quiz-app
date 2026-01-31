import { Question } from "./Question.tsx";
import { QuizSummary } from "./QuizSummary.tsx";
import { useContext } from "react";
import { QuizContext } from "../store/quiz-context.tsx";

export function Quiz() {
  const quizContext = useContext(QuizContext);

  const isQuizCompleted = quizContext.state.currentQuestion === "completed";

  const render = isQuizCompleted ? (
    <QuizSummary />
  ) : (
    <div id="quiz">
      <Question />
    </div>
  );

  return <>{render}</>;
}
