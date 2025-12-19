
import { Item } from '../types';

export type CompendiumItem = Omit<Item, 'id' | 'quantity' | 'equipped' | 'favorite'>;

// Função auxiliar para gerar URL de imagem
const getImg = (name: string) => `https://placehold.co/400x400/18181b/fbbf24?text=${encodeURIComponent(name.replace(/\s\(.*\)/, ''))}`;

export const WEAPONS: CompendiumItem[] = [
  // Simples Corpo a Corpo
  { name: 'Adaga', type: 'Arma', weight: 0.5, description: 'Uma lâmina curta de aço, perfeita para ocultação e ataques rápidos. Frequentemente usada como ferramenta de sobrevivência ou última linha de defesa.', damage: '1d4', damageType: 'Perfurante', properties: ['Acuidade', 'Leve', 'Arremesso (6/18m)'], imageUrl: getImg('Adaga') },
  { name: 'Adaga de Prata', type: 'Arma', weight: 0.5, description: 'Uma adaga banhada a prata, eficaz contra licantropos e certas criaturas sobrenaturais.', damage: '1d4', damageType: 'Perfurante', properties: ['Acuidade', 'Leve', 'Arremesso (6/18m)', 'Prateada'], imageUrl: getImg('Adaga Prata') },
  { name: 'Azagaia', type: 'Arma', weight: 1, description: 'Uma lança leve projetada para aerodinâmica, com ponta de ferro balanceada para arremessos precisos a média distância.', damage: '1d6', damageType: 'Perfurante', properties: ['Arremesso (9/36m)'], imageUrl: getImg('Azagaia') },
  { name: 'Bordão', type: 'Arma', weight: 2, description: 'Um bastão robusto de madeira de carvalho ou freixo, reforçado por anos de uso. Simples, mas letal nas mãos certas.', damage: '1d6', damageType: 'Contundente', properties: ['Versátil (1d8)'], imageUrl: getImg('Bordão') },
  { name: 'Clava', type: 'Arma', weight: 1, description: 'Um pedaço de madeira toscamente moldado, mais grosso em uma extremidade. A arma mais primitiva, mas eficaz.', damage: '1d4', damageType: 'Contundente', properties: ['Leve'], imageUrl: getImg('Clava') },
  { name: 'Clava Grande', type: 'Arma', weight: 5, description: 'Um tronco ou galho grosso, pesado o suficiente para esmagar ossos com um único golpe. Requer as duas mãos para ser manejada.', damage: '1d8', damageType: 'Contundente', properties: ['Duas Mãos'], imageUrl: getImg('Clava Grande') },
  { name: 'Foice', type: 'Arma', weight: 1, description: 'Lâmina curva agrícola. Leve.', damage: '1d4', damageType: 'Cortante', properties: ['Leve'], imageUrl: getImg('Foice') },
  { name: 'Lança', type: 'Arma', weight: 1.5, description: 'Uma haste de madeira com uma ponta de metal afiada. Versátil o suficiente para manter inimigos à distância ou ser arremessada.', damage: '1d6', damageType: 'Perfurante', properties: ['Arremesso (6/18m)', 'Versátil (1d8)'], imageUrl: getImg('Lança') },
  { name: 'Machadinha', type: 'Arma', weight: 1, description: 'Um machado pequeno com cabo curto, útil tanto para cortar lenha quanto para fender crânios em combate próximo.', damage: '1d6', damageType: 'Cortante', properties: ['Leve', 'Arremesso (6/18m)'], imageUrl: getImg('Machadinha') },
  { name: 'Martelo Leve', type: 'Arma', weight: 1, description: 'Um martelo menor com cabeça de metal, balanceado para arremesso. Comum entre anões e ferreiros.', damage: '1d4', damageType: 'Contundente', properties: ['Leve', 'Arremesso (6/18m)'], imageUrl: getImg('Martelo Leve') },
  { name: 'Maça', type: 'Arma', weight: 2, description: 'Uma cabeça de metal pesada, com flanges ou protuberâncias, montada em um cabo reforçado. Feita para amassar armaduras.', damage: '1d6', damageType: 'Contundente', properties: [], imageUrl: getImg('Maça') },
  { name: 'Nunchaku', type: 'Arma', weight: 1, description: 'Dois pedaços de madeira ligados por uma corrente ou corda. (Trata-se como Clava em regras gerais).', damage: '1d4', damageType: 'Contundente', properties: ['Leve'], imageUrl: getImg('Nunchaku') },

  // Simples à Distância
  { name: 'Arco Curto', type: 'Arma', weight: 1, description: 'Um arco pequeno feito de uma única peça de madeira flexível. Ideal para combate montado ou em espaços confinados.', damage: '1d6', damageType: 'Perfurante', properties: ['Munição (24/96m)', 'Duas Mãos'], imageUrl: getImg('Arco Curto') },
  { name: 'Besta Leve', type: 'Arma', weight: 2.5, description: 'Uma arma mecânica com um arco de aço montado em coronha de madeira. Fácil de usar, mas lenta para recarregar.', damage: '1d8', damageType: 'Perfurante', properties: ['Munição (24/96m)', 'Recarga', 'Duas Mãos'], imageUrl: getImg('Besta Leve') },
  { name: 'Funda', type: 'Arma', weight: 0, description: 'Uma simples tira de couro. Nas mãos de um mestre, transforma pedras comuns em projéteis mortais.', damage: '1d4', damageType: 'Contundente', properties: ['Munição (9/36m)'], imageUrl: getImg('Funda') },
  { name: 'Dardo', type: 'Arma', weight: 0.1, description: 'Uma flecha curta ponderada, projetada para ser arremessada com a mão com alta precisão.', damage: '1d4', damageType: 'Perfurante', properties: ['Acuidade', 'Arremesso (6/18m)'], imageUrl: getImg('Dardo') },

  // Marciais Corpo a Corpo
  { name: 'Alabarda', type: 'Arma', weight: 3, description: 'Uma haste longa terminada em uma lâmina de machado e uma ponta de lança. Mantém inimigos à distância.', damage: '1d10', damageType: 'Cortante', properties: ['Pesada', 'Alcance', 'Duas Mãos'], imageUrl: getImg('Alabarda') },
  { name: 'Cimitarra', type: 'Arma', weight: 1.5, description: 'Uma espada de lâmina curva, otimizada para cortes deslizantes a cavalo ou a pé. Leve e letal.', damage: '1d6', damageType: 'Cortante', properties: ['Acuidade', 'Leve'], imageUrl: getImg('Cimitarra') },
  { name: 'Chicote', type: 'Arma', weight: 1.5, description: 'Uma tira de couro trançado longa e flexível. Difícil de manejar, mas capaz de desarmar ou derrubar à distância.', damage: '1d4', damageType: 'Cortante', properties: ['Acuidade', 'Alcance'], imageUrl: getImg('Chicote') },
  { name: 'Espada Curta', type: 'Arma', weight: 1, description: 'Uma lâmina reta e compacta. Popular como arma secundária ou principal para combatentes ágeis.', damage: '1d6', damageType: 'Perfurante', properties: ['Acuidade', 'Leve'], imageUrl: getImg('Espada Curta') },
  { name: 'Espada Grande', type: 'Arma', weight: 3, description: 'Uma lâmina gigantesca, quase da altura de um homem. Projetada para varrer o campo de batalha.', damage: '2d6', damageType: 'Cortante', properties: ['Pesada', 'Duas Mãos'], imageUrl: getImg('Espada Grande') },
  { name: 'Espada Longa', type: 'Arma', weight: 1.5, description: 'A arma do cavaleiro por excelência. Lâmina reta de duplo fio, versátil o suficiente para uso com uma ou duas mãos.', damage: '1d8', damageType: 'Cortante', properties: ['Versátil (1d10)'], imageUrl: getImg('Espada Longa') },
  { name: 'Glaive', type: 'Arma', weight: 3, description: 'Uma lâmina curva montada na ponta de uma haste longa. Perfeita para cortes amplos à distância.', damage: '1d10', damageType: 'Cortante', properties: ['Pesada', 'Alcance', 'Duas Mãos'], imageUrl: getImg('Glaive') },
  { name: 'Katana', type: 'Arma', weight: 1.5, description: 'Espada tradicional de lâmina única ligeiramente curva. (Usa estatísticas de Espada Longa).', damage: '1d8', damageType: 'Cortante', properties: ['Versátil (1d10)'], imageUrl: getImg('Katana') },
  { name: 'Lança de Montaria', type: 'Arma', weight: 3, description: 'Uma lança extremamente longa e pesada, projetada para uso a cavalo em cargas devastadoras.', damage: '1d12', damageType: 'Perfurante', properties: ['Alcance', 'Especial'], imageUrl: getImg('Lança Montaria') },
  { name: 'Maça Estrela', type: 'Arma', weight: 2, description: 'Uma maça reforçada com espigões de metal, projetada para perfurar e esmagar simultaneamente.', damage: '1d8', damageType: 'Perfurante', properties: [], imageUrl: getImg('Maça Estrela') },
  { name: 'Machado de Batalha', type: 'Arma', weight: 2, description: 'Uma lâmina de aço larga em um cabo robusto. Capaz de decepar membros com um único golpe poderoso.', damage: '1d8', damageType: 'Cortante', properties: ['Versátil (1d10)'], imageUrl: getImg('Machado Batalha') },
  { name: 'Machado Grande', type: 'Arma', weight: 3.5, description: 'Um machado massivo de lâmina dupla. Requer força bruta para ser erguido, mas devasta tudo em seu caminho.', damage: '1d12', damageType: 'Cortante', properties: ['Pesada', 'Duas Mãos'], imageUrl: getImg('Machado Grande') },
  { name: 'Malho', type: 'Arma', weight: 5, description: 'Uma marreta de guerra com cabeça de ferro maciço. Esmaga armaduras pesadas como se fossem papel.', damage: '2d6', damageType: 'Contundente', properties: ['Pesada', 'Duas Mãos'], imageUrl: getImg('Malho') },
  { name: 'Mangual', type: 'Arma', weight: 1, description: 'Uma esfera de metal com espinhos presa a um cabo por uma corrente. Contorna escudos com facilidade.', damage: '1d8', damageType: 'Contundente', properties: [], imageUrl: getImg('Mangual') },
  { name: 'Martelo de Guerra', type: 'Arma', weight: 1, description: 'Uma cabeça de metal compacta em um cabo longo, com um espigão no reverso para perfurar armaduras.', damage: '1d8', damageType: 'Contundente', properties: ['Versátil (1d10)'], imageUrl: getImg('Martelo Guerra') },
  { name: 'Picareta de Guerra', type: 'Arma', weight: 1, description: 'Uma picareta militar com um bico longo e curvo, ideal para perfurar cotas de malha e placas.', damage: '1d8', damageType: 'Perfurante', properties: [], imageUrl: getImg('Picareta') },
  { name: 'Pique', type: 'Arma', weight: 9, description: 'Uma lança de infantaria excepcionalmente longa, usada para formar paredes de pontas contra cavalaria.', damage: '1d10', damageType: 'Perfurante', properties: ['Pesada', 'Alcance', 'Duas Mãos'], imageUrl: getImg('Pique') },
  { name: 'Rapieira', type: 'Arma', weight: 1, description: 'Uma lâmina fina e elegante com um copo de proteção complexo. Favorece a velocidade e precisão sobre a força bruta.', damage: '1d8', damageType: 'Perfurante', properties: ['Acuidade'], imageUrl: getImg('Rapieira') },
  { name: 'Tridente', type: 'Arma', weight: 2, description: 'Uma lança de três pontas, originalmente ferramenta de pesca, adaptada para prender e perfurar em combate.', damage: '1d6', damageType: 'Perfurante', properties: ['Arremesso (6/18m)', 'Versátil (1d8)'], imageUrl: getImg('Tridente') },
  { name: 'Wakizashi', type: 'Arma', weight: 1, description: 'Espada curta oriental, par da Katana. (Usa estatísticas de Cimitarra).', damage: '1d6', damageType: 'Cortante', properties: ['Acuidade', 'Leve'], imageUrl: getImg('Wakizashi') },
  
  // Marciais à Distância
  { name: 'Arco Longo', type: 'Arma', weight: 1, description: 'Um arco alto, quase da altura de um elfo. Possui alcance e potência superiores, exigindo força e técnica.', damage: '1d8', damageType: 'Perfurante', properties: ['Munição (45/180m)', 'Pesada', 'Duas Mãos'], imageUrl: getImg('Arco Longo') },
  { name: 'Besta Pesada', type: 'Arma', weight: 9, description: 'Uma arma de disparo massiva com mecanismo de manivela. Dispara virotes com força tremenda.', damage: '1d10', damageType: 'Perfurante', properties: ['Munição (30/120m)', 'Pesada', 'Recarga', 'Duas Mãos'], imageUrl: getImg('Besta Pesada') },
  { name: 'Besta de Mão', type: 'Arma', weight: 1.5, description: 'Uma besta compacta, frequentemente usada em par ou com um escudo. Favorita de drows e assassinos.', damage: '1d6', damageType: 'Perfurante', properties: ['Munição (9/36m)', 'Leve', 'Recarga'], imageUrl: getImg('Besta de Mão') },
  { name: 'Zarabatana', type: 'Arma', weight: 0.5, description: 'Um tubo longo para soprar agulhas, muitas vezes envenenadas. Arma silenciosa para ataques furtivos.', damage: '1', damageType: 'Perfurante', properties: ['Munição (7.5/30m)', 'Recarga'], imageUrl: getImg('Zarabatana') },
  { name: 'Rede', type: 'Arma', weight: 1.5, description: 'Uma malha de corda com pesos nas pontas. Usada para enredar e restringir o movimento de oponentes.', damage: '0', damageType: '-', properties: ['Arremesso (1.5/4.5m)', 'Especial'], imageUrl: getImg('Rede') },
  { name: 'Shuriken', type: 'Arma', weight: 0.1, description: 'Estrelas de arremesso afiadas. (Usa estatísticas de Dardo).', damage: '1d4', damageType: 'Perfurante', properties: ['Acuidade', 'Arremesso (6/18m)'], imageUrl: getImg('Shuriken') },
];

