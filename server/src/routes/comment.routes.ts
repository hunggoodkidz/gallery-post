import { Router } from "express";
import { addComment, getCommentsByPhotoId } from "../controllers/comment.controller.js";

/**
 * @openapi
 * tags:
 *   name: Comments
 *   description: Comment APIs
 */

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
 *       201:
 *         description: Comment created
 */

/**
 * @openapi
 * /comments/{photoId}:
 *   get:
 *     summary: Get all comments for a specific photo
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the photo to fetch comments
 *     responses:
 *       200:
 *         description: List of comments
 */


const router = Router();

router.post("/", addComment);
router.get("/:photoId", getCommentsByPhotoId);

export default router;