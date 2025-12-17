
export interface Resource {
  title: string;
  url: string;
}

export interface WeekPlan {
  week: number;
  title: string;
  phase: string;
  description: string;
  tasks: string[];
  resources: Resource[];
  output: string;
  relatedCompetencies?: string[]; // IDs of competencies (tech, prob, data, ethics, econ)
}

export interface CompetencyLevel {
  level: number;
  description: string;
}

export interface CompetencyDimension {
  id: string;
  name: string;
  levels: {
    1: string;
    3: string;
    5: string;
  };
}

// Assessment / Diagnostic Quiz Types
export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  scenario: string;
  rubric: string; // Instructions for the AI grader
}

export interface QuizResult {
  level: number;
  feedback: string;
  score: number; // 0-100 derived from level
}

// Weekly Mastery Quiz Types
export interface WeeklyQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WeeklyQuiz {
  weekId: number;
  questions: WeeklyQuizQuestion[];
}

// Skill Tree Types
export interface SkillNode {
  id: string;
  label: string;
  description: string;
  category: 'tech' | 'product' | 'strategy' | 'data' | 'ethics' | 'prob' | 'econ' | 'tools';
  children?: SkillNode[];
  // Educational Fields
  eli5?: string; // Explain Like I'm 5
  practicalConnection?: string; // "What's the relationship to ME?" - Pragmatic application
  videoSearchQuery?: string; // Query for YouTube link generation
  importance?: 'critical' | 'advanced' | 'niche';
  parentId?: string; // For flat list hierarchy operations if needed
  talkingPoints?: string[]; // Bullet points to sound like an expert
}

export interface Archetype {
  id: string;
  name: string;
  focus: string;
  content: string;
  skills: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  suggestedActions?: string[]; // New field for follow-up chips
}

export type UserScores = Record<string, number>;

// Learner Background DNA
export interface LearnerProfile {
  name: string;
  role: string; // e.g. "Senior PM", "Engineer"
  industry: string; // e.g. "Fintech", "Healthcare"
  yearsExperience: string;
  technicalComfort: 'low' | 'medium' | 'high';
  goal: string; // e.g. "Get hired at OpenAI"
}

export interface UserContextType {
  scores: UserScores;
  setScore: (id: string, score: number) => void;
  resetScores: () => void;
  masteredSkills: string[];
  toggleSkill: (skillId: string) => void;
  completedWeeks: number[];
  markWeekComplete: (weekId: number) => void;
  
  // Profile
  profile: LearnerProfile | null;
  updateProfile: (profile: LearnerProfile) => void;
  isProfileModalOpen: boolean;
  setProfileModalOpen: (isOpen: boolean) => void;
}
