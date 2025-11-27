/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Button,
  Input,
  message,
  Modal,
  Skeleton,
  Tooltip,
} from "antd";
import {
  ArrowLeftOutlined,
  SendOutlined,
  LinkOutlined,
  DownloadOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { Photo, Comment } from "@/schema";
import { getPhotoDetail } from "@/services/photoService";
import { getComments, addComment } from "@/services/commentService";

const { TextArea } = Input;

export default function PhotoDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const photoId = params?.id;

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPhoto, setLoadingPhoto] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Embed + Preview modal state
  const [embedOpen, setEmbedOpen] = useState(false);

  const refreshComments = async () => {
    setLoadingComments(true);
    try {
      const data = await getComments(photoId);
      setComments(data);
    } finally {
      setLoadingComments(false);
    }
  };

  const loadPhoto = async () => {
    try {
      const data = await getPhotoDetail(photoId);
      setPhoto(data);
    } catch {
      message.error("Failed to load photo");
    } finally {
      setLoadingPhoto(false);
    }
  };

  useEffect(() => {
    if (!photoId) return;
    loadPhoto();
    refreshComments();
  }, [photoId]);


  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      return message.warning("Comment cannot be empty");
    }

    setSubmitting(true);
    try {
      const newComment = await addComment({
        photoId,
        commentText,
        authorName,
      });
      setComments((prev) => [...prev, newComment]);
      setCommentText("");
      setAuthorName("");
    } catch {
      message.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPhoto) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <Skeleton.Image className="!w-full !h-[500px] rounded-xl" />
        <Skeleton active className="mt-6" />
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg opacity-70">Photo not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* Actions */}
      <div className="flex items-center gap-3 mb-3">
        <Tooltip title="Back to gallery">
          <Button
            shape="round"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/")}
            className="!px-4 dark:bg-neutral-800 dark:border-neutral-700"
          >
            Back
          </Button>
        </Tooltip>

        {/* Download */}
        <Tooltip title="Download Image">
          <Button
            shape="round"
            icon={<DownloadOutlined />}
            onClick={async () => {
              try {
                const res = await fetch(photo.imageUrl);
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `${photo.title || "image"}.jpg`;
                link.click();
                window.URL.revokeObjectURL(url);
              } catch (err : unknown) {
                message.error("Failed to download image.");
                console.log(err)
              }
            }}
          >
            Download
          </Button>
        </Tooltip>

        {/* Copy embed */}
        <Tooltip title="Copy Embed HTML">
          <Button
            shape="round"
            icon={<LinkOutlined />}
            onClick={() => setEmbedOpen(true)}
          >
            Embed
          </Button>
        </Tooltip>

        {/* Comment count */}
        {comments.length > 0 && (
          <span className="px-3 py-[2px] text-xs rounded-full bg-green-600 text-white">
            <CommentOutlined /> {comments.length}
          </span>
        )}
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image + Info */}
        <div className="lg:w-2/3 space-y-3">
          <h1 className="text-2xl font-bold">{photo.title}</h1>

          {/* IMAGE CLICK PREVIEW */}
          <div
            className="overflow-hidden rounded-2xl shadow-md cursor-pointer group"
            onClick={() => setPreviewOpen(true)}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.title || "Image"}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[540px] object-contain group-hover:brightness-90 transition"
            />
          </div>

          <p className="text-sm opacity-80 leading-relaxed">
            {photo.description}
          </p>

          <p className="text-xs opacity-60">
            {dayjs(photo.createdAt).format("DD MMM YYYY, HH:mm")}
          </p>
        </div>

        {/* Comments Side */}
        <div className="lg:w-1/3 space-y-5">
          {/* Add Comment */}
          <div className="rounded-xl p-4 bg-white dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="text-sm font-semibold mb-2">Add Comment</h3>
            <Input
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              size="small"
              className="mb-2"
            />
            <div className="flex gap-2 pt-3">
              <TextArea
                placeholder="Your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={2}
                className="resize-none"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                loading={submitting}
                onClick={handleSubmitComment}
                className="flex items-center justify-center w-12"
              />
            </div>
          </div>

          {/* Comments */}
          <div className="rounded-xl p-4 bg-white dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="text-sm font-semibold mb-3">Comments</h3>
            {loadingComments ? (
              <p className="text-xs opacity-60">Loading...</p>
            ) : comments.length === 0 ? (
              <p className="text-xs opacity-60">No comments yet</p>
            ) : (
              <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1 custom-scroll">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 shadow-sm"
                  >
                    <div className="flex justify-between text-xs opacity-75">
                      <span className="font-semibold">
                        {c.authorName || "Anonymous"}
                      </span>
                      <span>{dayjs(c.createdAt).format("DD MMM, HH:mm")}</span>
                    </div>
                    <p className="text-xs mt-1">{c.commentText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={null}
        centered
        width="80vw"
        styles={{
          body: {
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            background: "transparent",
          },
        }}
        className="preview-modal"
      >
        <div className="relative flex justify-center items-center w-full h-full bg-black/90 rounded-xl overflow-hidden">
          {!previewLoaded && (
            <Skeleton.Image
              active
              className="!w-[300px] !h-[300px] rounded-lg !bg-neutral-700"
            />
          )}

          <Image
            src={photo.imageUrl}
            alt="preview"
            width={1600}
            height={1200}
            className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${previewLoaded ? "opacity-100" : "opacity-0"
              }`}
            onLoadingComplete={() => setPreviewLoaded(true)}
          />
        </div>
      </Modal>

      {/* Embed Modal */}
      <Modal
        title="Embed HTML Snippet"
        open={embedOpen}
        onCancel={() => setEmbedOpen(false)}
        footer={null}
      >
        <TextArea
          readOnly
          value={`<img src="${photo.imageUrl}" alt="${photo.title}" width="600" />`}
          className="text-xs"
          onFocus={(e) => e.target.select()}
        />
        <Button
          type="primary"
          className="w-full mt-3"
          onClick={() => {
            navigator.clipboard.writeText(
              `<img src="${photo.imageUrl}" alt="${photo.title}" width="600" />`
            );
            message.success("Copied!");
          }}
        >
          Copy
        </Button>
      </Modal>
    </div>
  );
}
