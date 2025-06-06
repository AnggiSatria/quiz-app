"use client";
import { Baloo_2 } from "next/font/google";
import React from "react";

interface Text {
  fontSize?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  paintOrder?: string;
  textAnchor?: string;
  fontWeight?: string;
  label?: string;
}

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["700"],
});

export default function CurvedText({
  fontSize = "90",
  fill = "#FACC15",
  stroke = "#dbe1f1",
  strokeWidth = "6",
  paintOrder = "stroke",
  textAnchor = "middle",
  fontWeight = "bold",
  label,
}: Text) {
  return (
    <h1
      className={`${baloo2.className} text-[#faf6ae] inline-flex justify-center items-center space-x-1 text-4xl font-bold absolute top-5 left-1/2 -translate-1/2`}
    >
      <svg viewBox="0 0 500 300" className="w-[500px] h-[200px] mx-auto">
        <defs>
          <path id="curve" d="M50,200 Q250,170 450,200" fill="transparent" />
        </defs>
        <text
          fontSize={fontSize}
          fill={fill} // warna isi (kuning)
          stroke={stroke} // warna border (hitam)
          strokeWidth={strokeWidth} // ketebalan border
          paintOrder={paintOrder}
          textAnchor={textAnchor}
          fontWeight={fontWeight}
        >
          <textPath href="#curve" startOffset="50%">
            {label}
          </textPath>
        </text>
      </svg>
    </h1>
  );
}
