/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Button, Tooltip } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import UploadModal from "./UploadModal";
import { PlusOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <>
      <nav
        className="
          sticky top-0 z-50 backdrop-blur-md
          border-b border-neutral-300 dark:border-neutral-800
          bg-white/70 dark:bg-neutral-900/70
          px-6 py-3 flex justify-between items-center
        "
      >
        <Link
          href="/"
          className="
            text-2xl font-extrabold tracking-tight
            text-neutral-800 dark:text-neutral-100
            hover:text-green-500 transition
          "
        >
          Gallery
        </Link>

        <div className="flex items-center gap-3">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="
              !bg-green-600 hover:!bg-green-700
              rounded-full font-semibold px-4 shadow
              flex items-center gap-1
            "
          >
            New Photo
          </Button>

          <Tooltip title={dark ? "Light Mode" : "Dark Mode"}>
            <button
              onClick={toggleTheme}
              className="
                w-9 h-9 flex items-center justify-center
                rounded-full border border-neutral-400 dark:border-neutral-700
                bg-neutral-100 dark:bg-neutral-800
                text-lg transition hover:scale-110 hover:shadow-md
              "
            >
              {dark ? (
                <SunOutlined className="text-yellow-400" />
              ) : (
                <MoonOutlined className="text-blue-400" />
              )}
            </button>
          </Tooltip>
        </div>
      </nav>

      <UploadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
