import express from "express";
import { callGemini } from "../utils/gemini.js";

const router = express.Router();

// POST /api/evaluate
// { questions: [{question, options, correctIndex, explanation}], userAnswers: [number] }
router.post("/", async (req, res) => {
  try {
    const { questions, userAnswers } = req.body;
    if (!Array.isArray(questions) || !Array.isArray(userAnswers)) {
      return res.status(400).json({ error: "questions and userAnswers arrays are required." });
    }

    let score = 0;
    const results = questions.map((q, i) => {
      const isCorrect = userAnswers[i] === q.correctIndex;
      if (isCorrect) score += 1;
      return {
        question: q.question,
        userAnswer: q.options?.[userAnswers[i]] ?? "Not answered",
        correctAnswer: q.options?.[q.correctIndex],
        isCorrect,
        explanation: q.explanation,
      };
    });

    const percentage = Math.round((score / questions.length) * 100);

    // Ask Gemini for a short personalized feedback message
    let feedback = "";
    try {
      const prompt = `A student scored ${score} out of ${questions.length} (${percentage}%) on a quiz.
Give a short (2-3 sentence), encouraging, personalized feedback message in simple Hinglish/English,
mentioning what to focus on next if the score is low, or praise if it's high.`;
      feedback = await callGemini(prompt, { maxOutputTokens: 200 });
    } catch (e) {
      feedback = "Keep practicing regularly to improve your score!";
    }

    res.json({ score, total: questions.length, percentage, results, feedback });
  } catch (err) {
    console.error("Evaluate error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
