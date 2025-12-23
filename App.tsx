
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
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 bg-[#020617] text-white overflow-x-hidden">
      {/* Navigation - Visible on Tablet and Desktop */}
      <div className="hidden md:block">
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          t={t} 
        />
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 pb-48 md:pb-32 pt-10 md:pt-16">
        <header className="mb-10 md:mb-16 text-center">
          <div className="flex justify-center mb-5 md:mb-8">
            <RakizLogo size="w-20 h-20 md:w-48 md:h-48" />
          </div>
          <h2 className="text-3xl md:text-7xl font-black mb-3 md:mb-5 tracking-tighter transition-all uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
             {lang === 'en' ? 'CHEMIST' : 'الكيميائي'}
          </h2>
          <div className="flex items-center justify-center gap-3 md:gap-6">
            <span className="h-0.5 w-8 md:w-16 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"></span>
            <p className="text-cyan-400 font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-[8px] md:text-lg">
              {lang === 'en' ? 'SCIENTIFIC SYSTEM' : 'نظام كيميائي متكامل'}
            </p>
            <span className="h-0.5 w-8 md:w-16 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"></span>
          </div>
        </header>

        {/* --- PERIODIC TABLE (TABLET & DESKTOP: md and above) --- */}
        <div className="hidden md:block relative w-full mb-16 md:mb-24 overflow-x-auto no-scrollbar">
          <div className="min-w-[850px] lg:min-w-0">
            <div className="periodic-container glass-card rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white/10">
              {ELEMENTS.map((element) => (
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
                    shadow-sm
                  `}
                >
                  <span className="number-badge absolute top-1 left-1.5 md:top-1.5 md:left-2 text-[7px] md:text-[10px] lg:text-[11px] font-black opacity-70 tracking-tighter">
                    {element.number}
                  </span>
                  <span className="text-base md:text-2xl lg:text-3xl font-black drop-shadow-lg tracking-tight leading-none mt-0.5 md:mt-1">
                    {element.symbol}
                  </span>
                  <span className="hidden xl:block text-[7px] font-black truncate max-w-[90%] opacity-60 mt-1 uppercase tracking-tighter text-center">
                    {element.name[lang]}
                  </span>
                </div>
              ))}

              {/* Grid Legend Numbers */}
              {[...Array(18)].map((_, i) => (
                 <div key={i} style={{ gridColumn: i + 1, gridRow: 1 }} className="flex justify-center -mt-6 text-[10px] md:text-[11px] font-black text-slate-700 opacity-40">
                    {i + 1}
                 </div>
              ))}
              {[...Array(7)].map((_, i) => (
                 <div key={i} style={{ gridColumn: 1, gridRow: i + 1 }} className={`absolute -${lang === 'ar' ? 'right' : 'left'}-6 flex items-center h-full text-[10px] md:text-[11px] font-black text-slate-700 opacity-40`}>
                    {i + 1}
                 </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend - Visible on all devices */}
        <div className="glass-card rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-10 mb-12 md:mb-20 border border-white/10 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
            {Object.keys(CATEGORY_COLORS).map(cat => (
              <div key={cat} className="flex items-center gap-1.5 md:gap-3 px-2 md:px-4 py-1.5 md:py-3 bg-white/5 rounded-[0.75rem] md:rounded-[1.2rem] border border-white/5 transition-all hover:bg-white/10">
                 <span className={`w-1.5 h-1.5 md:w-4 md:h-4 rounded-full ${CATEGORY_COLORS[cat]} shadow-md ring-1 ring-white/10`}></span>
                 <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tight leading-tight truncate">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: List Card Interface (Phone only: below md) */}
        <div className="md:hidden space-y-2.5 px-0.5 max-w-lg mx-auto">
          {ELEMENTS.map((element) => (
            <div 
              key={element.number}
              onClick={() => setSelectedElement(element)}
              className="mobile-element-card flex items-center p-2.5 rounded-[1.2rem] gap-2.5"
            >
              <div className={`w-12 h-12 flex flex-col items-center justify-center rounded-[0.85rem] ${CATEGORY_COLORS[element.category]} text-white shadow-lg ring-1 ring-white/10 shrink-0`}>
                <span className="text-[7px] font-black opacity-80 leading-none mb-0.5">{element.number}</span>
                <span className="text-lg font-black leading-none drop-shadow-md">{element.symbol}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-white uppercase truncate leading-tight">
                  {element.name[lang]}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                   <div className={`w-1.5 h-1.5 rounded-full ${CATEGORY_COLORS[element.category]}`}></div>
                   <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest truncate">
                     {element.category}
                   </p>
                </div>
              </div>
              <div className="text-right shrink-0 bg-white/5 px-2.5 py-1 rounded-[0.65rem] border border-white/5">
                <p className="text-[6px] font-black text-cyan-500 uppercase mb-0.5">Mass</p>
                <p className="text-[10px] font-black text-white font-mono">{element.weight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <footer className="mt-20 md:mt-24 pb-40 flex flex-col items-center gap-6 md:gap-8 px-4">
           <RakizLogo size="w-16 h-16 md:w-28 md:h-28" />
           <div className="text-center w-full">
              <h1 className="text-xl md:text-4xl font-black tracking-tighter uppercase mb-1 text-white">RAKIZ STUDIO / ركز</h1>
              <p className="text-[8px] md:text-lg font-black text-cyan-400 uppercase tracking-[0.2em] md:tracking-[0.5em] mb-6">PRECISION SCIENTIFIC ENGINEERING</p>
              <div className="max-w-xl h-0.5 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full mx-auto mb-6"></div>
              <p className="text-[6px] md:text-[10px] text-slate-700 font-bold uppercase tracking-[0.3em]">
                © {new Date().getFullYear()} ENGINEERED BY RAKIZ
              </p>
           </div>
        </footer>
      </main>

      {/* Floating Bottom Navigation (Visible on Phone only) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[85%] max-w-[320px]">
        <div className="glass-card rounded-[2rem] p-2 shadow-2xl border border-white/20 flex items-center justify-between overflow-hidden">
          <button 
             onClick={toggleLang}
             className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-950 transition-all active:scale-90 shadow-md border border-cyan-500/30"
          >
            <span className="text-[9px] font-black tracking-tight">{lang === 'ar' ? 'EN' : 'AR'}</span>
          </button>
          
          <div className="flex-1 flex justify-center">
            <RakizLogo size="w-10 h-10" />
          </div>

          <div className="w-10 h-10 opacity-0 pointer-events-none"></div>
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
