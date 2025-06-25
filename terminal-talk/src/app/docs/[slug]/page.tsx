import { getLectureBySlug } from '@/app/_lib/services/lectureService';
import { notFound } from 'next/navigation';
// import { AudioPlayer } from '@/app/_components/docs/audio-player';
import { ChevronRight, Zap } from 'lucide-react';
import ContentFooter from '@/app/_components/docs/ContentFooter';
import AudioPlayer from '@/app/_components/docs/audio-player';

export default async function docPage({
  params, // 👈 e.g., { slug: 'aws-intro' }
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const lecture = await getLectureBySlug(slug); // Server-side DB call

  if (!lecture) return notFound();

  const { id, title, topic, description, transcript, audioUrl } = lecture;

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-12 px-6">
      <div className="flex-1">
        <section className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
            {description}
          </p>
          <AudioPlayer
            topic={topic}
            transcript={transcript}
            audioUrl={audioUrl}
          />
          {/* Content Footer It Will Look At The Current Slug and Gie you a URL to click the Next One Or Prev*/}
          <ContentFooter />
        </section>
      </div>
    </div>
  );
}
