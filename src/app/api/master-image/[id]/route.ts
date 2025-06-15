import { prisma } from "@/packages/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const formData = await req.formData();
  const name = formData.get("name")?.toString();

  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  const updated = await prisma.masterImage.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const image = await prisma.masterImage.findUnique({
    where: { id },
  });

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  await prisma.masterImage.delete({ where: { id } });

  return NextResponse.json({ message: "Image deleted" });
}
