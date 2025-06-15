import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/packages/shared/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name")?.toString();
  const file = formData.get("file") as File | null;

  if (!name || !file) {
    return NextResponse.json(
      { error: "Missing name or file" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "quiz-app/master-images", resource_type: "image" },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
      .end(buffer);
  });

  const result = upload as { secure_url: string };

  const image = await prisma.masterImage.create({
    data: {
      name,
      url: result.secure_url,
    },
  });

  return NextResponse.json(image);
}

export async function GET() {
  const images = await prisma.masterImage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(images);
}
