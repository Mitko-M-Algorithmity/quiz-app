import { useContext, useState } from "react";
import { QuizContext } from "../store/quiz-context";
import { useEffect } from "react";

const QUESTION_TIMER = 10000;
const ANSWER_TIMER = 1000;
const POST_ANSWER_TIMER = 2000;

export function Question() {
  const quizContext = useContext(QuizContext);
  const currentQuestion = quizContext.state.allQuestions.find(
    (q) => q.id === quizContext.state.currentQuestion,
  );

  const [phase, setPhase] = useState<"question" | "selected" | "feedback">(
    "question",
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState(QUESTION_TIMER);
  const [maxTime, setMaxTime] = useState(QUESTION_TIMER);

  //Interval used for the progress bar
  useEffect(() => {
    let duration =
      phase === "question"
        ? QUESTION_TIMER
        : phase === "selected"
          ? ANSWER_TIMER
          : POST_ANSWER_TIMER;

    setRemainingTime(duration);
    setMaxTime(duration);

    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => clearInterval(interval);
  }, [phase, currentQuestion!.id]);

  //Question timer
  useEffect(() => {
    if (phase !== "question") return;

    const timer = setTimeout(() => {
      setPhase("feedback");

      setTimeout(() => {
        quizContext.onAnswer(currentQuestion!.correctAnswer, "");
        setPhase("question");
      }, POST_ANSWER_TIMER);
    }, QUESTION_TIMER);

    return () => clearTimeout(timer);
  }, [phase, currentQuestion!.id]);

  function handleSelect(answer: string) {
    if (phase !== "question") return;

    setSelectedAnswer(answer);
    setPhase("selected");

    setTimeout(() => {
      setPhase("feedback");

      setTimeout(() => {
        quizContext.onAnswer(currentQuestion!.correctAnswer, answer);
        setSelectedAnswer(null);
        setPhase("question");
      }, POST_ANSWER_TIMER);
    }, ANSWER_TIMER);
  }

  //Setting the rigth class string
  let buttonClass = "";

  switch (phase) {
    case "selected":
      buttonClass = "selected";
      break;
    case "feedback":
      if (selectedAnswer === currentQuestion!.correctAnswer) {
        buttonClass = "correct";
      } else {
        buttonClass = "wrong";
      }
      break;
  }

  return (
    <div id="question">
      <progress value={remainingTime} max={maxTime} />
      <h2 id="question-overview">{currentQuestion?.text}</h2>
      <div id="answers">
        {currentQuestion?.answers.map((a) => {
          return (
            <div className="answer" key={a}>
              <button
                className={selectedAnswer === a ? buttonClass : ""}
                onClick={() => handleSelect(a)}
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
