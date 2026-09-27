import { useState } from "react";
import AskAI from "./components/AskAI.jsx";
import SummarizeNotes from "./components/SummarizeNotes.jsx";
import QuizGenerator from "./components/QuizGenerator.jsx";
import StudyPlan from "./components/StudyPlan.jsx";
import DoubtSolver from "./components/DoubtSolver.jsx";

const TABS = [
  { id: "ask", label: "🤖 Ask AI", component: AskAI },
  { id: "summarize", label: "📝 Summarize", component: SummarizeNotes },
  { id: "quiz", label: "🧠 Quiz", component: QuizGenerator },
  { id: "plan", label: "📅 Study Plan", component: StudyPlan },
  { id: "doubt", label: "💬 Doubt Solver", component: DoubtSolver },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("ask");
  const ActiveComponent = TABS.find((t) => t.id === activeTab).component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 StudyMate AI</h1>
        <p>Your AI-powered study companion</p>
      </header>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        <ActiveComponent />
      </main>

      <footer className="app-footer">
        <p>Powered by Gemini API · Built for students ❤️</p>
      </footer>
    </div>
  );
}
