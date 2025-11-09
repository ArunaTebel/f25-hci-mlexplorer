import React from 'react';
import { FiLock, FiUnlock } from 'react-icons/fi';

const BadgeCard = ({ badge, isEarned, earnedDate, onClick }) => {
  const rarityColors = {
    common: 'border-gray-300 bg-gray-50',
    rare: 'border-blue-300 bg-blue-50',
    epic: 'border-purple-300 bg-purple-50',
    legendary: 'border-yellow-400 bg-yellow-50',
  };

  const rarityLabels = {
    common: 'Common',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
  };

  return (
    <div
      className={`relative border-2 rounded-lg p-4 transition-all duration-200 ${
        isEarned
          ? `${rarityColors[badge.rarity] || rarityColors.common} cursor-pointer hover:shadow-lg hover:-translate-y-1`
          : 'border-gray-200 bg-gray-100 opacity-60'
      }`}
      onClick={onClick}
    >
      {/* Lock/Unlock Icon */}
      <div className="absolute top-2 right-2">
        {isEarned ? (
          <FiUnlock className="h-5 w-5 text-green-600" />
        ) : (
          <FiLock className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {/* Badge Icon */}
      <div className="text-6xl mb-3 text-center">{badge.icon}</div>

      {/* Badge Info */}
      <div className="text-center">
        <h3 className={`font-bold text-lg mb-1 ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>
          {badge.name}
        </h3>
        <p className={`text-sm mb-2 ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
          {badge.description}
        </p>
        
        {/* Rarity Badge */}
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
            isEarned
              ? badge.rarity === 'legendary'
                ? 'bg-yellow-200 text-yellow-800'
                : badge.rarity === 'epic'
                ? 'bg-purple-200 text-purple-800'
                : badge.rarity === 'rare'
                ? 'bg-blue-200 text-blue-800'
                : 'bg-gray-200 text-gray-800'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          {rarityLabels[badge.rarity] || 'Common'}
        </span>

        {/* Earned Date */}
        {isEarned && earnedDate && (
          <p className="text-xs text-gray-500 mt-2">
            Earned: {new Date(earnedDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default BadgeCard;

