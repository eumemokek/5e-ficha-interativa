
import { Attribute, Character, Item, Spell, SkillName, Skill, Feature, FeatureModifier, FeatureDefinition } from './types';
import { CLASSES, RACES, BACKGROUNDS, FEATURE_OPTIONS } from './data/rules';
import { ALL_ITEMS, ALL_SPELLS } from './data/compendium';
import { 
  Sword, Shield, Flame, Zap, Cross, Leaf, Music, Skull, 
  Eye, Hand, Crown, Star, Moon, Sun, Ghost
} from 'lucide-react';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

export const getModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const formatModifier = (mod: number): string => {
  return mod >= 0 ? `+${mod}` : `${mod}`;
};

export const getProficiencyBonus = (level: number): number => {
  return Math.ceil(level / 4) + 1;
};

export const getCharacterStats = (char: Character) => {
    const finalAttributes = { ...char.attributes };
    char.features.forEach(feature => {
        if (feature.level && feature.level > char.level) return;
        if (!feature.active) return;
        feature.modifiers?.forEach(mod => {
            if (mod.target === 'attribute' && mod.stat && mod.value) {
                const val = typeof mod.value === 'number' ? mod.value : Number(mod.value) || 0;
                finalAttributes[mod.stat] += val;
                const cap = (feature.name === 'Campeão Primitivo') ? 24 : 20;
                if (finalAttributes[mod.stat] > cap) finalAttributes[mod.stat] = cap; 
            }
        });
    });

    const dexMod = getModifier(finalAttributes[Attribute.DEX]);
    const raceDef = RACES[char.race] || RACES['Humano'];
    const equippedArmor = char.inventory.find(i => i.type === 'Armadura' && i.equipped);
    const equippedShield = char.inventory.find(i => i.type === 'Escudo' && i.equipped);
    
    // CORREÇÃO: Exclui 'Roupas' da soma de bônus, pois roupas não dão bônus mágico acumulativo por padrão
    const otherAcBonusItem = char.inventory
        .filter(i => i.equipped && i.acBonus && i.type !== 'Armadura' && i.type !== 'Escudo' && i.type !== 'Roupas')
        .reduce((acc, item) => acc + (item.acBonus || 0), 0);

    const isArmored = !!equippedArmor;
    const isShielded = !!equippedShield;
    const isHeavyArmor = equippedArmor?.properties?.includes('Pesada') || false;

    let acBase = 10 + dexMod; 
    let acBonus = 0;
    let speed = raceDef.speed;
    let initiative = dexMod;
    let hpPerLevelBonus = 0;
    let saveBonusAll = 0;

    char.features.forEach(feature => {
        if (feature.level && feature.level > char.level) return;
        if (!feature.active) return;
        if (feature.modifiers) {
            feature.modifiers.forEach(mod => {
                if (mod.condition === 'unarmored' && isArmored) return;
                if (mod.condition === 'no_shield' && isShielded) return;
                if (mod.condition === 'armored' && !isArmored) return;
                if (mod.condition === 'heavy_armor' && !isHeavyArmor) return;
                switch (mod.target) {
                    case 'ac':
                        if (mod.type === 'formula' && mod.stat) {
                            const statBonus = getModifier(finalAttributes[mod.stat]);
                            const formulaAC = 10 + dexMod + statBonus;
                            if (formulaAC > acBase) acBase = formulaAC;
                        } else if (mod.type === 'formula' && mod.value) {
                            const val = typeof mod.value === 'number' ? mod.value : Number(mod.value) || 10;
                            const formulaAC = val + dexMod;
                            if (formulaAC > acBase) acBase = formulaAC;
                        } else if (mod.type === 'bonus' && mod.value) {
                            const val = typeof mod.value === 'number' ? mod.value : Number(mod.value) || 0;
                            acBonus += val;
                        }
                        break;
                    case 'speed':
                        if (mod.type === 'bonus' && mod.value) {
                            const val = typeof mod.value === 'number' ? mod.value : Number(mod.value) || 0;
                            speed += val;
                        }
                        break;
                    case 'initiative':
                        if (mod.type === 'bonus' && mod.value) {
                            const val = typeof mod.value === 'number' ? mod.value : Number(mod.value) || 0;
                            initiative += val;
                        } else if (mod.type === 'formula' && mod.stat) {
                            initiative += getModifier(finalAttributes[mod.stat]);
                        }
                        break;
                    case 'hp_per_level':
                        if (mod.type === 'bonus' && mod.value) {
                            const val = typeof mod.value === 'number' ? mod.value : Number(mod.value) || 0;
                            hpPerLevelBonus += val;
                        }
                        break;
                    case 'saving_throw_all':
                        if (mod.type === 'bonus' && mod.stat) {
                            saveBonusAll += getModifier(finalAttributes[mod.stat]);
                        }
                        break;
                }
            });
        }
    });

    if (isArmored && equippedArmor) {
        const armorBase = (equippedArmor.acBonus || 10);
        if (equippedArmor.properties?.includes('Pesada')) { acBase = armorBase; } 
        else if (equippedArmor.properties?.includes('Média')) { acBase = armorBase + Math.min(dexMod, 2); } 
        else { acBase = armorBase + dexMod; }
    }
    let totalAC = acBase + acBonus + otherAcBonusItem;
    if (isShielded) totalAC += (equippedShield.acBonus || 2);
    
    const extraHp = hpPerLevelBonus * char.level;
    const baseConMod = getModifier(char.attributes[Attribute.CON]);
    const finalConMod = getModifier(finalAttributes[Attribute.CON]);
    const conDiffHp = (finalConMod - baseConMod) * char.level;
    const totalMaxHp = char.hp.max + extraHp + conDiffHp;
    
    return { attributes: finalAttributes, ac: totalAC, initiative, speed, maxHp: totalMaxHp, saveBonusAll };
};

