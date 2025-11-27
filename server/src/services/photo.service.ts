import prisma from "../prisma/client.js";

export const createPhotoRecord = async (
  imageUrl: string,
  title?: string,
  description?: string
) => {
  return prisma.photo.create({
    data: { imageUrl, title, description },
  });
};

export const getAllPhotos = async () => {
  return prisma.photo.findMany({
    include: { comments: true },
    orderBy: { createdAt: "desc" },
  });
};
