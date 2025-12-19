
import { RaceDefinition, Attribute } from '../types';

export const RACES: Record<string, RaceDefinition> = {
    'Humano': {
        name: 'Humano', speed: 9, size: 'Médio',
        abilityBonuses: { [Attribute.STR]: 1, [Attribute.DEX]: 1, [Attribute.CON]: 1, [Attribute.INT]: 1, [Attribute.WIS]: 1, [Attribute.CHA]: 1 },
        features: [
            { name: 'Idiomas', description: 'Você pode falar, ler e escrever Comum e um idioma adicional à sua escolha.' }
        ]
    },
    'Anão da Colina': {
        name: 'Anão da Colina', speed: 7.5, size: 'Médio',
        abilityBonuses: { [Attribute.CON]: 2, [Attribute.WIS]: 1 },
        features: [
            { name: 'Visão no Escuro', description: 'Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra.' },
            { name: 'Resiliência Anã', description: 'Você tem vantagem em testes de resistência contra veneno e resistência contra dano de veneno.' },
            { name: 'Treinamento Anão em Combate', description: 'Você tem proficiência com machados de batalha, machadinha, martelos leves e martelos de guerra.' },
            { name: 'Proficiência com Ferramentas', description: 'Você tem proficiência em uma ferramenta de artesão à sua escolha: ferramentas de ferreiro, suprimentos de cervejeiro ou ferramentas de pedreiro.' },
            { name: 'Especialização em Rochas', description: 'Sempre que você realizar um teste de Inteligência (História) relacionado à origem de um trabalho em pedra, você é considerado proficiente na perícia História e adiciona o dobro do seu bônus de proficiência ao teste.' },
            { 
                name: 'Tenacidade Anã', 
                description: 'Seus pontos de vida máximos aumentam em 1, e aumentam em 1 sempre que você ganha um nível.',
                modifiers: [{ type: 'bonus', target: 'hp_per_level', value: 1 }]
            }
        ]
    },
    'Anão da Montanha': {
        name: 'Anão da Montanha', speed: 7.5, size: 'Médio',
        abilityBonuses: { [Attribute.CON]: 2, [Attribute.STR]: 2 },
        features: [
            { name: 'Visão no Escuro', description: 'Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra.' },
            { name: 'Resiliência Anã', description: 'Você tem vantagem em testes de resistência contra veneno e resistência contra dano de veneno.' },
            { name: 'Treinamento Anão em Combate', description: 'Você tem proficiência com machados de batalha, machadinha, martelos leves e martelos de guerra.' },
            { name: 'Proficiência com Ferramentas', description: 'Você tem proficiência em uma ferramenta de artesão à sua escolha: ferramentas de ferreiro, suprimentos de cervejeiro ou ferramentas de pedreiro.' },
            { name: 'Especialização em Rochas', description: 'Vantagem/Dobro proficiência em História relacionado a rochas.' },
            { 
                name: 'Treinamento em Armaduras Anão', 
                description: 'Você tem proficiência em armaduras leves e médias.',
                modifiers: [
                    { type: 'proficiency', target: 'armor_proficiency', subtarget: 'light' },
                    { type: 'proficiency', target: 'armor_proficiency', subtarget: 'medium' }
                ]
            }
        ]
    },
    'Alto Elfo': {
        name: 'Alto Elfo', speed: 9, size: 'Médio',
        abilityBonuses: { [Attribute.DEX]: 2, [Attribute.INT]: 1 },
        features: [
            { name: 'Visão no Escuro', description: '18m de visão no escuro.' },
            { 
                name: 'Sentidos Aguçados', 
                description: 'Você tem proficiência na perícia Percepção.',
                modifiers: [{ type: 'proficiency', target: 'skill', subtarget: 'Percepção' }]
            },
            { name: 'Ancestral Feérico', description: 'Você tem vantagem em testes de resistência contra ser enfeitiçado e magia não pode colocá-lo para dormir.' },
            { name: 'Transe', description: 'Elfos não precisam dormir. Em vez disso, meditam profundamente por 4 horas por dia.' },
            { name: 'Treinamento Élfico com Armas', description: 'Proficiência com espadas longas, espadas curtas, arcos curtos e arcos longos.' },
            { name: 'Truque', description: 'Você conhece um truque da lista de magias de mago. Inteligência é sua habilidade de conjuração para ele.' },
            { name: 'Idioma Extra', description: 'Você pode falar, ler e escrever um idioma adicional à sua escolha.' }
        ]
    },
    'Elfo da Floresta': {
        name: 'Elfo da Floresta', speed: 10.5, size: 'Médio',
        abilityBonuses: { [Attribute.DEX]: 2, [Attribute.WIS]: 1 },
        features: [
            { name: 'Visão no Escuro', description: '18m de visão no escuro.' },
            { 
                name: 'Sentidos Aguçados', 
                description: 'Você tem proficiência na perícia Percepção.',
                modifiers: [{ type: 'proficiency', target: 'skill', subtarget: 'Percepção' }]
            },
            { name: 'Ancestral Feérico', description: 'Vantagem contra charme, imune a sono mágico.' },
            { name: 'Transe', description: 'Medita 4h em vez de dormir.' },
            { name: 'Treinamento Élfico com Armas', description: 'Proficiência com espadas longas, espadas curtas, arcos curtos e arcos longos.' },
            { 
                name: 'Pés Velozes', 
                description: 'Seu deslocamento base de caminhada aumenta para 10,5m (+1,5m em relação à base 9m).',
                modifiers: [{ type: 'bonus', target: 'speed', value: 1.5 }]
            },
            { name: 'Máscara da Natureza', description: 'Você pode tentar se esconder mesmo quando estiver apenas levemente obscurecido por folhagem, chuva forte, neve caindo, névoa ou outro fenômeno natural.' }
        ]
    },
    'Halfling Pés Leves': {
        name: 'Halfling Pés Leves', speed: 7.5, size: 'Pequeno',
        abilityBonuses: { [Attribute.DEX]: 2, [Attribute.CHA]: 1 },
        features: [
            { name: 'Sortudo', description: 'Quando você rolar um 1 no d20 para um ataque, teste de habilidade ou resistência, você pode jogar de novo e deve usar o novo resultado.' },
            { name: 'Bravura', description: 'Você tem vantagem em testes de resistência contra ficar amedrontado.' },
            { name: 'Agilidade Halfling', description: 'Você pode mover-se através do espaço de qualquer criatura que for de um tamanho maior que o seu.' },
            { name: 'Furtividade Natural', description: 'Você pode tentar se esconder mesmo quando possuir apenas a cobertura de uma criatura que for no mínimo um tamanho maior que o seu.' }
        ]
    },
    'Halfling Robusto': {
        name: 'Halfling Robusto', speed: 7.5, size: 'Pequeno',
        abilityBonuses: { [Attribute.DEX]: 2, [Attribute.CON]: 1 },
        features: [
            { name: 'Sortudo', description: 'Rerrola 1 no d20.' },
            { name: 'Bravura', description: 'Vantagem contra medo.' },
            { name: 'Agilidade Halfling', description: 'Move-se pelo espaço de criaturas maiores.' },
            { name: 'Resiliência dos Robustos', description: 'Você tem vantagem em testes de resistência contra veneno e tem resistência contra dano de veneno.' }
        ]
    },
    'Draconato': {
        name: 'Draconato', speed: 9, size: 'Médio',
        abilityBonuses: { [Attribute.STR]: 2, [Attribute.CHA]: 1 },
        features: [
            { name: 'Ancestral Dracônico', description: 'Você possui ancestralidade de dragão (escolha cor). Isso determina seu sopro e resistência.' },
            { name: 'Ataque de Sopro', description: 'Ação para exalar energia destrutiva. O formato e o dano dependem do seu ancestral (2d6, CD 8+Con+Prof, metade no sucesso). Dano aumenta no nv 6 (3d6), 11 (4d6) e 16 (5d6). Recupera em descanso curto/longo.' },
            { name: 'Resistência a Dano', description: 'Você tem resistência ao tipo de dano associado ao seu ancestral dracônico.' }
        ]
    },
    'Gnomo da Floresta': {
        name: 'Gnomo da Floresta', speed: 7.5, size: 'Pequeno',
        abilityBonuses: { [Attribute.INT]: 2, [Attribute.DEX]: 1 },
        features: [
            { name: 'Visão no Escuro', description: '18m.' },
            { name: 'Astúcia Gnômica', description: 'Você tem vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.' },
            { name: 'Ilusionista Natural', description: 'Você conhece o truque Ilusão Menor. Inteligência é sua habilidade de conjuração.' },
            { name: 'Falar com Bestas Pequenas', description: 'Através de sons e gestos, você pode comunicar ideias simples para Bestas pequenas ou menores.' }
        ]
    },
    'Gnomo das Rochas': {
        name: 'Gnomo das Rochas', speed: 7.5, size: 'Pequeno',
        abilityBonuses: { [Attribute.INT]: 2, [Attribute.CON]: 1 },
        features: [
            { name: 'Visão no Escuro', description: '18m.' },
            { name: 'Astúcia Gnômica', description: 'Vantagem em saves de Int/Sab/Car contra magia.' },
            { name: 'Conhecimento de Artífice', description: 'Sempre que realizar um teste de Inteligência (História) relacionado a itens mágicos, objetos alquímicos ou tecnológicos, você adiciona o dobro do seu bônus de proficiência.' },
            { name: 'Engenhoqueiro', description: 'Você possui proficiência com ferramentas de engenhoqueiro. Pode gastar 1h e 10po para criar um dispositivo mecânico minúsculo (AC 5, 1 PV) que funciona por 24h.' }
        ]
    },
    'Meio-Elfo': {
        name: 'Meio-Elfo', speed: 9, size: 'Médio',
        abilityBonuses: { [Attribute.CHA]: 2 }, // Usuário deve adicionar +1 em dois outros manualmente na ficha
        features: [
            { name: 'Visão no Escuro', description: '18m.' },
            { name: 'Ancestral Feérico', description: 'Vantagem contra charme, imune a sono mágico.' },
            { name: 'Versatilidade em Perícia', description: 'Você ganha proficiência em duas perícias à sua escolha.' }
        ]
    },
    'Meio-Orc': {
        name: 'Meio-Orc', speed: 9, size: 'Médio',
        abilityBonuses: { [Attribute.STR]: 2, [Attribute.CON]: 1 },
        features: [
            { name: 'Visão no Escuro', description: '18m.' },
            { 
                name: 'Ameaçador', 
                description: 'Você ganha proficiência na perícia Intimidação.',
                modifiers: [{ type: 'proficiency', target: 'skill', subtarget: 'Intimidação' }]
            },
            { name: 'Resistência Implacável', description: 'Quando você for reduzido a 0 pontos de vida, mas não for morto instantaneamente, você pode voltar para 1 ponto de vida. Você não pode usar essa característica de novo até completar um descanso longo.' },
            { name: 'Ataques Selvagens', description: 'Quando você atinge um ataque crítico com uma arma corpo-a-corpo, você pode rolar um dos dados de dano da arma mais uma vez e adicioná-lo ao dano extra do acerto crítico.' }
        ]
    },
    'Tiefling': {
        name: 'Tiefling', speed: 9, size: 'Médio',
        abilityBonuses: { [Attribute.CHA]: 2, [Attribute.INT]: 1 },
        features: [
            { name: 'Visão no Escuro', description: '18m.' },
            { name: 'Resistência Infernal', description: 'Você possui resistência a dano de fogo.' },
            { name: 'Legado Infernal', description: 'Você conhece o truque Taumaturgia. No 3º nível, você pode conjurar a magia Repreensão Infernal como uma magia de 2º nível. No 5º nível, você pode conjurar a magia Escuridão. Você recupera o uso dessas magias ao terminar um descanso longo. Carisma é sua habilidade de conjuração.' }
        ]
    },
    'Kenku': {
        name: 'Kenku', speed: 9, size: 'Médio',
        abilityBonuses: { [Attribute.DEX]: 2, [Attribute.WIS]: 1 },
        features: [
            { name: 'Especialista em Falsificação', description: 'Você tem vantagem em todos os testes feitos para produzir duplicatas ou falsificações de itens e documentos.' },
            { name: 'Treinamento Kenku', description: 'Você é proficiente em duas perícias à sua escolha entre: Acrobacia, Enganação, Furtividade ou Prestidigitação.' },
            { name: 'Mimetismo', description: 'Você pode imitar sons que tenha ouvido, incluindo vozes. Uma criatura que ouvir os sons pode perceber que são imitações com um teste de Intuição (CD 8 + seu bônus de proficiência + seu modificador de Carisma).' }
        ]
    }
};
