"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlayButton from "../atoms/PlayButton";
import { useSound } from "react-sounds";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import InstructionBox from "../molecules/InstructionBox";
import ButtonLeave from "../atoms/ButtonLeave";
import ButtonNavigateInstruction from "../atoms/ButtonNavigateInstruction";

export default function TemplateContentLP() {
  const pathname = usePathname();
  const router = useRouter();
  const { play } = useSound("/sounds/coin.mp3");
  const [loading, setLoading] = useState(false);

  const handlePlay = () => {
    setLoading(true);
    setTimeout(() => {
      play();
      setLoading(false);
      router.push("/input-name");
    }, 500);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full">
      {isClient && (
        <audio autoPlay loop>
          <source
            src={
              pathname === "/"
                ? `/sounds/super-mario-2.mp3`
                : `/sounds/8-bit-retro-music.mp3`
            }
            type="audio/mpeg"
          />
        </audio>
      )}
      {pathname === "/" && <ButtonLeave />}

      <div className="w-full absolute h-[500px] bottom-[150px] xl:bottom-[50px]">
        <Image
          src="/assets/bg-image-lp-content.png"
          alt="bg-content"
          fill
          quality={100}
          className="object-contain"
          priority
        />
      </div>

      {pathname !== "/" && (
        <div className="inline-flex w-[95%] xl:w-1/2 left-1/2 -translate-x-1/2 absolute rounded-md h-[350px] z-20 bottom-[120px]">
          <InstructionBox />
        </div>
      )}

      {pathname === "/" && (
        <PlayButton onClick={handlePlay} loading={loading} />
      )}

      {/* Layer mountain */}
      <div className="w-full absolute bottom-0 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
        <Image
          src="/assets/bg-image-lp-mountain.png"
          alt="bg-mountain"
          fill
          quality={100}
          className="object-cover"
          priority
        />
      </div>

      {pathname === "/" && <ButtonNavigateInstruction />}
    </div>
  );
}
