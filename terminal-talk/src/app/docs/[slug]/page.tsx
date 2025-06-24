import { getLectureBySlug } from '@/app/_lib/services/lectureService';
import LectureContent from '@/app/_components/docsV2/MainContentV2';
import { notFound } from 'next/navigation';
import { AudioPlayerSection } from '@/app/_components/docs/AudioPlayer';

export default async function docPage({
  params, // 👈 e.g., { slug: 'aws-intro' }
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  console.log(slug);
  const lecture = await getLectureBySlug(slug); // Server-side DB call

  if (!lecture) return notFound();

  const { id, title, topic, transcript, audioUrl } = lecture;

  return (
    <div className="flex flex-col lg:flex-row gap-8 pt-40">
      <div className="flex-1">
        <LectureContent
          id={id}
          title={title}
          topic={topic}
          transcript={transcript}
          audioUrl={audioUrl}
        />
      </div>
      {/* <AudioPlayerSection /> */}
    </div>
  );
}
