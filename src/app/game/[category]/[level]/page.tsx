import TemplateContentGame from "@/packages/ui/components/templates/TemplateContentGame";
import React from "react";

export default function page() {
  const backgrounds = [
    // "/assets/bg-game.jpg",
    // "/assets/bg-game1.jpg",
    "/assets/bg-game2.jpg",
    // "/assets/bg-game4.jpg",
    // "/assets/bg-game5.jpg",
    // "/assets/bg-game6.jpg",
  ];

  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const selectedBackground = backgrounds[randomIndex];

  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${selectedBackground}")`,
      }}
    >
      <div className="relative min-h-screen">
        {/* Ini sebagai konten visual, yang ukurannya real (bukan absolute) */}
        <div className="invisible h-[800px]" />
        <TemplateContentGame />
      </div>
    </div>
  );
}
