
import React, { useState } from 'react';
import { Language, Translation, User } from '../types';

interface Props {
  lang: Language;
  t: Translation;
  onLogin: (user: User) => void;
  onClose: () => void;
}

const AuthView: React.FC<Props> = ({ lang, t, onLogin, onClose }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin({ username, isLoggedIn: true });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-2xl">
      <div className="glass-blur w-full max-w-md rounded-[3rem] p-10 md:p-16 border-white/10 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center border border-cyan-500/20 mx-auto mb-6">
            <i className="fa-solid fa-user-shield text-3xl text-cyan-400"></i>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t.login}</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Access Specialist Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-5 text-white placeholder:text-slate-800 focus:outline-none focus:border-cyan-500/50 transition-all"
              placeholder="e.g. Chemist_Master"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-cyan-500 transition-all active:scale-[0.98]"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthView;
