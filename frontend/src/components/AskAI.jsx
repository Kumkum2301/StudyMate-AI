import { useState } from "react";
import { api } from "../api.js";

export default function AskAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const data = await api.ask(question);
      setAnswer(data.answer);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>🤖 Ask AI</h2>
      <p className="subtitle">Koi bhi topic poocho, AI simple bhasha me samjhayega.</p>
      <textarea
        rows={3}
        placeholder="e.g. Explain Newton's second law of motion"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>
      {error && <p className="error">{error}</p>}
      {answer && <div className="result">{answer}</div>}
    </div>
  );
}
