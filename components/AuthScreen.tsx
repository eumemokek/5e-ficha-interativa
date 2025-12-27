
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { Skull, Shield, Sword, Lock, User as UserIcon, AlertCircle, Loader2 } from 'lucide-react';

interface AuthScreenProps {
    onLogin: (user: any) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError("Preencha todos os campos.");
            setLoading(false);
            return;
        }

        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            }
            onLogin(userCredential.user);
        } catch (err: any) {
            const firebaseError = err as AuthError;
            console.error(firebaseError);
            let msg = "Ocorreu um erro.";
            if (firebaseError.code === 'auth/invalid-credential' || firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') msg = "E-mail ou senha incorretos.";
            if (firebaseError.code === 'auth/email-already-in-use') msg = "Este e-mail já está cadastrado.";
            if (firebaseError.code === 'auth/weak-password') msg = "A senha deve ter pelo menos 6 caracteres.";
            if (firebaseError.code === 'auth/invalid-email') msg = "E-mail inválido.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-grim-bg bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-grim-panel border border-grim-border/50 rounded-2xl shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-grim-gold to-transparent opacity-50"></div>
                
                <div className="p-8 flex flex-col items-center">
                    <div className="mb-6 p-4 rounded-full bg-black/40 border border-grim-gold/30 shadow-glow">
                        <Skull size={48} className="text-grim-gold" />
                    </div>
                    <h1 className="text-3xl font-cinzel font-bold text-white mb-1">Grimório Digital</h1>
                    <p className="text-grim-muted text-sm uppercase tracking-widest mb-8">5ª Edição • Firebase Edition</p>

                    <div className="flex gap-4 mb-8 bg-black/30 p-1 rounded-lg w-full">
                        <button 
                            onClick={() => { setIsLogin(true); setError(''); }}
                            className={`flex-1 py-2 rounded font-bold uppercase text-xs tracking-wider transition-all ${isLogin ? 'bg-grim-gold text-black shadow-lg' : 'text-grim-muted hover:text-white'}`}
                        >
                            Entrar
                        </button>
                        <button 
                            onClick={() => { setIsLogin(false); setError(''); }}
                            className={`flex-1 py-2 rounded font-bold uppercase text-xs tracking-wider transition-all ${!isLogin ? 'bg-grim-gold text-black shadow-lg' : 'text-grim-muted hover:text-white'}`}
                        >
                            Registrar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                        <div className="relative group">
                            <UserIcon className="absolute left-3 top-3.5 text-grim-muted group-focus-within:text-grim-gold transition-colors" size={18} />
                            <input 
                                type="email" 
                                placeholder="E-mail" 
                                className="w-full pl-10 bg-black/40 border-grim-border focus:border-grim-gold p-3 rounded text-white placeholder:text-grim-muted/50 transition-all"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-3.5 text-grim-muted group-focus-within:text-grim-gold transition-colors" size={18} />
                            <input 
                                type="password" 
                                placeholder="Senha" 
                                className="w-full pl-10 bg-black/40 border-grim-border focus:border-grim-gold p-3 rounded text-white placeholder:text-grim-muted/50 transition-all"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-grim-danger text-xs bg-red-500/10 p-3 rounded border border-red-500/20">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}

                        <button disabled={loading} className="mt-4 w-full py-4 bg-gradient-to-r from-grim-gold/80 to-grim-gold text-black font-black uppercase tracking-widest rounded hover:shadow-glow transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? <Loader2 size={18} className="animate-spin" /> : (isLogin ? <Shield size={18} /> : <Sword size={18} />)}
                            {isLogin ? 'Acessar Grimório' : 'Criar Conta'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
