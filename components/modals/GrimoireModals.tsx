
import React, { useState } from 'react';
import { Spell, Character } from '../../types';
import { ALL_SPELLS, CompendiumSpell } from '../../data/compendium';
import { generateId, canLearnCantrip, canLearnSpell, getSpellsKnownLimit } from '../../utils';
import { CLASSES } from '../../data/rules';
import { Search, Trash2, Edit3, BookOpen, Clock, Scan, Hand, Hourglass } from 'lucide-react';
import Modal from '../Modal';

interface GrimoireModalsProps {
    modalType: string;
    setModalType: (type: string) => void;
    editingSpell: Spell | null;
    setEditingSpell: (spell: Spell | null) => void;
    char: Character;
    updateCharacter: (updates: Partial<Character>) => void;
    onDeleteSpell: (id: string) => void;
}

export const GrimoireModals: React.FC<GrimoireModalsProps> = ({
    modalType, setModalType, editingSpell, setEditingSpell, char, updateCharacter, onDeleteSpell
}) => {
    // Estado local para Compêndio de Magias
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompendiumSpell, setSelectedCompendiumSpell] = useState<CompendiumSpell | null>(null);
    const [searchSpellLevel, setSearchSpellLevel] = useState<number>(-1); 
    const [filterByClass, setFilterByClass] = useState(true);

    const handleSaveSpell = () => {
        if (!editingSpell) return;
        const list = char.spells;
        const exists = list.some(s => s.id === editingSpell.id);
        const newList = exists ? list.map(s => s.id === editingSpell.id ? editingSpell : s) : [...list, editingSpell];
        updateCharacter({ spells: newList });
        setEditingSpell(null);
        setModalType('none');
    };

    const handleAddSpellFromCompendium = (t: CompendiumSpell) => {
        const baseClass = char.class.split(' ')[0];
        const charClassDef = CLASSES[baseClass];
        const maxCantrips = (() => {
            if (!charClassDef || !charClassDef.spellcasting || !charClassDef.spellcasting.cantripsKnown) return 0;
            const levels = Object.keys(charClassDef.spellcasting.cantripsKnown).map(Number).sort((a,b) => b-a);
            for (const lvl of levels) { if (char.level >= lvl) return charClassDef.spellcasting.cantripsKnown[lvl]; }
            return 0;
        })();
        const spellsKnownLimit = getSpellsKnownLimit(char);

        if (filterByClass && !t.classes.includes(baseClass)) { alert('Esta magia não pertence à lista da sua classe.'); return; }
        if (t.level === 0 && !canLearnCantrip(char)) { alert(`Limite de truques conhecidos atingido (${maxCantrips}).`); return; }
        if (t.level > 0 && baseClass !== 'Mago' && !canLearnSpell(char, t.level)) { alert(`Limite de magias conhecidas atingido (${spellsKnownLimit}).`); return; }
        if(!char.spells.some(s => s.name === t.name)) {
            updateCharacter({ spells: [...char.spells, { ...t, id: generateId(), prepared: (baseClass !== 'Mago' || t.level === 0), classes: t.classes || [] }] });
        }
        alert(`${t.name} adicionado ao grimório!`);
    };

    return (
        <>
            {/* SPELL EDITOR */}
            <Modal isOpen={modalType === 'spell-editor' && !!editingSpell} onClose={() => setModalType('none')} title={editingSpell?.name || "Nova Magia"}>
                {editingSpell && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4"><div className="col-span-8"><label className="text-[10px] uppercase font-bold text-grim-muted">Nome</label><input className="w-full" value={editingSpell.name} onChange={e => setEditingSpell({...editingSpell, name: e.target.value})} /></div><div className="col-span-4"><label className="text-[10px] uppercase font-bold text-grim-muted">Nível</label><input type="number" className="w-full" value={editingSpell.level} onChange={e => setEditingSpell({...editingSpell, level: parseInt(e.target.value) || 0})} /></div></div>
                        <div className="grid grid-cols-2 gap-4"><div><label className="text-[10px] uppercase font-bold text-grim-muted">Escola</label><input className="w-full" value={editingSpell.school} onChange={e => setEditingSpell({...editingSpell, school: e.target.value})} /></div><div><label className="text-[10px] uppercase font-bold text-grim-muted">Tempo</label><input className="w-full" value={editingSpell.castingTime} onChange={e => setEditingSpell({...editingSpell, castingTime: e.target.value})} /></div></div>
                        <div className="grid grid-cols-3 gap-4"><div><label className="text-[10px] uppercase font-bold text-grim-muted">Alcance</label><input className="w-full" value={editingSpell.range} onChange={e => setEditingSpell({...editingSpell, range: e.target.value})} /></div><div><label className="text-[10px] uppercase font-bold text-grim-muted">Comp.</label><input className="w-full" value={editingSpell.components} onChange={e => setEditingSpell({...editingSpell, components: e.target.value})} /></div><div><label className="text-[10px] uppercase font-bold text-grim-muted">Duração</label><input className="w-full" value={editingSpell.duration} onChange={e => setEditingSpell({...editingSpell, duration: e.target.value})} /></div></div>
                        <div><label className="text-[10px] uppercase font-bold text-grim-muted">Descrição</label><textarea className="w-full h-40" value={editingSpell.description} onChange={e => setEditingSpell({...editingSpell, description: e.target.value})} /></div>
                        <button onClick={handleSaveSpell} className="w-full py-3 bg-grim-magic text-white font-bold uppercase rounded">Salvar Magia</button>
                    </div>
                )}
            </Modal>

            {/* SPELL SEARCH (COMPENDIUM) */}
            <Modal isOpen={modalType === 'spell-search'} onClose={() => { setModalType('none'); setSearchTerm(''); setSearchSpellLevel(-1); }} title="Grimório Arcano">
                <div className="flex gap-6 h-[70vh]">
                    <div className="w-1/2 flex flex-col gap-4 border-r border-white/10 pr-6">
                        <div className="flex flex-col gap-3">
                            <div className="relative"><Search className="absolute left-3 top-3 text-grim-muted" size={18}/><input className="pl-10 w-full bg-black/30 border-grim-border text-sm p-2" placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
                            <div className="flex gap-2 overflow-x-auto pb-1"><button onClick={() => setSearchSpellLevel(-1)} className={`px-3 py-1 rounded text-[10px] font-bold uppercase border whitespace-nowrap ${searchSpellLevel === -1 ? 'bg-grim-magic text-white border-grim-magic' : 'text-grim-muted border-grim-border'}`}>Todos</button>{Array.from({length: 10}).map((_, i) => (<button key={i} onClick={() => setSearchSpellLevel(i)} className={`px-3 py-1 rounded text-[10px] font-bold uppercase border whitespace-nowrap ${searchSpellLevel === i ? 'bg-grim-magic text-white border-grim-magic' : 'text-grim-muted border-grim-border'}`}>{i === 0 ? 'Truque' : i}</button>))}</div>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {ALL_SPELLS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) && (searchSpellLevel === -1 || s.level === searchSpellLevel) && (!filterByClass || (s.classes && s.classes.includes(char.class.split(' ')[0])))).map(spell => (
                                <div key={spell.name} onClick={() => setSelectedCompendiumSpell(spell)} className={`p-2 border-b border-white/5 hover:bg-white/5 cursor-pointer group transition-all flex justify-between items-center ${selectedCompendiumSpell?.name === spell.name ? 'bg-grim-magic/20' : ''}`}><div><div className="font-bold text-sm text-white">{spell.name}</div><div className="text-[10px] text-grim-muted">{spell.level === 0 ? 'Truque' : `Nível ${spell.level}`} • {spell.school}</div></div></div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col">{selectedCompendiumSpell && (<div className="flex flex-col h-full gap-4"><h4 className="text-2xl font-cinzel text-grim-magic font-bold">{selectedCompendiumSpell.name}</h4><div className="flex-1 bg-black/20 p-4 rounded border border-white/5 overflow-y-auto custom-scrollbar text-sm font-serif">{selectedCompendiumSpell.description}</div><button onClick={() => handleAddSpellFromCompendium(selectedCompendiumSpell)} className="w-full py-4 bg-grim-magic text-white font-black uppercase rounded">Aprender Magia</button></div>)}</div>
                </div>
            </Modal>

            {/* SPELL DETAIL (PAINEL COMPLETO CORRIGIDO) */}
            <Modal isOpen={modalType === 'spell-detail' && !!editingSpell} onClose={() => setModalType('none')} title={editingSpell?.name || "Detalhes"}>
                {editingSpell && (
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-start border-b border-white/10 pb-4">
                            <div>
                                <h2 className="text-3xl font-cinzel text-grim-magic font-bold mb-1">{editingSpell.name}</h2>
                                <span className="text-lg font-mono font-bold text-white/60">{editingSpell.level === 0 ? 'Truque' : `${editingSpell.level}º Círculo`} <span className="text-grim-muted">•</span> {editingSpell.school}</span>
                            </div>
                            {editingSpell.origin && <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/40 uppercase tracking-wider">{editingSpell.origin}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/30 p-3 rounded flex items-center gap-3 border border-white/5">
                                <Clock size={20} className="text-grim-muted"/>
                                <div><span className="text-[10px] uppercase font-bold text-grim-muted block">Tempo</span><span className="text-sm font-bold text-white">{editingSpell.castingTime}</span></div>
                            </div>
                            <div className="bg-black/30 p-3 rounded flex items-center gap-3 border border-white/5">
                                <Scan size={20} className="text-grim-muted"/>
                                <div><span className="text-[10px] uppercase font-bold text-grim-muted block">Alcance</span><span className="text-sm font-bold text-white">{editingSpell.range}</span></div>
                            </div>
                            <div className="bg-black/30 p-3 rounded flex items-center gap-3 border border-white/5">
                                <Hand size={20} className="text-grim-muted"/>
                                <div><span className="text-[10px] uppercase font-bold text-grim-muted block">Componentes</span><span className="text-sm font-bold text-white">{editingSpell.components}</span></div>
                            </div>
                            <div className="bg-black/30 p-3 rounded flex items-center gap-3 border border-white/5">
                                <Hourglass size={20} className="text-grim-muted"/>
                                <div><span className="text-[10px] uppercase font-bold text-grim-muted block">Duração</span><span className="text-sm font-bold text-white">{editingSpell.duration}</span></div>
                            </div>
                        </div>

                        <div className="bg-black/20 p-5 rounded border border-white/5 shadow-inner min-h-[150px]">
                            <p className="text-sm font-serif leading-relaxed text-grim-text whitespace-pre-wrap">{editingSpell.description}</p>
                        </div>

                        <div className="flex gap-3 pt-2 border-t border-white/10">
                            <button onClick={() => setModalType('spell-editor')} className="flex-1 py-3 bg-grim-border text-white font-bold uppercase rounded hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"><Edit3 size={16}/> Editar</button>
                            {!editingSpell.origin && !editingSpell.id.startsWith('virtual-') && (
                                <button onClick={() => onDeleteSpell(editingSpell.id)} className="px-5 bg-black border border-grim-danger/50 text-grim-danger rounded hover:bg-grim-danger hover:text-white transition-colors"><Trash2 size={18}/></button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};
