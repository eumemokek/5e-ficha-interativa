
export enum Attribute {
  STR = 'Força',
  DEX = 'Destreza',
  CON = 'Constituição',
  INT = 'Inteligência',
  WIS = 'Sabedoria',
  CHA = 'Carisma',
}

export enum SkillName {
  Acrobatics = 'Acrobacia',
  AnimalHandling = 'Lidar com Animais',
  Arcana = 'Arcanismo',
  Athletics = 'Atletismo',
  Deception = 'Enganação',
  History = 'História',
  Insight = 'Intuição',
  Intimidation = 'Intimidação',
  Investigation = 'Investigação',
  Medicine = 'Medicina',
  Nature = 'Natureza',
  Perception = 'Percepção',
  Performance = 'Atuação',
  Persuasion = 'Persuasão',
  Religion = 'Religião',
  SleightOfHand = 'Prestidigitação',
  Stealth = 'Furtividade',
  Survival = 'Sobrevivência',
}

export interface Skill {
  name: SkillName;
  attribute: Attribute;
  proficient: boolean;
  expertise: boolean;
}

export interface Item {
  id: string;
  name: string;
  // Tipos expandidos para slots específicos
  type: 'Arma' | 'Armadura' | 'Escudo' | 'Munição' | 'Foco' | 'Item' | 'Ferramenta' | 'Capacete' | 'Botas' | 'Luvas' | 'Anel' | 'Amuleto' | 'Capa' | 'Roupas';
  weight: number;
  quantity: number;
  description: string;
  equipped: boolean;
  damage?: string;
  damageType?: string;
  properties?: string[];
  acBonus?: number; 
  isMagic?: boolean;
  favorite?: boolean;
  imageUrl?: string;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  prepared: boolean;
  classes: string[]; 
  origin?: string;
}

export interface FeatureModifier {
    type: 'bonus' | 'set' | 'formula' | 'advantage' | 'proficiency';
    target: 'ac' | 'speed' | 'initiative' | 'hp_per_level' | 'attribute' | 'passive_perception' | 'saving_throw_all' | 'skill' | 'armor_proficiency' | 'weapon_proficiency';
    value?: number | string;
    stat?: Attribute;
    subtarget?: string;
    condition?: 'unarmored' | 'no_shield' | 'armored' | 'heavy_armor';
}

export interface Feature {
  id: string;
  name: string;
  source: 'Raça' | 'Classe' | 'Antecedente' | 'Talento' | 'Outro';
  description: string;
  active: boolean;
  origin?: string;
  level?: number;
  modifiers?: FeatureModifier[];
}

export interface SessionLog {
    id: string;
    title: string;
    date: string;
    content: string;
    imageUrl?: string;
}

export interface InfoCard {
    id: string;
    title: string;
    type: 'NPC' | 'Local' | 'Pista' | 'Outro';
    content: string;
    imageUrl?: string;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  imageUrl?: string;
  background: string;
  alignment: string;
  xp: number;
  
  attributes: Record<Attribute, number>;
  savingThrows: Record<Attribute, boolean>;
  skills: Skill[];
  
  hp: {
    current: number;
    max: number;
    temp: number;
    hitDice: string;
    hitDiceUsed: number;
  };
  
  deathSaves: {
    success: number;
    failures: number;
  };

  inventory: Item[];
  spells: Spell[];
  features: Feature[];
  
  spellSlotsUsed: Record<number, number>; 
  resourceUsage: Record<string, number>;
  
  currency: {
    cp: number;
    sp: number;
    gp: number;
  };

  lore: {
    backstory: string;
    sessions: SessionLog[];
    notes: InfoCard[];
    personality: {
        traits: string;
        ideals: string;
        bonds: string;
        flaws: string;
    };
  };
}

export interface ClassDefinition {
  name: string;
  hitDie: string;
  primaryAbility: Attribute[];
  savingThrows: Attribute[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skillsCount: number;
    skillsList: SkillName[];
  };
  spellcasting?: {
    ability: Attribute;
    type: 'Known' | 'Prepared';
    access: 'ALL' | 'LEARNED';
    cantripsKnown: Record<number, number>;
    spellsKnownFormula?: (level: number) => number;
    preparedFormula?: (level: number, mod: number) => number;
    slotsTable: Record<number, number[]>; 
  };
  resources?: {
    name: string;
    reset: 'Curto' | 'Longo';
    baseAmount: number;
    levelScaling?: Record<number, number> | ((level: number) => number);
  }[];
  features: {
    [level: number]: { name: string; description: string; modifiers?: FeatureModifier[] }[];
  };
}

export interface FeatureOption {
    name: string;
    description: string;
    spellsAdded?: string[];
    featuresAdded?: { name: string; description: string; modifiers?: FeatureModifier[]; level?: number }[];
    skillsAdded?: string[];
}

export interface FeatureDefinition {
    key: string; 
    selectionLimit?: number;
    options: FeatureOption[];
}

export interface RaceDefinition {
    name: string;
    speed: number;
    size: string;
    abilityBonuses: Partial<Record<Attribute, number>>;
    features: { name: string; description: string; modifiers?: FeatureModifier[] }[];
}

export interface BackgroundDefinition {
    name: string;
    skills: SkillName[];
    equipment: string[];
    tools?: string[];
    feature: { name: string; description: string };
}
