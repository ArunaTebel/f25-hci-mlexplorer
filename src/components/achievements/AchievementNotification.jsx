import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import BadgeCard from './BadgeCard';

const AchievementNotification = ({ badge, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-2xl border-2 border-yellow-400 p-6 max-w-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Achievement Unlocked! 🎉</h3>
            <p className="text-sm text-gray-600">You've earned a new badge</p>
          </div>
          <button
            onClick={() => {
              setShow(false);
              setTimeout(onClose, 300);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="text-center">
            <div className="text-6xl mb-2">{badge.icon}</div>
            <h4 className="font-bold text-lg text-gray-900 mb-1">{badge.name}</h4>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;

