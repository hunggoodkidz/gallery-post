"use client";

import { useEffect, useState } from "react";
import { getAllPhotos } from "@/services/photoService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Photo } from "@/schema";


export default function GalleryGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const router = useRouter();

  const loadPhotos = () => {
    getAllPhotos().then(setPhotos).catch(console.error);
  };

  useEffect(() => {
    loadPhotos(); // 🔥 load on first render

    const refresh = () => loadPhotos();
    window.addEventListener("gallery-refresh", refresh);

    return () => window.removeEventListener("gallery-refresh", refresh);
  }, []);

  return (
    <main className="p-12 min-h-screen">
      <div className="columns-2 sm:columns-3 lg:columns-5 gap-4 space-y-4">
        {photos.map((p) => (
          <div
            key={p.id}
            onClick={() => router.push(`/gallery/${p.id}`)}
            className="relative break-inside-avoid cursor-pointer group overflow-hidden rounded-2xl shadow-md"
          >
            <Image
              src={p.imageUrl}
              alt={p.title ?? "Image"}
              width={500}
              height={500}
              className="w-full h-auto object-cover transition duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0
    group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
            >
              {/* Title */}
              <p className="text-white font-semibold text-sm truncate">
                {p.title || "Untitled"}
              </p>

              {/* Description */}
              <p className="text-white/80 text-xs truncate">
                {p.description || ""}
              </p>

              {/* Comments Count */}
              {p.comments && p.comments.length > 0 && (
                <div className="flex items-center gap-1 text-white text-xs mt-1">
                  <span>💬</span>
                  <span>{p.comments.length} comments</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
