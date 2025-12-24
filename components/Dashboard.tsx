
import React from 'react';
import { Language, Translation, ViewState } from '../types';

interface Props {
  lang: Language;
  t: Translation;
  setView: (v: ViewState) => void;
}

const Dashboard: React.FC<Props> = ({ lang, t, setView }) => {
  const cards = [
    { id: 'tab', icon: 'fa-table-cells', title: 'Library', desc: 'Atomic Repository', view: 'table', color: 'bg-red-500' },
    { id: 'lab', icon: 'fa-flask', title: 'Simulation', desc: '3D Lab Environment', view: 'lab', color: 'bg-emerald-500' },
    { id: 'bal', icon: 'fa-calculator', title: 'Balancer', desc: 'Neural Equation Solver', view: 'balancer', color: 'bg-cyan-500' },
    { id: 'for', icon: 'fa-users-viewfinder', title: 'Community', desc: 'Global Forum Feed', view: 'forum', color: 'bg-purple-500' },
  ];

  const stats = [
    { label: 'Active Users', value: '1,284', icon: 'fa-user-group', color: 'text-cyan-400' },
    { label: 'Calculations/min', value: '45.2k', icon: 'fa-bolt-lightning', color: 'text-yellow-400' },
    { label: 'Node Status', value: 'Production', icon: 'fa-server', color: 'text-emerald-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 animate-fade-up">
      {/* Production Header */}
      <header className="mb-20 flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
               <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Live Production Environment</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-2 leading-none">CHEMIST PRO</h2>
            <p className="text-xs text-slate-600 font-black uppercase tracking-[0.6em] px-1">System Version 4.5.0-Release</p>
         </div>

         <div className="flex gap-4">
            <button className="px-8 py-4 glass-blur border-white/10 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all group">
               <i className="fa-solid fa-share-nodes text-slate-500 group-hover:text-cyan-400"></i>
               <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'ar' ? 'مشاركة الرابط' : 'Share Link'}</span>
            </button>
            <button className="px-8 py-4 bg-white text-black rounded-2xl flex items-center gap-4 hover:scale-105 transition-all">
               <i className="fa-solid fa-cloud-arrow-up text-lg"></i>
               <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'ar' ? 'تصدير البيانات' : 'Export Data'}</span>
            </button>
         </div>
      </header>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {stats.map((s, idx) => (
           <div key={idx} className="glass-blur p-8 rounded-[2.5rem] border-white/5 bg-white/[0.002] flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">{s.label}</p>
                 <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                 <i className={`fa-solid ${s.icon} ${s.color} text-xl opacity-60`}></i>
              </div>
           </div>
         ))}
      </div>

      {/* Grid Dashboard Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div 
            key={card.id}
            onClick={() => setView(card.view as ViewState)}
            className="group glass-blur p-10 rounded-[3.5rem] border-white/5 bg-white/[0.005] hover:bg-white/[0.02] transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center aspect-square"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-10 ${card.color}`}></div>
            
            <div className={`w-24 h-24 rounded-[2.5rem] ${card.color} text-white flex items-center justify-center shadow-2xl mb-10 group-hover:scale-110 transition-transform duration-700`}>
              <i className={`fa-solid ${card.icon} text-4xl`}></i>
            </div>
            
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{card.title}</h3>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-10">{card.desc}</p>

            <div className="mt-2 flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
               <span className="text-[8px] font-black text-cyan-400 uppercase tracking-[0.2em]">Launch Module</span>
            </div>
          </div>
        ))}
      </div>

      {/* Network Pulse Visualization (Published Vibe) */}
      <div className="mt-24 glass-blur p-12 rounded-[4rem] border-white/5 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 opacity-40"></div>
         <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md text-center md:text-start">
               <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Scientific Network Pulse</h4>
               <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  Your laboratory nodes are distributed across global research clusters. All data processing is end-to-end encrypted and verified by the Chemist Core.
               </p>
            </div>
            <div className="flex items-center gap-1">
               {[...Array(20)].map((_, i) => (
                 <div 
                   key={i} 
                   className="w-2 bg-cyan-500/20 rounded-full animate-pulse-soft"
                   style={{ height: `${Math.random() * 60 + 20}px`, animationDelay: `${i * 0.1}s` }}
                 ></div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
