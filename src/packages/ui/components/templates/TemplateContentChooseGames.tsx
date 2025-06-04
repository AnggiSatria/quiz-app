"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["700"], // pakai 700 karena teks kamu tebal
});

export default function TemplateContentChooseGames() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    // safe access localStorage after client mounts
    const storedName = localStorage.getItem("name");
    setName(storedName);
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full">
      {isClient && (
        <audio autoPlay loop>
          <source src="/sounds/retro-game-arcade.mp3" type="audio/mpeg" />
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

      <div className="w-[95%] xl:w-1/2 left-1/2 -translate-x-1/2 absolute h-[75px] top-[100px] xl:top-[50px] xl:bottom-[50px] inline-flex items-center">
        <h4
          className={`${fredoka.className} w-full text-center text-4xl xl:text-5xl font-bold text-[#F8FD89] drop-shadow-[0_2px_0_#642ef3] flex justify-center items-center`}
        >
          {`Halo, ${name}`}
        </h4>
      </div>

      <div className="w-[65%] md:w-1/2 left-1/2 -translate-x-1/2 absolute h-fit top-[190px] xl:top-[150px] inline-flex items-center gap-5 p-5 md:flex-row flex-col">
        <div className="flex w-full xl:w-1/2 h-[170px] xl:h-[250px] border-4 border-[#d8d3d6] rounded-xl shadow bg-[#f8fd89] opacity-60"></div>
        <div className="flex w-full xl:w-1/2 h-[170px] xl:h-[250px] border-4 border-[#d8d3d6] rounded-xl shadow"></div>
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
