import { Answers } from "./Answers.tsx";
import { useContext } from "react";
import { QuizContext } from "../store/quiz-context";

export function Question() {
  const quizContext = useContext(QuizContext);
  const currentQuestion = quizContext.state.allQuestions.find(
    (q) => q.id === quizContext.state.currentQuestion,
  );

  return (
    <div id="question">
      <progress />
      <h2 id="question-overview">{currentQuestion?.text}</h2>
      <div id="answers">
        <Answers />
      </div>
    </div>
  );
}
