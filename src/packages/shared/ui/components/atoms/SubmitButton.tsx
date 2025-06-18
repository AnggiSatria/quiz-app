"use client";
import React, { useState } from "react";

export default function SubmitButton({
  onClick,
  label = "Lihat Hasil",
}: {
  onClick: () => Promise<void>;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleClick = async () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150); // animasi press cepat

    setLoading(true);
    try {
      await onClick();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`relative px-6 py-3 rounded-full text-white font-bold transition-all cursor-pointer duration-150
        ${pressed ? "scale-95" : "scale-100"}
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
        }
        shadow-md`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </span>
      ) : (
        label
      )}
    </button>
  );
}
