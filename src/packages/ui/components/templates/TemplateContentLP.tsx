"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlayButton from "../atoms/PlayButton";
import { useSound } from "react-sounds";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import InstructionBox from "../molecules/InstructionBox";

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
      {pathname === "/" && (
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
      )}

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

      {pathname === "/" && (
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
      )}
    </div>
  );
}
