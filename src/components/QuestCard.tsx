
import React from 'react';
import { QuestEvent, BonusEffect } from '../types/game';

interface QuestCardProps {
  quest: QuestEvent;
  onChoiceSelected?: (index: number) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onChoiceSelected }) => {
  return (
    <div className="game-card mb-4">
      <p className="text-lg mb-4">{quest.text}</p>
      
      {quest.bonusEffects.length > 0 && (
        <div className="flex flex-wrap items-center mt-2 mb-2">
          {quest.bonusEffects.map((bonus, index) => (
            <div key={index} className="mr-2 mb-2 bg-game-ui-border bg-opacity-30 rounded-md px-2 py-1 text-game-text flex items-center">
              <span className="mr-1">{bonus.icon}</span>
              <span className="font-bold text-green-700">{bonus.description}</span>
            </div>
          ))}
        </div>
      )}
      
      {quest.choices && (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {quest.choices.map((choice, index) => (
            <button
              key={index}
              className="text-center bg-game-ui-bg border-2 border-game-ui-border hover:bg-game-ui-border hover:bg-opacity-20 rounded-lg px-4 py-6 transition-colors flex flex-col items-center"
              onClick={() => onChoiceSelected && onChoiceSelected(index)}
            >
              <div className="text-lg font-medium mb-2">{choice.text}</div>
              {choice.bonusEffects.length > 0 && (
                <div className="flex flex-wrap justify-center">
                  {choice.bonusEffects.map((bonus, bIndex) => (
                    <div key={bIndex} className="mx-1 my-1 bg-game-ui-border bg-opacity-30 rounded-md px-2 py-1 text-game-text flex items-center">
                      <span className="mr-1">{bonus.icon}</span>
                      <span className="font-bold text-green-700">{bonus.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestCard;
