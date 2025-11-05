import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiAward, FiBookOpen } from 'react-icons/fi';
import { getEarnedBadges, getStatistics, calculateOverallProgress } from '../../utils/progressTracker';
import { courses } from '../../data/mockData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateStats = () => {
      const badges = getEarnedBadges();
      setBadgeCount(badges.length);
      const progress = calculateOverallProgress(courses);
      setOverallProgress(progress);
    };
    
    updateStats();
    // Update stats every second to reflect real-time changes
    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <FiBookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">ML Explorer</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/achievements" className="text-gray-700 hover:text-primary-600 transition-colors flex items-center space-x-1">
              <FiAward className="h-5 w-5" />
              <span>Achievements</span>
              {badgeCount > 0 && (
                <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">
                  {badgeCount}
                </span>
              )}
            </Link>
            <Link to="/labs" className="text-gray-700 hover:text-primary-600 transition-colors">
              Labs
            </Link>
            <Link to="/certificates" className="text-gray-700 hover:text-primary-600 transition-colors">
              Certificates
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300">
              <div className="text-sm text-gray-600">Overall Progress</div>
              <div className="w-24">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">{overallProgress}%</span>
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-primary-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/achievements"
                className="text-gray-700 hover:text-primary-600 transition-colors px-2 py-1 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Achievements</span>
                {badgeCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">
                    {badgeCount}
                  </span>
                )}
              </Link>
              <Link
                to="/labs"
                className="text-gray-700 hover:text-primary-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Labs
              </Link>
              <Link
                to="/certificates"
                className="text-gray-700 hover:text-primary-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Certificates
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors px-2 py-1 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors font-medium block text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

