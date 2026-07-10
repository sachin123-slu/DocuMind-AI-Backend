import express from "express";
import { ragController } from "../controllers/rag.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/rag:
 *   post:
 *     summary: Document Question Answering (RAG)
 *     description: Retrieves the most relevant chunks from the uploaded documents using Pinecone vector search and LangGraph, then generates an answer using the Groq LLM.
 *     tags:
 *       - RAG
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What backend technologies does Sachin know?"
 *     responses:
 *       200:
 *         description: Answer generated successfully using Retrieval-Augmented Generation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answer:
 *                   type: string
 *                   example: "Sachin knows Node.js, Express.js, MongoDB, JWT..."
 *                 sources:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fileName:
 *                         type: string
 *                         example: "Resume.pdf"
 *                       chunkIndex:
 *                         type: integer
 *                         example: 2
 *                       score:
 *                         type: number
 *                         example: 0.91
 *       500:
 *         description: Internal Server Error
 */

router.post("/", ragController);

export default router;