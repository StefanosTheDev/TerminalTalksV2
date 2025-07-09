/*
  Warnings:

  - You are about to drop the column `slug` on the `Lecture` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Lecture_slug_idx";

-- DropIndex
DROP INDEX "Lecture_slug_key";

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "slug";
