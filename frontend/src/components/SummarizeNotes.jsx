import { useState } from "react";
import { api } from "../api.js";

export default function SummarizeNotes() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");
    try {
      const data = await api.summarize(notes);
      setSummary(data.summary);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNotes(ev.target.result);
    reader.readAsText(file);
  };

  return (
    <div className="card">
      <h2>📝 Summarize Notes</h2>
      <p className="subtitle">Apne notes paste karo ya .txt file upload karo.</p>
      <textarea
        rows={6}
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {error && <p className="error">{error}</p>}
      {summary && <div className="result">{summary}</div>}
    </div>
  );
}
