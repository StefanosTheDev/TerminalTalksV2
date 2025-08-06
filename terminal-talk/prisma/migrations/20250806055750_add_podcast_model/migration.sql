/*
  Warnings:

  - Added the required column `audience` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `script` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tone` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Podcast` table without a default value. This is not possible if the table is not empty.
  - Made the column `duration` on table `Podcast` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Podcast_conversationId_key";

-- AlterTable
ALTER TABLE "Podcast" ADD COLUMN     "audience" TEXT NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "script" TEXT NOT NULL,
ADD COLUMN     "tone" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "duration" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Podcast_userId_idx" ON "Podcast"("userId");

-- CreateIndex
CREATE INDEX "Podcast_conversationId_idx" ON "Podcast"("conversationId");
