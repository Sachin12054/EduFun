import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../contexts/UserProgressContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { userProfile } = useAuth();
  const { theme } = useTheme();
  const { userProgress, isLoading } = useUserProgress();
  
  const subjects = [
    { 
      id: 'mathematics', 
      name: 'Mathematics', 
      icon: 'calculator', 
      color: '#FF6B6B', 
      description: 'Numbers & problem solving',
      lessons: 24,
      completed: userProgress.subjectProgress?.mathematics?.lessons || 0,
    },
    { 
      id: 'science', 
      name: 'Science', 
      icon: 'flask', 
      color: '#4ECDC4', 
      description: 'Explore the world around us',
      lessons: 20,
      completed: userProgress.subjectProgress?.science?.lessons || 0,
    },
    { 
      id: 'english', 
      name: 'English', 
      icon: 'book', 
      color: '#45B7D1', 
      description: 'Language & literature',
      lessons: 18,
      completed: userProgress.subjectProgress?.english?.lessons || 0,
    },
    { 
      id: 'history', 
      name: 'History', 
      icon: 'time', 
      color: '#96CEB4', 
      description: 'Stories from the past',
      lessons: 16,
      completed: userProgress.subjectProgress?.history?.lessons || 0,
    },
    { 
      id: 'geography', 
      name: 'Geography', 
      icon: 'globe', 
      color: '#FECA57', 
      description: 'Explore our planet',
      lessons: 14,
      completed: userProgress.subjectProgress?.geography?.lessons || 0,
    },
    { 
      id: 'computer', 
      name: 'Computer Science', 
      icon: 'laptop', 
      color: '#A8E6CF', 
      description: 'Technology & coding',
      lessons: 22,
      completed: userProgress.subjectProgress?.computer?.lessons || 0,
    },
  ];

  const StatCard = ({ title, value, color, icon }) => (
    <View style={[styles.statCard, { borderLeftColor: color, backgroundColor: theme.cardBackground }]}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statTitle, { color: theme.textSecondary }]}>{title}</Text>
    </View>
  );

  const SubjectCard = ({ subject }) => {
    const progress = subject.completed / subject.lessons;
    const progressPercentage = Math.round(progress * 100);

    return (
      <TouchableOpacity 
        style={[
          styles.subjectCard, 
          { 
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }
        ]}
        onPress={() => navigation.navigate('Subject', { subjectId: subject.id, subject })}
        activeOpacity={0.8}
      >
        <View style={[styles.subjectIconContainer, { backgroundColor: subject.color }]}>
          <Ionicons name={subject.icon} size={30} color="white" />
        </View>
        <Text style={[styles.subjectName, { color: theme.text }]}>{subject.name}</Text>
        <Text style={[styles.subjectDescription, { color: theme.textSecondary }]}>
          {subject.description}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { backgroundColor: subject.color, width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {subject.completed}/{subject.lessons} lessons
          </Text>
        </View>

        <View style={styles.subjectFooter}>
          <Text style={[styles.startButton, { color: subject.color }]}>
            {subject.completed > 0 ? 'Continue' : 'Start Learning'}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={subject.color} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => Alert.alert(
            'Menu',
            'Navigate to:',
            [
              { text: 'Dashboard', onPress: () => navigation.navigate('Dashboard') },
              { text: 'Leaderboard', onPress: () => navigation.navigate('Leaderboard') },
              { text: 'Help Center', onPress: () => navigation.navigate('HelpCenter') },
              { text: 'Cancel', style: 'cancel' },
            ]
          )}
        >
          <Ionicons name="menu" size={24} color={theme.text} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>EduFun</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={[styles.profileCircle, { backgroundColor: theme.primary }]}>
            <Text style={styles.profileText}>
              {userProfile?.firstName?.charAt(0) || 'S'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <LinearGradient
          colors={[theme.primary, theme.secondary]}
          style={styles.welcomeCard}
        >
          <Text style={styles.welcomeText}>
            Hi, {userProfile?.firstName || 'Student'}! 🌟
          </Text>
          <Text style={styles.welcomeSubtext}>Ready to learn something awesome today?</Text>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📊 Your Progress</Text>
          <View style={styles.statsContainer}>
            <StatCard 
              title="Total Points" 
              value={userProgress.totalPoints || 0} 
              color="#FF6B6B"
              icon="star"
            />
            <StatCard 
              title="Achievements" 
              value={userProgress.achievements?.length || 0} 
              color="#4ECDC4"
              icon="trophy"
            />
            <StatCard 
              title="Lessons" 
              value={userProgress.completedLessons?.length || 0} 
              color="#45B7D1"
              icon="book"
            />
            <StatCard 
              title="Current Streak" 
              value={userProgress.currentStreak || 0} 
              color="#96CEB4"
              icon="flame"
            />
          </View>
        </View>

        {/* Subjects Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📚 Subjects</Text>
          <View style={styles.subjectsContainer}>
            {subjects.map((subject, index) => (
              <SubjectCard key={index} subject={subject} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 4,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeCard: {
    borderRadius: 20,
    padding: 25,
    marginVertical: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    borderRadius: 15,
    padding: 18,
    width: '48%',
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subjectCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
  },
  subjectIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subjectDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    textAlign: 'center',
  },
  subjectFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButton: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default HomeScreen;