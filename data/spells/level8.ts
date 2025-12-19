
import { Spell } from '../../types';

export type CompendiumSpell = Omit<Spell, 'id' | 'prepared'>;

const C_BARD = 'Bardo';
const C_CLERIC = 'Clérigo';
const C_DRUID = 'Druida';
const C_SORC = 'Feiticeiro';
const C_WARLOCK = 'Bruxo';
const C_WIZARD = 'Mago';

export const LEVEL_8_SPELLS: CompendiumSpell[] = [
  { 
    name: 'Antipatia/Simpatia', level: 8, school: 'Encantamento', castingTime: '1 hora', range: '18 metros', components: 'V, G, M (alúmen e vinagre ou mel)', duration: '10 dias', 
    description: 'Atrai (Simpatia) ou Repele (Antipatia) um tipo de criatura ou criatura específica de um objeto ou área. TR Sabedoria.', 
    classes: [C_BARD, C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Aura Sagrada', level: 8, school: 'Abjuração', castingTime: '1 ação', range: 'Pessoal', components: 'V, G, M (relicário 1000po)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Luz emana 9m. Aliados têm vantagem em saves e inimigos desvantagem em ataques. Corruptores/Mortos-vivos cegos se acertarem ataque.', 
    classes: [C_CLERIC] 
  },
  { 
    name: 'Campo Antimagia', level: 8, school: 'Abjuração', castingTime: '1 ação', range: 'Pessoal (3m raio)', components: 'V, G, M (ferro e pó)', duration: 'Concentração, dura até 1 hora', 
    description: 'Esfera de 3m onde magia não funciona. Itens mágicos viram mundanos, magias são suprimidas, criaturas invocadas somem.', 
    classes: [C_CLERIC, C_WIZARD] 
  },
  { 
    name: 'Clonar', level: 8, school: 'Necromancia', castingTime: '1 hora', range: 'Toque', components: 'V, G, M (diamante 1000po e pedaço de carne)', duration: 'Instantâneo', 
    description: 'Cria clone inerte. Se original morrer, alma vai para o clone (se o clone estiver maduro, 120 dias).', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Controlar o Clima', level: 8, school: 'Transmutação', castingTime: '10 minutos', range: '8 km', components: 'V, G, M (incenso e terra)', duration: 'Concentração, dura até 8 horas', 
    description: 'Muda precipitação, temperatura e vento gradualmente.', 
    classes: [C_CLERIC, C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Dominar Monstro', level: 8, school: 'Encantamento', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: 'Concentração, dura até 1 hora', 
    description: 'Como Dominar Pessoa, mas afeta qualquer criatura.', 
    classes: [C_BARD, C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Enfraquecer o Intelecto', level: 8, school: 'Encantamento', castingTime: '1 ação', range: '45 metros', components: 'V, G, M (moedas)', duration: 'Instantâneo', 
    description: '4d6 psíquico. TR Inteligência. Falha: Int e Car viram 1. Não pode conjurar, falar ou entender. Repete save a cada 30 dias.', 
    classes: [C_BARD, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Explosão Solar', level: 8, school: 'Evocação', castingTime: '1 ação', range: '45 metros', components: 'V, G, M (fogo e pedra solar)', duration: 'Instantâneo', 
    description: 'Esfera de 18m. 12d6 radiante e cego por 1 min (Con metade). Mortos-vivos sofrem mais e têm desvantagem.', 
    classes: [C_DRUID, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Formas Animais', level: 8, school: 'Transmutação', castingTime: '1 ação', range: '9 metros', components: 'V, G', duration: 'Concentração, dura até 24 horas', 
    description: 'Transforma criaturas voluntárias em bestas de ND 4 ou menor. Mantém Int/Sab/Car.', 
    classes: [C_DRUID] 
  },
  { 
    name: 'Labirinto', level: 8, school: 'Conjuração', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: 'Concentração, dura até 10 minutos', 
    description: 'Banir alvo para labirinto semiplanar. Teste de Inteligência CD 20 para escapar a cada turno.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Limpar a Mente', level: 8, school: 'Abjuração', castingTime: '1 ação', range: 'Toque', components: 'V, G', duration: '24 horas', 
    description: 'Imune a dano psíquico, leitura de mente, emoções, adivinhação e encantamento.', 
    classes: [C_BARD, C_CLERIC, C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Nuvem Incendiária', level: 8, school: 'Conjuração', castingTime: '1 ação', range: '45 metros', components: 'V, G', duration: 'Concentração, dura até 1 minuto', 
    description: 'Nuvem de 6m raio. 10d8 fogo (Dex metade). Move-se 3m longe do jogador a cada turno.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Palavra de Poder: Atordoar', level: 8, school: 'Encantamento', castingTime: '1 ação', range: '18 metros', components: 'V', duration: 'Instantâneo', 
    description: 'Se alvo tiver 150 PV ou menos, fica atordoado. TR Con no fim de cada turno para encerrar.', 
    classes: [C_BARD, C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Semiplano', level: 8, school: 'Conjuração', castingTime: '1 ação', range: '18 metros', components: 'G', duration: '1 hora', 
    description: 'Cria porta para semiplano vazio ou conhecido. Pode ser usado como prisão ou cofre.', 
    classes: [C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Terremoto', level: 8, school: 'Evocação', castingTime: '1 ação', range: '150 metros', components: 'V, G, M (terra, pedra, argila)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Tremor em área de 30m. Derruba criaturas, abre fendas (dano queda), destrói estruturas (50 dano/turno). Quebra concentração.', 
    classes: [C_CLERIC, C_DRUID, C_SORC] 
  },
  { 
    name: 'Tsunami', level: 8, school: 'Conjuração', castingTime: '1 minuto', range: 'Visão', components: 'V, G', duration: 'Concentração, dura até 6 rodadas', 
    description: 'Muralha de água de 90m x 90m x 15m. Move-se 15m/turno. Dano de esmagamento (6d10) e carrega criaturas.', 
    classes: [C_DRUID] 
  }
];
