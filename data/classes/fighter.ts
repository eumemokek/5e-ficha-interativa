
import { ClassDefinition, Attribute, SkillName } from '../../types';

export const FIGHTER: ClassDefinition = {
    name: 'Guerreiro',
    hitDie: 'd10',
    primaryAbility: [Attribute.STR, Attribute.DEX],
    savingThrows: [Attribute.STR, Attribute.CON],
    proficiencies: {
        armor: ['Todas as armaduras', 'Escudos'],
        weapons: ['Simples', 'Marciais'],
        tools: [],
        skillsCount: 2,
        skillsList: [SkillName.Acrobatics, SkillName.AnimalHandling, SkillName.Athletics, SkillName.History, SkillName.Insight, SkillName.Intimidation, SkillName.Perception, SkillName.Survival]
    },
    resources: [
        { name: 'Retomar o Fôlego', reset: 'Curto', baseAmount: 1 },
        { name: 'Surto de Ação', reset: 'Curto', baseAmount: 1, levelScaling: { 17: 2 } },
        { name: 'Indomável', reset: 'Longo', baseAmount: 1, levelScaling: { 9: 1, 13: 2, 17: 3 } }
    ],
    features: {
        1: [{ name: 'Estilo de Luta', description: 'Escolha um estilo de combate.' }, { name: 'Retomar o Fôlego', description: 'Ação bônus para curar 1d10 + nível de guerreiro (1/descanso).' }],
        2: [{ name: 'Surto de Ação (1 uso)', description: 'Pode realizar uma ação adicional no seu turno.' }],
        3: [{ name: 'Arquétipo Marcial', description: 'Escolha seu arquétipo (Campeão, Mestre de Batalha, Cavaleiro Místico).' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [{ name: 'Ataque Extra', description: 'Você pode atacar duas vezes, em vez de uma, quando usar a ação Atacar.' }],
        6: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        7: [{ name: 'Arquétipo Marcial (Característica)', description: 'Benefício do arquétipo.' }],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [{ name: 'Indomável (1 uso)', description: 'Você pode rerrolar um teste de resistência que tenha falhado.' }],
        10: [{ name: 'Arquétipo Marcial (Característica)', description: 'Benefício do arquétipo.' }],
        11: [{ name: 'Ataque Extra (2)', description: 'Você pode atacar três vezes quando usar a ação Atacar.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [{ name: 'Indomável (2 usos)', description: 'Pode usar Indomável duas vezes.' }],
        14: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        15: [{ name: 'Arquétipo Marcial (Característica)', description: 'Benefício do arquétipo.' }],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [{ name: 'Surto de Ação (2 usos)', description: 'Pode usar Surto de Ação duas vezes entre descansos.' }, { name: 'Indomável (3 usos)', description: 'Pode usar Indomável três vezes.' }],
        18: [{ name: 'Arquétipo Marcial (Característica)', description: 'Benefício do arquétipo.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Ataque Extra (3)', description: 'Você pode atacar quatro vezes quando usar a ação Atacar.' }]
    }
};
