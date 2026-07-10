import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DocuMind AI REST API",
      version: "1.0.0",
      description:
        "DocuMind AI is an AI-powered document question-answering backend built with Node.js, Express.js, LangChain, LangGraph, Groq LLM, Hugging Face Embeddings, and Pinecone Vector Database. It supports PDF upload, semantic search, Retrieval-Augmented Generation (RAG), and general AI chat.",
      contact: {
        name: "Sachin Kumar",
        email: "sluriyasachin@gmail.com" // Replace with your email
      }
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:5000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production Server"
            : "Local Development Server"
      }
    ]
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };