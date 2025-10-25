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

const Grade5Home = ({ navigation }) => {
  const { userProfile, isStudent } = useAuth();
  const { theme } = useTheme();
  const { userProgress, isLoading } = useUserProgress();
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    // Redirect if not a student
    if (userProfile && !isStudent) {
      navigation.replace('TeacherDashboard');
      return;
    }

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
  }, [userProfile, isStudent]);

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

  // Grade 5 specific subjects - preparing for middle school
  const subjects = [
    { 
      id: 'maths', 
      name: 'Pre-Algebra', 
      icon: 'calculator', 
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E53'],
      description: 'Equations & variables',
      lessons: 26,
      completed: userProgress?.progress?.subjectProgress?.maths?.lessonsCompleted || 0,
      difficulty: 'Expert',
      trending: true,
    },
    { 
      id: 'english', 
      name: 'Literature & Essays', 
      icon: 'library', 
      color: '#45B7D1',
      gradient: ['#45B7D1', '#4FACFE'],
      description: 'Critical thinking & analysis',
      lessons: 24,
      completed: userProgress?.progress?.subjectProgress?.english?.lessonsCompleted || 0,
      difficulty: 'Expert',
      trending: false,
    },
    { 
      id: 'science', 
      name: 'Earth & Space', 
      icon: 'planet', 
      color: '#4ECDC4',
      gradient: ['#4ECDC4', '#44A08D'],
      description: 'Solar system & geology',
      lessons: 22,
      completed: userProgress?.progress?.subjectProgress?.science?.lessonsCompleted || 0,
      difficulty: 'Expert',
      trending: true,
    },
    { 
      id: 'social', 
      name: 'American History', 
      icon: 'flag', 
      color: '#96CEB4',
      gradient: ['#96CEB4', '#FFEAA7'],
      description: 'Nation building & democracy',
      lessons: 20,
      completed: userProgress?.progress?.subjectProgress?.social?.lessonsCompleted || 0,
      difficulty: 'Expert',
      trending: false,
    },
  ];

  // Grade 5 Quick Actions
  const quickActions = [
    { id: 1, title: 'Final Project', icon: 'construct', color: '#667eea', screen: 'Dashboard' },
    { id: 2, title: 'Debate Club', icon: 'people', color: '#f093fb', screen: 'Dashboard' },
    { id: 3, title: 'Space Mission', icon: 'rocket', color: '#4facfe', screen: 'Dashboard' },
    { id: 4, title: 'History Timeline', icon: 'time', color: '#fa709a', screen: 'Dashboard' },
  ];

  // Grade 5 Featured Content
  const featuredContent = [
    {
      id: 1,
      title: '📐 Algebra Basics',
      description: 'Solve for X in simple equations',
      image: '🧮',
      color: '#FF6B6B',
      difficulty: 'Expert',
      time: '25 min',
    },
    {
      id: 2,
      title: '🪐 Solar System Journey',
      description: 'Explore planets and space',
      image: '🌌',
      color: '#4ECDC4',
      difficulty: 'Expert',
      time: '22 min',
    },
    {
      id: 3,
      title: '📜 Constitution Study',
      description: 'Learn about government & rights',
      image: '⚖️',
      color: '#96CEB4',
      difficulty: 'Expert',
      time: '20 min',
    },
  ];

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalLessons = subjects.reduce((sum, subject) => sum + subject.lessons, 0);
    const completedLessons = subjects.reduce((sum, subject) => sum + subject.completed, 0);
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const SubjectCard = ({ subject }) => (
    <TouchableOpacity
      style={[styles.subjectCard, { backgroundColor: theme.cardBackground }]}
      onPress={() => navigation.navigate('Subject', { subject })}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={subject.gradient}
        style={styles.subjectGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.subjectHeader}>
          <Ionicons name={subject.icon} size={28} color="white" />
          {subject.trending && (
            <View style={styles.trendingBadge}>
              <Text style={styles.trendingText}>🔥</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.subjectName}>{subject.name}</Text>
        <Text style={styles.subjectDescription}>{subject.description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${Math.round((subject.completed / subject.lessons) * 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {subject.completed}/{subject.lessons} lessons
          </Text>
        </View>
        
        <View style={styles.subjectFooter}>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{subject.difficulty}</Text>
          </View>
          <Ionicons name="play-circle" size={24} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const QuickActionCard = ({ action }) => (
    <TouchableOpacity
      style={[styles.quickActionCard, { backgroundColor: theme.cardBackground }]}
      onPress={() => navigation.navigate(action.screen)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[action.color, action.color + 'dd']}
        style={styles.quickActionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={action.icon} size={32} color="white" />
        <Text style={styles.quickActionTitle}>{action.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const FeaturedCard = ({ content }) => (
    <TouchableOpacity
      style={[styles.featuredCard, { backgroundColor: theme.cardBackground }]}
      activeOpacity={0.8}
    >
      <View style={styles.featuredContent}>
        <Text style={styles.featuredEmoji}>{content.image}</Text>
        <View style={styles.featuredInfo}>
          <Text style={[styles.featuredTitle, { color: theme.text }]}>{content.title}</Text>
          <Text style={[styles.featuredDescription, { color: theme.textSecondary }]}>
            {content.description}
          </Text>
          <View style={styles.featuredMeta}>
            <View style={[styles.difficultyTag, { backgroundColor: content.color + '20' }]}>
              <Text style={[styles.difficultyTagText, { color: content.color }]}>
                {content.difficulty}
              </Text>
            </View>
            <Text style={[styles.timeText, { color: theme.textSecondary }]}>
              {content.time}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          style={[
            styles.header,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerContent}>
              <View style={styles.greetingSection}>
                <Text style={styles.greeting}>{getGreeting()}! 👋</Text>
                <Text style={styles.userName}>
                  {userProfile?.name || 'Future Leader'}
                </Text>
                <Text style={styles.gradeText}>Grade 5 • Preparing for Middle School</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                  style={styles.profileGradient}
                >
                  <Text style={styles.profileEmoji}>
                    {userProfile?.profile?.avatar || '👨‍🎓'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Stats Overview for Grade 5 */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {userProgress?.progress?.totalPoints || 0}
                </Text>
                <Text style={styles.statLabel}>🏆 Achievement</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {calculateOverallProgress()}%
                </Text>
                <Text style={styles.statLabel}>📊 Excellence</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {userProgress?.progress?.level || 1}
                </Text>
                <Text style={styles.statLabel}>👑 Expert</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions for Grade 5 */}
        <Animated.View 
          style={[
            styles.section,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🎓 Expert Projects</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.quickActionsScroll}
          >
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} action={action} />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Subjects for Grade 5 */}
        <Animated.View 
          style={[
            styles.section,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📚 Advanced Curriculum</Text>
          <View style={styles.subjectsGrid}>
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </View>
        </Animated.View>

        {/* Featured Content for Grade 5 */}
        <Animated.View 
          style={[
            styles.section,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>💎 Master Classes</Text>
          <View style={styles.featuredContainer}>
            {featuredContent.map((content) => (
              <FeaturedCard key={content.id} content={content} />
            ))}
          </View>
        </Animated.View>

        {/* Footer Spacing */}
        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    marginBottom: 20,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  gradeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  quickActionsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  quickActionCard: {
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradient: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subjectCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subjectGradient: {
    padding: 20,
    minHeight: 180,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  trendingBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  trendingText: {
    fontSize: 12,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  subjectDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  subjectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  featuredContainer: {
    gap: 15,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuredContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  featuredEmoji: {
    fontSize: 40,
    marginRight: 20,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  featuredDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footerSpacing: {
    height: 100,
  },
});

export default Grade5Home;