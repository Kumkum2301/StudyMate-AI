import { useState } from "react";
import { api } from "../api.js";

export default function StudyPlan() {
  const [examDate, setExamDate] = useState("");
  const [subjectsInput, setSubjectsInput] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const subjects = subjectsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!examDate || subjects.length === 0) {
      setError("Please enter exam date and at least one subject.");
      return;
    }

    setLoading(true);
    setError("");
    setPlan("");
    try {
      const data = await api.studyplan(examDate, subjects, hoursPerDay);
      setPlan(data.plan);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📅 Study Plan Generator</h2>
      <p className="subtitle">Exam date aur subjects daalo, personalized schedule paao.</p>

      <label className="small-label">
        Exam Date:
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
        />
      </label>

      <input
        type="text"
        placeholder="Subjects (comma separated) e.g. Maths, Physics, Chemistry"
        value={subjectsInput}
        onChange={(e) => setSubjectsInput(e.target.value)}
      />

      <label className="small-label">
        Hours per day:
        <input
          type="number"
          min={1}
          max={12}
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(Number(e.target.value))}
          style={{ width: "60px", marginLeft: "8px" }}
        />
      </label>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Study Plan"}
      </button>
      {error && <p className="error">{error}</p>}
      {plan && <div className="result plan-result">{plan}</div>}
    </div>
  );
}
