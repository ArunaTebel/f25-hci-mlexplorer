import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiUser, FiTrendingUp } from 'react-icons/fi';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { calculateCourseProgress } from '../../utils/progressTracker';

const CourseCard = ({ course }) => {
  const totalLessons = course.modules?.reduce((sum, module) => sum + (module.lessons?.length || 0), 0) || 0;
  const progress = calculateCourseProgress(course.id, totalLessons);
  
  const levelColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };

  return (
    <Card hover className="h-full flex flex-col">
      <Link to={`/course/${course.id}`} className="flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${levelColors[course.level] || levelColors.Beginner}`}>
              {course.level}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{course.description}</p>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <FiUser className="h-4 w-4" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiClock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Progress */}
          {progress > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-gray-700">{progress}%</span>
              </div>
              <ProgressBar progress={progress} size="sm" />
            </div>
          )}

          {/* Action */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'}
            </span>
            <div className="flex items-center space-x-1 text-primary-600 font-medium">
              <span>{progress > 0 ? 'Continue' : 'Start'}</span>
              <FiTrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CourseCard;