export const ARMOR: CompendiumItem[] = [
  // Leves
  { name: 'Acolchoada', type: 'Armadura', weight: 4, description: 'Camadas de tecido acolchoado e costurado. Oferece proteção mínima, mas é silenciosa e confortável. (Desvantagem Furtividade)', acBonus: 11, properties: ['Leve', 'Desv. Furtividade'], imageUrl: getImg('Acolchoada') },
  { name: 'Armadura de Couro', type: 'Armadura', weight: 5, description: 'Peitoral e ombreiras de couro endurecido em óleo fervente. Proteção padrão para aventureiros ágeis.', acBonus: 11, properties: ['Leve'], imageUrl: getImg('Couro') },
  { name: 'Armadura de Couro Batido', type: 'Armadura', weight: 6.5, description: 'Couro robusto reforçado com rebites de metal ou espigões, oferecendo maior resistência a cortes.', acBonus: 12, properties: ['Leve'], imageUrl: getImg('Couro Batido') },
  { name: 'Couro Cravejado', type: 'Armadura', weight: 6.5, description: 'Variante reforçada com cravos de metal. (Mesmo que Couro Batido).', acBonus: 12, properties: ['Leve'], imageUrl: getImg('Couro Cravejado') },
  
  // Médias
  { name: 'Gibão de Peles', type: 'Armadura', weight: 6, description: 'Armadura rústica feita de peles grossas e pelos de bestas. Comum entre bárbaros e tribos do norte.', acBonus: 12, properties: ['Média'], imageUrl: getImg('Peles') },
  { name: 'Camisão de Malha', type: 'Armadura', weight: 10, description: 'Uma camisa de anéis de metal entrelaçados usada entre camadas de tecido. Pode ser usada discretamente.', acBonus: 13, properties: ['Média'], imageUrl: getImg('Camisão Malha') },
  { name: 'Brunea', type: 'Armadura', weight: 22.5, description: 'Armadura de couro coberta com anéis de metal sobrepostos como escamas. Barulhenta, mas protetora.', acBonus: 14, properties: ['Média', 'Desv. Furtividade'], imageUrl: getImg('Brunea') },
  { name: 'Loriga de Escamas', type: 'Armadura', weight: 22.5, description: 'Peças metálicas em formato de escamas. (Mesmo que Brunea).', acBonus: 14, properties: ['Média', 'Desv. Furtividade'], imageUrl: getImg('Loriga Escamas') },
  { name: 'Peitoral', type: 'Armadura', weight: 10, description: 'Uma peça única de metal moldada para proteger o torso, combinada com couro flexível para os membros.', acBonus: 14, properties: ['Média'], imageUrl: getImg('Peitoral') },
  { name: 'Meia-Armadura', type: 'Armadura', weight: 20, description: 'Placas de metal moldadas cobrindo a maior parte do corpo vital, deixando as pernas com proteção mais leve.', acBonus: 15, properties: ['Média', 'Desv. Furtividade'], imageUrl: getImg('Meia-Armadura') },
  
  // Pesadas
  { name: 'Cota de Anéis', type: 'Armadura', weight: 20, description: 'Couro pesado com anéis de metal costurados sobre ele. Inferior à cota de malha, mas mais barata.', acBonus: 14, properties: ['Pesada', 'Desv. Furtividade'], imageUrl: getImg('Cota de Anéis') },
  { name: 'Cota de Malha', type: 'Armadura', weight: 27.5, description: 'Uma armadura completa feita de anéis de metal entrelaçados. Pesada e barulhenta, mas excelente proteção.', acBonus: 16, properties: ['Pesada', 'Força 13', 'Desv. Furtividade'], imageUrl: getImg('Cota de Malha') },
  { name: 'Cota de Talas', type: 'Armadura', weight: 30, description: 'Tiras verticais de metal rebitadas em um suporte de couro, protegendo as articulações com cota de malha.', acBonus: 17, properties: ['Pesada', 'Força 15', 'Desv. Furtividade'], imageUrl: getImg('Cota de Talas') },
  { name: 'Loriga Segmentada', type: 'Armadura', weight: 30, description: 'Tiras de metal horizontais sobrepostas. (Mesmo que Cota de Talas).', acBonus: 17, properties: ['Pesada', 'Força 15', 'Desv. Furtividade'], imageUrl: getImg('Loriga Segmentada') },
  { name: 'Armadura de Placas', type: 'Armadura', weight: 32.5, description: 'O ápice da proteção mundana. Placas de aço moldadas e interligadas cobrindo todo o corpo. Uma fortaleza ambulante.', acBonus: 18, properties: ['Pesada', 'Força 15', 'Desv. Furtividade'], imageUrl: getImg('Placas') },
  
  // Escudos
  { name: 'Escudo', type: 'Escudo', weight: 3, description: 'Feito de madeira reforçada com metal ou inteiramente de aço. Pode ostentar o brasão de uma casa ou divindade.', acBonus: 2, properties: [], imageUrl: getImg('Escudo') },
];

