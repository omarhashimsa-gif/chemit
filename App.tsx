
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ElementCard from './components/ElementCard';
import RakizLogo from './components/RakizLogo';
import { ELEMENTS, CATEGORY_COLORS, TRANSLATIONS } from './constants';
import { ElementData, Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 bg-[#030712] text-white overflow-x-hidden">
      {/* نافبار للكمبيوتر والتابلت */}
      <div className="hidden md:block">
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          t={t} 
        />
      </div>

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 pb-48 md:pb-32 pt-8 md:pt-10">
        <header className="mb-6 md:mb-10 text-center">
          <div className="flex justify-center mb-4 md:mb-6">
            <RakizLogo size="w-16 h-16 md:w-36 md:h-36" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-1 md:mb-3 tracking-tighter transition-all uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
             {lang === 'en' ? 'CHEMIST' : 'الكيميائي'}
          </h2>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <span className="h-px w-6 md:w-16 bg-cyan-500 rounded-full opacity-30"></span>
            <p className="text-cyan-400 font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-[7px] md:text-sm">
              {lang === 'en' ? 'SCIENTIFIC SYSTEM' : 'نظام كيميائي متكامل'}
            </p>
            <span className="h-px w-6 md:w-16 bg-cyan-500 rounded-full opacity-30"></span>
          </div>
        </header>

        {/* --- نظام الجدول الدوري (الكمبيوتر والتابلت: md وأعلى) --- */}
        <div className="hidden md:block relative w-full mb-10 md:mb-16 overflow-x-auto no-scrollbar">
          <div className="min-w-[850px] lg:min-w-0">
            <div className="periodic-container glass-card rounded-[1.2rem] md:rounded-[2rem] shadow-2xl border border-white/5">
              {ELEMENTS && ELEMENTS.map((element) => (
                <div
                  key={element.number}
                  onClick={() => setSelectedElement(element)}
                  style={{ 
                    gridColumn: element.xpos, 
                    gridRow: element.ypos
                  }}
                  className={`
                    element-cell text-white
                    ${CATEGORY_COLORS[element.category] || 'bg-slate-500'}
                    shadow-sm ring-1 ring-white/5
                  `}
                >
                  <span className="number-badge absolute top-0.5 left-1 md:top-1 md:left-1.5 text-[6px] md:text-[8px] lg:text-[10px] font-black opacity-60 tracking-tighter">
                    {element.number}
                  </span>
                  <span className="text-xs md:text-xl lg:text-2xl font-black drop-shadow-md tracking-tight leading-none">
                    {element.symbol}
                  </span>
                  <span className="hidden xl:block text-[5px] lg:text-[7px] font-black truncate max-w-[85%] opacity-40 mt-1 uppercase tracking-tighter text-center">
                    {element.name[lang]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* دليل التصنيفات */}
        <div className="glass-card rounded-[1rem] md:rounded-[1.5rem] p-3 md:p-6 mb-8 md:mb-12 border border-white/5 shadow-lg max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {Object.keys(CATEGORY_COLORS).map(cat => (
              <div key={cat} className="flex items-center gap-1.5 px-2 py-1 md:py-1.5 bg-white/5 rounded-[0.5rem] border border-white/5">
                 <span className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full ${CATEGORY_COLORS[cat]} shadow-sm`}></span>
                 <span className="text-[6px] md:text-[9px] font-black uppercase truncate">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* واجهة الهاتف (نظام القائمة) */}
        <div className="md:hidden space-y-2 px-1 max-w-md mx-auto">
          {ELEMENTS && ELEMENTS.map((element) => (
            <div 
              key={element.number}
              onClick={() => setSelectedElement(element)}
              className="mobile-element-card flex items-center p-2 rounded-[0.85rem] gap-3 active:scale-[0.98] transition-transform"
            >
              <div className={`w-10 h-10 flex flex-col items-center justify-center rounded-[0.5rem] ${CATEGORY_COLORS[element.category]} text-white shadow shrink-0`}>
                <span className="text-[6px] font-black opacity-70 leading-none">{element.number}</span>
                <span className="text-sm font-black leading-none">{element.symbol}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[11px] font-black text-white uppercase truncate">{element.name[lang]}</h3>
                <p className="text-[7px] font-black text-slate-500 uppercase truncate mt-0.5">{element.category}</p>
              </div>
              <div className="text-right shrink-0 bg-white/5 px-2 py-1 rounded-[0.4rem] border border-white/5">
                <p className="text-[5px] font-black text-cyan-500 uppercase">Weight</p>
                <p className="text-[9px] font-black text-white font-mono">{element.weight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* الفوتر */}
        <footer className="mt-12 md:mt-20 pb-20 flex flex-col items-center gap-4 px-4 opacity-50">
           <RakizLogo size="w-10 h-10 md:w-16 md:h-16" />
           <div className="text-center w-full">
              <h1 className="text-sm md:text-xl font-black tracking-tighter uppercase mb-0.5 text-white">RAKIZ STUDIO / ركز</h1>
              <p className="text-[6px] md:text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
                © {new Date().getFullYear()} ENGINEERED FOR PRECISION
              </p>
           </div>
        </footer>
      </main>

      {/* التحكم العائم للهاتف */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[75%] max-w-[240px]">
        <div className="glass-card rounded-[1.2rem] p-1.5 shadow-2xl border border-white/10 flex items-center justify-between">
          <button 
             onClick={toggleLang}
             className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-950 transition-all active:scale-90 font-black text-[8px]"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <div className="flex-1 flex justify-center">
            <RakizLogo size="w-7 h-7" />
          </div>
          <div className="w-8 h-8 opacity-0"></div>
        </div>
      </div>

      {selectedElement && (
        <ElementCard 
          element={selectedElement} 
          onClose={() => setSelectedElement(null)} 
          lang={lang}
          t={t}
        />
      )}
    </div>
  );
};

export default App;
