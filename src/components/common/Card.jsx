import React from 'react';

const Card = ({ children, className = '', hover = false, onClick }) => {
  const baseStyles = 'bg-white rounded-lg shadow-md p-6';
  const hoverStyles = hover ? 'transition-transform duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

