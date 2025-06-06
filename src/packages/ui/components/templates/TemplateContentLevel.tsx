"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Baloo_2, Fredoka } from "next/font/google";
import Image from "next/image";
import ButtonLeave from "../atoms/ButtonLeave";
import ButtonNavigateInstruction from "../atoms/ButtonNavigateInstruction";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["700"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["700"], // pakai 700 karena teks kamu tebal
});

function CurvedText() {
  const { slug } = useParams();

  return (
    <h1
      className={`${baloo2.className} text-[#faf6ae] inline-flex justify-center items-center space-x-1 text-4xl font-bold absolute top-5 left-1/2 -translate-1/2`}
    >
      <svg viewBox="0 0 500 300" className="w-[500px] h-[200px] mx-auto">
        <defs>
          <path id="curve" d="M50,200 Q250,170 450,200" fill="transparent" />
        </defs>
        <text
          fontSize="90"
          fill="#FACC15" // warna isi (kuning)
          stroke="#dbe1f1" // warna border (hitam)
          strokeWidth="6" // ketebalan border
          paintOrder="stroke"
          textAnchor="middle"
          fontWeight="bold"
        >
          <textPath href="#curve" startOffset="50%">
            {slug === "numerisasi" ? "NUMERASI" : "LITERASI"}
          </textPath>
        </text>
      </svg>
    </h1>
  );
}

export default function TemplateContentLevel() {
  const router = useRouter();
  const { slug } = useParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const level = [1, 2, 3, 4, 5];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < level.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="w-full">
      {isClient && (
        <audio autoPlay loop>
          <source src="/sounds/level-intro.mp3" type="audio/mpeg" />
        </audio>
      )}
      <ButtonLeave />

      <div className="inline-flex absolute top-[50px] xl:top-[20px] w-1/2 xl:w-[600px] left-1/2 -translate-x-1/2 h-fit xl:h-[200px]">
        <CurvedText />
        <div className="inline-flex w-[81px] justify-center absolute left-1/2 -translate-x-1/2 top-9 z-10">
          <Image
            src="/assets/icon-numeric.png"
            alt="icon-numeric"
            className="object-cover"
            width={81}
            height={81}
          />
        </div>
        <div className="inline-flex rounded-4xl bg-[#fdfffe] w-[120px] absolute left-1/2 -translate-x-1/2 top-15 h-[40px] justify-center items-center">
          <h4 className={`${fredoka.className} text-[#afd292] drop-shadow`}>
            PILIH LEVEL
          </h4>
        </div>
      </div>

      <div className="hidden md:inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-[90%] left-1/2 -translate-x-1/2 h-fit md:h-[500px] md:absolute top-[200px] xl:top-[140px] p-5">
        {level?.map((res, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center h-[200px] md:h-full bg-white rounded-md shadow transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              backgroundImage: `url("/assets/level_${idx + 1}.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => router.push(`/game/${slug}/${res}`)}
          ></div>
        ))}
      </div>

      <div className="md:hidden inline-flex flex-col items-center w-full gap-4 mt-6 absolute top-[150px] xl:top-[140px]">
        <div className="flex items-center gap-4">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full border ${
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-200 bg-white border-2 border-[#0a0a0a]"
            }`}
          >
            {/* Left arrow icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Display current level */}
          <div
            className={`flex items-center justify-center w-[250px] h-[450px] md:h-full bg-white rounded-2xl shadow transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer`}
            style={{
              backgroundImage: `url("/assets/level_${currentIndex + 1}.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => router.push(`/game/${slug}/${currentIndex + 1}`)}
          ></div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex === level.length - 1}
            className={`p-2 rounded-full border ${
              currentIndex === level.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-gray-200 bg-white border-2 border-[#0a0a0a]"
            }`}
          >
            {/* Right arrow icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Optional: Current index info */}
        <div className="text-sm text-gray-500">{`Level ${currentIndex + 1} of ${
          level.length
        }`}</div>
      </div>

      <ButtonNavigateInstruction />
    </div>
  );
}
