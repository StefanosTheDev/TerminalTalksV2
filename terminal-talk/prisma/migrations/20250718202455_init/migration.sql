-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalTime" TEXT NOT NULL,
    "totalSeconds" INTEGER,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LectureProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lectureId" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LectureProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourse" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LectureProgress_userId_lectureId_key" ON "LectureProgress"("userId", "lectureId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCourse_userId_courseId_key" ON "UserCourse"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_userId_courseId_key" ON "Certificate"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureProgress" ADD CONSTRAINT "LectureProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LectureProgress" ADD CONSTRAINT "LectureProgress_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
