export type Comment = {
  id: string;
  commentText: string;
  authorName?: string;
  createdAt?: string;
  photoId: string;
};

export type Photo = {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  createdAt?: string;

  comments?: Comment[]; // assuming 'Comment' is the type of the comments
};
