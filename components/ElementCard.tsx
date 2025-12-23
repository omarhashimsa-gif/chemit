
import React from 'react';
import { ElementData, Language, Translation } from '../types';
import { CATEGORY_COLORS } from '../constants';
import ElectronConfiguration from './ElectronConfiguration';

interface Props {
  element: ElementData;
  onClose: () => void;
  lang: Language;
  t: Translation;
}

const ElementCard: React.FC<Props> = ({ element, onClose, lang, t }) => {
  const isRtl = lang === 'ar';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-4 bg-slate-950/95 backdrop-blur-3xl animate-in zoom-in-95 duration-300">
      <div 
        className={`bg-[#010410] w-full max-w-7xl max-h-[96vh] overflow-y-auto rounded-[3rem] md:rounded-[5rem] shadow-[0_50px_200px_-25px_rgba(0,0,0,1)] border border-white/10 ${isRtl ? 'rtl' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="relative p-8 md:p-24 overflow-hidden border-b border-white/5">
          <div className={`absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] blur-[160px] opacity-20 ${CATEGORY_COLORS[element.category]} rounded-full -translate-y-1/2 translate-x-1/2`}></div>
          
          <button 
            onClick={onClose}
            className={`absolute top-6 md:top-16 ${isRtl ? 'left-6 md:left-16' : 'right-6 md:right-16'} z-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-[1rem] md:rounded-[1.5rem] bg-white/5 hover:bg-white/10 transition-all text-slate-400 active:scale-90`}
          >
            <i className="fa-solid fa-xmark text-2xl md:text-3xl"></i>
          </button>

          <div className="flex flex-col lg:flex-row gap-10 md:gap-20 items-center relative z-10">
            {/* Visual Block */}
            <div className={`w-48 h-48 md:w-80 md:h-80 flex flex-col items-center justify-center rounded-[2.5rem] md:rounded-[4rem] ${CATEGORY_COLORS[element.category] || 'bg-slate-400'} text-white shadow-2xl ring-8 md:ring-[16px] ring-white/10 shrink-0`}>
              <span className="text-lg md:text-3xl font-black opacity-80 mb-1 md:mb-2">{element.number}</span>
              <span className="text-7xl md:text-[10rem] font-black drop-shadow-2xl tracking-tighter leading-none">{element.symbol}</span>
              <span className="text-xs md:text-xl font-black tracking-[0.3em] mt-4 md:mt-8 bg-white/20 px-4 md:px-8 py-1 md:py-2 rounded-full border border-white/20">{element.weight}</span>
            </div>

            {/* Title & Stats */}
            <div className="flex-1 text-center lg:text-start">
              <h2 className="text-4xl md:text-7xl lg:text-[8rem] font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight uppercase">
                {element.name[lang]}
              </h2>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-6 mb-8 md:mb-12">
                <div className="px-5 md:px-8 py-2 md:py-3 rounded-full bg-cyan-500/10 text-cyan-400 text-xs md:text-base font-black uppercase tracking-widest border border-cyan-500/30">
                  {element.category}
                </div>
                <div className="px-5 md:px-8 py-2 md:py-3 rounded-full bg-white/5 text-slate-300 text-xs md:text-base font-black uppercase tracking-widest border border-white/10">
                  {element.phase[lang]}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {[
                  { label: t.meltingPoint, val: element.meltingPoint },
                  { label: t.boilingPoint, val: element.boilingPoint },
                  { label: t.electronegativity, val: element.electronegativity },
                  { label: t.density, val: element.density }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/5 p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] border border-white/10 text-center transition-all hover:bg-white/10">
                    <p className="text-[9px] md:text-xs text-slate-500 uppercase tracking-widest mb-1 md:mb-3 font-black">{stat.label}</p>
                    <p className="text-lg md:text-3xl font-black text-white">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Body */}
        <div className="p-8 md:p-24 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          <div className="lg:col-span-7 space-y-12 md:space-y-20">
            <section>
              <h3 className="text-xs md:text-sm font-black text-slate-600 uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-10 flex items-center gap-4 md:gap-8">
                <span className="w-10 md:w-20 h-1.5 md:h-2 bg-cyan-500 rounded-full"></span>
                {t.description}
              </h3>
              <p className="text-slate-100 leading-relaxed text-2xl md:text-[2.75rem] font-black italic tracking-tight">
                "{element.summary[lang]}"
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-16">
              <section className="bg-white/5 p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] border border-white/10">
                <h3 className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-4 md:mb-6">{t.discoverer}</h3>
                <p className="text-white text-xl md:text-3xl font-black mb-4 md:mb-6">{element.discoverer[lang]}</p>
                <div className="flex items-center gap-3 text-cyan-400 font-black text-xs md:text-base">
                   <i className="fa-solid fa-history text-lg md:text-2xl"></i>
                   <span className="uppercase tracking-[0.2em]">{t.year}: {element.year}</span>
                </div>
              </section>
              
              <section className="bg-red-500/5 p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] border border-red-500/20">
                <h3 className="text-[10px] md:text-xs font-black text-red-500 uppercase tracking-widest mb-4 md:mb-6">{t.danger}</h3>
                <div className="flex items-start gap-4 md:gap-6 text-red-400">
                  <i className="fa-solid fa-radiation text-3xl md:text-5xl mt-1 md:mt-2"></i>
                  <p className="text-lg md:text-3xl font-black leading-tight uppercase">{element.danger[lang]}</p>
                </div>
              </section>
            </div>

            <section>
              <h3 className="text-[10px] md:text-sm font-black text-slate-600 uppercase tracking-[0.6em] mb-6 md:mb-8">{t.electronConfig}</h3>
              <div className="bg-slate-950 text-cyan-400 p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] font-mono text-xl md:text-4xl font-black border border-white/10 shadow-2xl flex items-center justify-between group overflow-hidden">
                <span className="group-hover:translate-x-4 transition-transform duration-700">{element.electronConfiguration}</span>
                <i className="fa-solid fa-atom animate-spin-slow opacity-20 text-5xl md:text-8xl"></i>
              </div>
            </section>
          </div>

          {/* Atomic Model */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/5 rounded-[3rem] md:rounded-[5rem] p-10 md:p-16 border border-white/10 shadow-inner group">
             <h3 className="text-xs md:text-sm font-black text-slate-600 uppercase tracking-[0.6em] mb-12 md:mb-20 text-center w-full">
                {t.shells}
              </h3>
              <div className="scale-[1.2] md:scale-[2.2] transition-transform duration-1000 group-hover:scale-[2.4]">
                <ElectronConfiguration shells={element.shells} symbol={element.symbol} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementCard;
