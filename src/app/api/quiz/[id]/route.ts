import { Level, QuizType, ShuffleLevel } from "@/generated/prisma";
import cloudinary from "@/packages/shared/lib/cloudinary";
import { prisma, Prisma } from "@/packages/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const formData = await req.formData();

    const question = formData.get("question")?.toString();
    const quiz_type = formData.get("quiz_type") as QuizType | null;
    const level = formData.get("level") as Level | null;
    const shuffle = formData.get("shuffle") as ShuffleLevel | null;
    const url_image = formData.get("url_image")?.toString();
    const file = formData.get("file") as File | null;

    const answerString = formData.get("answer")?.toString();
    if (!quiz_type || !answerString) {
      return NextResponse.json(
        { error: "quiz_type and answer required" },
        { status: 400 }
      );
    }

    let parsedAnswer: AnswerLiterasi;
    try {
      const parsed = JSON.parse(answerString);
      if (!isAnswerLiterasi(parsed)) throw new Error("Invalid format");
      parsedAnswer = parsed;
    } catch {
      return NextResponse.json(
        { error: "Invalid answer format" },
        { status: 400 }
      );
    }

    // Validasi master image
    if (quiz_type === "literasi") {
      const ids = [...parsedAnswer.options, parsedAnswer.correct];
      const count = await prisma.masterImage.count({
        where: { id: { in: ids } },
      });
      if (count !== ids.length) {
        return NextResponse.json(
          { error: "Invalid master image IDs" },
          { status: 400 }
        );
      }
    }

    // Upload file jika ada
    let newUrlImage: string | undefined = url_image;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
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
      newUrlImage = upload.secure_url;
    }

    const updateData: Prisma.QuizUpdateInput = {
      answer: parsedAnswer as Prisma.InputJsonValue,
      quiz_type,
      url_image: newUrlImage,
    };

    // Hanya set jika tidak null
    if (question !== null) updateData.question = question;
    if (level !== null) updateData.level = level;
    if (shuffle !== null) updateData.shuffle = shuffle;

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update quiz", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.quiz.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete quiz", details: error },
      { status: 500 }
    );
  }
}
