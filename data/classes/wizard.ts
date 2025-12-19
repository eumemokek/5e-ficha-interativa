
import { ClassDefinition, Attribute, SkillName } from '../../types';
import { FULL_CASTER_SLOTS } from '../magic';

export const WIZARD: ClassDefinition = {
    name: 'Mago',
    hitDie: 'd6',
    primaryAbility: [Attribute.INT],
    savingThrows: [Attribute.INT, Attribute.WIS],
    proficiencies: {
        armor: [],
        weapons: ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Bestas leves'],
        tools: [],
        skillsCount: 2,
        skillsList: [SkillName.Arcana, SkillName.History, SkillName.Insight, SkillName.Investigation, SkillName.Medicine, SkillName.Religion]
    },
    spellcasting: {
        ability: Attribute.INT,
        type: 'Prepared',
        access: 'LEARNED',
        cantripsKnown: { 1: 3, 4: 4, 10: 5 },
        slotsTable: FULL_CASTER_SLOTS
    },
    resources: [
        { name: 'Recuperação Arcana', reset: 'Longo', baseAmount: 1 }
    ],
    features: {
        1: [{ name: 'Recuperação Arcana', description: 'Recupera slots de magia (metade do nível) em descanso curto.' }, { name: 'Grimório', description: 'Você possui um livro de magias.' }, { name: 'Conjuração', description: 'Prepara e lança magias arcanas.' }],
        2: [{ name: 'Tradição Arcana', description: 'Escolha sua escola de magia (Evocação, Abjuração, etc).' }],
        3: [],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [],
        6: [{ name: 'Tradição Arcana (Característica)', description: 'Benefício da escola.' }],
        7: [],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [],
        10: [{ name: 'Tradição Arcana (Característica)', description: 'Benefício da escola.' }],
        11: [],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [],
        14: [{ name: 'Tradição Arcana (Característica)', description: 'Benefício final da escola.' }],
        15: [],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [],
        18: [{ name: 'Maestria em Magia', description: 'Escolha uma magia de 1º e 2º nível. Pode conjurá-las à vontade.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Assinatura Mágica', description: 'Escolha duas magias de 3º nível. Pode conjurá-las 1x/curto sem slot.' }]
    }
};