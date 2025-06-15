// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";

// type LiteracyQuestion = {
//   level: number;
//   question: string;
//   image: string;
// };

// type NumeracyQuestion = {
//   level: number;
//   question: string;
//   options: string[];
//   answer: string;
// };

// const literacyShuffles: LiteracyQuestion[][] = [
//   [
//     {
//       level: 1,
//       question:
//         "Rudi punya 5 bola. Dia memberikan 1 bola kepada adiknya. Berapa bola Rudi sekarang?",
//       image: "5bola-1bola.png",
//     },
//     {
//       level: 1,
//       question:
//         "Ayu memiliki 3 permen. Ibu memberinya 2 permen lagi. Berapa total permen Ayu sekarang?",
//       image: "3permen+2permen.png",
//     },
//   ],
// ];

// const numeracyShuffles: NumeracyQuestion[][] = [
//   [
//     {
//       level: 1,
//       question: "3 + 7 =",
//       options: ["9", "11", "10", "8"],
//       answer: "10",
//     },
//     {
//       level: 1,
//       question: "2 + 6 =",
//       options: ["8", "7", "9", "6"],
//       answer: "8",
//     },
//   ],
// ];

// export default function NumericSection() {
//   const params = useParams();
//   const category = params?.category as string;

//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [questionSet, setQuestionSet] = useState<
//     LiteracyQuestion[] | NumeracyQuestion[]
//   >([]);
//   const [questionData, setQuestionData] = useState<
//     LiteracyQuestion | NumeracyQuestion | null
//   >(null);

//   const [timeLeft, setTimeLeft] = useState(60);
//   const [answers, setAnswers] = useState<string[]>([]);

//   console.log(answers);

//   useEffect(() => {
//     if (!category) return;
//     const randomIndex = Math.floor(Math.random() * 1);

//     let set: LiteracyQuestion[] | NumeracyQuestion[] = [];

//     if (category === "literasi") {
//       set = literacyShuffles[randomIndex];
//     } else if (category === "numerisasi") {
//       set = numeracyShuffles[randomIndex];
//     }

//     setQuestionSet(set);
//     setQuestionData(set[0]);
//     setQuestionIndex(0);
//     setTimeLeft(60);
//   }, [category]);

//   const handleAnswer = (selected: string) => {
//     saveAnswer(selected);
//     goToNextQuestion();
//   };

//   const saveAnswer = useCallback((answer: string) => {
//     setAnswers((prev) => [...prev, answer]);
//   }, []);

//   const goToNextQuestion = useCallback(() => {
//     const nextIndex = questionIndex + 1;
//     if (nextIndex < questionSet.length) {
//       setQuestionIndex(nextIndex);
//       setQuestionData(questionSet[nextIndex]);
//       setTimeLeft(60);
//     } else {
//       alert("✅ Semua soal selesai dijawab!");
//     }
//   }, [questionIndex, questionSet]);

//   useEffect(() => {
//     if (!questionData) return;

//     if (timeLeft === 0) {
//       alert("⏰ Waktu habis!");
//       saveAnswer("Waktu habis");
//       goToNextQuestion();
//       return;
//     }

//     const timer = setTimeout(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [timeLeft, questionData, goToNextQuestion, saveAnswer]);

//   function isLiteracyQuestion(
//     question: LiteracyQuestion | NumeracyQuestion | null
//   ): question is LiteracyQuestion {
//     return !!question && "image" in question;
//   }

//   return (
//     <div className="w-full absolute -translate-x-1/2 left-1/2 top-20 inline-flex flex-col lg:flex-row gap-5">
//       {category === "literasi" && (
//         <div className="flex w-full lg:w-1/3 min-h-[250px] items-center justify-center">
//           {isLiteracyQuestion(questionData) && questionData.image ? (
//             <Image
//               src={`/images/${questionData.image}`}
//               alt="Soal Gambar"
//               className="max-h-full max-w-full object-contain"
//               width={60}
//               height={60}
//               layout="responsive"
//             />
//           ) : (
//             <span className="text-center">Soal tanpa gambar</span>
//           )}
//         </div>
//       )}

//       <div
//         className={`flex flex-col gap-3 ${
//           category === "literasi" ? "w-full lg:w-2/3 min-h-[250px]" : "w-full"
//         }`}
//       >
//         <div className="flex justify-between px-5 text-lg text-gray-600">
//           <span>Soal ke-{questionIndex + 1}</span>
//           <span>Sisa waktu: {timeLeft}s</span>
//         </div>

//         <h2 className="flex w-full h-fit rounded-xl text-[#0a0a0a] bg-[#96adfc] text-center pt-3 px-5 pb-5 font-bold text-2xl justify-center items-center">
//           {questionData?.question || "Memuat soal..."}
//         </h2>

//         <div className="flex w-full justify-center flex-wrap gap-3 px-5 pb-4">
//           {"options" in (questionData || {}) &&
//             (questionData as NumeracyQuestion).options?.map((opt, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleAnswer(opt)}
//                 className="border px-4 py-2 rounded hover:bg-gray-100 cursor-pointer"
//               >
//                 {opt}
//               </button>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useReadQuiz } from "@/packages/shared/utils/service/quiz"; // adjust the path

export default function NumericSection() {
  const params = useParams();
  const searchParams = useSearchParams();

  const category = params?.category as string;
  const level = params?.level as string;
  const shuffle = searchParams.get("shuffle") || "ONE";

  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const { data: questions, isLoading } = useReadQuiz({
    type: category,
    level,
    shuffle,
  });

  console.log(isLoading);

  const currentQuestion = questions?.[questionIndex] || null;

  console.log(currentQuestion);

  const handleAnswer = (selected: string) => {
    saveAnswer(selected);
    goToNextQuestion();
  };

  const goToNextQuestion = useCallback(() => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < (questions?.length || 0)) {
      setQuestionIndex(nextIndex);
      setTimeLeft(60);
    } else {
      alert(
        `✅ Semua soal selesai dijawab!\nSkor kamu: ${score}/${questions?.length}`
      );
      console.log("Jawaban:", answers);
      console.log("Hasil:", results);
    }
  }, [questionIndex, questions, answers, results, score]);

  const saveAnswer = useCallback(
    (answer: string) => {
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
      alert("⏰ Waktu habis!");
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
  const isNumeracy = currentQuestion?.quiz_type === "numerisasi";
  console.log(isNumeracy);

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
                  className={`border px-4 py-2 rounded cursor-pointer
          ${
            showCorrectAnswer && isCorrect
              ? "bg-green-200 border-green-500"
              : ""
          }
          ${
            showCorrectAnswer && isSelected && !isCorrect
              ? "bg-red-200 border-red-500"
              : ""
          }
          ${showCorrectAnswer ? "pointer-events-none" : "hover:bg-gray-100"}`}
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
