
import { ClassDefinition } from '../types';
import { BARBARIAN } from './classes/barbarian';
import { BARD } from './classes/bard';
import { CLERIC } from './classes/cleric';
import { DRUID } from './classes/druid';
import { FIGHTER } from './classes/fighter';
import { MONK } from './classes/monk';
import { PALADIN } from './classes/paladin';
import { RANGER } from './classes/ranger';
import { ROGUE } from './classes/rogue';
import { SORCERER } from './classes/sorcerer';
import { WARLOCK } from './classes/warlock';
import { WIZARD } from './classes/wizard';

// Re-exporta tudo para manter compatibilidade com o resto do app
export * from '../types'; 
export * from './magic';
export * from './races';
export * from './backgrounds';
export * from './features';

export const CLASSES: Record<string, ClassDefinition> = {
    'Bárbaro': BARBARIAN,
    'Bardo': BARD,
    'Clérigo': CLERIC,
    'Druida': DRUID,
    'Feiticeiro': SORCERER,
    'Guerreiro': FIGHTER,
    'Ladino': ROGUE,
    'Mago': WIZARD,
    'Monge': MONK,
    'Paladino': PALADIN,
    'Ranger': RANGER,
    'Bruxo': WARLOCK
};
