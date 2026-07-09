import express from "express";
import cors from "cors";
import "dotenv/config";
import chatRoutes from "./routes/chat.route.js";
import documentRoutes from "./routes/document.route.js"
import ragRoutes from "./routes/rag.route.js"

const app = express();

app.use(cors({
  origin :["http://localhost:5173"],
  credentials : true,
}));  
app.use(express.json());


app.use("/api/chat", chatRoutes);
app.use("/api/document", documentRoutes)
app.use("/api/rag", ragRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Knowledge Assistant API Running 🚀"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
