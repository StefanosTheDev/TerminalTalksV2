/*
  Warnings:

  - You are about to drop the column `audioUrl` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `totalTime` on the `Lecture` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Made the column `totalSeconds` on table `Lecture` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "audioUrl",
DROP COLUMN "totalTime",
ADD COLUMN     "projectId" TEXT NOT NULL,
ALTER COLUMN "totalSeconds" SET NOT NULL;
