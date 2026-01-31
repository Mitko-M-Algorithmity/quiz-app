import completeLogo from "../assets/quiz-complete.png";

export function QuizSummary() {
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
          <p className="number">0%</p>
          <p className="text">answered correctly</p>
        </div>
        <div>
          <p className="number">0%</p>
          <p className="text">answered incorrectly</p>
        </div>
      </div>
      <ol>
        <li>
          <h3>1</h3>
          <p className="question">Some question</p>
          <p className="user-answer correct">Some answer</p>
        </li>
      </ol>
    </div>
  );
}
