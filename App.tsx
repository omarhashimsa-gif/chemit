
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ElementCard from './components/ElementCard';
import EquationBalancer from './components/EquationBalancer';
import Forum from './components/Forum';
import Dashboard from './components/Dashboard';
import AuthView from './components/AuthView';
import CommentsSection from './components/CommentsSection';
import LabMode from './components/LabMode';
import { ELEMENTS, CATEGORY_COLORS, TRANSLATIONS } from './constants';
import { ElementData, Language, ViewState, User } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  // جعل "table" هو العرض الافتراضي تلبية لطلب المستخدم لرؤية الجدول فور فتح الموقع
  const [activeView, setActiveView] = useState<ViewState>('table');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lang, activeView]);

  const t = TRANSLATIONS[lang];

  // ترتيب العناصر للنسخة المحمولة (List View)
  const sortedElements = [...ELEMENTS].sort((a, b) => a.number - b.number);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <Navbar lang={lang} setLang={(l) => setLang(l)} t={t} user={user} onAuth={() => setShowAuth(true)} />

      <main className="flex-1 w-full max-w-[2000px] mx-auto relative px-4 md:px-16 py-8 md:py-12">
        
        <div className="animate-fade-up">
          {activeView === 'table' && (
            <div className="flex flex-col items-center">
              <header className="mb-12 md:mb-20 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 mb-6">
                   <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     {lang === 'ar' ? 'نظام استعراض العناصر' : 'ELEMENT EXPLORATION SYSTEM'}
                   </span>
                </div>
                <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 leading-none">
                   CHEMIST
                </h2>
              </header>

              {/* واجهة الكمبيوتر: جدول دوري كامل (Grid) */}
              <div className="hidden md:block w-full glass-blur rounded-[5rem] border-white/5 bg-white/[0.003] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)] p-12 lg:p-20 mb-32 relative">
                <div className="absolute inset-0 pointer-events-none opacity-10">
                   <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#22d3ee22_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
                </div>
                
                <div className="periodic-container relative z-10">
                    {Array.from({length: 18}).map((_, i) => (
                      <div key={i} className="text-center text-[10px] font-black text-slate-700 mb-4 select-none" style={{ gridColumn: i + 1, gridRow: 1 }}>
                        {(i + 1).toString().padStart(2, '0')}
                      </div>
                    ))}
                    {ELEMENTS.map((element) => (
                      <div
                        key={element.number}
                        onClick={() => setSelectedElement(element)}
                        style={{ gridColumn: element.xpos, gridRow: element.ypos + 1 }}
                        className={`element-cell ${CATEGORY_COLORS[element.category] || 'bg-slate-700'} group`}
                      >
                        <span className="absolute top-1 left-1.5 text-[8px] font-bold opacity-30 group-hover:opacity-100 group-hover:text-white transition-opacity">
                          {element.number}
                        </span>
                        <span className="text-xl lg:text-3xl font-black group-hover:scale-110 transition-transform">
                          {element.symbol}
                        </span>
                        <div className="absolute bottom-1 w-full px-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <p className="text-[6px] font-black uppercase truncate text-white leading-none">
                             {element.name[lang]}
                           </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* واجهة الهاتف: قوائم عمودية (List) */}
              <div className="md:hidden w-full max-w-lg space-y-3 mb-40 px-2">
                 <div className="flex items-center justify-between px-4 mb-8">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">قائمة العناصر</h3>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                       118 Element
                    </div>
                 </div>

                 {sortedElements.map((element) => (
                   <div 
                    key={element.number}
                    onClick={() => setSelectedElement(element)}
                    className="mobile-list-item glass-blur rounded-[2rem] p-5 flex items-center gap-6 border-white/5 bg-white/[0.01] active:bg-cyan-500/10 transition-all active:scale-[0.98]"
                   >
                     <div className={`w-14 h-14 rounded-2xl ${CATEGORY_COLORS[element.category]} flex flex-col items-center justify-center text-white shadow-xl shrink-0`}>
                        <span className="text-[7px] font-black opacity-60 mb-0.5">{element.number}</span>
                        <span className="text-xl font-black leading-none">{element.symbol}</span>
                     </div>
                     <div className="flex-1 min-w-0">
                        <h3 className="text-base font-black text-white uppercase truncate tracking-tight mb-0.5">{element.name[lang]}</h3>
                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest truncate">{element.category}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-black text-cyan-400 font-mono tracking-tighter">{element.weight}</p>
                        <i className="fa-solid fa-chevron-left text-[10px] text-slate-800 mt-2 rotate-180"></i>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeView === 'balancer' && <EquationBalancer lang={lang} t={t} />}
          {activeView === 'forum' && (
            <div className="space-y-24">
              <Forum lang={lang} t={t} />
              <div className="max-w-5xl mx-auto px-6 mb-32">
                 <CommentsSection lang={lang} t={t} user={user} />
              </div>
            </div>
          )}
          {activeView === 'dashboard' && <Dashboard lang={lang} t={t} setView={setActiveView} />}
          {activeView === 'lab' && <LabMode lang={lang} t={t} />}
        </div>

        {/* شريط التنقل السفلي */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[250] flex items-center gap-1.5 p-2 rounded-full glass-blur border border-white/10 bg-[#020617]/70 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] backdrop-blur-3xl transition-transform active:scale-95">
           <button 
             onClick={() => setActiveView('dashboard')}
             className={`px-5 py-3.5 rounded-full flex items-center gap-3 transition-all ${activeView === 'dashboard' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
           >
              <i className="fa-solid fa-house text-sm"></i>
              <span className={`text-[10px] font-black uppercase tracking-widest ${activeView === 'dashboard' ? 'block' : 'hidden md:block'}`}>Home</span>
           </button>
           <button 
             onClick={() => setActiveView('table')}
             className={`px-5 py-3.5 rounded-full flex items-center gap-3 transition-all ${activeView === 'table' ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
           >
              <i className="fa-solid fa-table-cells text-sm"></i>
              <span className={`text-[10px] font-black uppercase tracking-widest ${activeView === 'table' ? 'block' : 'hidden md:block'}`}>Library</span>
           </button>
           <button 
             onClick={() => setActiveView('lab')}
             className={`px-5 py-3.5 rounded-full flex items-center gap-3 transition-all ${activeView === 'lab' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
           >
              <i className="fa-solid fa-flask-vial text-sm"></i>
              <span className={`text-[10px] font-black uppercase tracking-widest ${activeView === 'lab' ? 'block' : 'hidden md:block'}`}>Lab</span>
           </button>
           <button 
             onClick={() => setActiveView('balancer')}
             className={`px-5 py-3.5 rounded-full flex items-center gap-3 transition-all ${activeView === 'balancer' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
           >
              <i className="fa-solid fa-calculator text-sm"></i>
              <span className={`text-[10px] font-black uppercase tracking-widest ${activeView === 'balancer' ? 'block' : 'hidden md:block'}`}>Calc</span>
           </button>
           <button 
             onClick={() => setActiveView('forum')}
             className={`px-5 py-3.5 rounded-full flex items-center gap-3 transition-all ${activeView === 'forum' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
           >
              <i className="fa-solid fa-users-viewfinder text-sm"></i>
              <span className={`text-[10px] font-black uppercase tracking-widest ${activeView === 'forum' ? 'block' : 'hidden md:block'}`}>Talk</span>
           </button>
        </div>

        <footer className="mt-32 pb-48 flex flex-col items-center">
           <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-12 opacity-10">
                 <div className="h-px w-32 bg-white"></div>
                 <h3 className="text-3xl font-black text-white uppercase tracking-[1em]">CHEMIST</h3>
                 <div className="h-px w-32 bg-white"></div>
              </div>
              <p className="text-[10px] text-slate-700 font-bold uppercase tracking-[0.5em] px-10 py-3 rounded-full border border-white/5">
                {lang === 'en' ? '© 2025 ALL SYSTEMS OPERATIONAL. v4.5.3' : '© ٢٠٢٥ جميع الأنظمة تعمل بكفاءة. الإصدار ٤.٥.٣'}
              </p>
           </div>
        </footer>
      </main>

      {showAuth && <AuthView lang={lang} t={t} onClose={() => setShowAuth(false)} onLogin={setUser} />}
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
