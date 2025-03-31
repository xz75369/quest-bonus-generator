
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1000')",
          backgroundBlendMode: "soft-light"
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-black/40"></div>
        
        {/* Mountains with slightly adjusted positioning */}
        <div className="absolute bottom-36 left-0 w-full h-64 bg-green-800 opacity-30 rounded-t-full transform -skew-y-6"></div>
        <div className="absolute bottom-40 left-1/4 w-1/2 h-64 bg-green-900 opacity-30 rounded-t-full transform skew-y-3"></div>
        <div className="absolute bottom-36 right-20 w-64 h-64 bg-green-700 opacity-30 rounded-t-full"></div>
        
        {/* Trees and Bushes */}
        <div className="absolute bottom-28 left-10 w-24 h-32 bg-green-800 opacity-60 rounded-full"></div>
        <div className="absolute bottom-32 left-14 w-16 h-24 bg-green-900 opacity-60 rounded-full"></div>
        <div className="absolute bottom-28 right-20 w-32 h-40 bg-green-800 opacity-60 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-green-900 opacity-60 rounded-full"></div>
        
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-green-950"></div>
      </div>
    </div>
  );
};

export default Background;
