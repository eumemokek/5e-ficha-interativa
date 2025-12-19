
import React, { useState } from 'react';
import { Item, Character } from '../../types';
import { ALL_ITEMS, CompendiumItem } from '../../data/compendium';
import { generateId } from '../../utils';
import { Search, Trash2, Edit3, Shield, Swords, Box, Tag } from 'lucide-react';
import Modal from '../Modal';

interface InventoryModalsProps {
    modalType: string;
    setModalType: (type: string) => void;
    editingItem: Item | null;
    setEditingItem: (item: Item | null) => void;
    char: Character;
    updateCharacter: (updates: Partial<Character>) => void;
    onDeleteItem: (id: string) => void;
}

export const InventoryModals: React.FC<InventoryModalsProps> = ({
    modalType, setModalType, editingItem, setEditingItem, char, updateCharacter, onDeleteItem
}) => {
    // Estado local para Compêndio de Itens
    const [searchTerm, setSearchTerm] = useState('');
    const [itemCategory, setItemCategory] = useState<string>('Todos');
    const [selectedCompendiumItem, setSelectedCompendiumItem] = useState<CompendiumItem | null>(null);

    // Definição de Categorias e seus Tipos correspondentes
    const categories = [
        { id: 'Todos', label: 'Todos', types: [] },
        { id: 'Armas', label: 'Armas & Munição', types: ['Arma', 'Munição'] },
        { id: 'Defesa', label: 'Armaduras & Escudos', types: ['Armadura', 'Escudo'] },
        { id: 'Equipamento', label: 'Equipamento & Ferramentas', types: ['Item', 'Foco', 'Ferramenta'] },
        { id: 'Vestuario', label: 'Vestuário & Acessórios', types: ['Roupas', 'Capacete', 'Botas', 'Luvas', 'Anel', 'Amuleto', 'Capa'] }
    ];

    const handleSaveItem = () => {
        if (!editingItem) return;
        const list = char.inventory;
        const exists = list.some(i => i.id === editingItem.id);
        const newList = exists ? list.map(i => i.id === editingItem.id ? editingItem : i) : [...list, editingItem];
        updateCharacter({ inventory: newList });
        setEditingItem(null);
        setModalType('none');
    };

    const handleAddItemFromCompendium = (t: CompendiumItem) => {
        const idx = char.inventory.findIndex(i => i.name === t.name && i.type === t.type);
        if(idx >= 0) {
            const n = [...char.inventory];
            n[idx].quantity++;
            updateCharacter({ inventory: n });
        } else {
            updateCharacter({ inventory: [...char.inventory, { ...t, id: generateId(), quantity: 1, equipped: false, favorite: false }] });
        }
        alert(`${t.name} adicionado ao inventário!`);
    };

    const filteredItems = ALL_ITEMS.filter(i => {
        const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase());
        const activeCat = categories.find(c => c.id === itemCategory);
        const matchesCategory = itemCategory === 'Todos' || (activeCat && activeCat.types.includes(i.type));
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* ITEM EDITOR */}
            <Modal isOpen={modalType === 'item-editor' && !!editingItem} onClose={() => setModalType('none')} title={editingItem?.name || "Novo Item"}>
                {editingItem && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-8"><label className="text-[10px] uppercase font-bold text-grim-muted">Nome</label><input className="w-full" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} /></div>
                            <div className="col-span-4"><label className="text-[10px] uppercase font-bold text-grim-muted">Tipo</label><select className="w-full" value={editingItem.type} onChange={e => setEditingItem({...editingItem, type: e.target.value as any})}><option value="Item">Item</option><option value="Arma">Arma</option><option value="Armadura">Armadura</option><option value="Escudo">Escudo</option><option value="Munição">Munição</option><option value="Foco">Foco</option><option value="Ferramenta">Ferramenta</option><option value="Capacete">Capacete</option><option value="Botas">Botas</option><option value="Luvas">Luvas</option><option value="Anel">Anel</option><option value="Amuleto">Amuleto</option><option value="Capa">Capa</option><option value="Roupas">Roupas</option></select></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className="text-[10px] uppercase font-bold text-grim-muted">Peso</label><input type="number" className="w-full" value={editingItem.weight} onChange={e => setEditingItem({...editingItem, weight: parseFloat(e.target.value) || 0})} /></div>
                            <div><label className="text-[10px] uppercase font-bold text-grim-muted">Qtd</label><input type="number" className="w-full" value={editingItem.quantity} onChange={e => setEditingItem({...editingItem, quantity: parseInt(e.target.value) || 1})} /></div>
                            {(editingItem.type === 'Armadura' || editingItem.type === 'Escudo') && <div><label className="text-[10px] uppercase font-bold text-grim-muted">Bônus CA</label><input type="number" className="w-full" value={editingItem.acBonus || 0} onChange={e => setEditingItem({...editingItem, acBonus: parseInt(e.target.value) || 0})} /></div>}
                        </div>
                        {editingItem.type === 'Arma' && <div className="grid grid-cols-2 gap-4"><div><label className="text-[10px] uppercase font-bold text-grim-muted">Dano</label><input className="w-full" value={editingItem.damage || ''} onChange={e => setEditingItem({...editingItem, damage: e.target.value})} /></div><div><label className="text-[10px] uppercase font-bold text-grim-muted">Tipo</label><input className="w-full" value={editingItem.damageType || ''} onChange={e => setEditingItem({...editingItem, damageType: e.target.value})} /></div></div>}
                        <div><label className="text-[10px] uppercase font-bold text-grim-muted">Propriedades (CSV)</label><input className="w-full" value={editingItem.properties?.join(', ') || ''} onChange={e => setEditingItem({...editingItem, properties: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} placeholder="Leve, Acuidade..." /></div>
                        <div><label className="text-[10px] uppercase font-bold text-grim-muted">URL Imagem</label><input className="w-full" value={editingItem.imageUrl || ''} onChange={e => setEditingItem({...editingItem, imageUrl: e.target.value})} /></div>
                        <div><label className="text-[10px] uppercase font-bold text-grim-muted">Descrição</label><textarea className="w-full h-32" value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} /></div>
                        <div className="flex gap-3"><button onClick={handleSaveItem} className="flex-1 py-3 bg-grim-gold text-black font-bold uppercase rounded hover:bg-white">Salvar</button></div>
                    </div>
                )}
            </Modal>

            {/* ITEM SEARCH (COMPENDIUM) */}
            <Modal isOpen={modalType === 'item-search'} onClose={() => {setModalType('none'); setSelectedCompendiumItem(null); setItemCategory('Todos');}} title="Catálogo de Equipamentos">
                <div className="flex gap-6 h-[65vh]">
                    <div className="w-1/2 flex flex-col gap-4 border-r border-white/10 pr-6">
                        <div className="flex flex-col gap-3">
                            <div className="relative"><Search className="absolute left-3 top-3 text-grim-muted" size={18}/><input className="pl-10 w-full bg-black/30 border-grim-border text-sm p-2" placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
                            <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                                {categories.map(cat => (
                                    <button 
                                        key={cat.id} 
                                        onClick={() => setItemCategory(cat.id)} 
                                        className={`px-3 py-1 rounded text-[10px] font-bold uppercase border whitespace-nowrap transition-colors ${itemCategory === cat.id ? 'bg-grim-gold text-black border-grim-gold' : 'text-grim-muted border-grim-border hover:text-white'}`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {filteredItems.map(item => (
                                    <div key={item.name} onClick={() => setSelectedCompendiumItem(item)} className={`flex items-center p-2 border-b border-white/5 hover:bg-white/5 cursor-pointer group transition-all rounded mb-1 ${selectedCompendiumItem?.name === item.name ? 'bg-grim-gold/10 border-l-2 border-l-grim-gold' : ''}`}>
                                        <div className="flex-1">
                                            <div className="font-bold text-sm text-white">{item.name}</div>
                                            <div className="text-[10px] text-grim-muted">{item.type}</div>
                                        </div>
                                    </div>
                                ))}
                                {filteredItems.length === 0 && (
                                    <div className="text-center p-4 text-grim-muted italic text-xs">Nenhum item encontrado.</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col">{selectedCompendiumItem && (<div className="flex flex-col h-full gap-4"><h4 className="text-xl font-cinzel text-grim-gold font-black mb-1">{selectedCompendiumItem.name}</h4><div className="flex-1 p-4 bg-black/20 rounded border border-white/5 overflow-y-auto custom-scrollbar text-sm font-serif italic text-grim-muted">{selectedCompendiumItem.description}</div><button onClick={() => handleAddItemFromCompendium(selectedCompendiumItem)} className="w-full py-4 bg-grim-gold text-black font-black uppercase rounded">Adicionar à Mochila</button></div>)}</div>
                </div>
            </Modal>

            {/* ITEM DETAIL (PAINEL COMPLETO) */}
            <Modal isOpen={modalType === 'item-detail' && !!editingItem} onClose={() => setModalType('none')} title={editingItem?.name || "Detalhes"}>
                {editingItem && (
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">
                            <div className="w-32 h-32 rounded-lg bg-black border border-grim-border shrink-0 overflow-hidden shadow-lg relative">
                                {editingItem.imageUrl ? <img src={editingItem.imageUrl} className="w-full h-full object-cover"/> : <Box className="absolute inset-0 m-auto text-grim-muted opacity-50" size={48}/>}
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <h2 className="text-3xl font-cinzel text-grim-gold font-bold">{editingItem.name}</h2>
                                <div className="text-sm text-grim-muted uppercase tracking-widest font-bold flex items-center gap-2"><Tag size={14}/> {editingItem.type} <span className="text-grim-muted/50">•</span> {editingItem.weight} kg</div>
                                
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {editingItem.damage && (
                                        <div className="bg-grim-danger/20 text-grim-danger border border-grim-danger/50 px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-1.5 shadow-sm">
                                            <Swords size={14}/> {editingItem.damage} {editingItem.damageType}
                                        </div>
                                    )}
                                    {editingItem.acBonus && (
                                        <div className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-3 py-1 rounded text-xs font-bold uppercase flex items-center gap-1.5 shadow-sm">
                                            <Shield size={14}/> +{editingItem.acBonus} CA
                                        </div>
                                    )}
                                    {editingItem.properties?.map(p => (
                                        <span key={p} className="bg-white/5 text-white border border-white/20 px-3 py-1 rounded text-xs">{p}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/20 p-5 rounded border border-white/5 shadow-inner min-h-[100px]">
                            <p className="text-sm font-serif leading-relaxed text-grim-text/90 italic">{editingItem.description || "Nenhuma descrição disponível."}</p>
                        </div>

                        <div className="flex gap-3 pt-2 border-t border-white/10">
                            <button onClick={() => setModalType('item-editor')} className="flex-1 py-3 bg-grim-border text-white font-bold uppercase rounded hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"><Edit3 size={16}/> Editar</button>
                            <button onClick={() => onDeleteItem(editingItem.id)} className="px-5 bg-black border border-grim-danger/50 text-grim-danger rounded hover:bg-grim-danger hover:text-white transition-colors"><Trash2 size={18}/></button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};
