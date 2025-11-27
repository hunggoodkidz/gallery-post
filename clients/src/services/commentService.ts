import api from "./api";
import { Comment } from "@/schema";

interface AddCommentDTO {
  photoId: string;
  commentText: string;
  authorName?: string;
}

export async function addComment(data: AddCommentDTO): Promise<Comment> {
  const res = await api.post<Comment>("/comments", data);
  return res.data;
}

export async function getComments(photoId: string): Promise<Comment[]> {
  const res = await api.get<Comment[]>(`/comments/${photoId}`);
  return res.data;
}
