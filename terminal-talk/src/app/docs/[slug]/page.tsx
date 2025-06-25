import {
  getAllLectureSlugs,
  getLectureBySlug,
} from '@/app/_lib/services/lectureService';
import { notFound } from 'next/navigation';
import AudioPlayer from '@/app/_components/docs/audio-player';
import ContentFooter from '@/app/_components/docs/ContentFooter';

export const dynamicParams = false; // 🚫 block unknown slugs

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllLectureSlugs();
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // fix “params should be awaited” warning

  const lecture = await getLectureBySlug(slug); // cached DB read
  if (!lecture) return notFound(); // should never happen, but safe

  const { topic, audioUrl, transcript, title, description } = lecture;
  return (
    <div className="flex flex-col lg:flex-row gap-8 py-12 px-6">
      <div className="flex-1">
        <section className="mb-12">
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl break-words">
            {description}
            dsdfsdfasdfasdfasdfasdfasdfasdfasdffsdfasdfasdfasdfasdfasdfasdfasdffsdfasdfasdfasdfasdfasdfasdfasdffsdfasdfasdfasdfasdfasdfasdfasdffsdfasdfasdfasdfasdfasdfasdfasdffsdfasdfasdfasdfasdfasdfasdfasdffsdfasdfasdfasdfasdfasdfasdfasdffsdfasdfasdfasdfasdfasdfasdfasdffsdfasdfasdfasdfasdfasdfasdfasdf
          </p>

          {/* Audio player container with spacing control Update */}
          <div className="mt-16 max-w-2xl">
            <AudioPlayer
              topic={topic}
              transcript={transcript}
              audioUrl={audioUrl}
            />
          </div>

          <div className="mt-12">
            <ContentFooter />
          </div>
        </section>
      </div>
    </div>
  );
}
