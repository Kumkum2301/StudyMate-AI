import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

// POST /api/chat  { history: [{role: "user"|"model", text: string}], message: string }
router.post("/", async (req, res) => {
  try {
    const { history = [], message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY missing on server." });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemPreamble = {
      role: "user",
      parts: [
        {
          text: "You are StudyMate AI's Doubt Solver. Answer student doubts clearly and patiently, step by step, in simple Hinglish/English. This is the start of the conversation.",
        },
      ],
    };

    const contents = [
      systemPreamble,
      ...history.map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("\n") ??
      "Sorry, I couldn't generate a response.";

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
