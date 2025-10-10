import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { SUBJECTS_DATA } from '../data/subjectsData';

const SubjectsScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { userProgress } = useUserProgress();
  const grade = route.params?.grade || 1; // Default to grade 1

  const subjects = Object.values(SUBJECTS_DATA).map(subject => ({
    ...subject,
    progress: calculateSubjectProgress(subject.id, grade),
  }));

  function calculateSubjectProgress(subjectId, grade) {
    const subjectData = SUBJECTS_DATA[subjectId];
    const gradeData = subjectData?.grades?.[grade];
    
    if (!gradeData) return { completed: 0, total: 0, percentage: 0 };
    
    const totalLessons = gradeData.lessons?.length || 0;
    const completedLessons = userProgress.completedLessons?.filter(
      lesson => lesson.startsWith(`${subjectId}_grade${grade}`)
    ).length || 0;
    
    return {
      completed: completedLessons,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };
  }

  const handleSubjectPress = (subject) => {
    navigation.navigate('Subject', {
      subjectId: subject.id,
      subject: subject,
      grade: grade,
    });
  };

  const SubjectCard = ({ subject }) => {
    const progress = subject.progress;
    
    return (
      <TouchableOpacity 
        style={[styles.subjectCard, { backgroundColor: theme.surface }]}
        onPress={() => handleSubjectPress(subject)}
      >
        <LinearGradient
          colors={[subject.color, subject.color + 'DD']}
          style={styles.subjectGradient}
        >
          <View style={styles.subjectHeader}>
            <Text style={styles.subjectIcon}>{subject.icon === 'book' ? '📚' : 
                                               subject.icon === 'calculator' ? '🔢' : 
                                               subject.icon === 'flask' ? '🔬' : 
                                               subject.icon === 'people' ? '🌍' : 
                                               subject.icon === 'bulb' ? '💡' : '📖'}</Text>
            {progress.completed > 0 && (
              <View style={styles.completionBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              </View>
            )}
          </View>
          
          <View style={styles.subjectContent}>
            <Text style={styles.subjectName}>{subject.name}</Text>
            <Text style={styles.subjectDescription}>{subject.description}</Text>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  {progress.completed}/{progress.total} lessons
                </Text>
                <Text style={styles.progressPercentage}>{progress.percentage}%</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { width: `${progress.percentage}%`, backgroundColor: '#4CAF50' }
                  ]}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>My Subjects 📚</Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Grade {grade} • Choose a subject to learn
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🪙</Text>
            <Text style={[styles.statText, { color: theme.text }]}>
              {userProgress.coins || 0}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={[styles.statText, { color: theme.text }]}>
              {userProgress.totalPoints || 0}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subjectsContainer}>
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerContent: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  statText: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  subjectCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  subjectGradient: {
    padding: 16,
    minHeight: 180,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  subjectIcon: {
    fontSize: 36,
  },
  completionBadge: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 2,
  },
  subjectContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subjectDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 'auto',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '700',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
});

export default SubjectsScreen;