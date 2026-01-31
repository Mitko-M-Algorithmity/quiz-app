import { useContext } from "react";
import { QuizContext } from "../store/quiz-context";

export function Answers() {
  const quizContext = useContext(QuizContext);
  const currentQuestion = quizContext.state.allQuestions.find(
    (q) => q.id === quizContext.state.currentQuestion,
  );

  return (
    <>
      {currentQuestion?.answers.map((a) => {
        return (
          <div className="answer" key={a}>
            <button
              onClick={() =>
                quizContext.onAnswer(currentQuestion.correctAnswer, a)
              }
            >
              {a}
            </button>
          </div>
        );
      })}
    </>
  );
}
