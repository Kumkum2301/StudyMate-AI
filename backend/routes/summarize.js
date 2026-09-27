import express from "express";
import { callGemini } from "../utils/gemini.js";

const router = express.Router();

// POST /api/summarize  { notes: string }
router.post("/", async (req, res) => {
  try {
    const { notes } = req.body;
    if (!notes || !notes.trim()) {
      return res.status(400).json({ error: "Notes text is required." });
    }

    const prompt = `You are StudyMate AI. Summarize the following study notes into short,
clear, exam-friendly bullet points. Keep key terms, definitions, and formulas intact.
Organize with headings if the content covers multiple sub-topics.

NOTES:
${notes}`;

    const summary = await callGemini(prompt, { maxOutputTokens: 1024 });
    res.json({ summary });
  } catch (err) {
    console.error("Summarize error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
