
import { ClassDefinition, Attribute, SkillName } from '../../types';
import { HALF_CASTER_SLOTS } from '../magic';

export const PALADIN: ClassDefinition = {
    name: 'Paladino',
    hitDie: 'd10',
    primaryAbility: [Attribute.STR, Attribute.CHA],
    savingThrows: [Attribute.WIS, Attribute.CHA],
    proficiencies: {
        armor: ['Todas', 'Escudos'],
        weapons: ['Simples', 'Marciais'],
        tools: [],
        skillsCount: 2,
        skillsList: [SkillName.Athletics, SkillName.Insight, SkillName.Intimidation, SkillName.Medicine, SkillName.Persuasion, SkillName.Religion]
    },
    spellcasting: {
        ability: Attribute.CHA,
        type: 'Prepared',
        access: 'ALL',
        cantripsKnown: {},
        slotsTable: HALF_CASTER_SLOTS
    },
    resources: [
        { name: 'Cura pelas Mãos', reset: 'Longo', baseAmount: 0, levelScaling: (l) => l * 5 },
        { name: 'Sentido Divino', reset: 'Longo', baseAmount: 1, levelScaling: (l) => 1 + 3 }, // Simplificado, é 1+ModCar
        { name: 'Canalizar Divindade', reset: 'Curto', baseAmount: 0, levelScaling: { 3: 1 } }
    ],
    features: {
        1: [{ name: 'Sentido Divino', description: 'Detecta celestiais, corruptores e mortos-vivos (6 + mod Car vezes).' }, { name: 'Cura pelas Mãos', description: 'Reserva de cura igual a 5 x Nível de Paladino.' }],
        2: [{ name: 'Estilo de Luta', description: 'Escolha um estilo.' }, { name: 'Conjuração', description: 'Pode conjurar magias divinas.' }, { name: 'Punição Divina', description: 'Gaste slot de magia ao acertar ataque corpo-a-corpo para causar 2d8 (+1d8/slot acima do 1º) radiante. +1d8 contra corruptor/morto-vivo.' }],
        3: [{ name: 'Juramento Sagrado', description: 'Escolha seu juramento (Devoção, Anciões, Vingança).' }, { name: 'Saúde Divina', description: 'Você é imune a doenças.' }, { name: 'Canalizar Divindade', description: 'Efeito do juramento.' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [{ name: 'Ataque Extra', description: 'Pode atacar duas vezes ao usar a ação Atacar.' }],
        6: [
            { 
                name: 'Aura de Proteção', 
                description: 'Você e aliados a 3m ganham bônus nos saves igual ao seu modificador de Carisma.',
                modifiers: [{ type: 'bonus', target: 'saving_throw_all', stat: Attribute.CHA }]
            }
        ],
        7: [{ name: 'Juramento Sagrado (Característica)', description: 'Benefício do juramento.' }],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [],
        10: [{ name: 'Aura de Coragem', description: 'Você e aliados a 3m não podem ser amedrontados.' }],
        11: [{ name: 'Punição Divina Aprimorada', description: 'Seus ataques corpo-a-corpo causam +1d8 radiante sempre.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [],
        14: [{ name: 'Toque Purificador', description: 'Pode usar ação para encerrar uma magia em si ou aliado (Carisma vezes/longo).' }],
        15: [{ name: 'Juramento Sagrado (Característica)', description: 'Benefício do juramento.' }],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [],
        18: [{ name: 'Auras Aprimoradas', description: 'Alcance das auras aumenta para 9m.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Juramento Sagrado (Característica)', description: 'Transformação final do juramento.' }]
    }
};
