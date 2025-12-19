
import React, { useState } from 'react';
import { Character, Feature, Attribute } from '../types';
import { getFeatureOptions, formatModifier, calculateResourceMax, getModifier } from '../utils';
import { Sparkles, ChevronUp, ChevronDown, AlertCircle, RefreshCw, Swords } from 'lucide-react';
import { CLASSES } from '../data/rules';

// --- ClassResourceCard ---
export const ClassResourceCard: React.FC<{ character: Character, updateChar: (updates: Partial<Character>) => void }> = ({ character, updateChar }) => {
    const baseClass = character.class.split(' ')[0];
    const classDef = CLASSES[baseClass];
    const [expanded, setExpanded] = useState(false);
    if (!classDef || !classDef.resources || classDef.resources.length === 0) return null;
    return (
        <div className="glass-panel rounded-lg flex flex-col shrink-0 mb-3 border border-grim-gold/30 overflow-hidden">
            <div className="p-2 border-b border-white/5 bg-black/20 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setExpanded(!expanded)}>
                <h3 className="font-cinzel text-grim-gold text-sm font-bold flex items-center gap-1.5"><Sparkles size={14}/> Recursos</h3>
                <div className="text-grim-muted">{expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</div>
            </div>
            {expanded && (
              <div className="p-3 flex flex-col gap-3">
                  {classDef.resources.map(res => {
                      const max = calculateResourceMax(res, character.level);
                      const used = character.resourceUsage[res.name] || 0;
                      return (
                          <div key={res.name} className="flex flex-col gap-1.5">
                              <div className="flex justify-between items-center"><span className="text-xs font-bold uppercase tracking-wide text-white">{res.name}</span><span className="text-[10px] text-grim-muted opacity-80">Rec. {res.reset}</span></div>
                              <div className="flex flex-wrap gap-1">
                                  {Array.from({ length: max }).map((_, i) => (
                                      <button key={i} onClick={() => updateChar({ resourceUsage: { ...character.resourceUsage, [res.name]: i < used ? used - 1 : used + 1 } })} className={`w-5 h-6 rounded-sm border transition-all hover:scale-110 cursor-pointer ${i < used ? 'bg-black/40 border-grim-border/30 opacity-40' : 'bg-grim-gold border-white shadow-[0_0_6px_rgba(251,191,36,0.5)]'}`} />
                                  ))}
                              </div>
                          </div>
                      );
                  })}
              </div>
            )}
        </div>
    );
};

// --- FeatureList ---
export const FeatureList: React.FC<{ features: Feature[], level: number, onSelect: (name: string) => void, onReset: (id: string) => void }> = ({ features, level, onSelect, onReset }) => {
    const availableFeatures = features.filter(f => !f.level || f.level <= level);
    if (availableFeatures.length === 0) return null;
    const grouped = { 'Raça': availableFeatures.filter(f => f.source === 'Raça'), 'Classe': availableFeatures.filter(f => f.source === 'Classe'), 'Antecedente': availableFeatures.filter(f => f.source === 'Antecedente'), 'Outros': availableFeatures.filter(f => !['Raça', 'Classe', 'Antecedente'].includes(f.source)) };
    return (
        <div className="flex flex-col gap-4">
            {Object.entries(grouped).map(([category, items]) => {
                if (items.length === 0) return null;
                return (
                    <div key={category}>
                        <h4 className="text-xs uppercase font-bold text-grim-muted tracking-widest mb-2 border-b border-white/5 pb-1 flex items-center gap-2">{category}</h4>
                        <div className="flex flex-col gap-2">
                            {items.map(f => {
                                const canSelect = !!getFeatureOptions(f.name);
                                const isChosen = f.origin || f.name.includes(':');
                                return (
                                    <div key={f.id} onClick={() => { if (canSelect && !isChosen) onSelect(f.name); }} className={`p-3 rounded border relative transition-all group ${canSelect && !isChosen ? 'bg-grim-gold/5 border-grim-gold/30 hover:bg-grim-gold/10 cursor-pointer shadow-glow animate-pulse-slow' : 'bg-black/30 border-white/5'}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className={`font-bold text-sm flex items-center gap-2 ${canSelect && !isChosen ? 'text-grim-gold' : 'text-white'}`}>
                                                {f.name}
                                                {canSelect && !isChosen && <AlertCircle size={12} className="text-grim-gold animate-bounce" />}
                                            </h5>
                                            {isChosen && f.name.includes(':') && <button onClick={(e) => { e.stopPropagation(); onReset(f.id); }} className="text-grim-muted hover:text-grim-danger p-1 transition-colors" title="Redefinir Escolha"><RefreshCw size={12} /></button>}
                                        </div>
                                        <p className="text-xs text-grim-muted leading-relaxed">{f.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- TopStat ---
export const TopStat: React.FC<{ label: string, value: string | number, icon: any, color?: string, tooltip?: string }> = ({ label, value, icon: Icon, color = "text-grim-text", tooltip }) => (
    <div className="flex flex-col items-center justify-center bg-black/40 px-6 py-3 rounded border border-grim-border/50 min-w-[90px] group cursor-help transition-all hover:border-grim-gold" title={tooltip}>
        <div className="flex items-center gap-1.5 text-xs uppercase text-grim-muted font-bold tracking-widest mb-1"><Icon size={14} /> {label}</div>
        <div className={`text-3xl font-cinzel font-bold ${color}`}>{value}</div>
    </div>
);

// --- ActionRow ---
export const ActionRow: React.FC<{ title: string, subtitle: string, meta: string, damage: string, onClick?: () => void, tooltip?: string }> = ({ title, subtitle, meta, damage, onClick, tooltip }) => (
    <div onClick={onClick} className="group flex items-center justify-between p-3 bg-black/30 border-l-2 border-grim-border hover:border-grim-gold hover:bg-white/5 transition-all cursor-pointer rounded-r mb-1" title={tooltip}>
        <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-black border border-grim-border/50 text-grim-muted group-hover:text-grim-gold group-hover:border-grim-gold transition-colors"><Swords size={16} /></div>
            <div><div className="text-base font-bold text-grim-text group-hover:text-white leading-tight">{title}</div><div className="text-xs text-grim-muted uppercase tracking-wider">{subtitle}</div></div>
        </div>
        <div className="text-right"><div className="text-sm font-mono font-bold text-grim-gold">{meta}</div><div className="text-xs text-grim-muted">{damage}</div></div>
    </div>
);
