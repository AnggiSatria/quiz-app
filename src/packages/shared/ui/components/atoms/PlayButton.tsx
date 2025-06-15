"use client";

import { Luckiest_Guy } from "next/font/google";
import { useMemo, useState } from "react";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
});

interface PlayButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function PlayButton({
  onClick,
  disabled = false,
  loading = false,
}: PlayButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled && !loading) {
      setIsClicked(true);
      onClick?.();
      setTimeout(() => setIsClicked(false), 300);
    }
  };

  const sprinkles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      backgroundColor: ["#fff", "#fbc02d", "#81c784", "#64b5f6"][i % 4],
      transform: `rotate(${Math.random() * 360}deg)`,
      key: i,
    }));
  }, []);

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`
        ${luckiestGuy.className}
        absolute bottom-[200px] xl:bottom-[90px] left-1/2 -translate-x-1/2 px-10 py-4 rounded-full text-3xl text-white uppercase
        transition duration-150 ease-in-out z-10 cursor-pointer
        ${
          loading ? "bg-pink-300" : "bg-gradient-to-b from-pink-400 to-pink-500"
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 active:translate-y-[2px]"
        }
        shadow-[0_6px_0_#c0392b] border-[3px] border-white
        ${isClicked ? "shadow-[inset_-2px_-2px_0px_#e28080]" : ""}
      `}
    >
      {/* Loading spinner */}
      {loading ? (
        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
      ) : (
        "PLAY"
      )}

      {/* Sprinkles */}
      {!loading && (
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          {sprinkles.map((s) => (
            <div
              key={s.key}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={s}
            />
          ))}
        </div>
      )}
    </button>
  );
}
