import { useState } from "react";
import { quizzes } from "../../data/quizs";
import Html5 from "./Html5";
import Css3 from "./Css3";
import JavaScript from "./JavaScript";
import ReactQuiz from "./React.js";
import Python from "./Python";
import Sql from "./Sql";
import GitGitHub from "./GitGitHub";

const quizComponents = { html5: Html5, css3: Css3, javascript: JavaScript, react: ReactQuiz, python: Python, sql: Sql, "git-github": GitGitHub };

export default function QuizPage() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedQuiz = quizzes.find(quiz => quiz.id === selectedId);
  const QuizComponent = selectedQuiz ? quizComponents[selectedQuiz.id] : null;

  if (selectedQuiz && QuizComponent) return <QuizComponent quiz={selectedQuiz} onBack={() => setSelectedId(null)} />;

  return (
    <>
      <div className="intro-row">
        <div><span className="eyebrow">PRACTICE YOUR SKILLS</span><h2>Knowledge quizzes</h2><p>Test what you know and find the topics to practise next.</p></div>
      </div>
      <section className="quiz-grid">
        {quizzes.map(quiz => (
          <button className="quiz-card panel" key={quiz.id} onClick={() => setSelectedId(quiz.id)}>
            <span className="quiz-icon">{quiz.icon}</span>
            <span className="eyebrow">{quiz.category}</span>
            <h3>{quiz.title}</h3>
            <p>{quiz.questions.length} questions · {quiz.duration} minutes</p>
            <strong>Start quiz →</strong>
          </button>
        ))}
      </section>
    </>
  );
}
