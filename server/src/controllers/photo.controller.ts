import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { supabase } from "../lib/supabase.js";
import { createPhotoRecord, getAllPhotos } from "../services/photo.service.js";

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    if (!req.file) 
      return res.status(400).json({ error: "No file uploaded" });

    const fileName = `${randomUUID()}-${req.file.originalname}`;

    const { error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) throw error;

    const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${fileName}`;

    const photo = await createPhotoRecord(
      imageUrl,
      req.body.title,
      req.body.description
    );

    res.json(photo);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const listPhotos = async (_req: Request, res: Response) => {
  const photos = await getAllPhotos();
  res.json(photos);
};
