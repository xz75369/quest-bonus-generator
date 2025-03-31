
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-green-100 to-yellow-100">
        {/* Mountains */}
        <div className="absolute bottom-40 left-0 w-full h-64 bg-green-600 opacity-30 rounded-t-full transform -skew-y-6"></div>
        <div className="absolute bottom-44 left-1/4 w-1/2 h-64 bg-green-700 opacity-30 rounded-t-full transform skew-y-3"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-green-500 opacity-30 rounded-t-full"></div>
        
        {/* Trees and Bushes */}
        <div className="absolute bottom-32 left-10 w-24 h-32 bg-green-600 opacity-60 rounded-full"></div>
        <div className="absolute bottom-36 left-14 w-16 h-24 bg-green-700 opacity-60 rounded-full"></div>
        <div className="absolute bottom-32 right-20 w-32 h-40 bg-green-600 opacity-60 rounded-full"></div>
        <div className="absolute bottom-44 right-10 w-20 h-20 bg-green-700 opacity-60 rounded-full"></div>
        
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-game-ground"></div>
        
        {/* Clouds */}
        <div className="absolute top-10 left-10 w-32 h-16 bg-white opacity-60 rounded-full"></div>
        <div className="absolute top-16 left-20 w-40 h-20 bg-white opacity-50 rounded-full"></div>
        <div className="absolute top-12 right-20 w-36 h-16 bg-white opacity-60 rounded-full"></div>
        <div className="absolute top-20 right-30 w-32 h-12 bg-white opacity-50 rounded-full"></div>
      </div>
    </div>
  );
};

export default Background;
