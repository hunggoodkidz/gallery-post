import { Request, Response } from "express";
import { createCommentRecord } from "../services/comment.service.js";
import prisma from "../prisma/client.js";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { photoId, commentText, authorName } = req.body;

    if (!photoId || !commentText)
      return res.status(400).json({ error: "Missing fields" });

    const comment = await createCommentRecord(
      photoId, commentText, authorName
    );

    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getCommentsByPhotoId = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { photoId },
      orderBy: { createdAt: "asc" }
    });

    res.json(comments);
  } catch (err) {
    console.error("Get Comments Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};