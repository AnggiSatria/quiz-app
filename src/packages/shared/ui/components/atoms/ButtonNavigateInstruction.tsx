"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonNavigateInstruction() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/instruction")}
      className="absolute left-5 bottom-5 rounded-full bg-[#e0a6aa] p-2.5 shadow-lg border-b-4 border-[#c27d83] active:translate-y-[2px] transition-transform duration-150 cursor-pointer z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 8 8"
      >
        <path
          fill="#fff"
          d="M5 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1M3.5 2.5C2.67 2.5 2 3.17 2 4h1c0-.28.22-.5.5-.5s.5.22.5.5s-1 1.64-1 2.5S3.67 8 4.5 8S6 7.33 6 6.5H5c0 .28-.22.5-.5.5S4 6.78 4 6.5C4 6.14 5 4.66 5 4c0-.81-.67-1.5-1.5-1.5"
        />
      </svg>
    </button>
  );
}
