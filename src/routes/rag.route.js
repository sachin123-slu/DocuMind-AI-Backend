import express from "express";
import { ragController } from "../controllers/rag.controller.js";

const router = express.Router();

router.post("/", ragController);

export default router;