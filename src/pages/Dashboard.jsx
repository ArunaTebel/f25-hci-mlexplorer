import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiAward } from 'react-icons/fi';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CourseCard from '../components/course/CourseCard';
import OverallProgress from '../components/course/OverallProgress';
import BadgeCard from '../components/achievements/BadgeCard';
import { courses } from '../data/mockData';
import { getEarnedBadges } from '../utils/progressTracker';
import { BADGES, getBadgeById } from '../data/achievements';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [recentBadges, setRecentBadges] = useState([]);

  useEffect(() => {
    const updateBadges = () => {
      const badges = getEarnedBadges();
      setEarnedBadges(badges);
      
      // Get recent badges (last 3)
      const recent = badges
        .sort((a, b) => new Date(b.earnedDate) - new Date(a.earnedDate))
        .slice(0, 3)
        .map(badge => ({
          ...getBadgeById(badge.id),
          earnedDate: badge.earnedDate,
        }))
        .filter(b => b);
      
      setRecentBadges(recent);
    };
    
    updateBadges();
    const interval = setInterval(updateBadges, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const earnedBadgeIds = earnedBadges.map(b => b.id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Overall Progress */}
          <div className="lg:col-span-1">
            <OverallProgress />
          </div>

          {/* Recent Achievements */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <FiAward className="h-6 w-6 text-primary-600" />
                  <span>Recent Achievements</span>
                </h2>
                <Link
                  to="/achievements"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View All
                </Link>
              </div>
              
              {recentBadges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentBadges.map((badge) => (
                    <BadgeCard
                      key={badge.id}
                      badge={badge}
                      isEarned={true}
                      earnedDate={badge.earnedDate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FiAward className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No achievements yet. Start learning to earn badges!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">My Courses</h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <FiFilter className="h-5 w-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No courses found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

