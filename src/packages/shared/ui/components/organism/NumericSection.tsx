"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { IResponseQuiz } from "@/packages/shared/interfaces/quiz.interface";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface Props {
  questions: IResponseQuiz[];
}

export default function NumericSection({ questions }: Props) {
  const { level, category } = useParams();
  const searchParams = useSearchParams();
  const shuffle = searchParams.get("shuffle") || "ONE";
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const currentQuestion = questions?.[questionIndex] || null;

  console.log(currentQuestion);

  const handleAnswer = (selected: string) => {
    saveAnswer(selected);
    goToNextQuestion();
  };

  const goToNextQuestion = useCallback(() => {
    if (hasFinished) return;

    const nextIndex = questionIndex + 1;
    if (nextIndex < (questions?.length || 0)) {
      setQuestionIndex(nextIndex);
      setTimeLeft(60);
    } else {
      setHasFinished(true); // ✅ set ini agar tidak dipanggil lagi

      router.push(
        `${
          level === "ONE"
            ? `/game/${category}/TWO?shuffle=${shuffle}`
            : level === "TWO"
            ? `/game/${category}/THREE?shuffle=${shuffle}`
            : level === "THREE"
            ? `/game/${category}/FOUR?shuffle=${shuffle}`
            : level === "FOUR"
            ? `/game/${category}/FIVE?shuffle=${shuffle}`
            : level === "FIVE"
            ? `/game/${category}/finish?shuffle=${shuffle}`
            : ``
        }`
      );

      console.log("Jawaban:", answers);
      console.log("Hasil:", results);
    }
  }, [
    questionIndex,
    questions,
    answers,
    results,
    score,
    level,
    category,
    shuffle,
    hasFinished,
  ]);

  const saveAnswer = useCallback(
    (answer: string) => {
      if (hasFinished) return;
      const correctAnswer = currentQuestion?.answer?.correct;

      let isCorrect = false;
      if (typeof correctAnswer === "string") {
        isCorrect = answer === correctAnswer;
      } else if (typeof correctAnswer === "object" && correctAnswer !== null) {
        isCorrect = answer === correctAnswer.id;
      }

      setAnswers((prev) => [...prev, answer]);
      setResults((prev) => [...prev, isCorrect]);

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setShowCorrectAnswer(true); // ⬅️ Tampilkan jawaban dulu

      // ⏱️ Setelah 2 detik baru lanjut ke soal berikutnya
      setTimeout(() => {
        setShowCorrectAnswer(false);
        goToNextQuestion();
      }, 2000);
    },
    [currentQuestion, goToNextQuestion]
  );

  useEffect(() => {
    if (timeLeft === 0 && currentQuestion) {
      // alert("⏰ Waktu habis!");
      saveAnswer("Waktu habis");
      goToNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestion, saveAnswer, goToNextQuestion]);

  const isLiteracy = currentQuestion?.quiz_type === "literasi";

  return (
    <div className="w-full absolute -translate-x-1/2 left-1/2 top-20 inline-flex flex-col lg:flex-row gap-5">
      {isLiteracy && (
        <div className="flex w-full lg:w-1/3 min-h-[250px] items-center justify-center">
          {typeof currentQuestion?.question === "object" &&
          currentQuestion?.question?.url ? (
            <Image
              src={currentQuestion.question.url}
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
          isLiteracy ? "w-full lg:w-2/3 min-h-[250px]" : "w-full"
        }`}
      >
        <div className="flex justify-between px-5 text-lg text-gray-600">
          <span>Soal ke-{questionIndex + 1}</span>
          <span>Sisa waktu: {timeLeft}s</span>
        </div>

        <h2 className="flex w-full h-fit rounded-xl text-[#0a0a0a] bg-[#96adfc] text-center pt-3 px-5 pb-5 font-bold text-2xl justify-center items-center">
          {typeof currentQuestion?.question === "string"
            ? currentQuestion.question
            : currentQuestion?.question.name}
        </h2>

        <div className="flex w-full justify-center flex-wrap gap-3 px-5 pb-4">
          {Array.isArray(currentQuestion?.answer?.options) &&
            currentQuestion.answer.options.map((opt, idx) => {
              const optId = typeof opt === "string" ? opt : opt.id;
              const optLabel = typeof opt === "string" ? opt : opt.url;
              console.log(optLabel);

              const isCorrect =
                typeof currentQuestion.answer.correct === "string"
                  ? optId === currentQuestion.answer.correct
                  : optId === currentQuestion.answer.correct?.id;

              const isSelected = answers[questionIndex] === optId;

              return (
                <button
                  key={idx}
                  onClick={() => !showCorrectAnswer && handleAnswer(optId)}
                  className={`border px-4 py-2 rounded cursor-pointer${
                    showCorrectAnswer && isCorrect
                      ? "bg-green-200 border-green-500"
                      : ""
                  }${
                    showCorrectAnswer && isSelected && !isCorrect
                      ? "bg-red-200 border-red-500"
                      : ""
                  }${
                    showCorrectAnswer
                      ? "pointer-events-none"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {typeof opt === "string" ? (
                    opt
                  ) : (
                    <Image
                      src={opt.url}
                      alt={opt.name}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