export const CLOTHING: CompendiumItem[] = [
    // Vestuário e Itens de "Slots" que não dão AC em D&D 5e (Item Type), ou armaduras cosméticas
    { name: 'Roupas Comuns', type: 'Roupas', weight: 1.5, description: 'Uma camisa simples, calças de tecido grosseiro e botas simples.', properties: [], imageUrl: getImg('Roupas Comuns') },
    { name: 'Roupas de Viajante', type: 'Roupas', weight: 2, description: 'Botas robustas, saia ou calças de lã, camisa resistente, jaqueta e capa com capuz.', properties: [], imageUrl: getImg('Roupas Viajante') },
    { name: 'Roupas Finas', type: 'Roupas', weight: 3, description: 'Roupas de tecidos caros como seda e veludo, adornadas com joias ou bordados.', properties: [], imageUrl: getImg('Roupas Finas') },
    { name: 'Vestes', type: 'Roupas', weight: 2, description: 'Túnicas simples ou elaboradas, comuns entre clérigos e magos.', properties: [], imageUrl: getImg('Vestes') },
    
    // Itens de Cabeça (Sem bônus mecânico em 5e RAW, exceto mágicos, mas listados como Equipamento)
    { name: 'Elmo de Ferro', type: 'Capacete', weight: 1.5, description: 'Um capacete de aço simples para proteção da cabeça.', imageUrl: getImg('Elmo Ferro') },
    { name: 'Capuz de Couro', type: 'Capacete', weight: 0.5, description: 'Um capuz resistente que cobre a cabeça e o pescoço.', imageUrl: getImg('Capuz Couro') },
    { name: 'Chapéu de Mago', type: 'Capacete', weight: 0.2, description: 'Um chapéu pontudo clássico com aba larga.', imageUrl: getImg('Chapéu Mago') },
    { name: 'Diadema', type: 'Capacete', weight: 0.1, description: 'Uma faixa de metal precioso usada na testa.', imageUrl: getImg('Diadema') },
    { name: 'Coroa de Louros', type: 'Capacete', weight: 0.1, description: 'Símbolo de vitória ou status.', imageUrl: getImg('Coroa Louros') },

    // Pés
    { name: 'Botas de Montaria', type: 'Botas', weight: 1, description: 'Botas de couro altas até o joelho.', imageUrl: getImg('Botas Montaria') },
    { name: 'Sapatos Comuns', type: 'Botas', weight: 0.5, description: 'Calçados simples de couro ou tecido.', imageUrl: getImg('Sapatos') },
    { name: 'Botas de Inverno', type: 'Botas', weight: 1.5, description: 'Botas forradas com pele para climas frios.', imageUrl: getImg('Botas Inverno') },
    
    // Mãos
    { name: 'Luvas de Couro', type: 'Luvas', weight: 0.2, description: 'Luvas resistentes para trabalho ou aventura.', imageUrl: getImg('Luvas Couro') },
    { name: 'Manoplas de Ferro', type: 'Luvas', weight: 0.5, description: 'Proteção pesada para as mãos.', imageUrl: getImg('Manoplas') },
    { name: 'Munhequeiras', type: 'Luvas', weight: 0.2, description: 'Faixas de couro para proteção do pulso.', imageUrl: getImg('Munhequeiras') },

    // Acessórios (Capa, Anéis, Amuletos)
    { name: 'Capa de Viajante', type: 'Capa', weight: 1, description: 'Uma capa com capuz para proteção contra chuva e frio.', imageUrl: getImg('Capa Viajante') },
    { name: 'Manto de Seda', type: 'Capa', weight: 0.5, description: 'Um manto leve e elegante.', imageUrl: getImg('Manto Seda') },
    { name: 'Anel de Sinete', type: 'Anel', weight: 0, description: 'Anel usado para selar cartas com cera.', imageUrl: getImg('Anel Sinete') },
    { name: 'Amuleto Sagrado', type: 'Amuleto', weight: 0.1, description: 'Um pingente representando uma divindade.', imageUrl: getImg('Amuleto') },
    { name: 'Colar de Contas', type: 'Amuleto', weight: 0.1, description: 'Adorno simples.', imageUrl: getImg('Colar') },
];

