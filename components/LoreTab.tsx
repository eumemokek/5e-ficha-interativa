
import React, { useState } from 'react';
import { Character, SessionLog, InfoCard } from '../types';
import { 
    Book, Calendar, Users, MapPin, Tag, Plus, Edit3, Trash2, 
    Image as ImageIcon, Search, ChevronRight, ScrollText, 
    Clock, History, UserCircle, Map, Info, Sparkles, Shield, Anchor, Heart, Brain
} from 'lucide-react';

interface LoreTabProps {
    character: Character;
    updateCharacter: (updates: Partial<Character>) => void;
    onEditSession: (session: SessionLog) => void;
    onEditNote: (note: InfoCard) => void;
    onDeleteSession: (id: string) => void;
    onDeleteNote: (id: string) => void;
    onAddSession: () => void;
    onAddNote: () => void;
}

const LoreTab: React.FC<LoreTabProps> = ({ 
    character, 
    updateCharacter, 
    onEditSession, 
    onEditNote, 
    onDeleteSession,
    onDeleteNote,
    onAddSession, 
    onAddNote 
}) => {
    const [subTab, setSubTab] = useState<'bio' | 'sessions' | 'notes'>('bio');
    const [noteFilter, setNoteFilter] = useState<'All' | 'NPC' | 'Local' | 'Pista' | 'Outro'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotes = (character.lore.notes || []).filter(note => {
        const matchesType = noteFilter === 'All' || note.type === noteFilter;
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             note.content.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const filteredSessions = (character.lore.sessions || []).filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updatePersonality = (key: keyof typeof character.lore.personality, value: string) => {
        updateCharacter({
            lore: {
                ...character.lore,
                personality: {
                    ...character.lore.personality,
                    [key]: value
                }
            }
        });
    };

    return (
        <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Sub-Navegação */}
            <div className="flex items-center justify-between bg-black/40 p-1 rounded-lg border border-white/5 shrink-0">
                <div className="flex gap-1">
                    <button onClick={() => setSubTab('bio')} className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${subTab === 'bio' ? 'bg-grim-gold text-black shadow-glow' : 'text-grim-muted hover:text-white hover:bg-white/5'}`}><ScrollText size={16} /> Biografia</button>
                    <button onClick={() => setSubTab('sessions')} className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${subTab === 'sessions' ? 'bg-grim-gold text-black shadow-glow' : 'text-grim-muted hover:text-white hover:bg-white/5'}`}><History size={16} /> Sessões</button>
                    <button onClick={() => setSubTab('notes')} className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${subTab === 'notes' ? 'bg-grim-gold text-black shadow-glow' : 'text-grim-muted hover:text-white hover:bg-white/5'}`}><Book size={16} /> Compêndio</button>
                </div>

                {subTab !== 'bio' && (
                    <div className="flex items-center gap-3 pr-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-grim-muted" size={14} />
                            <input className="pl-9 pr-4 py-1.5 bg-black/60 border-grim-border text-xs rounded-full w-48 focus:w-64 transition-all" placeholder="Buscar no diário..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <button onClick={subTab === 'sessions' ? onAddSession : onAddNote} className="bg-grim-gold/10 text-grim-gold hover:bg-grim-gold hover:text-black p-2 rounded-full border border-grim-gold/30 transition-all cursor-pointer"><Plus size={18} /></button>
                    </div>
                )}
            </div>

            {/* Conteúdo da Biografia */}
            {subTab === 'bio' && (
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <div className="grid grid-cols-12 gap-6 pb-12">
                        {/* História Principal */}
                        <div className="col-span-8 flex flex-col gap-6">
                            <div className="glass-panel rounded-xl overflow-hidden flex flex-col min-h-[400px]">
                                <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
                                    <h2 className="text-xl font-cinzel text-grim-gold font-bold flex items-center gap-2"><UserCircle size={20} /> História e Antecedente</h2>
                                    <span className="text-[10px] uppercase font-bold text-grim-muted bg-white/5 px-2 py-1 rounded">{character.background}</span>
                                </div>
                                <div className="p-6 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                                    <textarea 
                                        className="w-full min-h-[350px] bg-transparent border-none focus:ring-0 text-base font-serif leading-relaxed text-grim-text/90 placeholder:text-grim-muted/30 resize-none p-0 custom-scrollbar"
                                        placeholder="Descreva a jornada do seu herói..."
                                        value={character.lore.backstory}
                                        onChange={(e) => updateCharacter({ lore: { ...character.lore, backstory: e.target.value } })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Traços de Personalidade */}
                        <div className="col-span-4 flex flex-col gap-4">
                            <div className="glass-panel rounded-xl p-4 border-l-2 border-l-grim-gold">
                                <label className="text-[10px] uppercase font-bold text-grim-gold flex items-center gap-2 mb-2"><Sparkles size={12} /> Traços de Personalidade</label>
                                <textarea className="w-full bg-black/40 border-none text-sm p-0 focus:ring-0 min-h-[80px] resize-none" placeholder="Ex: Sou educado com todos..." value={character.lore.personality.traits} onChange={e => updatePersonality('traits', e.target.value)} />
                            </div>
                            <div className="glass-panel rounded-xl p-4 border-l-2 border-l-cyan-500">
                                <label className="text-[10px] uppercase font-bold text-cyan-500 flex items-center gap-2 mb-2"><Brain size={12} /> Ideais</label>
                                <textarea className="w-full bg-black/40 border-none text-sm p-0 focus:ring-0 min-h-[80px] resize-none" placeholder="Ex: Respeito é tudo..." value={character.lore.personality.ideals} onChange={e => updatePersonality('ideals', e.target.value)} />
                            </div>
                            <div className="glass-panel rounded-xl p-4 border-l-2 border-l-emerald-500">
                                <label className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-2 mb-2"><Anchor size={12} /> Ligações</label>
                                <textarea className="w-full bg-black/40 border-none text-sm p-0 focus:ring-0 min-h-[80px] resize-none" placeholder="Ex: Devo minha vida a..." value={character.lore.personality.bonds} onChange={e => updatePersonality('bonds', e.target.value)} />
                            </div>
                            <div className="glass-panel rounded-xl p-4 border-l-2 border-l-grim-danger">
                                <label className="text-[10px] uppercase font-bold text-grim-danger flex items-center gap-2 mb-2"><Heart size={12} /> Defeitos</label>
                                <textarea className="w-full bg-black/40 border-none text-sm p-0 focus:ring-0 min-h-[80px] resize-none" placeholder="Ex: Sou muito orgulhoso..." value={character.lore.personality.flaws} onChange={e => updatePersonality('flaws', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Conteúdo das Sessões */}
            {subTab === 'sessions' && (
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {filteredSessions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                            {filteredSessions.map((session) => (
                                <div key={session.id} onClick={() => onEditSession(session)} className="group relative bg-[#121214] border border-grim-border/40 rounded-xl overflow-hidden cursor-pointer hover:border-grim-gold hover:shadow-glow transition-all flex flex-col h-72">
                                    {session.imageUrl ? (
                                        <div className="h-32 w-full relative overflow-hidden">
                                            <img src={session.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        </div>
                                    ) : (
                                        <div className="h-32 w-full bg-grim-surface/30 flex items-center justify-center text-grim-muted/20 border-b border-white/5"><ImageIcon size={48} /></div>
                                    )}
                                    <div className="absolute top-2 right-2 z-20">
                                        <button onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }} className="p-2 bg-black/50 hover:bg-grim-danger text-grim-muted hover:text-white rounded-full transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                    <div className="flex-1 p-5 flex flex-col">
                                        <div className="flex justify-between items-start mb-2"><span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-grim-muted bg-black/40 px-2 py-1 rounded border border-white/5"><Clock size={10} /> {new Date(session.date).toLocaleDateString('pt-BR')}</span></div>
                                        <h3 className="font-bold text-xl text-white mb-2 line-clamp-1 group-hover:text-grim-gold transition-colors">{session.title}</h3>
                                        <p className="text-sm text-grim-muted line-clamp-3 leading-relaxed font-serif italic">"{session.content}"</p>
                                        <div className="mt-auto pt-4 flex justify-end"><span className="text-[10px] uppercase font-bold text-grim-gold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Ler mais <ChevronRight size={10} /></span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-grim-muted opacity-30 p-12 border-2 border-dashed border-white/5 rounded-xl"><Calendar size={64} className="mb-4" /><p className="font-cinzel text-xl">Nenhum registro encontrado</p></div>
                    )}
                </div>
            )}

            {/* Conteúdo do Compêndio */}
            {subTab === 'notes' && (
                <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                    <div className="flex gap-2 shrink-0">
                        {['All', 'NPC', 'Local', 'Pista', 'Outro'].map((type) => (
                            <button key={type} onClick={() => setNoteFilter(type as any)} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${noteFilter === type ? 'bg-white text-black border-white shadow-glow' : 'bg-black/40 text-grim-muted border-grim-border hover:border-white hover:text-white'}`}>{type === 'All' ? 'Tudo' : type}</button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {filteredNotes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
                                {filteredNotes.map((note) => (
                                    <div key={note.id} onClick={() => onEditNote(note)} className="group bg-[#1a1a1c] border border-white/5 hover:border-grim-gold/50 transition-all rounded-xl p-0 cursor-pointer flex flex-col shadow-lg overflow-hidden relative">
                                        <div className={`h-1.5 w-full ${note.type === 'NPC' ? 'bg-purple-500' : note.type === 'Local' ? 'bg-emerald-500' : note.type === 'Pista' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
                                        <div className="absolute top-3 right-2 z-20">
                                            <button onClick={(e) => { e.stopPropagation(); onDeleteNote(note.id); }} className="p-1.5 bg-black/50 hover:bg-grim-danger text-grim-muted hover:text-white rounded-full transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                        <div className="p-4 flex flex-col gap-3 flex-1">
                                            <div className="flex justify-between items-start"><div className="p-2 rounded bg-black/40 border border-white/5 text-white/40">{note.type === 'NPC' ? <Users size={16} /> : note.type === 'Local' ? <MapPin size={16} /> : note.type === 'Pista' ? <Search size={16} /> : <Tag size={16} />}</div><span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest ${note.type === 'NPC' ? 'text-purple-400 bg-purple-500/10' : note.type === 'Local' ? 'text-emerald-400 bg-emerald-500/10' : note.type === 'Pista' ? 'text-red-400 bg-red-500/10' : 'text-gray-400 bg-gray-500/10'}`}>{note.type}</span></div>
                                            {note.imageUrl && (<div className="h-32 w-full overflow-hidden rounded-lg border border-white/5"><img src={note.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" /></div>)}
                                            <div><h4 className="font-bold text-lg text-white mb-1 truncate group-hover:text-grim-gold transition-colors">{note.title}</h4><p className="text-xs text-grim-muted leading-relaxed line-clamp-4 font-serif italic opacity-70">{note.content}</p></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-grim-muted opacity-30 p-12 border-2 border-dashed border-white/5 rounded-xl"><Search size={64} className="mb-4" /><p className="font-cinzel text-xl">Nenhuma anotação neste volume</p></div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoreTab;
