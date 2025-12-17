
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserContextType, UserScores, LearnerProfile } from '../types';

const defaultScores: UserScores = {
  tech: 1,
  prob: 1,
  data: 1,
  ethics: 1,
  econ: 1
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scores, setScores] = useState<UserScores>(defaultScores);
  const [masteredSkills, setMasteredSkills] = useState<string[]>([]);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  
  // Profile State
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('ai_pm_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      // Prompt new users to set profile
      setTimeout(() => setProfileModalOpen(true), 1000);
    }
  }, []);

  const updateProfile = (newProfile: LearnerProfile) => {
    setProfile(newProfile);
    localStorage.setItem('ai_pm_profile', JSON.stringify(newProfile));
  };

  const setScore = (id: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [id]: score
    }));
  };

  const resetScores = () => {
    setScores(defaultScores);
    setMasteredSkills([]);
    setCompletedWeeks([]);
  };

  const toggleSkill = (skillId: string) => {
    setMasteredSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      }
      return [...prev, skillId];
    });
  };

  const markWeekComplete = (weekId: number) => {
    setCompletedWeeks(prev => {
      if (!prev.includes(weekId)) {
        return [...prev, weekId];
      }
      return prev;
    });
  };

  return (
    <UserContext.Provider value={{ 
      scores, 
      setScore, 
      resetScores,
      masteredSkills,
      toggleSkill,
      completedWeeks,
      markWeekComplete,
      profile,
      updateProfile,
      isProfileModalOpen,
      setProfileModalOpen
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
