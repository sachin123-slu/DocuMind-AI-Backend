import express from "express";
import cors from "cors";
import "dotenv/config";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

import chatRoutes from "./routes/chat.route.js";
import documentRoutes from "./routes/document.route.js"
import ragRoutes from "./routes/rag.route.js"
import healthRoutes from "./routes/health.routes.js"


const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


app.use("/api/chat", chatRoutes);
app.use("/api/document", documentRoutes)
app.use("/api/rag", ragRoutes);
app.use("/api/health", healthRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "DocuMind AI REST API",
    version: "1.0.0",
    documentation: "/api-docs",
    status: "Running 🚀"
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DocuMind AI Backend is healthy 🚀",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
