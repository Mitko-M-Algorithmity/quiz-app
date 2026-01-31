import { useContext, useState } from "react";
import { QuizContext } from "../store/quiz-context";
import { useEffect } from "react";

const QUESTION_TIMER = 10000;
const ANSWER_TIMER = 5000;
const POST_ANSWER_TIMER = 3000;

export function Question() {
  const quizContext = useContext(QuizContext);
  const currentQuestion = quizContext.state.allQuestions.find(
    (q) => q.id === quizContext.state.currentQuestion,
  );

  const [remainingQuestionTime, setRemainingQuestionTime] =
    useState(QUESTION_TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingQuestionTime((prevState) => prevState - 10);
    }, 10);

    return () => {
      clearInterval(interval);
      setRemainingQuestionTime(QUESTION_TIMER);
    };
  }, [currentQuestion!.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      quizContext.onAnswer(currentQuestion!.correctAnswer, "");
    }, QUESTION_TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [currentQuestion!.id]);

  return (
    <div id="question">
      <progress value={remainingQuestionTime} max={QUESTION_TIMER} />
      <h2 id="question-overview">{currentQuestion?.text}</h2>
      <div id="answers">
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
      </div>
    </div>
  );
}
