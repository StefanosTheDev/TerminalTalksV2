// src/components/LectureContent.tsx
interface LectureContentProps {
  id: number;
  title: string;
  topic: string;
  transcript: string;
  audioUrl: string;
}

export default function LectureContent({
  id,
  title,
  topic,
  transcript,
  audioUrl,
}: LectureContentProps) {
  return (
    <article className="prose prose-slate dark:prose-invert mx-auto max-w-3xl p-6">
      {/* ---------- Header ---------- */}
      <header>
        <h1 className="!mb-1">{title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            ID:
          </span>{' '}
          {id}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Topic:
          </span>{' '}
          {topic}
        </p>
      </header>

      {/* ---------- Transcript ---------- */}
      <section>
        <h2>Transcript</h2>
        <pre className="bg-slate-50 dark:bg-slate-800 rounded-md p-4 overflow-x-auto">
          {transcript}
        </pre>
      </section>

      {/* ---------- Audio ---------- */}
      <section>
        <h2>Listen</h2>
        <audio
          controls
          className="w-full my-2 rounded-md shadow-inner dark:shadow-none"
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <p className="text-sm break-all">
          <a
            href={audioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            {audioUrl}
          </a>
        </p>
      </section>
    </article>
  );
}
