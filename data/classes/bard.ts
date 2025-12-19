
import { ClassDefinition, Attribute, SkillName } from '../../types';
import { FULL_CASTER_SLOTS } from '../magic';

export const BARD: ClassDefinition = {
    name: 'Bardo',
    hitDie: 'd8',
    primaryAbility: [Attribute.CHA],
    savingThrows: [Attribute.DEX, Attribute.CHA],
    proficiencies: {
        armor: ['Leves'],
        weapons: ['Simples', 'Besta de mão', 'Espada longa', 'Rapieira', 'Espada curta'],
        tools: ['Três instrumentos musicais'],
        skillsCount: 3,
        skillsList: Object.values(SkillName)
    },
    spellcasting: {
        ability: Attribute.CHA,
        type: 'Known',
        access: 'LEARNED',
        cantripsKnown: { 1: 2, 4: 3, 10: 4 },
        spellsKnownFormula: (lvl) => lvl + (lvl >= 10 ? 2 : 3),
        slotsTable: FULL_CASTER_SLOTS
    },
    resources: [
        { name: 'Inspiração de Bardo', reset: 'Longo', baseAmount: 3 } // Reset muda no lvl 5
    ],
    features: {
        1: [{ name: 'Inspiração de Bardo (d6)', description: 'Ação bônus para dar um dado extra a um aliado. Carisma vezes por descanso longo.' }, { name: 'Conjuração', description: 'Você pode conjurar magias arcanas.' }],
        2: [
            { 
                name: 'Pau pra Toda Obra', 
                description: 'Adiciona metade da proficiência em testes de habilidade que não seja proficiente (inclui Iniciativa).',
                modifiers: [{ type: 'bonus', target: 'initiative', value: 1 }] // Valor seguro para aproximação (metade prof lvl 2)
            }, 
            { name: 'Canção do Descanso (d6)', description: 'Aliados recuperam PV extra em descanso curto.' }
        ],
        3: [{ name: 'Colégio de Bardo', description: 'Escolha seu Colégio (Saber ou Bravura).' }, { name: 'Especialização', description: 'Dobra proficiência em 2 perícias.' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [{ name: 'Fonte de Inspiração', description: 'Recupera inspiração em descanso curto ou longo.' }, { name: 'Inspiração de Bardo (d8)', description: 'Dado aumenta para d8.' }],
        6: [{ name: 'Contra-Encanto', description: 'Ação para dar vantagem em testes contra medo/encantamento a aliados em 9m.' }, { name: 'Colégio de Bardo (Característica)', description: 'Benefício do colégio.' }],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [{ name: 'Canção do Descanso (d8)', description: 'Dado de cura aumenta para d8.' }],
        10: [{ name: 'Segredos Mágicos', description: 'Aprenda 2 magias de qualquer classe.' }, { name: 'Especialização', description: 'Dobra proficiência em mais 2 perícias.' }, { name: 'Inspiração de Bardo (d10)', description: 'Dado aumenta para d10.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [{ name: 'Canção do Descanso (d10)', description: 'Dado de cura aumenta para d10.' }],
        14: [{ name: 'Segredos Mágicos', description: 'Aprenda mais 2 magias de qualquer classe.' }, { name: 'Colégio de Bardo (Característica)', description: 'Benefício final do colégio.' }],
        15: [{ name: 'Inspiração de Bardo (d12)', description: 'Dado aumenta para d12.' }],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [{ name: 'Canção do Descanso (d12)', description: 'Dado de cura aumenta para d12.' }],
        18: [{ name: 'Segredos Mágicos', description: 'Aprenda mais 2 magias de qualquer classe.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Inspiração Superior', description: 'Se iniciar combate sem inspirações, ganha 1.' }]
    }
};