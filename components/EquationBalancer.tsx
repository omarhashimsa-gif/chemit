
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language, Translation } from '../types';

interface Props {
  lang: Language;
  t: Translation;
}

const EquationBalancer: React.FC<Props> = ({ lang, t }) => {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState<{ balanced?: string; explanation?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const balanceEquation = async () => {
    if (!equation.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Balance this chemical equation: "${equation}". 
      Return only a JSON object with two fields: "balanced" (the full balanced equation string) and "explanation" (a brief 1-sentence explanation of the law of conservation of mass in ${lang === 'ar' ? 'Arabic' : 'English'}). 
      Do not include markdown or code blocks.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const text = response.text || '';
      const data = JSON.parse(text.replace(/```json|```/g, '').trim());
      setResult(data);
    } catch (error) {
      console.error("Error balancing:", error);
      setResult({ balanced: "Error", explanation: lang === 'ar' ? "حدث خطأ في معالجة المعادلة." : "Failed to balance equation." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 animate-fade-up">
      <div className="glass-blur rounded-[3rem] p-8 md:p-16 border-white/10 bg-white/[0.005] shadow-2xl">
        <div className="flex items-center gap-6 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <i className="fa-solid fa-flask-vial text-3xl text-cyan-400"></i>
           </div>
           <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t.balancer}</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-1">Chemical Logic Module v2.0</p>
           </div>
        </div>

        <div className="space-y-8">
           <div className="relative">
              <input 
                type="text" 
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder={t.placeholderEquation}
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-6 text-xl md:text-2xl font-mono text-cyan-400 placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner"
              />
           </div>

           <button 
             onClick={balanceEquation}
             disabled={loading}
             className="w-full py-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg disabled:opacity-50"
           >
             {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : t.balanceBtn}
           </button>

           {result && (
             <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Balanced Output</p>
                   <p className="text-2xl md:text-4xl font-black text-white font-mono tracking-tight">{result.balanced}</p>
                </div>
                <div className="p-8 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                   <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest mb-4">Scientific Insight</p>
                   <p className="text-lg text-slate-300 font-semibold leading-relaxed">{result.explanation}</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default EquationBalancer;
