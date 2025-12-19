
import { ClassDefinition, Attribute, SkillName } from '../../types';
import { WARLOCK_SLOTS } from '../magic';

export const WARLOCK: ClassDefinition = {
    name: 'Bruxo',
    hitDie: 'd8',
    primaryAbility: [Attribute.CHA],
    savingThrows: [Attribute.WIS, Attribute.CHA],
    proficiencies: {
        armor: ['Leves'],
        weapons: ['Simples'],
        tools: [],
        skillsCount: 2,
        skillsList: [SkillName.Arcana, SkillName.Deception, SkillName.History, SkillName.Intimidation, SkillName.Investigation, SkillName.Nature, SkillName.Religion]
    },
    spellcasting: {
        ability: Attribute.CHA,
        type: 'Known',
        access: 'LEARNED',
        cantripsKnown: { 1: 2, 4: 3, 10: 4 },
        spellsKnownFormula: (lvl) => lvl + 1, // Aprox, tabela específica
        slotsTable: WARLOCK_SLOTS
    },
    features: {
        1: [{ name: 'Patrono de Outro Mundo', description: 'Escolha seu patrono (Feérico, Infernal, Grande Antigo).' }, { name: 'Magia de Pacto', description: 'Slots recuperam em descanso curto e são sempre do maior nível possível.' }],
        2: [{ name: 'Invocações Místicas', description: 'Escolha 2 invocações que dão poderes especiais.' }],
        3: [{ name: 'Dádiva de Pacto', description: 'Escolha seu pacto (Corrente, Lâmina, Tomo).' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [{ name: 'Invocação Mística Extra', description: 'Total de 3 invocações.' }],
        6: [{ name: 'Patrono de Outro Mundo (Característica)', description: 'Benefício do patrono.' }],
        7: [{ name: 'Invocação Mística Extra', description: 'Total de 4 invocações.' }],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [{ name: 'Invocação Mística Extra', description: 'Total de 5 invocações.' }],
        10: [{ name: 'Patrono de Outro Mundo (Característica)', description: 'Benefício do patrono.' }],
        11: [{ name: 'Arcanum Místico (6º nível)', description: 'Conjura magia de 6º nível 1x/longo.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }, { name: 'Invocação Mística Extra', description: 'Total de 6 invocações.' }],
        13: [{ name: 'Arcanum Místico (7º nível)', description: 'Conjura magia de 7º nível 1x/longo.' }],
        14: [{ name: 'Patrono de Outro Mundo (Característica)', description: 'Benefício final do patrono.' }],
        15: [{ name: 'Arcanum Místico (8º nível)', description: 'Conjura magia de 8º nível 1x/longo.' }, { name: 'Invocação Mística Extra', description: 'Total de 7 invocações.' }],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [{ name: 'Arcanum Místico (9º nível)', description: 'Conjura magia de 9º nível 1x/longo.' }],
        18: [{ name: 'Invocação Mística Extra', description: 'Total de 8 invocações.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Mestre Místico', description: '1 min para recuperar todos slots de pacto (1x/longo).' }]
    }
};