export const getStatBreakdown = (char: Character, type: string, extra?: string): string => {
    const stats = getCharacterStats(char);
    const prof = getProficiencyBonus(char.level);
    
    switch(type) {
        case 'ac':
            const armor = char.inventory.find(i => i.type === 'Armadura' && i.equipped);
            const shield = char.inventory.find(i => i.type === 'Escudo' && i.equipped);
            const dexMod = getModifier(stats.attributes[Attribute.DEX]);
            let breakdown = `C.A. Total: ${stats.ac}\n`;
            if (!armor) breakdown += `- Base Sem Armadura: 10\n- Mod. Destreza: ${formatModifier(dexMod)}\n`;
            else breakdown += `- Base da Armadura (${armor.name}): ${armor.acBonus}\n- Mod. Destreza (Máx Médias/Pesadas): ${armor.properties?.includes('Pesada') ? '0' : armor.properties?.includes('Média') ? Math.min(dexMod, 2) : dexMod}\n`;
            if (shield) breakdown += `- Escudo (${shield.name}): +${shield.acBonus}\n`;
            char.features.forEach(f => {
                if (f.active && f.modifiers?.some(m => m.target === 'ac')) {
                    const mod = f.modifiers.find(m => m.target === 'ac');
                    breakdown += `- ${f.name}: +${mod?.value || getModifier(stats.attributes[mod?.stat || Attribute.STR])}\n`;
                }
            });
            return breakdown;
        case 'initiative':
            return `Iniciativa: ${formatModifier(stats.initiative)}\n- Mod. Destreza: ${formatModifier(getModifier(stats.attributes[Attribute.DEX]))}${char.features.some(f => f.active && f.name.includes('Pau pra Toda Obra')) ? '\n- Pau pra Toda Obra: +1' : ''}`;
        case 'speed':
            return `Deslocamento: ${stats.speed}m\n- Base da Raça: ${RACES[char.race]?.speed || 9}m\n` + char.features.filter(f => f.active && f.modifiers?.some(m => m.target === 'speed')).map(f => `- ${f.name}: +${f.modifiers?.find(m => m.target === 'speed')?.value}m`).join('\n');
        case 'hp':
            const classDef = CLASSES[char.class.split(' ')[0]];
            return `Vida Máxima: ${stats.maxHp}\n- Rolagens/Média: ${char.hp.max}\n- Constituição (Lvl ${char.level}): +${getModifier(stats.attributes[Attribute.CON]) * char.level}\n` + char.features.filter(f => f.active && f.modifiers?.some(m => m.target === 'hp_per_level')).map(f => `- ${f.name}: +${Number(f.modifiers?.find(m => m.target === 'hp_per_level')?.value) * char.level}`).join('\n');
        case 'save':
            const attr = extra as Attribute;
            const mod = getModifier(stats.attributes[attr]);
            const isProf = char.savingThrows[attr];
            return `Salvaguarda ${attr}: ${formatModifier(mod + (isProf ? prof : 0) + stats.saveBonusAll)}\n- Mod. Atributo: ${formatModifier(mod)}\n` + (isProf ? `- Proficiência: +${prof}\n` : '') + (stats.saveBonusAll > 0 ? `- Bônus de Aura: +${stats.saveBonusAll}\n` : '');
        case 'skill':
            const skill = char.skills.find(s => s.name === extra);
            if (!skill) return "";
            const sMod = getModifier(stats.attributes[skill.attribute]);
            return `Perícia ${skill.name}: ${formatModifier(sMod + (skill.proficient ? prof : 0) + (skill.expertise ? prof : 0))}\n- Mod. ${skill.attribute}: ${formatModifier(sMod)}\n` + (skill.proficient ? `- Proficiência: +${prof}\n` : '') + (skill.expertise ? `- Especialização: +${prof}\n` : '');
        default: return "";
    }
};

