"use client";

import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  message,
  UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadPhoto } from "@/services/photoService";
import { useState } from "react";
import Image from "next/image";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

interface UploadFormValues {
  title: string;
  description?: string;
}

export default function UploadModal({ open, onClose }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async (values: UploadFormValues) => {
    if (!file) return message.error("Pick an image first!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", values.title);
    formData.append("description", values.description || "");

    try {
      await uploadPhoto(formData);
      message.success("Uploaded!");

      // 🔥 Clear state
      setFile(null);
      setPreview(null);

      // 🔥 Tell Home Page to refresh images
      window.dispatchEvent(new Event("gallery-refresh"));

      onClose();
    } catch (error) {
      console.error(error);
      message.error("Failed to upload");
    }
  };

  return (
    <Modal open={open} centered footer={null} onCancel={onClose} title="📸 Upload Photo">
      <Form layout="vertical" onFinish={handleUpload}>
        <Form.Item<UploadFormValues>
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UploadFormValues> name="description" label="Description">
          <Input.TextArea
            rows={3}
            placeholder="Write a short description..."
            className="resize-none"
          />
        </Form.Item>

        {/* Drag & Drop upload zone */}
        <Upload.Dragger
          beforeUpload={(file: UploadFile) => {
            const realFile = file instanceof File ? file : file.originFileObj;
            if (realFile) {
              setFile(realFile);
              setPreview(URL.createObjectURL(realFile));
            }
            return false;
          }}
          maxCount={1}
          accept="image/*"
          showUploadList={false}
          className="
    !border-0
    bg-neutral-100 dark:bg-neutral-900
    rounded-xl
    p-4 mt-2 cursor-pointer
    transition-all duration-300 ease-in-out
    hover:shadow-[0_0_15px_rgba(0,255,180,0.3)]
    hover:scale-[1.02]
  "
        >
          {preview ? (
            <div className="flex flex-col items-center gap-2">
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={200}
                className="object-cover w-full h-48 rounded-lg shadow"
              />
              <p className="text-xs opacity-70">Click to change image</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <div
                className="
          w-14 h-14 rounded-full flex items-center justify-center
          bg-gradient-to-r from-green-500 to-blue-500 text-white
          shadow-lg shadow-green-500/30
          animate-pulse
        "
              >
                <UploadOutlined className="text-2xl" />
              </div>

              <p className="font-medium text-neutral-700 dark:text-neutral-200">
                Drag & Drop an image here
              </p>

              <p className="text-xs opacity-60 dark:text-neutral-400">
                or click to browse files
              </p>
            </div>
          )}
        </Upload.Dragger>

        <Button
          htmlType="submit"
          type="primary"
          disabled={!file}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 font-semibold"
        >
          Upload
        </Button>
      </Form>
    </Modal>
  );
}
