
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { X, UserCircle2, Briefcase, Building2, Code2, Target } from 'lucide-react';
import { LearnerProfile } from '../types';

const UserProfileModal: React.FC = () => {
  const { isProfileModalOpen, setProfileModalOpen, profile, updateProfile } = useUser();
  
  const [formData, setFormData] = useState<LearnerProfile>(profile || {
    name: '',
    role: '',
    industry: '',
    yearsExperience: '',
    technicalComfort: 'medium',
    goal: ''
  });

  if (!isProfileModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-lg text-white">
                <UserCircle2 size={24} />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white">Learner DNA</h2>
                <p className="text-sm text-slate-400">Personalize your AI Coach & Analogies</p>
             </div>
          </div>
          <button onClick={() => setProfileModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
           
           {/* Basic Info */}
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Name</label>
                <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Alice"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1"><Briefcase size={12}/> Role</label>
                <input 
                    required
                    type="text" 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    placeholder="Senior PM"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
           </div>

           {/* Context */}
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1"><Building2 size={12}/> Industry</label>
                <input 
                    required
                    type="text" 
                    value={formData.industry}
                    onChange={e => setFormData({...formData, industry: e.target.value})}
                    placeholder="Fintech / Health..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Experience</label>
                <select 
                    value={formData.yearsExperience}
                    onChange={e => setFormData({...formData, yearsExperience: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                >
                    <option value="">Select...</option>
                    <option value="0-2">0-2 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5-10">5-10 Years</option>
                    <option value="10+">10+ Years</option>
                </select>
              </div>
           </div>

           {/* Technical Comfort */}
           <div className="space-y-3">
             <label className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1"><Code2 size={12}/> Technical Comfort</label>
             <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                        key={level}
                        type="button"
                        onClick={() => setFormData({...formData, technicalComfort: level})}
                        className={`p-3 rounded-lg border text-sm font-semibold capitalize transition-all ${
                            formData.technicalComfort === level 
                            ? 'bg-blue-600 text-white border-blue-500' 
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-600'
                        }`}
                    >
                        {level}
                    </button>
                ))}
             </div>
             <p className="text-[10px] text-slate-500">
                {formData.technicalComfort === 'low' && "I prefer simple, non-jargon explanations."}
                {formData.technicalComfort === 'medium' && "I can understand basic architecture diagrams."}
                {formData.technicalComfort === 'high' && "I can read code and technical papers."}
             </p>
           </div>

           {/* Goal */}
           <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1"><Target size={12}/> Primary Goal</label>
                <input 
                    type="text" 
                    value={formData.goal}
                    onChange={e => setFormData({...formData, goal: e.target.value})}
                    placeholder="e.g. Pivot to AI PM role at a startup"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                />
           </div>

           <div className="pt-4">
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02]">
                Save Profile & Customize Learning
              </button>
           </div>

        </form>
      </div>
    </div>
  );
};

export default UserProfileModal;
