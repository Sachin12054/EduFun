import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);
          
          // Get user data from backend API
          try {
            const token = await user.getIdToken();
            await AsyncStorage.setItem('token', token);
            
            const response = await api.get('/auth/me');
            if (response.data) {
              setUserData(response.data);
            }
            
            // Get user stats
            const statsResponse = await api.get('/auth/stats');
            if (statsResponse.data) {
              setUserStats(statsResponse.data);
            }
          } catch (apiError) {
            console.error('Error fetching user data:', apiError);
          }
        } else {
          setCurrentUser(null);
          setUserData(null);
          setUserStats(null);
          await AsyncStorage.removeItem('token');
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

  // Refresh user data
  const refreshUserData = async () => {
    if (currentUser) {
      try {
        const response = await api.get('/auth/me');
        if (response.data) {
          setUserData(response.data);
        }
        
        const statsResponse = await api.get('/auth/stats');
        if (statsResponse.data) {
          setUserStats(statsResponse.data);
        }
      } catch (err) {
        console.error('Refresh user data error:', err);
        setError(err.message);
      }
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('token');
      setCurrentUser(null);
      setUserData(null);
      setUserStats(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    }
  };

  const value = {
    currentUser,
    userData,
    userStats,
    loading,
    error,
    refreshUserData,
    logout,
    isAuthenticated: !!currentUser,
    isAdmin: userData?.role === 'admin',
    isStudent: userData?.role === 'student'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};