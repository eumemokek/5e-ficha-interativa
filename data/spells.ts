
import { CompendiumSpell } from './spells/cantrips'; // Importa o tipo
import { CANTRIPS } from './spells/cantrips';
import { LEVEL_1_SPELLS } from './spells/level1';
import { LEVEL_2_SPELLS } from './spells/level2';
import { LEVEL_3_SPELLS } from './spells/level3';
import { LEVEL_4_SPELLS } from './spells/level4';
import { LEVEL_5_SPELLS } from './spells/level5';

// Re-exporta o tipo para uso em outros lugares
export type { CompendiumSpell };

// Agrega todas as listas
const ALL_SPELLS_UNSORTED = [
    ...CANTRIPS,
    ...LEVEL_1_SPELLS,
    ...LEVEL_2_SPELLS,
    ...LEVEL_3_SPELLS,
    ...LEVEL_4_SPELLS,
    ...LEVEL_5_SPELLS
];

// Ordena por Nível e depois por Nome
export const SPELLS = ALL_SPELLS_UNSORTED.sort((a, b) => {
    if (a.level !== b.level) {
        return a.level - b.level;
    }
    return a.name.localeCompare(b.name);
});

// Mantém a exportação como ALL_SPELLS para compatibilidade com compendium.ts
export const ALL_SPELLS = SPELLS;
