/*
  Warnings:

  - Added the required column `shuffle` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShuffleLevel" AS ENUM ('ONE', 'TWO', 'THREE');

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "shuffle" "ShuffleLevel" NOT NULL;
