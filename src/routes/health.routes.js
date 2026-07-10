import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health Check
 *     description: Returns the current health status of the backend service.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Backend is healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 service:
 *                   type: string
 *                   example: "DocuMind AI Backend"
 *                 status:
 *                   type: string
 *                   example: "Healthy"
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "DocuMind AI Backend",
    status: "Healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;