export const GEAR: CompendiumItem[] = [
  // Equipamento de Aventura Básico
  { name: 'Mochila', type: 'Item', weight: 2.5, description: 'Mochila de couro resistente com vários compartimentos e correias para prender equipamento externo.', imageUrl: getImg('Mochila') },
  { name: 'Corda de Cânhamo (15m)', type: 'Item', weight: 5, description: 'Corda grossa e áspera, essencial para escaladas e amarras. Resistente, mas pesada.', imageUrl: getImg('Corda Cânhamo') },
  { name: 'Corda de Seda (15m)', type: 'Item', weight: 2.5, description: 'Corda fina, leve e incrivelmente resistente, trançada com seda de aranha ou bicho-da-seda.', imageUrl: getImg('Corda Seda') },
  { name: 'Tocha', type: 'Item', weight: 0.5, description: 'Bastão de madeira com a ponta embebida em piche. Queima por 1 hora, iluminando a escuridão.', imageUrl: getImg('Tocha') },
  { name: 'Rações de Viagem (1 dia)', type: 'Item', weight: 1, description: 'Biscoitos duros, carne seca, nozes e frutas secas. Sabor questionável, mas mantém você vivo.', imageUrl: getImg('Rações') },
  { name: 'Saco de Dormir', type: 'Item', weight: 3.5, description: 'Um rolo de acolchoado quente e impermeável, essencial para noites frias ao relento.', imageUrl: getImg('Saco Dormir') },
  { name: 'Cantil', type: 'Item', weight: 2.5, description: 'Odre de couro ou metal para água ou vinho. Capacidade para 2 litros.', imageUrl: getImg('Cantil') },
  { name: 'Pederneira e Isqueiro', type: 'Item', weight: 0, description: 'Um pedaço de aço e uma pedra de sílex para criar faíscas e acender fogueiras.', imageUrl: getImg('Pederneira') },
  { name: 'Algemas', type: 'Item', weight: 3, description: 'Grilhões de ferro pesado com uma chave simples. Difíceis de quebrar ou escapar.', imageUrl: getImg('Algemas') },
  { name: 'Arpéu', type: 'Item', weight: 2, description: 'Gancho de metal com várias pontas, usado na ponta de uma corda para ancoragem em escaladas.', imageUrl: getImg('Arpéu') },
  { name: 'Pé de Cabra', type: 'Item', weight: 2.5, description: 'Barra de ferro curvada, a melhor amiga de quem precisa abrir caixas ou portas emperradas.', imageUrl: getImg('Pé de Cabra') },
  { name: 'Martelo', type: 'Item', weight: 1.5, description: 'Martelo de ferramenta, útil para pregar pítons ou pequenos consertos.', imageUrl: getImg('Martelo') },
  { name: 'Píton', type: 'Item', weight: 0.25, description: 'Espigão de metal com um olhal, para ser martelado em fendas de rocha como âncora.', imageUrl: getImg('Píton') },
  { name: 'Lanterna Furta-Fogo', type: 'Item', weight: 1, description: 'Lanterna de metal com portinhola para direcionar ou ocultar a luz sem apagá-la.', imageUrl: getImg('Lanterna Furta') },
  { name: 'Lanterna com Capuz', type: 'Item', weight: 1, description: 'Lanterna padrão que projeta luz em todas as direções ou pode ser fechada para penumbra.', imageUrl: getImg('Lanterna Capuz') },
  { name: 'Óleo (Frasco)', type: 'Item', weight: 0.5, description: 'Combustível para lanternas. Pode ser espalhado e aceso para causar dano de fogo.', imageUrl: getImg('Óleo') },
  { name: 'Vela', type: 'Item', weight: 0, description: 'Vela de cera simples. Iluminação mínima, mas barata e leve.', imageUrl: getImg('Vela') },
  { name: 'Sinete', type: 'Item', weight: 0, description: 'Selo de metal ou pedra com um brasão ou símbolo, usado para marcar cera quente.', imageUrl: getImg('Sinete') },
  { name: 'Cera de Lacre', type: 'Item', weight: 0, description: 'Bastão de cera vermelha para selar cartas e documentos oficiais.', imageUrl: getImg('Cera Lacre') },
  { name: 'Giz (1 peça)', type: 'Item', weight: 0, description: 'Pedaço de giz branco, útil para marcar caminhos em labirintos ou masmorras.', imageUrl: getImg('Giz') },
  { name: 'Pergaminho (folha)', type: 'Item', weight: 0, description: 'Pele de animal tratada para escrita. Mais durável que papel.', imageUrl: getImg('Pergaminho') },
  { name: 'Tinta (frasco)', type: 'Item', weight: 0, description: 'Frasco de vidro com tinta preta padrão para escrita.', imageUrl: getImg('Tinta') },
  { name: 'Caneta Tinteiro', type: 'Item', weight: 0, description: 'Pena de ave aparada para escrita.', imageUrl: getImg('Pena') },
  { name: 'Sabão', type: 'Item', weight: 0, description: 'Bloco de sabão. Higiene é importante, mesmo em masmorras.', imageUrl: getImg('Sabão') },
  { name: 'Apito de Sinalização', type: 'Item', weight: 0, description: 'Pequeno apito de madeira ou metal com som agudo e penetrante.', imageUrl: getImg('Apito') },
  { name: 'Baú', type: 'Item', weight: 12, description: 'Baú de madeira reforçado com ferro. Capacidade 300 litros. Pode ser trancado.', imageUrl: getImg('Baú') },
  { name: 'Fechadura', type: 'Item', weight: 0.5, description: 'Cadeado de ferro com chave. Mecanismo simples.', imageUrl: getImg('Fechadura') },
  { name: 'Luneta', type: 'Item', weight: 0.5, description: 'Instrumento óptico de latão e lentes de vidro. Magnifica objetos distantes.', imageUrl: getImg('Luneta') },
  { name: 'Lupa', type: 'Item', weight: 0, description: 'Lente de aumento com cabo. Útil para inspeção de detalhes ou acender fogo com sol.', imageUrl: getImg('Lupa') },
  { name: 'Barraca (2 pessoas)', type: 'Item', weight: 10, description: 'Tenda de lona simples e estacas. Abrigo básico contra o clima.', imageUrl: getImg('Barraca') },
  { name: 'Espelho de Aço', type: 'Item', weight: 0.25, description: 'Placa de metal polido. Útil para ver esquinas ou sinalizar com luz.', imageUrl: getImg('Espelho') },
  { name: 'Sacola', type: 'Item', weight: 0.25, description: 'Saco de pano simples com cordão. Carrega itens variados.', imageUrl: getImg('Sacola') },
  { name: 'Algibeira', type: 'Item', weight: 0.5, description: 'Pequena bolsa de couro para cinto, ideal para guardar moedas e gemas.', imageUrl: getImg('Algibeira') },
  { name: 'Abrojos (bolsa de 20)', type: 'Item', weight: 1, description: 'Pequenos espinhos de metal de quatro pontas. Espalhe no chão para ferir pés e desacelerar inimigos.', imageUrl: getImg('Abrojos') },
  { name: 'Esferas (1.000)', type: 'Item', weight: 1, description: 'Saco com pequenas esferas de metal polido. Causa quedas em quem pisar nelas.', imageUrl: getImg('Esferas') },
  { name: 'Aríete Portátil', type: 'Item', weight: 16, description: 'Tora reforçada com alças e cabeça de ferro. Bônus massivo para arrombar portas.', imageUrl: getImg('Aríete') },
  { name: 'Equipamento de Pesca', type: 'Item', weight: 2, description: 'Vara simples, linha de seda, anzóis e iscas artificiais.', imageUrl: getImg('Pesca') },
  { name: 'Livro', type: 'Item', weight: 2.5, description: 'Livro encadernado em couro com páginas de pergaminho. Pode estar em branco ou conter saber.', imageUrl: getImg('Livro') },
  
  // Itens Especiais / Consumíveis
  { name: 'Poção de Cura', type: 'Item', weight: 0.25, description: 'Líquido vermelho rubi que brilha levemente. Cura ferimentos instantaneamente (2d4+2).', imageUrl: getImg('Poção Cura') },
  { name: 'Poção de Cura Maior', type: 'Item', weight: 0.25, description: 'Versão mais potente, com líquido vermelho denso e fios dourados. Cura 4d4+4.', imageUrl: getImg('Cura Maior') },
  { name: 'Antitoxina', type: 'Item', weight: 0, description: 'Frasco com líquido turvo e gosto amargo. Garante vantagem contra venenos.', imageUrl: getImg('Antitoxina') },
  { name: 'Ácido (frasco)', type: 'Item', weight: 0.5, description: 'Frasco de vidro com ácido corrosivo. Quebra no impacto queimando o alvo.', imageUrl: getImg('Ácido') },
  { name: 'Água Benta (frasco)', type: 'Item', weight: 0.5, description: 'Água consagrada por rituais divinos. Queima mortos-vivos e corruptores como ácido.', imageUrl: getImg('Água Benta') },
  { name: 'Fogo Alquímico', type: 'Item', weight: 0.5, description: 'Substância volátil e pegajosa que se incendeia em contato com o ar. Causa dano contínuo.', imageUrl: getImg('Fogo Alquímico') },
  { name: 'Veneno Básico', type: 'Item', weight: 0, description: 'Frasco preto com veneno para cobrir armas. Causa dano extra e enjoo.', imageUrl: getImg('Veneno') },
  { name: 'Kit de Primeiros Socorros', type: 'Item', weight: 1.5, description: 'Bolsa com bandagens, unguentos e talas. Estabiliza moribundos.', imageUrl: getImg('Primeiros Socorros') },
];

