"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Fredoka } from "next/font/google";
import UnderlinedInput from "../molecules/UnderlinedInput";
import NextButton from "../molecules/NextButton";
import ButtonNavigateInstruction from "../atoms/ButtonNavigateInstruction";
import ButtonLeave from "../atoms/ButtonLeave";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["700"], // pakai 700 karena teks kamu tebal
});

export default function TemplateContentInput() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [name, setName] = useState("");

  const handleNext = () => {
    localStorage.setItem(`name`, name);
    router.push("/choose-games");
  };

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
          className={`${fredoka.className} w-full text-center text-4xl xl:text-5xl font-bold text-yellow-400 drop-shadow-[0_2px_0_#642ef3] flex justify-center items-center`}
        >
          SIAPA NAMAMU?
        </h4>
      </div>

      <div className="w-1/2 left-1/2 -translate-x-1/2 absolute h-fit top-[250px] xl:top-[150px] inline-flex items-center flex-col">
        <UnderlinedInput value={name} onChange={setName} />

        <div className="mt-10 relative">
          <NextButton
            onClick={handleNext}
            disabled={!name.trim()}
            loading={false}
          />
        </div>
      </div>

      <ButtonNavigateInstruction />
    </div>
  );
}
