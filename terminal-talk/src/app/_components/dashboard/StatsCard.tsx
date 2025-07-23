import { Award, TrendingUp, Star } from 'lucide-react';

interface StatsCardProps {
  completedCourses: number;
  inProgress: number;
  certificates: number;
}

export default function StatsCard({
  completedCourses,
  inProgress,
  certificates,
}: StatsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
      {/* Completed Courses */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 sm:p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-lg sm:text-2xl font-bold text-white leading-tight">
              {completedCourses} Completed
            </div>
            <div className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 sm:p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-lg sm:text-2xl font-bold text-white leading-tight">
              {inProgress} In Progress
            </div>
            <div className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
              In Progress
            </div>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 sm:p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Star className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-lg sm:text-2xl font-bold text-white leading-tight">
              {certificates} Certificates
            </div>
            <div className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
              Certificates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
