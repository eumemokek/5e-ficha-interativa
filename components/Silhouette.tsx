
import React from 'react';
import { Character, Item } from '../types';
import { Shield, Swords, Shirt, GraduationCap, Footprints, Gem, Hand } from 'lucide-react';

interface SilhouetteProps {
    character: Character;
}

const Slot: React.FC<{ item?: Item, type: string, icon: any, style: string }> = ({ item, type, icon: Icon, style }) => (
    <div 
        className={`absolute w-12 h-12 rounded border flex items-center justify-center transition-all duration-300 group z-20 ${style} ${item ? 'bg-grim-pageLight border-grim-gold shadow-glow' : 'bg-black/40 border-grim-border/50 text-grim-muted/20'}`}
        title={item ? `${item.name} (${type})` : `Slot de ${type} Vazio`}
    >
        {item ? (
            <div className="relative w-full h-full flex items-center justify-center">
               {item.imageUrl ? (
                   <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity" />
               ) : (
                   <Icon size={24} className="text-grim-gold animate-pulse-slow" />
               )}
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/90 text-grim-gold text-[9px] px-2 py-1 rounded border border-grim-border opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none transition-opacity uppercase tracking-widest shadow-xl">
                   {item.name}
               </div>
            </div>
        ) : (
            <Icon size={20} />
        )}
    </div>
);

const Silhouette: React.FC<SilhouetteProps> = ({ character }) => {
    // Lógica de busca de itens equipados por slot usando tipos estritos
    const equippedItems = character.inventory.filter(i => i.equipped);

    const armor = equippedItems.find(i => i.type === 'Armadura' || i.type === 'Roupas');
    
    const mainHand = equippedItems.find(i => i.type === 'Arma');
    
    // Tenta achar item de mão secundária (Escudo, Foco, ou segunda arma diferente da primeira)
    const offHand = equippedItems.find(i => i.id !== mainHand?.id && (i.type === 'Escudo' || i.type === 'Arma' || i.type === 'Foco'));
    
    // Acessório: Anel, Amuleto ou Capa (pega o primeiro que achar para mostrar no slot de acessório)
    const accessory = equippedItems.find(i => i.type === 'Anel' || i.type === 'Amuleto' || i.type === 'Capa');

    const helm = equippedItems.find(i => i.type === 'Capacete');

    const boots = equippedItems.find(i => i.type === 'Botas');

    const gloves = equippedItems.find(i => i.type === 'Luvas');

    return (
        <div className="relative w-64 h-96 mx-auto my-4 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] rounded-xl border border-grim-border/30 shadow-inner-page flex items-center justify-center overflow-hidden">
            {/* Corpo Base (Silhueta Abstrata SVG) */}
            <svg viewBox="0 0 200 300" className="w-full h-full opacity-20 text-grim-muted absolute inset-0 pointer-events-none">
                <path fill="currentColor" d="M100,20 C120,20 130,40 130,60 C130,70 120,80 100,80 C80,80 70,70 70,60 C70,40 80,20 100,20 Z" /> {/* Cabeça */}
                <path fill="currentColor" d="M60,90 L140,90 L130,180 L70,180 Z" /> {/* Torso */}
                <path fill="currentColor" d="M50,90 L20,160 L30,170 L60,100 Z" /> {/* Braço Esq */}
                <path fill="currentColor" d="M150,90 L180,160 L170,170 L140,100 Z" /> {/* Braço Dir */}
                <path fill="currentColor" d="M75,180 L75,280 L95,280 L95,180 Z" /> {/* Perna Esq */}
                <path fill="currentColor" d="M125,180 L125,280 L105,280 L105,180 Z" /> {/* Perna Dir */}
            </svg>

            {/* Linhas de Conexão Estilizadas */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                {/* Mão Esq (Main) */}
                <path d="M 60 150 L 25 150" stroke="#44403c" strokeWidth="1" fill="none" /> 
                
                {/* Mão Dir (Off) */}
                <path d="M 140 150 L 175 150" stroke="#44403c" strokeWidth="1" fill="none" /> 
                
                {/* Pés (Curva suave para a direita inferior) */}
                <path d="M 115 260 L 175 260" stroke="#44403c" strokeWidth="1" fill="none" /> 
                
                {/* Luvas (Curva suave para a direita superior) */}
                <path d="M 160 130 L 175 100" stroke="#44403c" strokeWidth="1" fill="none" /> 

                {/* Acessório (Curva suave para a esquerda inferior) */}
                <path d="M 90 90 L 25 240" stroke="#44403c" strokeWidth="1" fill="none" strokeDasharray="4" />
            </svg>

            {/* --- SLOTS CENTRAIS --- */}
            
            {/* Cabeça (Centralizado no Topo) */}
            <Slot type="Cabeça" icon={GraduationCap} item={helm} style="top-4 left-1/2 -translate-x-1/2" />
            
            {/* Torso (Centralizado no Peito) */}
            <Slot type="Torso" icon={Shirt} item={armor} style="top-[35%] left-1/2 -translate-x-1/2" />


            {/* --- SLOTS LATERAIS --- */}

            {/* Mão Principal (Esquerda Visual) */}
            <Slot type="Mão Principal" icon={Swords} item={mainHand} style="top-1/2 left-2 -translate-y-1/2" />

            {/* Mão Secundária (Direita Visual) */}
            <Slot type="Mão Secundária" icon={Shield} item={offHand} style="top-1/2 right-2 -translate-y-1/2" />

            {/* Luvas / Mãos (Direita Superior) */}
            <Slot type="Mãos/Luvas" icon={Hand} item={gloves} style="top-20 right-2" />

            {/* Acessório (Esquerda Inferior) */}
            <Slot type="Acessório" icon={Gem} item={accessory} style="bottom-16 left-2" />

            {/* Pés (Direita Inferior) */}
            <Slot type="Pés" icon={Footprints} item={boots} style="bottom-4 right-2" />

            {/* Label Central */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-grim-muted uppercase tracking-[0.3em] opacity-50 whitespace-nowrap">Equipamento</div>
        </div>
    );
};

export default Silhouette;
