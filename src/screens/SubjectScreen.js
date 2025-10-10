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
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { SUBJECTS_DATA, ENCOURAGEMENT_MESSAGES, STICKERS } from '../data/subjectsData';

const SubjectScreen = ({ route, navigation }) => {
  const { subjectId, subject, grade = 1 } = route.params;
  const { theme } = useTheme();
  const { userProgress, completeLesson, completeQuiz, addCoins, addSticker } = useUserProgress();
  const [selectedTab, setSelectedTab] = useState('lessons');
  const [quizModalVisible, setQuizModalVisible] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [confettiAnimation] = useState(new Animated.Value(0));
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [earnedSticker, setEarnedSticker] = useState(null);
  
  // Get subject data from our data file
  const subjectData = SUBJECTS_DATA[subjectId];
  const gradeData = subjectData?.grades?.[grade] || { lessons: [], quizzes: [] };
  const lessons = gradeData.lessons || [];
  const quizzes = gradeData.quizzes || [];

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

  const getRandomMessage = (type) => {
    const messages = ENCOURAGEMENT_MESSAGES[type] || [];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomSticker = () => {
    return STICKERS[Math.floor(Math.random() * STICKERS.length)];
  };

  const triggerConfetti = () => {
    Animated.sequence([
      Animated.timing(confettiAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(confettiAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLessonPress = (lesson) => {
    const lessonKey = `${subjectId}_grade${grade}_lesson_${lesson.id}`;
    const isCompleted = userProgress.completedLessons?.includes(lessonKey);

    Alert.alert(
      lesson.title,
      `${lesson.content}\n\nDuration: ${lesson.duration}\nPoints: ${lesson.points} 🌟`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: isCompleted ? 'Review Lesson 📖' : 'Start Learning 🚀',
          onPress: async () => {
            if (!isCompleted) {
              // Complete lesson with proper parameters: subject, lessonId, points, grade, lessonTitle
              await completeLesson(subjectId, lesson.id, lesson.points, grade, lesson.title);
              
              // Award coins (10% chance to get a sticker)
              const coins = lesson.points;
              await addCoins(coins, `Completed: ${lesson.title}`);
              
              const randomSticker = Math.random() < 0.1 ? getRandomSticker() : null;
              if (randomSticker) {
                await addSticker(randomSticker);
              }

              triggerConfetti();
              
              Alert.alert(
                getRandomMessage('completed'),
                `You earned ${coins} coins! 🪙${randomSticker ? `\n\nBonus! You got a ${randomSticker.name} ${randomSticker.emoji} sticker!` : ''}`,
                [{ text: 'Awesome! 🎉' }]
              );
            }
          },
        },
      ]
    );
  };

  const handleQuizPress = (quiz) => {
    setCurrentQuiz(quiz);
    setQuizAnswers({});
    setQuizScore(null);
    setCurrentQuestionIndex(0);
    setShowFeedback(false);
    setQuizModalVisible(true);
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const question = currentQuiz.questions[questionIndex];
    const correct = optionIndex === question.correct;
    
    setQuizAnswers({ ...quizAnswers, [questionIndex]: optionIndex });
    setIsCorrect(correct);
    setFeedbackMessage(getRandomMessage(correct ? 'correct' : 'incorrect'));
    setShowFeedback(true);

    if (correct) {
      triggerConfetti();
    }

    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      setShowFeedback(false);
      if (questionIndex < currentQuiz.questions.length - 1) {
        setCurrentQuestionIndex(questionIndex + 1);
      }
    }, 1500);
  };

  const handleQuizSubmit = async () => {
    if (!currentQuiz) return;

    let score = 0;
    currentQuiz.questions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        score++;
      }
    });

    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    const quizKey = `${subjectId}_grade${grade}_quiz_${currentQuiz.id}`;
    
    // Calculate coins based on performance
    const baseCoins = currentQuiz.points || 20;
    const coins = Math.round((score / currentQuiz.questions.length) * baseCoins);
    
    // Award sticker for perfect score
    let sticker = null;
    if (percentage === 100) {
      sticker = getRandomSticker();
      await addSticker(sticker);
    }

    setEarnedCoins(coins);
    setEarnedSticker(sticker);
    setQuizScore({ score, total: currentQuiz.questions.length, percentage });

    // Save quiz result with proper parameters: subject, quizId, score, maxScore, grade, quizTitle
    await completeQuiz(subjectId, currentQuiz.id, score, currentQuiz.questions.length, grade, currentQuiz.title);
    
    // Note: Coins are already added by completeQuiz function in the database

    if (percentage >= 80) {
      triggerConfetti();
    }
  };

  const renderLesson = (lesson, index) => {
    const lessonKey = `${subjectId}_grade${grade}_lesson_${lesson.id}`;
    const isCompleted = userProgress.completedLessons?.includes(lessonKey);

    return (
      <TouchableOpacity
        key={index}
        style={[styles.contentCard, { backgroundColor: theme.surface }]}
        onPress={() => handleLessonPress(lesson)}
      >
        <View style={styles.contentHeader}>
          <Text style={styles.lessonEmoji}>{lesson.image}</Text>
          <View style={styles.contentInfo}>
            <Text style={[styles.contentTitle, { color: theme.text }]}>{lesson.title}</Text>
            <Text style={[styles.contentDescription, { color: theme.textSecondary }]}>
              {lesson.description}
            </Text>
          </View>
          {isCompleted && (
            <View style={[styles.completedBadge, { backgroundColor: '#4CAF50' }]}>
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
            <View style={styles.metaItem}>
              <Text style={[styles.pointsBadge, { backgroundColor: '#FFC107' }]}>
                {lesson.points} 🪙
              </Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(lesson.difficulty) }]}>
              <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
            </View>
          </View>
          <Ionicons 
            name={isCompleted ? "checkmark-circle" : "play-circle"} 
            size={28} 
            color={isCompleted ? '#4CAF50' : subjectData?.color || theme.primary} 
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderQuiz = (quiz, index) => {
    const quizKey = `${subjectId}_grade${grade}_quiz_${quiz.id}`;
    const quizResult = userProgress.quizResults?.[quizKey];
    const isCompleted = !!quizResult;

    return (
      <TouchableOpacity
        key={index}
        style={[styles.contentCard, { backgroundColor: theme.surface }]}
        onPress={() => handleQuizPress(quiz)}
      >
        <View style={styles.contentHeader}>
          <Text style={styles.quizEmoji}>🎯</Text>
          <View style={styles.contentInfo}>
            <Text style={[styles.contentTitle, { color: theme.text }]}>{quiz.title}</Text>
            <Text style={[styles.contentDescription, { color: theme.textSecondary }]}>
              {quiz.description}
            </Text>
            {isCompleted && (
              <Text style={[styles.previousScore, { color: '#4CAF50' }]}>
                Best Score: {quizResult.score}/{quizResult.total} ({Math.round((quizResult.score / quizResult.total) * 100)}%)
              </Text>
            )}
          </View>
          {isCompleted && (
            <View style={[styles.completedBadge, { backgroundColor: '#4CAF50' }]}>
              <Ionicons name="trophy" size={16} color="white" />
            </View>
          )}
        </View>
        
        <View style={styles.contentFooter}>
          <View style={styles.contentMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="help-circle" size={14} color={theme.textSecondary} />
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                {quiz.questions?.length || 0} questions
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.pointsBadge, { backgroundColor: '#FFC107' }]}>
                {quiz.points || 20} 🪙
              </Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quiz.difficulty) }]}>
              <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-circle" size={28} color={subjectData?.color || theme.primary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[subjectData?.color || theme.primary, subjectData?.color || theme.secondary]}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{subjectData?.name || 'Subject'}</Text>
          <Text style={styles.headerSubtitle}>
            Grade {grade} • {subjectData?.description || 'Learn and grow'}
          </Text>
        </View>
        
        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>{subjectData?.icon ? '📚' : '📖'}</Text>
        </View>
      </LinearGradient>

      {/* Coins Display */}
      <View style={[styles.coinsContainer, { backgroundColor: theme.surface }]}>
        <View style={styles.coinsDisplay}>
          <Text style={styles.coinEmoji}>🪙</Text>
          <Text style={[styles.coinsText, { color: theme.text }]}>
            {userProgress.coins || 0} Coins
          </Text>
        </View>
        <View style={styles.coinsDisplay}>
          <Text style={styles.coinEmoji}>⭐</Text>
          <Text style={[styles.coinsText, { color: theme.text }]}>
            {userProgress.totalPoints || 0} Points
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressSection, { backgroundColor: theme.surface }]}>
        <Text style={[styles.progressText, { color: theme.text }]}>
          Progress: {userProgress.completedLessons?.filter(l => l.startsWith(`${subjectId}_grade${grade}`)).length || 0}/{lessons.length} lessons completed
        </Text>
        <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: subjectData?.color || theme.primary,
                width: `${lessons.length ? Math.round((userProgress.completedLessons?.filter(l => l.startsWith(`${subjectId}_grade${grade}`)).length || 0) / lessons.length * 100) : 0}%`,
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
          <LinearGradient
            colors={[subjectData?.color || theme.primary, subjectData?.color || theme.secondary]}
            style={styles.modalHeader}
          >
            <TouchableOpacity onPress={() => setQuizModalVisible(false)}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {currentQuiz?.title}
            </Text>
            <View style={{ width: 24 }} />
          </LinearGradient>

          {quizScore ? (
            // Quiz Results with enhanced feedback
            <View style={styles.quizResults}>
              <Animated.View
                style={{
                  opacity: confettiAnimation,
                  transform: [{
                    scale: confettiAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1.5],
                    }),
                  }],
                }}
              >
                <Text style={styles.resultEmoji}>
                  {quizScore.percentage >= 80 ? '🏆' : quizScore.percentage >= 60 ? '🌟' : '💪'}
                </Text>
              </Animated.View>
              
              <Text style={[styles.scoreTitle, { color: theme.text }]}>
                {quizScore.percentage >= 80 ? 'Excellent Work!' : quizScore.percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
              </Text>
              
              <Text style={[styles.scoreText, { color: subjectData?.color || theme.primary }]}>
                {quizScore.score}/{quizScore.total} ({quizScore.percentage}%)
              </Text>

              <View style={styles.rewardsContainer}>
                <View style={styles.rewardItem}>
                  <Text style={styles.rewardEmoji}>🪙</Text>
                  <Text style={[styles.rewardText, { color: theme.text }]}>
                    +{earnedCoins} Coins
                  </Text>
                </View>
                
                {earnedSticker && (
                  <View style={styles.rewardItem}>
                    <Text style={styles.rewardEmoji}>{earnedSticker.emoji}</Text>
                    <Text style={[styles.rewardText, { color: theme.text }]}>
                      New Sticker!
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: subjectData?.color || theme.primary }]}
                onPress={() => setQuizModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Continue Learning 🚀</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Quiz Questions with interactive feedback
            <ScrollView style={styles.quizContent}>
              {/* Progress Indicator */}
              <View style={styles.quizProgress}>
                <Text style={[styles.progressLabel, { color: theme.text }]}>
                  Question {currentQuestionIndex + 1} of {currentQuiz?.questions?.length || 0}
                </Text>
                <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
                  <View 
                    style={[
                      styles.progressFill,
                      { 
                        backgroundColor: subjectData?.color || theme.primary,
                        width: `${((currentQuestionIndex + 1) / (currentQuiz?.questions?.length || 1)) * 100}%`
                      }
                    ]}
                  />
                </View>
              </View>

              {currentQuiz?.questions?.map((question, qIndex) => {
                if (qIndex !== currentQuestionIndex && !quizAnswers[qIndex]) return null;
                
                return (
                  <View key={qIndex} style={[styles.questionCard, { backgroundColor: theme.surface }]}>
                    <View style={styles.questionHeader}>
                      <Text style={styles.questionEmoji}>{question.emoji || '❓'}</Text>
                      <Text style={[styles.questionText, { color: theme.text }]}>
                        {question.question}
                      </Text>
                    </View>
                    
                    {question.options.map((option, oIndex) => {
                      const isSelected = quizAnswers[qIndex] === oIndex;
                      const showCorrect = showFeedback && qIndex === currentQuestionIndex;
                      const isCorrectAnswer = oIndex === question.correct;
                      
                      return (
                        <TouchableOpacity
                          key={oIndex}
                          style={[
                            styles.optionButton,
                            { borderColor: theme.border },
                            isSelected && !showCorrect && { 
                              backgroundColor: subjectData?.color || theme.primary, 
                              borderColor: subjectData?.color || theme.primary 
                            },
                            showCorrect && isCorrectAnswer && { 
                              backgroundColor: '#4CAF50', 
                              borderColor: '#4CAF50' 
                            },
                            showCorrect && isSelected && !isCorrectAnswer && { 
                              backgroundColor: '#F44336', 
                              borderColor: '#F44336' 
                            },
                          ]}
                          onPress={() => !showFeedback && qIndex === currentQuestionIndex && handleAnswerSelect(qIndex, oIndex)}
                          disabled={showFeedback || qIndex !== currentQuestionIndex}
                        >
                          <Text style={[
                            styles.optionText,
                            { color: (isSelected || (showCorrect && isCorrectAnswer)) ? 'white' : theme.text }
                          ]}>
                            {option}
                          </Text>
                          {showCorrect && isCorrectAnswer && (
                            <Ionicons name="checkmark-circle" size={24} color="white" />
                          )}
                          {showCorrect && isSelected && !isCorrectAnswer && (
                            <Ionicons name="close-circle" size={24} color="white" />
                          )}
                        </TouchableOpacity>
                      );
                    })}

                    {/* Instant Feedback */}
                    {showFeedback && qIndex === currentQuestionIndex && (
                      <Animated.View style={[
                        styles.feedbackContainer,
                        { backgroundColor: isCorrect ? '#E8F5E9' : '#FFEBEE' }
                      ]}>
                        <Text style={[
                          styles.feedbackText,
                          { color: isCorrect ? '#4CAF50' : '#F44336' }
                        ]}>
                          {feedbackMessage}
                        </Text>
                      </Animated.View>
                    )}
                  </View>
                );
              })}

              {/* Submit Button - Only show when all questions answered */}
              {Object.keys(quizAnswers).length === currentQuiz?.questions?.length && (
                <TouchableOpacity
                  style={[styles.submitButton, { backgroundColor: subjectData?.color || theme.primary }]}
                  onPress={handleQuizSubmit}
                >
                  <Text style={styles.submitButtonText}>See Results 🎯</Text>
                </TouchableOpacity>
              )}
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
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  headerIcon: {
    marginLeft: 16,
  },
  headerIconText: {
    fontSize: 36,
  },
  coinsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  coinsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  coinsText: {
    fontSize: 18,
    fontWeight: '600',
  },
  progressSection: {
    padding: 20,
    paddingTop: 12,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressFill: {
    height: 10,
    borderRadius: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 4,
    margin: 20,
    marginBottom: 0,
    borderRadius: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lessonEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  quizEmoji: {
    fontSize: 32,
    marginRight: 12,
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
  previousScore: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  completedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
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
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  pointsBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
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
    paddingTop: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  quizContent: {
    flex: 1,
    padding: 20,
  },
  quizProgress: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  questionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    lineHeight: 24,
  },
  optionButton: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  feedbackContainer: {
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  scoreTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  rewardItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  rewardEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubjectScreen;