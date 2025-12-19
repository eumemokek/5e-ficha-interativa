
import React, { useMemo, useState } from 'react';
import { Character, ClassDefinition, Spell, Attribute } from '../../types';
import { 
    getMaxPreparedSpells, getSpellsKnownLimit, canLearnCantrip, canLearnSpell, getMaxSpellLevel, generateId, getModifier 
} from '../../utils';
import { ALL_SPELLS } from '../../data/compendium';
import { Zap, BookOpen, Book, Trash2, Search, Plus, Sparkles } from 'lucide-react';

interface GrimoireTabProps {
    char: Character;
    charClassDef: ClassDefinition;
    updateCharacter: (updates: Partial<Character>) => void;
    setModalType: (type: string) => void;
    setEditingSpell: (spell: Spell | null) => void;
    profBonus: number;
    onDeleteSpell: (spellId: string) => void;
}

const GrimoireTab: React.FC<GrimoireTabProps> = ({ char, charClassDef, updateCharacter, setModalType, setEditingSpell, profBonus, onDeleteSpell }) => {
    const [activeGrimoireTab, setActiveGrimoireTab] = useState<number>(0);

    const maxPrepared = useMemo(() => getMaxPreparedSpells(char), [char]);
    const currentPrepared = useMemo(() => char.spells.filter(s => s.prepared && s.level > 0 && !s.origin).length, [char.spells]);
    const spellsKnownLimit = useMemo(() => getSpellsKnownLimit(char), [char]);
    const currentKnown = useMemo(() => char.spells.filter(s => s.level > 0 && !s.origin).length, [char.spells]);
    const maxCantrips = useMemo(() => {
        if (!charClassDef || !charClassDef.spellcasting || !charClassDef.spellcasting.cantripsKnown) return 0;
        const levels = Object.keys(charClassDef.spellcasting.cantripsKnown).map(Number).sort((a,b) => b-a);
        for (const lvl of levels) { if (char.level >= lvl) return charClassDef.spellcasting.cantripsKnown[lvl]; }
        return 0;
    }, [char.level, charClassDef]);
    const currentCantrips = useMemo(() => char.spells.filter(s => s.level === 0 && !s.origin).length, [char.spells]);
    const maxCastableLevel = useMemo(() => getMaxSpellLevel(char.class.split(' ')[0], char.level), [char.class, char.level]);

    const currentTabSpells = useMemo(() => {
        const baseClass = char.class.split(' ')[0];
        const isAllAccess = charClassDef.spellcasting?.access === 'ALL';
        if (activeGrimoireTab === 0) return char.spells.filter(s => s.level === 0).sort((a,b) => a.name.localeCompare(b.name));
        if (isAllAccess) {
            return ALL_SPELLS.filter(spell => spell.classes && spell.classes.includes(baseClass) && spell.level === activeGrimoireTab).map(spell => {
                const existing = char.spells.find(s => s.name === spell.name);
                return existing || { ...spell, id: `virtual-${spell.name}`, prepared: false, classes: spell.classes || [] };
            });
        }
        return char.spells.filter(s => s.level === activeGrimoireTab).sort((a,b) => a.name.localeCompare(b.name));
    }, [char.class, activeGrimoireTab, char.spells, charClassDef.spellcasting]);

    const handleTogglePrepare = (spell: Spell) => {
        if (spell.level === 0 || spell.origin) return;
        if (maxPrepared !== 'N/A' && !spell.prepared && currentPrepared >= (maxPrepared as number)) {
            alert(`Limite de magias preparadas atingido (${maxPrepared}).`);
            return;
        }
        if (spell.id.startsWith('virtual-')) {
            updateCharacter({ spells: [...char.spells, { ...spell, id: generateId(), prepared: true }] });
        } else {
            const isAllAccess = charClassDef.spellcasting?.access === 'ALL';
            if (isAllAccess && spell.prepared) {
                 updateCharacter({ spells: char.spells.filter(s => s.id !== spell.id) });
            } else {
                 updateCharacter({ spells: char.spells.map(s => s.id === spell.id ? {...s, prepared: !s.prepared} : s) });
            }
        }
    };

    return (
        <div className="h-full glass-panel rounded-xl flex flex-col">
            <div className="p-6 border-b border-white/10 bg-black/20 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-cinzel text-grim-magic">Grimório</h2>
                        <div className="text-xs text-grim-muted mt-1 uppercase tracking-widest font-bold flex gap-4">
                            <span>CD Conjuração: {8 + profBonus + getModifier(char.attributes[charClassDef.spellcasting?.ability || Attribute.INT])}</span>
                            <span>Bônus Ataque: +{profBonus + getModifier(char.attributes[charClassDef.spellcasting?.ability || Attribute.INT])}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <button onClick={() => setModalType('spell-search')} className="bg-grim-magic text-white px-6 py-2 rounded text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-lg">
                            {charClassDef.spellcasting?.type === 'Known' ? 
                              `Nova Magia (${currentKnown}/${spellsKnownLimit === 'Unlimited' ? '∞' : spellsKnownLimit})` : 
                              `Nova Magia`
                            }
                        </button>
                        <div className="flex gap-4">
                            {/* Contador de Truques */}
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-bold text-grim-muted tracking-widest">Truques</span>
                                <div className={`text-sm font-mono font-bold ${currentCantrips > maxCantrips ? 'text-grim-danger' : 'text-white'}`}>
                                    {currentCantrips} <span className="text-grim-muted">/ {maxCantrips}</span>
                                </div>
                                <div className="w-20 h-1 bg-white/10 rounded mt-1 overflow-hidden">
                                    <div className={`h-full ${currentCantrips > maxCantrips ? 'bg-grim-danger' : 'bg-white'}`} style={{width: `${Math.min(100, (currentCantrips/maxCantrips)*100)}%`}}></div>
                                </div>
                            </div>
                            
                            {/* Contador de Preparadas/Conhecidas */}
                            {charClassDef.spellcasting?.type === 'Prepared' && maxPrepared !== 'N/A' && (
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-bold text-grim-muted tracking-widest">Preparadas</span>
                                    <div className={`text-sm font-mono font-bold ${currentPrepared > (maxPrepared as number) ? 'text-grim-danger' : 'text-grim-magic'}`}>
                                        {currentPrepared} <span className="text-grim-muted">/ {maxPrepared}</span>
                                    </div>
                                    <div className="w-20 h-1 bg-white/10 rounded mt-1 overflow-hidden">
                                        <div className={`h-full ${currentPrepared > (maxPrepared as number) ? 'bg-grim-danger' : 'bg-grim-magic'}`} style={{width: `${Math.min(100, (currentPrepared/(maxPrepared as number))*100)}%`}}></div>
                                    </div>
                                </div>
                            )}
                            
                            {charClassDef.spellcasting?.type === 'Known' && spellsKnownLimit !== 'Unlimited' && (
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-bold text-grim-muted tracking-widest">Conhecidas</span>
                                    <div className={`text-sm font-mono font-bold ${currentKnown > (spellsKnownLimit as number) ? 'text-grim-danger' : 'text-grim-magic'}`}>
                                        {currentKnown} <span className="text-grim-muted">/ {spellsKnownLimit}</span>
                                    </div>
                                    <div className="w-20 h-1 bg-white/10 rounded mt-1 overflow-hidden">
                                        <div className={`h-full ${currentKnown > (spellsKnownLimit as number) ? 'bg-grim-danger' : 'bg-grim-magic'}`} style={{width: `${Math.min(100, (currentKnown/(spellsKnownLimit as number))*100)}%`}}></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 border-b border-grim-border/30 shrink-0">
                    <button onClick={() => setActiveGrimoireTab(0)} className={`px-6 py-2 rounded-t text-sm font-bold uppercase transition-all ${activeGrimoireTab === 0 ? 'bg-grim-magic text-white' : 'text-grim-muted hover:text-white hover:bg-white/5'}`}>Truques</button>
                    {Array.from({length: maxCastableLevel}).map((_, i) => { const lvl = i + 1; return (<button key={lvl} onClick={() => setActiveGrimoireTab(lvl)} className={`px-6 py-2 rounded-t text-sm font-bold uppercase transition-all ${activeGrimoireTab === lvl ? 'bg-grim-magic text-white' : 'text-grim-muted hover:text-white hover:bg-white/5'}`}>Nível {lvl}</button>)})}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentTabSpells.map(spell => (
                        <div key={spell.id} className={`relative p-5 rounded border transition-all cursor-pointer group flex flex-col h-full ${spell.prepared ? 'bg-grim-magic/10 border-grim-magic shadow-[0_0_10px_rgba(139,92,246,0.1)]' : 'bg-black/30 border-grim-border/30 opacity-60 hover:opacity-100'}`} onClick={() => { setEditingSpell(spell); setModalType('spell-detail'); }}>
                            <div className="flex justify-between items-start mb-2"><div className={`font-bold text-lg truncate pr-12 ${spell.prepared ? 'text-grim-magic' : 'text-grim-text'}`}>{spell.name}</div></div>
                            
                            {/* IDENTIFICAÇÃO VISUAL DA ORIGEM */}
                            {spell.origin && (
                                <div className="mb-2">
                                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 uppercase tracking-wider font-bold flex items-center gap-1 w-fit">
                                        <Sparkles size={10} /> {spell.origin}
                                    </span>
                                </div>
                            )}

                            <div className="text-xs text-grim-muted uppercase mb-auto flex gap-3"><span>{spell.castingTime}</span><span>•</span><span>{spell.range}</span></div>
                            <div className="absolute top-4 right-4 flex gap-2 z-20">
                                {spell.level > 0 && !spell.origin && (charClassDef.spellcasting?.type === 'Prepared') && (<button onClick={(e) => { e.stopPropagation(); handleTogglePrepare(spell); }} className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${spell.prepared ? 'text-grim-magic' : 'text-grim-muted'}`} title={spell.prepared ? "Despreparar" : "Preparar"}>{spell.prepared ? <BookOpen size={18}/> : <Book size={18} />}</button>)}
                                
                                {/* BOTÃO DE EXCLUIR CORRIGIDO E EVIDENTE */}
                                {!spell.origin && !spell.id.startsWith('virtual-') && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDeleteSpell(spell.id); }} 
                                        className="p-1.5 text-grim-muted hover:text-grim-danger transition-colors bg-black/40 hover:bg-black/80 rounded-full" 
                                        title="Esquecer Magia"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {currentTabSpells.length === 0 && <div className="col-span-full flex flex-col items-center justify-center py-24 text-grim-muted italic opacity-40"><Zap size={48} className="mb-4"/><p className="text-lg">Nenhuma magia neste nível.</p></div>}
                </div>
            </div>
        </div>
    );
};

export default GrimoireTab;
