
import React from 'react';
import { SessionLog, InfoCard, Character } from '../../types';
import { fileToBase64 } from '../../utils';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Modal from '../Modal';

interface LoreModalsProps {
    modalType: string;
    setModalType: (type: string) => void;
    editingSession: SessionLog | null;
    setEditingSession: (s: SessionLog | null) => void;
    editingNote: InfoCard | null;
    setEditingNote: (n: InfoCard | null) => void;
    char: Character;
    updateCharacter: (updates: Partial<Character>) => void;
}

export const LoreModals: React.FC<LoreModalsProps> = ({
    modalType, setModalType, editingSession, setEditingSession, editingNote, setEditingNote, char, updateCharacter
}) => {

    const handleSaveSession = () => {
        if(!editingSession || !editingSession.title) return;
        const list = char.lore.sessions || [];
        const exists = list.some(s => s.id === editingSession.id);
        const newList = exists ? list.map(s => s.id === editingSession.id ? editingSession : s) : [editingSession, ...list];
        updateCharacter({ lore: { ...char.lore, sessions: newList } });
        setEditingSession(null); setModalType('none');
    };

    const handleSaveNote = () => {
        if(!editingNote || !editingNote.title) return;
        const list = char.lore.notes || [];
        const exists = list.some(n => n.id === editingNote.id);
        const newList = exists ? list.map(n => n.id === editingNote.id ? editingNote : n) : [editingNote, ...list];
        updateCharacter({ lore: { ...char.lore, notes: newList } });
        setEditingNote(null); setModalType('none');
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'session' | 'note') => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const base64 = await fileToBase64(file);
            if (type === 'session' && editingSession) {
                setEditingSession({ ...editingSession, imageUrl: base64 });
            } else if (type === 'note' && editingNote) {
                setEditingNote({ ...editingNote, imageUrl: base64 });
            }
        } catch (err) {
            console.error("Erro ao carregar imagem", err);
        }
    };

    return (
        <>
            <Modal isOpen={modalType === 'edit-session' && !!editingSession} onClose={() => setModalType('none')} title="Registro de Sessão">
                {editingSession && (
                    <div className="space-y-4">
                        <div><label className="text-xs uppercase font-bold text-grim-muted">Título</label><input className="w-full" value={editingSession.title} onChange={e => setEditingSession({...editingSession, title: e.target.value})} /></div>
                        <div><label className="text-xs uppercase font-bold text-grim-muted">Data</label><input type="date" className="w-full" value={editingSession.date} onChange={e => setEditingSession({...editingSession, date: e.target.value})} /></div>
                        
                        {/* Imagem */}
                        <div>
                            <label className="text-xs uppercase font-bold text-grim-muted mb-1 block">Imagem de Capa</label>
                            <div className="flex gap-2">
                                <input className="flex-1" placeholder="URL da imagem..." value={editingSession.imageUrl || ''} onChange={e => setEditingSession({...editingSession, imageUrl: e.target.value})} />
                                <label className="bg-white/10 hover:bg-white/20 p-2 rounded cursor-pointer border border-white/10" title="Upload Local">
                                    <Upload size={18} className="text-grim-muted" />
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'session')} />
                                </label>
                            </div>
                            {editingSession.imageUrl && (
                                <div className="mt-2 h-32 w-full rounded overflow-hidden border border-white/10 bg-black/50">
                                    <img src={editingSession.imageUrl} className="w-full h-full object-cover opacity-70" alt="Preview" />
                                </div>
                            )}
                        </div>

                        <div><label className="text-xs uppercase font-bold text-grim-muted">Conteúdo</label><textarea className="w-full h-48 custom-scrollbar" value={editingSession.content} onChange={e => setEditingSession({...editingSession, content: e.target.value})} placeholder="O que aconteceu nesta aventura..." /></div>
                        <button onClick={handleSaveSession} className="w-full py-3 bg-grim-gold text-black font-bold uppercase rounded hover:bg-white transition-all">Salvar Registro</button>
                    </div>
                )}
            </Modal>

            <Modal isOpen={modalType === 'edit-note' && !!editingNote} onClose={() => setModalType('none')} title="Nota do Compêndio">
                {editingNote && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2"><label className="text-xs uppercase font-bold text-grim-muted">Título</label><input className="w-full" value={editingNote.title} onChange={e => setEditingNote({...editingNote, title: e.target.value})} /></div>
                            <div>
                                <label className="text-xs uppercase font-bold text-grim-muted">Tipo</label>
                                <select className="w-full bg-black/40 border border-grim-border rounded p-2 text-white" value={editingNote.type} onChange={e => setEditingNote({...editingNote, type: e.target.value as any})}>
                                    <option value="NPC">NPC</option>
                                    <option value="Local">Local</option>
                                    <option value="Pista">Pista</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                        </div>

                        {/* Imagem */}
                        <div>
                            <label className="text-xs uppercase font-bold text-grim-muted mb-1 block">Imagem</label>
                            <div className="flex gap-2">
                                <input className="flex-1" placeholder="URL da imagem..." value={editingNote.imageUrl || ''} onChange={e => setEditingNote({...editingNote, imageUrl: e.target.value})} />
                                <label className="bg-white/10 hover:bg-white/20 p-2 rounded cursor-pointer border border-white/10" title="Upload Local">
                                    <Upload size={18} className="text-grim-muted" />
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'note')} />
                                </label>
                            </div>
                            {editingNote.imageUrl && (
                                <div className="mt-2 h-32 w-full rounded overflow-hidden border border-white/10 bg-black/50">
                                    <img src={editingNote.imageUrl} className="w-full h-full object-cover opacity-70" alt="Preview" />
                                </div>
                            )}
                        </div>

                        <div><label className="text-xs uppercase font-bold text-grim-muted">Conteúdo</label><textarea className="w-full h-48 custom-scrollbar" value={editingNote.content} onChange={e => setEditingNote({...editingNote, content: e.target.value})} placeholder="Detalhes, segredos, descrições..." /></div>
                        <button onClick={handleSaveNote} className="w-full py-3 bg-grim-gold text-black font-bold uppercase rounded hover:bg-white transition-all">Salvar Nota</button>
                    </div>
                )}
            </Modal>
        </>
    );
};
