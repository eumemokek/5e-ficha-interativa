
import { ClassDefinition, Attribute, SkillName } from '../../types';
import { FULL_CASTER_SLOTS } from '../magic';

export const CLERIC: ClassDefinition = {
    name: 'Clérigo',
    hitDie: 'd8',
    primaryAbility: [Attribute.WIS],
    savingThrows: [Attribute.WIS, Attribute.CHA],
    proficiencies: {
        armor: ['Leves', 'Médias', 'Escudos'],
        weapons: ['Simples'],
        tools: [],
        skillsCount: 2,
        skillsList: [SkillName.History, SkillName.Insight, SkillName.Medicine, SkillName.Persuasion, SkillName.Religion]
    },
    spellcasting: {
        ability: Attribute.WIS,
        type: 'Prepared',
        access: 'ALL',
        cantripsKnown: { 1: 3, 4: 4, 10: 5 },
        slotsTable: FULL_CASTER_SLOTS
    },
    resources: [
        { name: 'Canalizar Divindade', reset: 'Curto', baseAmount: 1, levelScaling: { 6: 2, 18: 3 } }
    ],
    features: {
        1: [{ name: 'Domínio Divino', description: 'Escolha seu domínio (Vida, Luz, Guerra, etc). Ganha magias de domínio.' }, { name: 'Conjuração', description: 'Prepara e conjura magias divinas.' }],
        2: [{ name: 'Canalizar Divindade (1/descanso)', description: 'Expulsar Mortos-vivos e efeito do domínio.' }, { name: 'Domínio Divino (Característica)', description: 'Canalizar divindade específico do domínio.' }],
        3: [],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [{ name: 'Destruir Mortos-Vivos (ND 1/2)', description: 'Expulsão destrói mortos-vivos de ND 1/2 ou menor.' }],
        6: [{ name: 'Canalizar Divindade (2/descanso)', description: 'Pode usar duas vezes entre descansos.' }, { name: 'Domínio Divino (Característica)', description: 'Benefício do domínio.' }],
        7: [],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }, { name: 'Destruir Mortos-Vivos (ND 1)', description: 'Destrói ND 1.' }, { name: 'Domínio Divino (Característica)', description: 'Ataque Divino (dano extra) ou Conjuração Potente.' }],
        9: [],
        10: [{ name: 'Intervenção Divina', description: 'Ação para pedir ajuda ao deus. Sucesso se d100 <= nível.' }],
        11: [{ name: 'Destruir Mortos-Vivos (ND 2)', description: 'Destrói ND 2.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [],
        14: [{ name: 'Destruir Mortos-Vivos (ND 3)', description: 'Destrói ND 3.' }],
        15: [],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [{ name: 'Destruir Mortos-Vivos (ND 4)', description: 'Destrói ND 4.' }, { name: 'Domínio Divino (Característica)', description: 'Benefício final do domínio.' }],
        18: [{ name: 'Canalizar Divindade (3/descanso)', description: 'Pode usar três vezes entre descansos.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Intervenção Divina Aprimorada', description: 'Intervenção tem sucesso automático.' }]
    }
};
