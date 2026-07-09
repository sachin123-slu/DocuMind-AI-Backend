import { askRAG } from "../services/rag.service.js";

export async function ragController(req, res) {

  try {
    const { question } = req.body;
    const response = await askRAG(question);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}