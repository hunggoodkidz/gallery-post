import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { uploadPhoto, listPhotos, getPhotoDetail } from "../controllers/photo.controller.js";

/**
 * @openapi
 * tags:
 *   name: Photos
 *   description: Photo upload and retrieval
 */

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
 *       201:
 *         description: Photo uploaded
 */

/**
 * @openapi
 * /photos/{id}:
 *   get:
 *     summary: Get details of a specific photo
 *     description: Includes comment list
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Photo ID
 *     responses:
 *       200:
 *         description: Photo details returned
 *       404:
 *         description: Photo not found
 */


const router = Router();

router.post("/", upload.single("image"), uploadPhoto);
router.get("/", listPhotos);
router.get("/:id", getPhotoDetail);

export default router;