"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Baloo_2, Fredoka } from "next/font/google";
import Image from "next/image";

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
      <button
        onClick={() => router.push("/")}
        className="absolute right-5 top-5 rounded-full bg-[#e0a6aa] p-2.5 shadow-lg border-b-4 border-[#c27d83] active:translate-y-[2px] transition-transform duration-150 cursor-pointer z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="#fff" strokeWidth="3">
            <path d="M9 4.5H8c-2.357 0-3.536 0-4.268.732S3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268S5.643 19.5 8 19.5h1M9 6.476c0-2.293 0-3.44.707-4.067s1.788-.439 3.95-.062l2.33.407c2.394.417 3.591.626 4.302 1.504c.711.879.711 2.149.711 4.69v6.105c0 2.54 0 3.81-.71 4.689c-.712.878-1.91 1.087-4.304 1.505l-2.328.406c-2.162.377-3.243.565-3.95-.062S9 19.817 9 17.524z" />
            <path strokeLinecap="round" d="M12 11v2" />
          </g>
        </svg>
      </button>

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
          >
            {`Level ${res}`}
          </div>
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
          <div className="flex items-center justify-center w-[250px] h-[450px] md:h-full bg-white rounded-2xl shadow transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer">
            {`Level ${level[currentIndex]}`}
          </div>

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
    </div>
  );
}
