import prisma from "../prisma/client.js";

export const createCommentRecord = async (
  photoId: string,
  commentText: string,
  authorName?: string
) => {
  return prisma.comment.create({
    data: { photoId, commentText, authorName },
  });
};
