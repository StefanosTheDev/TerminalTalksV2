// import React from 'react';
// import { BookOpen, ChevronRight } from 'lucide-react';

// export default function AudioVisualizer({
//   isPlaying,
//   audioWave,
//   showTranscript,
//   onToggleTranscript,
// }): { isPlaying: any; audo } {
//   return (
//     <div className="relative mb-16">
//       <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 mx-auto max-w-4xl">
//         <div className="flex items-center justify-center mb-6">
//           <div className="flex items-center space-x-1 h-20">
//             {audioWave.map((height, i) => (
//               <div
//                 key={i}
//                 className="w-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full transition-all duration-100"
//                 style={{ height: isPlaying ? `${height}%` : '20%' }}
//               />
//             ))}
//           </div>
//         </div>
//         <button
//           onClick={onToggleTranscript}
//           className="group flex items-center mx-auto space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-all"
//         >
//           <BookOpen className="w-5 h-5" />
//           <span>{showTranscript ? 'Hide' : 'Show'} Transcript</span>
//           <ChevronRight
//             className={`w-4 h-4 transition-transform ${
//               showTranscript ? 'rotate-90' : ''
//             }`}
//           />
//         </button>
//       </div>
//     </div>
//   );
// }
