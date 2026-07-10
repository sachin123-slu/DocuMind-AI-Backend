import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadDocument } from "../controllers/document.controller.js";
import { retrieveRelevantChunks } from "../services/retrieval.service.js";

const router = express.Router();

/**
 * @swagger
 * /api/document/upload:
 *   post:
 *     summary: Upload PDF Document
 *     description: Uploads a PDF, extracts its text, splits it into chunks, generates vector embeddings using Hugging Face, and stores the vectors in Pinecone.
 *     tags:
 *       - Documents
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - pdf
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: PDF processed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalCharacters:
 *                   type: integer
 *                   example: 2824
 *                 totalChunks:
 *                   type: integer
 *                   example: 4
 *                 vectorsStored:
 *                   type: integer
 *                   example: 4
 *       400:
 *         description: No PDF file uploaded.
 *       500:
 *         description: Internal Server Error.
 */

router.post(
  "/upload",
  upload.single("pdf"),
  uploadDocument
);

/**
 * @swagger
 * /api/document/search:
 *   post:
 *     summary: Semantic Document Search
 *     description: Searches the Pinecone vector database using semantic search and returns the most relevant document chunks. This endpoint is mainly intended for development and debugging of the retrieval process.
 *     tags:
 *       - Documents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 example: "What backend technologies does Sachin know?"
 *     responses:
 *       200:
 *         description: Relevant document chunks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "chunk-123"
 *                   score:
 *                     type: number
 *                     example: 0.91
 *                   metadata:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                         example: "Node.js, Express.js..."
 *                       fileName:
 *                         type: string
 *                         example: "Resume.pdf"
 *                       chunkIndex:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Internal Server Error
 */

router.post("/search", async (req, res) => {
  const { query } = req.body;
  const chunks = await retrieveRelevantChunks(query);
  res.json(chunks);

});
export default router;