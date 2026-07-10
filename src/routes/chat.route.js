import express from "express";
import { chatController } from "../controllers/chat.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: General AI Chat
 *     description: Sends a user prompt to the Groq LLM and returns a general AI response without using Retrieval-Augmented Generation (RAG).
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "What is JWT?"
 *     responses:
 *       200:
 *         description: AI response generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 answer:
 *                   type: string
 *                   example: "JWT stands for JSON Web Token."
 *       500:
 *         description: Internal Server Error
 */

router.post("/", chatController);

export default router;