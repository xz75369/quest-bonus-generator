
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { PlayerStats, QuestEvent } from '../types/game';
import { generateQuestEvent, generateRandomSkill } from '../utils/questGenerator';
import GameTopBar from '../components/GameTopBar';
import GameBottomBar from '../components/GameBottomBar';
import QuestCard from '../components/QuestCard';
import GameCharacter from '../components/GameCharacter';
import NextButton from '../components/NextButton';
import Background from '../components/Background';

const Index = () => {
  const { toast } = useToast();
  const [isMoving, setIsMoving] = useState(false);
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    level: 1,
    experience: 0,
    maxExperience: 1000,
    health: 620,
    maxHealth: 620,
    coins: 205,
    defense: 18,
    day: 1
  });
  
  const [quests, setQuests] = useState<QuestEvent[]>([]);
  const [isChoiceMade, setIsChoiceMade] = useState(false);
  const [choiceResult, setChoiceResult] = useState<string | null>(null);
  
  // Initialize the game with a quest
  useEffect(() => {
    const initialQuest = generateQuestEvent();
    setQuests([initialQuest]);
  }, []);
  
  // Handle character movement animation
  useEffect(() => {
    if (isMoving) {
      const timer = setTimeout(() => {
        setIsMoving(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMoving]);
  
  // Handle the next button click
  const handleNextClick = () => {
    if (isChoiceMade) {
      // If a choice was made, reset and continue
      setIsChoiceMade(false);
      setChoiceResult(null);
    }
    
    // Generate new quest
    const newQuest = generateQuestEvent();
    setQuests([...quests, newQuest]);
    
    // Apply quest bonuses to player stats
    const questBonuses = newQuest.bonusEffects;
    updatePlayerStats(questBonuses);
    
    // Increment day
    setPlayerStats(prev => ({
      ...prev,
      day: prev.day + 1
    }));
    
    // Animate character
    setIsMoving(true);
    
    // Occasionally grant a new skill
    if (Math.random() > 0.7) {
      const newSkill = generateRandomSkill();
      toast({
        title: "获得新技能！",
        description: `你获得了神通技能：${newSkill}`,
      });
    }
  };
  
  // Handle choice selection
  const handleChoiceSelected = (questIndex: number, choiceIndex: number) => {
    const quest = quests[questIndex];
    if (quest.choices && quest.choices[choiceIndex]) {
      const choice = quest.choices[choiceIndex];
      setChoiceResult(choice.result);
      updatePlayerStats(choice.bonusEffects);
      setIsChoiceMade(true);
    }
  };
  
  // Update player stats based on bonus effects
  const updatePlayerStats = (bonusEffects: any[]) => {
    setPlayerStats(prev => {
      const newStats = { ...prev };
      
      bonusEffects.forEach(bonus => {
        switch (bonus.type) {
          case 'cultivation':
          case 'experience':
            newStats.experience += bonus.value;
            // Level up if enough experience
            if (newStats.experience >= newStats.maxExperience) {
              newStats.level += 1;
              newStats.experience -= newStats.maxExperience;
              newStats.maxExperience = Math.floor(newStats.maxExperience * 1.2);
              newStats.maxHealth = Math.floor(newStats.maxHealth * 1.1);
              newStats.health = newStats.maxHealth;
              toast({
                title: "升级!",
                description: `你已经升到了${newStats.level}级！`,
              });
            }
            break;
          case 'health':
            newStats.health = Math.min(newStats.health + bonus.value, newStats.maxHealth);
            break;
          case 'defense':
            newStats.defense += bonus.value;
            break;
          case 'coins':
            newStats.coins += bonus.value;
            break;
        }
      });
      
      return newStats;
    });
  };
  
  return (
    <div className="min-h-screen relative font-sans overflow-hidden">
      <Background />
      
      <GameTopBar stats={playerStats} />
      
      <div className="pt-20 pb-40 px-4">
        <div className="max-w-md mx-auto">
          {quests.slice(-3).map((quest, index) => (
            <QuestCard 
              key={index}
              quest={quest}
              onChoiceSelected={
                index === quests.length - 1 && !isChoiceMade 
                  ? (choiceIndex) => handleChoiceSelected(index, choiceIndex)
                  : undefined
              }
            />
          ))}
          
          {choiceResult && (
            <div className="game-card">
              <p>{choiceResult}</p>
            </div>
          )}
          
          <div className="flex justify-center mt-6">
            <NextButton onClick={handleNextClick} />
          </div>
        </div>
      </div>
      
      <GameCharacter isMoving={isMoving} />
      <GameBottomBar stats={playerStats} />
    </div>
  );
};

export default Index;
