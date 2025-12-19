
import { Character, Attribute, SkillName } from './types';
import { generateId } from './utils';

export const initialCharacter: Character = {
  id: generateId(),
  name: "Kriv",
  race: "Genasi do Fogo", 
  class: "Mago (Trovador da Lâmina)", 
  level: 3,
  imageUrl: "https://picsum.photos/id/237/200/200",
  background: "Sábio", 
  alignment: "Neutro e Bom",
  xp: 900,
  attributes: {
    [Attribute.STR]: 10,
    [Attribute.DEX]: 16,
    [Attribute.CON]: 14,
    [Attribute.INT]: 16,
    [Attribute.WIS]: 12,
    [Attribute.CHA]: 8,
  },
  savingThrows: {
    [Attribute.STR]: false, [Attribute.DEX]: false, [Attribute.CON]: false, [Attribute.INT]: true, [Attribute.WIS]: true, [Attribute.CHA]: false,
  },
  skills: [
    { name: SkillName.Arcana, attribute: Attribute.INT, proficient: true, expertise: false },
    { name: SkillName.History, attribute: Attribute.INT, proficient: true, expertise: false },
    { name: SkillName.Investigation, attribute: Attribute.INT, proficient: false, expertise: false },
    { name: SkillName.Nature, attribute: Attribute.INT, proficient: false, expertise: false },
    { name: SkillName.Religion, attribute: Attribute.INT, proficient: false, expertise: false },
    { name: SkillName.Athletics, attribute: Attribute.STR, proficient: false, expertise: false },
    { name: SkillName.Acrobatics, attribute: Attribute.DEX, proficient: true, expertise: false }, 
    { name: SkillName.SleightOfHand, attribute: Attribute.DEX, proficient: false, expertise: false },
    { name: SkillName.Stealth, attribute: Attribute.DEX, proficient: false, expertise: false },
    { name: SkillName.AnimalHandling, attribute: Attribute.WIS, proficient: false, expertise: false },
    { name: SkillName.Insight, attribute: Attribute.WIS, proficient: false, expertise: false },
    { name: SkillName.Medicine, attribute: Attribute.WIS, proficient: false, expertise: false },
    { name: SkillName.Perception, attribute: Attribute.WIS, proficient: true, expertise: false }, 
    { name: SkillName.Survival, attribute: Attribute.WIS, proficient: false, expertise: false },
    { name: SkillName.Deception, attribute: Attribute.CHA, proficient: false, expertise: false },
    { name: SkillName.Intimidation, attribute: Attribute.CHA, proficient: false, expertise: false },
    { name: SkillName.Performance, attribute: Attribute.CHA, proficient: true, expertise: false }, 
    { name: SkillName.Persuasion, attribute: Attribute.CHA, proficient: false, expertise: false },
  ],
  hp: {
    current: 20, max: 20, temp: 0, hitDice: "3d6", hitDiceUsed: 0
  },
  deathSaves: { success: 0, failures: 0 },
  inventory: [
    { 
        id: '1', name: 'Rapieira', type: 'Arma', weight: 1, quantity: 1, equipped: true, 
        damage: '1d8', damageType: 'Perfurante', properties: ['Acuidade'], 
        description: 'Uma lâmina esbelta e afiada de aço temperado, com uma guarda elaborada em forma de videiras entrelaçadas. Perfeita para estocadas rápidas e precisas.',
        imageUrl: 'https://placehold.co/400x400/18181b/fbbf24?text=Rapieira'
    },
    { 
        id: '2', name: 'Grimório', type: 'Item', weight: 1.5, quantity: 1, equipped: false, 
        description: 'Um livro volumoso encadernado em couro de dragão vermelho, com runas douradas na capa que brilham levemente no escuro. Contém seus estudos arcanos.',
        imageUrl: 'https://placehold.co/400x400/18181b/fbbf24?text=Grimório'
    },
    { 
        id: '3', name: 'Armadura de Couro', type: 'Armadura', weight: 5, quantity: 1, equipped: true, acBonus: 11, properties: ['Leve'], 
        description: 'Um peitoral de couro fervido e endurecido, tingido de negro, oferecendo proteção básica sem sacrificar a mobilidade.',
        imageUrl: 'https://placehold.co/400x400/18181b/fbbf24?text=Couro'
    },
    { 
        id: '4', name: 'Foco Arcano (Cristal)', type: 'Foco', weight: 0.5, quantity: 1, equipped: true, 
        description: 'Um cristal de quartzo rubro, lapidado em forma de chama, que pulsa com energia quente quando magia é canalizada através dele.',
        imageUrl: 'https://placehold.co/400x400/18181b/fbbf24?text=Cristal'
    },
    { 
        id: '5', name: 'Poção de Cura', type: 'Item', weight: 0.25, quantity: 2, equipped: false, favorite: true, 
        description: 'Um frasco de vidro contendo um líquido vermelho brilhante que cintila quando agitado. Cheira levemente a canela e ferro. Recupera 2d4+2 PV.',
        imageUrl: 'https://placehold.co/400x400/18181b/fbbf24?text=Cura'
    }
  ],
  spells: [
    { id: '1', name: 'Mãos Flamejantes', level: 1, school: 'Evocação', castingTime: '1 ação', range: 'Cone 4.5m', components: 'V,S', duration: 'Instantânea', description: '3d6 de dano de fogo.', prepared: true, classes: ['Feiticeiro', 'Mago'] },
    { id: '2', name: 'Escudo Arcano', level: 1, school: 'Abjuração', castingTime: '1 reação', range: 'Pessoal', components: 'V,S', duration: '1 rodada', description: '+5 na CA.', prepared: true, classes: ['Feiticeiro', 'Mago'] },
    { id: '3', name: 'Detectar Magia', level: 1, school: 'Adivinhação', castingTime: '1 ação', range: 'Pessoal', components: 'V,S', duration: 'conc, 10 min', description: 'Detecta auras mágicas.', prepared: false, classes: ['Bardo', 'Clérigo', 'Druida', 'Mago'] },
    { id: '4', name: 'Lâmina da Chama Esverdeada', level: 0, school: 'Evocação', castingTime: '1 ação', range: '1.5m', components: 'V,M', duration: 'Instantânea', description: 'Ataque corpo-a-corpo mágico.', prepared: true, classes: ['Mago'] },
    { id: '5', name: 'Passo das Brumas', level: 2, school: 'Conjuração', castingTime: '1 ação bônus', range: 'Pessoal', components: 'V', duration: 'Instantânea', description: 'Teletransporte até 9m.', prepared: true, classes: ['Mago'] },
  ],
  spellSlotsUsed: { 1: 1, 2: 0 },
  features: [
    { id: '1', name: 'Visão no Escuro', source: 'Raça', description: '18m de visão no escuro.', active: true },
    { id: '2', name: 'Resistência a Fogo', source: 'Raça', description: 'Devido à herança Genasi.', active: true },
    { id: '3', name: 'Canção da Lâmina', source: 'Classe', description: 'Bônus na CA e concentração.', active: false },
  ],
  resourceUsage: {},
  currency: { cp: 10, sp: 5, gp: 45 },
  lore: {
    backstory: 'Estudou nas academias de magia de Faerûn, buscando dominar a arte da espada e da magia combinadas.',
    sessions: [
        { id: '1', title: 'O Encontro na Taverna', date: '2023-10-20', content: 'Encontramos um homem estranho encapuzado.' }
    ],
    notes: [
        { id: '1', title: 'Culto do Dragão', type: 'NPC', content: 'Eles usam máscaras roxas.' }
    ],
    personality: {
        traits: 'Sempre tenho um plano para o que fazer quando as coisas derem errado.',
        ideals: 'Conhecimento. O caminho para o poder e auto-aperfeiçoamento é através do conhecimento.',
        bonds: 'Trabalho para preservar uma biblioteca antiga e importante.',
        flaws: 'Sou facilmente distraído pela promessa de informações novas.'
    }
  }
};
