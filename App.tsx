
import React, { useState, useMemo, useEffect } from 'react';
import { initialCharacter } from './initialData';
import { Character, Item, Spell, SessionLog, InfoCard, Attribute } from './types';
import { 
    getProficiencyBonus, generateId, parseHitDie,
    getCharacterStats, syncCharacterFeatures, downloadJSON, resetFeatureChoice
} from './utils';
import { CLASSES } from './data/rules';
import LoreTab from './components/LoreTab';
import CombatTab from './components/tabs/CombatTab';
import InventoryTab from './components/tabs/InventoryTab';
import GrimoireTab from './components/tabs/GrimoireTab';

// Modal Groups
import { CoreModals } from './components/modals/CoreModals';
import { CharacterModals } from './components/modals/CharacterModals';
import { InventoryModals } from './components/modals/InventoryModals';
import { GrimoireModals } from './components/modals/GrimoireModals';
import { LoreModals } from './components/modals/LoreModals';

import { 
  Swords, Backpack, Scroll, User, Edit3, BookOpen, Moon, Settings, ArrowUpCircle
} from 'lucide-react';

const NavButton: React.FC<{ active: boolean, onClick: () => void, icon: any, label: string }> = ({ active, onClick, icon: Icon, label }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-5 transition-all duration-300 border-l-4 ${active ? 'bg-gradient-to-r from-grim-gold/10 to-transparent border-grim-gold text-grim-gold' : 'border-transparent text-grim-muted hover:text-grim-text hover:bg-white/5'}`}>
        <Icon size={24} className={active ? "drop-shadow-glow" : ""} />
        <span className="font-serif tracking-wider text-base font-bold uppercase">{label}</span>
    </button>
);

export function App() {
  const [characters, setCharacters] = useState<Character[]>([initialCharacter]);
  const [activeCharId, setActiveCharId] = useState<string>(initialCharacter.id);
  const [activeTab, setActiveTab] = useState<'combat' | 'inventory' | 'spells' | 'lore'>('combat');
  const [modalType, setModalType] = useState<string>('none');
  
  // State for specific modal contexts
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editingSpell, setEditingSpell] = useState<Spell | null>(null);
  const [selectedFeatureKey, setSelectedFeatureKey] = useState<string | null>(null);
  const [editingSession, setEditingSession] = useState<SessionLog | null>(null);
  const [editingNote, setEditingNote] = useState<InfoCard | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'session' | 'note' | 'item' | 'spell', id: string } | null>(null);

  const char = useMemo(() => characters.find(c => c.id === activeCharId) || characters[0] || initialCharacter, [characters, activeCharId]);
  const derivedStats = useMemo(() => getCharacterStats(char), [char]);
  const profBonus = getProficiencyBonus(char.level);
  const charClassDef = CLASSES[char.class.split(' ')[0]] || CLASSES['Guerreiro'];

  const updateCharacter = (updates: Partial<Character>) => setCharacters(prev => prev.map(c => c.id === activeCharId ? { ...c, ...updates } : c));
  
  // Handlers para abrir modais de exclusão
  const handleDeleteSession = (id: string) => { setDeleteTarget({ type: 'session', id }); setModalType('delete-confirmation'); };
  const handleDeleteNote = (id: string) => { setDeleteTarget({ type: 'note', id }); setModalType('delete-confirmation'); };
  const handleDeleteItem = (id: string) => { setDeleteTarget({ type: 'item', id }); setModalType('delete-confirmation'); };
  const handleDeleteSpell = (id: string) => { setDeleteTarget({ type: 'spell', id }); setModalType('delete-confirmation'); };

  const confirmDelete = () => {
      if (!deleteTarget) return;
      setCharacters(prev => prev.map(c => {
          if (c.id === activeCharId) {
              if (deleteTarget.type === 'session') return { ...c, lore: { ...c.lore, sessions: (c.lore.sessions || []).filter(s => s.id !== deleteTarget.id) } };
              if (deleteTarget.type === 'note') return { ...c, lore: { ...c.lore, notes: (c.lore.notes || []).filter(n => n.id !== deleteTarget.id) } };
              if (deleteTarget.type === 'item') return { ...c, inventory: c.inventory.filter(i => i.id !== deleteTarget.id) };
              if (deleteTarget.type === 'spell') return { ...c, spells: c.spells.filter(s => s.id !== deleteTarget.id) };
          }
          return c;
      }));
      setEditingSession(null); setEditingNote(null); setEditingItem(null); setEditingSpell(null);
      setModalType('none'); setDeleteTarget(null);
  };

  const handleLevelUp = () => {
      const nextLevel = char.level + 1; if(nextLevel>20) return;
      const hitDieVal = parseHitDie(charClassDef.hitDie);
      const conMod = Math.floor((derivedStats.attributes[Attribute.CON] - 10) / 2);
      const hpGain = Math.floor(hitDieVal/2) + 1 + conMod;
      const { updatedChar } = syncCharacterFeatures({ ...char, level: nextLevel });
      updateCharacter({ ...updatedChar, hp: { ...char.hp, max: char.hp.max + Math.max(1, hpGain), current: char.hp.current + Math.max(1, hpGain) } });
      alert(`Nível ${nextLevel} alcançado!\n+${Math.max(1, hpGain)} PV.`);
  };

  const handleFeatureSelect = (featureName: string) => { setSelectedFeatureKey(featureName); setModalType('feature-selection'); };
  
  const handleResetFeature = (featureId: string) => {
      if(window.confirm('Tem certeza que deseja redefinir esta escolha?')) {
          setCharacters(prev => prev.map(c => c.id === char.id ? resetFeatureChoice(c, featureId) : c));
      }
  };

  const handleImportCharacter = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
          try {
              const importedChar = JSON.parse(event.target?.result as string);
              if (importedChar.name && importedChar.class) {
                  const newChar = { ...importedChar, id: generateId() }; 
                  setCharacters(prev => [...prev, newChar]);
                  setActiveCharId(newChar.id);
                  setModalType('none');
                  alert('Personagem importado com sucesso!');
              } else alert('Arquivo inválido.');
          } catch (err) { alert('Erro ao ler arquivo.'); } finally { e.target.value = ''; }
      };
      reader.readAsText(file);
  };

  return (
    <div className="flex h-screen bg-grim-bg text-grim-text overflow-hidden selection:bg-grim-gold selection:text-black">
      <aside className="w-80 flex flex-col border-r border-grim-border/50 bg-grim-panel relative z-20 shadow-2xl h-screen overflow-hidden">
          <div className="relative flex-1 w-full bg-black overflow-hidden group">
              {char.imageUrl ? <img src={char.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="w-full h-full bg-grim-surface flex items-center justify-center flex-col gap-4 text-grim-muted"><User size={64} /><span className="text-sm uppercase tracking-widest">Sem Imagem</span></div>}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-20"><button onClick={() => { setModalType('edit-image'); }} className="bg-black/60 border border-grim-gold rounded-full p-2 text-grim-gold hover:bg-grim-gold hover:text-black transition-colors shadow-lg cursor-pointer"><Edit3 size={18} /></button></div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20"><button onClick={() => setModalType('character-manager')} className="bg-black/60 border border-grim-gold rounded-full p-2 text-grim-gold hover:bg-grim-gold hover:text-black transition-colors shadow-lg cursor-pointer"><Settings size={18} /></button></div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-grim-panel via-grim-panel/90 to-transparent pt-12"><h1 className="text-3xl font-cinzel font-bold text-white leading-none drop-shadow-md">{char.name}</h1><div className="text-sm text-grim-gold uppercase tracking-widest mt-1 font-bold">{char.class} <span className="text-grim-muted">•</span> Lvl {char.level}</div><div className="text-xs text-grim-muted uppercase tracking-wide mt-0.5">{char.race}</div></div>
          </div>
          <div className="shrink-0 bg-grim-panel flex flex-col gap-3 p-4 border-t border-grim-border/30"><button onClick={handleLevelUp} className="w-full py-4 bg-black/40 border border-grim-border/50 hover:bg-grim-gold hover:text-black hover:border-grim-gold transition-all rounded text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 text-grim-muted cursor-pointer"><ArrowUpCircle size={16}/> Level Up</button></div>
      </aside>

      <main className="flex-1 bg-dark-texture bg-cover relative flex flex-col h-screen overflow-hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
          <nav className="relative z-10 flex border-b border-grim-border/50 bg-grim-panel/80 backdrop-blur-md">
              <NavButton label="Combate" icon={Swords} active={activeTab === 'combat'} onClick={() => setActiveTab('combat')} />
              <NavButton label="Grimório" icon={BookOpen} active={activeTab === 'spells'} onClick={() => setActiveTab('spells')} />
              <NavButton label="Inventário" icon={Backpack} active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
              <NavButton label="Diário" icon={Scroll} active={activeTab === 'lore'} onClick={() => setActiveTab('lore')} />
              <div className="ml-auto px-6 py-4 flex items-center"><button onClick={() => setModalType('rest')} className="text-grim-muted hover:text-grim-gold transition-colors cursor-pointer"><Moon size={24}/></button></div>
          </nav>

          <div className="relative z-10 flex-1 overflow-hidden p-6 animate-in fade-in duration-500">
              {activeTab === 'combat' && (
                  <CombatTab 
                      char={char} derivedStats={derivedStats} profBonus={profBonus} charClassDef={charClassDef} 
                      updateCharacter={updateCharacter} setModalType={setModalType} onFeatureSelect={handleFeatureSelect} onResetFeature={handleResetFeature}
                  />
              )}
              {activeTab === 'inventory' && (
                  <InventoryTab 
                      char={char} updateCharacter={updateCharacter} setModalType={setModalType} setEditingItem={setEditingItem} onDeleteItem={handleDeleteItem}
                  />
              )}
              {activeTab === 'spells' && (
                  <GrimoireTab 
                      char={char} charClassDef={charClassDef} updateCharacter={updateCharacter} setModalType={setModalType} setEditingSpell={setEditingSpell} profBonus={profBonus} onDeleteSpell={handleDeleteSpell}
                  />
              )}
              {activeTab === 'lore' && (
                  <LoreTab 
                      character={char} updateCharacter={updateCharacter} onDeleteSession={handleDeleteSession} onDeleteNote={handleDeleteNote}
                      onEditSession={(s) => { setEditingSession(s); setModalType('edit-session'); }} onEditNote={(n) => { setEditingNote(n); setModalType('edit-note'); }}
                      onAddSession={() => { setEditingSession({ id: generateId(), title: '', date: new Date().toISOString().split('T')[0], content: '' }); setModalType('edit-session'); }} 
                      onAddNote={() => { setEditingNote({ id: generateId(), title: '', type: 'NPC', content: '' }); setModalType('edit-note'); }} 
                  />
              )}
          </div>
      </main>

      {/* --- RENDERIZAÇÃO MODULAR DOS MODAIS --- */}
      
      <CoreModals 
          modalType={modalType} setModalType={setModalType} char={char} updateCharacter={updateCharacter}
          derivedStats={derivedStats} deleteTarget={deleteTarget} confirmDelete={confirmDelete} setDeleteTarget={setDeleteTarget}
      />

      <CharacterModals 
          modalType={modalType} setModalType={setModalType} characters={characters} char={char} 
          activeCharId={activeCharId} setActiveCharId={setActiveCharId} setCharacters={setCharacters}
          selectedFeatureKey={selectedFeatureKey} setSelectedFeatureKey={setSelectedFeatureKey} handleImportCharacter={handleImportCharacter}
      />

      <InventoryModals 
          modalType={modalType} setModalType={setModalType} editingItem={editingItem} setEditingItem={setEditingItem}
          char={char} updateCharacter={updateCharacter} onDeleteItem={handleDeleteItem}
      />

      <GrimoireModals 
          modalType={modalType} setModalType={setModalType} editingSpell={editingSpell} setEditingSpell={setEditingSpell}
          char={char} updateCharacter={updateCharacter} onDeleteSpell={handleDeleteSpell}
      />

      <LoreModals 
          modalType={modalType} setModalType={setModalType} editingSession={editingSession} setEditingSession={setEditingSession}
          editingNote={editingNote} setEditingNote={setEditingNote} char={char} updateCharacter={updateCharacter}
      />
    </div>
  );
}
