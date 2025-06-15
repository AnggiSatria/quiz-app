/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "videoUrl";

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "video_type" "QuizType" NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
