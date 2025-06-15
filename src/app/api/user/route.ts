import { prisma } from "@/packages/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, quiz_type, correctAnswers } = await req.json();

  const score = correctAnswers * 10;

  const user = await prisma.user.create({
    data: {
      name,
      score,
      quiz_type,
    },
  });

  return NextResponse.json(user);
}
