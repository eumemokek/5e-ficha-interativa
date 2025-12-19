
import React, { useState, useMemo, useEffect } from 'react';
import { initialCharacter } from './initialData';
import { Character, Item, Spell, SkillName, SessionLog, InfoCard, Attribute } from './types';
import { 
    getModifier, getProficiencyBonus, 
    createNewCharacter, createNewItem, createNewSpell, generateId, parseHitDie,
    getMaxPreparedSpells, canLearnCantrip, canLearnSpell, getSpellsKnownLimit, getFeatureOptions, applyFeatureOption, resetFeatureChoice,
    getCharacterStats, syncCharacterFeatures, getStatBreakdown, downloadJSON, formatModifier
} from './utils';
import { ALL_ITEMS, ALL_SPELLS, CompendiumItem, CompendiumSpell } from './data/compendium';
import { CLASSES, RACES, BACKGROUNDS, FEATURE_OPTIONS } from './data/rules';
import Modal from './components/Modal';
import LoreTab from './components/LoreTab';
import CombatTab from './components/tabs/CombatTab';
import InventoryTab from './components/tabs/InventoryTab';
import GrimoireTab from './components/tabs/GrimoireTab';

import { 
  Shield, Heart, Swords, Zap, Backpack, Scroll, User, 
  Plus, Minus, Search, Trash2, Edit3, BookOpen, Crown, Star, 
  Moon, Settings, Sparkles, AlertCircle, ChevronRight, XCircle, Flame, 
  ArrowUpCircle, Brain, Dna, CheckCircle2, ListFilter, Save, Maximize,
  Download, Upload, Info, ArrowLeft, ArrowRight, Box, Hammer, ShieldCheck, Dice5, UserPlus
} from 'lucide-react';

