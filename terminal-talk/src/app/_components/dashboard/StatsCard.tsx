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
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-gray-900">
              {completedCourses}
            </div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-gray-900">{inProgress}</div>
            <div className="text-gray-600 text-sm">In Progress</div>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Star className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-gray-900">
              {certificates}
            </div>
            <div className="text-gray-600 text-sm">Certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
}
