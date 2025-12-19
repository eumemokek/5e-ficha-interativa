
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            {/* Moldura Externa */}
            <div className="glass-panel w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden rounded-xl shadow-2xl border-theme">
                
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-white/10 bg-black/20">
                    <h3 className="text-xl font-serif tracking-wide text-white font-bold flex items-center gap-2">
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full cursor-pointer">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
