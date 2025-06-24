import { notFound } from 'next/navigation';
import { getLectureBySlug } from '@/app/_lib/services/lectureService';
import LectureContent from '@/app/_components/docs/server-main-content/MainContentV2';
export default async function docPage({
  params, // 👈 "aws-intro"
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log(slug);
  const lecture = await getLectureBySlug(slug); // Server Side DB Call

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
    </div>
  );
}
