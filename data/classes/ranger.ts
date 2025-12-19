
import { ClassDefinition, Attribute, SkillName } from '../../types';
import { HALF_CASTER_SLOTS } from '../magic';

export const RANGER: ClassDefinition = {
    name: 'Ranger',
    hitDie: 'd10',
    primaryAbility: [Attribute.DEX, Attribute.WIS],
    savingThrows: [Attribute.STR, Attribute.DEX],
    proficiencies: {
        armor: ['Leves', 'Médias', 'Escudos'],
        weapons: ['Simples', 'Marciais'],
        tools: [],
        skillsCount: 3,
        skillsList: [SkillName.AnimalHandling, SkillName.Athletics, SkillName.Insight, SkillName.Investigation, SkillName.Nature, SkillName.Perception, SkillName.Stealth, SkillName.Survival]
    },
    spellcasting: {
        ability: Attribute.WIS,
        type: 'Known',
        access: 'LEARNED',
        cantripsKnown: {},
        spellsKnownFormula: (lvl) => Math.ceil(lvl/2) + 1,
        slotsTable: HALF_CASTER_SLOTS
    },
    features: {
        1: [{ name: 'Inimigo Favorito', description: 'Vantagem em sobrevivência/inteligência e idioma contra um tipo de criatura.' }, { name: 'Explorador Natural', description: 'Benefícios em terreno favorito (não se perde, furtividade, dobro proficiência, etc).' }],
        2: [{ name: 'Estilo de Luta', description: 'Escolha um estilo.' }, { name: 'Conjuração', description: 'Pode conjurar magias de ranger.' }],
        3: [{ name: 'Arquétipo de Ranger', description: 'Escolha seu arquétipo (Caçador, Mestre das Feras).' }, { name: 'Consciência Primitiva', description: 'Gaste slot para sentir aberrações, celestiais, dragões, etc na área.' }],
        4: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        5: [{ name: 'Ataque Extra', description: 'Pode atacar duas vezes ao usar a ação Atacar.' }],
        6: [{ name: 'Inimigo Favorito e Explorador Natural (Aprimoramento)', description: 'Escolha inimigos e terrenos adicionais.' }],
        7: [{ name: 'Arquétipo de Ranger (Característica)', description: 'Benefício do arquétipo.' }],
        8: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }, { name: 'Passos na Terra', description: 'Não sofre penalidade por terreno difícil não-mágico.' }],
        9: [],
        10: [{ name: 'Mimetismo', description: 'Pode se esconder em 1 min se camuflado, recebendo +10 em Furtividade.' }, { name: 'Inimigo Favorito e Explorador Natural (Aprimoramento)', description: 'Escolha adicionais.' }],
        11: [{ name: 'Arquétipo de Ranger (Característica)', description: 'Benefício do arquétipo.' }],
        12: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        13: [],
        14: [{ name: 'Vanish', description: 'Pode usar a ação Esconder-se como ação bônus.' }, { name: 'Inimigo Favorito (Aprimoramento)', description: 'Escolha adicional.' }],
        15: [{ name: 'Arquétipo de Ranger (Característica)', description: 'Benefício do arquétipo.' }],
        16: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        17: [],
        18: [{ name: 'Sentidos Selvagens', description: 'Não tem desvantagem ao atacar invisíveis. Sabe localização de invisíveis a 9m.' }],
        19: [{ name: 'Incremento no Valor de Habilidade', description: 'Aumente um atributo em +2 ou dois em +1.' }],
        20: [{ name: 'Matador de Inimigos', description: 'Adiciona mod de Sabedoria no ataque ou dano contra inimigo favorito (1x/turno).' }]
    }
};