"use client";
import { useCreateUser } from "@/packages/shared/utils/service/user/hooks";
import { Baloo_2 } from "next/font/google";
import { useRouter } from "next/navigation";
import React from "react";
import SubmitButton from "../atoms/SubmitButton";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type AnswerResult = {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  point: number;
};

export default function FinishSection({
  category,
  shuffle,
}: {
  category: "literasi" | "numerisasi";
  shuffle: string;
}) {
  const router = useRouter();
  const name = localStorage.getItem("name");
  const storageKey = `quiz-answers-${category}-${shuffle}`;
  const allAnswers: AnswerResult[] = JSON.parse(
    localStorage.getItem(storageKey) || "[]"
  );
  const totalScore = allAnswers.reduce((acc, cur) => acc + cur.point, 0);

  const handleNavigate = (id: string) => {
    router.push(`/results?id=${id}&shuffle=${shuffle}`);
  };

  const { mutations } = useCreateUser({ navigate: handleNavigate });

  const handleSubmitUser = async () => {
    try {
      await mutations.mutateAsync({
        name: name as string,
        quiz_type: category as "numerisasi" | "literasi",
        correctAnswers: totalScore * 10,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`w-full h-fit rounded-xl border-2 border-pink-300 bg-gradient-to-b from-white to-blue-100 p-6 shadow-xl absolute top-20 ${baloo2.className} flex flex-col gap-3`}
    >
      <div className="flex w-full p-5 relative">
        <h1
          className={`${baloo2.className} text-[#faf6ae] inline-flex justify-center items-center space-x-1 text-4xl font-bold flex-col gap-3`}
        >
          <span
            style={{ fontSize: "90" }}
            className="text-pink-300 font-bold text-center"
          >
            {`Selamat ${name} kamu baru saja menyelesaikan permainan ${category}`}
          </span>

          <span className="text-pink-300 font-bold text-center text-2xl">
            Klik lihat hasil untuk cek berapa skormu
          </span>
        </h1>
      </div>
      <div className="flex w-full justify-end">
        <SubmitButton
          onClick={async () => {
            await new Promise((res) => setTimeout(res, 300));
            await handleSubmitUser();
          }}
        />
      </div>
    </div>
  );
}
