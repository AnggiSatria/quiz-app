"use client";
import React, { useEffect, useState } from "react";
import ButtonLeave from "../atoms/ButtonLeave";
import ButtonNavigateInstruction from "../atoms/ButtonNavigateInstruction";
import { useParams } from "next/navigation";
import CurvedText from "../atoms/CurvedText";
import NumericSection from "../organism/NumericSection";

export default function TemplateContentGame() {
  const [isClient, setIsClient] = useState(false);
  const { level, category } = useParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full">
      {isClient && (
        <audio autoPlay loop>
          <source src={`/sounds/level_${level}.mp3`} type="audio/mpeg" />
        </audio>
      )}
      <ButtonLeave />

      <div
        className={`inline-flex absolute top-[50px] xl:top-[70px] left-1/2 -translate-x-1/2 h-fit xl:h-[200px] ${
          category === "literasi"
            ? "w-[95%] md:w-[80%] xl:w-[900px]"
            : "w-[95%] md:w-[80%] xl:w-[700px]"
        }`}
      >
        <CurvedText
          label={`Level ${
            level === "ONE"
              ? 1
              : level === "TWO"
              ? 2
              : level === "THREE"
              ? 3
              : level === "FOUR"
              ? 4
              : level === "FIVE"
              ? 5
              : null
          }`}
        />
        <NumericSection />
      </div>

      <ButtonNavigateInstruction />
    </div>
  );
}
