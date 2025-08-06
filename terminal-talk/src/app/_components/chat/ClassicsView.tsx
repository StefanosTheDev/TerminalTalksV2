// app/_components/chat/ClassicsView.tsx
'use client';

import { BookOpen, Clock, Users, Crown } from 'lucide-react';
import Link from 'next/link';

// This would be fetched from your database
const courses = [
  {
    id: 1,
    title: 'Complete AWS Solutions Architect Course',
    instructor: 'Sarah Chen',
    duration: '12 hours',
    chapters: 25,
    students: 1523,
    rating: 4.8,
    price: 89,
    level: 'Advanced',
    category: 'Cloud',
    progress: 45,
  },
  {
    id: 2,
    title: 'Kubernetes for DevOps Engineers',
    instructor: 'Mike Rodriguez',
    duration: '8 hours',
    chapters: 18,
    students: 892,
    rating: 4.6,
    price: 0,
    level: 'Intermediate',
    category: 'DevOps',
    progress: 0,
  },
  {
    id: 3,
    title: 'Advanced React Patterns',
    instructor: 'Emma Thompson',
    duration: '6 hours',
    chapters: 15,
    students: 2156,
    rating: 4.9,
    price: 129,
    level: 'Advanced',
    category: 'Frontend',
    progress: 0,
  },
];

export function ClassicsView() {
  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Terminal Talks Classics
          </h1>
        </div>
        <p className="text-gray-600">
          Professional e-learning courses designed for engineers and technical
          professionals
        </p>

        {/* Tab Navigation */}
        <div className="flex gap-6 mt-6">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">
            All Courses
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            Free Courses
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            Premium Courses
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div
        className="p-8 overflow-y-auto"
        style={{ height: 'calc(100% - 180px)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        course.level === 'Advanced'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {course.level}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                      {course.category}
                    </span>
                  </div>
                  {course.price > 0 && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  by {course.instructor}
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.chapters} ch
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </span>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  {course.price === 0 ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    <span className="text-blue-600 font-semibold">
                      ${course.price}
                    </span>
                  )}
                </div>

                {/* Progress (if any) */}
                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {course.progress}% complete
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <Link
                  href={`/learn/course-${course.id}`}
                  className="w-full block text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {course.progress > 0 ? 'Continue' : 'Start'} Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
