import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getStudentDocument,
  updateStudentProgress,
  markLessonComplete,
  saveQuizResult,
  subscribeToStudentProgress,
  updateLeaderboard,
  createStudentDocument
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
  const { user, userProfile, isStudent } = useAuth();
  
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
    if (user?.uid && isStudent && userProfile) {
      loadStudentData();
      
      // Subscribe to real-time updates
      const unsubscribeProgress = subscribeToStudentProgress(user.uid, handleProgressUpdate);

      return () => {
        if (unsubscribeProgress) unsubscribeProgress();
      };
    } else {
      setIsLoading(false);
    }
  }, [user, userProfile, isStudent]);

  const loadStudentData = async () => {
    if (!user?.uid || !isStudent) return;

    try {
      setIsLoading(true);
      
      // Load student document which includes both profile and progress
      let studentDoc = await getStudentDocument(user.uid);
      if (!studentDoc) {
        // Create student document if doesn't exist
        studentDoc = await createStudentDocument(user.uid, {
          name: userProfile?.name || user.displayName || 'Student',
          email: user.email || '',
          studentId: userProfile?.studentId || `STU${Date.now()}`
        });
      }
      
      // Set progress from the student document
      if (studentDoc?.progress) {
        setUserProgress({
          ...studentDoc.progress,
          coins: studentDoc.progress.totalCoins || 0,
          completedQuizzes: studentDoc.progress.completedQuizzes || []
        });
      }

    } catch (error) {
      console.error('❌ Error loading student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgressUpdate = (updatedStudentDoc) => {
    if (updatedStudentDoc?.progress) {
      setUserProgress({
        ...updatedStudentDoc.progress,
        coins: updatedStudentDoc.progress.totalCoins || 0,
        completedQuizzes: updatedStudentDoc.progress.completedQuizzes || []
      });

      // Update leaderboard when progress changes
      if (user?.uid) {
        updateLeaderboard(user.uid, {
          name: updatedStudentDoc.name,
          avatar: updatedStudentDoc.profile?.avatar || '👦',
          grade: updatedStudentDoc.profile?.grade || 1,
          progress: updatedStudentDoc.progress
        });
      }
    }
  };

  const initializeUserProgress = async () => {
    if (!user?.uid || !isStudent) return;
    
    try {
      // The progress is initialized when creating student document
      await loadStudentData();
    } catch (error) {
      console.error('❌ Error initializing progress:', error);
    }
  };

  const updateProgress = async (updates) => {
    if (!user?.uid || !isStudent) return;
    
    try {
      await updateStudentProgress(user.uid, updates);
    } catch (error) {
      console.error('❌ Error updating progress:', error);
    }
  };

  const completeLesson = async (subject, lessonId, points = 10, grade = 1, lessonTitle = '') => {
    if (!user?.uid || !isStudent) return;

    try {
      const result = await markLessonComplete(user.uid, {
        subject,
        grade,
        lessonId,
        lessonTitle,
        points
      });

      console.log(`✅ Lesson completed: ${lessonTitle}`);
      return result;
    } catch (error) {
      console.error('❌ Error completing lesson:', error);
      return { success: false };
    }
  };

  const completeQuiz = async (subject, quizId, score, maxScore, grade = 1, quizTitle = '') => {
    if (!user?.uid || !isStudent) return;

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
    if (!user?.uid || !isStudent) return;

    try {
      await updateStudentProgress(user.uid, {
        totalCoins: userProgress.totalCoins + amount
      });
      console.log(`✅ Added ${amount} coins`);
    } catch (error) {
      console.error('❌ Error adding coins:', error);
    }
  };

  const addSticker = async (stickerData) => {
    if (!user?.uid || !isStudent) return;

    try {
      const currentStickers = userProgress.stickers || [];
      await updateStudentProgress(user.uid, {
        stickers: [...currentStickers, { ...stickerData, earnedAt: new Date().toISOString() }]
      });
      console.log(`✅ Sticker awarded: ${stickerData.name}`);
    } catch (error) {
      console.error('❌ Error adding sticker:', error);
    }
  };

  const addBadge = async (badgeData) => {
    if (!user?.uid || !isStudent) return;

    try {
      const currentBadges = userProgress.badges || [];
      await updateStudentProgress(user.uid, {
        badges: [...currentBadges, { ...badgeData, earnedAt: new Date().toISOString() }]
      });
      console.log(`✅ Badge awarded: ${badgeData.name}`);
    } catch (error) {
      console.error('❌ Error adding badge:', error);
    }
  };

  const addAchievement = async (achievement) => {
    if (!user?.uid || !isStudent) return;

    try {
      const currentAchievements = userProgress.achievements || [];
      if (!currentAchievements.find(a => a.id === achievement.id)) {
        await updateStudentProgress(user.uid, {
          achievements: [...currentAchievements, {
            ...achievement,
            unlockedAt: new Date().toISOString(),
          }]
        });
        console.log(`✅ Achievement unlocked: ${achievement.name}`);
      }
    } catch (error) {
      console.error('❌ Error adding achievement:', error);
    }
  };

  const value = {
    userProgress,
    isLoading,
    updateProgress,
    completeLesson,
    completeQuiz,
    addAchievement,
    addCoins,
    addSticker,
    addBadge,
    initializeUserProgress,
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};