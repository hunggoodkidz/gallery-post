import { Photo } from "@/schema";
import api from "./api";

export async function uploadPhoto(data: FormData) {
  const res = await api.post<Photo>("/photos", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function getAllPhotos(): Promise<Photo[]> {
  const res = await api.get<Photo[]>("/photos");
  return res.data;
}

export async function getPhotoDetail(id: string): Promise<Photo> {
  const res = await api.get<Photo>(`/photos/${id}`);
  return res.data;
}