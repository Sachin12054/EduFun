import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

const UserProgressContext = createContext();

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};

export const UserProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState({
    totalPoints: 0,
    completedLessons: [],
    completedQuizzes: [],
    currentStreak: 0,
    achievements: [],
    subjectProgress: {},
    lastActiveDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const progressRef = doc(db, 'userProgress', user.uid);
      
      // Set up real-time listener
      const unsubscribe = onSnapshot(progressRef, (doc) => {
        if (doc.exists()) {
          setUserProgress(doc.data());
        } else {
          initializeUserProgress();
        }
        setIsLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Error loading user progress:', error);
      setIsLoading(false);
    }
  };

  const initializeUserProgress = async () => {
    if (!user) return;

    const initialProgress = {
      totalPoints: 0,
      completedLessons: [],
      completedQuizzes: [],
      currentStreak: 0,
      achievements: [],
      subjectProgress: {
        mathematics: { lessons: 0, quizzes: 0, points: 0 },
        science: { lessons: 0, quizzes: 0, points: 0 },
        english: { lessons: 0, quizzes: 0, points: 0 },
        history: { lessons: 0, quizzes: 0, points: 0 },
        geography: { lessons: 0, quizzes: 0, points: 0 },
        computer: { lessons: 0, quizzes: 0, points: 0 },
      },
      lastActiveDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    try {
      const progressRef = doc(db, 'userProgress', user.uid);
      await setDoc(progressRef, initialProgress);
      setUserProgress(initialProgress);
    } catch (error) {
      console.error('Error initializing user progress:', error);
    }
  };

  const updateProgress = async (updates) => {
    if (!user) return;

    try {
      const progressRef = doc(db, 'userProgress', user.uid);
      const updatedProgress = {
        ...userProgress,
        ...updates,
        lastActiveDate: new Date().toISOString(),
      };
      
      await updateDoc(progressRef, updatedProgress);
      setUserProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const completeLesson = async (subject, lessonId, points = 10) => {
    const newCompletedLessons = [...userProgress.completedLessons];
    if (!newCompletedLessons.includes(lessonId)) {
      newCompletedLessons.push(lessonId);
    }

    const newSubjectProgress = {
      ...userProgress.subjectProgress,
      [subject]: {
        ...userProgress.subjectProgress[subject],
        lessons: userProgress.subjectProgress[subject].lessons + 1,
        points: userProgress.subjectProgress[subject].points + points,
      },
    };

    await updateProgress({
      completedLessons: newCompletedLessons,
      totalPoints: userProgress.totalPoints + points,
      subjectProgress: newSubjectProgress,
    });
  };

  const completeQuiz = async (subject, quizId, score, maxScore) => {
    const points = Math.round((score / maxScore) * 20); // Max 20 points per quiz

    const newCompletedQuizzes = [...userProgress.completedQuizzes];
    const existingQuizIndex = newCompletedQuizzes.findIndex(q => q.id === quizId);
    
    if (existingQuizIndex >= 0) {
      newCompletedQuizzes[existingQuizIndex] = {
        id: quizId,
        score,
        maxScore,
        points,
        completedAt: new Date().toISOString(),
      };
    } else {
      newCompletedQuizzes.push({
        id: quizId,
        score,
        maxScore,
        points,
        completedAt: new Date().toISOString(),
      });
    }

    const newSubjectProgress = {
      ...userProgress.subjectProgress,
      [subject]: {
        ...userProgress.subjectProgress[subject],
        quizzes: userProgress.subjectProgress[subject].quizzes + 1,
        points: userProgress.subjectProgress[subject].points + points,
      },
    };

    await updateProgress({
      completedQuizzes: newCompletedQuizzes,
      totalPoints: userProgress.totalPoints + points,
      subjectProgress: newSubjectProgress,
    });
  };

  const addAchievement = async (achievement) => {
    const newAchievements = [...userProgress.achievements];
    if (!newAchievements.find(a => a.id === achievement.id)) {
      newAchievements.push({
        ...achievement,
        unlockedAt: new Date().toISOString(),
      });
      
      await updateProgress({
        achievements: newAchievements,
      });
    }
  };

  const value = {
    userProgress,
    isLoading,
    updateProgress,
    completeLesson,
    completeQuiz,
    addAchievement,
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};