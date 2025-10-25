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

// ==================== UTILITY FUNCTIONS ====================

/**
 * Generate a unique student ID in format STU01-STD{NN}
 */
const generateStudentId = async () => {
  try {
    // Get all students to determine the next number
    const studentsQuery = query(collection(db, 'students'), orderBy('createdAt', 'desc'), limit(1));
    const querySnapshot = await getDocs(studentsQuery);
    
    let nextNumber = 1;
    if (!querySnapshot.empty) {
      const lastStudent = querySnapshot.docs[0].data();
      if (lastStudent.studentId && lastStudent.studentId.includes('STU01-STD')) {
        const lastNumber = parseInt(lastStudent.studentId.split('STU01-STD')[1]) || 0;
        nextNumber = lastNumber + 1;
      }
    }
    
    // Format as STU01-STD{NN} with zero padding
    const formattedNumber = nextNumber.toString().padStart(2, '0');
    return `STU01-STD${formattedNumber}`;
  } catch (error) {
    console.error('Error generating student ID:', error);
    // Fallback to timestamp-based ID
    return `STU01-STD${Date.now().toString().slice(-2)}`;
  }
};

// ==================== STUDENT OPERATIONS ====================

/**
 * Create a new student document
 * Path: students/{studentId}
 */
export const createStudentDocument = async (studentId, studentData) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    
    // Generate a unique student ID if not provided
    const generatedStudentId = studentData.studentId || await generateStudentId();
    
    const student = {
      uid: studentId,
      name: studentData.name || '',
      email: studentData.email || '',
      studentId: generatedStudentId,
      userType: 'student',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      profile: {
        avatar: '👦',
        grade: studentData.grade || null, // Don't set default grade - let user select
        dateOfBirth: null,
        parentName: '',
        parentContact: '',
        schoolName: '',
        rollNumber: '',
      },
      progress: {
        totalPoints: 0,
        totalCoins: 0,
        level: 1,
        completedLessons: [],
        completedCourses: 0,
        badges: [],
        subjectProgress: {
          english: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
          maths: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
          science: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
          social: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 },
          gk: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 }
        },
        lastActivityDate: serverTimestamp(),
      }
    };

    await setDoc(studentRef, student);
    console.log('✅ Student document created successfully');
    return student;
  } catch (error) {
    console.error('❌ Error creating student document:', error);
    throw error;
  }
};

/**
 * Get student document
 */
export const getStudentDocument = async (studentId) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    const studentSnap = await getDoc(studentRef);
    
    if (studentSnap.exists()) {
      return studentSnap.data();
    } else {
      console.log('No student found:', studentId);
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting student document:', error);
    throw error;
  }
};

/**
 * Update student progress
 */
export const updateStudentProgress = async (studentId, progressUpdates) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    
    const updateData = {};
    Object.keys(progressUpdates).forEach(key => {
      updateData[`progress.${key}`] = progressUpdates[key];
    });
    updateData.updatedAt = serverTimestamp();

    await updateDoc(studentRef, updateData);
    console.log('✅ Student progress updated successfully');
    return updateData;
  } catch (error) {
    console.error('❌ Error updating student progress:', error);
    throw error;
  }
};

/**
 * Mark lesson as completed for student
 */
export const markLessonComplete = async (studentId, lessonData) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    const lessonKey = `${lessonData.subject}_grade${lessonData.grade}_lesson_${lessonData.lessonId}`;
    
    await updateDoc(studentRef, {
      'progress.completedLessons': arrayUnion(lessonKey),
      'progress.totalPoints': increment(lessonData.points || 10),
      'progress.totalCoins': increment(5),
      [`progress.subjectProgress.${lessonData.subject}.lessonsCompleted`]: increment(1),
      [`progress.subjectProgress.${lessonData.subject}.points`]: increment(lessonData.points || 10),
      'progress.lastActivityDate': serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    console.log('✅ Lesson marked complete');
    return { success: true, pointsEarned: lessonData.points || 10, coinsEarned: 5 };
  } catch (error) {
    console.error('❌ Error marking lesson complete:', error);
    throw error;
  }
};

/**
 * Save quiz result for student
 */
