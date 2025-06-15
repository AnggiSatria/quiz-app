import { prisma } from "@/packages/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const { quiz_type, answer, question, level, url_image, shuffle } = body;

    if (!quiz_type || !answer) {
      return NextResponse.json(
        { error: "quiz_type and answer are required" },
        { status: 400 }
      );
    }

    // Validasi jika quiz_type adalah literasi
    if (quiz_type === "literasi") {
      const options = answer.options as string[];
      const correct = answer.correct as string;

      if (!Array.isArray(options) || typeof correct !== "string") {
        return NextResponse.json(
          {
            error:
              "Invalid answer format. Must contain options (array of IDs) and correct (ID string).",
          },
          { status: 400 }
        );
      }

      const uniqueIds = [...new Set([...options, correct])];
      const validImages = await prisma.masterImage.findMany({
        where: { id: { in: uniqueIds } },
        select: { id: true },
      });

      if (validImages.length !== uniqueIds.length) {
        return NextResponse.json(
          { error: "One or more provided master image IDs are invalid." },
          { status: 400 }
        );
      }
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: {
        question,
        quiz_type,
        level,
        shuffle,
        url_image,
        answer,
      },
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
