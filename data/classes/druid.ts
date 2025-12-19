
import { ClassDefinition, Attribute, SkillName } from '../../types';
import { FULL_CASTER_SLOTS } from '../magic';

export const DRUID: ClassDefinition = {
    name: 'Druida',
    hitDie: 'd8',
    primaryAbility: [Attribute.WIS],
    savingThrows: [Attribute.INT, Attribute.WIS],
    proficiencies: {
        armor: ['Leves', 'Médias', 'Escudos (não metal)'],
        weapons: ['Clavas', 'Adagas', 'Dardos', 'Azagaias', 'Maças', 'Bordões', 'Cimitarras', 'Foices', 'Fundas', 'Lanças'],
        tools: ['Kit de Herbalismo'],
        skillsCount: 2,
        skillsList: [SkillName.Arcana, SkillName.AnimalHandling, SkillName.Insight, SkillName.Medicine, SkillName.Nature, SkillName.Perception, SkillName.Religion, SkillName.Survival]
    },
    spellcasting: {
        ability: Attribute.WIS,
        type: 'Prepared',
        access: 'ALL',
        cantripsKnown: { 1: 2, 4: 3, 10: 4 },
        slotsTable: FULL_CASTER_SLOTS
    },
    resources: [
        { name: 'Forma Selvagem', reset: 'Curto', baseAmount: 2 }
    ],
    features: {
        1: [{ name: 'Druídico', description: 'Idioma secreto. Você pode deixar mensagens ocultas.' }, { name: 'Conjuração', description: 'Conjura magias da natureza.' }],
        2: [{ name: 'Forma Selvagem', description: 'Transforme-se em animais (ND 1/4, sem voo/nado).' }, { name: 'Círculo Druídico', description: 'Escolha seu círculo (Terra ou Lua).' }],
        3: [],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }, { name: 'Forma Selvagem (Melhoria)', description: 'Pode se transformar em bestas com nado (ND 1/2).' }],
        5: [],
        6: [{ name: 'Círculo Druídico (Característica)', description: 'Benefício do círculo.' }],
        7: [],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }, { name: 'Forma Selvagem (Melhoria)', description: 'Pode se transformar em bestas com voo (ND 1).' }],
        9: [],
        10: [{ name: 'Círculo Druídico (Característica)', description: 'Benefício do círculo.' }],
        11: [],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [],
        14: [{ name: 'Círculo Druídico (Característica)', description: 'Benefício final do círculo.' }],
        15: [],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [],
        18: [{ name: 'Corpo Atemporal', description: 'Envelhece 1 ano a cada 10 anos.' }, { name: 'Magia Bestial', description: 'Pode conjurar magias na forma selvagem (sem componentes materiais).' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Arquidruida', description: 'Forma Selvagem ilimitada.' }]
    }
};
