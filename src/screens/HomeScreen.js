import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../contexts/UserProgressContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { userProfile } = useAuth();
  const { theme } = useTheme();
  const { userProgress, isLoading } = useUserProgress();
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalLessons = subjects.reduce((sum, subject) => sum + subject.lessons, 0);
    const completedLessons = subjects.reduce((sum, subject) => sum + subject.completed, 0);
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };
  
  const subjects = [
    { 
      id: 'mathematics', 
      name: 'Mathematics', 
      icon: 'calculator', 
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E53'],
      description: 'Numbers & problem solving',
      lessons: 24,
      completed: userProgress.subjectProgress?.mathematics?.lessons || 0,
      difficulty: 'Intermediate',
      trending: true,
    },
    { 
      id: 'science', 
      name: 'Science', 
      icon: 'flask', 
      color: '#4ECDC4',
      gradient: ['#4ECDC4', '#44A08D'],
      description: 'Explore the world around us',
      lessons: 20,
      completed: userProgress.subjectProgress?.science?.lessons || 0,
      difficulty: 'Beginner',
      trending: false,
    },
    { 
      id: 'english', 
      name: 'English', 
      icon: 'book', 
      color: '#45B7D1',
      gradient: ['#45B7D1', '#4FACFE'],
      description: 'Language & literature',
      lessons: 18,
      completed: userProgress.subjectProgress?.english?.lessons || 0,
      difficulty: 'Beginner',
      trending: false,
    },
    { 
      id: 'history', 
      name: 'History', 
      icon: 'time', 
      color: '#96CEB4',
      gradient: ['#96CEB4', '#FFEAA7'],
      description: 'Stories from the past',
      lessons: 16,
      completed: userProgress.subjectProgress?.history?.lessons || 0,
      difficulty: 'Intermediate',
      trending: false,
    },
    { 
      id: 'geography', 
      name: 'Geography', 
      icon: 'globe', 
      color: '#FECA57',
      gradient: ['#FECA57', '#FD79A8'],
      description: 'Explore our planet',
      lessons: 14,
      completed: userProgress.subjectProgress?.geography?.lessons || 0,
      difficulty: 'Beginner',
      trending: true,
    },
    { 
      id: 'computer', 
      name: 'Computer Science', 
      icon: 'laptop', 
      color: '#A8E6CF',
      gradient: ['#A8E6CF', '#88D8B0'],
      description: 'Technology & coding',
      lessons: 22,
      completed: userProgress.subjectProgress?.computer?.lessons || 0,
      difficulty: 'Advanced',
      trending: true,
    },
  ];

  // Quick Actions Data
  const quickActions = [
    { id: 1, title: 'Daily Quiz', icon: 'bulb', color: '#667eea', screen: 'Dashboard' },
    { id: 2, title: 'Leaderboard', icon: 'trophy', color: '#f093fb', screen: 'Leaderboard' },
    { id: 3, title: 'Achievements', icon: 'ribbon', color: '#4facfe', screen: 'Profile' },
    { id: 4, title: 'Study Plan', icon: 'calendar', color: '#fa709a', screen: 'Dashboard' },
  ];

  // Featured Content
  const featuredContent = [
    {
      id: 1,
      title: 'Weekly Challenge',
      description: 'Complete 5 lessons this week',
      progress: 3,
      total: 5,
      color: '#667eea',
      icon: 'trophy-outline',
    },
    {
      id: 2,
      title: 'Daily Streak',
      description: 'Keep your learning streak alive',
      progress: userProgress.currentStreak || 0,
      total: 7,
      color: '#f093fb',
      icon: 'flame',
    },
  ];

  // Quick Action Card Component
  const QuickActionCard = ({ action }) => (
    <TouchableOpacity
      style={[styles.quickActionCard, { backgroundColor: theme.cardBackground }]}
      onPress={() => navigation.navigate(action.screen)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[action.color, action.color + 'dd']}
        style={styles.quickActionIcon}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={action.icon} size={22} color="white" />
      </LinearGradient>
      <Text style={[styles.quickActionText, { color: theme.text }]}>{action.title}</Text>
    </TouchableOpacity>
  );

  // Featured Card Component
  const FeaturedCard = ({ item }) => {
    const progress = (item.progress / item.total) * 100;
    return (
      <LinearGradient
        colors={[item.color, item.color + 'cc']}
        style={styles.featuredCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.featuredHeader}>
          <Ionicons name={item.icon} size={28} color="white" />
          <Text style={styles.featuredBadge}>{item.progress}/{item.total}</Text>
        </View>
        <Text style={styles.featuredTitle}>{item.title}</Text>
        <Text style={styles.featuredDescription}>{item.description}</Text>
        <View style={styles.featuredProgressBar}>
          <View style={[styles.featuredProgressFill, { width: `${progress}%` }]} />
        </View>
      </LinearGradient>
    );
  };

  const StatCard = ({ title, value, color, icon }) => (
    <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
      <LinearGradient
        colors={[color, color + 'dd']}
        style={styles.statIconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={icon} size={20} color="white" />
      </LinearGradient>
      <View style={styles.statContent}>
        <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
        <Text style={[styles.statTitle, { color: theme.textSecondary }]}>{title}</Text>
      </View>
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
        {/* Trending Badge */}
        {subject.trending && (
          <View style={styles.trendingBadge}>
            <Ionicons name="trending-up" size={12} color="white" />
            <Text style={styles.trendingText}>Trending</Text>
          </View>
        )}

        <LinearGradient
          colors={subject.gradient}
          style={styles.subjectIconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={subject.icon} size={32} color="white" />
        </LinearGradient>

        <Text style={[styles.subjectName, { color: theme.text }]}>{subject.name}</Text>
        <Text style={[styles.subjectDescription, { color: theme.textSecondary }]}>
          {subject.description}
        </Text>

        {/* Difficulty Badge */}
        <View style={[styles.difficultyBadge, { backgroundColor: theme.surface }]}>
          <Text style={[styles.difficultyText, { color: theme.textSecondary }]}>
            {subject.difficulty}
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>Progress</Text>
            <Text style={[styles.progressPercentage, { color: subject.color }]}>
              {progressPercentage}%
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <LinearGradient
              colors={subject.gradient}
              style={[styles.progressFill, { width: `${progressPercentage}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {subject.completed}/{subject.lessons} lessons completed
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.subjectButton, { backgroundColor: subject.color + '15' }]}
          onPress={() => navigation.navigate('Subject', { subjectId: subject.id, subject })}
        >
          <Text style={[styles.subjectButtonText, { color: subject.color }]}>
            {subject.completed > 0 ? 'Continue Learning' : 'Start Now'}
          </Text>
          <Ionicons name="arrow-forward" size={16} color={subject.color} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.openDrawer?.() || Alert.alert(
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
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>EduFun</Text>
            <Text style={styles.headerSubtitle}>Learning Made Fun</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => Alert.alert('Notifications', 'No new notifications')}
            >
              <Ionicons name="notifications-outline" size={22} color="white" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <View style={styles.profileCircle}>
                <Text style={styles.profileText}>
                  {userProfile?.firstName?.charAt(0) || 'S'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.primary]} />
        }
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Enhanced Welcome Section */}
          <LinearGradient
            colors={[theme.primary + 'ee', theme.secondary + 'ee']}
            style={styles.welcomeCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.welcomeContent}>
              <View>
                <Text style={styles.welcomeGreeting}>{getGreeting()},</Text>
                <Text style={styles.welcomeName}>
                  {userProfile?.firstName || 'Student'}! 👋
                </Text>
                <Text style={styles.welcomeSubtext}>
                  Ready to continue your learning journey?
                </Text>
              </View>
              <View style={styles.welcomeIconContainer}>
                <Ionicons name="school" size={50} color="rgba(255,255,255,0.3)" />
              </View>
            </View>

            {/* Overall Progress Indicator */}
            <View style={styles.overallProgressContainer}>
              <View style={styles.overallProgressHeader}>
                <Text style={styles.overallProgressLabel}>Overall Progress</Text>
                <Text style={styles.overallProgressValue}>{calculateOverallProgress()}%</Text>
              </View>
              <View style={styles.overallProgressBar}>
                <View style={[styles.overallProgressFill, { width: `${calculateOverallProgress()}%` }]} />
              </View>
            </View>
          </LinearGradient>

          {/* Quick Actions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>⚡ Quick Actions</Text>
            </View>
            <View style={styles.quickActionsContainer}>
              {quickActions.map((action) => (
                <QuickActionCard key={action.id} action={action} />
              ))}
            </View>
          </View>

          {/* Featured Challenges */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>🎯 Featured Challenges</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Text style={[styles.seeAllText, { color: theme.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContainer}
            >
              {featuredContent.map((item) => (
                <FeaturedCard key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>

          {/* Enhanced Stats Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>📊 Your Stats</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Text style={[styles.seeAllText, { color: theme.primary }]}>View Details</Text>
              </TouchableOpacity>
            </View>
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
                title="Completed" 
                value={userProgress.completedLessons?.length || 0} 
                color="#45B7D1"
                icon="checkmark-circle"
              />
              <StatCard 
                title="Day Streak" 
                value={userProgress.currentStreak || 0} 
                color="#FECA57"
                icon="flame"
              />
            </View>
          </View>

          {/* Subjects Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>📚 Subjects</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Subjects')}>
                <Text style={[styles.seeAllText, { color: theme.primary }]}>Browse All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.subjectsContainer}>
              {subjects.map((subject, index) => (
                <SubjectCard key={index} subject={subject} />
              ))}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 30 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 2,
  },
  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
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
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeGreeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  welcomeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 2,
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
    maxWidth: '80%',
  },
  welcomeIconContainer: {
    opacity: 0.6,
  },
  overallProgressContainer: {
    marginTop: 8,
  },
  overallProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  overallProgressLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  overallProgressValue: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  overallProgressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  featuredContainer: {
    paddingRight: 20,
  },
  featuredCard: {
    width: width * 0.7,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  featuredProgressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  featuredProgressFill: {
    height: 6,
    backgroundColor: 'white',
    borderRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subjectCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    position: 'relative',
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 1,
  },
  trendingText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  subjectIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subjectDescription: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  difficultyBadge: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    textAlign: 'center',
  },
  subjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  subjectButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default HomeScreen;