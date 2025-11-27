import { Request, Response } from "express";
import { createCommentRecord } from "../services/comment.service.js";

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