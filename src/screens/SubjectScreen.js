import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../contexts/UserProgressContext';

const SubjectScreen = ({ route, navigation }) => {
  const { subjectId, subject } = route.params;
  const { theme } = useTheme();
  const { userProgress, completeLesson, completeQuiz } = useUserProgress();
  const [selectedTab, setSelectedTab] = useState('lessons');
  const [quizModalVisible, setQuizModalVisible] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  // Mock data for lessons and quizzes
  const lessons = [
    {
      id: 1,
      title: 'Introduction to ' + subject?.name,
      description: 'Learn the basics and fundamentals',
      duration: '15 min',
      difficulty: 'Beginner',
      completed: userProgress.completedLessons?.includes(`${subjectId}_lesson_1`) || false,
    },
    {
      id: 2,
      title: 'Core Concepts',
      description: 'Dive deeper into important concepts',
      duration: '20 min',
      difficulty: 'Intermediate',
      completed: userProgress.completedLessons?.includes(`${subjectId}_lesson_2`) || false,
    },
    {
      id: 3,
      title: 'Advanced Topics',
      description: 'Master advanced techniques',
      duration: '25 min',
      difficulty: 'Advanced',
      completed: userProgress.completedLessons?.includes(`${subjectId}_lesson_3`) || false,
    },
    {
      id: 4,
      title: 'Practical Applications',
      description: 'Apply your knowledge in real scenarios',
      duration: '30 min',
      difficulty: 'Expert',
      completed: userProgress.completedLessons?.includes(`${subjectId}_lesson_4`) || false,
    },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Basic Quiz',
      description: 'Test your basic understanding',
      questions: 5,
      timeLimit: '10 min',
      difficulty: 'Easy',
      questions_data: [
        {
          question: 'What is the main topic of this subject?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correct: 0,
        },
        {
          question: 'Which concept is most important?',
          options: ['Concept 1', 'Concept 2', 'Concept 3', 'Concept 4'],
          correct: 1,
        },
      ],
    },
    {
      id: 2,
      title: 'Intermediate Quiz',
      description: 'Challenge your knowledge',
      questions: 10,
      timeLimit: '15 min',
      difficulty: 'Medium',
      questions_data: [
        {
          question: 'Advanced question example?',
          options: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
          correct: 2,
        },
      ],
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
      case 'easy':
        return '#4ECDC4';
      case 'intermediate':
      case 'medium':
        return '#FECA57';
      case 'advanced':
      case 'hard':
        return '#FF6B6B';
      case 'expert':
        return '#A8E6CF';
      default:
        return theme.primary;
    }
  };

  const handleLessonPress = async (lesson) => {
    Alert.alert(
      lesson.title,
      `Are you ready to start this ${lesson.duration} lesson?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Learning',
          onPress: async () => {
            // Simulate lesson completion
            await completeLesson(subjectId, `${subjectId}_lesson_${lesson.id}`, 15);
            Alert.alert('Congratulations! 🎉', 'You completed the lesson and earned 15 points!');
          },
        },
      ]
    );
  };

  const handleQuizPress = (quiz) => {
    setCurrentQuiz(quiz);
    setQuizAnswers({});
    setQuizScore(null);
    setQuizModalVisible(true);
  };

  const handleQuizSubmit = async () => {
    if (!currentQuiz) return;

    let score = 0;
    currentQuiz.questions_data.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        score++;
      }
    });

    const percentage = Math.round((score / currentQuiz.questions_data.length) * 100);
    setQuizScore({ score, total: currentQuiz.questions_data.length, percentage });

    // Save quiz result
    await completeQuiz(subjectId, `${subjectId}_quiz_${currentQuiz.id}`, score, currentQuiz.questions_data.length);
  };

  const renderLesson = (lesson, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.contentCard, { backgroundColor: theme.surface }]}
      onPress={() => handleLessonPress(lesson)}
    >
      <View style={styles.contentHeader}>
        <View style={styles.contentInfo}>
          <Text style={[styles.contentTitle, { color: theme.text }]}>{lesson.title}</Text>
          <Text style={[styles.contentDescription, { color: theme.textSecondary }]}>
            {lesson.description}
          </Text>
        </View>
        {lesson.completed && (
          <View style={[styles.completedBadge, { backgroundColor: theme.success }]}>
            <Ionicons name="checkmark" size={16} color="white" />
          </View>
        )}
      </View>
      
      <View style={styles.contentFooter}>
        <View style={styles.contentMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>{lesson.duration}</Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(lesson.difficulty) }]}>
            <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
          </View>
        </View>
        <Ionicons 
          name={lesson.completed ? "checkmark-circle" : "play-circle"} 
          size={24} 
          color={lesson.completed ? theme.success : theme.primary} 
        />
      </View>
    </TouchableOpacity>
  );

  const renderQuiz = (quiz, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.contentCard, { backgroundColor: theme.surface }]}
      onPress={() => handleQuizPress(quiz)}
    >
      <View style={styles.contentHeader}>
        <View style={styles.contentInfo}>
          <Text style={[styles.contentTitle, { color: theme.text }]}>{quiz.title}</Text>
          <Text style={[styles.contentDescription, { color: theme.textSecondary }]}>
            {quiz.description}
          </Text>
        </View>
      </View>
      
      <View style={styles.contentFooter}>
        <View style={styles.contentMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="help-circle" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>{quiz.questions} questions</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>{quiz.timeLimit}</Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quiz.difficulty) }]}>
            <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[subject?.color || theme.primary, subject?.color || theme.secondary]}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{subject?.name || 'Subject'}</Text>
          <Text style={styles.headerSubtitle}>{subject?.description || 'Learn and grow'}</Text>
        </View>
        
        <View style={styles.headerIcon}>
          <Ionicons name={subject?.icon || 'book'} size={32} color="white" />
        </View>
      </LinearGradient>

      {/* Progress Bar */}
      <View style={[styles.progressSection, { backgroundColor: theme.surface }]}>
        <Text style={[styles.progressText, { color: theme.text }]}>
          Progress: {subject?.completed || 0}/{subject?.lessons || 0} lessons
        </Text>
        <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: subject?.color || theme.primary,
                width: `${subject?.lessons ? Math.round((subject.completed / subject.lessons) * 100) : 0}%`,
              }
            ]} 
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={[styles.tabContainer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'lessons' && { backgroundColor: theme.primary }]}
          onPress={() => setSelectedTab('lessons')}
        >
          <Text style={[styles.tabText, { color: selectedTab === 'lessons' ? 'white' : theme.text }]}>
            Lessons
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'quizzes' && { backgroundColor: theme.primary }]}
          onPress={() => setSelectedTab('quizzes')}
        >
          <Text style={[styles.tabText, { color: selectedTab === 'quizzes' ? 'white' : theme.text }]}>
            Quizzes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {selectedTab === 'lessons' ? (
          <View style={styles.contentList}>
            {lessons.map((lesson, index) => renderLesson(lesson, index))}
          </View>
        ) : (
          <View style={styles.contentList}>
            {quizzes.map((quiz, index) => renderQuiz(quiz, index))}
          </View>
        )}
      </ScrollView>

      {/* Quiz Modal */}
      <Modal visible={quizModalVisible} animationType="slide">
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: theme.surface }]}>
            <TouchableOpacity onPress={() => setQuizModalVisible(false)}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {currentQuiz?.title}
            </Text>
            <View style={{ width: 24 }} />
          </View>

          {quizScore ? (
            // Quiz Results
            <View style={styles.quizResults}>
              <Text style={[styles.scoreTitle, { color: theme.text }]}>Quiz Complete!</Text>
              <Text style={[styles.scoreText, { color: theme.primary }]}>
                {quizScore.score}/{quizScore.total} ({quizScore.percentage}%)
              </Text>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: theme.primary }]}
                onPress={() => setQuizModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Continue Learning</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Quiz Questions
            <ScrollView style={styles.quizContent}>
              {currentQuiz?.questions_data.map((question, qIndex) => (
                <View key={qIndex} style={[styles.questionCard, { backgroundColor: theme.surface }]}>
                  <Text style={[styles.questionText, { color: theme.text }]}>
                    {qIndex + 1}. {question.question}
                  </Text>
                  {question.options.map((option, oIndex) => (
                    <TouchableOpacity
                      key={oIndex}
                      style={[
                        styles.optionButton,
                        { borderColor: theme.border },
                        quizAnswers[qIndex] === oIndex && { backgroundColor: theme.primary, borderColor: theme.primary }
                      ]}
                      onPress={() => setQuizAnswers({ ...quizAnswers, [qIndex]: oIndex })}
                    >
                      <Text style={[
                        styles.optionText,
                        { color: quizAnswers[qIndex] === oIndex ? 'white' : theme.text }
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.primary }]}
                onPress={handleQuizSubmit}
              >
                <Text style={styles.submitButtonText}>Submit Quiz</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
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
    paddingVertical: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  headerIcon: {
    marginLeft: 16,
  },
  progressSection: {
    padding: 20,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 4,
    margin: 20,
    marginBottom: 0,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentList: {
    padding: 20,
  },
  contentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  contentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  // Quiz Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quizContent: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionButton: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  scoreTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 40,
  },
  closeButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubjectScreen;