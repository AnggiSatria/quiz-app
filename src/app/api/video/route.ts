import { prisma } from "@/packages/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { QuizType } from "@/generated/prisma"; // ganti jika sebenarnya ini VideoType

function isValidVideoType(value: string): value is QuizType {
  return Object.values(QuizType).includes(value as QuizType);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const video_type = searchParams.get("video_type");

  const where =
    video_type !== null && isValidVideoType(video_type)
      ? { video_type }
      : undefined;

  const videos = await prisma.video.findMany({ where });

  return NextResponse.json(videos);
}
