/*
  Warnings:

  - A unique constraint covering the columns `[transcript]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[audioUrl]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - Made the column `transcript` on table `Lecture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `audioUrl` on table `Lecture` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "transcript" SET NOT NULL,
ALTER COLUMN "audioUrl" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_transcript_key" ON "Lecture"("transcript");

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_audioUrl_key" ON "Lecture"("audioUrl");
