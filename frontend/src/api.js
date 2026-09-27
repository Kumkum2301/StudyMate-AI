const BASE_URL = "/api";

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong.");
  }
  return data;
}

export const api = {
  ask: (question) => post("/ask", { question }),
  summarize: (notes) => post("/summarize", { notes }),
  quiz: (topic, numQuestions) => post("/quiz", { topic, numQuestions }),
  evaluate: (questions, userAnswers) =>
    post("/evaluate", { questions, userAnswers }),
  studyplan: (examDate, subjects, hoursPerDay) =>
    post("/studyplan", { examDate, subjects, hoursPerDay }),
  chat: (history, message) => post("/chat", { history, message }),
};
