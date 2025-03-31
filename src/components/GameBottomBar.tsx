
import React from 'react';
import { PlayerStats } from '../types/game';

interface GameBottomBarProps {
  stats: PlayerStats;
}

const GameBottomBar: React.FC<GameBottomBarProps> = ({ stats }) => {
  const healthPercentage = (stats.health / stats.maxHealth) * 100;
  const expPercentage = (stats.experience / stats.maxExperience) * 100;
  
  return (
    <div className="fixed bottom-0 w-full bg-game-ground py-3 px-4 rounded-t-xl">
      <div className="flex items-center mb-2">
        <div className="flex items-center bg-green-700 bg-opacity-80 rounded-md px-2 py-1 text-white text-sm mr-2">
          <span className="mr-1">经验</span>
          <span className="font-bold">{stats.level}级</span>
        </div>
        
        <div className="flex-1 relative h-6 bg-red-900 bg-opacity-30 overflow-hidden rounded-full">
          <div className="h-full bg-red-500 flex items-center px-2 text-white text-xs" style={{ width: `${healthPercentage}%` }}>
            <div className="flex items-center">
              <span className="animate-pulse mr-1">❤️</span>
              <span className="font-bold">{stats.health}/{stats.maxHealth}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between ml-2 space-x-2">
          <div className="bg-gray-200 rounded-md px-2 py-1 flex items-center">
            <span className="text-game-resource mr-1">🏆</span>
            <span className="font-bold text-game-resource">{stats.coins}</span>
          </div>
          <div className="bg-blue-800 bg-opacity-70 rounded-md px-2 py-1 flex items-center text-white">
            <span className="mr-1">🛡️</span>
            <span className="font-bold">{stats.defense}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-700 bg-opacity-50 rounded-lg py-2 px-4 mb-2">
        <div className="text-center font-bold text-yellow-900">第{stats.day}天</div>
      </div>
    </div>
  );
};

export default GameBottomBar;
