
import React from 'react';
import { Language, Translation } from '../types';
import RakizLogo from './RakizLogo';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translation;
}

const Navbar: React.FC<Props> = ({ lang, setLang, t }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#020617]/90 backdrop-blur-2xl border-b border-white/5 px-6 lg:px-16 py-6">
      <div className="max-w-[2400px] mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <RakizLogo size="w-14 h-14" />
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter leading-none uppercase">
              {t.title}
            </h1>
            <p className="text-xs text-cyan-500 font-black tracking-[0.4em] uppercase mt-1">
              By Rakiz Studio
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-8 py-3 rounded-full bg-white text-slate-950 hover:bg-cyan-400 transition-all font-black text-sm uppercase shadow-xl active:scale-95"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
