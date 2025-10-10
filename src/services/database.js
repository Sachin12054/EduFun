import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  increment,
  arrayUnion,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore';

// ==================== STUDENT PROFILE OPERATIONS ====================

/**
 * Create a new student profile
 * Path: Students/{studentId}/Profile
 */
export const createStudentProfile = async (studentId, profileData) => {
  try {
    const profileRef = doc(db, 'Students', studentId, 'Profile', 'details');
    
    const studentProfile = {
      studentId,
      name: profileData.name || '',
      email: profileData.email || '',
      grade: profileData.grade || 1,
      avatar: profileData.avatar || '👦',
      dateOfBirth: profileData.dateOfBirth || null,
      parentName: profileData.parentName || '',
      parentContact: profileData.parentContact || '',
      schoolName: profileData.schoolName || '',
      rollNumber: profileData.rollNumber || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true
    };

    await setDoc(profileRef, studentProfile);
    console.log('✅ Student profile created successfully');
    return studentProfile;
  } catch (error) {
    console.error('❌ Error creating student profile:', error);
    throw error;
  }
};

/**
 * Get student profile
 * Path: Students/{studentId}/Profile/details
 */
export const getStudentProfile = async (studentId) => {
  try {
    const profileRef = doc(db, 'Students', studentId, 'Profile', 'details');
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      console.log('No profile found for student:', studentId);
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting student profile:', error);
    throw error;
  }
};

/**
 * Update student profile
 */
export const updateStudentProfile = async (studentId, updates) => {
  try {
    const profileRef = doc(db, 'Students', studentId, 'Profile', 'details');
    
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };

    await updateDoc(profileRef, updateData);
    console.log('✅ Student profile updated successfully');
    return updateData;
  } catch (error) {
    console.error('❌ Error updating student profile:', error);
    throw error;
  }
};

// ==================== STUDENT PROGRESS OPERATIONS ====================

/**
 * Initialize student progress
 * Path: Students/{studentId}/Progress/stats
 */
export const initializeStudentProgress = async (studentId) => {
  try {
    const progressRef = doc(db, 'Students', studentId, 'Progress', 'stats');
    
    const initialProgress = {
      studentId,
      totalPoints: 0,
      totalCoins: 0,
      level: 1,
      completedLessons: [],
      quizResults: {},
      badges: [],
      stickers: [],
      subjectProgress: {
        english: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
        maths: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
        science: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
        social: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
        gk: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 }
      },
      lastActivityDate: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(progressRef, initialProgress);
    console.log('✅ Student progress initialized');
    return initialProgress;
  } catch (error) {
    console.error('❌ Error initializing student progress:', error);
    throw error;
  }
};

/**
 * Get student progress
 */
export const getStudentProgress = async (studentId) => {
  try {
    const progressRef = doc(db, 'Students', studentId, 'Progress', 'stats');
    const progressSnap = await getDoc(progressRef);
    
    if (progressSnap.exists()) {
      return progressSnap.data();
    } else {
      console.log('No progress found, initializing...');
      return await initializeStudentProgress(studentId);
    }
  } catch (error) {
    console.error('❌ Error getting student progress:', error);
    throw error;
  }
};

/**
 * Update lesson completion
 */
