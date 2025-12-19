
import React from 'react';
import { Character, Attribute, ClassDefinition } from '../../types';
import { getModifier, formatModifier, getStatBreakdown } from '../../utils';
import { Shield, Zap, Footprints, Star, Heart, Brain, Swords, Dna, Edit3 } from 'lucide-react';
import StatBox from '../StatBox';
import SkillRow from '../SkillRow';
import { TopStat, ClassResourceCard, ActionRow, FeatureList } from '../SharedCharacterComponents';

interface CombatTabProps {
    char: Character;
    derivedStats: any;
    profBonus: number;
    charClassDef: ClassDefinition;
    updateCharacter: (updates: Partial<Character>) => void;
    setModalType: (type: string) => void;
    onFeatureSelect: (featureName: string) => void;
    onResetFeature: (featureId: string) => void;
}

const CombatTab: React.FC<CombatTabProps> = ({ 
    char, 
    derivedStats, 
    profBonus, 
    charClassDef, 
    updateCharacter, 
    setModalType,
    onFeatureSelect,
    onResetFeature
}) => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-stretch gap-4 mb-6 shrink-0">
                <div className="flex-grow bg-black/60 rounded-lg p-3 border border-grim-danger/30 cursor-help hover:border-grim-danger hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all group relative overflow-hidden" onClick={() => setModalType('hp-action')} title={getStatBreakdown(char, 'hp')}>
                    <div className="relative z-10 flex justify-between items-center h-full px-6">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-grim-muted uppercase tracking-[0.2em] flex items-center gap-2 mb-1">
                                <Heart size={14} className="text-grim-danger"/> Pontos de Vida
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-cinzel font-bold text-white group-hover:text-grim-danger transition-colors">{char.hp.current}</span>
                                <span className="text-base font-bold text-grim-muted">/ {derivedStats.maxHp}</span>
                                {char.hp.temp > 0 && <span className="text-base font-bold text-cyan-400 ml-2 animate-pulse">+{char.hp.temp} Temp</span>}
                            </div>
                        </div>
                        <div className="text-sm text-grim-muted uppercase tracking-widest opacity-50 group-hover:opacity-100">Gerenciar</div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-2 w-full bg-white/5">
                        <div className="h-full bg-grim-danger transition-all duration-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" style={{width: `${(char.hp.current/derivedStats.maxHp)*100}%`}}></div>
                    </div>
                </div>
                <TopStat label="CA" value={derivedStats.ac} icon={Shield} color="text-grim-gold" tooltip={getStatBreakdown(char, 'ac')} />
                <TopStat label="Iniciativa" value={formatModifier(derivedStats.initiative)} icon={Zap} tooltip={getStatBreakdown(char, 'initiative')} />
                <TopStat label="Deslocamento" value={`${derivedStats.speed}m`} icon={Footprints} tooltip={getStatBreakdown(char, 'speed')} />
                <TopStat label="Proficiência" value={`+${profBonus}`} icon={Star} />
            </div>
            <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
                <div className="col-span-7 flex flex-col gap-4 overflow-hidden">
                    <div className="shrink-0 flex flex-col gap-2">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-grim-muted uppercase tracking-widest">Atributos</span>
                            <button 
                                onClick={() => setModalType('edit-attributes')} 
                                className="text-grim-muted hover:text-white bg-white/5 hover:bg-white/10 p-1 rounded transition-colors"
                                title="Editar Atributos Base"
                            >
                                <Edit3 size={12} />
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {Object.values(Attribute).map(attr => <StatBox key={attr} label={attr} value={char.attributes[attr]} />)}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        {Object.values(Attribute).map(attr => (
                            <div key={attr} className={`flex flex-col items-center justify-center p-3 rounded border cursor-help transition-all ${char.savingThrows[attr] ? 'bg-grim-gold/10 border-grim-gold/50' : 'bg-black/30 border-grim-border/50 text-grim-muted'}`} title={getStatBreakdown(char, 'save', attr)}>
                                <span className={`text-base font-mono font-bold leading-none ${char.savingThrows[attr] ? 'text-grim-gold' : 'text-grim-text'}`}>
                                    {formatModifier(getModifier(char.attributes[attr]) + (char.savingThrows[attr] ? profBonus : 0))}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wide mt-1 opacity-60">{attr.substring(0,3)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="glass-panel rounded-xl flex-1 flex flex-col min-h-0">
                        <div className="p-3 border-b border-white/5 bg-black/20 flex justify-between items-center">
                            <h3 className="font-cinzel text-white text-base font-bold flex items-center gap-2"><Brain size={18}/> Perícias</h3>
                            <button onClick={() => setModalType('skill-editor')} className="text-grim-muted hover:text-white bg-white/5 p-1.5 rounded transition-colors"><Edit3 size={14}/></button>
                        </div>
                        <div className="p-3 grid grid-cols-2 gap-x-6 gap-y-1 overflow-y-auto custom-scrollbar content-start">
                            {char.skills.sort((a,b)=>a.name.localeCompare(b.name)).map(s => (<SkillRow key={s.name} skill={s} character={char} onClick={() => {}} />))}
                        </div>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col gap-4 overflow-hidden h-full">
                    <ClassResourceCard character={char} updateChar={updateCharacter} />
                    <div className="glass-panel rounded-xl shrink-0 flex flex-col min-h-[30%] max-h-[40%]">
                        <div className="p-3 border-b border-white/5 bg-black/20 flex justify-between items-center"><h3 className="font-cinzel text-grim-gold font-bold flex items-center gap-2 text-base"><Swords size={18}/> Ações de Ataque</h3></div>
                        <div className="p-2 overflow-y-auto custom-scrollbar">
                            {char.inventory.filter(i => i.equipped && i.type === 'Arma').map(w => { 
                                const isFinesse = w.properties?.includes('Acuidade'); 
                                const mod = getModifier(isFinesse ? Math.max(char.attributes[Attribute.STR], char.attributes[Attribute.DEX]) : char.attributes[Attribute.STR]); 
                                return (<ActionRow key={w.id} title={w.name} subtitle={w.type} meta={formatModifier(mod + profBonus)} damage={w.damage || ""} tooltip={`Bônus de Ataque: ${formatModifier(mod + profBonus)}\n- Mod. Atributo: ${formatModifier(mod)}\n- Proficiência: +${profBonus}`} />)
                            })}
                        </div>
                    </div>
                    <div className="glass-panel rounded-xl flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div className="p-3 border-b border-white/5 bg-black/20"><h3 className="font-cinzel text-white text-base font-bold flex items-center gap-2"><Dna size={18}/> Talentos e Características</h3></div>
                        <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
                            <FeatureList features={char.features} level={char.level} onSelect={onFeatureSelect} onReset={onResetFeature}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CombatTab;
