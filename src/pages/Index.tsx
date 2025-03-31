
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
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
  
  const latestQuestRef = useRef<HTMLDivElement>(null);
  const choiceResultRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initialQuest = generateQuestEvent();
    setQuests([initialQuest]);
  }, []);
  
  useEffect(() => {
    if (isMoving) {
      const timer = setTimeout(() => {
        setIsMoving(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isMoving]);
  
  // Scroll to latest quest when quests are updated
  useEffect(() => {
    if (latestQuestRef.current) {
      latestQuestRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [quests]);
  
  // Scroll to choice result when it appears
  useEffect(() => {
    if (choiceResult && choiceResultRef.current) {
      choiceResultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [choiceResult]);
  
  const handleNextClick = () => {
    if (isChoiceMade) {
      setIsChoiceMade(false);
      setChoiceResult(null);
    }
    
    const newQuest = generateQuestEvent();
    setQuests([...quests, newQuest]);
    
    const questBonuses = newQuest.bonusEffects;
    updatePlayerStats(questBonuses);
    
    setPlayerStats(prev => ({
      ...prev,
      day: prev.day + 1
    }));
    
    setIsMoving(true);
    
    if (Math.random() > 0.7) {
      const newSkill = generateRandomSkill();
      toast({
        title: "获得新技能！",
        description: `你获得了神通技能：${newSkill}`,
      });
    }
  };
  
  const handleChoiceSelected = (questIndex: number, choiceIndex: number) => {
    const quest = quests[questIndex];
    if (quest.choices && quest.choices[choiceIndex]) {
      const choice = quest.choices[choiceIndex];
      setChoiceResult(choice.result);
      
      if (choice.bonusEffects.length > 0) {
        const bonusDescriptions = choice.bonusEffects.map(bonus => 
          `${bonus.icon} ${bonus.description}`
        ).join(', ');
        
        toast({
          title: "获得增益效果！",
          description: bonusDescriptions,
        });
      }
      
      updatePlayerStats(choice.bonusEffects);
      setIsChoiceMade(true);
    }
  };
  
  const updatePlayerStats = (bonusEffects: any[]) => {
    setPlayerStats(prev => {
      const newStats = { ...prev };
      
      bonusEffects.forEach(bonus => {
        switch (bonus.type) {
          case 'cultivation':
          case 'experience':
            newStats.experience += bonus.value;
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
          {quests.slice(-3).map((quest, index, displayedQuests) => (
            <div 
              key={index}
              ref={index === displayedQuests.length - 1 ? latestQuestRef : null}
            >
              <QuestCard 
                quest={quest}
                onChoiceSelected={
                  index === displayedQuests.length - 1 && !isChoiceMade 
                    ? (choiceIndex) => handleChoiceSelected(index + quests.length - displayedQuests.length, choiceIndex)
                    : undefined
                }
              />
            </div>
          ))}
          
          {choiceResult && (
            <div className="game-card" ref={choiceResultRef}>
              <p>{choiceResult}</p>
            </div>
          )}
        </div>
      </div>
      
      <NextButton onClick={handleNextClick} />
      <GameCharacter isMoving={isMoving} />
      <GameBottomBar stats={playerStats} />
    </div>
  );
};

export default Index;
