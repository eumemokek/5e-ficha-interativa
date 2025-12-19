
import React, { useState } from 'react';
import { Character, Item } from '../../types';
import { generateId } from '../../utils';
import { Search, Plus, Shield, Minus, ShieldCheck, Trash2, Box } from 'lucide-react';
import Silhouette from '../Silhouette';

interface InventoryTabProps {
    char: Character;
    updateCharacter: (updates: Partial<Character>) => void;
    setModalType: (type: string) => void;
    setEditingItem: (item: Item | null) => void;
}

const InventoryTab: React.FC<InventoryTabProps> = ({ char, updateCharacter, setModalType, setEditingItem }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Toggle equip status with SLOT LOGIC
    const toggleEquip = (item: Item, e: React.MouseEvent) => {
        e.stopPropagation();
        const isEquipping = !item.equipped;
        let newInventory = [...char.inventory];

        if (isEquipping) {
            // Lógica de desequipar itens do mesmo slot para substituir
            const type = item.type;

            // Slots exclusivos (apenas 1 permitido)
            const exclusiveSlots = ['Armadura', 'Capacete', 'Botas', 'Luvas', 'Amuleto', 'Capa', 'Roupas'];
            
            if (exclusiveSlots.includes(type)) {
                // Se for armadura ou roupa, desequipa ambos (ocupam torso/corpo)
                if (type === 'Armadura' || type === 'Roupas') {
                     newInventory = newInventory.map(i => {
                        if ((i.type === 'Armadura' || i.type === 'Roupas') && i.equipped) return { ...i, equipped: false };
                        return i;
                     });
                } else {
                    // Outros slots exclusivos simples
                    newInventory = newInventory.map(i => {
                        if (i.type === type && i.equipped) return { ...i, equipped: false };
                        return i;
                    });
                }
            }

            // Anéis (Máximo 2)
            if (type === 'Anel') {
                const equippedRings = newInventory.filter(i => i.type === 'Anel' && i.equipped);
                if (equippedRings.length >= 2) {
                    // Desequipa o primeiro encontrado para dar espaço
                    const firstRingId = equippedRings[0].id;
                    newInventory = newInventory.map(i => i.id === firstRingId ? { ...i, equipped: false } : i);
                }
            }

            // Escudos (Máximo 1, compete com armas de 2 mãos ou ocupa mão secundária)
            if (type === 'Escudo') {
                 newInventory = newInventory.map(i => {
                    if (i.type === 'Escudo' && i.equipped) return { ...i, equipped: false };
                    return i;
                });
            }
        }

        // Atualiza o estado do item alvo
        newInventory = newInventory.map(i => i.id === item.id ? { ...i, equipped: isEquipping } : i);
        updateCharacter({ inventory: newInventory });
    };

    const handleDeleteItem = (itemId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Tem certeza que deseja remover este item permanentemente?')) {
            const newInventory = char.inventory.filter(x => x.id !== itemId);
            updateCharacter({ inventory: newInventory });
        }
    };

    return (
        <div className="h-full glass-panel rounded-xl flex flex-col">
            <div className="p-6 border-b border-white/10 bg-black/20 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-cinzel text-grim-gold">Inventário</h2>
                    <button onClick={() => setModalType('wallet')} className="flex items-center gap-4 bg-black/40 border border-grim-gold/30 rounded-lg px-4 py-2 hover:bg-white/5 cursor-pointer transition-colors group">
                        <span className="text-xs text-grim-muted uppercase font-bold tracking-widest group-hover:text-white transition-colors">Moedas</span>
                        <div className="text-base font-bold font-mono text-grim-gold flex gap-3">
                            <span>{char.currency.gp} <span className="text-[10px] text-yellow-600">PO</span></span>
                            <span>{char.currency.sp} <span className="text-[10px] text-gray-400">PP</span></span>
                            <span>{char.currency.cp} <span className="text-[10px] text-orange-800">PC</span></span>
                        </div>
                    </button>
                </div>
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 text-grim-muted" size={18}/>
                        <input className="pl-10 w-full bg-black/30 border-grim-border text-base p-2" placeholder="Filtrar itens..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <button onClick={() => { setEditingItem({ id: generateId(), name: 'Novo Item', type: 'Item', weight: 0, quantity: 1, description: '', equipped: false, imageUrl: '' }); setModalType('item-editor'); }} className="bg-grim-border border border-white/10 text-white px-6 py-2 rounded text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-lg flex items-center gap-2"><Plus size={16}/> Criar Item</button>
                    <button onClick={() => setModalType('item-search')} className="bg-grim-gold text-black px-6 py-2 rounded text-sm font-bold uppercase hover:bg-white transition-colors cursor-pointer shadow-glow">Compêndio</button>
                </div>
            </div>
            
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Coluna 1 e 2: Listas de Itens */}
                <div className="lg:col-span-2 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
                    {/* Lista de Equipados -> Renomeado para Vestimentas */}
                    <div>
                        <h3 className="text-sm font-bold text-grim-muted uppercase tracking-widest mb-4 border-b border-grim-border/30 pb-2">Vestimentas</h3>
                        {char.inventory.filter(i => i.equipped).length === 0 ? (
                            <div className="text-center p-4 text-grim-muted italic opacity-50 bg-black/20 rounded">Nenhuma vestimenta equipada.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {char.inventory.filter(i => i.equipped).map(item => (
                                    <div key={item.id} className="bg-grim-gold/10 border border-grim-gold/30 p-3 rounded flex justify-between items-center group cursor-pointer hover:bg-grim-gold/20 transition-all overflow-hidden relative" onClick={() => { setEditingItem(item); setModalType('item-detail'); }}>
                                        <div className="flex items-center gap-3 relative z-10">
                                            {/* Miniatura do Item Equipado */}
                                            <div className="w-12 h-12 rounded bg-black/50 border border-grim-gold/30 overflow-hidden shrink-0 flex items-center justify-center">
                                                {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <Shield size={24} className="text-grim-gold/50" />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg text-grim-text leading-tight">{item.name}</div>
                                                <div className="text-xs text-grim-muted uppercase">{item.type}</div>
                                            </div>
                                        </div>
                                        <button onClick={(e) => toggleEquip(item, e)} className="text-grim-muted hover:text-white p-2 cursor-pointer z-20 relative" title="Desequipar"><Minus size={18}/></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mochila */}
                    <div>
                        <h3 className="text-sm font-bold text-grim-muted uppercase tracking-widest mb-4 border-b border-grim-border/30 pb-2">Mochila</h3>
                        <div className="flex flex-col gap-1">
                            {char.inventory.filter(i => !i.equipped && i.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                                <div key={item.id} className="flex items-center p-2 rounded hover:bg-white/5 group transition-colors cursor-pointer border border-transparent hover:border-white/5 relative" onClick={() => { setEditingItem(item); setModalType('item-detail'); }}>
                                    {/* Miniatura Mochila */}
                                    <div className="w-10 h-10 rounded bg-black/40 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center mr-3">
                                        {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" /> : <Box size={18} className="text-grim-muted/30" />}
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="font-bold text-base text-grim-text group-hover:text-white transition-colors">{item.name}</div>
                                        <div className="text-[10px] text-grim-muted uppercase tracking-wider">{item.type} • {item.weight} kg</div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 mr-2">
                                        <div className="text-center w-12">
                                            <span className="text-xs font-mono text-grim-muted block">Qtd</span>
                                            <span className="font-bold text-white">{item.quantity}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 w-20 relative z-20">
                                        {/* Todos os itens podem ser equipados/vestidos */}
                                        <button onClick={(e) => toggleEquip(item, e)} className="p-2 text-grim-muted hover:text-grim-gold cursor-pointer" title="Equipar / Usar"><ShieldCheck size={16}/></button>
                                        <button onClick={(e) => handleDeleteItem(item.id, e)} className="p-2 text-grim-muted hover:text-grim-danger cursor-pointer" title="Remover"><Trash2 size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Coluna 3: Visual Boneco (Silhouette) */}
                <div className="hidden lg:flex flex-col items-center justify-start bg-black/20 rounded-xl border border-white/5 p-4 h-full">
                    <h3 className="text-sm font-bold text-grim-muted uppercase tracking-widest mb-4 w-full text-center pb-2 border-b border-white/5">Visualização</h3>
                    <Silhouette character={char} />
                    
                    <div className="mt-auto w-full px-4 pt-4">
                        <div className="flex justify-between text-xs text-grim-muted uppercase tracking-widest mb-2 border-b border-white/5 pb-1">
                            <span>Carga Total</span>
                            <span className="text-white font-bold">{char.inventory.reduce((acc, i) => acc + (i.weight * i.quantity), 0).toFixed(1)} / {(char.attributes['Força'] * 7.5).toFixed(1)} kg</span>
                        </div>
                        <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10">
                            <div 
                                className={`h-full transition-all duration-500 ${char.inventory.reduce((acc, i) => acc + (i.weight * i.quantity), 0) > (char.attributes['Força'] * 7.5) ? 'bg-grim-danger' : 'bg-grim-gold'}`} 
                                style={{ width: `${Math.min(100, (char.inventory.reduce((acc, i) => acc + (i.weight * i.quantity), 0) / (char.attributes['Força'] * 7.5)) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryTab;
