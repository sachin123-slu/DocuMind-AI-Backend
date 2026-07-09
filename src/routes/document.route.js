import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadDocument } from "../controllers/document.controller.js";
import { retrieveRelevantChunks } from "../services/retrieval.service.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("pdf"),
  uploadDocument
);

router.post("/search", async (req, res) => {
  const { query } = req.body;
  const chunks = await retrieveRelevantChunks(query);
  res.json(chunks);

});
export default router;