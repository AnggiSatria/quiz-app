import cloudinary from "@/packages/shared/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { QuizType } from "@/generated/prisma"; // pastikan ini sesuai dengan enum di Prisma

function isValidVideoType(value: string): value is QuizType {
  return Object.values(QuizType).includes(value as QuizType);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  const video_type_raw = formData.get("video_type");

  if (!(file instanceof File) || typeof video_type_raw !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid file or video_type" },
      { status: 400 }
    );
  }

  if (!isValidVideoType(video_type_raw)) {
    return NextResponse.json(
      { error: "Invalid video_type value" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const upload = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "video", folder: "quiz-app" },
          (error, result) => {
            if (error || !result?.secure_url)
              return reject(error || new Error("Upload failed"));
            resolve({ secure_url: result.secure_url });
          }
        )
        .end(buffer);
    }
  );

  const prisma = (await import("@/packages/shared/lib/prisma")).prisma;

  const video = await prisma.video.create({
    data: {
      url: upload.secure_url,
      video_type: video_type_raw, // now safely typed as VideoType
    },
  });

  return NextResponse.json(video);
}
