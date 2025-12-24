
import React from 'react';
import { Language, Translation } from '../types';

interface Props {
  lang: Language;
  t: Translation;
}

const Forum: React.FC<Props> = ({ lang, t }) => {
  const posts = [
    {
      id: 1,
      author: "Rakiz Admin",
      title: lang === 'ar' ? "تحدي كيمياء الكم: استقرار العناصر فوق الثقيلة" : "Quantum Chemistry Challenge: Superheavy Stability",
      time: "2h ago",
      tags: ["Advanced", "Research"],
      comments: 14
    },
    {
      id: 2,
      author: "ChemExpert",
      title: lang === 'ar' ? "مستقبل البطاريات: الليثيوم مقابل الجرافين" : "Future of Batteries: Lithium vs Graphene",
      time: "5h ago",
      tags: ["Tech", "Energy"],
      comments: 38
    },
    {
      id: 3,
      author: "LabMaster",
      title: lang === 'ar' ? "كيفية تنظيف أنابيب الاختبار بفعالية في تجارب الترسيب" : "Effective Test Tube Cleaning in Precipitation Trials",
      time: "1d ago",
      tags: ["Lab", "Safety"],
      comments: 7
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 animate-fade-up">
      <div className="mb-16 flex flex-col items-center md:items-start">
         <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">{t.forum}</h2>
         <div className="px-6 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em]">
           {t.rakizForum} Founder Edition
         </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-6 mb-8 text-[11px] font-black text-slate-600 uppercase tracking-widest">
           <span>{t.community}</span>
           <span>Trending Now</span>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="blade-item glass-blur rounded-[2.5rem] p-8 border-white/5 bg-white/[0.005] hover:bg-white/[0.02] transition-all group cursor-pointer">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-cyan-500 uppercase">{post.author}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{post.time}</span>
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight leading-tight">
                     {post.title}
                   </h3>
                   <div className="flex items-center gap-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-black px-3 py-1 rounded-full bg-white/5 border border-white/5 text-slate-400 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>
                <div className="flex items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/5 shrink-0">
                   <div className="text-center px-4 border-r border-white/10">
                      <p className="text-lg font-black text-white">{post.comments}</p>
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">Talks</p>
                   </div>
                   <i className="fa-solid fa-chevron-right text-slate-700 group-hover:text-white transition-colors"></i>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-12 rounded-[3.5rem] bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 text-center">
         <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Start a New Thread</h4>
         <p className="text-slate-500 font-semibold mb-8">Join the Rakiz community of chemical engineers and researchers.</p>
         <button className="px-10 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
            Open Dashboard
         </button>
      </div>
    </div>
  );
};

export default Forum;
