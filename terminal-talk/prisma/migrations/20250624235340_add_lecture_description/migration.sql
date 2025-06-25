/*
  Warnings:

  - Added the required column `description` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Lecture_audioUrl_key";

-- DropIndex
DROP INDEX "Lecture_transcript_key";

-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "description" TEXT NOT NULL;
