import { BonusEffect, QuestEvent, QuestChoice } from "../types/game";

// Quest Templates
const questTemplates = [
  "从{location}中出来，到达一处{destination}，{feeling}的气息让你心情舒畅，就从这里开始历练之旅吧！",
  "你在{destination}中偶遇一位{character}，他告诉你关于{subject}的秘密。",
  "经过一天的跋涉，你来到了{destination}，这里{description}。",
  "修炼途中，你感受到一股{element}之力在周围流动，你决定尝试引导它。",
  "夜晚降临，你在{location}安营扎寨，突然听到{sound}。",
  "你在{location}发现了一个古老的{object}，上面刻着奇怪的符文。",
  "一位{character}向你发起挑战，你{action}并获得了胜利。",
  "穿过{location}时，你遇见了{character}，他向你传授了{subject}的心得。"
];

// Choice templates
const choiceTemplates = [
  "前方出现三条小路，你决定选择哪一条？",
  "遇到一位神秘商人，他提供了三种物品，你会选择哪一个？",
  "修炼到关键时刻，你感受到三种不同的灵气流向，你会引导哪一种？",
  "一位前辈提出三种修炼方式，你会选择哪一种？",
  "你找到一本古籍，上面记载了三种功法，你会修炼哪一种？",
  "村庄中有三位奇人，各有所长，你会向谁请教？",
  "山洞中有三个石室，各有不同的气息，你会进入哪一个？",
  "遭遇危机，你有三种应对方式，你会选择哪一种？"
];

const locations = [
  "山河幻境", "古老洞穴", "云雾林地", "仙人峡谷", "幽暗森林", 
  "碧水湖泊", "高耸山峰", "荒芜之地", "神秘遗迹"
];

const destinations = [
  "山间野林", "清幽溪流", "古老神殿", "修炼圣地", "灵气充裕的山洞",
  "远古遗迹", "风景绝美的山顶", "隐秘的花园", "神秘的洞穴"
];

const characters = [
  "老者", "武林高手", "神秘修士", "年轻侠客", "仙人",
  "受伤的旅人", "流浪的商人", "隐居的大师", "年轻的弟子"
];

const subjects = [
  "修炼之道", "内功心法", "剑法技巧", "灵气运转", "古老传说",
  "丹药炼制", "武功秘籍", "秘境入口", "功法要诀"
];

const descriptions = [
  "充满了灵气", "十分安静祥和", "有着奇特的景象", "生长着稀有的植物",
  "隐藏着未知的力量", "有古老的传说", "空气清新宜人", "景色令人心旷神怡"
];

const elements = [
  "火", "水", "风", "土", "雷", "冰", "木", "金", "暗", "光"
];

const feelings = [
  "自由", "清新", "神秘", "平静", "活力", "温暖", "沉稳", "轻盈"
];

const sounds = [
  "奇怪的声音", "野兽的咆哮", "流水的声音", "风吹树叶的沙沙声",
  "低沉的吟唱", "石头滚动的声音", "鸟儿的歌唱", "远处的钟声"
];

const objects = [
  "石碑", "玉简", "古剑", "卷轴", "法器", "丹炉", "玉佩", "铜镜", "木盒"
];

const actions = [
  "沉着应对", "使出全力", "灵活闪避", "智取对手", "冷静分析",
  "出其不意", "以柔克刚", "勇往直前", "精准出击"
];

const bonusTypes: Array<BonusEffect['type']> = [
  'cultivation', 'health', 'defense', 'experience', 'coins'
];

const bonusIcons: Record<BonusEffect['type'], string> = {
  cultivation: '🧘',
  health: '❤️',
  defense: '🛡️',
  experience: '📚',
  coins: '💰',
};

// Choice descriptions
const choiceDescriptions = [
  ["向左走，那里似乎有水声", "向右走，那里有奇怪的光芒", "直走，保持在主路上"],
  ["购买神秘药水", "选择古老武器", "挑选灵气石"],
  ["引导火属性灵气", "吸收水属性灵气", "融合风属性灵气"],
  ["苦修增强体魄", "静心凝聚神识", "实战提升技巧"],
  ["学习攻击功法", "研习防御心法", "掌握辅助神通"],
  ["向武道大师请教", "拜访丹药炼制师", "寻找隐世奇人"],
  ["进入充满火热气息的石室", "选择水汽弥漫的石室", "前往清风徐来的石室"],
  ["正面应对", "智取化解", "暂时避让"]
];

// Result templates
const resultTemplates = [
  "你的选择让你{description}，获得了意想不到的收获。",
  "这个决定{description}，你感到修为有所增长。",
  "你的判断{description}，这次经历让你成长不少。",
  "选择过后，你{description}，收获了宝贵的经验。",
  "这次决定让你{description}，获得了难得的机遇。"
];

