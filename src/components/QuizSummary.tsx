import completeLogo from "../assets/quiz-complete.png";
import { useContext } from "react";
import { QuizContext } from "../store/quiz-context";

export function QuizSummary() {
  const quizState = useContext(QuizContext).state;

  const allQuestions = quizState.allQuestions;

  return (
    <div id="summary">
      <img src={completeLogo} alt="" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <div>
          <p className="number">0%</p>
          <p className="text">skipped</p>
        </div>
        <div>
          <p className="number">
            {Math.round(
              (quizState.correctAnswered / allQuestions.length) * 100,
            )}
            %
          </p>
          <p className="text">answered correctly</p>
        </div>
        <div>
          <p className="number">
            {Math.round(
              ((allQuestions.length - quizState.correctAnswered) /
                allQuestions.length) *
                100,
            )}
            %
          </p>
          <p className="text">answered incorrectly</p>
        </div>
      </div>
      <ol>
        {allQuestions.map((q, i) => {
          return (
            <li key={i}>
              <h3>{i + 1}</h3>
              <p className="question">{q.text}</p>
              <p
                className={
                  "user-answer" +
                  (q.correctAnswer === q.userAnswer ? " correct" : " wrong")
                }
              >
                {q.userAnswer}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
