
import { Character, Attribute, SkillName } from '../types';
import { createNewCharacter, generateId } from '../utils';
import { ALL_ITEMS, ALL_SPELLS } from './compendium';

// Função auxiliar para equipar itens rapidamente
const getItem = (name: string, quantity = 1, equipped = true) => {
    const template = ALL_ITEMS.find(i => i.name === name);
    if (!template) return null;
    return { ...template, id: generateId(), quantity, equipped };
};

// Função auxiliar para adicionar magias
const getSpell = (name: string) => {
    const template = ALL_SPELLS.find(s => s.name === name);
    if (!template) return null;
    return { ...template, id: generateId(), prepared: true };
};

const createPreset = (
    name: string,
    race: string,
    cls: string,
    bg: string,
    attrs: Record<Attribute, number>,
    skills: SkillName[],
    items: string[],
    spells: string[] = [],
    img: string
): Character => {
    // Cria base usando a lógica do sistema
    let char = createNewCharacter(race, cls, bg, name, attrs, skills, {});
    
    // Adiciona Itens
    items.forEach(itemName => {
        const item = getItem(itemName);
        if (item) char.inventory.push(item);
    });

    // Adiciona Magias
    spells.forEach(spellName => {
        const spell = getSpell(spellName);
        if (spell) char.spells.push(spell);
    });

    // Define imagem
    char.imageUrl = img;

    return char;
};