export const calculateResourceMax = (resourceDef: any, level: number): number => {
    if (!resourceDef.levelScaling) return resourceDef.baseAmount;
    if (typeof resourceDef.levelScaling === 'function') { return resourceDef.baseAmount + resourceDef.levelScaling(level); } 
    else {
        const levels = Object.keys(resourceDef.levelScaling).map(Number).sort((a,b) => b-a);
        for (const lvl of levels) { if (level >= lvl) return resourceDef.levelScaling[lvl]; }
        return resourceDef.baseAmount;
    }
};

export const calculateEncumbrance = (char: Character) => {
    const current = char.inventory.reduce((acc, item) => acc + (item.weight * item.quantity), 0);
    const max = char.attributes[Attribute.STR] * 7.5; 
    return { current, max };
};

// ATUALIZADO: Removido userId
export const createNewCharacter = (
    race: string, 
    className: string, 
    background: string, 
    name: string,
    initialAttributes?: Record<Attribute, number>,
    selectedSkills?: SkillName[],
    selectedFeatures?: Record<string, string>
): Character => {
    const raceDef = RACES[race] || RACES['Humano'];
    const classDef = CLASSES[className] || CLASSES['Guerreiro'];
    const bgDef = BACKGROUNDS[background] || BACKGROUNDS['Soldado'];

    // Define atributos: Usa os passados ou padrão
    const baseAttrs = initialAttributes || {
        [Attribute.STR]: 10, [Attribute.DEX]: 10, [Attribute.CON]: 10,
        [Attribute.INT]: 10, [Attribute.WIS]: 10, [Attribute.CHA]: 10,
    };

    // Aplica bônus raciais
    const attributes = { ...baseAttrs };
    Object.entries(raceDef.abilityBonuses).forEach(([attr, bonus]) => {
        if(bonus) attributes[attr as Attribute] += bonus;
    });

    const hpBase = parseHitDie(classDef.hitDie);
    const conMod = getModifier(attributes[Attribute.CON]);

    const skillAttrMap: Record<SkillName, Attribute> = {
        [SkillName.Acrobatics]: Attribute.DEX, [SkillName.AnimalHandling]: Attribute.WIS, [SkillName.Arcana]: Attribute.INT, [SkillName.Athletics]: Attribute.STR, [SkillName.Deception]: Attribute.CHA, [SkillName.History]: Attribute.INT, [SkillName.Insight]: Attribute.WIS, [SkillName.Intimidation]: Attribute.CHA, [SkillName.Investigation]: Attribute.INT, [SkillName.Medicine]: Attribute.WIS, [SkillName.Nature]: Attribute.INT, [SkillName.Perception]: Attribute.WIS, [SkillName.Performance]: Attribute.CHA, [SkillName.Persuasion]: Attribute.CHA, [SkillName.Religion]: Attribute.INT, [SkillName.SleightOfHand]: Attribute.DEX, [SkillName.Stealth]: Attribute.DEX, [SkillName.Survival]: Attribute.WIS,
    };

    // Define perícias
    const skills = Object.values(SkillName).map(name => {
        let proficient = false;
        // Do antecedente (fixo)
        if (bgDef.skills.includes(name as SkillName)) proficient = true;
        // Escolhidas no wizard (classe ou raça se houver)
        if (selectedSkills && selectedSkills.includes(name as SkillName)) proficient = true;
        
        return { name, attribute: skillAttrMap[name as SkillName], proficient, expertise: false };
    });

    let character: Character = {
        id: generateId(), 
        name: name || 'Novo Herói', race, class: className, level: 1, background, alignment: 'Neutro', xp: 0, 
        attributes, 
        savingThrows: classDef.savingThrows.reduce((acc, attr) => ({ ...acc, [attr]: true }), {} as any), 
        skills, 
        hp: { current: hpBase + conMod, max: hpBase + conMod, temp: 0, hitDice: classDef.hitDie, hitDiceUsed: 0 }, 
        deathSaves: { success: 0, failures: 0 }, 
        inventory: [], spells: [], 
        features: raceDef.features.map(f => ({ ...f, id: generateId(), source: 'Raça' as const, active: true, level: 1 })), // Raça é level 1
        spellSlotsUsed: {}, resourceUsage: {}, currency: { cp: 0, sp: 0, gp: 10 },
        lore: { backstory: '', sessions: [], notes: [], personality: { traits: '', ideals: '', bonds: '', flaws: '' } }
    };

    // Aplica features iniciais e escolhas
    const { updatedChar } = syncCharacterFeatures(character);
    character = updatedChar;

    if (selectedFeatures) {
        Object.entries(selectedFeatures).forEach(([featureKey, optionName]) => {
            character = applyFeatureOption(character, featureKey, optionName);
        });
    }

    return character;
};

