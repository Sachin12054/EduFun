import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../contexts/UserProgressContext';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { userProgress } = useUserProgress();

  const statsData = [
    {
      title: 'Total Points',
      value: userProgress.totalPoints || 0,
      icon: 'star',
      color: '#FF6B6B',
      change: '+12',
    },
    {
      title: 'Lessons Completed',
      value: userProgress.completedLessons?.length || 0,
      icon: 'book',
      color: '#4ECDC4',
      change: '+3',
    },
    {
      title: 'Quizzes Completed',
      value: userProgress.completedQuizzes?.length || 0,
      icon: 'help-circle',
      color: '#45B7D1',
      change: '+1',
    },
    {
      title: 'Current Streak',
      value: userProgress.currentStreak || 0,
      icon: 'flame',
      color: '#96CEB4',
      change: '+1',
    },
  ];

  const subjectProgress = Object.entries(userProgress.subjectProgress || {}).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    lessons: value.lessons || 0,
    quizzes: value.quizzes || 0,
    points: value.points || 0,
  }));

  const achievements = userProgress.achievements || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Dashboard</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📊 Overview</Text>
          <View style={styles.statsGrid}>
            {statsData.map((stat, index) => (
              <View key={index} style={[styles.statCard, { backgroundColor: theme.surface }]}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                <Text style={[styles.statTitle, { color: theme.textSecondary }]}>{stat.title}</Text>
                <Text style={[styles.statChange, { color: theme.success }]}>{stat.change}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Subject Progress */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📚 Subject Progress</Text>
          {subjectProgress.map((subject, index) => (
            <View key={index} style={[styles.subjectCard, { backgroundColor: theme.surface }]}>
              <Text style={[styles.subjectName, { color: theme.text }]}>{subject.name}</Text>
              <View style={styles.subjectStats}>
                <View style={styles.subjectStat}>
                  <Text style={[styles.subjectStatValue, { color: theme.primary }]}>{subject.lessons}</Text>
                  <Text style={[styles.subjectStatLabel, { color: theme.textSecondary }]}>Lessons</Text>
                </View>
                <View style={styles.subjectStat}>
                  <Text style={[styles.subjectStatValue, { color: theme.primary }]}>{subject.quizzes}</Text>
                  <Text style={[styles.subjectStatLabel, { color: theme.textSecondary }]}>Quizzes</Text>
                </View>
                <View style={styles.subjectStat}>
                  <Text style={[styles.subjectStatValue, { color: theme.primary }]}>{subject.points}</Text>
                  <Text style={[styles.subjectStatLabel, { color: theme.textSecondary }]}>Points</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🏆 Recent Achievements</Text>
          {achievements.length > 0 ? (
            achievements.slice(0, 5).map((achievement, index) => (
              <View key={index} style={[styles.achievementCard, { backgroundColor: theme.surface }]}>
                <View style={[styles.achievementIcon, { backgroundColor: theme.warning + '20' }]}>
                  <Ionicons name="trophy" size={20} color={theme.warning} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={[styles.achievementTitle, { color: theme.text }]}>{achievement.title}</Text>
                  <Text style={[styles.achievementDate, { color: theme.textSecondary }]}>
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
              <Ionicons name="trophy-outline" size={48} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Complete lessons and quizzes to earn achievements!
              </Text>
            </View>
          )}
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
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  subjectCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subjectStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subjectStat: {
    alignItems: 'center',
  },
  subjectStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subjectStatLabel: {
    fontSize: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
  },
  emptyState: {
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DashboardScreen;