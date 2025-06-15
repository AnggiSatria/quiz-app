/*
  Warnings:

  - You are about to drop the column `answers` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `exampleVideo` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `quizType` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `quizType` on the `User` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiz_type` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quiz_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "answers",
DROP COLUMN "exampleVideo",
DROP COLUMN "quizType",
ADD COLUMN     "answer" JSONB NOT NULL,
ADD COLUMN     "level" "Level" NOT NULL,
ADD COLUMN     "quiz_type" "QuizType" NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "quizType",
ADD COLUMN     "quiz_type" "QuizType" NOT NULL,
ALTER COLUMN "score" DROP DEFAULT;