export const createNewItem = (): Item => ({ id: generateId(), name: 'Novo Item', type: 'Item', weight: 0, quantity: 1, description: '', equipped: false });
export const createNewSpell = (): Spell => ({ id: generateId(), name: 'Nova Magia', level: 0, school: 'Transmutação', castingTime: '1 ação', range: 'Pessoal', components: 'V, S', duration: 'Instantânea', description: '', prepared: false, classes: [] });

export const getCharacterMaxSpellSlots = (char: Character): Record<number, number> => {
    const baseClass = char.class.split(' ')[0];
    const classDef = CLASSES[baseClass];
    if (!classDef || !classDef.spellcasting || !classDef.spellcasting.slotsTable) return {};
    const slots = classDef.spellcasting.slotsTable[char.level];
    if (!slots) return {};
    const result: Record<number, number> = {};
    slots.forEach((count, lvl) => { if (lvl > 0 && count > 0) result[lvl] = count; });
    return result;
};

// --- FUNÇÃO CRÍTICA CORRIGIDA ---
export const applyFeatureOption = (char: Character, featureKey: string, optionName: string): Character => {
    const featureDef = FEATURE_OPTIONS[featureKey];
    if (!featureDef) return char;
    const option = featureDef.options.find(o => o.name === optionName);
    if (!option) return char;

    let updatedChar = { ...char };

    // Encontra a feature pai para pegar o nível dela, se existir, senão usa o nível do char
    const parentFeature = updatedChar.features.find(f => f.name === featureKey);
    const featureLevel = parentFeature?.level || updatedChar.level;
    const featureSource = parentFeature?.source || 'Classe';

    // Adiciona Sub-Features
    const newFeatures = [...updatedChar.features];
    if (option.featuresAdded) { 
        option.featuresAdded.forEach(f => { 
            newFeatures.push({ 
                ...f, 
                id: generateId(), 
                source: featureSource, // Herda a fonte do pai
                active: true, 
                origin: featureKey,
                level: featureLevel // Usa o nível correto
            } as Feature); 
        }); 
    }

    // Adiciona Magias (Origem marcada para não sumir facilmente)
    const newSpells = [...updatedChar.spells];
    if (option.spellsAdded) { 
        option.spellsAdded.forEach(sName => { 
            const spellDef = ALL_SPELLS.find(s => s.name === sName); 
            if (spellDef && !newSpells.some(s => s.name === sName)) { 
                newSpells.push({ 
                    ...spellDef, 
                    id: generateId(), 
                    prepared: true, 
                    origin: `${featureKey}: ${optionName}` 
                }); 
            } 
        }); 
    }

    // --- CORREÇÃO: ADICIONA PERÍCIAS ---
    let newSkills = [...updatedChar.skills];
    if (option.skillsAdded && option.skillsAdded.length > 0) {
        newSkills = newSkills.map(skill => {
            if (option.skillsAdded?.includes(skill.name)) {
                return { ...skill, proficient: true };
            }
            return skill;
        });
    }

    // Atualiza nome da Feature Pai para indicar escolha feita
    const idx = newFeatures.findIndex(f => f.name === featureKey);
    if (idx >= 0) { 
        newFeatures[idx] = { 
            ...newFeatures[idx], 
            name: `${featureKey}: ${optionName}`, 
            origin: featureKey,
            level: featureLevel 
        }; 
    }

    return { 
        ...updatedChar, 
        features: newFeatures, 
        spells: newSpells,
        skills: newSkills
    };
};

