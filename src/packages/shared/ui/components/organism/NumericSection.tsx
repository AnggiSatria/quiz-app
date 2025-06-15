"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type LiteracyQuestion = {
  level: number;
  question: string;
  image: string;
};

type NumeracyQuestion = {
  level: number;
  question: string;
  options: string[];
  answer: string;
};

const literacyShuffles: LiteracyQuestion[][] = [
  [
    {
      level: 1,
      question:
        "Rudi punya 5 bola. Dia memberikan 1 bola kepada adiknya. Berapa bola Rudi sekarang?",
      image: "5bola-1bola.png",
    },
    {
      level: 1,
      question:
        "Ayu memiliki 3 permen. Ibu memberinya 2 permen lagi. Berapa total permen Ayu sekarang?",
      image: "3permen+2permen.png",
    },
  ],
];

const numeracyShuffles: NumeracyQuestion[][] = [
  [
    {
      level: 1,
      question: "3 + 7 =",
      options: ["9", "11", "10", "8"],
      answer: "10",
    },
    {
      level: 1,
      question: "2 + 6 =",
      options: ["8", "7", "9", "6"],
      answer: "8",
    },
  ],
];

export default function NumericSection() {
  const params = useParams();
  const category = params?.category as string;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionSet, setQuestionSet] = useState<
    LiteracyQuestion[] | NumeracyQuestion[]
  >([]);
  const [questionData, setQuestionData] = useState<
    LiteracyQuestion | NumeracyQuestion | null
  >(null);

  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<string[]>([]);

  console.log(answers);

  useEffect(() => {
    if (!category) return;
    const randomIndex = Math.floor(Math.random() * 1);

    let set: LiteracyQuestion[] | NumeracyQuestion[] = [];

    if (category === "literasi") {
      set = literacyShuffles[randomIndex];
    } else if (category === "numerisasi") {
      set = numeracyShuffles[randomIndex];
    }

    setQuestionSet(set);
    setQuestionData(set[0]);
    setQuestionIndex(0);
    setTimeLeft(60);
  }, [category]);

  const handleAnswer = (selected: string) => {
    saveAnswer(selected);
    goToNextQuestion();
  };

  const saveAnswer = useCallback((answer: string) => {
    setAnswers((prev) => [...prev, answer]);
  }, []);

  const goToNextQuestion = useCallback(() => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < questionSet.length) {
      setQuestionIndex(nextIndex);
      setQuestionData(questionSet[nextIndex]);
      setTimeLeft(60);
    } else {
      alert("✅ Semua soal selesai dijawab!");
    }
  }, [questionIndex, questionSet]);

  useEffect(() => {
    if (!questionData) return;

    if (timeLeft === 0) {
      alert("⏰ Waktu habis!");
      saveAnswer("Waktu habis");
      goToNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, questionData, goToNextQuestion, saveAnswer]);

  function isLiteracyQuestion(
    question: LiteracyQuestion | NumeracyQuestion | null
  ): question is LiteracyQuestion {
    return !!question && "image" in question;
  }

  return (
    <div className="w-full absolute -translate-x-1/2 left-1/2 top-20 inline-flex flex-col lg:flex-row gap-5">
      {category === "literasi" && (
        <div className="flex w-full lg:w-1/3 min-h-[250px] items-center justify-center">
          {isLiteracyQuestion(questionData) && questionData.image ? (
            <Image
              src={`/images/${questionData.image}`}
              alt="Soal Gambar"
              className="max-h-full max-w-full object-contain"
              width={60}
              height={60}
              layout="responsive"
            />
          ) : (
            <span className="text-center">Soal tanpa gambar</span>
          )}
        </div>
      )}

      <div
        className={`flex flex-col gap-3 ${
          category === "literasi" ? "w-full lg:w-2/3 min-h-[250px]" : "w-full"
        }`}
      >
        <div className="flex justify-between px-5 text-lg text-gray-600">
          <span>Soal ke-{questionIndex + 1}</span>
          <span>Sisa waktu: {timeLeft}s</span>
        </div>

        <h2 className="flex w-full h-fit rounded-xl text-[#0a0a0a] bg-[#96adfc] text-center pt-3 px-5 pb-5 font-bold text-2xl justify-center items-center">
          {questionData?.question || "Memuat soal..."}
        </h2>

        <div className="flex w-full justify-center flex-wrap gap-3 px-5 pb-4">
          {"options" in (questionData || {}) &&
            (questionData as NumeracyQuestion).options?.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
              >
                {opt}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
