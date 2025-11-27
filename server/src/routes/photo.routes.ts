import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadPhoto, listPhotos } from "../controllers/photo.controller.js";

/**
 * @openapi
 * /photos:
 *   get:
 *     summary: Get all photos with comments
 *     tags: [Photos]
 *     responses:
 *       200:
 *         description: Success
 *
 *   post:
 *     summary: Upload a new photo
 *     tags: [Photos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 */


const router = Router();

router.post("/", upload.single("image"), uploadPhoto);
router.get("/", listPhotos);

export default router;