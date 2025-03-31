
export interface PlayerStats {
  level: number;
  experience: number;
  maxExperience: number;
  health: number;
  maxHealth: number;
  coins: number;
  defense: number;
  day: number;
}

export interface BonusEffect {
  type: 'cultivation' | 'health' | 'defense' | 'experience' | 'coins';
  value: number;
  description: string;
  icon: string;
}

export interface QuestEvent {
  text: string;
  bonusEffects: BonusEffect[];
  choices?: QuestChoice[];
}

export interface QuestChoice {
  text: string;
  result: string;
  bonusEffects: BonusEffect[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
}
