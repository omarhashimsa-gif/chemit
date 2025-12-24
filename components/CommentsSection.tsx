
import React, { useState } from 'react';
import { Language, Translation, Comment, User } from '../types';

interface Props {
  lang: Language;
  t: Translation;
  user: User | null;
}

const CommentsSection: React.FC<Props> = ({ lang, t, user }) => {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', user: 'Dr. Ziad', text: lang === 'ar' ? 'تصميم مذهل، يسهل علينا الكثير في المختبر.' : 'Amazing design, helps us a lot in the lab.', date: 'Today', reaction: '🔥' },
    { id: '2', user: 'Sarah_Chem', text: lang === 'ar' ? 'هل يمكن إضافة خواص نظائر اليورانيوم مستقبلاً؟' : 'Can we add Uranium isotopes properties later?', date: 'Yesterday', reaction: '⚗️' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!user?.isLoggedIn) return alert(lang === 'ar' ? 'يرجى تسجيل الدخول أولاً' : 'Please sign in first');
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: user.username,
      text: newComment,
      date: 'Just now',
      reaction: '⚡'
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
          <i className="fa-solid fa-comments text-cyan-400"></i>
          {t.comments}
        </h4>
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{comments.length} Reactions</span>
      </div>

      <div className="space-y-6">
        <div className="relative group">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-slate-950/50 border border-white/5 rounded-[2rem] p-8 text-slate-300 placeholder:text-slate-800 focus:outline-none focus:border-cyan-500/30 transition-all resize-none min-h-[140px]"
            placeholder={t.addComment}
          />
          <button 
            onClick={handleAddComment}
            className="absolute bottom-6 right-6 px-8 py-3 bg-cyan-500 text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            {lang === 'ar' ? 'إرسال' : 'Send'}
          </button>
        </div>

        <div className="space-y-4">
          {comments.map(c => (
            <div key={c.id} className="glass-blur p-6 rounded-[1.8rem] border-white/5 bg-white/[0.002] flex gap-5 animate-fade-up">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center shrink-0">
                <span className="text-xl">{c.reaction}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black text-cyan-500 uppercase">{c.user}</span>
                  <span className="text-[9px] font-bold text-slate-600">{c.date}</span>
                </div>
                <p className="text-sm text-slate-400 font-semibold leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
