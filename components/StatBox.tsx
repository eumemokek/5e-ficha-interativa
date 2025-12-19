
import React from 'react';
import { getModifier, formatModifier } from '../utils';
import { Swords, Wind, Heart, Brain, Eye, Crown, LucideIcon } from 'lucide-react';
import { Attribute } from '../types';

interface StatBoxProps {
  label: Attribute;
  value: number;
}

const ATTR_CONFIG: Record<string, { icon: LucideIcon, color: string, bg: string, border: string }> = {
    [Attribute.STR]: { icon: Swords, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    [Attribute.DEX]: { icon: Wind, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
    [Attribute.CON]: { icon: Heart, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
    [Attribute.INT]: { icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    [Attribute.WIS]: { icon: Eye, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    [Attribute.CHA]: { icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
};

const StatBox: React.FC<StatBoxProps> = ({ label, value }) => {
  const mod = getModifier(value);
  const formattedMod = formatModifier(mod);
  const config = ATTR_CONFIG[label] || ATTR_CONFIG[Attribute.STR];
  const Icon = config.icon;
  
  return (
    <div 
        className={`group relative w-full h-[60px] flex items-center bg-[#121214] rounded border border-[#27272a] overflow-hidden hover:border-grim-border transition-colors shadow-sm`}
        title={`${label}: ${value}\nModificador: ${formattedMod}`}
    >
        <div className={`h-full w-[40px] flex flex-col items-center justify-center gap-0.5 border-r border-[#27272a] ${config.bg}`}>
            <Icon size={16} className={config.color} />
            <span className="text-[9px] uppercase font-bold text-grim-muted tracking-widest">{label.substring(0,3)}</span>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-black/20 to-transparent">
            <span className={`text-2xl font-cinzel font-bold ${mod >= 0 ? 'text-grim-text' : 'text-grim-danger'}`}>{formattedMod}</span>
        </div>
        <div className="pr-3 pl-1 flex flex-col items-center justify-center">
            <div className="text-xs font-mono text-grim-muted/60 border border-white/5 bg-black rounded px-2 py-0.5">{value}</div>
        </div>
    </div>
  );
};

export default StatBox;
