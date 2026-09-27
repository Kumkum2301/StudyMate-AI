📚 StudyMate AI

An AI-powered student study assistant built with React (Vite), Node.js/Express, and the Google Gemini API.

Gemini is the core AI engine behind the application's study features—not just a chatbot or coding assistant.

✨ Features

1. 🤖 Ask AI

Ask questions on any topic and get clear explanations in simple language.

2. 📝 Summarize Notes

Paste study material and generate concise, exam-friendly notes using Gemini.

3. 🧠 Quiz Generator

Enter a topic and generate AI-powered multiple-choice questions for practice.

4. ✅ Quiz Evaluation

Submit quiz answers and receive AI-generated feedback and explanations.

5. 📅 Study Plan

Enter your exam date, subjects, and available study hours to generate a personalized study schedule.

6. 💡 Doubt Solver

Get conversational explanations for difficult concepts and follow-up questions.

🧩 Gemini API Integration

The Google Gemini API is directly integrated into the backend and powers the core AI functionality.

Gemini is used for:

- Answer generation
- Note summarization
- Quiz generation
- Quiz evaluation
- Personalized study-plan generation
- Doubt solving and explanations

The frontend communicates with the Node.js/Express backend, and the backend securely handles Gemini API requests.

🛠️ Tech Stack

Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

Backend

- Node.js
- Express.js
- REST API

AI

- Google Gemini API

📁 Project Structure

StudyMate-AI/
│
├── backend/
│   ├── routes/
│   │   ├── ask.js
│   │   ├── chat.js
│   │   ├── quiz.js
│   │   ├── studyplan.js
│   │   └── summarize.js
│   │
│   ├── utils/
│   │   └── gemini.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AskAI.jsx
│   │   │   ├── DoubtSolver.jsx
│   │   │   ├── QuizGenerator.jsx
│   │   │   ├── StudyPlan.jsx
│   │   │   └── SummarizeNotes.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

🚀 Local Setup

1. Clone the repository

git clone https://github.com/Kumkum2301/StudyMate-AI.git
cd StudyMate-AI

2. Backend setup

cd backend
npm install

Create a ".env" file inside the "backend" folder:

GEMINI_API_KEY=your_gemini_api_key
PORT=5000

Start the backend:

npm run dev

Backend runs on:

http://localhost:5000

3. Frontend setup

Open another terminal:

cd frontend
npm install
npm run dev

Open the local URL shown by Vite, usually:

http://localhost:5173

🔐 Environment Variables

Never commit your real API key to GitHub.

The ".env" file is excluded using ".gitignore".

Use:

GEMINI_API_KEY=your_gemini_api_key

instead of publishing an actual API key.

🎯 Hackathon Focus

StudyMate AI is designed to make studying more interactive and personalized by combining multiple study workflows with a single Gemini-powered assistant.

Instead of providing only general chat, the application provides dedicated tools for:

Understanding → Summarizing → Practicing → Planning → Doubt Solving

🤖 AI Assistance Disclosure

AI-assisted development tools were used during development for coding assistance, debugging, troubleshooting, documentation, and implementation guidance.

The project's functionality, integration, testing, and final implementation were reviewed and assembled as part of the hackathon project development.

🏆 Hackathon

Built for MLH Campulsy Hack Days with Gemini API integration as a core requirement.

👩‍💻 Author

Kumkum Gupta

GitHub: https://github.com/Kumkum2301

---

⭐ If you find StudyMate AI useful, consider giving the repository a star!