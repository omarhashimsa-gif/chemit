
import React from 'react';
import { Language, Translation, User } from '../types';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translation;
  user: User | null;
  onAuth: () => void;
}

const Navbar: React.FC<Props> = ({ lang, setLang, t, user, onAuth }) => {
  return (
    <nav className="sticky top-0 z-[150] w-full bg-[#020617]/90 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 py-6">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
             <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase select-none group cursor-pointer">
               CHEMIST<span className="text-cyan-500">.</span>
             </h1>
             <div className="absolute -top-1 -right-4 w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
          </div>
          <div className="hidden md:block h-4 w-px bg-white/10"></div>
          <p className="hidden md:block text-[9px] text-slate-600 font-black tracking-[0.4em] uppercase">
            {lang === 'ar' ? 'نظام البحث العلمي الرقمي' : 'RESEARCH OPERATING SYSTEM'}
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02]">
             <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Global Link Active</span>
             </div>
          </div>

          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="w-10 h-10 md:w-auto md:px-6 md:py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white text-white hover:text-black transition-all font-black text-[10px] uppercase flex items-center justify-center"
          >
            <span className="hidden md:inline">{lang === 'en' ? 'العربية' : 'English'}</span>
            <span className="md:hidden">{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>

          {user?.isLoggedIn ? (
            <div className="flex items-center gap-4 bg-cyan-500 text-black px-4 py-2 rounded-2xl border border-white/10 shadow-lg shadow-cyan-500/20">
               <div className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center text-black font-black text-[10px]">
                  {user.username.charAt(0).toUpperCase()}
               </div>
               <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">{user.username}</span>
            </div>
          ) : (
            <button
              onClick={onAuth}
              className="px-6 py-2.5 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-500/10"
            >
              {t.login}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
