
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language, Translation } from '../types';
import Beaker3D from './Beaker3D';

interface Props {
  lang: Language;
  t: Translation;
}

const LabMode: React.FC<Props> = ({ lang, t }) => {
  const [reactant1, setReactant1] = useState('');
  const [reactant2, setReactant2] = useState('');
  const [isReacting, setIsReacting] = useState(false);
  const [beakerColor, setBeakerColor] = useState('#22d3ee'); // Cyan
  const [reactionResult, setReactionResult] = useState<{ equation: string; outcome: string; color: string } | null>(null);

  const performReaction = async () => {
    if (!reactant1.trim() || !reactant2.trim()) return;
    
    setIsReacting(true);
    setReactionResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Simulate a chemical reaction between "${reactant1}" and "${reactant2}". 
      Return only a JSON object with: 
      "equation" (balanced chemical equation), 
      "outcome" (detailed explanation of the visual and chemical result in ${lang === 'ar' ? 'Arabic' : 'English'}), 
      "color" (hex code representing the visual color of the product/solution). 
      If no reaction occurs, specify that. Do not include markdown code blocks.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const data = JSON.parse(response.text.replace(/```json|```/g, '').trim());
      
      // Delay to show animation
      setTimeout(() => {
        setReactionResult(data);
        setBeakerColor(data.color || '#22d3ee');
        setIsReacting(false);
      }, 3000);

    } catch (error) {
      console.error("Reaction failed:", error);
      setIsReacting(false);
      alert("Error simulating reaction.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 animate-fade-up">
      <header className="mb-16 flex flex-col items-center">
         <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">{t.labMode}</h2>
         <div className="px-6 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.5em]">
           Virtual Lab Environment v1.0
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Input Panel */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass-blur p-10 rounded-[3rem] border-white/10 space-y-8">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">{t.selectChemicals}</h3>
              
              <div className="space-y-4">
                 <input 
                   type="text" 
                   value={reactant1}
                   onChange={(e) => setReactant1(e.target.value)}
                   placeholder={lang === 'ar' ? 'المادة الأولى (مثلاً: Sodium)' : 'Reactant 1 (e.g., Sodium)'}
                   className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 text-white placeholder:text-slate-800 focus:outline-none focus:border-emerald-500/30 transition-all"
                 />
                 <div className="flex justify-center text-slate-800"><i className="fa-solid fa-plus text-2xl"></i></div>
                 <input 
                   type="text" 
                   value={reactant2}
                   onChange={(e) => setReactant2(e.target.value)}
                   placeholder={lang === 'ar' ? 'المادة الثانية (مثلاً: Water)' : 'Reactant 2 (e.g., Water)'}
                   className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-5 text-white placeholder:text-slate-800 focus:outline-none focus:border-emerald-500/30 transition-all"
                 />
              </div>

              <button 
                onClick={performReaction}
                disabled={isReacting}
                className="w-full py-5 bg-emerald-500 text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
              >
                {isReacting ? <i className="fa-solid fa-flask fa-spin"></i> : t.performReaction}
              </button>
           </div>
        </div>

        {/* Center: 3D Visualization */}
        <div className="lg:col-span-4 flex justify-center py-20">
           <Beaker3D isReacting={isReacting} color={beakerColor} />
        </div>

        {/* Right: Observation Panel */}
        <div className="lg:col-span-4 h-full">
           <div className="glass-blur h-full p-10 rounded-[3rem] border-white/10 flex flex-col">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-10">{t.observation}</h3>
              
              {reactionResult ? (
                <div className="space-y-10 animate-fade-up">
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-4">Chemical Equation</p>
                      <p className="text-2xl font-black font-mono text-white leading-tight">{reactionResult.equation}</p>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Scientific Logs</p>
                      <p className="text-lg text-slate-400 font-semibold leading-relaxed italic border-l-2 border-emerald-500 pl-4">
                         "{reactionResult.outcome}"
                      </p>
                   </div>
                </div>
              ) : isReacting ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center space-y-6 opacity-40">
                   <div className="w-16 h-1 bg-emerald-500/20 rounded-full animate-pulse"></div>
                   <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Processing Molecular Bonds...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-center space-y-6">
                   <i className="fa-solid fa-vial-circle-check text-5xl text-slate-800"></i>
                   <p className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-loose">
                      {lang === 'ar' ? 'انتظار دمج المكونات لبدء المحاكاة' : 'Awaiting molecular integration to start simulation'}
                   </p>
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default LabMode;