// Function to replace template variables with random values
const fillTemplate = (template: string): string => {
  return template
    .replace('{location}', locations[Math.floor(Math.random() * locations.length)])
    .replace('{destination}', destinations[Math.floor(Math.random() * destinations.length)])
    .replace('{character}', characters[Math.floor(Math.random() * characters.length)])
    .replace('{subject}', subjects[Math.floor(Math.random() * subjects.length)])
    .replace('{description}', descriptions[Math.floor(Math.random() * descriptions.length)])
    .replace('{element}', elements[Math.floor(Math.random() * elements.length)])
    .replace('{feeling}', feelings[Math.floor(Math.random() * feelings.length)])
    .replace('{sound}', sounds[Math.floor(Math.random() * sounds.length)])
    .replace('{object}', objects[Math.floor(Math.random() * objects.length)])
    .replace('{action}', actions[Math.floor(Math.random() * actions.length)]);
};

// Generate random bonus effect
const generateRandomBonus = (): BonusEffect => {
  const type = bonusTypes[Math.floor(Math.random() * bonusTypes.length)];
  const value = Math.floor(Math.random() * 100) + 50; // Random value between 50-150
  
  const descriptions: Record<BonusEffect['type'], string> = {
    cultivation: `修为 +${value}`,
    health: `生命 +${value}`,
    defense: `防御 +${value}`,
    experience: `经验 +${value}`,
    coins: `金币 +${value}`,
  };

  return {
    type,
    value,
    description: descriptions[type],
    icon: bonusIcons[type],
  };
};

// Generate more significant bonuses for choices
const generateChoiceBonus = (): BonusEffect[] => {
  const count = Math.floor(Math.random() * 2) + 1;  // 1-2 bonuses
  const result: BonusEffect[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = bonusTypes[Math.floor(Math.random() * bonusTypes.length)];
    // Higher values for choices (100-200)
    const value = Math.floor(Math.random() * 100) + 100;
    
    const descriptions: Record<BonusEffect['type'], string> = {
      cultivation: `修为 +${value}`,
      health: `生命 +${value}`,
      defense: `防御 +${value}`,
      experience: `经验 +${value}`,
      coins: `金币 +${value}`,
    };

    result.push({
      type,
      value,
      description: descriptions[type],
      icon: bonusIcons[type],
    });
  }
  
  return result;
};

// Generate a new quest event
export const generateQuestEvent = (): QuestEvent => {
  // Increase the chance of choice quests to 70%
  const isChoiceQuest = Math.random() < 0.7;
  
  if (isChoiceQuest) {
    const choiceIndex = Math.floor(Math.random() * choiceTemplates.length);
    const text = choiceTemplates[choiceIndex];
    
    // Generate 3 choices
    const choices: QuestChoice[] = [];
    const choiceTexts = choiceDescriptions[choiceIndex];
    
    for (let i = 0; i < 3; i++) {
      const resultTemplate = resultTemplates[Math.floor(Math.random() * resultTemplates.length)];
      const result = resultTemplate.replace('{description}', descriptions[Math.floor(Math.random() * descriptions.length)]);
      
      choices.push({
        text: choiceTexts[i],
        result: result,
        bonusEffects: generateChoiceBonus()
      });
    }
    
    return {
      text,
      bonusEffects: [],
      choices: choices
    };
  } else {
    const template = questTemplates[Math.floor(Math.random() * questTemplates.length)];
    const text = fillTemplate(template);
    
    // Generate 1-3 random bonus effects
    const numBonuses = Math.floor(Math.random() * 3) + 1;
    const bonusEffects: BonusEffect[] = [];
    
    for (let i = 0; i < numBonuses; i++) {
      bonusEffects.push(generateRandomBonus());
    }
    
    return {
      text,
      bonusEffects,
      choices: undefined
    };
  }
};

// Generate a random skill
export const generateRandomSkill = (): string => {
  const skillTypes = [
    "神通", "秘术", "剑法", "心法", "功法", "拳法", "步法", "指法", "掌法"
  ];
  
  const skillAttributes = [
    "回春", "破魔", "御风", "引雷", "冰封", "炎爆", "御剑", "洞察", "隐身",
    "聚气", "明心", "通神", "慑魂", "化影", "念力", "控水", "驭火"
  ];
  
  const skillSuffixes = [
    "术", "诀", "法", "心经", "秘典", "要解", "真经", "秘法", "心法"
  ];
  
  const type = skillTypes[Math.floor(Math.random() * skillTypes.length)];
  const attribute = skillAttributes[Math.floor(Math.random() * skillAttributes.length)];
  const suffix = skillSuffixes[Math.floor(Math.random() * skillSuffixes.length)];
  
  return `${attribute}${type}${suffix}`;
};
