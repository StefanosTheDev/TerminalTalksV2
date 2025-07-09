import { Clock, Award, TrendingUp, Star, BookOpen, Play } from 'lucide-react';

export default function StatsCard({
  completedCourses,
  inProgress,
  certificates,
}: any) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Total Hours */}

      {/* Completed Courses */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              Completed {completedCourses}
            </div>
            <div className="text-gray-400 text-sm">Completed</div>
          </div>
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {inProgress} In Progress
            </div>
            <div className="text-gray-400 text-sm">In Progress</div>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Star className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {certificates} Certificates Earned
            </div>
            <div className="text-gray-400 text-sm">Certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
}
