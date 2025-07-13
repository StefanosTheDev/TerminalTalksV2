// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
          audioUrl: 'https://audio.url/nextjs-intro.mp3',
          totalTime: '5:30',
          totalSeconds: 330,
        },
        {
          title: 'Pages & Routing',
          topic: 'Routing',
          description: 'File-based routing system',
          transcript: 'Routing in Next.js is based on files...',
          audioUrl: 'https://audio.url/routing.mp3',
          totalTime: '7:15',
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
          audioUrl: 'https://audio.url/jsx.mp3',
          totalTime: '6:00',
          totalSeconds: 360,
        },
        {
          title: 'State & Props',
          topic: 'Core Concepts',
          description: 'Managing data in components',
          transcript: 'Props are read-only...',
          audioUrl: 'https://audio.url/state-props.mp3',
          totalTime: '8:00',
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
          audioUrl: 'https://audio.url/select.mp3',
          totalTime: '4:30',
          totalSeconds: 270,
        },
        {
          title: 'Relationships',
          topic: 'Schema Design',
          description: 'One-to-many and many-to-many',
          transcript: 'Using foreign keys...',
          audioUrl: 'https://audio.url/relationships.mp3',
          totalTime: '6:30',
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
          ...lec,
          courseId: course.id,
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
