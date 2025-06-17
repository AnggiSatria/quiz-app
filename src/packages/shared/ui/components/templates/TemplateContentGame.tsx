"use client";
import React, { CSSProperties, useEffect, useState } from "react";
import ButtonLeave from "../atoms/ButtonLeave";
import ButtonNavigateInstruction from "../atoms/ButtonNavigateInstruction";
import { useParams, useSearchParams } from "next/navigation";
import CurvedText from "../atoms/CurvedText";
import NumericSection from "../organism/NumericSection";
import { PacmanLoader } from "react-spinners";
import { useReadQuiz } from "@/packages/shared/utils/service/quiz";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function TemplateContentGame() {
  const [isClient, setIsClient] = useState(false);
  const { level, category } = useParams();
  const searchParams = useSearchParams();
  const shuffle = searchParams.get("shuffle") || "ONE";

  const { data: questions, isLoading } = useReadQuiz({
    type: category as string,
    level: level as string,
    shuffle,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="inline-flex absolute top-56 lg:top-80 left-1/2 -translate-1/2">
          <PacmanLoader
            color={"#ffff"}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {!isLoading && (
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
            <NumericSection questions={questions || []} />
          </div>

          <ButtonNavigateInstruction />
        </div>
      )}
    </>
  );
}
