
import { Spell } from '../../types';

export type CompendiumSpell = Omit<Spell, 'id' | 'prepared'>;

const C_BARD = 'Bardo';
const C_CLERIC = 'Clérigo';
const C_DRUID = 'Druida';
const C_SORC = 'Feiticeiro';
const C_WARLOCK = 'Bruxo';
const C_WIZARD = 'Mago';

export const LEVEL_9_SPELLS: CompendiumSpell[] = [
  { 
    name: 'Alterar Forma', level: 9, school: 'Transmutação', castingTime: '1 ação', range: 'Pessoal', components: 'V, G, M (coroa de jade 1500po)', duration: 'Concentração, dura até 1 hora', 
    description: 'Assume forma de outra criatura (ND <= Nível). Mantém estatísticas mentais. Pode mudar de forma durante a duração. Assume PV da nova forma.', 
    classes: [C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Chuva de Meteoros', level: 9, school: 'Evocação', castingTime: '1 ação', range: '1,6 km', components: 'V, G', duration: 'Instantâneo', 
    description: '4 esferas de 12m raio. 20d6 fogo + 20d6 concussão (Dex metade).', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Desejo', level: 9, school: 'Conjuração', castingTime: '1 ação', range: 'Pessoal', components: 'V', duration: 'Instantâneo', 
    description: 'A magia mais poderosa. Pode replicar qualquer magia de nível 8 ou menor sem componentes. Pode criar efeitos massivos, curar tudo, criar riqueza, mudar a realidade. Risco de perder a capacidade de conjurar Desejo (33%).', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Encarnação Fantasmagórica', level: 9, school: 'Ilusão', castingTime: '1 minuto', range: '36 metros', components: 'V, G, M (lótus)', duration: '10 minutos', 
    description: 'Cria objeto ou criatura semi-real. Se criatura, obedece e tem estatísticas reais.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Enxame de Meteoros', level: 9, school: 'Evocação', castingTime: '1 ação', range: '1,6 km', components: 'V, G', duration: 'Instantâneo', 
    description: '4 esferas de 12m raio. 20d6 fogo + 20d6 concussão (Dex metade). (Sinônimo de Chuva de Meteoros, mantido para compatibilidade).', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Muralha Prismática', level: 9, school: 'Abjuração', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: '10 minutos', 
    description: 'Muralha multicolorida. Cega quem olha (4d8). 7 camadas que devem ser destruídas em ordem. Cada camada causa dano ou efeito específico ao ser atravessada.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Palavra de Poder: Cura', level: 9, school: 'Evocação', castingTime: '1 ação', range: 'Toque', components: 'V, G', duration: 'Instantâneo', 
    description: 'Alvo recupera todos os PV. Encerra encantado, assustado, paralisado e atordoado. Levanta se estiver caído.', 
    classes: [C_BARD, C_CLERIC] 
  },
  { 
    name: 'Palavra de Poder: Matar', level: 9, school: 'Encantamento', castingTime: '1 ação', range: '18 metros', components: 'V', duration: 'Instantâneo', 
    description: 'Se alvo tiver 100 PV ou menos, morre instantaneamente. Sem teste de resistência.', 
    classes: [C_BARD, C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Parar o Tempo', level: 9, school: 'Transmutação', castingTime: '1 ação', range: 'Pessoal', components: 'V', duration: 'Instantâneo', 
    description: 'O tempo para para todos, exceto você. Você ganha 1d4+1 turnos seguidos. Encerra se afetar outra criatura ou se mover mais de 300m.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Portal', level: 9, school: 'Conjuração', castingTime: '1 ação', range: '18 metros', components: 'V, G, M (diamante 5000po)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Portal para outro plano. Pode invocar criatura específica chamando o nome (ela é puxada para perto). Sem save.', 
    classes: [C_CLERIC, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Presciência', level: 9, school: 'Adivinhação', castingTime: '1 minuto', range: 'Toque', components: 'V, G, M (pluma de beija-flor)', duration: '8 horas', 
    description: 'Pode ver o futuro imediato. Vantagem em ataques, testes e saves. Outros têm desvantagem ao atacar você. Não pode ser surpreendido.', 
    classes: [C_BARD, C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Projeção Astral', level: 9, school: 'Necromancia', castingTime: '1 hora', range: 'Toque', components: 'V, G, M (jacinto 1000po e barra prata 100po por pessoa)', duration: 'Especial', 
    description: 'Projeta corpos astrais para o Plano Astral. Corpos físicos ficam em estase. Cordão de prata liga os dois. Se cordão cortar, morte.', 
    classes: [C_CLERIC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Ressurreição Verdadeira', level: 9, school: 'Necromancia', castingTime: '1 hora', range: 'Toque', components: 'V, G, M (diamante 25000po)', duration: 'Instantâneo', 
    description: 'Revive qualquer criatura morta (até 200 anos) por qualquer motivo (exceto velhice). Cria novo corpo se necessário. Cura tudo.', 
    classes: [C_CLERIC, C_DRUID] 
  },
  { 
    name: 'Sexto Sentido', level: 9, school: 'Adivinhação', castingTime: '1 minuto', range: 'Toque', components: 'V, G, M (pluma)', duration: '8 horas', 
    description: 'Sinônimo de Presciência (Foresight). Mantido para compatibilidade.', 
    classes: [C_BARD, C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Tempestade da Vingança', level: 9, school: 'Evocação', castingTime: '1 ação', range: 'Visão', components: 'V, G', duration: 'Concentração, dura até 1 minuto', 
    description: 'Nuvem de tempestade enorme (110m). Cada turno um efeito: Trovão (surdez), Chuva Ácida (dano), Raios (dano), Granizo (dano e gelo).', 
    classes: [C_DRUID] 
  }
];
