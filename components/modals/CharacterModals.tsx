
import React, { useState, useEffect } from 'react';
import { Character, Attribute, SkillName } from '../../types';
import { createNewCharacter, downloadJSON, applyFeatureOption, formatModifier } from '../../utils';
import { CLASSES, RACES, BACKGROUNDS, FEATURE_OPTIONS } from '../../data/rules';
import { UserPlus, Download, Upload, Shield, Zap, Heart, Brain, Crown, Eye, Wind, Swords, BookOpen, Scroll, Sparkles, Minus, Plus } from 'lucide-react';
import Modal from '../Modal';

interface CharacterModalsProps {
    modalType: string;
    setModalType: (type: string) => void;
    characters: Character[];
    char: Character;
    activeCharId: string;
    setActiveCharId: (id: string) => void;
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
    selectedFeatureKey: string | null;
    setSelectedFeatureKey: (key: string | null) => void;
    handleImportCharacter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CharacterModals: React.FC<CharacterModalsProps> = ({
    modalType, setModalType, characters, char, activeCharId, setActiveCharId, setCharacters,
    selectedFeatureKey, setSelectedFeatureKey, handleImportCharacter
}) => {
    // --- States locais para Wizard de Criação ---
    const [creationStep, setCreationStep] = useState(0);
    const [newCharData, setNewCharData] = useState({ name: '', race: '', class: '', background: '' });
    const [attrScores, setAttrScores] = useState<Record<Attribute, number>>({
        [Attribute.STR]: 8, [Attribute.DEX]: 8, [Attribute.CON]: 8,
        [Attribute.INT]: 8, [Attribute.WIS]: 8, [Attribute.CHA]: 8
    });
    const [selectedCreationSkills, setSelectedCreationSkills] = useState<SkillName[]>([]);
    const [selectedCreationFeatures, setSelectedCreationFeatures] = useState<Record<string, string>>({});
    const [floatingBonuses, setFloatingBonuses] = useState<Attribute[]>([]);

    // Reset ao abrir
    useEffect(() => {
        if (modalType === 'new-character') {
            setAttrScores({ [Attribute.STR]: 8, [Attribute.DEX]: 8, [Attribute.CON]: 8, [Attribute.INT]: 8, [Attribute.WIS]: 8, [Attribute.CHA]: 8 });
            setSelectedCreationSkills([]);
            setSelectedCreationFeatures({});
            setFloatingBonuses([]);
            setCreationStep(0);
            setNewCharData({ name: '', race: '', class: '', background: '' });
        }
    }, [modalType]);

    // Pré-seleção padrão para evitar UI vazia
    useEffect(() => {
        if (modalType === 'new-character' && creationStep === 1 && !newCharData.race) setNewCharData(prev => ({...prev, race: Object.keys(RACES)[0]}));
        if (modalType === 'new-character' && creationStep === 2 && !newCharData.background) setNewCharData(prev => ({...prev, background: Object.keys(BACKGROUNDS)[0]}));
        if (modalType === 'new-character' && creationStep === 3 && !newCharData.class) setNewCharData(prev => ({...prev, class: Object.keys(CLASSES)[0]}));
    }, [creationStep, modalType]);

    const handleCreateNewCharacter = () => {
        if (!newCharData.name || !newCharData.race || !newCharData.class || !newCharData.background) { alert("Preencha todas as etapas."); return; }
        const newChar = createNewCharacter(newCharData.race, newCharData.class, newCharData.background, newCharData.name, attrScores, selectedCreationSkills, selectedCreationFeatures);
        if (floatingBonuses.length > 0) floatingBonuses.forEach(attr => newChar.attributes[attr] += 1);
        setCharacters(prev => [...prev, newChar]);
        setActiveCharId(newChar.id);
        setModalType('none');
    };

    const handleExportCharacter = () => downloadJSON(char, `${char.name.replace(/\s+/g, '_')}_ficha.json`);

    const handleApplyFeature = (optionName: string) => {
        if (!selectedFeatureKey) return;
        setCharacters(prev => prev.map(c => {
            if (c.id === char.id) { return applyFeatureOption(c, selectedFeatureKey, optionName); }
            return c;
        }));
        setModalType('none');
        setSelectedFeatureKey(null);
    };

    // Componentes Auxiliares de Visualização
    const StatPreview = ({ label, value, bonus = 0 }: { label: string, value: number, bonus?: number }) => (
        <div className="bg-black/40 p-2 rounded border border-white/5 flex flex-col items-center">
            <span className="text-[10px] text-grim-muted uppercase font-bold">{label.substring(0,3)}</span>
            <div className="text-lg font-bold font-mono flex items-center">
                {value}
                {bonus > 0 && <span className="text-grim-gold ml-1">+{bonus}</span>}
            </div>
        </div>
    );

    return (
        <>
            {/* CHARACTER MANAGER */}
            <Modal isOpen={modalType === 'character-manager'} onClose={() => setModalType('none')} title="Gerenciar Personagens">
                <div className="space-y-4">
                    <div className="grid gap-2">{characters.map(c => (<div key={c.id} onClick={() => { setActiveCharId(c.id); setModalType('none'); }} className={`flex items-center justify-between p-3 rounded border cursor-pointer ${c.id === activeCharId ? 'bg-grim-gold/10 border-grim-gold' : 'bg-black/30 border-white/10'}`}><div className="font-bold text-white">{c.name}</div><span className="text-xs text-grim-muted">Lvl {c.level} {c.class}</span></div>))}</div>
                    <button onClick={() => setModalType('new-character')} className="w-full py-3 border border-dashed border-grim-muted/50 rounded text-grim-muted hover:text-white flex items-center justify-center gap-2 uppercase text-xs font-bold tracking-widest"><UserPlus size={16}/> Criar Novo</button>
                    <div className="flex gap-2 pt-4 border-t border-white/10">
                        <button onClick={handleExportCharacter} className="flex-1 py-2 bg-black border border-grim-border hover:border-white text-xs uppercase font-bold rounded flex items-center justify-center gap-2"><Download size={14}/> Exportar</button>
                        <label className="flex-1 py-2 bg-black border border-grim-border hover:border-white text-xs uppercase font-bold rounded flex items-center justify-center gap-2 cursor-pointer"><Upload size={14}/> Importar<input type="file" onChange={handleImportCharacter} accept=".json" className="hidden" /></label>
                    </div>
                </div>
            </Modal>

            {/* NEW CHARACTER WIZARD */}
            <Modal isOpen={modalType === 'new-character'} onClose={() => setModalType('none')} title="Criação de Personagem">
                <div className="flex flex-col h-[70vh]">
                    {/* Stepper */}
                    <div className="flex justify-between mb-6 px-4">
                        {['Básico', 'Raça', 'Antecedente', 'Classe', 'Atributos'].map((step, i) => (
                            <div key={i} className={`text-xs font-bold uppercase tracking-widest ${creationStep === i ? 'text-grim-gold' : creationStep > i ? 'text-white' : 'text-grim-muted/30'}`}>
                                {i + 1}. {step}
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 overflow-hidden flex flex-col">
                        {/* STEP 0: NOME */}
                        {creationStep === 0 && (
                            <div className="flex flex-col items-center justify-center h-full gap-4">
                                <label className="text-sm uppercase font-bold text-grim-muted">Nome do Herói</label>
                                <input className="w-full max-w-md text-2xl text-center p-4 bg-black/50 border-grim-border focus:border-grim-gold" placeholder="Ex: Valeros" value={newCharData.name} onChange={e => setNewCharData({...newCharData, name: e.target.value})} autoFocus />
                            </div>
                        )}

                        {/* STEP 1: RAÇA */}
                        {creationStep === 1 && (
                            <div className="flex gap-6 h-full overflow-hidden">
                                <div className="w-1/3 overflow-y-auto custom-scrollbar border-r border-white/10 pr-2">
                                    {Object.keys(RACES).map(race => (
                                        <div key={race} onClick={() => setNewCharData({...newCharData, race})} className={`p-3 rounded mb-2 cursor-pointer transition-all ${newCharData.race === race ? 'bg-grim-gold text-black font-bold shadow-glow' : 'bg-white/5 hover:bg-white/10 text-grim-muted'}`}>
                                            {race}
                                        </div>
                                    ))}
                                </div>
                                <div className="w-2/3 overflow-y-auto custom-scrollbar p-2">
                                    {newCharData.race && RACES[newCharData.race] && (
                                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <h3 className="text-3xl font-cinzel font-bold text-white border-b border-grim-gold/30 pb-2">{RACES[newCharData.race].name}</h3>
                                            <div className="flex gap-4 text-xs uppercase tracking-widest font-bold text-grim-muted">
                                                <span className="bg-black/40 px-2 py-1 rounded">Tamanho: {RACES[newCharData.race].size}</span>
                                                <span className="bg-black/40 px-2 py-1 rounded">Deslocamento: {RACES[newCharData.race].speed}m</span>
                                            </div>
                                            
                                            <div className="bg-black/20 p-4 rounded border border-white/5">
                                                <h4 className="text-grim-gold font-bold text-sm uppercase mb-2 flex items-center gap-2"><Zap size={14}/> Bônus de Atributo</h4>
                                                <div className="flex gap-2">
                                                    {Object.entries(RACES[newCharData.race].abilityBonuses).map(([attr, bonus]) => (
                                                        <span key={attr} className="bg-white/10 px-3 py-1 rounded text-sm font-mono font-bold">
                                                            {attr}: +{bonus}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <h4 className="text-grim-gold font-bold text-sm uppercase flex items-center gap-2"><Sparkles size={14}/> Características Raciais</h4>
                                                {RACES[newCharData.race].features.map((f, i) => (
                                                    <div key={i} className="bg-black/30 p-3 rounded border-l-2 border-grim-muted">
                                                        <span className="font-bold text-white block mb-1">{f.name}</span>
                                                        <span className="text-xs text-grim-muted leading-relaxed">{f.description}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: ANTECEDENTE */}
                        {creationStep === 2 && (
                            <div className="flex gap-6 h-full overflow-hidden">
                                <div className="w-1/3 overflow-y-auto custom-scrollbar border-r border-white/10 pr-2">
                                    {Object.keys(BACKGROUNDS).map(bg => (
                                        <div key={bg} onClick={() => setNewCharData({...newCharData, background: bg})} className={`p-3 rounded mb-2 cursor-pointer transition-all ${newCharData.background === bg ? 'bg-grim-gold text-black font-bold shadow-glow' : 'bg-white/5 hover:bg-white/10 text-grim-muted'}`}>
                                            {bg}
                                        </div>
                                    ))}
                                </div>
                                <div className="w-2/3 overflow-y-auto custom-scrollbar p-2">
                                    {newCharData.background && BACKGROUNDS[newCharData.background] && (
                                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <h3 className="text-3xl font-cinzel font-bold text-white border-b border-grim-gold/30 pb-2">{BACKGROUNDS[newCharData.background].name}</h3>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-black/20 p-4 rounded border border-white/5">
                                                    <h4 className="text-grim-gold font-bold text-sm uppercase mb-2 flex items-center gap-2"><Brain size={14}/> Perícias</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {BACKGROUNDS[newCharData.background].skills.map(skill => (
                                                            <span key={skill} className="bg-white/10 text-xs px-2 py-1 rounded">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-black/20 p-4 rounded border border-white/5">
                                                    <h4 className="text-grim-gold font-bold text-sm uppercase mb-2 flex items-center gap-2"><Swords size={14}/> Equipamento</h4>
                                                    <ul className="list-disc list-inside text-xs text-grim-muted">
                                                        {BACKGROUNDS[newCharData.background].equipment.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="bg-black/30 p-4 rounded border-l-2 border-grim-muted mt-2">
                                                <h4 className="font-bold text-white mb-1 flex items-center gap-2"><Crown size={14}/> {BACKGROUNDS[newCharData.background].feature.name}</h4>
                                                <p className="text-xs text-grim-muted leading-relaxed">{BACKGROUNDS[newCharData.background].feature.description}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: CLASSE */}
                        {creationStep === 3 && (
                            <div className="flex gap-6 h-full overflow-hidden">
                                <div className="w-1/3 overflow-y-auto custom-scrollbar border-r border-white/10 pr-2">
                                    {Object.keys(CLASSES).map(cls => (
                                        <div key={cls} onClick={() => setNewCharData({...newCharData, class: cls})} className={`p-3 rounded mb-2 cursor-pointer transition-all ${newCharData.class === cls ? 'bg-grim-gold text-black font-bold shadow-glow' : 'bg-white/5 hover:bg-white/10 text-grim-muted'}`}>
                                            {cls}
                                        </div>
                                    ))}
                                </div>
                                <div className="w-2/3 overflow-y-auto custom-scrollbar p-2">
                                    {newCharData.class && CLASSES[newCharData.class] && (
                                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div className="flex justify-between items-baseline border-b border-grim-gold/30 pb-2">
                                                <h3 className="text-3xl font-cinzel font-bold text-white">{CLASSES[newCharData.class].name}</h3>
                                                <span className="text-xs text-grim-muted uppercase tracking-widest font-bold">Dado de Vida: {CLASSES[newCharData.class].hitDie}</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-black/20 p-3 rounded">
                                                    <span className="text-xs text-grim-muted uppercase font-bold block mb-1">Salvaguardas</span>
                                                    <div className="flex gap-2">
                                                        {CLASSES[newCharData.class].savingThrows.map(attr => (
                                                            <span key={attr} className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs font-bold border border-blue-500/30">{attr.substring(0,3)}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-black/20 p-3 rounded">
                                                    <span className="text-xs text-grim-muted uppercase font-bold block mb-1">Habilidade Principal</span>
                                                    <div className="flex gap-2">
                                                        {CLASSES[newCharData.class].primaryAbility.map(attr => (
                                                            <span key={attr} className="bg-grim-gold/20 text-grim-gold px-2 py-0.5 rounded text-xs font-bold border border-grim-gold/30">{attr.substring(0,3)}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-black/20 p-4 rounded border border-white/5">
                                                <h4 className="text-grim-gold font-bold text-sm uppercase mb-2">Proficiências</h4>
                                                <div className="grid grid-cols-2 gap-y-2 text-xs text-grim-muted">
                                                    <div><span className="text-white font-bold">Armaduras:</span> {CLASSES[newCharData.class].proficiencies.armor.join(', ') || 'Nenhuma'}</div>
                                                    <div><span className="text-white font-bold">Armas:</span> {CLASSES[newCharData.class].proficiencies.weapons.join(', ')}</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 mt-2">
                                                <h4 className="text-grim-gold font-bold text-sm uppercase mb-1">Características de Nível 1</h4>
                                                {CLASSES[newCharData.class].features[1].map((f, i) => (
                                                    <div key={i} className="bg-black/30 p-3 rounded border-l-2 border-grim-magic">
                                                        <span className="font-bold text-white block mb-1">{f.name}</span>
                                                        <span className="text-xs text-grim-muted leading-relaxed">{f.description}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 4: ATRIBUTOS */}
                        {creationStep === 4 && (
                            <div className="flex flex-col items-center justify-center h-full gap-8">
                                <h3 className="text-xl font-cinzel text-grim-gold">Defina seus Atributos</h3>
                                <div className="grid grid-cols-3 gap-6">
                                    {Object.values(Attribute).map(attr => {
                                        // Calcula bônus racial
                                        const raceBonus = RACES[newCharData.race]?.abilityBonuses[attr] || 0;
                                        return (
                                            <div key={attr} className="flex flex-col items-center bg-black/40 p-4 rounded-xl border border-white/10 w-32">
                                                <label className="text-xs font-bold uppercase text-grim-muted mb-2 tracking-widest">{attr}</label>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <button onClick={() => setAttrScores({...attrScores, [attr]: Math.max(1, attrScores[attr] - 1)})} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-grim-muted hover:text-white transition-colors"><Minus size={16}/></button>
                                                    <span className="text-2xl font-mono font-bold text-white">{attrScores[attr]}</span>
                                                    <button onClick={() => setAttrScores({...attrScores, [attr]: Math.min(20, attrScores[attr] + 1)})} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-grim-muted hover:text-white transition-colors"><Plus size={16}/></button>
                                                </div>
                                                <div className="text-xs text-grim-muted/60">
                                                    Base: {attrScores[attr]} {raceBonus > 0 && <span className="text-grim-gold">(+{raceBonus})</span>}
                                                </div>
                                                <div className="mt-2 text-sm font-bold text-grim-gold bg-grim-gold/10 px-3 py-0.5 rounded border border-grim-gold/30">
                                                    Mod: {formatModifier(Math.floor((attrScores[attr] + raceBonus - 10) / 2))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="text-sm text-grim-muted bg-black/30 px-6 py-2 rounded-full border border-white/5">
                                    Total de Pontos Gastos: <span className="text-white font-bold">{Object.values(attrScores).reduce((a, b) => a + b, 0)}</span> (Recomendado Point Buy: 27 acima de 8)
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Footer */}
                    <div className="flex justify-between mt-6 pt-4 border-t border-white/10 shrink-0">
                        <button onClick={() => setCreationStep(p => Math.max(0, p - 1))} disabled={creationStep === 0} className="px-6 py-3 bg-black border border-white/10 text-white font-bold uppercase rounded disabled:opacity-50 hover:bg-white/5 transition-all">Voltar</button>
                        {creationStep < 4 ? (
                            <button onClick={() => setCreationStep(p => p + 1)} className="px-6 py-3 bg-grim-gold text-black font-bold uppercase rounded hover:bg-white transition-all shadow-glow">Próximo</button>
                        ) : (
                            <button onClick={handleCreateNewCharacter} className="px-8 py-3 bg-grim-gold text-black font-black uppercase rounded hover:bg-white transition-all shadow-glow flex items-center gap-2"><UserPlus size={18}/> Finalizar Criação</button>
                        )}
                    </div>
                </div>
            </Modal>

            {/* FEATURE SELECTION */}
            <Modal isOpen={modalType === 'feature-selection'} onClose={() => { setModalType('none'); setSelectedFeatureKey(null); }} title={selectedFeatureKey || "Opção"}>
                <div className="flex flex-col gap-3">{selectedFeatureKey && FEATURE_OPTIONS[selectedFeatureKey] ? (FEATURE_OPTIONS[selectedFeatureKey].options.map(opt => (<div key={opt.name} onClick={() => handleApplyFeature(opt.name)} className="bg-black/30 border border-white/10 p-4 rounded cursor-pointer hover:border-grim-gold transition-all group"><h4 className="font-bold text-white group-hover:text-grim-gold transition-colors">{opt.name}</h4><p className="text-xs text-grim-muted mt-1">{opt.description}</p></div>))) : (<div>Nenhuma opção.</div>)}</div>
            </Modal>
        </>
    );
};
