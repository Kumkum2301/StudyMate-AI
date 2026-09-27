import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import askRoute from "./routes/ask.js";
import summarizeRoute from "./routes/summarize.js";
import quizRoute from "./routes/quiz.js";
import evaluateRoute from "./routes/evaluate.js";
import studyplanRoute from "./routes/studyplan.js";
import chatRoute from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "StudyMate AI backend running" });
});

app.use("/api/ask", askRoute);
app.use("/api/summarize", summarizeRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/evaluate", evaluateRoute);
app.use("/api/studyplan", studyplanRoute);
app.use("/api/chat", chatRoute);

app.listen(PORT, () => {
  console.log(`✅ StudyMate AI backend running on http://localhost:${PORT}`);
});
