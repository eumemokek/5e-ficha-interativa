
import React from 'react';
import { Skill, Character } from '../types';
import { getModifier, getProficiencyBonus, formatModifier, getStatBreakdown } from '../utils';
import { Circle, CheckCircle2, Crown } from 'lucide-react';

interface SkillRowProps {
  skill: Skill;
  character: Character;
  onClick: () => void;
}

const SkillRow: React.FC<SkillRowProps> = ({ skill, character, onClick }) => {
  const attrScore = character.attributes[skill.attribute];
  let modValue = getModifier(attrScore);
  const profBonus = getProficiencyBonus(character.level);

  if (skill.proficient) modValue += profBonus;
  if (skill.expertise) modValue += profBonus;

  const modStr = formatModifier(modValue);
  const breakdown = getStatBreakdown(character, 'skill', skill.name);

  const isFromFeature = character.features.some(f => 
    f.active && f.modifiers?.some(m => m.target === 'skill' && m.subtarget === skill.name)
  );
  
  // Lógica para identificar a origem (aproximada para visualização)
  // Nota: Isso é visual. A lógica real está complexa no utils, aqui identificamos para o usuário
  // Se veio de um Feature (raça/classe/talento) -> Roxo
  // Se veio de Background (hardcoded check no utils, aqui inferimos) -> Ciano
  // Se é manual (sem feature específica mas proficiente) -> Branco/Padrão
  
  let IconComponent = Circle;
  let iconColor = "text-grim-border";
  let tooltipSource = "";

  if (skill.expertise) {
      IconComponent = Crown;
      iconColor = "text-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]";
      tooltipSource = "Especialização";
  } else if (skill.proficient) {
      IconComponent = CheckCircle2;
      if (isFromFeature) {
          iconColor = "text-grim-gold shadow-[0_0_8px_rgba(251,191,36,0.5)]"; // Classe/Raça (Feature)
          tooltipSource = "Origem: Classe ou Raça";
      } else {
          // Assumimos Antecedente ou Manual se não tiver feature linkada
          // Azul para diferenciar
          iconColor = "text-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]";
          tooltipSource = "Origem: Antecedente ou Escolha";
      }
  }

  return (
    <div 
        className="group flex items-center justify-between py-1.5 px-2 rounded hover:bg-white/5 transition-all cursor-help"
        title={breakdown}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <div className={`transition-colors duration-300 shrink-0 ${iconColor}`} title={tooltipSource}>
            <IconComponent size={14} className={skill.proficient ? "fill-current bg-black rounded-full" : ""} />
        </div>
        <span className={`text-sm tracking-wide font-normal group-hover:text-white transition-colors truncate ${skill.proficient ? 'text-white' : 'text-grim-muted'}`}>
            {skill.name}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] uppercase text-grim-muted/50 font-bold w-6 text-right">{skill.attribute.substring(0,3)}</span>
          <span className={`text-sm font-mono font-bold w-7 text-right ${skill.proficient ? (skill.expertise ? 'text-purple-400' : 'text-grim-gold') : 'text-grim-muted'}`}>
              {modStr}
          </span>
      </div>
    </div>
  );
};

export default SkillRow;
