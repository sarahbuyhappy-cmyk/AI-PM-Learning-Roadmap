
import React, { useState, useEffect } from 'react';
import { COMPETENCIES, DIAGNOSTIC_QUIZ } from '../constants';
import { evaluateQuizAnswer } from '../services/geminiService';
import { useUser } from '../context/UserContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import { BrainCircuit, Info, Play, Loader2, CheckCircle2, ChevronRight, AlertCircle, Edit3, ArrowRight, Network } from 'lucide-react';
import { QuizResult } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import SkillTree from '../components/SkillTree';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Assessment: React.FC = () => {
  // Mode: 'overview' | 'quiz' | 'results' | 'skills'
  const [mode, setMode] = useState<'overview' | 'quiz' | 'results' | 'skills'>('overview');
  const [searchParams] = useSearchParams();
  
  // Use global user context
  const { scores, setScore, profile } = useUser();

  // State for Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});

  // Effect to handle deep linking to skills
  useEffect(() => {
    if (searchParams.get('skill')) {
      setMode('skills');
    }
  }, [searchParams]);

  const currentQuestion = DIAGNOSTIC_QUIZ[currentQuestionIndex];

  const handleManualScoreChange = (id: string, value: number) => {
    setScore(id, value);
  };

  const getOverallLevel = () => {
    const values = Object.values(scores) as number[];
    const avg = values.reduce((a, b) => a + b, 0) / 5;
    if (avg < 2.5) return "Level 1: Novice / Explorer";
    if (avg < 4.2) return "Level 3: Competent AI PM";
    return "Level 5: Top-Tier / Market Leader";
  };

  const getRecommendation = () => {
    const sorted = Object.entries(scores).sort(([, a], [, b]) => (a as number) - (b as number));
    const lowest = sorted[0][0];

    if (lowest === 'tech') return 'Technical Fluency (Week 1-3)';
    if (lowest === 'econ') return 'AI Economics (Week 5)';
    if (lowest === 'prob') return 'Probabilistic Thinking (Week 3 & 6)';
    if (lowest === 'data') return 'Data Strategy (Week 3 & 6)';
    return 'Ethics & Safety (Week 8)';
  };

  const getCompetencyDescription = (dim: any, level: number) => {
    // Direct match for 1, 3, 5
    if (dim.levels[level]) return dim.levels[level];
    
    // Intermediate levels
    if (level === 2) return `Foundational knowledge established. Progressing towards independent application.`;
    if (level === 4) return `Strong competence. Refining intuition and strategic depth towards mastery.`;
    
    return "";
  };

  const handleStartQuiz = () => {
    setMode('quiz');
    setCurrentQuestionIndex(0);
    setQuizResults({});
    setUserAnswer('');
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);

    const result = await evaluateQuizAnswer(
        currentQuestion.question + "\nScenario: " + currentQuestion.scenario,
        userAnswer,
        currentQuestion.rubric,
        profile
    );

    setQuizResults(prev => ({
        ...prev,
        [currentQuestion.category]: result
    }));
    
    // Update the global score state with the quiz result
    setScore(currentQuestion.category, result.level);

    setIsEvaluating(false);
    setUserAnswer('');

    if (currentQuestionIndex < DIAGNOSTIC_QUIZ.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
    } else {
        setMode('results');
    }
  };

  const renderOverview = () => {
      return (
        <div className="animate-fade-in space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-xl p-8 text-center space-y-4 flex flex-col justify-center items-center hover:border-blue-500/40 transition-all group cursor-pointer" onClick={handleStartQuiz}>
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Play size={32} fill="currentColor" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Diagnostic Simulator</h2>
                        <p className="text-slate-300 text-sm">
                        Test your skills against real-world scenarios. AI grades your strategic responses.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/20 rounded-xl p-8 text-center space-y-4 flex flex-col justify-center items-center hover:border-purple-500/40 transition-all group cursor-pointer" onClick={() => setMode('skills')}>
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        <Network size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Skill Constellation</h2>
                        <p className="text-slate-300 text-sm">
                        Explore the 60+ granular concepts required for top-tier AI PMs. Visualized as an interactive knowledge map.
                        </p>
                    </div>
                </div>
           </div>

           {/* Manual Sliders Section */}
           <div className="space-y-6 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                 <Edit3 size={18} className="text-slate-400" />
                 <h3 className="text-lg font-semibold text-slate-300">Manual Self-Assessment</h3>
              </div>
              
              <div className="grid gap-6">
                {COMPETENCIES.map((dim) => (
                    <div key={dim.id} className="bg-slate-950 border border-slate-800 rounded-lg p-5 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-slate-200">{dim.name}</span>
                                <span className="text-blue-400 font-mono font-bold">L{scores[dim.id]}</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-3 h-8 flex items-center">
                                {getCompetencyDescription(dim, scores[dim.id])}
                            </p>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                value={scores[dim.id]}
                                onChange={(e) => handleManualScoreChange(dim.id, parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-500 hover:accent-blue-500 transition-all"
                            />
                            <div className="flex justify-between text-[10px] text-slate-600 mt-1 uppercase font-bold tracking-wider">
                                <span>Novice (1)</span>
                                <span>Competent (3)</span>
                                <span>Expert (5)</span>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
              
              <div className="flex justify-center pt-4">
                <button 
                    onClick={() => setMode('results')}
                    className="text-slate-400 hover:text-white underline"
                >
                    View Report based on Manual Scores
                </button>
              </div>
           </div>
        </div>
      );
  };

  const renderQuiz = () => (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <button onClick={() => setMode('overview')} className="text-slate-400 hover:text-white text-sm mb-4">← Back to Assessment Hub</button>
        <div className="flex items-center justify-between text-slate-400 text-sm mb-4">
            <span>Scenario {currentQuestionIndex + 1} of {DIAGNOSTIC_QUIZ.length}</span>
            <span className="bg-slate-800 px-2 py-1 rounded text-xs uppercase tracking-wide">{currentQuestion.category}</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">{currentQuestion.question}</h3>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 mb-6 text-slate-300 leading-relaxed italic">
                "{currentQuestion.scenario}"
            </div>

            <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-400">Your Strategic Response:</label>
                <textarea 
                    className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                    placeholder="Describe your approach, technical reasoning, and decision..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                />
            </div>

            <div className="mt-6 flex justify-end">
                <button 
                    onClick={handleSubmitAnswer}
                    disabled={isEvaluating || !userAnswer.trim()}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-lg transition-all flex items-center gap-2"
                >
                    {isEvaluating ? (
                        <><Loader2 className="animate-spin" size={18} /> Analyzing...</>
                    ) : (
                        <>Submit for Evaluation <ChevronRight size={18} /></>
                    )}
                </button>
            </div>
        </div>
    </div>
  );

  const renderResults = () => {
    const data = COMPETENCIES.map(c => ({
        subject: c.name,
        A: scores[c.id],
        fullMark: 5,
    }));

    return (
        <div className="animate-fade-in space-y-8">
           <button onClick={() => setMode('overview')} className="text-slate-400 hover:text-white text-sm">← Back to Assessment Hub</button>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Radar Chart */}
             <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
                <h3 className="text-slate-400 font-medium mb-4 uppercase tracking-widest text-sm z-10">Competency Matrix</h3>
                <div className="h-[300px] w-full z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                      <Radar
                        name="Skill Level"
                        dataKey="A"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.5}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                        itemStyle={{ color: '#e2e8f0' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Score Card */}
             <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                <h3 className="text-slate-400 font-medium mb-2 uppercase tracking-widest text-sm">Overall Status</h3>
                <h2 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                  {getOverallLevel()}
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-1 flex items-center gap-2"><AlertCircle size={16}/> Recommended Focus</h4>
                    <p className="text-sm text-blue-100/70">
                      Based on your score, prioritizing <strong>{getRecommendation()}</strong> will yield the highest ROI for your career transition.
                    </p>
                  </div>
                  
                  {/* Show specific quiz feedback if available */}
                  {Object.keys(quizResults).length > 0 && (
                      <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                          {Object.entries(quizResults).map(([catId, result]) => {
                             const r = result as QuizResult;
                             return (
                              <div key={catId} className="text-xs text-slate-400 border-l-2 border-slate-700 pl-3">
                                  <span className="text-slate-200 font-semibold block mb-1 uppercase tracking-wider">{catId} Evaluation:</span>
                                  <MarkdownRenderer content={r.feedback} />
                              </div>
                             );
                          })}
                      </div>
                  )}

                  <Link to="/roadmap" className="inline-flex items-center gap-2 text-blue-400 hover:text-white font-semibold text-sm mt-4 hover:underline">
                    Go to Tailored Roadmap <ArrowRight size={16}/>
                  </Link>
                </div>
             </div>
           </div>
        </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Competency Diagnosis</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
            {mode === 'quiz' 
                ? "Respond to the scenarios as you would in a real interview or PRD." 
                : "Honest self-assessment is the first step. Rate yourself from Level 1 (Novice) to Level 5 (Top-Tier) or take the quiz."}
        </p>
      </div>

      {mode === 'overview' && renderOverview()}
      {mode === 'quiz' && renderQuiz()}
      {mode === 'results' && renderResults()}
      {mode === 'skills' && (
          <div className="animate-fade-in w-full h-full">
              <button onClick={() => setMode('overview')} className="text-slate-400 hover:text-white text-sm mb-6">← Back to Assessment Hub</button>
              <div className="h-[900px]">
                <SkillTree />
              </div>
          </div>
      )}
    </div>
  );
};

export default Assessment;
