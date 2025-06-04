"use client";

import { Luckiest_Guy } from "next/font/google";
import { useState } from "react";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
});

interface NextButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function NextButton({
  onClick,
  disabled = false,
  loading = false,
}: NextButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled && !loading) {
      setIsClicked(true);
      onClick?.();
      setTimeout(() => setIsClicked(false), 300);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`
        ${luckiestGuy.className}
        relative
        px-10 py-4 rounded-full text-3xl uppercase
        transition duration-150 ease-in-out z-10 cursor-pointer
        text-[#5c3b1e]
        bg-[#FFD12D]
        border-[3px] border-[#f3c400]
        shadow-[0_6px_0_#c9a700]
        active:translate-y-[2px]
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
        ${isClicked ? "shadow-[inset_-2px_-2px_0px_#e2ba4f]" : ""}
      `}
    >
      {loading ? (
        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
      ) : (
        "Next"
      )}

      {/* Glossy Overlay */}
      {!loading && (
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-20 rounded-t-full pointer-events-none blur-[1px]" />
        </div>
      )}
    </button>
  );
}