// NavButton Component
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
  const [hpActionType, setHpActionType] = useState<'damage' | 'heal' | 'temp' | 'max'>('damage');
  const [hpActionValue, setHpActionValue] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [editingSpell, setEditingSpell] = useState<Spell | null>(null);
  const [selectedFeatureKey, setSelectedFeatureKey] = useState<string | null>(null);
  const [editingSession, setEditingSession] = useState<SessionLog | null>(null);
  const [editingNote, setEditingNote] = useState<InfoCard | null>(null);
  
  // States para Compêndio
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompendiumItem, setSelectedCompendiumItem] = useState<CompendiumItem | null>(null);
  const [selectedCompendiumSpell, setSelectedCompendiumSpell] = useState<CompendiumSpell | null>(null);
  const [searchSpellLevel, setSearchSpellLevel] = useState<number>(-1); 
  const [filterByClass, setFilterByClass] = useState(true);
  
  // Estados Compêndio de Itens (Novo)
  const [itemCategory, setItemCategory] = useState<string>('Todos');
  const [itemPage, setItemPage] = useState(1);
  const itemsPerPage = 10;

  // Estados para Criação de Personagem
  const [creationStep, setCreationStep] = useState(0);
  const [newCharData, setNewCharData] = useState({ name: '', race: '', class: '', background: '' });
  
  // Estados Extras Criação
  const [attrMode, setAttrMode] = useState<'pointBuy' | 'manual'>('pointBuy');
  const [attrScores, setAttrScores] = useState<Record<Attribute, number>>({
      [Attribute.STR]: 8, [Attribute.DEX]: 8, [Attribute.CON]: 8,
      [Attribute.INT]: 8, [Attribute.WIS]: 8, [Attribute.CHA]: 8
  });
  const [selectedCreationSkills, setSelectedCreationSkills] = useState<SkillName[]>([]);
  const [selectedCreationFeatures, setSelectedCreationFeatures] = useState<Record<string, string>>({}); // FeatureKey -> OptionName
  // Novo estado para bônus flutuantes (ex: Meio-Elfo)
  const [floatingBonuses, setFloatingBonuses] = useState<Attribute[]>([]);

  // Estado para exclusão
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'session', id: string } | null>(null);

  // Reset do Wizard
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

  const char = useMemo(() => characters.find(c => c.id === activeCharId) || characters[0] || initialCharacter, [characters, activeCharId]);
  const derivedStats = useMemo(() => getCharacterStats(char), [char]);
  const profBonus = getProficiencyBonus(char.level);
  const charClassDef = CLASSES[char.class.split(' ')[0]] || CLASSES['Guerreiro'];
  
  // Limites de Magia (para validação ao adicionar)
  const maxCantrips = useMemo(() => {
      if (!charClassDef || !charClassDef.spellcasting || !charClassDef.spellcasting.cantripsKnown) return 0;
      const levels = Object.keys(charClassDef.spellcasting.cantripsKnown).map(Number).sort((a,b) => b-a);
      for (const lvl of levels) { if (char.level >= lvl) return charClassDef.spellcasting.cantripsKnown[lvl]; }
      return 0;
  }, [char.level, charClassDef]);
  const spellsKnownLimit = useMemo(() => getSpellsKnownLimit(char), [char]);

  const updateCharacter = (updates: Partial<Character>) => setCharacters(prev => prev.map(c => c.id === activeCharId ? { ...c, ...updates } : c));
  
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

  const handleDeleteSession = (id: string) => {
      setDeleteTarget({ type: 'session', id });
      setModalType('delete-confirmation');
  };

  const confirmDelete = () => {
      if (deleteTarget?.type === 'session') {
          setCharacters(prev => prev.map(c => {
              if (c.id === activeCharId) {
                  const updatedSessions = (c.lore.sessions || []).filter(s => s.id !== deleteTarget.id);
                  return { ...c, lore: { ...c.lore, sessions: updatedSessions } };
              }
              return c;
          }));
          setEditingSession(null);
      }
      setModalType('none');
      setDeleteTarget(null);
  };

  const handleDeleteNote = (id: string) => {
      if(!window.confirm('Tem certeza que deseja excluir esta nota?')) return;
      setCharacters(prev => prev.map(c => {
          if (c.id === activeCharId) {
              const updatedNotes = (c.lore.notes || []).filter(n => n.id !== id);
              return { ...c, lore: { ...c.lore, notes: updatedNotes } };
          }
          return c;
      }));
      setEditingNote(null); 
      setModalType('none'); 
  };

  const handleDeleteItem = (id: string) => {
      if(!window.confirm('Tem certeza que deseja remover este item permanentemente?')) return;
      setCharacters(prev => prev.map(c => {
          if (c.id === activeCharId) {
              const newInventory = c.inventory.filter(i => i.id !== id);
              return { ...c, inventory: newInventory };
          }
          return c;
      }));
      setEditingItem(null);
      setModalType('none');
  };

  const handleDeleteSpell = (spellId: string) => {
      if(!window.confirm('Tem certeza que deseja esquecer esta magia?')) return;
      setCharacters(prev => prev.map(c => {
          if (c.id === activeCharId) {
              const newSpells = c.spells.filter(s => s.id !== spellId);
              return { ...c, spells: newSpells };
          }
          return c;
      }));
      setEditingSpell(null);
      setModalType('none');
  };

  const handleSaveSession = () => {
      if(!editingSession || !editingSession.title) return;
      setCharacters(prev => prev.map(c => {
          if (c.id === char.id) {
              const list = c.lore.sessions || [];
              const exists = list.some(s => s.id === editingSession.id);
              const newList = exists ? list.map(s => s.id === editingSession.id ? editingSession : s) : [editingSession, ...list];
              return { ...c, lore: { ...c.lore, sessions: newList } };
          }
          return c;
      }));
      setEditingSession(null); setModalType('none');
  };

  const handleSaveNote = () => {
      if(!editingNote || !editingNote.title) return;
      setCharacters(prev => prev.map(c => {
          if (c.id === char.id) {
              const list = c.lore.notes || [];
              const exists = list.some(n => n.id === editingNote.id);
              const newList = exists ? list.map(n => n.id === editingNote.id ? editingNote : n) : [editingNote, ...list];
              return { ...c, lore: { ...c.lore, notes: newList } };
          }
          return c;
      }));
      setEditingNote(null); setModalType('none');
  };

  const handleSaveItem = () => {
      if (!editingItem) return;
      setCharacters(prev => prev.map(c => {
          if (c.id === activeCharId) {
              const list = c.inventory;
              const exists = list.some(i => i.id === editingItem.id);
              const newList = exists ? list.map(i => i.id === editingItem.id ? editingItem : i) : [...list, editingItem];
              return { ...c, inventory: newList };
          }
          return c;
      }));
      setEditingItem(null);
      setModalType('none');
  };

  const handleLevelUp = () => {
      const nextLevel = char.level + 1; if(nextLevel>20) return;
      const hitDieVal = parseHitDie(charClassDef.hitDie);
      const conMod = getModifier(char.attributes[Attribute.CON]);
      const hpGain = Math.floor(hitDieVal/2) + 1 + conMod;
      const { updatedChar } = syncCharacterFeatures({ ...char, level: nextLevel });
      updateCharacter({ ...updatedChar, hp: { ...char.hp, max: char.hp.max + Math.max(1, hpGain), current: char.hp.current + Math.max(1, hpGain) } });
      alert(`Nível ${nextLevel} alcançado!\n+${Math.max(1, hpGain)} PV.`);
  };

  const handleRest = (type: 'curto' | 'longo') => { const classDef = CLASSES[char.class.split(' ')[0]]; const newResources = { ...char.resourceUsage }; if (classDef?.resources) classDef.resources.forEach(res => { if (res.reset === 'Curto' || type === 'longo') newResources[res.name] = 0; }); if (type === 'longo') updateCharacter({ hp: { ...char.hp, current: derivedStats.maxHp, temp: 0, hitDiceUsed: Math.max(0, char.hp.hitDiceUsed - Math.max(1, Math.floor(char.level / 2))) }, spellSlotsUsed: {}, resourceUsage: newResources }); else { let spellUpdate = {}; if (char.class.includes('Bruxo')) spellUpdate = { spellSlotsUsed: {} }; updateCharacter({ ...spellUpdate, resourceUsage: newResources }); } };

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

  const handleAddSpellFromCompendium = (t: CompendiumSpell) => {
    const baseClass = char.class.split(' ')[0];
    if (filterByClass && !t.classes.includes(baseClass)) { alert('Esta magia não pertence à lista da sua classe. Desative o filtro para aprender.'); return; }
    if (t.level === 0 && !canLearnCantrip(char)) { alert(`Limite de truques conhecidos atingido (${maxCantrips}).`); return; }
    if (t.level > 0 && baseClass !== 'Mago' && !canLearnSpell(char, t.level)) { alert(`Limite de magias conhecidas atingido (${spellsKnownLimit}).`); return; }
    if(!char.spells.some(s => s.name === t.name)) {
        updateCharacter({ spells: [...char.spells, { ...t, id: generateId(), prepared: (baseClass !== 'Mago' || t.level === 0), classes: t.classes || [] }] });
    }
    alert(`${t.name} adicionado ao grimório!`);
  };

  // --- FEATURE SELECTION HANDLERS ---
  const handleFeatureSelect = (featureName: string) => {
      setSelectedFeatureKey(featureName);
      setModalType('feature-selection');
  };

  const handleApplyFeature = (optionName: string) => {
      if (!selectedFeatureKey) return;
      
      let updatedChar: Character = char;
      
      // Aplica a feature (retorna o char atualizado)
      setCharacters(prev => {
          const newChars = prev.map(c => {
              if (c.id === char.id) {
                  updatedChar = applyFeatureOption(c, selectedFeatureKey, optionName);
                  return updatedChar;
              }
              return c;
          });
          return newChars;
      });

      // Lógica de Múltipla Seleção (Mantida igual à anterior)
      const featureDef = FEATURE_OPTIONS[selectedFeatureKey];
      const selectionLimit = featureDef?.selectionLimit || 1;
      let currentSelectionCount = 0;
      const featuresFromKey = updatedChar.features.filter(f => f.origin === selectedFeatureKey).length;
      currentSelectionCount += featuresFromKey;
      const spellsFromKey = updatedChar.spells.filter(s => s.origin?.startsWith(selectedFeatureKey)).length;
      currentSelectionCount += spellsFromKey;

      if (featureDef && featureDef.options.some(o => o.skillsAdded?.length)) {
          if (selectionLimit > 1) {
             let perceivedSelections = 0;
             featureDef.options.forEach(opt => {
                 const hasFeature = opt.featuresAdded ? opt.featuresAdded.every(fa => updatedChar.features.some(f => f.name === fa.name)) : false;
                 const hasSpell = opt.spellsAdded ? opt.spellsAdded.every(sa => updatedChar.spells.some(s => s.name === sa)) : false;
                 const hasSkill = opt.skillsAdded ? opt.skillsAdded.every(ska => updatedChar.skills.find(s => s.name === ska)?.proficient) : false;
                 if ((opt.featuresAdded && hasFeature) || (opt.spellsAdded && hasSpell) || (opt.skillsAdded && hasSkill)) {
                     perceivedSelections++;
                 }
             });
             if (perceivedSelections < selectionLimit) return;
          }
      } else {
          if (currentSelectionCount < selectionLimit) return;
      }

      setModalType('none');
      setSelectedFeatureKey(null);
  };

  const handleResetFeature = (featureId: string) => {
      if(window.confirm('Tem certeza que deseja redefinir esta escolha? Todas as magias e bônus associados serão removidos.')) {
          setCharacters(prev => prev.map(c => {
              if (c.id === char.id) {
                  return resetFeatureChoice(c, featureId);
              }
              return c;
          }));
      }
  };

  // --- WIZARD DE CRIAÇÃO DE PERSONAGEM (LÓGICA) ---
  const pointBuyCosts = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
  const currentPointsSpent = useMemo(() => {
      return Object.values(attrScores).reduce((acc: number, val) => {
          const cost = pointBuyCosts[val as keyof typeof pointBuyCosts] || 0;
          return acc + cost;
      }, 0);
  }, [attrScores]);

  const handleCreateNewCharacter = () => {
      if (!newCharData.name || !newCharData.race || !newCharData.class || !newCharData.background) {
          alert("Por favor, preencha todas as etapas.");
          return;
      }
      
      const newChar = createNewCharacter(
          newCharData.race, 
          newCharData.class, 
          newCharData.background, 
          newCharData.name,
          attrScores,
          selectedCreationSkills,
          selectedCreationFeatures
      );

      // Aplica bônus flutuantes (ex: Meio-Elfo) manualmente após a criação base
      if (floatingBonuses.length > 0) {
          floatingBonuses.forEach(attr => {
              newChar.attributes[attr] += 1;
          });
      }

      setCharacters(prev => [...prev, newChar]);
      setActiveCharId(newChar.id);
      setModalType('none');
      setCreationStep(0);
      setNewCharData({ name: '', race: '', class: '', background: '' });
  };

  const handleExportCharacter = () => {
      downloadJSON(char, `${char.name.replace(/\s+/g, '_')}_ficha.json`);
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
              } else {
                  alert('Arquivo inválido: Formato de personagem não reconhecido.');
              }
          } catch (err) {
              alert('Erro ao ler arquivo: ' + err);
          }
      };
      reader.readAsText(file);
  };

  const getCurrentSelectionCount = (key: string) => {
      const featureDef = FEATURE_OPTIONS[key];
      if (!featureDef) return 0;
      let count = 0;
      featureDef.options.forEach(opt => {
         const hasFeature = opt.featuresAdded ? opt.featuresAdded.every(fa => char.features.some(f => f.name === fa.name)) : false;
         const hasSpell = opt.spellsAdded ? opt.spellsAdded.every(sa => char.spells.some(s => s.name === sa)) : false;
         const hasSkill = opt.skillsAdded ? opt.skillsAdded.every(ska => char.skills.find(s => s.name === ska)?.proficient) : false;
         if ((opt.featuresAdded && hasFeature) || (opt.spellsAdded && hasSpell) || (opt.skillsAdded && hasSkill)) {
             count++;
         }
      });
      return count;
  };

  return (
    <div className="flex h-screen bg-grim-bg text-grim-text overflow-hidden selection:bg-grim-gold selection:text-black">
      {/* Sidebar e Main Content omitidos para brevidade, mantidos iguais */}
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
                      char={char} 
                      derivedStats={derivedStats} 
                      profBonus={profBonus} 
                      charClassDef={charClassDef} 
                      updateCharacter={updateCharacter} 
                      setModalType={setModalType}
                      onFeatureSelect={handleFeatureSelect}
                      onResetFeature={handleResetFeature}
                  />
              )}

              {activeTab === 'inventory' && (
                  <InventoryTab 
                      char={char} 
                      updateCharacter={updateCharacter} 
                      setModalType={setModalType} 
                      setEditingItem={setEditingItem} 
                  />
              )}

              {activeTab === 'spells' && (
                  <GrimoireTab 
                      char={char} 
                      charClassDef={charClassDef} 
                      updateCharacter={updateCharacter} 
                      setModalType={setModalType} 
                      setEditingSpell={setEditingSpell} 
                      profBonus={profBonus}
                  />
              )}

              {activeTab === 'lore' && (
                  <LoreTab character={char} updateCharacter={updateCharacter} onEditSession={(s) => { setEditingSession(s); setModalType('edit-session'); }} onEditNote={(n) => { setEditingNote(n); setModalType('edit-note'); }} onDeleteSession={handleDeleteSession} onDeleteNote={handleDeleteNote} onAddSession={() => { setEditingSession({ id: generateId(), title: '', date: new Date().toISOString().split('T')[0], content: '' }); setModalType('edit-session'); }} onAddNote={() => { setEditingNote({ id: generateId(), title: '', type: 'NPC', content: '' }); setModalType('edit-note'); }} />
              )}
          </div>
      </main>

      {/* --- MODAIS --- */}
      
      {/* DETALHES DO ITEM */}
      <Modal isOpen={modalType === 'item-detail' && !!editingItem} onClose={() => setModalType('none')} title={editingItem?.name || "Detalhes do Item"}>
          {editingItem && (
              <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                      <div className="w-24 h-24 rounded bg-black border border-grim-border shrink-0 overflow-hidden">
                          {editingItem.imageUrl ? <img src={editingItem.imageUrl} className="w-full h-full object-cover"/> : <Box className="w-full h-full p-6 text-grim-muted"/>}
                      </div>
                      <div className="flex-1">
                          <h4 className="text-xl font-cinzel text-grim-gold font-bold">{editingItem.name}</h4>
                          <div className="text-xs text-grim-muted uppercase tracking-widest mt-1 mb-2">{editingItem.type} • {editingItem.weight}kg</div>
                          <div className="flex flex-wrap gap-2">
                              {editingItem.damage && <span className="bg-grim-danger/20 text-grim-danger border border-grim-danger/50 px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1"><Swords size={12}/> {editingItem.damage} {editingItem.damageType}</span>}
                              {editingItem.acBonus && <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1"><Shield size={12}/> +{editingItem.acBonus} CA</span>}
                              {editingItem.properties?.map(p => <span key={p} className="bg-white/10 text-white border border-white/20 px-2 py-1 rounded text-xs">{p}</span>)}
                          </div>
                      </div>
                  </div>
                  <div className="bg-black/20 p-4 rounded border border-white/5 text-sm font-serif italic text-grim-text/80 leading-relaxed whitespace-pre-wrap">
                      {editingItem.description || "Sem descrição."}
                  </div>
                  <div className="flex gap-3 mt-2">
                      <button onClick={() => setModalType('item-editor')} className="flex-1 py-3 bg-grim-border text-white font-bold uppercase rounded hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"><Edit3 size={18}/> Editar</button>
                      <button 
                          onClick={() => {
                              const newInventory = char.inventory.map(i => i.id === editingItem.id ? {...i, equipped: !i.equipped} : i);
                              updateCharacter({inventory: newInventory});
                              setEditingItem({...editingItem, equipped: !editingItem.equipped});
                          }} 
                          className={`flex-1 py-3 font-bold uppercase rounded transition-all flex items-center justify-center gap-2 ${editingItem.equipped ? 'bg-grim-gold/20 text-grim-gold border border-grim-gold' : 'bg-grim-gold text-black hover:bg-white'}`}
                      >
                          <ShieldCheck size={18}/> {editingItem.equipped ? "Desequipar" : "Equipar"}
                      </button>
                      <button onClick={() => handleDeleteItem(editingItem.id)} className="px-4 bg-black border border-grim-danger/50 text-grim-danger rounded hover:bg-grim-danger hover:text-white transition-colors"><Trash2 size={18}/></button>
                  </div>
              </div>
          )}
      </Modal>

      {/* DETALHES DA MAGIA */}
      <Modal isOpen={modalType === 'spell-detail' && !!editingSpell} onClose={() => setModalType('none')} title={editingSpell?.name || "Detalhes da Magia"}>
          {editingSpell && (
              <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                      <div className="flex justify-between items-start">
                          <h4 className="text-2xl font-cinzel text-grim-magic font-bold">{editingSpell.name}</h4>
                          <span className="text-xl font-bold font-mono text-white/50">{editingSpell.level === 0 ? 'Truque' : `${editingSpell.level}º Círculo`}</span>
                      </div>
                      <div className="text-xs text-grim-muted uppercase tracking-widest font-bold flex gap-2">
                          <span className="bg-grim-magic/10 text-grim-magic px-2 py-0.5 rounded border border-grim-magic/30">{editingSpell.school}</span>
                          {editingSpell.origin && <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">{editingSpell.origin}</span>}
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-black/30 p-2 rounded"><span className="text-grim-muted block mb-0.5 uppercase tracking-wider">Tempo de Conjuração</span><span className="font-bold text-white">{editingSpell.castingTime}</span></div>
                      <div className="bg-black/30 p-2 rounded"><span className="text-grim-muted block mb-0.5 uppercase tracking-wider">Alcance</span><span className="font-bold text-white">{editingSpell.range}</span></div>
                      <div className="bg-black/30 p-2 rounded"><span className="text-grim-muted block mb-0.5 uppercase tracking-wider">Componentes</span><span className="font-bold text-white">{editingSpell.components}</span></div>
                      <div className="bg-black/30 p-2 rounded"><span className="text-grim-muted block mb-0.5 uppercase tracking-wider">Duração</span><span className="font-bold text-white">{editingSpell.duration}</span></div>
                  </div>
                  <div className="bg-black/20 p-4 rounded border border-white/5 text-sm font-serif text-grim-text/90 leading-relaxed whitespace-pre-wrap">
                      {editingSpell.description || "Sem descrição."}
                  </div>
                  <div className="flex gap-3 mt-2">
                      <button onClick={() => setModalType('spell-editor')} className="flex-1 py-3 bg-grim-border text-white font-bold uppercase rounded hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"><Edit3 size={18}/> Editar</button>
                      {!editingSpell.origin && editingSpell.level > 0 && (
                          <button 
                              onClick={() => {
                                  const newSpells = char.spells.map(s => s.id === editingSpell.id ? {...s, prepared: !s.prepared} : s);
                                  updateCharacter({spells: newSpells});
                                  setEditingSpell({...editingSpell, prepared: !editingSpell.prepared});
                              }} 
                              className={`flex-1 py-3 font-bold uppercase rounded transition-all flex items-center justify-center gap-2 ${editingSpell.prepared ? 'bg-grim-magic/20 text-grim-magic border border-grim-magic' : 'bg-grim-magic text-white hover:bg-white hover:text-black'}`}
                          >
                              <BookOpen size={18}/> {editingSpell.prepared ? "Despreparar" : "Preparar"}
                          </button>
                      )}
                      {!editingSpell.origin && <button onClick={() => handleDeleteSpell(editingSpell.id)} className="px-4 bg-black border border-grim-danger/50 text-grim-danger rounded hover:bg-grim-danger hover:text-white transition-colors"><Trash2 size={18}/></button>}
                  </div>
              </div>
          )}
      </Modal>

      {/* --- SELETOR DE CARACTERÍSTICAS (NOVO - CORRIGIDO) --- */}
      <Modal isOpen={modalType === 'feature-selection'} onClose={() => { setModalType('none'); setSelectedFeatureKey(null); }} title={selectedFeatureKey || "Selecione uma Opção"}>
          <div className="flex flex-col gap-3">
              {selectedFeatureKey && FEATURE_OPTIONS[selectedFeatureKey] ? (
                  FEATURE_OPTIONS[selectedFeatureKey].options.map(opt => (
                      <div key={opt.name} onClick={() => handleApplyFeature(opt.name)} className="bg-black/30 border border-white/10 p-4 rounded hover:bg-white/5 hover:border-grim-gold/50 cursor-pointer transition-all group">
                          <h4 className="font-bold text-white group-hover:text-grim-gold mb-1">{opt.name}</h4>
                          <p className="text-xs text-grim-muted">{opt.description}</p>
                          {opt.spellsAdded && (
                              <div className="mt-2 text-[10px] uppercase font-bold text-grim-magic flex gap-1">
                                  <Sparkles size={10} className="mt-0.5"/> Magias: {opt.spellsAdded.join(', ')}
                              </div>
                          )}
                          {opt.skillsAdded && (
                              <div className="mt-2 text-[10px] uppercase font-bold text-cyan-400 flex gap-1">
                                  <Brain size={10} className="mt-0.5"/> Perícias: {opt.skillsAdded.join(', ')}
                              </div>
                          )}
                      </div>
                  ))
              ) : (
                  <div className="text-center p-4 text-grim-muted italic">Nenhuma opção disponível.</div>
              )}
          </div>
      </Modal>

      {/* --- WIZARD DE CRIAÇÃO DE PERSONAGEM --- */}
      <Modal isOpen={modalType === 'new-character'} onClose={() => setModalType('none')} title="Novo Personagem">
          <div className="flex flex-col gap-6">
              {/* Stepper Visual (Reordenado) */}
              <div className="flex justify-between mb-4 relative">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10 -translate-y-1/2"></div>
                  {['Identidade', 'Raça', 'Antecedente', 'Classe', 'Atributos'].map((step, i) => (
                      <div key={i} className={`flex flex-col items-center gap-2 ${creationStep >= i ? 'opacity-100' : 'opacity-40'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${creationStep === i ? 'bg-grim-gold text-black border-grim-gold scale-110 shadow-glow' : creationStep > i ? 'bg-green-500 text-black border-green-500' : 'bg-black text-grim-muted border-white/20'}`}>
                              {creationStep > i ? <CheckCircle2 size={16}/> : i + 1}
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider">{step}</span>
                      </div>
                  ))}
              </div>

              {/* Step 0: Identidade */}
              {creationStep === 0 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div>
                          <label className="text-xs uppercase font-bold text-grim-muted mb-1 block">Nome do Personagem</label>
                          <input 
                              className="w-full text-lg p-3" 
                              placeholder="Ex: Valeros" 
                              value={newCharData.name} 
                              onChange={e => setNewCharData({...newCharData, name: e.target.value})} 
                              autoFocus
                          />
                      </div>
                      <div className="p-4 bg-black/30 rounded border border-grim-gold/20 flex items-center gap-4 text-grim-muted italic text-sm">
                          <Info size={24} className="text-grim-gold"/>
                          <p>O nome é o primeiro passo para a lenda. Escolha algo memorável.</p>
                      </div>
                  </div>
              )}

              {/* Step 1: Raça */}
              {creationStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[50vh] animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="overflow-y-auto custom-scrollbar pr-2 space-y-2">
                          {Object.keys(RACES).map(race => (
                              <div 
                                  key={race} 
                                  onClick={() => {
                                      setNewCharData({...newCharData, race});
                                      setFloatingBonuses([]); // Limpa escolhas anteriores
                                  }}
                                  className={`p-3 rounded border cursor-pointer transition-all ${newCharData.race === race ? 'bg-grim-gold/20 border-grim-gold text-white' : 'bg-black/30 border-white/5 hover:bg-white/5 text-grim-muted'}`}
                              >
                                  <div className="font-bold text-sm">{race}</div>
                              </div>
                          ))}
                      </div>
                      <div className="bg-black/20 p-4 rounded border border-white/5 overflow-y-auto custom-scrollbar">
                          {newCharData.race ? (
                              <div className="space-y-3">
                                  <h4 className="font-cinzel text-xl text-grim-gold font-bold">{newCharData.race}</h4>
                                  <div className="text-xs font-bold uppercase tracking-widest text-grim-muted">Bônus de Atributo</div>
                                  <div className="flex gap-2">
                                      {Object.entries(RACES[newCharData.race].abilityBonuses).map(([attr, val]) => (
                                          <span key={attr} className="bg-white/10 px-2 py-1 rounded text-xs font-mono font-bold">
                                              {attr.substring(0,3)} +{val}
                                          </span>
                                      ))}
                                  </div>
                                  
                                  {/* SELETOR DE BÔNUS FLUTUANTES (MEIO-ELFO) */}
                                  {newCharData.race === 'Meio-Elfo' && (
                                      <div className="bg-grim-gold/10 border border-grim-gold/30 p-3 rounded mt-2">
                                          <div className="text-xs font-bold text-grim-gold uppercase mb-2">Bônus Flutuantes (+1 em dois atributos)</div>
                                          <div className="grid grid-cols-3 gap-2">
                                              {Object.values(Attribute).filter(attr => attr !== Attribute.CHA).map(attr => (
                                                  <label key={attr} className={`text-[10px] flex items-center gap-2 p-1 border rounded cursor-pointer ${floatingBonuses.includes(attr) ? 'bg-grim-gold text-black border-grim-gold' : 'text-grim-muted border-white/10 hover:border-white/30'}`}>
                                                      <input 
                                                          type="checkbox" 
                                                          className="hidden"
                                                          checked={floatingBonuses.includes(attr)}
                                                          onChange={() => {
                                                              if (floatingBonuses.includes(attr)) {
                                                                  setFloatingBonuses(prev => prev.filter(a => a !== attr));
                                                              } else if (floatingBonuses.length < 2) {
                                                                  setFloatingBonuses(prev => [...prev, attr]);
                                                              }
                                                          }}
                                                      />
                                                      {floatingBonuses.includes(attr) ? <CheckCircle2 size={12}/> : <div className="w-3 h-3 rounded-full border border-current opacity-50"/>}
                                                      {attr.substring(0,3)}
                                                  </label>
                                              ))}
                                          </div>
                                      </div>
                                  )}

                                  <div className="text-xs font-bold uppercase tracking-widest text-grim-muted mt-4">Características</div>
                                  <ul className="list-disc pl-4 space-y-1 text-sm text-grim-text/80">
                                      {RACES[newCharData.race].features.map(f => (
                                          <li key={f.name}><span className="font-bold text-white">{f.name}:</span> {f.description}</li>
                                      ))}
                                  </ul>
                              </div>
                          ) : <div className="h-full flex items-center justify-center text-grim-muted opacity-50 italic">Selecione uma raça</div>}
                      </div>
                  </div>
              )}

              {/* Step 2: Antecedente (Agora Step 2) */}
              {creationStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[50vh] animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="overflow-y-auto custom-scrollbar pr-2 space-y-2">
                          {Object.keys(BACKGROUNDS).map(bg => (
                              <div 
                                  key={bg} 
                                  onClick={() => setNewCharData({...newCharData, background: bg})}
                                  className={`p-3 rounded border cursor-pointer transition-all ${newCharData.background === bg ? 'bg-grim-gold/20 border-grim-gold text-white' : 'bg-black/30 border-white/5 hover:bg-white/5 text-grim-muted'}`}
                              >
                                  <div className="font-bold text-sm">{bg}</div>
                              </div>
                          ))}
                      </div>
                      <div className="bg-black/20 p-4 rounded border border-white/5 overflow-y-auto custom-scrollbar">
                          {newCharData.background ? (
                              <div className="space-y-4">
                                  <h4 className="font-cinzel text-xl text-grim-gold font-bold">{newCharData.background}</h4>
                                  <div>
                                      <div className="text-xs font-bold uppercase tracking-widest text-grim-muted mb-1">Perícias Concedidas</div>
                                      <div className="flex gap-2 flex-wrap">
                                          {BACKGROUNDS[newCharData.background].skills.map(s => <span key={s} className="bg-white/10 px-2 py-1 rounded text-xs">{s}</span>)}
                                      </div>
                                  </div>
                                  <div>
                                      <div className="text-xs font-bold uppercase tracking-widest text-grim-muted mb-1">Característica: {BACKGROUNDS[newCharData.background].feature.name}</div>
                                      <p className="text-sm text-grim-muted italic">{BACKGROUNDS[newCharData.background].feature.description}</p>
                                  </div>
                                  <div>
                                      <div className="text-xs font-bold uppercase tracking-widest text-grim-muted mb-1">Equipamento Inicial</div>
                                      <ul className="text-xs text-grim-muted list-disc pl-4">
                                          {BACKGROUNDS[newCharData.background].equipment.map(e => <li key={e}>{e}</li>)}
                                      </ul>
                                  </div>
                              </div>
                          ) : <div className="h-full flex items-center justify-center text-grim-muted opacity-50 italic">Selecione um antecedente</div>}
                      </div>
                  </div>
              )}

              {/* Step 3: Classe (Agora Step 3 - Após Antecedente) */}
              {creationStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[50vh] animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="overflow-y-auto custom-scrollbar pr-2 space-y-2">
                          {Object.keys(CLASSES).map(cls => (
                              <div 
                                  key={cls} 
                                  onClick={() => { setNewCharData({...newCharData, class: cls}); setSelectedCreationSkills([]); }}
                                  className={`p-3 rounded border cursor-pointer transition-all ${newCharData.class === cls ? 'bg-grim-gold/20 border-grim-gold text-white' : 'bg-black/30 border-white/5 hover:bg-white/5 text-grim-muted'}`}
                              >
                                  <div className="font-bold text-sm">{cls}</div>
                              </div>
                          ))}
                      </div>
                      <div className="bg-black/20 p-4 rounded border border-white/5 overflow-y-auto custom-scrollbar flex flex-col">
                          {newCharData.class ? (
                              <div className="space-y-4">
                                  <div>
                                      <h4 className="font-cinzel text-xl text-grim-gold font-bold">{newCharData.class}</h4>
                                      <div className="text-xs text-grim-muted mt-1">Dado de Vida: <span className="text-white font-mono">{CLASSES[newCharData.class].hitDie}</span></div>
                                  </div>
                                  
                                  <div>
                                      <div className="text-xs font-bold uppercase tracking-widest text-grim-muted mb-2">
                                          Perícias ({selectedCreationSkills.length}/{CLASSES[newCharData.class].proficiencies.skillsCount})
                                      </div>
                                      <div className="text-[10px] text-grim-muted italic mb-2">
                                          {newCharData.background && "Perícias já garantidas pelo antecedente estão marcadas e desabilitadas."}
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                          {CLASSES[newCharData.class].proficiencies.skillsList.map(skill => {
                                              const bgSkills = newCharData.background ? BACKGROUNDS[newCharData.background].skills : [];
                                              const isBgSkill = bgSkills.includes(skill);
                                              return (
                                                  <label key={skill} className={`flex items-center gap-2 text-xs p-2 rounded border transition-all ${isBgSkill ? 'opacity-50 cursor-not-allowed bg-white/5 border-white/10' : selectedCreationSkills.includes(skill) ? 'bg-grim-gold/10 border-grim-gold text-white cursor-pointer' : 'bg-black/40 border-white/5 text-grim-muted hover:bg-white/5 cursor-pointer'}`}>
                                                      <input 
                                                          type="checkbox" 
                                                          className="hidden" 
                                                          checked={selectedCreationSkills.includes(skill) || isBgSkill}
                                                          disabled={isBgSkill}
                                                          onChange={() => {
                                                              if (isBgSkill) return;
                                                              if (selectedCreationSkills.includes(skill)) {
                                                                  setSelectedCreationSkills(prev => prev.filter(s => s !== skill));
                                                              } else if (selectedCreationSkills.length < CLASSES[newCharData.class].proficiencies.skillsCount) {
                                                                  setSelectedCreationSkills(prev => [...prev, skill]);
                                                              }
                                                          }}
                                                      />
                                                      {isBgSkill ? <CheckCircle2 size={12} className="text-grim-muted"/> : selectedCreationSkills.includes(skill) ? <CheckCircle2 size={12} className="text-grim-gold"/> : <div className="w-3 h-3 rounded-full border border-white/20"/>}
                                                      {skill}
                                                  </label>
                                              );
                                          })}
                                      </div>
                                  </div>
                              </div>
                          ) : <div className="h-full flex items-center justify-center text-grim-muted opacity-50 italic">Selecione uma classe</div>}
                      </div>
                  </div>
              )}

              {/* Step 4: Atributos */}
              {creationStep === 4 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="flex justify-center mb-6">
                          <div className="bg-black/40 p-1 rounded-lg flex border border-white/5">
                              <button onClick={() => setAttrMode('pointBuy')} className={`px-4 py-2 text-xs font-bold uppercase rounded transition-all ${attrMode === 'pointBuy' ? 'bg-grim-gold text-black shadow-glow' : 'text-grim-muted hover:text-white'}`}>Compra de Pontos</button>
                              <button onClick={() => setAttrMode('manual')} className={`px-4 py-2 text-xs font-bold uppercase rounded transition-all ${attrMode === 'manual' ? 'bg-grim-gold text-black shadow-glow' : 'text-grim-muted hover:text-white'}`}>Manual / Rolagem</button>
                          </div>
                      </div>

                      {attrMode === 'pointBuy' && (
                          <div className="text-center mb-4 font-mono font-bold text-grim-gold">
                              Pontos Restantes: {27 - currentPointsSpent} / 27
                          </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.values(Attribute).map(attr => {
                              // Cálculo do bônus racial fixo E flutuante
                              const fixedRacialBonus = RACES[newCharData.race]?.abilityBonuses[attr as Attribute] || 0;
                              const floatingRacialBonus = floatingBonuses.includes(attr as Attribute) ? 1 : 0;
                              const totalRacialBonus = fixedRacialBonus + floatingRacialBonus;
                              
                              const score = attrScores[attr];
                              const total = score + totalRacialBonus;
                              const mod = getModifier(total);
                              
                              return (
                                  <div key={attr} className="bg-black/30 p-3 rounded border border-white/5 flex flex-col items-center relative overflow-hidden">
                                      {totalRacialBonus > 0 && <div className="absolute top-0 right-0 bg-grim-gold text-black text-[9px] font-bold px-2 py-0.5 rounded-bl">BÔNUS</div>}
                                      <label className="text-[10px] uppercase font-bold text-grim-muted tracking-widest mb-2">{attr}</label>
                                      
                                      <div className="flex items-center gap-3 mb-2">
                                          {attrMode === 'pointBuy' && (
                                              <button 
                                                  onClick={() => score > 8 && setAttrScores({...attrScores, [attr]: score - 1})}
                                                  disabled={score <= 8}
                                                  className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded disabled:opacity-30"
                                              ><Minus size={12}/></button>
                                          )}
                                          <span className="text-2xl font-mono font-bold text-white w-8 text-center">{score}</span>
                                          {attrMode === 'pointBuy' && (
                                              <button 
                                                  onClick={() => score < 15 && (27 - currentPointsSpent >= (pointBuyCosts[(score + 1) as keyof typeof pointBuyCosts] - pointBuyCosts[score as keyof typeof pointBuyCosts])) && setAttrScores({...attrScores, [attr]: score + 1})}
                                                  disabled={score >= 15 || (27 - currentPointsSpent < (pointBuyCosts[(score + 1) as keyof typeof pointBuyCosts] - pointBuyCosts[score as keyof typeof pointBuyCosts]))}
                                                  className="w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded disabled:opacity-30"
                                              ><Plus size={12}/></button>
                                          )}
                                      </div>
                                      
                                      {attrMode === 'manual' && <input type="number" className="w-full text-center text-sm bg-black/50 border-grim-border mb-2" value={score} onChange={e => setAttrScores({...attrScores, [attr]: parseInt(e.target.value) || 10})} />}
                                      
                                      <div className="text-xs text-grim-muted flex gap-2 items-center">
                                          <span>Base {score}</span>
                                          {totalRacialBonus > 0 && <span className="text-grim-gold font-bold">+{totalRacialBonus} Raça</span>}
                                      </div>
                                      
                                      <div className="mt-2 pt-2 border-t border-white/10 w-full text-center bg-white/5 rounded-b">
                                          <span className="text-lg font-bold text-white">Total: {total}</span>
                                          <span className={`ml-2 text-sm font-bold ${mod >= 0 ? 'text-grim-gold' : 'text-grim-danger'}`}>({formatModifier(mod)})</span>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              )}

              {/* Botões de Navegação */}
              <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
                  <button 
                      onClick={() => setCreationStep(p => Math.max(0, p - 1))}
                      disabled={creationStep === 0}
                      className="px-6 py-2 rounded text-sm font-bold uppercase text-grim-muted hover:text-white disabled:opacity-30 flex items-center gap-2"
                  >
                      <ArrowLeft size={16}/> Voltar
                  </button>
                  
                  {creationStep < 4 ? (
                      <button 
                          onClick={() => {
                              // Validação simples
                              if (creationStep === 0 && !newCharData.name) return alert('Escolha um nome!');
                              if (creationStep === 1 && !newCharData.race) return alert('Escolha uma raça!');
                              if (creationStep === 1 && newCharData.race === 'Meio-Elfo' && floatingBonuses.length !== 2) return alert('Escolha exatamente 2 atributos para o bônus flutuante!');
                              if (creationStep === 2 && !newCharData.background) return alert('Escolha um antecedente!');
                              if (creationStep === 3 && !newCharData.class) return alert('Escolha uma classe!');
                              if (creationStep === 3 && selectedCreationSkills.length !== CLASSES[newCharData.class].proficiencies.skillsCount) return alert(`Escolha exatamente ${CLASSES[newCharData.class].proficiencies.skillsCount} perícias de classe! (As do antecedente não contam)`);
                              
                              setCreationStep(p => p + 1);
                          }}
                          className="px-6 py-2 bg-grim-gold text-black rounded text-sm font-bold uppercase hover:bg-white transition-all shadow-glow flex items-center gap-2"
                      >
                          Próximo <ArrowRight size={16}/>
                      </button>
                  ) : (
                      <button 
                          onClick={handleCreateNewCharacter}
                          className="px-8 py-2 bg-green-600 text-white rounded text-sm font-bold uppercase hover:bg-green-500 transition-all shadow-glow flex items-center gap-2"
                      >
                          <CheckCircle2 size={18}/> Criar Personagem
                      </button>
                  )}
              </div>
          </div>
      </Modal>
      {/* ... outros modais mantidos ... */}
    </div>
  );
}