export const resetFeatureChoice = (char: Character, featureId: string): Character => {
    const feature = char.features.find(f => f.id === featureId);
    if (!feature || !feature.origin) return char;
    const originKey = feature.origin;

    // Remove Features filhas
    const newFeatures = char.features.filter(f => f.origin !== originKey);
    
    // Restaura Feature Pai
    const baseClass = char.class.split(' ')[0];
    const classDef = CLASSES[baseClass];
    let originalDef = null;
    if (classDef) { 
        for (const lvl of Object.keys(classDef.features).map(Number)) { 
            const found = classDef.features[lvl].find(f => f.name === originKey); 
            if (found) { originalDef = { ...found, level: lvl }; break; } 
        } 
    }
    // Fallback para procurar nas opções se não achou na classe (ex: raça)
    if (!originalDef && FEATURE_OPTIONS[originKey]) {
         originalDef = { name: originKey, description: "Escolha uma opção.", level: feature.level };
    }

    if (originalDef) { 
        newFeatures.push({ 
            id: generateId(), 
            name: originKey, 
            source: feature.source, 
            description: originalDef.description, 
            active: true, 
            level: originalDef.level || feature.level // Mantém o nível original
        }); 
    }

    // Remove Magias ganhas pela feature
    const newSpells = char.spells.filter(s => !s.origin?.startsWith(originKey));

    // Nota: Resetar Skills é complexo pois não rastreamos a fonte da proficiência.
    // O usuário terá que remover a proficiência manualmente se desejar, para evitar bugs de remover skills de Background.

    return { ...char, features: newFeatures, spells: newSpells };
};

export const syncCharacterFeatures = (char: Character): { updatedChar: Character, notifications: string[], newFeatures: Feature[] } => {
    const baseClass = char.class.split(' ')[0];
    const classDef = CLASSES[baseClass];
    const notifications: string[] = [];
    const newFeatures: Feature[] = [];
    
    if (!classDef) return { updatedChar: char, notifications, newFeatures };
    
    const currentFeatures = [...char.features];
    
    for (let lvl = 1; lvl <= char.level; lvl++) {
        const lvlFeatures = classDef.features[lvl];
        if (lvlFeatures) {
            lvlFeatures.forEach(fDef => {
                const hasFeature = currentFeatures.some(f => f.name === fDef.name || f.origin === fDef.name || f.name.startsWith(`${fDef.name}:`));
                if (!hasFeature) {
                    const newFeature = { 
                        id: generateId(), 
                        name: fDef.name, 
                        source: 'Classe' as const, 
                        description: fDef.description, 
                        active: true, 
                        level: lvl, // GARANTE QUE O NÍVEL SEJA SALVO
                        modifiers: fDef.modifiers 
                    };
                    currentFeatures.push(newFeature);
                    newFeatures.push(newFeature);
                    
                    if (FEATURE_OPTIONS[fDef.name]) { notifications.push(`CHOICE:${fDef.name}`); } 
                    else if (fDef.name === 'Incremento no Valor de Habilidade') { notifications.push('ASI'); }
                }
            });
        }
    }
    return { updatedChar: { ...char, features: currentFeatures }, notifications, newFeatures };
};

