export default function LecturePlayer() {
  // 1️⃣  Hard-code (or load from DB/props) the public CDN URL for your MP3
  const audioSrc =
    'https://hayblphdro.ufs.sh/f/6zr2dyGZyxvRF1JPJ0vH7xIqL2FMbvjtU5OfT1YBEdGgWoiA';

  // 2️⃣  If you also saved a WebVTT file, put its URL here
  // const captionsSrc =
  //   'https://hayblphdro.ufs.sh/f/<your-timing-file>.vtt';

  return (
    <main className="p-8 max-w-xl mx-auto">
      <audio controls preload="metadata" className="w-full rounded">
        {/* Source → browser streams straight from UploadThing’s CDN */}
        <source src={audioSrc} type="audio/mpeg" />
        {/* Optional word-highlight track */}
        {/* <track src={captionsSrc} kind="subtitles" default /> */}
        Your browser doesn’t support the audio element.
      </audio>
    </main>
  );
}
