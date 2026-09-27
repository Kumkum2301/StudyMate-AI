import express from "express";
import { callGemini } from "../utils/gemini.js";

const router = express.Router();

// POST /api/ask  { question: string }
router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ error: "Question is required." });
    }

    const prompt = `You are StudyMate AI, a friendly study assistant for Indian students.
Explain the following topic/question simply, in easy Hinglish or English (whichever fits naturally),
using short paragraphs and bullet points where useful. Keep it clear and exam-friendly.

Question: ${question}`;

    const answer = await callGemini(prompt);
    res.json({ answer });
  } catch (err) {
    console.error("Ask AI error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
