import { askGroq } from "../services/groq.service.js";

export async function chatController(req, res) {
  try {
    const { prompt } = req.body;
    const answer = await askGroq(prompt);
    res.json({ success: true, answer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
