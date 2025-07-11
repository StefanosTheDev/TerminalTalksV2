// app/dashboard/library/[courseId]/layout.tsx  (or page.tsx)
import { LectureIndexProvider } from '@/app/context/_lectureContext';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LectureIndexProvider>{children}</LectureIndexProvider>;
}
