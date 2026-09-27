import fetch from "node-fetch";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";

/**
 * Calls the Gemini API with a given prompt and returns the raw text response.
 * @param {string} prompt - The full prompt to send to Gemini.
 * @param {object} [options] - Optional generationConfig overrides.
 */
export async function callGemini(prompt, options = {}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY missing. Add it to backend/.env (see .env.example)."
    );
  }

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: options.temperature ?? 0.7,
      maxOutputTokens: options.maxOutputTokens ?? 1024,
    },
  };

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("\n") ??
    "";

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}
