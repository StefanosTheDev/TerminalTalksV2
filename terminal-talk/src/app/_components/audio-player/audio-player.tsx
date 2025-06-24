// 'use client';

// import type React from 'react';

// import { useState, useRef, useEffect } from 'react';

// import {
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   SkipBack,
//   SkipForward,
//   ChevronDown,
//   ChevronUp,
//   FileText,
//   Download,
// } from 'lucide-react';

// export function AudioPlayer() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(754); // Mock duration
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [showTranscript, setShowTranscript] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);

//   // Mock transcript data
//   const transcript = [
//     {
//       time: 0,
//       text: 'Welcome to this comprehensive guide on React.js fundamentals.',
//     },
//     {
//       time: 15,
//       text: 'React is a JavaScript library for building user interfaces, particularly web applications.',
//     },
//     {
//       time: 30,
//       text: "One of React's core concepts is the component-based architecture.",
//     },
//     {
//       time: 45,
//       text: 'Components allow you to split the UI into independent, reusable pieces.',
//     },
//     {
//       time: 60,
//       text: 'Each component can manage its own state and lifecycle methods.',
//     },
//     {
//       time: 75,
//       text: 'Props are how you pass data from parent components to child components.',
//     },
//     {
//       time: 90,
//       text: 'State management is crucial for creating interactive applications.',
//     },
//     {
//       time: 105,
//       text: 'React hooks like useState and useEffect provide powerful functionality.',
//     },
//     {
//       time: 120,
//       text: 'Virtual DOM is what makes React applications fast and efficient.',
//     },
//   ];

//   const formatTime = (time: number) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//     // Mock audio behavior - in real implementation, control actual audio element
//   };

//   const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = (Number.parseFloat(e.target.value) / 100) * duration;
//     setCurrentTime(newTime);
//   };

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = Number.parseFloat(e.target.value) / 100;
//     setVolume(newVolume);
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   const skipTime = (seconds: number) => {
//     const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
//     setCurrentTime(newTime);
//   };

//   const jumpToTranscriptTime = (time: number) => {
//     setCurrentTime(time);
//   };

//   // Mock time progression when playing
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isPlaying) {
//       interval = setInterval(() => {
//         setCurrentTime((prev) => {
//           if (prev >= duration) {
//             setIsPlaying(false);
//             return duration;
//           }
//           return prev + 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isPlaying, duration]);

//   return (
//     <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-2xl">
//       {/* Track Info */}
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold text-white mb-2">
//           React.js Fundamentals
//         </h3>
//         <p className="text-gray-400">
//           Introduction to React Components and State Management
//         </p>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-6">
//         <div className="flex items-center space-x-4">
//           <span className="text-sm text-gray-400 w-12">
//             {formatTime(currentTime)}
//           </span>
//           <div className="flex-1 relative">
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={duration ? (currentTime / duration) * 100 : 0}
//               onChange={handleProgressChange}
//               className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
//               style={{
//                 background: `linear-gradient(to right, #3b82f6 0%, #06b6d4 ${
//                   duration ? (currentTime / duration) * 100 : 0
//                 }%, #374151 ${
//                   duration ? (currentTime / duration) * 100 : 0
//                 }%, #374151 100%)`,
//               }}
//             />
//           </div>
//           <span className="text-sm text-gray-400 w-12">
//             {formatTime(duration)}
//           </span>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Butt
//             variant="ghost"
//             size="icon"
//             onClick={() => skipTime(-10)}
//             className="w-10 h-10 hover:bg-gray-700/50"
//           >
//             <SkipBack className="h-5 w-5" />
//           </Butt>

//           <Button
//             onClick={handlePlayPause}
//             className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             {isPlaying ? (
//               <Pause className="h-6 w-6" />
//             ) : (
//               <Play className="h-6 w-6 ml-1" />
//             )}
//           </Button>

//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => skipTime(10)}
//             className="w-10 h-10 hover:bg-gray-700/50"
//           >
//             <SkipForward className="h-5 w-5" />
//           </Button>
//         </div>

//         <div className="flex items-center space-x-4">
//           {/* Volume Control */}
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleMute}
//               className="w-8 h-8 hover:bg-gray-700/50"
//             >
//               {isMuted ? (
//                 <VolumeX className="h-4 w-4" />
//               ) : (
//                 <Volume2 className="h-4 w-4" />
//               )}
//             </Button>
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={isMuted ? 0 : volume * 100}
//               onChange={handleVolumeChange}
//               className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
//             />
//           </div>

//           {/* Download Button */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="w-8 h-8 hover:bg-gray-700/50"
//           >
//             <Download className="h-4 w-4" />
//           </Button>

//           {/* Transcript Toggle */}
//           <Button
//             variant="outline"
//             onClick={() => setShowTranscript(!showTranscript)}
//             className="flex items-center space-x-2"
//           >
//             <FileText className="h-4 w-4" />
//             <span>Transcript</span>
//             {showTranscript ? (
//               <ChevronUp className="h-4 w-4" />
//             ) : (
//               <ChevronDown className="h-4 w-4" />
//             )}
//           </Button>
//         </div>
//       </div>

//       {/* Transcript Dropdown */}
//       {showTranscript && (
//         <div className="mt-6 pt-6 border-t border-gray-700/50">
//           <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-600/30">
//             <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
//               <FileText className="w-5 h-5 mr-2 text-blue-400" />
//               Interactive Transcript
//             </h4>
//             <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
//               {transcript.map((item, index) => (
//                 <div
//                   key={index}
//                   onClick={() => jumpToTranscriptTime(item.time)}
//                   className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//                     currentTime >= item.time &&
//                     (index === transcript.length - 1 ||
//                       currentTime < transcript[index + 1].time)
//                       ? 'bg-blue-500/20 border border-blue-500/30'
//                       : 'hover:bg-gray-600/30'
//                   }`}
//                 >
//                   <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 min-w-[3rem] text-center">
//                     {formatTime(item.time)}
//                   </span>
//                   <p className="text-gray-300 text-sm leading-relaxed">
//                     {item.text}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           height: 16px;
//           width: 16px;
//           border-radius: 50%;
//           background: linear-gradient(45deg, #3b82f6, #06b6d4);
//           cursor: pointer;
//           box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
//         }

//         .slider::-moz-range-thumb {
//           height: 16px;
//           width: 16px;
//           border-radius: 50%;
//           background: linear-gradient(45deg, #3b82f6, #06b6d4);
//           cursor: pointer;
//           border: none;
//           box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(55, 65, 81, 0.3);
//           border-radius: 3px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(45deg, #3b82f6, #06b6d4);
//           border-radius: 3px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(45deg, #2563eb, #0891b2);
//         }
//       `}</style>
//     </div>
//   );
// }
