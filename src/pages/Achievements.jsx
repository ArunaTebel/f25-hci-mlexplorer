import React, { useState, useEffect } from 'react';
import { FiFilter, FiAward } from 'react-icons/fi';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BadgeCard from '../components/achievements/BadgeCard';
import Card from '../components/common/Card';
import { BADGES } from '../data/achievements';
import { getEarnedBadges } from '../utils/progressTracker';

const Achievements = () => {
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateBadges = () => {
      const badges = getEarnedBadges();
      setEarnedBadges(badges);
    };
    
    updateBadges();
    const interval = setInterval(updateBadges, 1000);
    return () => clearInterval(interval);
  }, []);

  const earnedBadgeIds = earnedBadges.map(b => b.id);
  const earnedBadgeMap = new Map(earnedBadges.map(b => [b.id, b.earnedDate]));

  const categories = [
    { id: 'all', name: 'All Badges' },
    { id: 'course_completion', name: 'Course Completion' },
    { id: 'quiz_mastery', name: 'Quiz Mastery' },
    { id: 'lab_excellence', name: 'Lab Excellence' },
    { id: 'milestone', name: 'Milestones' },
    { id: 'streak', name: 'Streaks' },
    { id: 'special', name: 'Special' },
  ];

  const filteredBadges = BADGES.filter(badge => {
    const matchesCategory = selectedCategory === 'all' || badge.category === selectedCategory;
    const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const earnedCount = earnedBadgeIds.length;
  const totalCount = BADGES.length;
  const completionPercentage = Math.round((earnedCount / totalCount) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
          <p className="text-gray-600">Track your progress and unlock badges</p>
        </div>

        {/* Statistics Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{earnedCount}</div>
              <div className="text-gray-700">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{totalCount}</div>
              <div className="text-gray-700">Total Badges</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{completionPercentage}%</div>
              <div className="text-gray-700">Collection Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <FiAward className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Badge Grid */}
        {filteredBadges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBadges.map((badge) => {
              const isEarned = earnedBadgeIds.includes(badge.id);
              const earnedDate = earnedBadgeMap.get(badge.id);

              return (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  isEarned={isEarned}
                  earnedDate={earnedDate}
                />
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <FiAward className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Badges Found</h2>
            <p className="text-gray-600">Try adjusting your filters or search query.</p>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Achievements;