export const TOOLS: CompendiumItem[] = [
  // Ferramentas de Artesão
  { name: 'Suprimentos de Alquimista', type: 'Ferramenta', weight: 4, description: 'Vidrarias, almofariz, pilão e ingredientes básicos para criar poções.', imageUrl: getImg('Alquimia') },
  { name: 'Suprimentos de Cervejeiro', type: 'Ferramenta', weight: 4.5, description: 'Barris pequenos, lúpulo e sifões para fermentação.', imageUrl: getImg('Cervejeiro') },
  { name: 'Suprimentos de Caligrafia', type: 'Ferramenta', weight: 2.5, description: 'Tintas de qualidade, penas variadas e pergaminhos finos.', imageUrl: getImg('Caligrafia') },
  { name: 'Ferramentas de Carpinteiro', type: 'Ferramenta', weight: 3, description: 'Serras, martelos, pregos e plainas para trabalhar madeira.', imageUrl: getImg('Carpinteiro') },
  { name: 'Ferramentas de Cartógrafo', type: 'Ferramenta', weight: 3, description: 'Compassos, réguas, tintas e pergaminhos para mapas precisos.', imageUrl: getImg('Cartógrafo') },
  { name: 'Ferramentas de Sapateiro', type: 'Ferramenta', weight: 2.5, description: 'Formas, agulhas grossas e couro para calçados.', imageUrl: getImg('Sapateiro') },
  { name: 'Utensílios de Cozinheiro', type: 'Ferramenta', weight: 4, description: 'Panelas de ferro, facas afiadas e temperos variados.', imageUrl: getImg('Cozinheiro') },
  { name: 'Ferramentas de Vidreiro', type: 'Ferramenta', weight: 2.5, description: 'Tubos de sopro e pinças para moldar vidro quente.', imageUrl: getImg('Vidreiro') },
  { name: 'Ferramentas de Joalheiro', type: 'Ferramenta', weight: 1, description: 'Pinças delicadas, lupas e limas para gemas e metais nobres.', imageUrl: getImg('Joalheiro') },
  { name: 'Ferramentas de Coureiro', type: 'Ferramenta', weight: 2.5, description: 'Facas de corte, furadores e tinturas para trabalhar couro.', imageUrl: getImg('Coureiro') },
  { name: 'Ferramentas de Pedreiro', type: 'Ferramenta', weight: 4, description: 'Cinóiles, marretas e espátulas para alvenaria.', imageUrl: getImg('Pedreiro') },
  { name: 'Suprimentos de Pintor', type: 'Ferramenta', weight: 2.5, description: 'Pincéis, óleos, tintas e telas.', imageUrl: getImg('Pintor') },
  { name: 'Ferramentas de Oleiro', type: 'Ferramenta', weight: 1.5, description: 'Roda de oleiro, espátulas e argila.', imageUrl: getImg('Oleiro') },
  { name: 'Ferramentas de Ferreiro', type: 'Ferramenta', weight: 4, description: 'Martelos pesados, tenazes e bigorna portátil.', imageUrl: getImg('Ferreiro') },
  { name: 'Ferramentas de Latoeiro', type: 'Ferramenta', weight: 5, description: 'Ferramentas para reparar panelas e utensílios domésticos.', imageUrl: getImg('Latoeiro') },
  { name: 'Ferramentas de Tecelão', type: 'Ferramenta', weight: 2.5, description: 'Fios, agulhas de tricô e pequeno tear.', imageUrl: getImg('Tecelão') },
  { name: 'Ferramentas de Entalhador', type: 'Ferramenta', weight: 2.5, description: 'Goivas e facas para esculpir madeira detalhada.', imageUrl: getImg('Entalhador') },
  
  // Kits Especiais e Jogos
  { name: 'Kit de Disfarce', type: 'Ferramenta', weight: 1.5, description: 'Maquiagem, perucas e próteses para alterar a aparência.', imageUrl: getImg('Disfarce') },
  { name: 'Kit de Falsificação', type: 'Ferramenta', weight: 2.5, description: 'Papéis texturizados, sinetes falsos e tintas para documentos forjados.', imageUrl: getImg('Falsificação') },
  { name: 'Kit de Herbalismo', type: 'Ferramenta', weight: 1.5, description: 'Tesouras de poda, almofariz e bolsas para colher e processar ervas.', imageUrl: getImg('Herbalismo') },
  { name: 'Ferramentas de Navegador', type: 'Ferramenta', weight: 1, description: 'Sextante, astrolábio e tabelas de marés.', imageUrl: getImg('Navegador') },
  { name: 'Kit de Venenos', type: 'Ferramenta', weight: 1, description: 'Frascos, pipetas e extratos perigosos. Manuseie com cuidado.', imageUrl: getImg('Venenos') },
  { name: 'Ferramentas de Ladrão', type: 'Ferramenta', weight: 0.5, description: 'Gazuas, limas e espelho pequeno. Essencial para abrir fechaduras e desarmar armadilhas.', imageUrl: getImg('Ladrão') },
  { name: 'Baralho de Cartas', type: 'Ferramenta', weight: 0, description: 'Baralho padrão ou de Tarokka. Entretenimento ou aposta.', imageUrl: getImg('Cartas') },
  { name: 'Jogo de Dados', type: 'Ferramenta', weight: 0, description: 'Conjunto de dados de osso ou marfim.', imageUrl: getImg('Dados') },
  { name: 'Xadrez de Dragão', type: 'Ferramenta', weight: 0.5, description: 'Tabuleiro e peças detalhadas representando exércitos e dragões.', imageUrl: getImg('Xadrez') },

  // Instrumentos Musicais
  { name: 'Gaita de Foles', type: 'Ferramenta', weight: 3, description: 'Instrumento de sopro tradicional com som potente e contínuo.', imageUrl: getImg('Gaita') },
  { name: 'Tambor', type: 'Ferramenta', weight: 1.5, description: 'Instrumento de percussão para marcar ritmo de marcha ou música.', imageUrl: getImg('Tambor') },
  { name: 'Dulcimer', type: 'Ferramenta', weight: 5, description: 'Instrumento de cordas percutidas com som etéreo.', imageUrl: getImg('Dulcimer') },
  { name: 'Flauta', type: 'Ferramenta', weight: 0.5, description: 'Tubo de madeira simples, produz melodias suaves.', imageUrl: getImg('Flauta') },
  { name: 'Alaúde', type: 'Ferramenta', weight: 1, description: 'O favorito dos bardos. Instrumento de cordas versátil e popular.', imageUrl: getImg('Alaúde') },
  { name: 'Lira', type: 'Ferramenta', weight: 1, description: 'Pequena harpa portátil, clássica e elegante.', imageUrl: getImg('Lira') },
  { name: 'Trombeta', type: 'Ferramenta', weight: 1, description: 'Instrumento de metal para fanfarras e sinais.', imageUrl: getImg('Trombeta') },
  { name: 'Flauta de Pã', type: 'Ferramenta', weight: 1, description: 'Conjunto de tubos de comprimentos variados. Som rústico e natural.', imageUrl: getImg('Flauta Pã') },
  { name: 'Charamela', type: 'Ferramenta', weight: 0.5, description: 'Instrumento de sopro de palheta dupla com som anasalado.', imageUrl: getImg('Charamela') },
  { name: 'Viola', type: 'Ferramenta', weight: 0.5, description: 'Instrumento de cordas friccionadas, similar ao violino mas com som mais grave.', imageUrl: getImg('Viola') },
];

