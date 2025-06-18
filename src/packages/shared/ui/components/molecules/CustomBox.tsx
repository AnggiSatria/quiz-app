import { IResponseUser } from "@/packages/shared/interfaces/user.interface";
import { Baloo_2 } from "next/font/google";
import { useRouter } from "next/navigation";
import React from "react";
import SubmitButton from "../atoms/SubmitButton";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function CustomBox({
  data,
  shuffle,
}: {
  data: IResponseUser;
  shuffle: string;
}) {
  const wrong = data?.list_score?.filter((res) => !res?.isCorrect)?.length;
  const correct = data?.list_score?.filter((res) => res?.isCorrect)?.length;
  const router = useRouter();
  const storageKey = `quiz-answers-${data?.quiz_type}-${shuffle}`;
  const handleNavigate = async () => {
    localStorage.removeItem(storageKey);
    router.push(`/thank-you`);
  };

  return (
    <div
      className={`w-full h-fit rounded-xl border-2 border-pink-300 bg-gradient-to-b from-white to-blue-100 p-6 shadow-xl relative ${baloo2.className}`}
    >
      <h1 className="text-center text-pink-600 font-bold text-2xl mb-4">
        Berikut Hasil Anda
      </h1>

      <div className="flex w-full p-5 relative">
        <h1
          className={`${baloo2.className} text-[#faf6ae] inline-flex justify-center items-center space-x-1 text-4xl font-bold flex-col gap-3 w-full`}
        >
          <span className="text-pink-300 font-bold text-2xl w-full">
            Nama : {data?.name}
          </span>
          <span className="text-pink-300 font-bold text-2xl w-full">
            Category : {data?.quiz_type}
          </span>
          <div className="flex w-full justify-between">
            <span className="text-pink-300 font-bold text-2xl w-1/2">
              Benar : {correct}
            </span>
            <span className="text-pink-300 font-bold text-2xl w-1/2">
              Salah : {wrong}
            </span>
          </div>
          <span className="text-pink-300 font-bold text-2xl w-full">
            Total Soal : {data?.list_score?.length}
          </span>
          <span className="text-pink-300 font-bold text-2xl w-full">
            Score : {data?.score}
          </span>
        </h1>
      </div>

      <SubmitButton
        onClick={async () => {
          await new Promise((res) => setTimeout(res, 300));
          await handleNavigate();
        }}
        label="Keluar"
      />
    </div>
  );
}
