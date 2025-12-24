
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-6 bg-[#020617]/98 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-500">
      <div 
        className={`bg-[#010410] w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-[3rem] md:rounded-[5rem] shadow-[0_0_200px_-50px_rgba(0,0,0,1)] border border-white/10 ${isRtl ? 'rtl' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="relative p-8 md:p-24 overflow-hidden border-b border-white/5">
          <div className={`absolute top-0 right-0 w-[500px] md:w-[900px] h-[500px] md:h-[900px] blur-[200px] opacity-20 ${CATEGORY_COLORS[element.category]} rounded-full -translate-y-1/2 translate-x-1/2`}></div>
          
          <button 
            onClick={onClose}
            className={`absolute top-6 md:top-16 ${isRtl ? 'left-6 md:left-16' : 'right-6 md:right-16'} z-10 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center rounded-2xl md:rounded-[2rem] bg-white/5 hover:bg-white text-slate-400 hover:text-black transition-all active:scale-90 border border-white/10`}
          >
            <i className="fa-solid fa-xmark text-2xl md:text-3xl"></i>
          </button>

          <div className="flex flex-col lg:flex-row gap-10 md:gap-24 items-center relative z-10">
            {/* Visual Block */}
            <div className={`w-48 h-48 md:w-96 md:h-96 flex flex-col items-center justify-center rounded-[2.5rem] md:rounded-[5rem] ${CATEGORY_COLORS[element.category] || 'bg-slate-400'} text-white shadow-2xl ring-[8px] md:ring-[20px] ring-white/10 shrink-0`}>
              <span className="text-xl md:text-4xl font-black opacity-70 mb-2">{element.number}</span>
              <span className="text-7xl md:text-[11rem] font-black drop-shadow-2xl tracking-tighter leading-none">{element.symbol}</span>
              <span className="text-[10px] md:text-2xl font-black tracking-[0.4em] mt-4 md:mt-12 bg-black/20 px-5 md:px-12 py-2 md:py-4 rounded-full border border-white/20 uppercase">
                {element.weight}
              </span>
            </div>

            {/* Title & Stats */}
            <div className="flex-1 text-center lg:text-start">
              <h2 className="text-4xl md:text-[8.5rem] font-black text-white mb-6 md:mb-12 tracking-tighter leading-none uppercase">
                {element.name[lang]}
              </h2>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-8 mb-8 md:mb-16">
                <div className="px-5 md:px-10 py-2.5 md:py-5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] md:text-xl font-black uppercase tracking-widest border border-cyan-500/20">
                  {element.category}
                </div>
                <div className="px-5 md:px-10 py-2.5 md:py-5 rounded-full bg-white/5 text-slate-300 text-[10px] md:text-xl font-black uppercase tracking-widest border border-white/10">
                  {element.phase[lang]}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
                {[
                  { label: t.meltingPoint, val: element.meltingPoint },
                  { label: t.boilingPoint, val: element.boilingPoint },
                  { label: t.electronegativity, val: element.electronegativity },
                  { label: t.density, val: element.density }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/5 p-5 md:p-10 rounded-3xl md:rounded-[3.5rem] border border-white/5 text-center transition-all hover:bg-white/10">
                    <p className="text-[8px] md:text-xs text-slate-500 uppercase tracking-widest mb-1 md:mb-4 font-black">{stat.label}</p>
                    <p className="text-lg md:text-3xl font-black text-white">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Body */}
        <div className="p-8 md:p-24 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-32">
          <div className="lg:col-span-7 space-y-12 md:space-y-24">
            <section>
              <h3 className="text-[10px] md:text-sm font-black text-slate-600 uppercase tracking-[0.5em] mb-6 md:mb-12 flex items-center gap-4 md:gap-10">
                <span className="w-10 md:w-32 h-1.5 md:h-2 bg-cyan-500 rounded-full"></span>
                {t.description}
              </h3>
              <p className="text-slate-100 leading-tight text-2xl md:text-[3.2rem] font-black tracking-tighter opacity-90">
                {element.summary[lang]}
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-20">
              <section className="bg-white/5 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/10">
                <h3 className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-4 md:mb-8">{t.discoverer}</h3>
                <p className="text-white text-xl md:text-4xl font-black mb-4 md:mb-8 leading-tight">{element.discoverer[lang]}</p>
                <div className="flex items-center gap-3 text-cyan-400 font-black text-[10px] md:text-lg">
                   <i className="fa-solid fa-calendar-check text-xl md:text-3xl"></i>
                   <span className="uppercase tracking-widest">{t.year}: {element.year}</span>
                </div>
              </section>
              
              <section className="bg-red-500/5 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-red-500/20">
                <h3 className="text-[10px] md:text-xs font-black text-red-500 uppercase tracking-widest mb-4 md:mb-8">{t.danger}</h3>
                <div className="flex items-start gap-4 md:gap-8 text-red-400">
                  <i className="fa-solid fa-triangle-exclamation text-3xl md:text-6xl mt-1 md:mt-2"></i>
                  <p className="text-lg md:text-3xl font-black leading-tight uppercase tracking-tight">{element.danger[lang]}</p>
                </div>
              </section>
            </div>

            <section>
              <h3 className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-[0.8em] mb-6 md:mb-10">{t.electronConfig}</h3>
              <div className="bg-slate-950/80 text-cyan-400 p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] font-mono text-xl md:text-5xl font-black border border-white/5 shadow-inner flex items-center justify-between">
                <span className="tracking-tighter">{element.electronConfiguration}</span>
                <i className="fa-solid fa-microchip opacity-10 text-4xl md:text-[8rem]"></i>
              </div>
            </section>
          </div>

          {/* Atomic Model */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/5 rounded-[3rem] md:rounded-[5rem] p-10 md:p-20 border border-white/10">
             <h3 className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-[0.8em] mb-12 md:mb-24 text-center w-full">
                {t.shells}
              </h3>
              <div className="scale-[1.1] md:scale-[2.4]">
                <ElectronConfiguration shells={element.shells} symbol={element.symbol} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementCard;
