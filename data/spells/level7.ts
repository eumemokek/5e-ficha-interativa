
import { Spell } from '../../types';

export type CompendiumSpell = Omit<Spell, 'id' | 'prepared'>;

const C_BARD = 'Bardo';
const C_CLERIC = 'Clérigo';
const C_DRUID = 'Druida';
const C_SORC = 'Feiticeiro';
const C_WARLOCK = 'Bruxo';
const C_WIZARD = 'Mago';

export const LEVEL_7_SPELLS: CompendiumSpell[] = [
  { 
    name: 'Bola de Fogo Controlável', level: 7, school: 'Evocação', castingTime: '1 ação', range: '45 metros', components: 'V, G, M (enxofre e morcego)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Explosão de fogo (5d6, Dex metade). A bola permanece e pode ser movida como ação bônus para explodir novamente.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Conjurar Celestial', level: 7, school: 'Conjuração', castingTime: '1 minuto', range: '27 metros', components: 'V, G', duration: 'Concentração, dura até 1 hora', 
    description: 'Invoca celestial de ND 4 ou menor. Obedece comandos. Torna-se hostil se perder concentração.', 
    classes: [C_CLERIC] 
  },
  { 
    name: 'Dedo da Morte', level: 7, school: 'Necromancia', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: 'Instantâneo', 
    description: 'Causa 7d8+30 necrótico (Con metade). Se matar humanoide, ele ergue-se como zumbi sob seu comando permanente.', 
    classes: [C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Espada de Mordenkainen', level: 7, school: 'Evocação', castingTime: '1 ação', range: '18 metros', components: 'V, G, M (espada platina 250po)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Espada de força ataca (3d10 força). Pode mover e atacar novamente como ação bônus.', 
    classes: [C_BARD, C_WIZARD] 
  },
  { 
    name: 'Etérea', level: 7, school: 'Transmutação', castingTime: '1 ação', range: 'Pessoal', components: 'V, G', duration: '8 horas', 
    description: 'O jogador entra no Plano Etéreo. Pode ver o plano material, mas não interagir. Fantasmas podem vê-lo.', 
    classes: [C_BARD, C_CLERIC, C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Inverter a Gravidade', level: 7, school: 'Transmutação', castingTime: '1 ação', range: '30 metros', components: 'V, G, M (imã e limalha)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Cilindro de 15m raio sobe. Criaturas caem para cima (até 30m). Se atingirem algo, sofrem dano de queda. Ao fim, caem de volta.', 
    classes: [C_DRUID, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Isolamento', level: 7, school: 'Transmutação', castingTime: '1 ação', range: 'Toque', components: 'V, G, M (pó de diamante 5000po)', duration: 'Até ser dissipada', 
    description: 'Alvo fica em animação suspensa, imune ao tempo e danos, invisível e indetectável.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Mansão Magnífica de Mordenkainen', level: 7, school: 'Conjuração', castingTime: '1 minuto', range: '90 metros', components: 'V, G, M (pórtico marfim 500po)', duration: '24 horas', 
    description: 'Cria mansão extradimensional com comida, quartos e servos invisíveis para até 100 pessoas.', 
    classes: [C_BARD, C_WIZARD] 
  },
  { 
    name: 'Miragem', level: 7, school: 'Ilusão', castingTime: '10 minutos', range: 'Visão', components: 'V, G', duration: '10 dias', 
    description: 'Altera aparência do terreno em 1km quadrado. Pode adicionar estruturas. Interação tátil funciona (terreno difícil ilusório atrasa mesmo).', 
    classes: [C_BARD, C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Palavra Divina', level: 7, school: 'Evocação', castingTime: '1 ação bônus', range: '9 metros', components: 'V', duration: 'Instantâneo', 
    description: 'Criaturas (não celestiais/feéricos/corruptores/mortos-vivos) sofrem efeitos baseados em PV atual: <50 surdo, <40 cego+surdo, <30 atordoado+..., <20 morto. Extraplanares são banidos.', 
    classes: [C_CLERIC] 
  },
  { 
    name: 'Prisão de Energia', level: 7, school: 'Evocação', castingTime: '1 ação', range: '30 metros', components: 'V, G, M (pó de rubi 1500po)', duration: '1 hora', 
    description: 'Gaiola ou caixa de força imóvel. Indestrutível. Bloqueia magia e matéria. Teleporte exige TR Carisma.', 
    classes: [C_BARD, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Projetar Imagem', level: 7, school: 'Ilusão', castingTime: '1 ação', range: '800 km', components: 'V, G, M (cópia do jogador de 5po)', duration: 'Concentração, dura até 1 dia', 
    description: 'Cria cópia ilusória do jogador. Pode ver e falar através dela. Se tocada, revela-se ilusão.', 
    classes: [C_BARD, C_WIZARD] 
  },
  { 
    name: 'Rajada Prismática', level: 7, school: 'Evocação', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: 'Instantâneo', 
    description: '7 raios multicoloridos. 10d6 dano (tipo varia) ou petrificação/cegueira/banimento. Rola 1d8 para efeito.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Regeneração', level: 7, school: 'Transmutação', castingTime: '1 minuto', range: 'Toque', components: 'V, G, M (roda de oração e água benta)', duration: '1 hora', 
    description: 'Alvo cura 4d8+15. Recupera 1 PV por rodada e membros decepados regeneram em 2 minutos.', 
    classes: [C_BARD, C_CLERIC, C_DRUID] 
  },
  { 
    name: 'Ressurreição', level: 7, school: 'Necromancia', castingTime: '1 hora', range: 'Toque', components: 'V, G, M (diamante 1000po)', duration: 'Instantâneo', 
    description: 'Revive criatura morta há até 1 século. Cura tudo, repõe membros. Penalidade -4 por 4 descansos.', 
    classes: [C_BARD, C_CLERIC] 
  },
  { 
    name: 'Símbolo', level: 7, school: 'Abjuração', castingTime: '1 minuto', range: 'Toque', components: 'V, G, M (mercúrio e fósforo 1000po)', duration: 'Até ser dissipada', 
    description: 'Como Símbolo de Proteção, mas mais forte. Efeitos: Morte (10d10 necrótico), Discórdia, Medo, Sono, Atordoamento, Loucura, etc.', 
    classes: [C_BARD, C_CLERIC, C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Simulacro', level: 7, school: 'Ilusão', castingTime: '12 horas', range: 'Toque', components: 'V, G, M (neve e rubi 1500po)', duration: 'Até ser dissipada', 
    description: 'Cria cópia semi-real de besta ou humanoide. Tem metade dos PV, mesmas estatísticas, mas não recupera slots. Obedece o jogador.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Teletransporte', level: 7, school: 'Conjuração', castingTime: '1 ação', range: '3 metros', components: 'V', duration: 'Instantâneo', 
    description: 'Transporta jogador e até 8 criaturas para qualquer lugar no mesmo plano. Chance de erro baseada em familiaridade (tabela).', 
    classes: [C_BARD, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Tempestade de Fogo', level: 7, school: 'Evocação', castingTime: '1 ação', range: '45 metros', components: 'V, G', duration: 'Instantâneo', 
    description: '10 cubos de 3m de fogo. 7d10 fogo (Dex metade). Escolhe disposição. Queima objetos.', 
    classes: [C_CLERIC, C_DRUID, C_SORC] 
  }
];
