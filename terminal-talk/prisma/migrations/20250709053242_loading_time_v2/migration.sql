/*
  Warnings:

  - Made the column `totalTime` on table `Lecture` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "totalTime" SET NOT NULL;
