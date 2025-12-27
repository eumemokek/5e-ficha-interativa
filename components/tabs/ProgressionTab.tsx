
import React from 'react';
import { Character, Feature } from '../../types';
import { getSourceStyle } from '../SharedCharacterComponents';
import { Milestone, ArrowUpCircle } from 'lucide-react';

interface ProgressionTabProps {
    char: Character;
}

const ProgressionTab: React.FC<ProgressionTabProps> = ({ char }) => {
    // Agrupa features por nível
    const featuresByLevel: Record<number, Feature[]> = {};
    
    char.features.forEach(f => {
        const lvl = f.level || 1; // Default to 1 if undefined (like initial race features)
        if (!featuresByLevel[lvl]) {
            featuresByLevel[lvl] = [];
        }
        featuresByLevel[lvl].push(f);
    });

    const levels = Object.keys(featuresByLevel).map(Number).sort((a, b) => a - b);

    return (
        <div className="h-full glass-panel rounded-xl flex flex-col p-6 overflow-hidden">
            <div className="border-b border-white/10 pb-4 mb-4 flex justify-between items-center shrink-0">
                <h2 className="text-3xl font-cinzel text-grim-gold flex items-center gap-3">
                    <Milestone size={32}/> Jornada do Herói
                </h2>
                <div className="text-xs text-grim-muted uppercase tracking-widest font-bold">
                    Nível Atual: {char.level}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 relative">
                {/* Linha vertical central */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-grim-gold via-grim-border to-transparent opacity-30"></div>

                <div className="flex flex-col gap-8 pb-12">
                    {levels.map(lvl => (
                        <div key={lvl} className="relative pl-16">
                            {/* Marcador de Nível */}
                            <div className="absolute left-4 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-grim-gold flex items-center justify-center z-10 shadow-glow">
                                <span className="text-xs font-bold text-white">{lvl}</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h3 className="text-lg font-cinzel text-white font-bold opacity-90 flex items-center gap-2">
                                    {lvl === 1 ? 'Início da Jornada' : `Nível ${lvl}`}
                                    {lvl > char.level && <span className="text-xs text-grim-muted bg-black/40 px-2 py-0.5 rounded font-sans uppercase tracking-wide opacity-60">Futuro</span>}
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {featuresByLevel[lvl].map((feature, idx) => {
                                        const style = getSourceStyle(feature.source);
                                        return (
                                            <div key={feature.id} className={`p-4 rounded-lg border bg-black/40 relative overflow-hidden group transition-all hover:-translate-y-1 ${style.border}`}>
                                                <div className={`absolute top-0 left-0 w-1 h-full ${style.bg.replace('/5', '/50')}`}></div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className={`font-bold text-sm ${style.text}`}>{feature.name}</h4>
                                                    <span className={`text-[9px] uppercase tracking-widest font-bold opacity-60 px-2 py-0.5 rounded bg-white/5 ${style.text}`}>
                                                        {feature.source}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-grim-muted leading-relaxed font-serif">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Next Level Teaser */}
                    {char.level < 20 && (
                        <div className="relative pl-16 opacity-50 hover:opacity-100 transition-opacity cursor-help" title="Próximo Nível">
                            <div className="absolute left-4 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-dashed border-grim-muted flex items-center justify-center z-10">
                                <ArrowUpCircle size={16} className="text-grim-muted"/>
                            </div>
                            <div className="p-4 border-2 border-dashed border-white/5 rounded-lg bg-black/20">
                                <span className="text-sm font-bold text-grim-muted uppercase tracking-widest">Próximo Nível...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgressionTab;
