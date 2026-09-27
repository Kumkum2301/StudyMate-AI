import express from "express";
import { callGemini } from "../utils/gemini.js";

const router = express.Router();

// POST /api/studyplan  { examDate: string, subjects: string[], hoursPerDay?: number }
router.post("/", async (req, res) => {
  try {
    const { examDate, subjects, hoursPerDay = 3 } = req.body;
    if (!examDate || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ error: "examDate and subjects[] are required." });
    }

    const prompt = `Create a personalized day-wise study plan for a student.
Exam date: ${examDate}
Subjects to cover: ${subjects.join(", ")}
Available study time per day: ${hoursPerDay} hours

Today's date should be assumed as the current date. Distribute subjects evenly with revision days
before the exam. Format the plan as clear markdown with a heading per day (Day 1, Day 2, ...),
listing subject/topic focus and short study tips. Keep it realistic and motivating.`;

    const plan = await callGemini(prompt, { maxOutputTokens: 2048 });
    res.json({ plan });
  } catch (err) {
    console.error("Study plan error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