export const saveQuizResult = async (studentId, quizData) => {
  try {
    const studentRef = doc(db, 'students', studentId);
    const quizKey = `${quizData.subject}_grade${quizData.grade}_quiz_${quizData.quizId}`;
    
    const quizResult = {
      score: quizData.score,
      totalQuestions: quizData.totalQuestions,
      correctAnswers: quizData.correctAnswers,
      pointsEarned: quizData.pointsEarned,
      coinsEarned: quizData.coinsEarned,
      completedAt: serverTimestamp()
    };

    await updateDoc(studentRef, {
      [`progress.quizResults.${quizKey}`]: quizResult,
      'progress.totalPoints': increment(quizData.pointsEarned),
      'progress.totalCoins': increment(quizData.coinsEarned),
      [`progress.subjectProgress.${quizData.subject}.quizzesCompleted`]: increment(1),
      [`progress.subjectProgress.${quizData.subject}.points`]: increment(quizData.pointsEarned),
      'progress.lastActivityDate': serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    console.log('✅ Quiz result saved');
    return { success: true };
  } catch (error) {
    console.error('❌ Error saving quiz result:', error);
    throw error;
  }
};

// ==================== TEACHER OPERATIONS ====================

/**
 * Create a new teacher document
 * Path: teachers/{teacherId}
 */
export const createTeacherDocument = async (teacherId, teacherData) => {
  try {
    const teacherRef = doc(db, 'teachers', teacherId);
    
    const teacher = {
      uid: teacherId,
      name: teacherData.name || '',
      email: teacherData.email || '',
      employeeId: teacherData.employeeId || `TEA${Date.now()}`,
      department: teacherData.department || '',
      qualification: teacherData.qualification || '',
      userType: 'teacher',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      profile: {
        avatar: '👩‍🏫',
        bio: '',
        experience: '',
        expertise: [],
        contactNumber: '',
      },
      teachingData: {
        coursesCreated: 0,
        studentsEnrolled: 0,
        totalRating: 0,
        reviews: [],
        subjects: teacherData.department ? [teacherData.department.toLowerCase()] : [],
        achievements: [],
        totalLessonsCreated: 0,
        totalQuizzesCreated: 0,
      }
    };

    await setDoc(teacherRef, teacher);
    console.log('✅ Teacher document created successfully');
    return teacher;
  } catch (error) {
    console.error('❌ Error creating teacher document:', error);
    throw error;
  }
};

/**
 * Get teacher document
 */
export const getTeacherDocument = async (teacherId) => {
  try {
    const teacherRef = doc(db, 'teachers', teacherId);
    const teacherSnap = await getDoc(teacherRef);
    
    if (teacherSnap.exists()) {
      return teacherSnap.data();
    } else {
      console.log('No teacher found:', teacherId);
      return null;
    }
  } catch (error) {
    console.error('❌ Error getting teacher document:', error);
    throw error;
  }
};

/**
 * Update teacher data
 */
export const updateTeacherData = async (teacherId, dataUpdates) => {
  try {
    const teacherRef = doc(db, 'teachers', teacherId);
    
    const updateData = {};
    Object.keys(dataUpdates).forEach(key => {
      updateData[`teachingData.${key}`] = dataUpdates[key];
    });
    updateData.updatedAt = serverTimestamp();

    await updateDoc(teacherRef, updateData);
    console.log('✅ Teacher data updated successfully');
    return updateData;
  } catch (error) {
    console.error('❌ Error updating teacher data:', error);
    throw error;
  }
};

// ==================== LEGACY COMPATIBILITY ====================

// Keep old function names for backward compatibility
export const createStudentProfile = createStudentDocument;
export const getStudentProfile = getStudentDocument;
export const updateStudentProfile = async (studentId, updates) => {
  try {
    const profileUpdates = {};
    
    // Handle grade specially (it's a top-level field in profile)
    if (updates.grade !== undefined) {
      profileUpdates['profile.grade'] = updates.grade;
    }
    if (updates.gradeTitle !== undefined) {
      profileUpdates['profile.gradeTitle'] = updates.gradeTitle;
    }
    
    // Handle other profile updates
    Object.keys(updates).forEach(key => {
      if (key !== 'grade' && key !== 'gradeTitle') {
        profileUpdates[`profile.${key}`] = updates[key];
      }
    });
    
    profileUpdates.updatedAt = serverTimestamp();
    
    await updateDoc(doc(db, 'students', studentId), profileUpdates);
    console.log('✅ Student profile updated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error updating student profile:', error);
    throw error;
  }
};

export const getStudentProgress = async (studentId) => {
  const student = await getStudentDocument(studentId);
  return student?.progress || null;
};

export const initializeStudentProgress = async (studentId) => {
  // Progress is initialized when creating student document
  const student = await getStudentDocument(studentId);
  return student?.progress || null;
};

// ==================== LEADERBOARD ====================

/**
 * Update leaderboard entry
 */
export const updateLeaderboard = async (studentId, studentData) => {
  try {
    const leaderboardRef = doc(db, 'leaderboard', studentId);
    
    const leaderboardEntry = {
      studentId,
      name: studentData.name,
      avatar: studentData.profile?.avatar || '👦',
      totalPoints: studentData.progress?.totalPoints || 0,
      totalCoins: studentData.progress?.totalCoins || 0,
      badges: studentData.progress?.badges?.length || 0,
      grade: studentData.profile?.grade || 1,
      updatedAt: serverTimestamp()
    };

    await setDoc(leaderboardRef, leaderboardEntry, { merge: true });
    console.log('✅ Leaderboard updated');
  } catch (error) {
    console.error('❌ Error updating leaderboard:', error);
  }
};

/**
 * Get leaderboard
 */
export const getLeaderboard = async (grade = null, limitCount = 10) => {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    let q = query(leaderboardRef, orderBy('totalPoints', 'desc'), limit(limitCount));
    
    if (grade) {
      q = query(leaderboardRef, where('grade', '==', grade), orderBy('totalPoints', 'desc'), limit(limitCount));
    }
    
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
 * Listen to student changes
 */
export const subscribeToStudentProgress = (studentId, callback) => {
  const studentRef = doc(db, 'students', studentId);
  
  const unsubscribe = onSnapshot(studentRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().progress);
    }
  }, (error) => {
    console.error('❌ Error in student listener:', error);
  });

  return unsubscribe;
};

/**
 * Listen to teacher changes
 */
export const subscribeToTeacherData = (teacherId, callback) => {
  const teacherRef = doc(db, 'teachers', teacherId);
  
  const unsubscribe = onSnapshot(teacherRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  }, (error) => {
    console.error('❌ Error in teacher listener:', error);
  });

  return unsubscribe;
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Check if lesson is completed
 */
export const isLessonCompleted = (completedLessons, subject, grade, lessonId) => {
  const lessonKey = `${subject}_grade${grade}_lesson_${lessonId}`;
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
