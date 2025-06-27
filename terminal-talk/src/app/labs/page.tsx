// import ElevenLabsAudioNative from './elevanLabs';

import { ElevenLabsAudioNative1 } from './reactLabs';

export default function Page() {
  return (
    <div>
      <h1>Your Page Title</h1>
      {/* <ElevenLabsAudioNative /> */}
      <ElevenLabsAudioNative1
        publicUserId="5bd3aa086d8aa1396b96cbae5975336df8843264d9320715ff2b832167063d8f"
        size="small"
        textColorRgba="rgba(255, 255, 255, 1.0)"
        backgroundColorRgba="rgba(0, 0, 0, 1.0)"
      />
    </div>
  );
}
