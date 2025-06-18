"use client";
import { useParams } from "next/navigation";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TemplateBackgroundGame({ children }: any) {
  const { level } = useParams();

  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `${
          level === "ONE"
            ? `url("/assets/bg-game.jpg")`
            : level === "TWO"
            ? `url("/assets/bg-game1.jpg")`
            : level === "THREE"
            ? `url("/assets/bg-game2.jpg")`
            : level === "FOUR"
            ? `url("/assets/bg-game4.jpg")`
            : level === "FIVE"
            ? `url("/assets/bg-game5.jpg")`
            : `url("/assets/bg-game6.jpg")`
        }`,
      }}
    >
      {children}
    </div>
  );
}
