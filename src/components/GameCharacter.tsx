
import React from 'react';

interface GameCharacterProps {
  isMoving: boolean;
}

const GameCharacter: React.FC<GameCharacterProps> = ({ isMoving }) => {
  return (
    <div className={`absolute bottom-28 left-1/2 transform -translate-x-1/2 ${isMoving ? 'animate-float' : ''}`}>
      <img 
        src="https://images.unsplash.com/photo-1501286353178-1ec881214838?q=80&w=400" 
        alt="Game Character" 
        className="h-40 object-contain drop-shadow-xl"
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
