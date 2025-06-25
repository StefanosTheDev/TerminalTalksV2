import {
  getLectureCached,
  getAllLectureSlugs,
  getLectureBySlug,
} from '@/app/_lib/services/lectureService';
import { notFound } from 'next/navigation';
import AudioPlayer from '@/app/_components/docs/audio-player';
import ContentFooter from '@/app/_components/docs/ContentFooter';
import ElevenLabsAudioNative from '@/app/_components/elevanLabs';

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

          {/* Audio player container with spacing control */}
          <div className="mt-16 max-w-2xl">
            <AudioPlayer
              topic={topic}
              transcript={transcript}
              audioUrl={audioUrl}
            />
          </div>
          <div
            id="elevenlabs-audionative-widget"
            data-height="90"
            data-width="100%"
            data-frameborder="no"
            data-scrolling="no"
            data-publicuserid="5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f"
            data-playerurl="https://elevenlabs.io/player/index.html"
            data-projectid="XHHtSSPbIYiMiYG6NyUU"
          >
            Loading the{' '}
            <a
              href="https://elevenlabs.io/text-to-speech"
              target="_blank"
              rel="noopener"
            >
              Elevenlabs Text to Speech
            </a>{' '}
            AudioNative Player...
          </div>
          <script
            src="https://elevenlabs.io/player/audioNativeHelper.js"
            type="text/javascript"
          ></script>
          {/* <ElevenLabsAudioNative
            publicUserId="5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f"
            size="large"
            textColorRgba="rgba(255,255,255,1)"
            backgroundColorRgba="rgba(0,0,0,1)"
          /> */}
          <div className="mt-12">
            <ContentFooter />
          </div>
        </section>
      </div>
    </div>
  );
}
