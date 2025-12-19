
import { ClassDefinition, Attribute, SkillName } from '../../types';
import { FULL_CASTER_SLOTS } from '../magic';

export const SORCERER: ClassDefinition = {
    name: 'Feiticeiro',
    hitDie: 'd6',
    primaryAbility: [Attribute.CHA],
    savingThrows: [Attribute.CON, Attribute.CHA],
    proficiencies: {
        armor: [],
        weapons: ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Bestas leves'],
        tools: [],
        skillsCount: 2,
        skillsList: [SkillName.Arcana, SkillName.Deception, SkillName.Insight, SkillName.Intimidation, SkillName.Persuasion, SkillName.Religion]
    },
    spellcasting: {
        ability: Attribute.CHA,
        type: 'Known',
        access: 'LEARNED',
        cantripsKnown: { 1: 4, 4: 5, 10: 6 },
        spellsKnownFormula: (lvl) => lvl + 1, // Fórmula simplificada, limite real é tabela.
        slotsTable: FULL_CASTER_SLOTS
    },
    resources: [
        { name: 'Pontos de Feitiçaria', reset: 'Longo', baseAmount: 0, levelScaling: (l) => l >= 2 ? l : 0 }
    ],
    features: {
        1: [{ name: 'Origem de Feitiçaria', description: 'Escolha sua origem (Dracônica ou Magia Selvagem).' }, { name: 'Conjuração', description: 'Conjura magias.' }],
        2: [{ name: 'Fonte de Magia', description: 'Ganha pontos de feitiçaria. Pode criar slots com pontos e pontos com slots.' }],
        3: [{ name: 'Metamágica (2 opções)', description: 'Escolha 2 opções de metamágica para alterar suas magias.' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [],
        6: [{ name: 'Origem de Feitiçaria (Característica)', description: 'Benefício da origem.' }],
        7: [],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [],
        10: [{ name: 'Metamágica (3 opções)', description: 'Escolha mais 1 opção.' }],
        11: [],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [],
        14: [{ name: 'Origem de Feitiçaria (Característica)', description: 'Benefício da origem.' }],
        15: [],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [{ name: 'Metamágica (4 opções)', description: 'Escolha mais 1 opção.' }],
        18: [{ name: 'Origem de Feitiçaria (Característica)', description: 'Benefício da origem.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Restauração do Feiticeiro', description: 'Recupera 4 pontos de feitiçaria em descanso curto.' }]
    }
};