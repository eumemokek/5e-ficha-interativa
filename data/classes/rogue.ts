
import { ClassDefinition, Attribute, SkillName } from '../../types';

export const ROGUE: ClassDefinition = {
    name: 'Ladino',
    hitDie: 'd8',
    primaryAbility: [Attribute.DEX],
    savingThrows: [Attribute.DEX, Attribute.INT],
    proficiencies: {
        armor: ['Leves'],
        weapons: ['Simples', 'Besta de mão', 'Espada longa', 'Rapieira', 'Espada curta'],
        tools: ['Ferramentas de Ladrão'],
        skillsCount: 4,
        skillsList: [SkillName.Acrobatics, SkillName.Athletics, SkillName.Deception, SkillName.Insight, SkillName.Intimidation, SkillName.Investigation, SkillName.Perception, SkillName.Performance, SkillName.Persuasion, SkillName.SleightOfHand, SkillName.Stealth]
    },
    features: {
        1: [{ name: 'Especialização', description: 'Dobra proficiência em 2 perícias.' }, { name: 'Ataque Furtivo (1d6)', description: 'Dano extra em ataques com vantagem/aliado.' }, { name: 'Gíria de Ladrão', description: 'Idioma secreto.' }],
        2: [{ name: 'Ação Astuta', description: 'Disparada, Desengajar ou Esconder como ação bônus.' }],
        3: [{ name: 'Arquétipo de Ladino', description: 'Escolha seu arquétipo (Ladrão, Assassino, Trapaceiro Arcano).' }, { name: 'Ataque Furtivo (2d6)', description: 'Dano extra aumenta.' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [{ name: 'Esquiva Sobrenatural', description: 'Reação para reduzir dano de um ataque que possa ver à metade.' }, { name: 'Ataque Furtivo (3d6)', description: 'Dano extra aumenta.' }],
        6: [{ name: 'Especialização', description: 'Dobra proficiência em mais 2 perícias.' }],
        7: [{ name: 'Evasão', description: 'Nenhum dano em sucesso de Des contra área, metade em falha.' }, { name: 'Ataque Furtivo (4d6)', description: 'Dano extra aumenta.' }],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        9: [{ name: 'Arquétipo de Ladino (Característica)', description: 'Benefício do arquétipo.' }, { name: 'Ataque Furtivo (5d6)', description: 'Dano extra aumenta.' }],
        10: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        11: [{ name: 'Talento Confiável', description: 'Ao fazer teste de habilidade com proficiência, rolagens de 9 ou menos tratadas como 10.' }, { name: 'Ataque Furtivo (6d6)', description: 'Dano extra aumenta.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [{ name: 'Arquétipo de Ladino (Característica)', description: 'Benefício do arquétipo.' }, { name: 'Ataque Furtivo (7d6)', description: 'Dano extra aumenta.' }],
        14: [{ name: 'Sentido Cego', description: 'Se ouvir, sabe localização de invisíveis/escondidos a 3m.' }],
        15: [{ name: 'Mente Escorregadia', description: 'Ganha proficiência em testes de resistência de Sabedoria.' }, { name: 'Ataque Furtivo (8d6)', description: 'Dano extra aumenta.' }],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [{ name: 'Arquétipo de Ladino (Característica)', description: 'Benefício do arquétipo.' }, { name: 'Ataque Furtivo (9d6)', description: 'Dano extra aumenta.' }],
        18: [{ name: 'Elusivo', description: 'Nenhum ataque tem vantagem contra você enquanto não estiver incapacitado.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }, { name: 'Ataque Furtivo (10d6)', description: 'Dano extra aumenta.' }],
        20: [{ name: 'Golpe de Sorte', description: '1x/curto: Se falhar em ataque ou teste, trate como 20 natural.' }]
    }
};
