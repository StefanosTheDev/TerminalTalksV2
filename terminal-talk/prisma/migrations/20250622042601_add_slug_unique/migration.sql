/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Lecture` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_slug_key" ON "Lecture"("slug");
