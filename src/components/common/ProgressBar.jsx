import React from 'react';

const ProgressBar = ({ 
  progress, 
  label, 
  showPercentage = true, 
  size = 'md',
  color = 'primary',
  className = '' 
}) => {
  const progressValue = Math.min(Math.max(progress, 0), 100);
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  const colors = {
    primary: 'bg-primary-600',
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
  };
  
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">{progressValue}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${colors[color]} transition-all duration-500 ease-out ${sizes[size]}`}
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

