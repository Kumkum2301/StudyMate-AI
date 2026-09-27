import express from "express";
import { callGemini } from "../utils/gemini.js";

const router = express.Router();

// POST /api/quiz  { topic: string, numQuestions?: number }
router.post("/", async (req, res) => {
  try {
    const { topic, numQuestions = 5 } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: "Topic is required." });
    }

    const prompt = `Generate ${numQuestions} multiple-choice questions (MCQs) on the topic: "${topic}".
Return ONLY valid JSON, no markdown, no backticks, no extra text, in this exact structure:

{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "string"
    }
  ]
}`;

    const raw = await callGemini(prompt, { maxOutputTokens: 2048, temperature: 0.6 });

    const cleaned = raw.replace(/```json|```/g, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Quiz JSON parse failed:", cleaned);
      return res.status(500).json({ error: "AI response could not be parsed. Try again." });
    }

    res.json(parsed);
  } catch (err) {
    console.error("Quiz generation error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