export const EXTRAS: CompendiumItem[] = [
  // Focos Arcanos e Similares
  { name: 'Foco Arcano (Cristal)', type: 'Foco', weight: 0.5, description: 'Cristal lapidado que canaliza energia mágica bruta.', imageUrl: getImg('Foco Cristal') },
  { name: 'Foco Arcano (Orbe)', type: 'Foco', weight: 1.5, description: 'Esfera de vidro ou cristal perfeitamente polida.', imageUrl: getImg('Foco Orbe') },
  { name: 'Foco Arcano (Cajado)', type: 'Foco', weight: 2, description: 'Bastão longo de madeira nobre, muitas vezes com gemas ou runas.', imageUrl: getImg('Foco Cajado') },
  { name: 'Foco Arcano (Varinha)', type: 'Foco', weight: 0.5, description: 'Vara fina de madeira ou metal condutor de magia.', imageUrl: getImg('Foco Varinha') },
  { name: 'Foco Druídico (Visco)', type: 'Foco', weight: 0, description: 'Ramo de planta sagrada colhida sob a lua.', imageUrl: getImg('Foco Visco') },
  { name: 'Foco Druídico (Totem)', type: 'Foco', weight: 0, description: 'Pequeno objeto esculpido representando um espírito animal.', imageUrl: getImg('Foco Totem') },
  { name: 'Foco Druídico (Teixo)', type: 'Foco', weight: 0.5, description: 'Varinha feita de madeira de teixo sagrada.', imageUrl: getImg('Foco Teixo') },
  { name: 'Símbolo Sagrado (Amuleto)', type: 'Foco', weight: 0.5, description: 'Pingente com o símbolo de uma divindade.', imageUrl: getImg('Símbolo Amuleto') },
  { name: 'Símbolo Sagrado (Emblema)', type: 'Foco', weight: 0, description: 'Símbolo divino gravado em escudo ou armadura.', imageUrl: getImg('Símbolo Emblema') },
  { name: 'Símbolo Sagrado (Relicário)', type: 'Foco', weight: 1, description: 'Pequena caixa contendo uma relíquia sagrada.', imageUrl: getImg('Símbolo Relicário') },
  { name: 'Bolsa de Componentes', type: 'Foco', weight: 1, description: 'Bolsa de couro com compartimentos para areia, pó, e ingredientes mágicos mundanos.', imageUrl: getImg('Componentes') },
  
  // Munições
  { name: 'Flechas (20)', type: 'Munição', weight: 0.5, description: 'Aljava com 20 flechas de ponta de ferro e penas de ganso.', imageUrl: getImg('Flechas') },
  { name: 'Virotes (20)', type: 'Munição', weight: 0.75, description: 'Estojo com 20 virotes curtos e grossos para bestas.', imageUrl: getImg('Virotes') },
  { name: 'Balas de Funda (20)', type: 'Munição', weight: 0.75, description: 'Bolsa com 20 esferas de chumbo lisas.', imageUrl: getImg('Balas Funda') },
  { name: 'Agulhas (50)', type: 'Munição', weight: 0.5, description: 'Estojo com 50 agulhas finas para zarabatana.', imageUrl: getImg('Agulhas') },
];

export const ALL_ITEMS = [...WEAPONS, ...ARMOR, ...CLOTHING, ...GEAR, ...TOOLS, ...EXTRAS].sort((a, b) => a.name.localeCompare(b.name));
