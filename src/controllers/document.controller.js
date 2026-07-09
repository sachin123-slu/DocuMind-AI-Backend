import { processDocument } from "../services/document.service.js";

export async function uploadDocument(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const result = await processDocument(req.file.path, {
      filename: req.file.filename,
      originalname: req.file.originalname
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
