
import React, { useState } from 'react';
import { Character, Attribute } from '../../types';
import { getCharacterStats, getStatBreakdown } from '../../utils';
import { CLASSES } from '../../data/rules';
import Modal from '../Modal';
import { AlertCircle, Sunrise, Sunset, AlertTriangle } from 'lucide-react';

interface CoreModalsProps {
    modalType: string;
    setModalType: (type: string) => void;
    char: Character;
    updateCharacter: (updates: Partial<Character>) => void;
    derivedStats: any;
    deleteTarget: { type: string, id: string } | null;
    confirmDelete: () => void;
    setDeleteTarget: (target: any) => void;
}

export const CoreModals: React.FC<CoreModalsProps> = ({ 
    modalType, setModalType, char, updateCharacter, derivedStats, deleteTarget, confirmDelete, setDeleteTarget 
}) => {
    // Estado local para HP
    const [hpActionType, setHpActionType] = useState<'damage' | 'heal' | 'temp' | 'max'>('damage');
    const [hpActionValue, setHpActionValue] = useState('');

    const handleHpChange = () => { 
        const val = parseInt(hpActionValue); 
        if(isNaN(val)) return; 
        let newHp = {...char.hp}; 
        const maxPossible = derivedStats.maxHp; 
        if(hpActionType === 'damage') { 
            let dmg = val; 
            if(newHp.temp > 0) { const abs = Math.min(newHp.temp, dmg); newHp.temp -= abs; dmg -= abs; } 
            newHp.current = Math.max(0, newHp.current - dmg); 
        } else if(hpActionType === 'heal') {
            newHp.current = Math.min(maxPossible, newHp.current + val); 
        } else if (hpActionType === 'temp') {
            newHp.temp = val;
        } else if (hpActionType === 'max') {
            newHp.max = val;
        }
        updateCharacter({hp: newHp}); 
        setModalType('none'); 
        setHpActionValue(''); 
    };

    const handleRest = (type: 'curto' | 'longo') => { 
        const classDef = CLASSES[char.class.split(' ')[0]]; 
        const newResources = { ...char.resourceUsage }; 
        if (classDef?.resources) classDef.resources.forEach(res => { 
            if (res.reset === 'Curto' || type === 'longo') newResources[res.name] = 0; 
        }); 
        if (type === 'longo') {
            const healedHitDice = Math.max(1, Math.floor(char.level / 2));
            updateCharacter({ 
                hp: { ...char.hp, current: derivedStats.maxHp, temp: 0, hitDiceUsed: Math.max(0, char.hp.hitDiceUsed - healedHitDice) }, 
                spellSlotsUsed: {}, resourceUsage: newResources 
            }); 
        } else { 
            let spellUpdate = {}; 
            if (char.class.includes('Bruxo')) spellUpdate = { spellSlotsUsed: {} }; 
            updateCharacter({ ...spellUpdate, resourceUsage: newResources }); 
        } 
        setModalType('none');
    };

    return (
        <>
            {/* HP MANAGER */}
            <Modal isOpen={modalType === 'hp-action'} onClose={() => setModalType('none')} title="Gerenciar Vitalidade">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-4 gap-2">
                        {['damage', 'heal', 'temp', 'max'].map(t => (
                            <button key={t} onClick={() => setHpActionType(t as any)} className={`py-2 rounded font-bold uppercase text-xs transition-all ${hpActionType === t ? 'bg-white text-black' : 'bg-black/30 text-grim-muted hover:bg-white/10'}`}>{t === 'damage' ? 'Dano' : t === 'heal' ? 'Cura' : t === 'temp' ? 'Temp' : 'Máx'}</button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input type="number" autoFocus className="flex-1 text-center text-2xl p-4 bg-black/50 border border-white/10 rounded font-mono" placeholder="Valor" value={hpActionValue} onChange={e => setHpActionValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleHpChange()} />
                        <button onClick={handleHpChange} className="bg-white text-black font-bold uppercase px-6 rounded hover:bg-grim-gold transition-colors">Confirmar</button>
                    </div>
                </div>
            </Modal>

            {/* REST */}
            <Modal isOpen={modalType === 'rest'} onClose={() => setModalType('none')} title="Descansar">
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleRest('curto')} className="flex flex-col items-center justify-center p-6 bg-black/40 border border-grim-border hover:border-grim-gold rounded-lg group transition-all"><Sunrise size={32} className="mb-3 text-grim-gold"/> <span className="font-cinzel font-bold text-lg text-white">Descanso Curto</span></button>
                    <button onClick={() => handleRest('longo')} className="flex flex-col items-center justify-center p-6 bg-black/40 border border-grim-border hover:border-blue-400 rounded-lg group transition-all"><Sunset size={32} className="mb-3 text-blue-400"/> <span className="font-cinzel font-bold text-lg text-white">Descanso Longo</span></button>
                </div>
            </Modal>

            {/* IMAGE */}
            <Modal isOpen={modalType === 'edit-image'} onClose={() => setModalType('none')} title="Alterar Retrato">
                <div className="flex flex-col gap-4">
                    <input className="w-full p-2" placeholder="URL da Imagem..." value={char.imageUrl || ''} onChange={e => updateCharacter({ imageUrl: e.target.value })} />
                    <button onClick={() => setModalType('none')} className="w-full py-3 bg-grim-gold text-black font-bold uppercase rounded">Salvar</button>
                </div>
            </Modal>

            {/* ATTRIBUTES */}
            <Modal isOpen={modalType === 'edit-attributes'} onClose={() => setModalType('none')} title="Editar Atributos Base">
                <div className="grid grid-cols-2 gap-4">
                    {Object.values(Attribute).map(attr => (
                        <div key={attr} className="flex flex-col gap-1">
                            <label className="text-[10px] uppercase font-bold text-grim-muted">{attr}</label>
                            <input type="number" className="w-full text-center bg-black/40 border border-white/10 p-2 rounded text-white font-mono font-bold" value={char.attributes[attr]} onChange={e => updateCharacter({ attributes: { ...char.attributes, [attr]: parseInt(e.target.value) || 10 } })} />
                        </div>
                    ))}
                </div>
            </Modal>

            {/* SKILLS */}
            <Modal isOpen={modalType === 'skill-editor'} onClose={() => setModalType('none')} title="Editar Perícias">
                <div className="grid grid-cols-1 gap-2 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
                    {char.skills.sort((a,b) => a.name.localeCompare(b.name)).map(skill => (
                        <div key={skill.name} className="flex items-center justify-between p-3 bg-black/30 rounded border border-white/5">
                            <span className="text-sm font-bold text-white flex items-center gap-2">{skill.name} <span className="text-[10px] text-grim-muted uppercase tracking-widest bg-black/50 px-1.5 py-0.5 rounded">{skill.attribute.substring(0,3)}</span></span>
                            <div className="flex gap-2">
                                <button onClick={() => { const ns = [...char.skills]; const s = ns.find(x => x.name === skill.name); if(s) { s.proficient = !s.proficient; if(!s.proficient) s.expertise = false; } updateCharacter({ skills: ns }); }} className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded border transition-all ${skill.proficient ? 'bg-grim-gold text-black border-grim-gold' : 'bg-black text-grim-muted border-white/20'}`}>Prof</button>
                                <button onClick={() => { const ns = [...char.skills]; const s = ns.find(x => x.name === skill.name); if(s) { s.expertise = !s.expertise; if(s.expertise) s.proficient = true; } updateCharacter({ skills: ns }); }} className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded border transition-all ${skill.expertise ? 'bg-purple-500 text-white border-purple-500' : 'bg-black text-grim-muted border-white/20'}`}>Esp</button>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            {/* WALLET */}
            <Modal isOpen={modalType === 'wallet'} onClose={() => setModalType('none')} title="Carteira">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center gap-2 p-4 bg-black/30 rounded border border-yellow-600/30"><div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-black font-bold">PO</div><input type="number" className="w-full text-center bg-transparent border-none text-2xl font-mono font-bold text-yellow-500" value={char.currency.gp} onChange={e => updateCharacter({ currency: { ...char.currency, gp: parseInt(e.target.value) || 0 } })} /></div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-black/30 rounded border border-gray-400/30"><div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-black font-bold">PP</div><input type="number" className="w-full text-center bg-transparent border-none text-2xl font-mono font-bold text-gray-300" value={char.currency.sp} onChange={e => updateCharacter({ currency: { ...char.currency, sp: parseInt(e.target.value) || 0 } })} /></div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-black/30 rounded border border-orange-800/30"><div className="w-10 h-10 rounded-full bg-orange-800 flex items-center justify-center text-white font-bold">PC</div><input type="number" className="w-full text-center bg-transparent border-none text-2xl font-mono font-bold text-orange-400" value={char.currency.cp} onChange={e => updateCharacter({ currency: { ...char.currency, cp: parseInt(e.target.value) || 0 } })} /></div>
                </div>
            </Modal>

            {/* DELETE CONFIRMATION */}
            <Modal isOpen={modalType === 'delete-confirmation'} onClose={() => { setModalType('none'); setDeleteTarget(null); }} title="Confirmar">
                <div className="flex flex-col gap-4 text-center">
                    <div className="flex justify-center text-grim-danger"><AlertTriangle size={48}/></div>
                    <p className="text-white">
                        {deleteTarget?.type === 'session' ? 'Excluir este registro do diário?' : 
                        deleteTarget?.type === 'note' ? 'Excluir esta nota do compêndio?' :
                        deleteTarget?.type === 'item' ? 'Remover este item do inventário?' :
                        'Esquecer esta magia?'}
                    </p>
                    <div className="flex gap-3 mt-2">
                        <button onClick={() => { setModalType('none'); setDeleteTarget(null); }} className="flex-1 py-3 bg-black border border-white/10 text-white font-bold uppercase rounded">Cancelar</button>
                        <button onClick={confirmDelete} className="flex-1 py-3 bg-grim-danger text-white font-bold uppercase rounded hover:bg-red-600">Confirmar</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
