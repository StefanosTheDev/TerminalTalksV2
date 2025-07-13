/*
  Warnings:

  - You are about to drop the column `courseId` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the `LectureProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lecture" DROP CONSTRAINT "Lecture_courseId_fkey";

-- DropForeignKey
ALTER TABLE "LectureProgress" DROP CONSTRAINT "LectureProgress_lectureId_fkey";

-- DropForeignKey
ALTER TABLE "LectureProgress" DROP CONSTRAINT "LectureProgress_userId_fkey";

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "courseId";

-- DropTable
DROP TABLE "LectureProgress";

-- CreateTable
CREATE TABLE "CourseLecture" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "lectureId" INTEGER NOT NULL,

    CONSTRAINT "CourseLecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseLecture_courseId_lectureId_key" ON "CourseLecture"("courseId", "lectureId");

-- AddForeignKey
ALTER TABLE "CourseLecture" ADD CONSTRAINT "CourseLecture_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseLecture" ADD CONSTRAINT "CourseLecture_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
