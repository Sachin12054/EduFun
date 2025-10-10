import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getStudentProgress,
  getStudentProfile,
  markLessonComplete,
  saveQuizResult,
  addCoins as dbAddCoins,
  awardBadge as dbAwardBadge,
  awardSticker as dbAwardSticker,
  subscribeToStudentProgress,
  subscribeToStudentProfile,
  updateLeaderboard,
  initializeStudentProgress,
  createStudentProfile
} from '../services/database';

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
  
  // Student Profile State
  const [studentProfile, setStudentProfile] = useState(null);
  
  // Student Progress State  
  const [userProgress, setUserProgress] = useState({
    totalPoints: 0,
    totalCoins: 0,
    coins: 0, // Alias for compatibility
    level: 1,
    completedLessons: [],
    completedQuizzes: [],
    quizResults: {},
    currentStreak: 0,
    achievements: [],
    badges: [],
    stickers: [],
    subjectProgress: {
      english: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
      maths: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
      science: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
      social: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
      gk: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
    },
    lastActiveDate: null,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  // Load student data when user logs in
  useEffect(() => {
    if (user?.uid) {
      loadStudentData();
      
      // Subscribe to real-time updates
      const unsubscribeProgress = subscribeToStudentProgress(user.uid, handleProgressUpdate);
      const unsubscribeProfile = subscribeToStudentProfile(user.uid, handleProfileUpdate);

      return () => {
        unsubscribeProgress();
        unsubscribeProfile();
      };
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadStudentData = async () => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      
      // Load profile
      let profile = await getStudentProfile(user.uid);
      if (!profile) {
        // Create profile if doesn't exist
        profile = await createStudentProfile(user.uid, {
          name: user.displayName || 'Student',
          email: user.email || '',
          grade: 1,
          avatar: '👦'
        });
      }
      setStudentProfile(profile);

      // Load progress
      let progress = await getStudentProgress(user.uid);
      if (!progress) {
        // Initialize progress if doesn't exist
        progress = await initializeStudentProgress(user.uid);
      }
      
      setUserProgress({
        ...progress,
        coins: progress.totalCoins || 0,
        completedQuizzes: progress.completedQuizzes || []
      });

    } catch (error) {
      console.error('❌ Error loading student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgressUpdate = (updatedProgress) => {
    setUserProgress({
      ...updatedProgress,
      coins: updatedProgress.totalCoins || 0,
      completedQuizzes: updatedProgress.completedQuizzes || []
    });

    // Update leaderboard when progress changes
    if (studentProfile && user?.uid) {
      updateLeaderboard(user.uid, {
        name: studentProfile.name,
        avatar: studentProfile.avatar,
        grade: studentProfile.grade,
        totalPoints: updatedProgress.totalPoints,
        totalCoins: updatedProgress.totalCoins,
        badges: updatedProgress.badges
      });
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setStudentProfile(updatedProfile);
  };

  const initializeUserProgress = async () => {
    if (!user?.uid) return;
    
    try {
      await initializeStudentProgress(user.uid);
    } catch (error) {
      console.error('❌ Error initializing progress:', error);
    }
  };

  const updateProgress = async (updates) => {
    // This method is kept for backwards compatibility
    // Direct updates should use specific methods below
    setUserProgress(prev => ({
      ...prev,
      ...updates
    }));
  };

  const completeLesson = async (subject, lessonId, points = 10, grade = 1, lessonTitle = '') => {
    if (!user?.uid) return;

    try {
      await markLessonComplete(user.uid, {
        subject,
        grade,
        lessonId,
        lessonTitle,
        points
      });

      console.log(`✅ Lesson completed: ${lessonTitle}`);
    } catch (error) {
      console.error('❌ Error completing lesson:', error);
    }
  };

  const completeQuiz = async (subject, quizId, score, maxScore, grade = 1, quizTitle = '') => {
    if (!user?.uid) return;

    try {
      const correctAnswers = score;
      const totalQuestions = maxScore;
      const percentage = Math.round((score / maxScore) * 100);
      
      // Calculate points and coins based on performance
      let pointsEarned = Math.round((score / maxScore) * 20); // Base: 0-20 points
      let coinsEarned = Math.round((score / maxScore) * 10); // Base: 0-10 coins
      
      // Bonus for perfect score
      if (score === maxScore) {
        pointsEarned += 10; // Bonus 10 points
        coinsEarned += 5;   // Bonus 5 coins
      }

      await saveQuizResult(user.uid, {
        subject,
        grade,
        quizId,
        quizTitle,
        score: percentage,
        correctAnswers,
        totalQuestions,
        pointsEarned,
        coinsEarned
      });

      console.log(`✅ Quiz completed: ${quizTitle} - Score: ${percentage}%`);
      
      return { pointsEarned, coinsEarned, percentage };
    } catch (error) {
      console.error('❌ Error completing quiz:', error);
      return { pointsEarned: 0, coinsEarned: 0, percentage: 0 };
    }
  };

  const addCoins = async (amount, reason = 'Reward') => {
    if (!user?.uid) return;

    try {
      await dbAddCoins(user.uid, amount, reason);
      console.log(`✅ Added ${amount} coins`);
    } catch (error) {
      console.error('❌ Error adding coins:', error);
    }
  };

  const addSticker = async (stickerData) => {
    if (!user?.uid) return;

    try {
      await dbAwardSticker(user.uid, stickerData);
      console.log(`✅ Sticker awarded: ${stickerData.name}`);
    } catch (error) {
      console.error('❌ Error adding sticker:', error);
    }
  };

  const addBadge = async (badgeData) => {
    if (!user?.uid) return;

    try {
      await dbAwardBadge(user.uid, badgeData);
      console.log(`✅ Badge awarded: ${badgeData.name}`);
    } catch (error) {
      console.error('❌ Error adding badge:', error);
    }
  };

  const addAchievement = async (achievement) => {
    if (!user?.uid) return;

    const newAchievements = [...(userProgress.achievements || [])];
    if (!newAchievements.find(a => a.id === achievement.id)) {
      newAchievements.push({
        ...achievement,
        unlockedAt: new Date().toISOString(),
      });
      
      setUserProgress(prev => ({
        ...prev,
        achievements: newAchievements
      }));
    }
  };

  const value = {
    userProgress,
    studentProfile,
    isLoading,
    updateProgress,
    completeLesson,
    completeQuiz,
    addAchievement,
    addCoins,
    addSticker,
    addBadge,
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};