
import { ClassDefinition, Attribute, SkillName } from '../../types';

export const BARBARIAN: ClassDefinition = {
    name: 'Bárbaro',
    hitDie: 'd12',
    primaryAbility: [Attribute.STR],
    savingThrows: [Attribute.STR, Attribute.CON],
    proficiencies: {
        armor: ['Leves', 'Médias', 'Escudos'],
        weapons: ['Simples', 'Marciais'],
        tools: [],
        skillsCount: 2,
        skillsList: [SkillName.AnimalHandling, SkillName.Athletics, SkillName.Intimidation, SkillName.Nature, SkillName.Perception, SkillName.Survival]
    },
    resources: [
        { name: 'Fúria', reset: 'Longo', baseAmount: 2, levelScaling: { 1: 2, 3: 3, 6: 4, 12: 5, 17: 6, 20: 99 } }
    ],
    features: {
        1: [
            { name: 'Fúria', description: 'Vantagem em testes de Força, bônus de dano (+2, aumenta com nível), resistência a concussão/cortante/perfurante.' },
            { 
                name: 'Defesa sem Armadura', 
                description: 'CA = 10 + Des + Con (se sem armadura).',
                modifiers: [{ type: 'formula', target: 'ac', stat: Attribute.CON, condition: 'unarmored' }]
            }
        ],
        2: [{ name: 'Ataque Descuidado', description: 'Pode atacar com vantagem, mas ataques contra você têm vantagem.' }, { name: 'Senso de Perigo', description: 'Vantagem em testes de resistência de Destreza contra efeitos que possa ver.' }],
        3: [{ name: 'Caminho Primitivo', description: 'Escolha um Caminho (Berserker ou Totêmico).' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [
            { name: 'Ataque Extra', description: 'Pode atacar duas vezes ao usar a ação Atacar.' },
            { 
                name: 'Movimento Rápido', 
                description: '+3m de deslocamento se não usar armadura pesada.',
                modifiers: [{ type: 'bonus', target: 'speed', value: 3, condition: 'unarmored' }]
            }
        ],
        6: [{ name: 'Caminho Primitivo (Característica)', description: 'Benefício do caminho escolhido.' }],
        7: [
            { 
                name: 'Instinto Selvagem', 
                description: 'Vantagem na iniciativa. Se surpreso, pode agir se entrar em fúria.',
                modifiers: [{ type: 'advantage', target: 'initiative' }]
            }
        ],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [{ name: 'Crítico Brutal (1 dado)', description: 'Adiciona +1 dado de dano extra em críticos.' }],
        10: [{ name: 'Caminho Primitivo (Característica)', description: 'Benefício do caminho escolhido.' }],
        11: [{ name: 'Fúria Implacável', description: 'Ao cair a 0 PV em fúria, teste de Con CD 10 para voltar a 1 PV.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [{ name: 'Crítico Brutal (2 dados)', description: '+2 dados extras em críticos.' }],
        14: [{ name: 'Caminho Primitivo (Característica)', description: 'Benefício do caminho escolhido.' }],
        15: [{ name: 'Fúria Persistente', description: 'Fúria só acaba se cair inconsciente ou decidir parar.' }],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [{ name: 'Crítico Brutal (3 dados)', description: '+3 dados extras em críticos.' }],
        18: [{ name: 'Força Indomável', description: 'Se o total de um teste de Força for menor que seu valor de Força, você pode usar o valor do atributo.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [
            { 
                name: 'Campeão Primitivo', 
                description: 'Força e Constituição aumentam em +4. Máximo agora é 24.',
                modifiers: [
                    { type: 'bonus', target: 'attribute', stat: Attribute.STR, value: 4 },
                    { type: 'bonus', target: 'attribute', stat: Attribute.CON, value: 4 }
                ]
            }
        ]
    }
};
