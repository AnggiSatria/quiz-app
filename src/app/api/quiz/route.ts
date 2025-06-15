import { prisma, Prisma } from "@/packages/shared/lib/prisma";
import { shuffleArray } from "@/packages/shared/lib";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/packages/shared/lib/cloudinary";

import { QuizType, Level, ShuffleLevel } from "@/generated/prisma";

type AnswerLiterasi = {
  options: string[];
  correct: string;
};

function isAnswerLiterasi(obj: unknown): obj is AnswerLiterasi {
  if (
    typeof obj !== "object" ||
    obj === null ||
    !("options" in obj) ||
    !("correct" in obj)
  ) {
    return false;
  }

  const answer = obj as Record<string, unknown>;
  return (
    Array.isArray(answer.options) &&
    answer.options.every((opt) => typeof opt === "string") &&
    typeof answer.correct === "string"
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const quiz_type = searchParams.get("quiz_type") as QuizType | null;
  const level = searchParams.get("level") as Level | null;
  const shuffle = searchParams.get("shuffle") as ShuffleLevel | null;

  let quizzes = await prisma.quiz.findMany({
    where:
      quiz_type && level && shuffle ? { quiz_type, level, shuffle } : undefined,
  });

  if (quiz_type === "literasi") {
    const allImageIds = quizzes.flatMap((quiz) => {
      const rawAnswer = quiz.answer as Record<string, unknown>;
      if (!isAnswerLiterasi(rawAnswer)) {
        throw new Error("Invalid answer format in database for literasi quiz");
      }
      return [...rawAnswer.options, rawAnswer.correct];
    });

    const uniqueImageIds = [...new Set(allImageIds)];

    const images = await prisma.masterImage.findMany({
      where: { id: { in: uniqueImageIds } },
    });

    const imageMap = Object.fromEntries(
      images.map(({ createdAt, ...img }) => [img.id, img, createdAt])
    );

    quizzes = quizzes.map((quiz) => {
      const rawAnswer = quiz.answer as Record<string, unknown>;
      if (!isAnswerLiterasi(rawAnswer)) {
        throw new Error("Invalid answer format in database for literasi quiz");
      }

      return {
        ...quiz,
        answer: {
          options: rawAnswer.options.map((id: string) => imageMap[id]),
          correct: imageMap[rawAnswer.correct],
        },
      };
    });
  }

  return NextResponse.json(
    quiz_type && level && shuffle ? shuffleArray(quizzes) : quizzes
  );
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const question = formData.get("question")?.toString();
  const quiz_type = formData.get("quiz_type") as QuizType | null;
  const level = formData.get("level") as Level | null;
  const shuffle = formData.get("shuffle") as ShuffleLevel | null;
  const answerString = formData.get("answer")?.toString();
  const file = formData.get("file") as File | null;

  if (!question || !quiz_type || !level || !shuffle || !answerString) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  let url_image: string | undefined;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const upload = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "quiz-app/images" },
            (error, result) => {
              if (error || !result?.secure_url)
                return reject(error || new Error("Upload error"));
              resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    url_image = upload.secure_url;
  }

  let parsedAnswer: AnswerLiterasi;

  try {
    const parsed = JSON.parse(answerString);
    if (!isAnswerLiterasi(parsed)) {
      throw new Error("Invalid AnswerLiterasi format");
    }
    parsedAnswer = parsed;
  } catch {
    return NextResponse.json(
      { error: "Invalid answer format" },
      { status: 400 }
    );
  }

  if (quiz_type === "literasi") {
    const ids = [...parsedAnswer.options, parsedAnswer.correct];
    const uniqueIds = [...new Set(ids)];

    const count = await prisma.masterImage.count({
      where: { id: { in: uniqueIds } },
    });

    if (count !== uniqueIds.length) {
      return NextResponse.json(
        { error: "Invalid master image IDs in answer." },
        { status: 400 }
      );
    }
  }

  const quiz = await prisma.quiz.create({
    data: {
      question,
      quiz_type,
      level,
      shuffle,
      answer: parsedAnswer as Prisma.InputJsonValue,
      url_image,
    },
  });

  return NextResponse.json(quiz);
}
