// import React from 'react';
// import { Clock, BookOpen } from 'lucide-react';
// import { Play, Pause } from 'lucide-react';

// export default function EpisodeCard({
//   episode,
//   selectedEpisode,
//   isPlaying,
//   showTranscript,
//   onSelect,
//   onPlayPause,
// }) {
//   const isSelected = selectedEpisode?.id === episode.id;

//   return (
//     <div
//       className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all cursor-pointer
//         ${
//           isSelected
//             ? 'border-purple-500 shadow-lg shadow-purple-500/20'
//             : 'border-gray-700 hover:border-gray-600'
//         }`}
//       onClick={() => onSelect(episode)}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className="flex items-center space-x-3 mb-2">
//             <h4 className="text-xl font-semibold">{episode.title}</h4>
//             <span
//               className={`px-3 py-1 text-xs rounded-full font-medium
//               ${
//                 episode.level === 'Beginner'
//                   ? 'bg-green-500/20 text-green-300'
//                   : episode.level === 'Intermediate'
//                   ? 'bg-yellow-500/20 text-yellow-300'
//                   : 'bg-red-500/20 text-red-300'
//               }`}
//             >
//               {episode.level}
//             </span>
//           </div>
//           <p className="text-gray-400 mb-3">{episode.description}</p>
//           <div className="flex items-center space-x-4 text-sm">
//             <span className="flex items-center text-gray-500">
//               <Clock className="w-4 h-4 mr-1" />
//               {episode.duration}
//             </span>
//             <div className="flex space-x-2">
//               {episode.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onPlayPause(episode);
//           }}
//           className="ml-4 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/25 transition-all"
//         >
//           {isPlaying && isSelected ? (
//             <Pause className="w-6 h-6" />
//           ) : (
//             <Play className="w-6 h-6 ml-1" />
//           )}
//         </button>
//       </div>
//       {showTranscript && isSelected && (
//         <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
//           <h5 className="font-semibold mb-3 flex items-center">
//             <BookOpen className="w-5 h-5 mr-2" />
//             Transcript
//           </h5>
//           <p className="text-gray-300 leading-relaxed">{episode.transcript}</p>
//         </div>
//       )}
//     </div>
//   );
// }
