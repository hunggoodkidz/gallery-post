import { Router } from "express";
import { addComment } from "../controllers/comment.controller.js";

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Add a comment to a photo
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photoId:
 *                 type: string
 *               commentText:
 *                 type: string
 *               authorName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added
 */


const router = Router();

router.post("/", addComment);

export default router;