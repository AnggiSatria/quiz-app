import { prisma } from "@/packages/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// PATCH: Update video by ID
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const body = await req.json();

    const updatedVideo = await prisma.video.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update video", details: error },
      { status: 500 }
    );
  }
}

// DELETE: Remove video by ID
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete video", details: error },
      { status: 500 }
    );
  }
}
