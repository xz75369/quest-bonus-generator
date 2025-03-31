
import React from 'react';

interface GameCharacterProps {
  isMoving: boolean;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ isMoving }) => {
  return (
    <div className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 ${isMoving ? 'animate-float' : ''}`}>
      <img 
        src="/lovable-uploads/d2ba2c0f-906e-4280-bfb4-46cf00d63772.png" 
        alt="Game Character" 
        className="h-32 object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://via.placeholder.com/80x120?text=Character";
        }}
      />
    </div>
  );
};

export default GameCharacter;
