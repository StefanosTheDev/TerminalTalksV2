/*
  Warnings:

  - Made the column `slug` on table `Lecture` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "slug" SET NOT NULL;
