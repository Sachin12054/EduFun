import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../config/firebase';
import { createStudentDocument, createTeacherDocument } from '../services/database';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);
          await loadUserProfile(user.uid);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        console.error('Auth state change error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserProfile = async (uid) => {
    try {
      // First check in students collection
      let userDoc = await getDoc(doc(db, 'students', uid));
      if (userDoc.exists()) {
        const userData = { ...userDoc.data(), userType: 'student' };
        setUserProfile(userData);
        console.log('✅ Student profile loaded:', userData.name);
        return;
      }

      // Then check in teachers collection
      userDoc = await getDoc(doc(db, 'teachers', uid));
      if (userDoc.exists()) {
        const userData = { ...userDoc.data(), userType: 'teacher' };
        setUserProfile(userData);
        console.log('✅ Teacher profile loaded:', userData.name);
        return;
      }

      // Fallback to users collection (old data)
      userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile(userData);
        console.log('⚠️  Legacy user profile loaded:', userData.name);
      } else {
        console.log('❌ No user profile found for UID:', uid);
      }
    } catch (err) {
      console.error('❌ Error loading user profile:', err);
    }
  };

  const signup = async (email, password, profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚀 Starting signup for:', profileData.userType, email);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('✅ Firebase user created:', user.uid);

      // Create user document using database service
      let userProfile;
      if (profileData.userType === 'student') {
        userProfile = await createStudentDocument(user.uid, {
          name: profileData.name,
          email: user.email,
          studentId: profileData.studentId,
          ...profileData
        });
        console.log('✅ Student document created successfully');
      } else if (profileData.userType === 'teacher') {
        userProfile = await createTeacherDocument(user.uid, {
          name: profileData.name,
          email: user.email,
          employeeId: profileData.employeeId,
          department: profileData.department,
          qualification: profileData.qualification,
          ...profileData
        });
        console.log('✅ Teacher document created successfully');
      }

      setUserProfile(userProfile);
      
      return { success: true };
    } catch (err) {
      console.error('❌ Sign up error:', err);
      const errorMessage = err.message || 'Failed to create account';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, userType = null) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚀 Starting login for:', email, userType || 'auto-detect');
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('✅ Firebase authentication successful:', user.uid);

      // Load profile from appropriate collection
      await loadUserProfile(user.uid);
      
      return { success: true };
    } catch (err) {
      console.error('❌ Sign in error:', err);
      const errorMessage = err.message || 'Failed to sign in';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    if (!user || !userProfile) return { success: false, error: 'No user logged in' };

    try {
      const collection = userProfile.userType === 'student' ? 'students' : 'teachers';
      
      const updatedProfile = {
        ...userProfile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(doc(db, collection, user.uid), updatedProfile);
      setUserProfile(updatedProfile);
      return { success: true };
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Update student progress (only for students)
  const updateStudentProgress = async (progressData) => {
    if (!user || !userProfile || userProfile.userType !== 'student') {
      return { success: false, error: 'Not a student account' };
    }

    try {
      const updatedProgress = {
        ...userProfile.progress,
        ...progressData,
      };

      await updateProfile({ progress: updatedProgress });
      return { success: true };
    } catch (err) {
      console.error('Update progress error:', err);
      return { success: false, error: err.message };
    }
  };

  // Update teacher data (only for teachers)
  const updateTeacherData = async (teachingData) => {
    if (!user || !userProfile || userProfile.userType !== 'teacher') {
      return { success: false, error: 'Not a teacher account' };
    }

    try {
      const updatedTeachingData = {
        ...userProfile.teachingData,
        ...teachingData,
      };

      await updateProfile({ teachingData: updatedTeachingData });
      return { success: true };
    } catch (err) {
      console.error('Update teaching data error:', err);
      return { success: false, error: err.message };
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    signup,
    login,
    updateProfile,
    updateStudentProgress,
    updateTeacherData,
    logout,
    isAuthenticated: !!user,
    isStudent: userProfile?.userType === 'student',
    isTeacher: userProfile?.userType === 'teacher',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};