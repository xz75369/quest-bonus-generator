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
        
        {/* Ground - keeping only this element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-game-ground"></div>
      </div>
    </div>
  );
};

export default Background;
