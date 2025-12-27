
import React, { useState } from 'react';
import { PRESETS } from '../../data/presets';
import { Character } from '../../types';
import { generateId } from '../../utils';
import { User, Shield, Zap, Info } from 'lucide-react';
import Modal from '../Modal';

interface PresetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPreset: (char: Character) => void;
}

export const PresetModal: React.FC<PresetModalProps> = ({ isOpen, onClose, onSelectPreset }) => {
    const [selectedPreset, setSelectedPreset] = useState<Character | null>(null);

    const handleConfirm = () => {
        if (selectedPreset) {
            // Clona o preset e gera um novo ID para ser uma instância única
            const newChar = { ...selectedPreset, id: generateId() };
            onSelectPreset(newChar);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Escolha um Herói">
            <div className="flex flex-col h-[70vh]">
                <div className="text-sm text-grim-muted mb-4 text-center">
                    Selecione um personagem pré-construído de nível 1 para começar sua aventura imediatamente.
                </div>

                <div className="flex-1 flex gap-4 overflow-hidden">
                    {/* Lista Lateral */}
                    <div className="w-1/3 overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-2 border-r border-white/10">
                        {PRESETS.map(preset => (
                            <div 
                                key={preset.name}
                                onClick={() => setSelectedPreset(preset)}
                                className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-all ${selectedPreset?.name === preset.name ? 'bg-grim-gold/20 border-grim-gold' : 'bg-black/30 border-white/5 hover:bg-white/10'}`}
                            >
                                <div className="w-10 h-10 rounded-full bg-black overflow-hidden border border-white/10 shrink-0">
                                    <img src={preset.imageUrl} alt={preset.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className={`font-bold text-sm ${selectedPreset?.name === preset.name ? 'text-grim-gold' : 'text-white'}`}>{preset.class.split(' ')[0]}</div>
                                    <div className="text-[10px] text-grim-muted uppercase tracking-wider">{preset.race}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detalhes */}
                    <div className="w-2/3 overflow-y-auto custom-scrollbar p-2 bg-black/20 rounded">
                        {selectedPreset ? (
                            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex gap-4 items-end border-b border-white/10 pb-4">
                                    <div className="w-24 h-24 rounded border-2 border-grim-gold overflow-hidden shadow-glow">
                                        <img src={selectedPreset.imageUrl} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-cinzel font-bold text-white">{selectedPreset.name}</h3>
                                        <div className="text-sm text-grim-gold uppercase tracking-widest font-bold">{selectedPreset.race} {selectedPreset.class}</div>
                                        <div className="text-xs text-grim-muted mt-1">{selectedPreset.background}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 gap-2">
                                    {Object.entries(selectedPreset.attributes).map(([key, val]) => (
                                        <div key={key} className="bg-black/40 border border-white/10 rounded p-2 flex flex-col items-center">
                                            <span className="text-[9px] text-grim-muted uppercase font-bold">{key.substring(0,3)}</span>
                                            <span className="text-lg font-mono font-bold text-white">{val}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/30 p-3 rounded border border-white/5">
                                        <h4 className="text-xs font-bold text-grim-gold uppercase mb-2 flex items-center gap-2"><Shield size={12}/> Equipamento</h4>
                                        <ul className="text-xs text-grim-muted list-disc list-inside">
                                            {selectedPreset.inventory.slice(0, 6).map(i => <li key={i.id}>{i.name}</li>)}
                                            {selectedPreset.inventory.length > 6 && <li>...e mais</li>}
                                        </ul>
                                    </div>
                                    <div className="bg-black/30 p-3 rounded border border-white/5">
                                        <h4 className="text-xs font-bold text-grim-gold uppercase mb-2 flex items-center gap-2"><Zap size={12}/> Magias/Habilidades</h4>
                                        <ul className="text-xs text-grim-muted list-disc list-inside">
                                            {selectedPreset.spells.length > 0 ? selectedPreset.spells.slice(0, 5).map(s => <li key={s.id}>{s.name}</li>) : <li>Nenhuma magia inicial.</li>}
                                        </ul>
                                    </div>
                                </div>

                                <button onClick={handleConfirm} className="w-full py-3 bg-grim-gold text-black font-bold uppercase rounded hover:bg-white transition-all shadow-glow mt-auto">
                                    Jogar com {selectedPreset.name}
                                </button>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-grim-muted opacity-50">
                                <Info size={48} className="mb-2"/>
                                <p>Selecione um preset ao lado para ver os detalhes.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