export const PRESETS: Character[] = [
    createPreset(
        "Korg", "Meio-Orc", "Bárbaro", "Forasteiro",
        { [Attribute.STR]: 16, [Attribute.DEX]: 14, [Attribute.CON]: 16, [Attribute.INT]: 8, [Attribute.WIS]: 12, [Attribute.CHA]: 8 },
        [SkillName.Athletics, SkillName.Perception],
        ["Machado Grande", "Machadinha", "Azagaia", "Mochila"],
        [],
        "https://i.pinimg.com/564x/06/52/62/065262776609907c6533039d936274df.jpg"
    ),
    createPreset(
        "Lira", "Meio-Elfo", "Bardo", "Artista",
        { [Attribute.STR]: 8, [Attribute.DEX]: 16, [Attribute.CON]: 14, [Attribute.INT]: 10, [Attribute.WIS]: 12, [Attribute.CHA]: 17 },
        [SkillName.Persuasion, SkillName.Deception, SkillName.Performance],
        ["Rapieira", "Armadura de Couro", "Alaúde", "Adaga"],
        ["Zombaria Malévola", "Prestidigitaçao", "Curar Ferimentos", "Palavra de Cura", "Sono", "Riso Histérico de Tasha"],
        "https://i.pinimg.com/564x/78/3f/e6/783fe6cf099f37c373cb7365691ce229.jpg"
    ),
    createPreset(
        "Thorin", "Anão da Colina", "Clérigo", "Acólito", // Domínio da Vida implícito nos slots
        { [Attribute.STR]: 14, [Attribute.DEX]: 8, [Attribute.CON]: 16, [Attribute.INT]: 10, [Attribute.WIS]: 16, [Attribute.CHA]: 10 },
        [SkillName.History, SkillName.Medicine],
        ["Martelo de Guerra", "Cota de Malha", "Escudo", "Símbolo Sagrado (Emblema)"],
        ["Chama Sagrada", "Orientação", "Taumaturgia", "Bênção", "Curar Ferimentos", "Escudo da Fé", "Inflijir Ferimentos"],
        "https://i.pinimg.com/736x/8f/c9/26/8fc9265f242337d42060372df034f826.jpg"
    ),
    createPreset(
        "Elara", "Elfo da Floresta", "Druida", "Eremita",
        { [Attribute.STR]: 10, [Attribute.DEX]: 14, [Attribute.CON]: 14, [Attribute.INT]: 12, [Attribute.WIS]: 16, [Attribute.CHA]: 8 },
        [SkillName.Nature, SkillName.Survival, SkillName.Perception],
        ["Cimitarra", "Armadura de Couro", "Escudo", "Foco Druídico (Visco)"],
        ["Bordão", "Produzir Chama", "Chicote de Espinhos", "Bom Fruto", "Onda Trovejante", "Curar Ferimentos", "Falar com Animais"],
        "https://i.pinimg.com/564x/cd/29/e4/cd29e4a323330137a1772f7c00673322.jpg"
    ),
    createPreset(
        "Valeros", "Humano", "Guerreiro", "Soldado",
        { [Attribute.STR]: 16, [Attribute.DEX]: 12, [Attribute.CON]: 16, [Attribute.INT]: 10, [Attribute.WIS]: 10, [Attribute.CHA]: 10 },
        [SkillName.Athletics, SkillName.Intimidation],
        ["Espada Grande", "Besta Leve", "Cota de Malha"],
        [],
        "https://i.pinimg.com/564x/e7/08/94/e708945763e0207036d0f26943b77209.jpg"
    ),
    createPreset(
        "Chen", "Humano", "Monge", "Eremita",
        { [Attribute.STR]: 10, [Attribute.DEX]: 16, [Attribute.CON]: 14, [Attribute.INT]: 10, [Attribute.WIS]: 16, [Attribute.CHA]: 8 },
        [SkillName.Acrobatics, SkillName.Insight],
        ["Lança", "Dardo"],
        [],
        "https://i.pinimg.com/564x/44/e9/90/44e9903c73409404223f0646006e0030.jpg"
    ),
    createPreset(
        "Cassius", "Draconato", "Paladino", "Nobre",
        { [Attribute.STR]: 16, [Attribute.DEX]: 10, [Attribute.CON]: 14, [Attribute.INT]: 8, [Attribute.WIS]: 10, [Attribute.CHA]: 16 },
        [SkillName.Athletics, SkillName.Persuasion],
        ["Espada Longa", "Escudo", "Cota de Malha", "Azagaia"],
        [], // Paladino lvl 1 não tem magia
        "https://i.pinimg.com/564x/54/2e/7e/542e7e447b973f00994f304930926720.jpg"
    ),
    createPreset(
        "Artemis", "Elfo da Floresta", "Ranger", "Forasteiro",
        { [Attribute.STR]: 12, [Attribute.DEX]: 16, [Attribute.CON]: 14, [Attribute.INT]: 10, [Attribute.WIS]: 14, [Attribute.CHA]: 8 },
        [SkillName.Stealth, SkillName.Survival, SkillName.Perception],
        ["Arco Longo", "Espada Curta", "Armadura de Couro Batido", "Flechas (20)"],
        [], // Ranger lvl 1 não tem magia
        "https://i.pinimg.com/564x/a0/0a/60/a00a6042db204c3294326777a2967664.jpg"
    ),
    createPreset(
        "Vex", "Halfling Pés Leves", "Ladino", "Criminoso",
        { [Attribute.STR]: 8, [Attribute.DEX]: 17, [Attribute.CON]: 14, [Attribute.INT]: 12, [Attribute.WIS]: 10, [Attribute.CHA]: 14 },
        [SkillName.Stealth, SkillName.SleightOfHand, SkillName.Deception, SkillName.Acrobatics],
        ["Rapieira", "Arco Curto", "Armadura de Couro", "Adaga", "Ferramentas de Ladrão"],
        [],
        "https://i.pinimg.com/564x/8e/31/7e/8e317e9d724967332247773229b39e60.jpg"
    ),
    createPreset(
        "Pyra", "Tiefling", "Feiticeiro", "Nobre", // Linhagem Dracônica (Fogo)
        { [Attribute.STR]: 8, [Attribute.DEX]: 14, [Attribute.CON]: 14, [Attribute.INT]: 10, [Attribute.WIS]: 12, [Attribute.CHA]: 17 },
        [SkillName.Persuasion, SkillName.Arcana],
        ["Adaga", "Foco Arcano (Cristal)", "Roupas Finas"],
        ["Lança de Fogo", "Prestidigitação", "Toque Chocante", "Ilusão Menor", "Mãos Flamejantes", "Armadura Arcana"],
        "https://i.pinimg.com/564x/42/47/42/42474240742f3607ba970030737a4e60.jpg"
    ),
    createPreset(
        "Moros", "Tiefling", "Bruxo", "Charlatão", // Corruptor
        { [Attribute.STR]: 8, [Attribute.DEX]: 14, [Attribute.CON]: 14, [Attribute.INT]: 12, [Attribute.WIS]: 10, [Attribute.CHA]: 17 },
        [SkillName.Deception, SkillName.Arcana],
        ["Armadura de Couro", "Adaga", "Foco Arcano (Varinha)"],
        ["Rajada Mística", "Ilusão Menor", "Repreensão Infernal", "Enfeitiçar Pessoa"],
        "https://i.pinimg.com/564x/7d/9b/a3/7d9ba38043697962463e2303c6223249.jpg"
    ),
    createPreset(
        "Gale", "Humano", "Mago", "Sábio",
        { [Attribute.STR]: 8, [Attribute.DEX]: 14, [Attribute.CON]: 14, [Attribute.INT]: 16, [Attribute.WIS]: 12, [Attribute.CHA]: 10 },
        [SkillName.Arcana, SkillName.History],
        ["Grimório", "Foco Arcano (Cajado)"],
        ["Lança de Fogo", "Luz", "Mãos Mágicas", "Mísseis Mágicos", "Sono", "Escudo Arcano", "Detectar Magia", "Identificar", "Armadura Arcana"],
        "https://i.pinimg.com/564x/b6/42/ab/b642ab4d420286246307366749964467.jpg"
    )
];
