
import React, { useState, useMemo, useEffect } from 'react';
import { SKILL_TREE_DATA } from '../constants';
import { useUser } from '../context/UserContext';
import { ChevronDown, ChevronRight, Check, Search, Zap, BookOpen, PlayCircle, X, GraduationCap, Briefcase, MessageSquare, ArrowRight, Lightbulb, AlertTriangle, UserCheck } from 'lucide-react';
import { SkillNode } from '../types';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SkillTree: React.FC = () => {
  const { masteredSkills, toggleSkill } = useUser();
  const [viewMode, setViewMode] = useState<'constellation' | 'grid'>('constellation');
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(SKILL_TREE_DATA.map(n => n.id));
  const [infoMode, setInfoMode] = useState<'kid' | 'pro'>('kid'); // ELI5 vs Expert
  const [mentorQuestion, setMentorQuestion] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sync with URL params
  useEffect(() => {
    const skillId = searchParams.get('skill');
    if (skillId) {
        // Find skill
        let found: SkillNode | null = null;
        for (const cat of SKILL_TREE_DATA) {
            if (cat.id === skillId) { found = cat; break; }
            if (cat.children) {
                const child = cat.children.find(c => c.id === skillId);
                if (child) { found = child; break; }
            }
        }
        if (found) setSelectedSkill(found);
    } else {
        setSelectedSkill(null);
    }
  }, [searchParams]);

  const handleSkillSelect = (skill: SkillNode | null) => {
    if (skill) {
        setSearchParams({ skill: skill.id });
    } else {
        setSearchParams({});
    }
  };

  const handleAskMentor = (questionOverride?: string) => {
    if (!selectedSkill) return;
    const query = questionOverride || mentorQuestion || `Can you explain the concept of "${selectedSkill.label}" in more detail?`;
    
    // Construct rich context so the AI knows what the user is asking about
    const skillContext = `
      The user is currently studying the skill/concept: "${selectedSkill.label}".
      Category: ${selectedSkill.category}.
      Description: ${selectedSkill.description}.
      ELI5 Explanation: ${selectedSkill.eli5 || 'N/A'}.
      Expert Talking Points: ${selectedSkill.talkingPoints ? selectedSkill.talkingPoints.join('; ') : 'N/A'}.
      Practical Relevance: ${selectedSkill.practicalConnection || 'N/A'}.
    `;

    navigate('/mentor', { 
        state: { 
            initialQuery: query, 
            returnTo: `/assessment?skill=${selectedSkill.id}`,
            returnLabel: selectedSkill.label,
            skillContext: skillContext
        } 
    });
  };

  // --- Search Filtering ---
  const filteredData = useMemo(() => {
    if (!searchQuery) return SKILL_TREE_DATA;
    return SKILL_TREE_DATA.map(cat => ({
        ...cat,
        children: cat.children?.filter(child => 
            child.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
            child.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.children && cat.children.length > 0);
  }, [searchQuery]);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const calculateProgress = (nodes: SkillNode[]) => {
    const total = nodes.length;
    const completed = nodes.filter(n => masteredSkills.includes(n.id)).length;
    return Math.round((completed / total) * 100);
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
        case 'tech': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
        case 'prob': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
        case 'data': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
        case 'econ': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
        case 'ethics': return 'text-red-400 border-red-500/30 bg-red-500/10';
        case 'tools': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
        default: return 'text-slate-400 border-slate-700 bg-slate-800';
    }
  };

  const getOrbitColor = (cat: string) => {
      switch(cat) {
        case 'tech': return '#3b82f6';
        case 'prob': return '#a855f7';
        case 'data': return '#10b981';
        case 'econ': return '#f59e0b';
        case 'ethics': return '#ef4444';
        case 'tools': return '#22d3ee';
        default: return '#64748b';
    }
  };

  // --- Renderers ---

  const renderConceptModal = () => {
    if (!selectedSkill) return null;
    const isMastered = masteredSkills.includes(selectedSkill.id);
    const colorClass = getCategoryColor(selectedSkill.category);
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative flex flex-col max-h-[90vh]">
                <button 
                    onClick={() => handleSkillSelect(null)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white z-10"
                >
                    <X size={24} />
                </button>

                <div className={`p-6 border-b border-slate-800 bg-slate-950`}>
                     <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${colorClass.replace('text-', 'bg-').split(' ')[2].replace('/10', '/20')} ${colorClass.split(' ')[0]}`}>
                            {selectedSkill.category}
                        </span>
                        {selectedSkill.importance === 'critical' && (
                             <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-red-500/20 text-red-400 flex items-center gap-1">
                                <Zap size={12} fill="currentColor"/> Critical
                             </span>
                        )}
                     </div>
                     <h2 className="text-3xl font-bold text-white mb-2">{selectedSkill.label}</h2>
                     <p className="text-slate-400 text-lg">{selectedSkill.description}</p>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                    {/* Relationship Section - Pragmatism */}
                    <div className="bg-slate-950 border-l-4 border-blue-500 p-5 rounded-r-xl">
                        <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-widest">
                            <UserCheck size={16} /> Relationship to You
                        </h3>
                        <p className="text-slate-200 text-md leading-relaxed">
                            {selectedSkill.practicalConnection || "Understanding this helps you bridge the gap between technical feasibility and product impact."}
                        </p>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex bg-slate-800 p-1 rounded-lg w-full max-w-sm mx-auto">
                        <button 
                            onClick={() => setInfoMode('kid')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${infoMode === 'kid' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                            <GraduationCap size={16} /> ELI5 Mode
                        </button>
                        <button 
                            onClick={() => setInfoMode('pro')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${infoMode === 'pro' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Briefcase size={16} /> Expert Mode
                        </button>
                    </div>

                    {infoMode === 'kid' ? (
                        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6 relative overflow-hidden">
                             <div className="absolute -right-4 -top-4 opacity-10 text-emerald-500">
                                <BookOpen size={100} />
                             </div>
                             <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 text-lg">
                                <BookOpen size={20} /> Simple Explanation
                             </h3>
                             <p className="text-emerald-100 text-lg leading-relaxed font-medium">
                                "{selectedSkill.eli5 || "Explanation coming soon..."}"
                             </p>
                        </div>
                    ) : (
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 relative overflow-hidden">
                             <div className="absolute -right-4 -top-4 opacity-10 text-blue-500">
                                <Briefcase size={100} />
                             </div>
                             <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2 text-lg">
                                <Briefcase size={20} /> Talking Points (Sound Like a Pro)
                             </h3>
                             <ul className="space-y-3">
                                {selectedSkill.talkingPoints?.map((tp, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-blue-100 leading-relaxed">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                        {tp}
                                    </li>
                                )) || <li className="text-blue-200">No talking points available.</li>}
                             </ul>
                        </div>
                    )}
                    
                    {/* Ask Mentor Section */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                        <h4 className="text-slate-300 font-semibold mb-3 flex items-center gap-2">
                            <MessageSquare size={16} className="text-blue-400"/> Still confused? Ask the AI Coach.
                        </h4>
                        
                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap gap-2 mb-3">
                             <button 
                                onClick={() => handleAskMentor(`Give me a real-world example of ${selectedSkill.label}.`)}
                                className="text-xs bg-slate-900 border border-blue-500/30 hover:bg-blue-900/20 text-blue-300 px-3 py-1.5 rounded-full flex items-center gap-1 transition-all"
                             >
                                <Lightbulb size={12} /> Give Example
                             </button>
                             <button 
                                onClick={() => handleAskMentor(`From a practical application perspective, why is ${selectedSkill.label} important for me to understand? When would I need to consider this in a product lifecycle?`)}
                                className="text-xs bg-slate-900 border border-pink-500/30 hover:bg-pink-900/20 text-pink-300 px-3 py-1.5 rounded-full flex items-center gap-1 transition-all"
                             >
                                <UserCheck size={12} /> Why do I need this?
                             </button>
                             <button 
                                onClick={() => handleAskMentor(`What are the potential risks or downsides of ${selectedSkill.label}?`)}
                                className="text-xs bg-slate-900 border border-amber-500/30 hover:bg-amber-900/20 text-amber-300 px-3 py-1.5 rounded-full flex items-center gap-1 transition-all"
                             >
                                <AlertTriangle size={12} /> Explain Risks
                             </button>
                             <button 
                                onClick={() => handleAskMentor(`How does ${selectedSkill.label} relate to business value and ROI?`)}
                                className="text-xs bg-slate-900 border border-emerald-500/30 hover:bg-emerald-900/20 text-emerald-300 px-3 py-1.5 rounded-full flex items-center gap-1 transition-all"
                             >
                                <Zap size={12} /> ROI / Business Value
                             </button>
                        </div>

                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder={`What specifically about ${selectedSkill.label} is unclear?`}
                                value={mentorQuestion}
                                onChange={(e) => setMentorQuestion(e.target.value)}
                                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                            />
                            <button 
                                onClick={() => handleAskMentor()}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors"
                            >
                                Ask <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                         <a 
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedSkill.videoSearchQuery || selectedSkill.label + " explained")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700"
                         >
                            <PlayCircle size={20} className="text-red-500" /> Watch Video
                         </a>

                         <button 
                            onClick={() => {
                                toggleSkill(selectedSkill.id);
                                handleSkillSelect(null);
                            }}
                            className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold transition-all border ${
                                isMastered 
                                ? 'bg-slate-900 text-slate-400 border-slate-700' 
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent'
                            }`}
                         >
                             {isMastered ? 'Mark as Unlearned' : 'I Understand This'}
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const renderConstellationView = () => {
    const width = 1000;
    const height = 1000;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Core settings
    const dimRadius = 140; 
    const skillRadiusBase = 350; // Pushed slightly further out to reduce crowding

    // 1. Calculate Dimension Positions
    const dimNodes = SKILL_TREE_DATA.map((dim, i) => {
        const angle = (i * 2 * Math.PI / SKILL_TREE_DATA.length) - Math.PI / 2;
        return {
            ...dim,
            x: centerX + Math.cos(angle) * dimRadius,
            y: centerY + Math.sin(angle) * dimRadius,
            angle
        };
    });

    const allNodes: any[] = [];
    const links: any[] = [];

    dimNodes.forEach(dim => {
        allNodes.push({ type: 'dim', ...dim });
        links.push({ source: { x: centerX, y: centerY }, target: { x: dim.x, y: dim.y }, type: 'core' }); 

        if (dim.children) {
            const count = dim.children.length;
            const spread = Math.PI / 1.3; // Slightly narrower spread to keep labels more clustered around dimension
            const startAngle = dim.angle - spread / 2;
            const step = count > 1 ? spread / (count - 1) : 0;

            dim.children.forEach((child, j) => {
                const childAngle = count === 1 ? dim.angle : startAngle + (j * step);
                
                // --- STAGGERED RING LOGIC ---
                // We use three rings for skills to avoid congestion and overlap.
                const ringIndex = j % 3; 
                const radius = skillRadiusBase + (ringIndex * 90); // 350, 440, 530 - wide separation
                
                const childNode = {
                    ...child,
                    type: 'skill',
                    x: centerX + Math.cos(childAngle) * radius,
                    y: centerY + Math.sin(childAngle) * radius,
                    angle: childAngle,
                    parentId: dim.id,
                    ringIndex 
                };
                
                allNodes.push(childNode);
                links.push({ source: { x: dim.x, y: dim.y }, target: { x: childNode.x, y: childNode.y }, type: 'sub' });
            });
        }
    });

    return (
        <div className="w-full aspect-square md:h-[900px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative shadow-inner shadow-black">
           <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
               <defs>
                   <radialGradient id="sunGradient">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </radialGradient>
                    <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
               </defs>
               
               {Array.from({ length: 150 }).map((_, i) => (
                   <circle 
                        key={i} 
                        cx={Math.random() * width} 
                        cy={Math.random() * height} 
                        r={Math.random() * 1.5} 
                        fill="#fff" 
                        opacity={Math.random() * 0.4 + 0.1} 
                   />
               ))}

               {links.map((link, i) => (
                   <line 
                        key={i}
                        x1={link.source.x} y1={link.source.y}
                        x2={link.target.x} y2={link.target.y}
                        stroke={link.type === 'core' ? '#334155' : '#1e293b'}
                        strokeWidth={link.type === 'core' ? 2 : 1}
                        opacity={0.5}
                   />
               ))}

               <circle cx={centerX} cy={centerY} r={60} fill="url(#sunGradient)" opacity="0.6" />
               <circle cx={centerX} cy={centerY} r={25} fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
               <text x={centerX} y={centerY + 5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">YOU</text>

               {allNodes.map((node) => {
                   const isDim = node.type === 'dim';
                   const color = getOrbitColor(node.category || node.id.replace('dim_', ''));
                   const isMastered = !isDim && masteredSkills.includes(node.id);
                   
                   const isLeft = node.x < centerX;
                   const dx = Math.abs(node.x - centerX);
                   const dy = Math.abs(node.y - centerY);
                   const isVerticalMiddle = dx < 80;
                   
                   // Positioning logic for labels to avoid overlap
                   let textAnchor: "start" | "end" | "middle" = isLeft ? "end" : "start";
                   let textX = isLeft ? node.x - 22 : node.x + 22;
                   let textYOffset = 4;

                   // Top/Bottom extremes need center alignment
                   if (isVerticalMiddle) {
                       textAnchor = "middle";
                       textX = node.x;
                       textYOffset = node.y < centerY ? -20 : 25;
                   }

                   return (
                       <g 
                            key={node.id} 
                            onClick={() => !isDim && handleSkillSelect(node)} 
                            className={`${isDim ? 'cursor-default' : 'cursor-pointer group'}`}
                            pointerEvents="all"
                        >
                           {!isDim && (
                               <circle 
                                    cx={node.x} cy={node.y} r={20} 
                                    fill="transparent" 
                                    className="group-hover:fill-current group-hover:text-white/5 transition-colors"
                               />
                           )}

                           {!isDim && (
                               <circle 
                                    cx={node.x} cy={node.y} r={isMastered ? 18 : 0} 
                                    fill={color} opacity="0.15" 
                                    className="group-hover:opacity-30 transition-opacity"
                               />
                           )}

                           <circle 
                                cx={node.x} 
                                cy={node.y} 
                                r={isDim ? 10 : (isMastered ? 7 : 5)} 
                                fill={isDim ? '#0f172a' : (isMastered ? '#fff' : '#0f172a')} 
                                stroke={color} 
                                strokeWidth={isDim ? 3 : (isMastered ? 2 : 1.5)}
                                className="transition-all duration-300"
                           />

                           {/* Halo effect for text readability */}
                           <text 
                                x={textX} 
                                y={node.y + textYOffset} 
                                textAnchor={textAnchor}
                                fill="#000"
                                fontSize={isDim ? "14" : "11"}
                                fontWeight={isDim ? "bold" : (isMastered ? "bold" : "500")}
                                className="uppercase tracking-wider select-none"
                                stroke="#000"
                                strokeWidth="3"
                                strokeLinejoin="round"
                                opacity="0.6"
                           >
                                {node.label}
                           </text>

                           <text 
                                x={textX} 
                                y={node.y + textYOffset} 
                                textAnchor={textAnchor}
                                fill={isDim ? color : (isMastered ? '#fff' : '#94a3b8')}
                                fontSize={isDim ? "14" : "11"}
                                fontWeight={isDim ? "bold" : (isMastered ? "bold" : "500")}
                                className={`uppercase tracking-wider transition-all duration-200 group-hover:fill-white select-none`}
                                style={{ 
                                    cursor: isDim ? 'default' : 'pointer'
                                }}
                           >
                                {node.label}
                           </text>
                       </g>
                   );
               })}
           </svg>
           
           <div className="absolute bottom-6 right-6 text-[10px] text-slate-600 italic text-right pointer-events-none bg-slate-950/80 px-2 py-1 rounded">
               * Constellation Map: Inner Ring = Core Competencies, Triple Staggered Outer Stars = Specific Skills.<br/>
               Large separations and text halos improve readability and prevent overlap.
           </div>
        </div>
    );
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {filteredData.map((categoryNode) => {
            const isExpanded = expandedCategories.includes(categoryNode.id);
            const progress = categoryNode.children ? calculateProgress(categoryNode.children) : 0;

            return (
                <div key={categoryNode.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-lg hover:border-slate-700 transition-all">
                    <button 
                        onClick={() => toggleCategory(categoryNode.id)}
                        className={`p-4 flex items-center justify-between border-b border-slate-800 transition-colors ${isExpanded ? 'bg-slate-800/50' : 'hover:bg-slate-800'}`}
                    >
                        <div className="text-left">
                            <h3 className={`font-bold ${getCategoryColor(categoryNode.category).split(' ')[0]}`}>{categoryNode.label}</h3>
                            <p className="text-xs text-slate-500">{categoryNode.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                             <div className="text-xs font-mono text-slate-400">{progress}%</div>
                             {isExpanded ? <ChevronDown size={18} className="text-slate-500"/> : <ChevronRight size={18} className="text-slate-500" />}
                        </div>
                    </button>

                    {isExpanded && categoryNode.children && (
                        <div className="p-4 space-y-3 bg-slate-950/50 flex-1">
                            <div className="w-full h-1 bg-slate-800 rounded-full mb-4 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: `${progress}%`}}></div>
                            </div>

                            <div className="space-y-2">
                                {categoryNode.children.map((skill) => {
                                    const isMastered = masteredSkills.includes(skill.id);
                                    
                                    return (
                                        <div
                                            key={skill.id}
                                            onClick={() => handleSkillSelect(skill)} 
                                            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 group relative overflow-hidden cursor-pointer ${
                                                isMastered 
                                                    ? 'bg-blue-900/10 border-blue-500/50' 
                                                    : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                                            }`}
                                        >
                                            <div className="flex items-start gap-3 relative z-10">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleSkill(skill.id);
                                                    }} 
                                                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                                    isMastered ? 'bg-blue-500 border-blue-500' : 'border-slate-600 hover:border-blue-400'
                                                }`}>
                                                    {isMastered && <Check size={12} className="text-white" strokeWidth={3} />}
                                                </button>

                                                <div>
                                                    <div className={`text-sm font-semibold transition-colors flex items-center gap-2 ${isMastered ? 'text-blue-100' : 'text-slate-300'}`}>
                                                        {skill.label}
                                                        {skill.importance === 'critical' && <Zap size={10} className="text-amber-500" fill="currentColor"/>}
                                                    </div>
                                                    <div className="text-xs text-slate-500 leading-snug mt-1">
                                                        {skill.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            );
        })}
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in relative">
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">AI Product Manager Knowledge Map</h2>
                <p className="text-slate-400 text-sm max-w-xl">
                A non-overlapping constellation of core concepts. <br/>
                <strong>Inner Ring:</strong> Competencies. <strong>Triple Staggered Stars:</strong> Granular Skills (Split into 3 rings to eliminate overlap).<br/>
                Click any star or label for pragmatic insights.
                </p>
            </div>
            
            <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button 
                    onClick={() => setViewMode('constellation')}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${viewMode === 'constellation' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    Map View
                </button>
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    List View
                </button>
            </div>
        </div>

        <div className="mt-6 relative max-w-md mx-auto md:mx-0">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input 
                type="text" 
                placeholder="Search concepts (e.g., 'RAG', 'Token', 'Cursor')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
        </div>
      </div>

      {viewMode === 'constellation' && !searchQuery ? renderConstellationView() : renderGridView()}

      {renderConceptModal()}
    </div>
  );
};

export default SkillTree;
