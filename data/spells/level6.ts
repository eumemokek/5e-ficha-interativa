
import { Spell } from '../../types';

export type CompendiumSpell = Omit<Spell, 'id' | 'prepared'>;

const C_BARD = 'Bardo';
const C_CLERIC = 'Clérigo';
const C_DRUID = 'Druida';
const C_SORC = 'Feiticeiro';
const C_WARLOCK = 'Bruxo';
const C_WIZARD = 'Mago';

export const LEVEL_6_SPELLS: CompendiumSpell[] = [
  { 
    name: 'Ataque Visual', level: 6, school: 'Necromancia', castingTime: '1 ação', range: '18 metros', components: 'V', duration: 'Concentração, dura até 1 minuto', 
    description: 'Seus olhos se tornam manchas pretas impregnadas com poder pavoroso. O jogador escolhe uma criatura que possa ver dentro do alcance para fazer um TR de Sabedoria. Se falhar, fica amedrontada. Em cada turno, o jogador pode usar ação para causar 3d10 psíquico no alvo amedrontado.', 
    classes: [C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Barreira de Lâminas', level: 6, school: 'Evocação', castingTime: '1 ação', range: '27 metros', components: 'V, G', duration: 'Concentração, dura até 10 minutos', 
    description: 'O jogador cria uma muralha vertical de lâminas giratórias, afiadas, feitas de energia mágica. A muralha provê três quartos de cobertura e é terreno difícil. Criaturas que entram ou começam turno nela sofrem 6d10 cortante (Dex reduz à metade).', 
    classes: [C_CLERIC] 
  },
  { 
    name: 'Caminhar no Vento', level: 6, school: 'Transmutação', castingTime: '1 minuto', range: '9 metros', components: 'V, G, M (fogo e água benta)', duration: '8 horas', 
    description: 'O jogador e até 10 criaturas voluntárias assumem uma forma gasosa (nuvem), ganhando deslocamento de voo de 90m e resistência a dano não mágico. Podem voltar à forma solida, mas leva 1 minuto.', 
    classes: [C_DRUID] 
  },
  { 
    name: 'Círculo da Morte', level: 6, school: 'Necromancia', castingTime: '1 ação', range: '45 metros', components: 'V, G, M (pó de pérola negra valendo 500 po)', duration: 'Instantâneo', 
    description: 'Esfera de energia negativa de 18m de raio. Criaturas na área fazem TR Constituição. Falha: 8d6 necrótico. Sucesso: metade.', 
    classes: [C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Conjurar Fada', level: 6, school: 'Conjuração', castingTime: '1 minuto', range: '27 metros', components: 'V, G', duration: 'Concentração, dura até 1 hora', 
    description: 'Invoca uma criatura feérica de ND 6 ou menor. Ela obedece aos comandos do jogador. Se a concentração quebrar, ela se torna hostil.', 
    classes: [C_DRUID, C_WARLOCK] 
  },
  { 
    name: 'Corrente de Relâmpagos', level: 6, school: 'Evocação', castingTime: '1 ação', range: '45 metros', components: 'V, G, M (pele, âmbar, vidro ou cristal)', duration: 'Instantâneo', 
    description: 'Um arco elétrico atinge um alvo (10d8 elétrico, Dex metade) e salta para até 3 outros alvos a 9m do primeiro (mesmo dano).', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Criar Mortos-Vivos', level: 6, school: 'Necromancia', castingTime: '1 minuto', range: '3 metros', components: 'V, G, M (potes de barro com túmulo e onix de 150po)', duration: 'Instantâneo', 
    description: 'O jogador cria até 3 carniçais de corpos médios ou pequenos. Eles obedecem comandos por 24h. Lançar novamente renova o controle.', 
    classes: [C_CLERIC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Dança Irresistível de Otto', level: 6, school: 'Encantamento', castingTime: '1 ação', range: '9 metros', components: 'V', duration: 'Concentração, dura até 1 minuto', 
    description: 'O alvo começa a dançar comicamente. Deslocamento zero, desvantagem em testes de Des e ataques. Ataques contra ele têm vantagem. Pode fazer TR Sabedoria para encerrar.', 
    classes: [C_BARD, C_WIZARD] 
  },
  { 
    name: 'Desintegrar', level: 6, school: 'Transmutação', castingTime: '1 ação', range: '18 metros', components: 'V, G, M (magnetita e pó de mármore)', duration: 'Instantâneo', 
    description: 'Raio verde. TR Destreza. Falha: 10d6+40 de força. Se o dano reduzir a 0 PV, o alvo vira pó (só revivível com Ressurreição Verdadeira ou Desejo). Desintegra objetos Força e criações mágicas.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Doença Plena', level: 6, school: 'Necromancia', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: 'Instantâneo', 
    description: 'Causa 14d6 necrótico em um alvo (TR Con metade). Se falhar, fica envenenado por 1 minuto. Enquanto envenenado, fica cego, surdo e atordoado. TR Con no fim de cada turno encerra.', 
    classes: [C_CLERIC, C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Encontrar o Caminho', level: 6, school: 'Adivinhação', castingTime: '1 minuto', range: 'Pessoal', components: 'V, G, M (ferramentas de adivinhação 100po)', duration: 'Concentração, dura até 1 dia', 
    description: 'O jogador nomeia um local familiar. A magia indica a rota física mais direta para lá. O jogador sabe onde fica e a distância.', 
    classes: [C_BARD, C_CLERIC, C_DRUID] 
  },
  { 
    name: 'Esfera Congelante de Otiluke', level: 6, school: 'Evocação', castingTime: '1 ação', range: '90 metros', components: 'V, G, M (pequena esfera de cristal)', duration: 'Instantâneo', 
    description: 'Esfera de frio explode em 18m de raio. 10d6 gelo (Con metade). Congela água. Pode ser segurada antes de arremessar.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Globo de Invulnerabilidade', level: 6, school: 'Abjuração', castingTime: '1 ação', range: 'Pessoal (3m raio)', components: 'V, G, M (conta de vidro ou cristal)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Barreira cintilante de 3m. Magias de nível 5 ou menor não podem afetar criaturas dentro, nem penetrar a barreira.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Ilusão Programada', level: 6, school: 'Ilusão', castingTime: '1 ação', range: '36 metros', components: 'V, G, M (lã e jade 25po)', duration: 'Até ser dissipada', 
    description: 'Cria uma ilusão em uma área que se ativa sob condição específica. Pode incluir som, cheiro, etc. Dura 5 minutos após ativada.', 
    classes: [C_BARD, C_WIZARD] 
  },
  { 
    name: 'Mover Terra', level: 6, school: 'Transmutação', castingTime: '1 ação', range: '36 metros', components: 'V, G, M (terra, argila e ferro)', duration: 'Concentração, dura até 2 horas', 
    description: 'Remodela terra, areia ou argila em área de 12m. Pode criar valas, elevar terreno, derrubar estruturas instáveis.', 
    classes: [C_DRUID, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Muralha de Espinhos', level: 6, school: 'Conjuração', castingTime: '1 ação', range: '36 metros', components: 'V, G, M (um punhado de espinhos)', duration: 'Concentração, dura até 10 minutos', 
    description: 'Muralha sólida e espinhosa. Bloqueia visão e movimento. 7d8 perfurante para quem entra ou começa turno (Dex metade).', 
    classes: [C_DRUID] 
  },
  { 
    name: 'Muralha de Gelo', level: 6, school: 'Evocação', castingTime: '1 ação', range: '36 metros', components: 'V, G, M (quartzo)', duration: 'Concentração, dura até 10 minutos', 
    description: 'Muralha de gelo. 10d6 frio ao surgir (Dex metade). Se quebrada, deixa ar frio (5d6 dano ao passar).', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Palavra de Recordação', level: 6, school: 'Conjuração', castingTime: '1 ação', range: '1,5 metros', components: 'V', duration: 'Instantâneo', 
    description: 'Teleporta o jogador e até 5 voluntários para um santuário previamente marcado (marcação feita ao conjurar neste local).', 
    classes: [C_CLERIC] 
  },
  { 
    name: 'Proteção', level: 6, school: 'Abjuração', castingTime: '1 ação', range: 'Toque', components: 'V, G', duration: '10 dias', 
    description: 'O jogador e o alvo tocam testas. O alvo ganha +1 na CA e Saves, e resistência a todos os danos.', 
    classes: [C_BARD, C_CLERIC, C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Raio Solar', level: 6, school: 'Evocação', castingTime: '1 ação', range: 'Pessoal (linha 18m)', components: 'V, G, M (lente)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Feixe de luz solar de 18m. 6d8 radiante e cego (Con metade e não cego). Mortos-vivos têm desvantagem. Pode repetir a cada turno.', 
    classes: [C_DRUID, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Sugestão em Massa', level: 6, school: 'Encantamento', castingTime: '1 ação', range: '18 metros', components: 'V, M (língua de cobra e mel)', duration: '24 horas', 
    description: 'Como Sugestão, mas afeta até 12 criaturas. TR Sabedoria. Se falhar, seguem o comando por 24h.', 
    classes: [C_BARD, C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Teletransporte por Árvores', level: 6, school: 'Conjuração', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: '1 rodada', 
    description: 'Cria portal em uma árvore ligando a outra árvore no mesmo plano. Qualquer um pode passar.', 
    classes: [C_DRUID] 
  },
  { 
    name: 'Visão da Verdade', level: 6, school: 'Adivinhação', castingTime: '1 ação', range: 'Toque', components: 'V, G, M (pomada de 25po)', duration: '1 hora', 
    description: 'Alvo ganha visão verdadeira até 36m. Vê invisível, etéreo, ilusões falham, vê forma real de metamorfos.', 
    classes: [C_BARD, C_CLERIC, C_SORC, C_WARLOCK, C_WIZARD] 
  }
];
