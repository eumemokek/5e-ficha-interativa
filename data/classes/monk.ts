
import { ClassDefinition, Attribute, SkillName } from '../../types';

export const MONK: ClassDefinition = {
    name: 'Monge',
    hitDie: 'd8',
    primaryAbility: [Attribute.DEX, Attribute.WIS],
    savingThrows: [Attribute.STR, Attribute.DEX],
    proficiencies: {
        armor: [],
        weapons: ['Simples', 'Espadas curtas'],
        tools: ['Um instrumento ou ferramenta de artesão'],
        skillsCount: 2,
        skillsList: [SkillName.Acrobatics, SkillName.Athletics, SkillName.History, SkillName.Insight, SkillName.Religion, SkillName.Stealth]
    },
    resources: [
        { name: 'Ki', reset: 'Curto', baseAmount: 0, levelScaling: (l) => l >= 2 ? l : 0 }
    ],
    features: {
        1: [
            { 
                name: 'Defesa sem Armadura', 
                description: 'CA = 10 + Des + Sab.',
                modifiers: [{ type: 'formula', target: 'ac', stat: Attribute.WIS, condition: 'unarmored' }]
            },
            { name: 'Artes Marciais (d4)', description: 'Pode usar Des em vez de For para armas de monge. Dano desarmado é d4. Ação bônus para ataque desarmado extra.' }
        ],
        2: [
            { name: 'Ki', description: 'Pontos para habilidades especiais. CD = 8 + prof + Sab.' },
            { 
                name: 'Movimento sem Armadura (+3m)', 
                description: 'Seu deslocamento aumenta em 3m.',
                modifiers: [{ type: 'bonus', target: 'speed', value: 3, condition: 'unarmored' }]
            },
            { name: 'Defesa Paciente', description: '1 ki para Esquivar como bônus.' },
            { name: 'Passo do Vento', description: '1 ki para Desengajar ou Disparada como bônus e dobrar pulo.' },
            { name: 'Rajada de Golpes', description: '1 ki para 2 ataques desarmados como bônus.' }
        ],
        3: [{ name: 'Tradição Monástica', description: 'Escolha seu caminho (Mão Aberta, Sombra, Quatro Elementos).' }, { name: 'Defletir Projéteis', description: 'Reação para reduzir dano de projétil (1d10 + Des + Nível).' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }, { name: 'Queda Lenta', description: 'Reduz dano de queda em 5 x nível.' }],
        5: [{ name: 'Ataque Extra', description: 'Ataca 2x.' }, { name: 'Ataque Atordoante', description: '1 ki ao acertar golpe corpo-a-corpo: alvo faz save CON ou fica atordoado.' }, { name: 'Artes Marciais (d6)', description: 'Dado de dano aumenta para d6.' }],
        6: [
            { name: 'Golpes de Ki', description: 'Seus ataques desarmados contam como mágicos.' }, 
            { name: 'Tradição Monástica (Característica)', description: 'Benefício da tradição.' },
            { 
                name: 'Movimento sem Armadura (+4,5m)', 
                description: 'Deslocamento aumenta.',
                // Bônus incremental para somar ao anterior
                modifiers: [{ type: 'bonus', target: 'speed', value: 1.5, condition: 'unarmored' }] 
            }
        ],
        7: [{ name: 'Evasão', description: 'Nenhum dano em sucesso de Des contra área, metade em falha.' }, { name: 'Mente Tranquila', description: 'Ação para encerrar charme ou medo em si mesmo.' }],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [{ name: 'Movimento sem Armadura (Aprimorado)', description: 'Pode andar sobre líquidos e paredes verticais.' }],
        10: [
            { name: 'Pureza Corporal', description: 'Imune a veneno e doenças.' }, 
            { 
                name: 'Movimento sem Armadura (+6m)', 
                description: 'Deslocamento aumenta.',
                modifiers: [{ type: 'bonus', target: 'speed', value: 1.5, condition: 'unarmored' }]
            }
        ],
        11: [{ name: 'Artes Marciais (d8)', description: 'Dado de dano aumenta para d8.' }, { name: 'Tradição Monástica (Característica)', description: 'Benefício da tradição.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [{ name: 'Língua do Sol e da Lua', description: 'Você compreende todos os idiomas falados e qualquer criatura que saiba um idioma entende você.' }],
        14: [
            { 
                name: 'Alma de Diamante', 
                description: 'Proficiência em todos os testes de resistência. Pode gastar 1 ki para rerrolar falha.',
                modifiers: [{ type: 'proficiency', target: 'saving_throw_all' }]
            },
            { 
                name: 'Movimento sem Armadura (+7,5m)', 
                description: 'Deslocamento aumenta.',
                modifiers: [{ type: 'bonus', target: 'speed', value: 1.5, condition: 'unarmored' }]
            }
        ],
        15: [{ name: 'Corpo Atemporal', description: 'Não sofre efeitos de velhice e não precisa comer/beber.' }],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [{ name: 'Tradição Monástica (Característica)', description: 'Benefício final da tradição.' }, { name: 'Artes Marciais (d10)', description: 'Dado de dano aumenta para d10.' }],
        18: [
            { name: 'Corpo Vazio', description: '4 ki para ficar invisível e resistente a tudo (exceto força) por 1 min. 8 ki para conjurar Projeção Astral.' },
            { 
                name: 'Movimento sem Armadura (+9m)', 
                description: 'Deslocamento aumenta.',
                modifiers: [{ type: 'bonus', target: 'speed', value: 1.5, condition: 'unarmored' }]
            }
        ],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Auto-Perfeição', description: 'Se rolar iniciativa sem ki, recupera 4 pontos.' }]
    }
};