export const getFeatureOptions = (featureName: string): FeatureDefinition | undefined => {
    const cleanName = featureName.split(':')[0].trim();
    return FEATURE_OPTIONS[cleanName];
};

export const getMaxPreparedSpells = (char: Character): number | 'N/A' => {
    const stats = getCharacterStats(char); 
    const baseClass = char.class.split(' ')[0];
    const level = char.level;
    const intMod = Math.max(1, getModifier(stats.attributes[Attribute.INT]));
    const wisMod = Math.max(1, getModifier(stats.attributes[Attribute.WIS]));
    const chaMod = Math.max(1, getModifier(stats.attributes[Attribute.CHA]));

    if (baseClass === 'Mago') return Math.max(1, level + intMod);
    if (baseClass === 'Clérigo' || baseClass === 'Druida') return Math.max(1, level + wisMod);
    if (baseClass === 'Paladino') return Math.max(1, Math.floor(level / 2) + chaMod);
    if (baseClass === 'Artífice') return Math.max(1, Math.floor(level / 2) + intMod);
    
    return 'N/A'; // Bardos, Feiticeiros, Bruxos, Rangers, Ladinos e Guerreiros não preparam
};

export const getSpellsKnownLimit = (char: Character): number | 'Unlimited' => {
    const baseClass = char.class.split(' ')[0];
    const charClassDef = CLASSES[baseClass];
    if (!charClassDef || !charClassDef.spellcasting) return 0;
    
    // Classes que preparam do grimório (Mago) ou de toda lista (Clérigo/Druida) não tem limite de "conhecidas" na mecânica do jogo (elas "sabem" tudo ou escrevem no livro)
    if (charClassDef.spellcasting.access === 'ALL' || baseClass === 'Mago') return 'Unlimited';
    
    // Classes Conhecidas (Bardo, Feiticeiro, Bruxo, Ranger)
    if (charClassDef.spellcasting.type === 'Known' && charClassDef.spellcasting.spellsKnownFormula) { 
        return charClassDef.spellcasting.spellsKnownFormula(char.level); 
    }
    
    return 0;
}

export const canLearnCantrip = (char: Character): boolean => {
    const baseClass = char.class.split(' ')[0];
    const charClassDef = CLASSES[baseClass];
    if (!charClassDef || !charClassDef.spellcasting || !charClassDef.spellcasting.cantripsKnown) return false;
    const levels = Object.keys(charClassDef.spellcasting.cantripsKnown).map(Number).sort((a,b) => b-a);
    let limit = 0;
    for (const lvl of levels) { if (char.level >= lvl) { limit = charClassDef.spellcasting.cantripsKnown[lvl]; break; } }
    const knownCantrips = char.spells.filter(s => s.level === 0 && !s.origin).length; 
    return knownCantrips < limit;
};

export const canLearnSpell = (char: Character, spellLevel: number): boolean => {
    if (spellLevel === 0) return canLearnCantrip(char);
    const limit = getSpellsKnownLimit(char);
    if (limit === 'Unlimited') return true;
    const currentKnown = char.spells.filter(s => s.level > 0 && !s.origin).length;
    return currentKnown < limit;
};

export const getMaxSpellLevel = (charClass: string, level: number): number => {
    const baseClass = charClass.split(' ')[0];
    if (['Bárbaro', 'Monge', 'Ladino', 'Guerreiro'].includes(baseClass)) {
        if (baseClass === 'Guerreiro' || baseClass === 'Ladino') { if (level < 3) return 0; return Math.ceil(level / 6.0); }
        return 0;
    }
    if (['Paladino', 'Ranger'].includes(baseClass)) { if (level < 2) return 0; return Math.ceil(level / 4.0); }
    if (baseClass === 'Bruxo') return level >= 17 ? 5 : level >= 9 ? 5 : level >= 7 ? 4 : level >= 5 ? 3 : level >= 3 ? 2 : 1;
    return Math.ceil(level / 2.0);
};

export const parseHitDie = (hitDieString: string): number => {
    const match = hitDieString.match(/d(\d+)/i);
    return match ? parseInt(match[1], 10) : 8;
};
