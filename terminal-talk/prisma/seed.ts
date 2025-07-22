// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Default project ID for local development (required by Lecture.model)
const defaultProjectId = 'YOUR_LOCAL_DEV_PROJECT_ID';

async function main() {
  const courses = [
    {
      title: 'Next.js Bootcamp',
      slug: 'nextjs-bootcamp',
      description: 'Master Next.js with this fullstack course.',
      category: 'Web Dev',
      lectures: [
        {
          title: 'Intro to Next.js',
          topic: 'Getting Started',
          description: 'Why Next.js is powerful',
          transcript: 'Next.js is a React framework...',
          projectId: defaultProjectId,
          totalSeconds: 330,
        },
        {
          title: 'Pages & Routing',
          topic: 'Routing',
          description: 'File-based routing system',
          transcript: 'Routing in Next.js is based on files...',
          projectId: defaultProjectId,
          totalSeconds: 435,
        },
      ],
    },
    {
      title: 'React Fundamentals',
      slug: 'react-fundamentals',
      description: 'Learn React from scratch.',
      category: 'Frontend',
      lectures: [
        {
          title: 'JSX Explained',
          topic: 'Syntax',
          description: 'JSX syntax overview',
          transcript: 'JSX allows mixing HTML with JS...',
          projectId: defaultProjectId,
          totalSeconds: 360,
        },
        {
          title: 'State & Props',
          topic: 'Core Concepts',
          description: 'Managing data in components',
          transcript: 'Props are read-only...',
          projectId: defaultProjectId,
          totalSeconds: 480,
        },
      ],
    },
    {
      title: 'PostgreSQL Basics',
      slug: 'postgresql-basics',
      description: 'Intro to SQL with PostgreSQL.',
      category: 'Database',
      lectures: [
        {
          title: 'SELECT Queries',
          topic: 'Querying',
          description: 'Basic SQL SELECT statements',
          transcript: 'SELECT * FROM table...',
          projectId: defaultProjectId,
          totalSeconds: 270,
        },
        {
          title: 'Relationships',
          topic: 'Schema Design',
          description: 'One-to-many and many-to-many',
          transcript: 'Using foreign keys...',
          projectId: defaultProjectId,
          totalSeconds: 390,
        },
      ],
    },
  ];

  for (const courseData of courses) {
    const course = await prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {},
      create: {
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        category: courseData.category,
      },
    });

    for (const lec of courseData.lectures) {
      await prisma.lecture.create({
        data: {
          title: lec.title,
          topic: lec.topic,
          description: lec.description,
          transcript: lec.transcript,
          totalSeconds: lec.totalSeconds,
          courseId: course.id,
          projectId: lec.projectId,
        },
      });
    }
  }

  console.log('✅ Seed complete (Courses + Lectures only)');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
