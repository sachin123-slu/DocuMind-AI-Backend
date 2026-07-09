import groq from '../config/groq.js';

export async function askGroq(prompt) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0]?.message?.content || "No response";
}
