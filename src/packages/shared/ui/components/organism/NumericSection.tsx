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
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const currentQuestion = questions?.[questionIndex] || null;
  const storageKey = `quiz-answers-${category}-${shuffle}`;

  const handleAnswer = (selected: string) => {
    saveAnswer(selected);
  };

  const saveAnswer = useCallback(
    (answer: string) => {
      if (hasFinished || !currentQuestion) return;

      const correct = currentQuestion?.answer?.correct;
      const correctId =
        typeof correct === "string" ? correct : correct?.id ?? "";

      const selectedId = answer;
      const isCorrect = selectedId === correctId;
      const point = isCorrect ? 1 : 0;

      setAnswers((prev) => [...prev, selectedId]);

      // Simpan ke localStorage
      const prev = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const newEntry = {
        questionId: currentQuestion.id,
        userAnswer: selectedId,
        isCorrect,
        point,
      };
      localStorage.setItem(storageKey, JSON.stringify([...prev, newEntry]));

      setShowCorrectAnswer(true);

      setTimeout(() => {
        setShowCorrectAnswer(false);
        goToNextQuestion();
      }, 2000);
    },
    [currentQuestion, hasFinished, shuffle, category]
  );

  const goToNextQuestion = useCallback(() => {
    if (hasFinished) return;

    const nextIndex = questionIndex + 1;
    const isLast = nextIndex >= questions.length;

    if (isLast) {
      setHasFinished(true);

      // Navigasi ke level berikutnya
      const nextLevelMap: Record<string, string> = {
        ONE: "TWO",
        TWO: "THREE",
        THREE: "FOUR",
        FOUR: "FIVE",
        FIVE: "finish",
      };
      const nextLevel = nextLevelMap[level as string] || "finish";

      router.push(`/game/${category}/${nextLevel}?shuffle=${shuffle}`);
    } else {
      setQuestionIndex(nextIndex);
      setTimeLeft(60);
    }
  }, [questionIndex, questions.length, hasFinished, level, category, shuffle]);

  useEffect(() => {
    if (timeLeft === 0 && currentQuestion) {
      saveAnswer("Waktu habis");
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestion, saveAnswer]);

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

        <h2 className="rounded-xl text-[#0a0a0a] bg-[#96adfc] text-center pt-3 px-5 pb-5 font-bold text-2xl">
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

              const correct = currentQuestion.answer.correct;
              const correctId =
                typeof correct === "string" ? correct : correct?.id ?? "";

              const selectedAnswer = answers[questionIndex];
              const isCorrect = optId === correctId;
              const isSelected = selectedAnswer === optId;

              const correctClass =
                showCorrectAnswer && isCorrect
                  ? "bg-green-200 border-green-500"
                  : showCorrectAnswer && isSelected && !isCorrect
                  ? "bg-red-200 border-red-500"
                  : "";

              return (
                <button
                  key={idx}
                  onClick={() => !showCorrectAnswer && handleAnswer(optId)}
                  className={`border px-4 py-2 rounded cursor-pointer ${correctClass} ${
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
