
import React from 'react';
import { PlayerStats } from '../types/game';

interface GameTopBarProps {
  stats: PlayerStats;
}

const GameTopBar: React.FC<GameTopBarProps> = ({ stats }) => {
  return (
    <div className="fixed top-0 w-full px-4 py-2 z-10">
      <div className="flex justify-between items-center">
        <button className="w-10 h-10 bg-gray-600 bg-opacity-70 rounded-full flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        <div className="flex-1 mx-4">
          <div className="bg-gray-700 bg-opacity-70 rounded-full px-2 py-1">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-bold">⚔️</span>
                </div>
                <span className="ml-1 text-white text-sm">1</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-bold">👍</span>
                </div>
                <span className="ml-1 text-white text-sm">1</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-yellow-600 rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-bold">?</span>
                </div>
                <span className="ml-1 text-white text-sm">3</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-bold">⚒️</span>
                </div>
                <span className="ml-1 text-white text-sm">9</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-xs font-bold">💜</span>
                </div>
                <span className="ml-1 text-white text-sm">25</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="w-10 h-10 bg-gray-400 bg-opacity-70 rounded-full flex items-center justify-center text-white">
            <span className="text-lg">⋯</span>
          </button>
          <button className="w-10 h-10 bg-gray-400 bg-opacity-70 rounded-full flex items-center justify-center text-white">
            <span className="text-lg">⊙</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameTopBar;
