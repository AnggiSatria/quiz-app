// components/InstructionBox.tsx
"use client";
import { FC, useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { Baloo_2 } from "next/font/google";
import { useRouter } from "next/navigation";

// Pakai className, BUKAN variable
const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const InstructionBox: FC = () => {
  const [steps, setSteps] = useState<number>(0);
  const router = useRouter();

  const instructions =
    steps === 0
      ? [
          "Waktu pengerjaan hanya satu menit per soal, kerjakanlah dengan hati-hati dan teliti",
          "Kamu diperkenankan menggunakan jari tanganmu sebagai alat bantu hitung",
          "Pemain tidak diperkenankan menggunakan alat bantu hitung seperti kalkulator maupun sempoa",
          "Pemain wajib didampingi dan dalam pengawasan pembina (guru maupun orangtua)",
        ]
      : [
          "Pilih kategori pembelajaran (membaca atau menulis) sesuai dengan kebutuhan kamu",
          "Pilih level permainan, mulai dari level 1 hingga level 5. Semakin tinggi levelnya semakin sulit permainannya.",
          "Silahkan tonton video materi yang ada agar mempermudah kamu dalam pengerjaan.",
          "Jika merasa sudah menguasai materi, kamu bisa mengerjakan permainan yang disediakan.",
        ];

  return (
    <div
      className={`w-full h-full rounded-xl border-2 border-pink-300 bg-gradient-to-b from-white to-blue-100 p-6 shadow-xl relative ${baloo2.className}`}
    >
      <div className="absolute top-2 right-2 cursor-pointer">
        {steps !== 0 && (
          <button
            onClick={() => router.push("/")}
            className="w-8 h-8 bg-pink-400 hover:bg-pink-500 text-white rounded-full shadow-md flex items-center justify-center text-xl cursor-pointer p-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
              />
            </svg>
          </button>
        )}
      </div>
      <h2 className="text-center text-pink-600 font-bold text-2xl mb-4">
        Instruksi Pembelajaran
      </h2>

      <ul className="space-y-3">
        {instructions.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-pink-500 pt-1">
              <FaHandPointRight />
            </span>
            <p className="text-sm text-gray-800 leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>

      {steps === 0 && (
        <div className="absolute bottom-2 right-2 cursor-pointer">
          <button
            onClick={() => setSteps(steps + 1)}
            className="w-8 h-8 bg-pink-400 hover:bg-pink-500 text-white rounded-full shadow-md flex items-center justify-center text-xl cursor-pointer p-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M6 4h2v2h2v2h2v2h2v4h-2v2h-2v2H8v2H6zm12 0h-2v16h2z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructionBox;
