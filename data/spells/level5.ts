
import { Spell } from '../../types';

export type CompendiumSpell = Omit<Spell, 'id' | 'prepared'>;

const C_BARD = 'Bardo';
const C_CLERIC = 'Clérigo';
const C_DRUID = 'Druida';
const C_PALADIN = 'Paladino';
const C_RANGER = 'Ranger';
const C_SORC = 'Feiticeiro';
const C_WARLOCK = 'Bruxo';
const C_WIZARD = 'Mago';

export const LEVEL_5_SPELLS: CompendiumSpell[] = [
  { 
    name: 'Aljava Veloz', level: 5, school: 'Transmutação', castingTime: '1 ação bônus', range: 'Toque', components: 'V, G, M (uma aljava contendo ao menos uma munição)', duration: 'Concentração, dura até 1 minuto', 
    description: 'O jogador transmuta sua aljava para que ela produza um fornecimento interminável de munição não mágica, a qual parece saltar na mão do jogador quando ele busca por ela. Em cada um dos turnos do jogador até o término da magia, ele pode usar uma ação bônus para fazer dois ataques com uma arma que use munição da aljava. Cada vez que ele fizer tal ataca á distância, a aljava magicamente repõe a munição que ele usou com outra munição similar não mágica. Quaisquer munições criadas por esta magia se desintegram quando a magia encerra. Se a aljava sair das posses do jogador, a magia também se encerra.', 
    classes: [C_RANGER] 
  },
  { 
    name: 'Âncora Planar', level: 5, school: 'Abjuração', castingTime: '1 hora', range: '18 metros', components: 'V, G, M (uma joia que valha ao menos 1.000 p.o., a qual é consumida pela magia)', duration: '24 horas', 
    description: 'Com esta magia, o jogador tenta vincular um celestial, um elemental, um ser feérico, ou um demônio aos seus serviços. A criatura deve estar dentro do alcance em todo o tempo de lançamento da magia (normalmente, a criatura é invocada primeiramente no centro de um círculo de magia invertido, de modo que fique aprisionada enquanto a magia é lançada). Ao completar o lançamento, o alvo deve fazer um TR de Carisma. Se falhar, ele fica obrigado a servir o jogador enquanto durar a magia. Se a criatura foi invocada ou criada por outra magia, a duração da magia inicial é estendida para ficar equivalente à duração desta magia. Uma criatura subserviente deve seguir as instruções do jogador usando o melhor de suas habilidades. O jogador pode comandar a criatura para que ela o siga em uma aventura, para guardar um local, ou para entregar uma mensagem. A criatura obedece letra por letra das suas instruções, mas se a criatura for hostil ao jogador, ela se esforça para destorcer suas palavras com o fim de atender seus próprios objetivos. Se a criatura executar a tarefa dada antes do término da magia, ela volta até o jogador para informar o fato, se ambos estiverem no mesmo plano de existência. Se o jogador estiver em um plano de existência diferente, ela retorna para o local onde o jogador a fez subserviente e ali permanece até que a magia acabe. Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de nível superior, a duração aumenta 10 dias se usado o espaço de 6º nível, para 30 dias se usado espaço de 7º nível, para 180 dias, se usado espaço de 8º nível, e para 1 ano e 1 dia se usado espaço de 9º nível.', 
    classes: [C_BARD, C_CLERIC, C_DRUID, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Animar Objetos', level: 5, school: 'Transmutação', castingTime: '1 ação', range: '36 metros', components: 'V, G', duration: 'Concentração, dura até 1 minuto', 
    description: 'Objetos ganham vida ao comando do jogador. O jogador escolhe até dez objetos não mágicos dentro do alcance, que não estejam sendo empunhados ou carregados. Alvos de tamanho Médio contam como dois alvos, Grandes contam como 4 alvos, e Enormes como 8 alvos. O jogador não pode animar objetos maiores do que o tamanho Enorme. Cada alvo é animado e se torna uma criatura sob controle do jogador até a magia se encerrar ou até o alvo chegar a 0 pontos de vida. Como uma ação bônus, o jogador pode mentalmente comandar qualquer criatura animada com esta magia se a criatura estiver a até 150 metros (100 quadrados) dele (se o jogador controlar múltiplas criaturas, ele pode comandar uma ou todas de uma mesma vez, emitindo o mesmo comando para cada uma). O jogador decide que ação a criatura irá tomar e por onde ela irá se mover no próximo turno, ou pode emitir um comando geral, como o de proteger uma câmara ou um corredor em particular. Se o jogador não emitir comandos, a criatura apenas se defende contra criaturas hostis. Uma vez dada a ordem, a criatura continua à segui-la até que esteja completa. Se o jogador comanda um objeto para atacar, o objeto pode fazer um simples ataque básico contra uma criatura que esteja a até 1,5m (1 quadrado) do objeto. O objeto faz um ataque de impacto com sue bônus de ataque e dano de concussão de acordo com seu tamanho descrito na tabela. O Mestre pode determina que um objeto em específico cause dano do tipo cortante ou perfurante com base em sua forma. Estatísticas de Objetos Animados: [Miúdo: HP 20, CA 18, Atq +8 (1d4+4), For 4, Des 18], [Pequeno: HP 25, CA 16, Atq +6 (1d8+2), For 6, Des 14], [Médio: HP 40, CA 13, Atq +5 (2d6+1), For 10, Des 12], [Grande: HP 50, CA 10, Atq +6 (2d10+2), For 14, Des 10], [Enorme: HP 80, CA 10, Atq +8 (2d12+4), For 18, Des 6]. Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de 6º nível ou superior, o jogador pode animar até mais dois objetos adicionais para cada nível acima do 5ª.', 
    classes: [C_BARD, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Barreira Antivida', level: 5, school: 'Abjuração', castingTime: '1 ação', range: 'O jogador (um raio de 3 metros – 2 quadrados – a partir dele)', components: 'V, G', duration: 'Concentração, dura até 1 hora', 
    description: 'Uma barreira brilhante se expande do jogador até um raio de 3 metros (2 quadrados) em volta dele, e se move com ele permanecendo centrada no jogador e mantendo fora todas criaturas, com exceção de mortos vivos e construtos. A barreira dura até o término da magia. A magia previne que uma criatura, exceto as citadas acima, passe ou alcance algo através da barreira, no entanto a criatura pode lançar magias, fazer ataques à distância, ou com armas longas que passem pela barreira. Se o jogador se mover de um modo que force uma criatura a passar através da barreira, a magia é dissipada.', 
    classes: [C_DRUID] 
  },
  { 
    name: 'Caminhar por Árvores', level: 5, school: 'Conjuração', castingTime: '1 ação', range: 'O jogador', components: 'V, G', duration: 'Concentração, dura até 1 minuto', 
    description: 'O jogador ganha a habilidade de entrar em uma árvore se mover de dentro dela para dentro de outra árvore do mesmo tipo em até 150 metros (100 quadrados). Ambas as árvores devem estar vivas e ter ao menos o mesmo tamanho do jogador. O jogador deve usar 1,5m (1 quadrado) de movimento para entrar em uma árvore. O jogador sabe instantaneamente a localização de todas as outras árvores do mesmo tipo a até 150 metros (100 quadrados) e, como parte do movimento usado para entrar na árvore, ele pode ou passar para dentro de uma dessas árvores, ou sair da árvore em que está. O jogador surge em um ponto à escolha dele dentro de 1,5m (1 quadrado) de distância da árvore que ele entrou. O jogador pode usar esta habilidade de transporte uma vez por rodada pela duração da magia. O jogador deve terminar cada um dos seus turnos do lado de fora de uma árvore.', 
    classes: [C_DRUID, C_RANGER] 
  },
  { 
    name: 'Círculo de Poder', level: 5, school: 'Abjuração', castingTime: '1 ação', range: 'O jogador (9 metros de raio - 6 quadrados)', components: 'V', duration: 'Concentração, dura até 10 minutos', 
    description: 'Uma energia divina irradia do jogador, destorcendo e difundindo energia mágica a até metros (6 quadrados) do jogador. Até o término da magia, a esfera se move com o jogador, sempre centrada nele. Em sua duração, cada criatura aliada na área (incluindo o jogador) tem vantagem nas jogadas de teste de resistência contra magias e outros efeitos mágicos. Em soma, quando uma criatura afetada tem sucesso em um teste de resistência feito contra uma magia ou efeito mágico que cause metade do dano em caso de sucesso, ao invés de receber metade do dano o alvo não recebe dano algum, se tiver sucesso no teste de resistência.', 
    classes: [C_PALADIN] 
  },
  { 
    name: 'Círculo de Teletransporte', level: 5, school: 'Conjuração', castingTime: '1 minuto', range: '3 metros', components: 'V, M (gizes raros e tintas infundidas com gemas preciosas que valham ao menos 50 p.o., o quais são consumidos pela magia)', duration: '1 rodada', 
    description: 'A medida que o jogador lança esta magia, ele desenha um círculo com diâmetro de 3 metros (2 quadrados) no chão inscrito com símbolos que conectam a localização do jogador a um círculo permanente de teleporte à escolha do jogador, cujo ele conheça a sequência de símbolos e que esteja no mesmo plano de existência do jogador. Um portal brilhante se abre no círculo que o jogador desenhou e permanece aberto até o final do próximo turno do jogador. Qualquer criatura que entrar no portal instantaneamente surge a 1,5,m (1 quadrado) do círculo de destino, em um espaço desocupado mais próximo, se aquele estiver ocupado. Muitos templos maiores, guildas, e outros lugares importantes tem círculos permanentes de teleporte escritos em algum lugar dos seus confins. Cada círculo possui uma única sequência de símbolos, uma cadeia de runas mágicas, distribuídas em um padrão particular. Quando o jogador ganha a habilidade de lançar esta magia pela primeira vez, ele recebe a sequência de símbolos de dois destinos do Plano Material, determino pelo Mestre. O jogador pode aprender sequencias de símbolos adicionais durante suas aventuras. O jogador pode se emprenhar sobre uma nova sequencia de símbolos, estudando-a durante 1 minuto, para memoriza-la. O jogador pode criar um círculo de teleporte permanente lançando esta magia no mesmo local, todos os dias, durante um ano. O jogador não precisa usar o círculo para se teleportar quando lança a magia deste modo.', 
    classes: [C_BARD, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Coluna de Chamas', level: 5, school: 'Evocação', castingTime: '1 ação', range: '18 metros', components: 'V, G, M (uma pitada de enxofre)', duration: 'Instantâneo', 
    description: 'Uma coluna vertical de fogo divino troveja dos céus em uma localização escolhida pelo jogador. Cada criatura em um cilindro com um raio de 3 metros (2 quadrados), por 12 metros de altura (8 quadrados), centrada a partir do ponto escolhido, deve fazer um TR de Destreza. Se falhar, a criatura recebe 4d6 de dano de fogo e 4d6 de dano radiante, ou metade se tiver sucesso. Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de 6º nível ou superior, o dano do fogo, ou o dano radiante (à escolha do jogador) aumenta em 1d6 para cada nível acima do 5º.', 
    classes: [C_CLERIC, C_DRUID] 
  },
  { 
    name: 'Comunhão', level: 5, school: 'Adivinhação (ritual)', castingTime: '1 minuto', range: 'O jogador', components: 'V, G, M (incenso e um frasco de água benta ou água profana)', duration: '1 minuto', 
    description: 'O jogador contata sua divindade ou uma representação divina e faz três perguntas que podem ser respondidas com um sim ou um não. O jogador deve fazer as perguntas antes que a magia se encerre. O jogador recebe a resposta correta para cada questão. Seres divinos não são necessariamente oniscientes, então o jogador recebe ‘obscuro’ como resposta se a pergunta for pertinente a uma informação que vai além do conhecimento da divindade. Em um caso onde a palavra de resposta possa ser enganadora ou contrária aos interesses da divindade, o Mestre pode dar como resposta uma frase curta no lugar da palavra. Se o jogador lançar a magia 2 ou mais vezes antes de terminar seu próximo descanso prolongado, há uma chance cumulativa de 25% para cada lançamento após o primeiro em que o jogador não obteve a resposta desejada. O mestre faz essa rolagem em segredo.', 
    classes: [C_CLERIC] 
  },
  { 
    name: 'Comunhão com a Natureza', level: 5, school: 'Adivinhação (ritual)', castingTime: '1 minuto', range: 'O jogador', components: 'V, G', duration: 'Instantâneo', 
    description: 'O jogador a natureza se tornam um só por um período bem breve e o jogador ganha o conhecimento sobre o território ao redor. Em um ambiente externo, a magia dá ao jogador o conhecimento do território a até 4,8 quilômetros dele. Em cavernas e outros cenários subterrâneos naturais, o limite do raio é de 90 metros (60 quadrados). A magia não funciona onde a natureza foi remodelada por construções, como em masmorras e ou cidades. O jogador recebe instantaneamente o conhecimento de até três fatos à escolha dele, sobre qualquer um dos seguintes assuntos, à medida que eles estão relacionados com a área: • O terreno e corpos d’água • Plantas predominantes, bem como minerais, animais e pessoas predominantes • Poderosos seres celestiais, feéricos, demônios, elementais ou mortos vivos • Influência de outros planos de existência • Construções Por exemplo, o jogador determina a localização de um poderoso morto vivo na área, a localização da maior fonte segura de água potável, e a localização das cidades mais próximas.', 
    classes: [C_DRUID, C_RANGER] 
  },
  { 
    name: 'Cone Glacial', level: 5, school: 'Evocação', castingTime: '1 ação', range: 'O jogador (cone de 18 metros a partir dele – 12 quadrados)', components: 'V, G, M (um pequeno cristal ou cone de vidro)', duration: 'Instantâneo', 
    description: 'Uma explosão de ar frio irrompe dos dedos do jogador. Cada criatura no cone de 18 metros (12 quadrados) deve fazer um TR de Constituição. Uma criatura recebe 8d8 de dano de gelo se falhar, ou metade se obtiver sucesso. Uma criatura morta por esta magia se torna uma estátua congelada até derreter. Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de 6º nível ou maior, o dano aumenta em 1d8 para cada nível acima do 5ª.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Conjurar Rajada', level: 5, school: 'Conjuração', castingTime: '1 ação', range: '45 metros (30 quadrados)', components: 'V, G, M (uma munição ou uma arma de arremesso)', duration: 'Instantâneo', 
    description: 'O jogador dispara uma munição não mágica de uma arma à distância ou lança uma arma de arremesso não mágica no ar e escolhe um ponto dentro do alcance. Centenas de duplicatas da munição ou da arma recaem na área , vindas de cima, em uma rajada, e então desaparecem. Cada criatura em um raio cilíndrico de 12 metros de diâmetro (8 quadrados) por 6 metros de altura (4 quadrados), centrado no ponto escolhido, devem fazer um TR de Destreza. Se falhar, uma criatura recebe 8d8 de dano, ou metade se tiver sucesso. O tipo de dano é o mesmo da munição ou arma utilizada.', 
    classes: [C_RANGER] 
  },
  { 
    name: 'Contato Extraplanar', level: 5, school: 'Adivinhação (ritual)', castingTime: '1 minuto', range: 'Pessoal', components: 'V', duration: '1 minuto', 
    description: 'O jogador contata mentalmente um semideus, o espírito de um sábio há muito tempo morto, ou alguma outra entidade misteriosa de outro plano. Contatar esta Inteligência extraplanar pode forçar ou mesmo romper a mente do jogador. Quando o jogador lançar esta magia, ele deve fazer um TR de Inteligência com CD 15. Se falhar, o jogador recebe 6d6 de dano psíquico e fica insano até terminar um descanso prolongado. Enquanto estiver insano, o jogador não pode fazer ações, não pode entender o que outras criaturas dizem, não pode ler, e só consegue falar uma linguagem sem nexo. Uma restauração maior lançada no jogador encerra este efeito. Se tiver sucesso no teste de resistência, o jogador pode perguntar à entidade até 5 questões. O jogador deve fazer suas perguntas antes da magia terminar. O Mestre responde cada pergunta com uma palavra, como “sim”, “não”, “talvez”, “nunca”, “irrelevante”, ou “incerto” (se a entidade não souber a resposta para esta pergunta). Se a reposta na forma de uma única palavra puder ser dúbia ou enganadora o Mestre pode usar uma pequena frase como resposta ao invés da palavra.', 
    classes: [C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Criação', level: 5, school: 'Ilusão', castingTime: '1 minuto', range: '9 metros', components: 'V, G, M (um pequeno pedaço da matéria do mesmo tipo de item que o jogador pretende criar)', duration: 'Especial', 
    description: 'O jogador extrai um punhado de matéria sombria do Pendor das Sombras para criar um objeto inanimado de matéria vegetal dentro do alcance: produtos têxteis, corda, madeira, ou algo similar. O jogador também pode usar esta magia para criar objetos minerais como uma pedra, cristal, o metal. O objeto criado não pode ser maior do que um cubo de 1,5m (1 quadrado), e o objeto deve ser de um formato e material que o jogador já tenha visto antes. A duração depende do material do objeto. Se o objeto é composto de múltiplos materiais, o jogador deve usar a duração mais curta. Usar qualquer material desta magia como componente material para outra magia fará com que a consequente magia falhe. Duração: Matéria Vegetal (1 dia), Pedra ou Cristal (12 horas), Metais Preciosos (1 hora), Gemas (10 minutos), Adamantium ou Mithril (1 minuto). Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de 6º nível ou superior, o tamanho do cubo aumenta em 1,5m (1 quadrado) para cada nível acima do 5º.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Criar Passagens', level: 5, school: 'Transmutação', castingTime: '1 ação', range: '9 metros', components: 'V, G, M (uma pitada de sementes de sésamo)', duration: '1 hora', 
    description: 'Uma passagem surge em uma superfície de madeira, gesso ou pedra, em um ponto que o jogador possa ver (como uma parede, um teto ou chão) e que esteja dentro do alcance da magia, e permanece durante a duração da mesma. O jogador escolhe as dimensões da abertura: até 1,5m (1 quadrado) de largura, até 3m (2 quadrados) de altura, e até 6m (4 quadrados) de profundidade. A passagem não gera nenhum tipo de instabilidade à estrutura em sua volta. Quando a abertura desaparecer, qualquer criatura ou objeto ainda dentro da passagem criada pela magia, são expelidas com segurança para o espaço desocupado mais próximo à superfície na qual o jogador lançou a magia.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Curar Ferimentos em Massa', level: 5, school: 'Conjuração', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: 'Instantâneo', 
    description: 'Uma onda de energia curativa emana de um ponto à escolha do jogador dentro do alcance. O jogador escolhe até 6 criaturas dentro de um raio de 9 metros (6 quadrados) a partir do ponto escolhido. Cada alvo recupera pontos de vida equivalente a 3d8 + seu modificador de habilidade de conjuração. Esta magia não tem efeito sobre mortos vivos ou construtos. Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de 6º nível ou maior, a cura aumenta em 1d8 para cada nível acima do 5º.', 
    classes: [C_BARD, C_CLERIC, C_DRUID] 
  },
  { 
    name: 'Despertar', level: 5, school: 'Transmutação', castingTime: '8 horas', range: 'Toque', components: 'V, G, M (uma ágata que valha ao menos 1.000 p.o., que é consumida pela magia)', duration: 'Instantâneo', 
    description: 'Depois de gastar o tempo de lançamento traçando caminhos mágicos com a gema preciosa, o jogador toca uma besta ou planta de tamanho Enorme ou menor. O alvo deve ter Inteligência 3 ou menor, ou não possuir nenhuma inteligência. O alvo recebe um valor de Inteligência de 10, como também ganha a habilidade de falar uma linguagem conhecida pelo jogador. Se o alvo for uma planta, ela ganha a habilidade de mover seus membros, raízes, vinhas, trepadeiras, e assim por diante, e recebe sentidos similares a um humano. O Mestre escolhe as estatísticas apropriadas para uma planta desperta, como as estatísticas para um arbusto ou uma árvore desperta. A besta ou a planta desperta está encantada pelo jogador pelos próximos 30 dias, ou até o jogador ou um de seus companheiros fizerem algo que possa machucá-la. Quando a condição de encantado terminar, a criatura desperta escolhe se permanece amiga do jogador, baseando-se em como o jogador a tratou enquanto ela estava encantada por ele.', 
    classes: [C_BARD, C_DRUID] 
  },
  { 
    name: 'Despistar', level: 5, school: 'Ilusão', castingTime: '1 ação', range: 'O jogador', components: 'G', duration: 'Concentração, dura até 1 hora', 
    description: 'O jogador se torna invisível ao mesmo tempo uma ilusão dupla do jogador surge onde você está. A duplicata dura até o término da magia, mas a invisibilidade termina se o jogador ataca ou lança uma magia. O jogador pode ver através dos olhos e ouvir através dos ouvidos da duplicata, como se estivesse no local dela. Em cada um dos turnos do jogador, como uma ação bônus, ele pode alternar entre o uso dos sentidos da duplicata e do jogador. Enquanto o jogador estiver usando os sentidos da duplicata, ele fica cego e surdo no que diz a respeito do que está à sua própria volta.', 
    classes: [C_BARD, C_RANGER, C_WIZARD] 
  },
  { 
    name: 'Dissipar Bem e Mal', level: 5, school: 'Abjuração', castingTime: '1 ação', range: 'O jogador', components: 'V, G, M (água benta ou pó de prata ou de ferro)', duration: 'Concentração, dura até 1 minuto', 
    description: 'Uma energia brilhante envolve o jogador e o protege de seres feéricos, mortos vivos, e criaturas originárias de além do Plano Material. Enquanto a magia durar, celestiais, elementais, seres feéricos, demônios e mortos vivos tem desvantagem nas jogadas de ataque contra o jogador. O jogador pode encerrar a magia prematuramente uma das funções especiais seguintes: Quebrar Encantamento. Como uma ação, o jogador toca uma criatura que ele possa alcançar e que esteja enfeitiçada, assustada, ou possuída por um ser celestial, elemental, feérico, demoníaco ou morto vivo. A criatura tocada não mais está enfeitiçada, assustada, ou possuída por tais criaturas. Dissipar. Como uma ação, o jogador faz uma jogada de ataque mágico corpo a corpo contra um ser celestial, elemental, feérico, demoníaco ou morto vivo, que ele possa alcançar. Se acertar, o jogador tenta mandar a criatura de volta para seu plano natal. A criatura deve ter sucesso em um TR de Carisma ou será enviada de volta para seu plano natal (caso já não esteja nele). Se eles não estão em seu plano natal, mortos vivos são enviados para o Pendor das Sombras, e seres feéricos para a Agrestia das Fadas.', 
    classes: [C_CLERIC, C_PALADIN] 
  },
  { 
    name: 'Dominar Pessoa', level: 5, school: 'Encantamento', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: 'Concentração, dura até 1 minuto', 
    description: 'O jogador tenta seduzir um humanoide que possa enxergar dentro do alcance da magia. A criatura deve obter sucesso em um TR de Sabedoria ou ficará enfeitiçada pelo jogador enquanto durar a magia. Se o jogador ou seus aliados estiverem lutando contra a criatura ela possui vantagem no TR. Enquanto o alvo estiver enfeitiçado o jogador e ele possuem um elo telepático, que independe de distância, desde que ambos estejam no mesmo plano de existência. O jogador pode usar desse elo para enviar comandos para o alvo enquanto o jogador estiver consciente (não requer ações), a qual fará o seu melhor para obedecer. O jogador pode especificar um curso de ação simples e geral como “Ataque aquela criatura”, ou “Venha até aqui”, ou “Apanhe aquele objeto”. Se a criatura completar seu comando e não receber mais nenhum curso de ação, ele se defende e se preserva com as melhores habilidades que tiver. O jogador pode usar sua ação para tomar controle total e preciso do alvo. Até o final do próximo turno, a criatura irá tomar apenas ações escolhidas pelo jogador, e não fará nada que não seja permitido pelo jogador. Durante este tempo, o jogador também pode fazer com que o alvo faça uso de reação, mas isso irá requer que o jogador faça uso de sua própria reação. Cada vez que o alvo receber dano, ele deve fazer um novo TR de Sabedoria contra a magia. Se obtiver sucesso a magia se encerra. Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de 6º nível, a duração da concentração sobre para 10 minutos. Quando o jogador usa o espaço de uma magia de 7º nível a duração da concentração sobre para 1 hora. Quando o jogador usa o espaço de uma magia de 8º nível ou superior a duração da concentração sobre para 8 horas.', 
    classes: [C_BARD, C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Epidemia', level: 5, school: 'Necromancia', castingTime: '1 ação', range: 'Toque', components: 'V, G', duration: '7 dias', 
    description: 'O toque do jogador inflige doença. O jogador deve fazer uma jogada de ataque mágico corpo a corpo contra uma criatura dentro do seu alcance. Se acertar, o jogador aflige a criatura com uma doença, à escolha dele. No final de cada turno do alvo, o mesmo deve fazer um TR de Constituição. Depois de o alvo falhar três vezes no teste de resistência, o efeito da doença passa a ter a duração descrita na magia, e a criatura para de fazer os testes de resistência. E se o alvo tiver três sucessos no teste de resistência, a criatura se recupera da doença, e a magia se encerra. Doenças: Doença da Cegueira (Desv. Sabedoria, cego), Febre Imunda (Desv. Força, 1/2 dano com armas Força), Mente Fervente (Desv. Inteligência, sob efeito de confusão em combate), Apreensão (Desv. Destreza, tremores), Fim Sangrento (Desv. Constituição, atordoado se tomar dano).', 
    classes: [C_CLERIC, C_DRUID] 
  },
  { 
    name: 'Imobilizar Monstro', level: 5, school: 'Encantamento', castingTime: '1 ação', range: '27 metros', components: 'V, G, M (uma pedaço estreito e pequeno de ferro)', duration: 'Concentração, dura até 1 minuto', 
    description: 'O jogador escolhe uma criatura que possa ver dentro do alcance. O alvo deve ser bem sucedido em um TR de Sabedoria ou ficará paralisado enquanto durar a magia. Esta magia não tem efeito em mortos vivos. No final de cada turno, o alvo pode fazer outro TR de Sabedoria. Se tiver sucesso, a magia encerra sobre o alvo. Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de 6º nível ou superior, o jogador pode adicionar uma criatura para cada nível acima do 5ª. As criatura devem estar a até 9 metros (6 quadrados) uma da outra quando o jogador os tiver como alvos.', 
    classes: [C_BARD, C_SORC, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Invocar Elemental', level: 5, school: 'Conjuração', castingTime: '1 minuto', range: '27 metros', components: 'V, G, M (um incenso aceso para elemental do ar, argila mole para elemental da terra, enxofre e fósforo para elemental do fogo, ou água e areia para elemental da água)', duration: 'Concentração, dura até 1 hora', 
    description: 'O jogador invoca um servo elemental. O jogador escolhe uma área de ar, terra, fogo ou água, que preencha o equivalente a um cubo de 3 metros (2 quadrados) dentro do alcance. Um elemental de nível de desafio 5 ou menor, apropriado para área escolhida, surge em uma espaço desocupado dentro do área cúbica de 3 metros (2 quadrados). O elemental desaparece quando atinge 0 pontos de vida ou quando a magia encerra. O elemental é amigável ao jogador e aos seus companheiros enquanto a magia durar. O jogador rola a iniciativa para o elemental, o qual possui seu próprio turno. Ele obedece qualquer comando verbal que o jogador anuncie para ele (nenhuma ação é requerida do jogador. Se o jogador não emitir nenhum comando para o elemental, ele se defende de criaturas hostis, do contrário não faz ações. Se a concentração do jogador for quebrada, o elemental não desaparece. Ao invés disso, o jogador perde o controle sobre o elemental, e ele se torna hostil para o jogador e seus aliados, e pode atacá-los. Um elemental descontrolado não pode ser dispensado pelo jogador, e desaparece 1 hora após o jogador o ter invocado. Em níveis superiores. Quando o jogador lança esta magia usando o espaço de uma magia de 6º nível ou superior, o nível de desafio aumenta em 1 para cada nível acima do 5º.', 
    classes: [C_DRUID, C_WIZARD] 
  },
  { 
    name: 'Lendas e Histórias', level: 5, school: 'Adivinhação', castingTime: '10 minutos', range: 'O jogador', components: 'V, G, M (um incenso que valha ao menos 250 p.o., o qual é consumido pela magia, e um pedaço estreito e pequeno de ferro)', duration: 'Instantâneo', 
    description: 'O jogador nomeia ou descreve uma pessoa, lugar ou objeto. A magia traz à mente do jogador um breve sumário do significante conhecimento a respeito do coisa que o jogador nomeou. O conhecimento pode consistir de contos atuais, histórias esquecidas, ou mesmo conhecimentos secretos que nunca foram amplamente descobertos. Se a coisa que o jogador nomeou não tem importância lendária, o jogador não recebe nenhuma informação. Quanto mais informação o jogador já tiver sobre a coisa, mais precisa e detalhada será a informação recebida. A informação que o jogador descobre é precisa, mas pode ser revertida em uma linguagem figurativa.', 
    classes: [C_BARD, C_CLERIC, C_WIZARD] 
  },
  { 
    name: 'Ligação Telepática de Rary', level: 5, school: 'Adivinhação (ritual)', castingTime: '1 ação', range: '9 metros', components: 'V, G, M (pedaços de casca de ovo de dois tipos diferentes de criaturas)', duration: '1 hora', 
    description: 'O jogador forja um elo telepático entre até 8 criaturas voluntárias à sua escolha dentro do alcance, psiquicamente conectando cada criatura a todas as outras pela duração da magia. Criaturas com atributo de Inteligência 2 ou menos não são afetadas pela magia. Até a magia terminar, os alvos podem se comunicar telepaticamente através do vinculo, tendo eles ou não uma linguagem em comum. A comunicação é possível sob qualquer distância, embora ela não possa se estender para além de outros planos de existência.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Mão de Bigby', level: 5, school: 'Evocação', castingTime: '1 ação', range: '36 metros', components: 'V, G, M (uma casca de ovo e uma luva de pele de cobra)', duration: 'Concentração, dura até 1 minuto', 
    description: 'O jogador cria uma mão de força Grande transluzente. CA 20, PV = Max do jogador, For 26 (+8), Des 10 (+0). Move 18m como bônus. Efeitos: Punho Cerrado (4d8 força), Mão Vigorosa (Empurra 5 x mod + 1,5m), Aperto de Mão (2d6 + mod esmagamento, agarrar), Mão Interposta (Cobertura meia). Em níveis superiores: Dano aumenta (2d8 punho, 2d6 aperto) a cada nível acima do 5º.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Missão', level: 5, school: 'Encantamento', castingTime: '1 minuto', range: '18 metros', components: 'V', duration: '30 dias', 
    description: 'O jogador impõe um comando mágico em uma criatura que possa ver dentro do alcance, forçando ela a executar alguns serviços ou refrear alguma ação. Se a criatura puder entender o jogador, ela deve ser bem sucedida em um TR de Sabedoria ou ficará enfeitiçada. Enquanto enfeitiçada, ela recebe 5d10 de dano psíquico cada vez que agir de maneira diretamente contrária às instruções (1x/dia). Comandos suicidas encerram a magia. Duração aumenta com nível superior (até permanente no 9º).', 
    classes: [C_BARD, C_CLERIC, C_DRUID, C_PALADIN, C_WIZARD] 
  },
  { 
    name: 'Modificar Memória', level: 5, school: 'Encantamento', castingTime: '1 ação', range: '9 metros', components: 'V, G', duration: 'Concentração, dura até 1 minuto', 
    description: 'O jogador tenta refazer as memórias de outra criatura. TR Sabedoria (vantagem se em combate). Se falhar, alvo fica enfeitiçado e incapacitado. O jogador pode alterar memórias de um evento nas últimas 24h (duração máx 10 min). Níveis superiores permitem alterar memórias mais antigas (até qualquer tempo no 9º nível).', 
    classes: [C_BARD, C_WIZARD] 
  },
  { 
    name: 'Muralha de Energia', level: 5, school: 'Evocação', castingTime: '1 ação', range: '36 metros', components: 'V, G, M (uma pitada de pó gerado ao esmagar uma gema preciosa)', duration: 'Concentração, dura até 10 minutos', 
    description: 'Cria parede invisível e indestrutível. Pode ser domo/esfera (3m raio) ou superfície plana (10 painéis 3x3m). Imune a tudo exceto Desintegrar. Bloqueia passagem física e etérea.', 
    classes: [C_WIZARD] 
  },
  { 
    name: 'Muralha de Pedra', level: 5, school: 'Evocação', castingTime: '1 ação', range: '36 metros', components: 'V, G, M (um pequeno bloco de granito)', duration: 'Concentração, dura até 10 minutos', 
    description: 'Cria parede de pedra (15cm espessura). 10 painéis 3x3m ou painéis 3x6m (meia espessura). Se prender criatura, TR Destreza para escapar. Cada painel tem CA 15 e 30 PV/3cm. Se concentrar por 10 min, torna-se permanente.', 
    classes: [C_DRUID, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Névoa Mortal', level: 5, school: 'Conjuração', castingTime: '1 ação', range: '36 metros', components: 'V, G', duration: 'Concentração, dura até 10 minutos', 
    description: 'Esfera de 6m de raio de névoa venenosa. Ocultamento total. TR Constituição: 5d8 veneno (metade sucesso). Afeta quem não respira. Move-se 3m para longe do conjurador a cada turno. Escala: +1d8 por nível.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Praga de Insetos', level: 5, school: 'Conjuração', castingTime: '1 ação', range: '90 metros', components: 'V, G, M (alguns grãos de açúcar, alguns miolos de sementes, e um filete de gordura)', duration: 'Concentração, dura até 10 minutos', 
    description: 'Esfera de 6m de gafanhotos. Ocultamento parcial, terreno difícil. TR Constituição: 4d10 perfurante (metade sucesso). Escala: +1d10 por nível.', 
    classes: [C_CLERIC, C_DRUID, C_SORC] 
  },
  { 
    name: 'Punição Banidora', level: 5, school: 'Abjuração', castingTime: '1 ação bônus', range: 'O jogador', components: 'V', duration: 'Concentração, dura até 1 minuto', 
    description: 'Próximo ataque com arma: +5d10 força. Se alvo ficar com 50 PV ou menos, é banido (como a magia Banimento).', 
    classes: [C_PALADIN] 
  },
  { 
    name: 'Punição Destrutiva', level: 5, school: 'Evocação', castingTime: '1 ação', range: 'O jogador (9 metros de raio - 6 quadrados)', components: 'V', duration: 'Instantâneo', 
    description: 'Onda de choque. Escolha criaturas em 9m: TR Constituição. Falha: 5d6 trovão + 5d6 radiante/necrótico e derrubado. Sucesso: Metade e não cai.', 
    classes: [C_PALADIN] 
  },
  { 
    name: 'Reencarnação', level: 5, school: 'Transmutação', castingTime: '1 hora', range: 'Toque', components: 'V, G, M (óleos raros e unguentos que valham ao menos 1.000 p.o., os quais são consumidos pela magia)', duration: 'Instantâneo', 
    description: 'Toca humanoide morto (até 10 dias). Cria novo corpo adulto aleatório (rola d100 na tabela de reencarnação). Alma entra no novo corpo. Mantém memórias e capacidades mentais, troca atributos físicos e raciais.', 
    classes: [C_DRUID] 
  },
  { 
    name: 'Restauração Maior', level: 5, school: 'Abjuração', castingTime: '1 ação', range: 'Toque', components: 'V, G, M (pó de diamante que valha ao menos 100 p.o., que é consumido pela magia)', duration: 'Instantâneo', 
    description: 'Encerra um efeito: Exaustão (1 nível), Encantado, Petrificado, Maldição (incluindo sintonização), Redução de Atributo ou Redução de PV Máximo.', 
    classes: [C_BARD, C_CLERIC, C_DRUID] 
  },
  { 
    name: 'Reviver Mortos', level: 5, school: 'Necromancia', castingTime: '1 hora', range: 'Toque', components: 'V, G, M (um diamante que valha ao menos 500 p.o, que é consumido pela magia)', duration: 'Instantâneo', 
    description: 'Retorna criatura morta (até 10 dias). Cura ferimentos mortais (não repõe partes). Cura doenças não-mágicas (mágicas e maldições persistem). Penalidade -4 em tudo, reduz 1 por descanso longo.', 
    classes: [C_BARD, C_CLERIC, C_PALADIN] 
  },
  { 
    name: 'Santificar', level: 5, school: 'Evocação', castingTime: '24 horas', range: 'Toque', components: 'V, G, M (ervas, óleos, e incenso, que valham ao menos 1.000p.o., os quais são consumidos pela magia)', duration: 'Até ser dissipado', 
    description: 'Consagra área (18m raio). Bloqueia celestiais, elementais, fadas, demônios, mortos-vivos (não entram, não encantam/assustam/possuem). Escolha efeito extra: Coragem, Escuridão, Luz, Proteção Energia, Vulnerabilidade Energia, Descanso Eterno, Interferência Extradimensional, Medo, Silêncio, Idiomas.', 
    classes: [C_CLERIC] 
  },
  { 
    name: 'Similaridade', level: 5, school: 'Ilusão', castingTime: '1 ação', range: 'O jogador', components: 'V, G', duration: '8 horas', 
    description: 'Muda aparência de qualquer número de criaturas visíveis (30m). Mudança visual física, roupas, etc. TR Carisma nega (se não voluntário). Investigação contra CD revela.', 
    classes: [C_BARD, C_SORC, C_WIZARD] 
  },
  { 
    name: 'Sonho', level: 5, school: 'Ilusão', castingTime: '1 minuto', range: 'Especial', components: 'V, G, M (um punhado de areia, uma pincelada de tinta, e uma pena para escrita arrancada de um pássaro adormecido)', duration: '8 horas', 
    description: 'Mensageiro entra no sonho de alvo conhecido. Pode conversar e moldar sonho. Se escolher Pesadelo: alvo faz TR Sabedoria. Falha: 3d6 psíquico e não ganha benefícios do descanso.', 
    classes: [C_BARD, C_WARLOCK, C_WIZARD] 
  },
  { 
    name: 'Telecinésia', level: 5, school: 'Transmutação', castingTime: '1 ação', range: '18 metros', components: 'V, G', duration: 'Concentração, dura até 10 minutos', 
    description: 'Move criatura ou objeto (até 450kg). Criatura: Teste resistido Int vs Força. Se vencer, move 9m e prende. Objeto: Move 9m. Controle fino de objetos.', 
    classes: [C_SORC, C_WIZARD] 
  },
  { 
    name: 'Vidência', level: 5, school: 'Adivinhação', castingTime: '10 minutos', range: 'O jogador', components: 'V, G, M (um foco material que valha ao menos 1.000 p.o., tal como uma bola de cristal, um espelho de prata, ou uma fonte preenchida com água benta)', duration: 'Concentração, dura até 10 minutos', 
    description: 'Vê e ouve criatura no mesmo plano. TR Sabedoria (modificadores por conhecimento/conexão). Falha: sensor invisível segue alvo. Sucesso: imune por 24h.', 
    classes: [C_BARD, C_CLERIC, C_DRUID, C_WARLOCK, C_WIZARD] 
  }
];