export const markLessonComplete = async (studentId, lessonData) => {
  try {
    const progressRef = doc(db, 'Students', studentId, 'Progress', 'stats');
    const lessonKey = `${lessonData.subject}_${lessonData.grade}_${lessonData.lessonId}`;
    
    await updateDoc(progressRef, {
      completedLessons: arrayUnion(lessonKey),
      totalPoints: increment(lessonData.points || 10),
      totalCoins: increment(5),
      [`subjectProgress.${lessonData.subject}.lessonsCompleted`]: increment(1),
      [`subjectProgress.${lessonData.subject}.points`]: increment(lessonData.points || 10),
      lastActivityDate: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Log activity
    await logLearningActivity(studentId, {
      type: 'lesson_completed',
      subject: lessonData.subject,
      grade: lessonData.grade,
      lessonId: lessonData.lessonId,
      lessonTitle: lessonData.lessonTitle,
      pointsEarned: lessonData.points || 10,
      coinsEarned: 5
    });

    console.log('✅ Lesson marked complete');
    return { success: true, pointsEarned: lessonData.points || 10, coinsEarned: 5 };
  } catch (error) {
    console.error('❌ Error marking lesson complete:', error);
    throw error;
  }
};

/**
 * Update quiz completion
 */
export const saveQuizResult = async (studentId, quizData) => {
  try {
    const progressRef = doc(db, 'Students', studentId, 'Progress', 'stats');
    const quizKey = `${quizData.subject}_${quizData.grade}_${quizData.quizId}`;
    
    const quizResult = {
      score: quizData.score,
      totalQuestions: quizData.totalQuestions,
      correctAnswers: quizData.correctAnswers,
      pointsEarned: quizData.pointsEarned,
      coinsEarned: quizData.coinsEarned,
      completedAt: serverTimestamp()
    };

    await updateDoc(progressRef, {
      [`quizResults.${quizKey}`]: quizResult,
      totalPoints: increment(quizData.pointsEarned),
      totalCoins: increment(quizData.coinsEarned),
      [`subjectProgress.${quizData.subject}.quizzesCompleted`]: increment(1),
      [`subjectProgress.${quizData.subject}.points`]: increment(quizData.pointsEarned),
      lastActivityDate: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Log activity
    await logLearningActivity(studentId, {
      type: 'quiz_completed',
      subject: quizData.subject,
      grade: quizData.grade,
      quizId: quizData.quizId,
      quizTitle: quizData.quizTitle,
      score: quizData.score,
      correctAnswers: quizData.correctAnswers,
      totalQuestions: quizData.totalQuestions,
      pointsEarned: quizData.pointsEarned,
      coinsEarned: quizData.coinsEarned
    });

    console.log('✅ Quiz result saved');
    return { success: true };
  } catch (error) {
    console.error('❌ Error saving quiz result:', error);
    throw error;
  }
};

/**
 * Add coins to student
 */
export const addCoins = async (studentId, amount, reason = 'Reward') => {
  try {
    const progressRef = doc(db, 'Students', studentId, 'Progress', 'stats');
    
    await updateDoc(progressRef, {
      totalCoins: increment(amount),
      updatedAt: serverTimestamp()
    });

    // Log transaction
    await logCoinTransaction(studentId, {
      amount,
      reason,
      type: 'earned'
    });

    console.log(`✅ Added ${amount} coins`);
    return { success: true, coinsAdded: amount };
  } catch (error) {
    console.error('❌ Error adding coins:', error);
    throw error;
  }
};

/**
 * Add badge to student
 */
export const awardBadge = async (studentId, badgeData) => {
  try {
    const progressRef = doc(db, 'Students', studentId, 'Progress', 'stats');
    
    const badge = {
      id: badgeData.id,
      name: badgeData.name,
      icon: badgeData.icon,
      earnedAt: serverTimestamp()
    };

    await updateDoc(progressRef, {
      badges: arrayUnion(badge),
      updatedAt: serverTimestamp()
    });

    // Log activity
    await logLearningActivity(studentId, {
      type: 'badge_earned',
      badgeId: badgeData.id,
      badgeName: badgeData.name,
      badgeIcon: badgeData.icon
    });

    console.log(`✅ Badge awarded: ${badgeData.name}`);
    return { success: true, badge };
  } catch (error) {
    console.error('❌ Error awarding badge:', error);
    throw error;
  }
};

/**
 * Add sticker to student collection
 */
export const awardSticker = async (studentId, stickerData) => {
  try {
    const progressRef = doc(db, 'Students', studentId, 'Progress', 'stats');
    
    const sticker = {
      id: stickerData.id,
      name: stickerData.name,
      emoji: stickerData.emoji,
      earnedAt: serverTimestamp()
    };

    await updateDoc(progressRef, {
      stickers: arrayUnion(sticker),
      updatedAt: serverTimestamp()
    });

    // Log activity
    await logLearningActivity(studentId, {
      type: 'sticker_earned',
      stickerId: stickerData.id,
      stickerName: stickerData.name,
      stickerEmoji: stickerData.emoji
    });

    console.log(`✅ Sticker awarded: ${stickerData.name}`);
    return { success: true, sticker };
  } catch (error) {
    console.error('❌ Error awarding sticker:', error);
    throw error;
  }
};

// ==================== LEARNING ACTIVITY LOG ====================

/**
 * Log learning activity
 * Path: Students/{studentId}/LearningHistory/{activityId}
 */
export const logLearningActivity = async (studentId, activityData) => {
  try {
    const activityRef = doc(collection(db, 'Students', studentId, 'LearningHistory'));
    
    const activity = {
      ...activityData,
      timestamp: serverTimestamp(),
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };

    await setDoc(activityRef, activity);
    console.log('✅ Activity logged');
  } catch (error) {
    console.error('❌ Error logging activity:', error);
    // Don't throw - logging is not critical
  }
};

/**
 * Get learning history
 */
export const getLearningHistory = async (studentId, limitCount = 20) => {
  try {
    const historyRef = collection(db, 'Students', studentId, 'LearningHistory');
    const q = query(historyRef, orderBy('timestamp', 'desc'), limit(limitCount));
    
    const querySnapshot = await getDocs(q);
    const activities = [];
    
    querySnapshot.forEach((doc) => {
      activities.push({ id: doc.id, ...doc.data() });
    });

    return activities;
  } catch (error) {
    console.error('❌ Error getting learning history:', error);
    return [];
  }
};

// ==================== COIN TRANSACTIONS ====================

/**
 * Log coin transaction
 * Path: Students/{studentId}/CoinTransactions/{transactionId}
 */
export const logCoinTransaction = async (studentId, transactionData) => {
  try {
    const transactionRef = doc(collection(db, 'Students', studentId, 'CoinTransactions'));
    
    const transaction = {
      amount: transactionData.amount,
      reason: transactionData.reason,
      type: transactionData.type, // 'earned' or 'spent'
      timestamp: serverTimestamp(),
      date: new Date().toISOString().split('T')[0]
    };

    await setDoc(transactionRef, transaction);
    console.log('✅ Coin transaction logged');
  } catch (error) {
    console.error('❌ Error logging transaction:', error);
  }
};

/**
 * Get coin transaction history
 */
export const getCoinTransactions = async (studentId, limitCount = 50) => {
  try {
    const transactionsRef = collection(db, 'Students', studentId, 'CoinTransactions');
    const q = query(transactionsRef, orderBy('timestamp', 'desc'), limit(limitCount));
    
    const querySnapshot = await getDocs(q);
    const transactions = [];
    
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });

    return transactions;
  } catch (error) {
    console.error('❌ Error getting transactions:', error);
    return [];
  }
};

// ==================== LEADERBOARD ====================

/**
 * Update leaderboard entry
 * Path: Leaderboard/{grade}/Students/{studentId}
 */
export const updateLeaderboard = async (studentId, studentData) => {
  try {
    const leaderboardRef = doc(db, 'Leaderboard', `grade${studentData.grade}`, 'Students', studentId);
    
    const leaderboardEntry = {
      studentId,
      name: studentData.name,
      avatar: studentData.avatar || '👦',
      totalPoints: studentData.totalPoints,
      totalCoins: studentData.totalCoins,
      badges: studentData.badges?.length || 0,
      grade: studentData.grade,
      updatedAt: serverTimestamp()
    };

    await setDoc(leaderboardRef, leaderboardEntry, { merge: true });
    console.log('✅ Leaderboard updated');
  } catch (error) {
    console.error('❌ Error updating leaderboard:', error);
  }
};

/**
 * Get leaderboard for a grade
 */
export const getLeaderboard = async (grade, limitCount = 10) => {
  try {
    const leaderboardRef = collection(db, 'Leaderboard', `grade${grade}`, 'Students');
    const q = query(leaderboardRef, orderBy('totalPoints', 'desc'), limit(limitCount));
    
    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    
    querySnapshot.forEach((doc, index) => {
      leaderboard.push({ 
        rank: index + 1,
        id: doc.id, 
        ...doc.data() 
      });
    });

    return leaderboard;
  } catch (error) {
    console.error('❌ Error getting leaderboard:', error);
    return [];
  }
};

// ==================== REAL-TIME LISTENERS ====================

/**
 * Listen to student progress changes
 */
export const subscribeToStudentProgress = (studentId, callback) => {
  const progressRef = doc(db, 'Students', studentId, 'Progress', 'stats');
  
  const unsubscribe = onSnapshot(progressRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  }, (error) => {
    console.error('❌ Error in progress listener:', error);
  });

  return unsubscribe;
};

/**
 * Listen to student profile changes
 */
export const subscribeToStudentProfile = (studentId, callback) => {
  const profileRef = doc(db, 'Students', studentId, 'Profile', 'details');
  
  const unsubscribe = onSnapshot(profileRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  }, (error) => {
    console.error('❌ Error in profile listener:', error);
  });

  return unsubscribe;
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get complete student data
 */
export const getCompleteStudentData = async (studentId) => {
  try {
    const [profile, progress] = await Promise.all([
      getStudentProfile(studentId),
      getStudentProgress(studentId)
    ]);

    return {
      profile,
      progress
    };
  } catch (error) {
    console.error('❌ Error getting complete student data:', error);
    throw error;
  }
};

/**
 * Check if lesson is completed
 */
export const isLessonCompleted = (completedLessons, subject, grade, lessonId) => {
  const lessonKey = `${subject}_${grade}_${lessonId}`;
  return completedLessons?.includes(lessonKey) || false;
};

/**
 * Calculate subject completion percentage
 */
export const calculateSubjectCompletion = (subjectProgress, totalLessons, totalQuizzes) => {
  const lessonsCompleted = subjectProgress?.lessonsCompleted || 0;
  const quizzesCompleted = subjectProgress?.quizzesCompleted || 0;
  
  const totalItems = totalLessons + totalQuizzes;
  const completedItems = lessonsCompleted + quizzesCompleted;
  
  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
};
