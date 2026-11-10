import { useState } from "react";

export default function QuizRunner({ quiz, onBack }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  if (!quiz || !quiz.questions.length) return <p className="muted-text">This quiz has no questions yet.</p>;

  const question = quiz.questions[current];
  const score = quiz.questions.reduce((total, item) => total + (answers[item.id] === item.answer ? 1 : 0), 0);

  function chooseAnswer(optionIndex) {
    if (!finished) setAnswers(previous => ({ ...previous, [question.id]: optionIndex }));
  }

  function finishQuiz() {
    setFinished(true);
  }

  function restartQuiz() {
    setCurrent(0);
    setAnswers({});
    setFinished(false);
  }

  if (finished) {
    return (
      <section className="quiz-result panel">
        <span className="eyebrow">QUIZ COMPLETE</span>
        <h2>{quiz.title} results</h2>
        <strong className="quiz-score">{score}/{quiz.questions.length}</strong>
        <p className="muted-text">You answered {score} questions correctly.</p>
        <div className="quiz-result-actions">
          <button className="button button-primary" onClick={restartQuiz}>Try again</button>
          <button className="button button-outline" onClick={onBack}>All quizzes</button>
        </div>
      </section>
    );
  }

  const selected = answers[question.id];
  const isLast = current === quiz.questions.length - 1;

  return (
    <section className="quiz-runner panel">
      <div className="quiz-runner-heading">
        <button className="text-button" onClick={onBack}>← All quizzes</button>
        <span className="quiz-progress">Question {current + 1} of {quiz.questions.length}</span>
      </div>
      <div className="progress-line"><span style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }} /></div>
      <span className="eyebrow">{quiz.category}</span>
      <h2>{question.question}</h2>
      <div className="quiz-options">
        {question.options.map((option, index) => (
          <button className={`quiz-option ${selected === index ? "selected" : ""}`} key={option} onClick={() => chooseAnswer(index)}>
            <span>{String.fromCharCode(65 + index)}</span>{option}
          </button>
        ))}
      </div>
      <div className="quiz-navigation">
        <button className="button button-outline" disabled={current === 0} onClick={() => setCurrent(value => value - 1)}>Previous</button>
        {isLast
          ? <button className="button button-primary" disabled={selected === undefined} onClick={finishQuiz}>Finish quiz</button>
          : <button className="button button-primary" disabled={selected === undefined} onClick={() => setCurrent(value => value + 1)}>Next question</button>}
      </div>
    </section>
  );
}
