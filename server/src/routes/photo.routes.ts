import { Router } from "express";
import { upload } from "../middleware/upload";
import { uploadPhoto, listPhotos } from "../controllers/photo.controller.js";

const router = Router();

router.post("/", upload.single("image"), uploadPhoto);
router.get("/", listPhotos);

export default router;