# 🚀 StudyMate AI

An AI-powered student study assistant built with **React (Vite)**, **Node/Express**, and the **Gemini API**.

Gemini is the core engine of every feature below — not just a chatbot bolted on.

## ✨ Features

1. **Ask AI** — Ask any topic/question, Gemini explains it simply in Hinglish/English.
2. **Summarize Notes** — Paste or upload notes, Gemini generates short exam-friendly notes.
3. **Quiz Generator** — Enter a topic, Gemini generates MCQs.
4. **Quiz Evaluation** — Submit answers, get score + AI-generated feedback + explanations.
5. **Study Plan** — Enter exam date + subjects, Gemini builds a personalized day-wise schedule.
6. **Doubt Solver** — A dedicated conversational chat with Gemini for follow-up doubts.

## 🧱 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **AI:** Google Gemini API (`gemini-3.8-flash`)

## 📁 Project Structure

```
studymate-ai/
├── backend/
│   ├── routes/
│   │   ├── ask.js
│   │   ├── summarize.js
│   │   ├── quiz.js
│   │   ├── evaluate.js
│   │   ├── studyplan.js
│   │   └── chat.js
│   ├── utils/
│   │   └── gemini.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AskAI.jsx
│   │   │   ├── SummarizeNotes.jsx
│   │   │   ├── QuizGenerator.jsx
│   │   │   ├── StudyPlan.jsx
│   │   │   └── DoubtSolver.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api.js
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## ⚙️ Setup Instructions

### 1. Get a Gemini API key
Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and generate a free API key.

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# open .env and paste your GEMINI_API_KEY
npm run dev
```
Backend runs on `http://localhost:5000`.

### 3. Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` and proxies `/api` requests to the backend.

### 4. Open the app
Visit `http://localhost:5173` in your browser. 🎉

## 🔐 Environment Variables

`backend/.env` (create from `.env.example`):
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

**Never commit your `.env` file** — it's already covered by `.gitignore`.

## 📦 Deployment Notes

- Deploy `backend/` to any Node host (Render, Railway, etc.) and set `GEMINI_API_KEY` as an environment variable there.
- Deploy `frontend/` (after `npm run build`) to Vercel/Netlify, and update the API base URL / proxy for production.

## 🙌 Credits

Built as a personal study-tools project, powered by the Gemini API.
