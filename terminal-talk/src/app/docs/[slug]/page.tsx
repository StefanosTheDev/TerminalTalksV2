import LectureDetailPlaceholder from '@/app/_components/docs/LectureDetailPlaceHolder';
import SideTitle from '@/app/_components/docs/SideTitle';
import { notFound } from 'next/navigation';

export const lectures = [
  {
    slug: 'nextjs-intro',
    framework: 'Next.js',
    title: 'Intro to Next.js',
    content: 'Next.js is a React framework for building full-stack apps...',
  },
  {
    slug: 'aws-intro',
    framework: 'AWS',
    title: 'Deploying on AWS',
    content: 'To deploy an app on AWS, start with S3 or Amplify...',
  },
];

export default async function LecturePage({
  params,
}: {
  params: { slug: string };
}) {
  const lecture = lectures.find((l) => l.slug === params.slug);

  if (!lecture) return notFound();

  return (
    <div className="flex flex-col lg:flex-row gap-8 pt-40">
      <div className="flex-1">
        <LectureDetailPlaceholder />
      </div>
      <div className="hidden lg:block w-64 shrink-0">
        <SideTitle />
      </div>
    </div>
  );
}
