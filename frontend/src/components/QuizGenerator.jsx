import { useState } from "react";
import { api } from "../api.js";

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setQuestions(null);
    setResult(null);
    try {
      const data = await api.quiz(topic, numQuestions);
      setQuestions(data.questions);
      setUserAnswers(new Array(data.questions.length).fill(-1));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (qIndex, optIndex) => {
    const updated = [...userAnswers];
    updated[qIndex] = optIndex;
    setUserAnswers(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.evaluate(questions, userAnswers);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>🧠 Quiz Generator</h2>
      <p className="subtitle">Topic daalo, AI MCQs banayega. Answer submit karo, score paao.</p>

      <input
        type="text"
        placeholder="e.g. Photosynthesis"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <label className="small-label">
        Number of questions:
        <input
          type="number"
          min={3}
          max={10}
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          style={{ width: "60px", marginLeft: "8px" }}
        />
      </label>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Quiz"}
      </button>
      {error && <p className="error">{error}</p>}

      {questions && !result && (
        <div className="quiz-block">
          {questions.map((q, qi) => (
            <div key={qi} className="question-block">
              <p className="question-text">
                {qi + 1}. {q.question}
              </p>
              {q.options.map((opt, oi) => (
                <label key={oi} className="option-label">
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    checked={userAnswers[qi] === oi}
                    onChange={() => selectAnswer(qi, oi)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Evaluating..." : "Submit Quiz"}
          </button>
        </div>
      )}

      {result && (
        <div className="result">
          <h3>
            Score: {result.score}/{result.total} ({result.percentage}%)
          </h3>
          <p className="feedback">{result.feedback}</p>
          {result.results.map((r, i) => (
            <div key={i} className={`review ${r.isCorrect ? "correct" : "incorrect"}`}>
              <p>
                <strong>Q{i + 1}:</strong> {r.question}
              </p>
              <p>Your answer: {r.userAnswer}</p>
              {!r.isCorrect && <p>Correct answer: {r.correctAnswer}</p>}
              <p className="explanation">💡 {r.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
