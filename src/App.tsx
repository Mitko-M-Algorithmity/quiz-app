import { Quiz } from "./components/Quiz";
import { QuizContextWrapper } from "./store/quiz-context";

function App() {
  return (
    <QuizContextWrapper>
      <Quiz />
    </QuizContextWrapper>
  );
}

export default App;
