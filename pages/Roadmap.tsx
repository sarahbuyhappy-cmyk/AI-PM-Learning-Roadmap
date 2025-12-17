import React, { useState } from 'react';
import { ROADMAP_WEEKS, WEEKLY_QUIZZES } from '../constants';
import { useUser } from '../context/UserContext';
import { CheckCircle2, Circle, BookOpen, Code, Trophy, ChevronDown, ChevronUp, ExternalLink, Flame, Check, PlayCircle, XCircle } from 'lucide-react';
import { WeeklyQuiz } from '../types';

const Roadmap: React.FC = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [personalized, setPersonalized] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState<WeeklyQuiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  const { scores, completedWeeks, markWeekComplete } = useUser();

  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  const getWeekStatus = (relatedCompetencies?: string[]) => {
    if (!relatedCompetencies || relatedCompetencies.length === 0) return 'neutral';
    
    // Check if any related competency is low (Level 1)
    const hasWeakness = relatedCompetencies.some(id => scores[id] <= 2);
    if (hasWeakness) return 'priority';

    // Check if all related competencies are high (Level 5)
    const isMastered = relatedCompetencies.every(id => scores[id] >= 4);
    if (isMastered) return 'mastered';

    return 'neutral';
  };

  const startQuiz = (weekId: number) => {
    const quiz = WEEKLY_QUIZZES[weekId];
    if (quiz) {
      setActiveQuiz(quiz);
      setQuizAnswers({});
      setQuizSubmitted(false);
    } else {
      alert("Quiz for this week is coming soon!");
    }
  };

  const handleQuizOptionSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    if (!activeQuiz) return;

    // Check pass condition (e.g., all correct or 2/3)
    let correctCount = 0;
    activeQuiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    // If passed (let's say 100% for rigor, or > 66%)
    if (correctCount >= activeQuiz.questions.length - 1) {
       markWeekComplete(activeQuiz.weekId);
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
           <h1 className="text-3xl font-bold text-white mb-2">12-Week Intensive Roadmap</h1>
           <p className="text-slate-400">A rigorous training camp designed to push Senior PMs to the peak of AI Product Management.</p>
        </div>
        
        <button 
          onClick={() => setPersonalized(!personalized)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            personalized ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          {personalized ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          Personalize by Skill Gap
        </button>
      </div>

      <div className="space-y-4">
        {ROADMAP_WEEKS.map((weekData) => {
          const isExpanded = expandedWeek === weekData.week;
          const isPhaseStart = weekData.week === 1 || weekData.week === 5 || weekData.week === 9;
          const isCompleted = completedWeeks.includes(weekData.week);
          
          let status = 'neutral';
          if (personalized) {
            status = getWeekStatus(weekData.relatedCompetencies);
          }

          const borderColor = isCompleted 
            ? 'border-emerald-500/50' 
            : (status === 'priority' ? 'border-amber-500/50' : (status === 'mastered' ? 'border-blue-500/30' : 'border-slate-800'));
          
          const bgColor = isCompleted
            ? 'bg-emerald-950/20'
            : (status === 'priority' ? 'bg-amber-950/10' : (status === 'mastered' ? 'bg-blue-950/10' : 'bg-slate-950'));

          return (
            <React.Fragment key={weekData.week}>
              {isPhaseStart && (
                <div className="py-6 mt-8 border-b border-slate-800 mb-4">
                  <h2 className="text-xl font-bold text-blue-400 tracking-wide uppercase">{weekData.phase}</h2>
                </div>
              )}
              
              <div 
                className={`${bgColor} border ${borderColor} transition-all duration-300 rounded-xl overflow-hidden relative ${
                  isExpanded ? 'shadow-lg shadow-black/20' : 'hover:border-slate-700'
                }`}
              >
                 {/* Badges */}
                 <div className="absolute top-0 right-0 flex">
                    {isCompleted && (
                        <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-lg z-20">
                            <Check size={14} strokeWidth={3} /> COMPLETED
                        </div>
                    )}
                    {!isCompleted && status === 'priority' && !isExpanded && (
                        <div className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1 z-10">
                            <Flame size={12} fill="currentColor" /> HIGH PRIORITY
                        </div>
                    )}
                 </div>

                <button 
                  onClick={() => toggleWeek(weekData.week)}
                  className="w-full flex items-center justify-between p-6 text-left relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg transition-colors ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : (isExpanded ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-800')
                    }`}>
                      {isCompleted ? <Check size={20} /> : weekData.week}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold flex items-center gap-2 ${isExpanded || isCompleted ? 'text-white' : 'text-slate-300'}`}>
                        {weekData.title}
                      </h3>
                      {!isExpanded && (
                         <p className="text-sm text-slate-500 truncate max-w-md">{weekData.description}</p>
                      )}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-slate-600" />}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-8 border-t border-slate-800/50 bg-slate-900/30">
                    <div className="flex flex-col md:flex-row items-start gap-4 mt-4">
                        <p className="text-slate-300 mb-6 italic border-l-2 border-blue-500 pl-4 py-1 flex-1">
                        {weekData.description}
                        </p>
                        
                        {!isCompleted && WEEKLY_QUIZZES[weekData.week] && (
                             <button 
                                onClick={() => startQuiz(weekData.week)}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all hover:scale-105"
                             >
                                <PlayCircle size={18} /> Verify Mastery
                             </button>
                        )}
                        {isCompleted && (
                             <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 font-bold flex items-center gap-2">
                                <CheckCircle2 size={18} /> Week Passed
                             </div>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase text-xs tracking-wider">
                          <CheckCircle2 size={16} />
                          Tasks
                        </div>
                        <ul className="space-y-3">
                          {weekData.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/50 flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-purple-400 font-semibold uppercase text-xs tracking-wider">
                            <BookOpen size={16} />
                            Resources
                          </div>
                          <div className="flex flex-col gap-2">
                            {weekData.resources.map((res, i) => (
                              <a 
                                key={i} 
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white transition-colors group"
                              >
                                {res.title}
                                <ExternalLink size={14} className="text-slate-500 group-hover:text-blue-400" />
                              </a>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 bg-slate-900 p-4 rounded-lg border border-slate-800">
                           <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase text-xs tracking-wider">
                            <Trophy size={16} />
                            Weekly Output
                          </div>
                          <p className="text-sm text-slate-300">
                            {weekData.output}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
             <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
               <div>
                  <h2 className="text-xl font-bold text-white">Week {activeQuiz.weekId} Certification</h2>
                  <p className="text-sm text-slate-400">Answer correctly to mark this week as complete.</p>
               </div>
               <button onClick={closeQuiz} className="text-slate-500 hover:text-white"><XCircle size={24} /></button>
             </div>
             
             <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
                {activeQuiz.questions.map((q, qIdx) => {
                   const isCorrect = quizAnswers[q.id] === q.correctIndex;
                   const isWrong = quizSubmitted && !isCorrect;

                   return (
                   <div key={q.id} className="space-y-3">
                      <h3 className="text-slate-200 font-semibold">{qIdx + 1}. {q.question}</h3>
                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => (
                          <button
                             key={oIdx}
                             onClick={() => handleQuizOptionSelect(q.id, oIdx)}
                             disabled={quizSubmitted}
                             className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                               quizSubmitted 
                                 ? (oIdx === q.correctIndex 
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200' 
                                    : (quizAnswers[q.id] === oIdx ? 'bg-red-500/20 border-red-500 text-red-200' : 'bg-slate-800 border-slate-700 opacity-50'))
                                 : (quizAnswers[q.id] === oIdx ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500')
                             }`}
                          >
                             {opt}
                          </button>
                        ))}
                      </div>
                      {quizSubmitted && (
                         <div className={`text-xs p-3 rounded ${isCorrect ? 'bg-emerald-950/30 text-emerald-400' : 'bg-red-950/30 text-red-400'}`}>
                           <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {q.explanation}
                         </div>
                      )}
                   </div>
                )})}
             </div>

             <div className="p-6 border-t border-slate-800 bg-slate-950 flex justify-end">
                {!quizSubmitted ? (
                  <button 
                    onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length !== activeQuiz.questions.length}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold"
                  >
                    Submit Answers
                  </button>
                ) : (
                   <button onClick={closeQuiz} className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-bold">
                     Close
                   </button>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;