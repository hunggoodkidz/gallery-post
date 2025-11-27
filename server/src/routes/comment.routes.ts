import { Router } from "express";
import { addComment } from "../controllers/comment.controller";

const router = Router();

router.post("/", addComment);

export default router;