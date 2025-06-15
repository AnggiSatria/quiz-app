"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fredoka } from "next/font/google";
import Image from "next/image";
import ButtonLeave from "../atoms/ButtonLeave";
import ButtonNavigateInstruction from "../atoms/ButtonNavigateInstruction";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["700"],
});

export default function TemplateContentChooseGames() {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const category = [
    {
      label: "NUMERISASI",
      value: "NUMERISASI",
      bgColor: "#F8FD89",
      slug: "numerisasi",
    },
    {
      label: "LITERASI",
      value: "LITERASI",
      bgColor: "#DBE1F1",
      slug: "literasi",
    },
  ];

  useEffect(() => {
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
      <ButtonLeave />

      <div className="w-[95%] xl:w-1/2 left-1/2 -translate-x-1/2 absolute h-[75px] top-[100px] xl:top-[50px] xl:bottom-[50px] inline-flex items-center">
        <h4
          className={`${fredoka.className} w-full text-center text-4xl xl:text-5xl font-bold text-[#F8FD89] drop-shadow-[0_2px_0_#642ef3] flex justify-center items-center`}
        >
          {`Halo, ${name}`}
        </h4>
      </div>

      <div className="w-[65%] md:w-1/2 left-1/2 -translate-x-1/2 absolute h-fit top-[190px] xl:top-[150px] inline-flex items-center gap-5 p-5 md:flex-row flex-col">
        {category?.flatMap((res, idx) => {
          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center w-full xl:w-1/2 h-[170px] xl:h-[250px] border-4 border-[#E0E0E0] rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer  opacity-80 ${
                res?.value === "NUMERISASI" ? "bg-[#f8fd89]" : "bg-[#dbe1f1]"
              }`}
              onClick={() => router.push(`/level/${res?.slug}`)}
            >
              <div className="w-20 h-20 xl:w-24 xl:h-24 mb-3 overflow-hidden rounded-lg">
                <Image
                  src={
                    res?.value === "NUMERISASI"
                      ? "/assets/Numerisasi.png"
                      : "/assets/Literasi.png"
                  }
                  alt={`${res?.label} Icon`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-[#6C7A89] text-xl font-semibold tracking-wide">
                {res?.label}
              </p>
            </div>
          );
        })}
      </div>

      <ButtonNavigateInstruction />
    </div>
  );
}
