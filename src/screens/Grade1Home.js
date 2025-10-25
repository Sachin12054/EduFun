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

const Grade1Home = ({ navigation }) => {
  const { userProfile, isStudent } = useAuth();
  const { theme } = useTheme();
  const { userProgress, isLoading: progressLoading } = useUserProgress();
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [shimmerAnim] = useState(new Animated.Value(0));
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    // Redirect if not a student
    if (userProfile && !isStudent) {
      navigation.replace('TeacherDashboard');
      return;
    }

    // Start shimmer animation for loading state
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerAnimation.start();

    // Set a maximum loading time of 3 seconds
    const loadingTimeout = setTimeout(() => {
      setScreenLoading(false);
      console.log('⏰ Screen loading timeout - showing content anyway');
    }, 3000);

    // Start page load animation
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

    // Stop loading when userProfile is available (basic requirement)
    if (userProfile) {
      const profileTimeout = setTimeout(() => {
        setScreenLoading(false);
        console.log('✅ Profile loaded - showing content');
      }, 1000); // 1 second delay to show skeleton briefly
      
      return () => {
        clearTimeout(profileTimeout);
        clearTimeout(loadingTimeout);
        shimmerAnimation.stop();
      };
    }

    return () => {
      clearTimeout(loadingTimeout);
      shimmerAnimation.stop();
    };
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

  // Grade 1 specific subjects - simplified and age-appropriate
  const subjects = [
    { 
      id: 'maths', 
      name: 'Numbers & Counting', 
      icon: 'calculator', 
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E53'],
      description: 'Learn to count 1-20',
      lessons: 15,
      completed: userProgress?.subjectProgress?.maths?.lessonsCompleted || 0,
      difficulty: 'Beginner',
      trending: true,
    },
    { 
      id: 'english', 
      name: 'ABC & Words', 
      icon: 'book', 
      color: '#45B7D1',
      gradient: ['#45B7D1', '#4FACFE'],
      description: 'Letters, sounds & simple words',
      lessons: 12,
      completed: userProgress?.subjectProgress?.english?.lessonsCompleted || 0,
      difficulty: 'Beginner',
      trending: false,
    },
    { 
      id: 'science', 
      name: 'My World', 
      icon: 'flower', 
      color: '#4ECDC4',
      gradient: ['#4ECDC4', '#44A08D'],
      description: 'Animals, plants & colors',
      lessons: 10,
      completed: userProgress?.subjectProgress?.science?.lessonsCompleted || 0,
      difficulty: 'Beginner',
      trending: false,
    },
    { 
      id: 'art', 
      name: 'Fun Drawing', 
      icon: 'brush', 
      color: '#FECA57',
      gradient: ['#FECA57', '#FD79A8'],
      description: 'Colors, shapes & drawing',
      lessons: 8,
      completed: userProgress?.subjectProgress?.art?.lessonsCompleted || 0,
      difficulty: 'Beginner',
      trending: true,
    },
  ];

  // Grade 1 Quick Actions - fun and simple
  const quickActions = [
    { id: 1, title: 'Fun Games', icon: 'game-controller', color: '#667eea', screen: 'Dashboard' },
    { id: 2, title: 'Story Time', icon: 'book', color: '#f093fb', screen: 'Dashboard' },
    { id: 3, title: 'Star Chart', icon: 'star', color: '#4facfe', screen: 'Profile' },
    { id: 4, title: 'My Progress', icon: 'trophy', color: '#fa709a', screen: 'Dashboard' },
  ];

  // Grade 1 Featured Content
  const featuredContent = [
    {
      id: 1,
      title: '🌟 Learn Your Numbers',
      description: 'Count from 1 to 10 with fun activities',
      image: '🔢',
      color: '#FF6B6B',
      difficulty: 'Easy',
      time: '5 min',
    },
    {
      id: 2,
      title: '🎨 Color Fun',
      description: 'Learn red, blue, yellow & green',
      image: '🎨',
      color: '#4ECDC4',
      difficulty: 'Easy',
      time: '3 min',
    },
    {
      id: 3,
      title: '📚 ABC Song',
      description: 'Sing and learn the alphabet',
      image: '🎵',
      color: '#45B7D1',
      difficulty: 'Easy',
      time: '4 min',
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

  // Shimmer component for loading animation
  const ShimmerView = ({ style, children }) => (
    <Animated.View style={[style, { opacity: shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }) }]}>
      {children}
    </Animated.View>
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Skeleton */}
        <View style={styles.skeletonHeader}>
          <LinearGradient
            colors={[theme.primary + '60', theme.secondary + '60']}
            style={styles.skeletonHeaderGradient}
          >
            <View style={styles.skeletonHeaderContent}>
              <View style={styles.skeletonGreeting}>
                <ShimmerView style={[styles.skeletonText, styles.skeletonGreetingText, { backgroundColor: 'rgba(255,255,255,0.4)' }]} />
                <ShimmerView style={[styles.skeletonText, styles.skeletonNameText, { backgroundColor: 'rgba(255,255,255,0.5)' }]} />
                <ShimmerView style={[styles.skeletonText, styles.skeletonGradeText, { backgroundColor: 'rgba(255,255,255,0.3)' }]} />
              </View>
              <ShimmerView style={[styles.skeletonAvatar, { backgroundColor: 'rgba(255,255,255,0.4)' }]} />
            </View>
            <View style={[styles.skeletonStats, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <View style={styles.skeletonStatItem}>
                <ShimmerView style={[styles.skeletonText, styles.skeletonStatNumber, { backgroundColor: 'rgba(255,255,255,0.4)' }]} />
                <ShimmerView style={[styles.skeletonText, styles.skeletonStatLabel, { backgroundColor: 'rgba(255,255,255,0.3)' }]} />
              </View>
              <View style={styles.skeletonStatItem}>
                <ShimmerView style={[styles.skeletonText, styles.skeletonStatNumber, { backgroundColor: 'rgba(255,255,255,0.4)' }]} />
                <ShimmerView style={[styles.skeletonText, styles.skeletonStatLabel, { backgroundColor: 'rgba(255,255,255,0.3)' }]} />
              </View>
              <View style={styles.skeletonStatItem}>
                <ShimmerView style={[styles.skeletonText, styles.skeletonStatNumber, { backgroundColor: 'rgba(255,255,255,0.4)' }]} />
                <ShimmerView style={[styles.skeletonText, styles.skeletonStatLabel, { backgroundColor: 'rgba(255,255,255,0.3)' }]} />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions Skeleton */}
        <View style={styles.skeletonSection}>
          <ShimmerView style={[styles.skeletonSectionTitle, { backgroundColor: theme.primary + '30' }]} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.skeletonQuickActions}>
            {[1, 2, 3, 4].map((item, index) => (
              <ShimmerView 
                key={item} 
                style={[
                  styles.skeletonQuickAction, 
                  { backgroundColor: ['#667eea40', '#4facfe40', '#fa709a40', '#f093fb40'][index] }
                ]} 
              />
            ))}
          </ScrollView>
        </View>

        {/* Subjects Skeleton */}
        <View style={styles.skeletonSection}>
          <ShimmerView style={[styles.skeletonSectionTitle, { backgroundColor: theme.primary + '30' }]} />
          <View style={styles.skeletonSubjectsGrid}>
            {[1, 2, 3, 4].map((item, index) => (
              <View 
                key={item} 
                style={[
                  styles.skeletonSubjectCard, 
                  { backgroundColor: ['#FF6B6B20', '#45B7D120', '#4ECDC420', '#FECA5720'][index] }
                ]}
              >
                <ShimmerView style={[styles.skeletonSubjectIcon, { backgroundColor: ['#FF6B6B40', '#45B7D140', '#4ECDC440', '#FECA5740'][index] }]} />
                <ShimmerView style={[styles.skeletonText, styles.skeletonSubjectTitle, { backgroundColor: ['#FF6B6B50', '#45B7D150', '#4ECDC450', '#FECA5750'][index] }]} />
                <ShimmerView style={[styles.skeletonText, styles.skeletonSubjectDesc, { backgroundColor: ['#FF6B6B30', '#45B7D130', '#4ECDC430', '#FECA5730'][index] }]} />
                <ShimmerView style={[styles.skeletonProgressBar, { backgroundColor: ['#FF6B6B40', '#45B7D140', '#4ECDC440', '#FECA5740'][index] }]} />
              </View>
            ))}
          </View>
        </View>

        {/* Featured Content Skeleton */}
        <View style={styles.skeletonSection}>
          <ShimmerView style={[styles.skeletonSectionTitle, { backgroundColor: theme.primary + '30' }]} />
          {[1, 2, 3].map((item, index) => (
            <View 
              key={item} 
              style={[
                styles.skeletonFeaturedCard, 
                { backgroundColor: ['#FF6B6B15', '#4ECDC415', '#45B7D115'][index] }
              ]}
            >
              <ShimmerView style={[styles.skeletonFeaturedEmoji, { backgroundColor: ['#FF6B6B40', '#4ECDC440', '#45B7D140'][index] }]} />
              <View style={styles.skeletonFeaturedInfo}>
                <ShimmerView style={[styles.skeletonText, styles.skeletonFeaturedTitle, { backgroundColor: ['#FF6B6B50', '#4ECDC450', '#45B7D150'][index] }]} />
                <ShimmerView style={[styles.skeletonText, styles.skeletonFeaturedDesc, { backgroundColor: ['#FF6B6B30', '#4ECDC430', '#45B7D130'][index] }]} />
                <View style={styles.skeletonFeaturedMeta}>
                  <ShimmerView style={[styles.skeletonTag, { backgroundColor: ['#FF6B6B30', '#4ECDC430', '#45B7D130'][index] }]} />
                  <ShimmerView style={[styles.skeletonTime, { backgroundColor: ['#FF6B6B30', '#4ECDC430', '#45B7D130'][index] }]} />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );

  if (screenLoading || !userProfile) {
    return <LoadingSkeleton />;
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
                  {userProfile?.name || 'Young Learner'}
                </Text>
                <Text style={styles.gradeText}>Grade 1 • First Steps in Learning</Text>
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
                    {userProfile?.profile?.avatar || '👦'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Stats Overview for Grade 1 */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {userProgress?.totalPoints || 0}
                </Text>
                <Text style={styles.statLabel}>⭐ Stars</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {calculateOverallProgress()}%
                </Text>
                <Text style={styles.statLabel}>📚 Done</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {userProgress?.level || 1}
                </Text>
                <Text style={styles.statLabel}>🎯 Level</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions for Grade 1 */}
        <Animated.View 
          style={[
            styles.section,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🎮 Quick Fun</Text>
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

        {/* Subjects for Grade 1 */}
        <Animated.View 
          style={[
            styles.section,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📖 My Subjects</Text>
          <View style={styles.subjectsGrid}>
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </View>
        </Animated.View>

        {/* Featured Content for Grade 1 */}
        <Animated.View 
          style={[
            styles.section,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🌟 Today's Fun</Text>
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
  // Skeleton Loading Styles
  skeletonHeader: {
    marginBottom: 20,
  },
  skeletonHeaderGradient: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  skeletonHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  skeletonGreeting: {
    flex: 1,
  },
  skeletonText: {
    borderRadius: 6,
    marginBottom: 8,
  },
  skeletonGreetingText: {
    height: 18,
    width: '60%',
  },
  skeletonNameText: {
    height: 28,
    width: '80%',
  },
  skeletonGradeText: {
    height: 14,
    width: '70%',
  },
  skeletonAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  skeletonStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
    paddingVertical: 20,
  },
  skeletonStatItem: {
    alignItems: 'center',
  },
  skeletonStatNumber: {
    height: 24,
    width: 40,
  },
  skeletonStatLabel: {
    height: 12,
    width: 30,
    marginTop: 4,
  },
  skeletonSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  skeletonSectionTitle: {
    height: 22,
    width: '40%',
    borderRadius: 6,
    marginBottom: 15,
  },
  skeletonQuickActions: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  skeletonQuickAction: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 15,
  },
  skeletonSubjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeletonSubjectCard: {
    width: (width - 50) / 2,
    height: 180,
    marginBottom: 15,
    borderRadius: 20,
    padding: 20,
  },
  skeletonSubjectIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 15,
  },
  skeletonSubjectTitle: {
    height: 18,
    width: '80%',
    marginBottom: 6,
  },
  skeletonSubjectDesc: {
    height: 14,
    width: '90%',
    marginBottom: 15,
  },
  skeletonProgressBar: {
    height: 6,
    width: '100%',
    borderRadius: 3,
  },
  skeletonFeaturedCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: 'center',
  },
  skeletonFeaturedEmoji: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  skeletonFeaturedInfo: {
    flex: 1,
  },
  skeletonFeaturedTitle: {
    height: 18,
    width: '70%',
    marginBottom: 6,
  },
  skeletonFeaturedDesc: {
    height: 14,
    width: '90%',
    marginBottom: 10,
  },
  skeletonFeaturedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonTag: {
    height: 20,
    width: 60,
    borderRadius: 12,
  },
  skeletonTime: {
    height: 12,
    width: 40,
    borderRadius: 6,
  },
});

export default Grade1Home;