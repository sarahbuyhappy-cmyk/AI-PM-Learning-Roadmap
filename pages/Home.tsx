import React from 'react';
import { Link } from 'react-router-dom';
import { ARCHETYPES } from '../constants';
import { ArrowRight, Target, Zap, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
          The Blueprint
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
          From Senior PM to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Market-Leading AI PM
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          AI Product Management requires a fundamental cognitive shift from deterministic delivery to probabilistic management. This platform guides you through the diagnosis, mindset shift, and skill acquisition required for 2025.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link to="/assessment" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
            Start Diagnosis <ArrowRight size={18} />
          </Link>
          <Link to="/roadmap" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-medium transition-colors">
            View 12-Week Plan
          </Link>
        </div>
      </section>

      {/* Archetypes Grid */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="text-blue-500" />
          The Three AI PM Archetypes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARCHETYPES.map((arch) => (
            <div key={arch.id} className="bg-slate-950 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-all hover:-translate-y-1 shadow-lg shadow-black/20">
              <div className="h-12 w-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 border border-slate-800">
                {arch.id === 'core-ai' && <Zap className="text-yellow-500" />}
                {arch.id === 'platform' && <TrendingUp className="text-purple-500" />}
                {arch.id === 'application' && <Target className="text-emerald-500" />}
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{arch.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{arch.focus}</p>
              <div className="text-xs text-slate-500 border-t border-slate-800 pt-4 mt-auto">
                <span className="block font-semibold text-slate-400 mb-1">Key Skills:</span>
                {arch.skills}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats / Motivation */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/20 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">The "Double Fluency"</h3>
          <p className="text-slate-300">
            Top AI PMs must speak two languages: The language of <span className="text-blue-400 font-semibold">Transformers & Latent Space</span> and the language of <span className="text-emerald-400 font-semibold">User Needs & Unit Economics</span>.
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20 rounded-xl p-8">
           <h3 className="text-2xl font-bold text-white mb-4">Vibe Coding</h3>
           <p className="text-slate-300">
             In 2025, if you can't prototype, you can't lead. Learn to use tools like Cursor and Replit to verify your own PRDs before engineering even sees them.
           </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
