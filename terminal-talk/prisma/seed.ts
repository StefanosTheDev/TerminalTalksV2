const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'mock@nextjs.dev' },
    update: {},
    create: {
      email: 'mock@nextjs.dev',
      username: 'testuser',
      clerkId: 'mock_clerk_id',
    },
  });

  const course = await prisma.course.upsert({
    where: { slug: 'nextjs-bootcamp' },
    update: {},
    create: {
      title: 'Next.js Bootcamp',
      slug: 'nextjs-bootcamp',
      description: 'A complete course on Next.js fundamentals.',
    },
  });

  await prisma.lecture.create({
    data: {
      title: 'Intro to Next.js',
      topic: 'Getting Started',
      description: 'Overview of what Next.js is and why it’s powerful.',
      transcript: 'Next.js is a React framework...',
      audioUrl: 'https://audio.url/nextjs-intro.mp3',
      courseId: course.id,
    },
  });

  await prisma.lecture.create({
    data: {
      title: 'Pages & Routing',
      topic: 'Routing',
      description: 'Learn about file-based routing in Next.js.',
      transcript: 'In Next.js, routing is based on the file system...',
      audioUrl: 'https://audio.url/nextjs-routing.mp3',
      courseId: course.id,
    },
  });

  await prisma.userCourse.create({
    data: {
      userId: user.id,
      courseId: course.id,
      progress: 50,
    },
  });

  await prisma.certificate.create({
    data: {
      userId: user.id,
      courseId: course.id,
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
