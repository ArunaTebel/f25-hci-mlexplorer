import React from 'react';
import { FiBookOpen, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import Card from '../common/Card';
import { calculateOverallProgress, getCompletedCoursesCount } from '../../utils/progressTracker';
import { courses } from '../../data/mockData';

const OverallProgress = () => {
  const overallProgress = calculateOverallProgress(courses);
  const completedCourses = getCompletedCoursesCount(courses);
  const totalCourses = courses.length;
  
  const totalLessons = courses.reduce((sum, course) => {
    return sum + (course.modules?.reduce((mSum, module) => mSum + (module.lessons?.length || 0), 0) || 0);
  }, 0);

  return (
    <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Overall Progress</h2>
        <FiTrendingUp className="h-8 w-8 text-primary-600" />
      </div>

      {/* Progress Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallProgress / 100)}`}
              className="text-primary-600 transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{overallProgress}%</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <FiBookOpen className="h-5 w-5 text-primary-600" />
            <span className="text-sm text-gray-600">Courses</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {completedCourses} / {totalCourses}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <FiCheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">Lessons</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalLessons}</div>
        </div>
      </div>
    </Card>
  );
};

export default OverallProgress;

