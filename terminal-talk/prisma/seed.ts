// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Define proper types for CSV data
interface CourseRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
}

interface LectureRow {
  id: string;
  title: string;
  topic: string;
  description: string;
  transcript: string;
  projectId: string;
  createdAt: string;
  totalSeconds: string;
  courseId: string;
}

// Simple CSV parser function with proper typing
function parseCSV<T = Record<string, string>>(csvContent: string): T[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines
    .slice(1)
    .map((line) => {
      // Handle CSV with quoted fields that contain commas
      const values: string[] = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim()); // Don't forget the last value

      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row as T;
    })
    .filter((row) =>
      Object.values(row as Record<string, string>).some((val) => val.length > 0)
    ); // Skip empty rows
}

async function main() {
  // Load and parse CSV files
  const coursesCsvPath = path.resolve(__dirname, 'courses.csv');
  const lecturesCsvPath = path.resolve(__dirname, 'lectures.csv');

  const coursesCsv = fs.readFileSync(coursesCsvPath, 'utf8');
  const lecturesCsv = fs.readFileSync(lecturesCsvPath, 'utf8');

  const courses = parseCSV<CourseRow>(coursesCsv);
  const lectures = parseCSV<LectureRow>(lecturesCsv);

  console.log(
    `Found ${courses.length} courses and ${lectures.length} lectures`
  );

  // Map to store original courseId to new courseId mapping
  const courseIdMap: Record<string, number> = {};

  // Upsert courses
  for (const row of courses) {
    const { id, title, slug, description, category } = row;

    // Validate required fields
    if (!title || !slug || !description || !category) {
      console.warn(`Skipping course with missing data: ${JSON.stringify(row)}`);
      continue;
    }

    console.log(`Processing course: ${title}`);

    const course = await prisma.course.upsert({
      where: { slug },
      update: { title, description, category },
      create: { title, slug, description, category },
    });

    // Map original CSV courseId to database courseId
    courseIdMap[id] = course.id;
    console.log(`✅ Course "${title}" - ID mapping: ${id} -> ${course.id}`);
  }

  // Insert lectures
  for (const row of lectures) {
    const {
      id,
      title,
      topic,
      description,
      transcript,
      projectId,
      totalSeconds,
      courseId,
    } = row;

    // Validate required fields
    if (!title || !courseId || !totalSeconds || !projectId) {
      console.warn(
        `Skipping lecture with missing data: ${JSON.stringify(row)}`
      );
      continue;
    }

    // Get the mapped courseId
    const mappedCourseId = courseIdMap[courseId];
    if (!mappedCourseId) {
      console.warn(
        `Skipping lecture ${title}: courseId '${courseId}' not found in mapping.`
      );
      continue;
    }

    // Parse totalSeconds safely
    const parsedTotalSeconds = parseInt(totalSeconds, 10);
    if (isNaN(parsedTotalSeconds)) {
      console.warn(
        `Skipping lecture ${title}: invalid totalSeconds '${totalSeconds}'`
      );
      continue;
    }

    console.log(`Processing lecture: ${title} (Project ID: ${projectId})`);

    try {
      // Try to find existing lecture by title and courseId
      const existingLecture = await prisma.lecture.findFirst({
        where: {
          title,
          courseId: mappedCourseId,
        },
      });

      if (existingLecture) {
        // Update existing lecture
        await prisma.lecture.update({
          where: { id: existingLecture.id },
          data: {
            topic,
            description,
            transcript: transcript || '',
            totalSeconds: parsedTotalSeconds,
            projectId,
          },
        });
        console.log(`✅ Updated lecture: ${title}`);
      } else {
        // Create new lecture
        await prisma.lecture.create({
          data: {
            title,
            topic,
            description,
            transcript: transcript || '',
            totalSeconds: parsedTotalSeconds,
            courseId: mappedCourseId,
            projectId,
          },
        });
        console.log(`✅ Created lecture: ${title}`);
      }
    } catch (error) {
      console.error(`Error processing lecture ${title}:`, error);
    }
  }

  console.log('✅ Seed complete (Courses & Lectures from CSV)');

  // Print summary
  const courseCount = await prisma.course.count();
  const lectureCount = await prisma.lecture.count();
  console.log(
    `📊 Database now contains: ${courseCount} courses, ${lectureCount} lectures`
  );
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
