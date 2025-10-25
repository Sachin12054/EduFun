import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { updateStudentProfile } from '../services/database';

const { width } = Dimensions.get('window');

const GradeSelectionScreen = ({ navigation }) => {
  const { userProfile, user, updateProfile } = useAuth();
  const { theme } = useTheme();
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const grades = [
    { id: 1, title: 'Grade 1', subtitle: 'Ages 6-7', color: '#FF6B6B', icon: '1️⃣' },
    { id: 2, title: 'Grade 2', subtitle: 'Ages 7-8', color: '#4ECDC4', icon: '2️⃣' },
    { id: 3, title: 'Grade 3', subtitle: 'Ages 8-9', color: '#45B7D1', icon: '3️⃣' },
    { id: 4, title: 'Grade 4', subtitle: 'Ages 9-10', color: '#96CEB4', icon: '4️⃣' },
    { id: 5, title: 'Grade 5', subtitle: 'Ages 10-11', color: '#FECA57', icon: '5️⃣' },
  ];

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    // Add bounce animation
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleContinue = async () => {
    if (!selectedGrade) {
      Alert.alert('Please Select', 'Please select your grade to continue');
      return;
    }

    setIsLoading(true);
    try {
      console.log('🔄 Updating student grade to:', selectedGrade.id);
      
      // Update the student's grade in the database
      await updateStudentProfile(user.uid, { 
        grade: selectedGrade.id,
        gradeTitle: selectedGrade.title 
      });

      console.log('✅ Grade updated successfully');

      // Update local profile
      await updateProfile({ 
        grade: selectedGrade.id,
        gradeTitle: selectedGrade.title 
      });

      console.log('✅ Local profile updated, navigating to Main...');

      // Small delay to ensure profile is updated
      setTimeout(() => {
        // Navigate to the main app - AppNavigator will handle routing to correct grade
        navigation.replace('Main');
      }, 500);
      
    } catch (error) {
      console.error('❌ Error updating grade:', error);
      Alert.alert('Error', 'Failed to save grade selection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const GradeCard = ({ grade }) => (
    <TouchableOpacity
      style={[
        styles.gradeCard,
        { backgroundColor: theme.cardBackground },
        selectedGrade?.id === grade.id && styles.selectedCard,
      ]}
      onPress={() => handleGradeSelect(grade)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[grade.color, grade.color + 'dd']}
        style={styles.gradeIconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.gradeIcon}>{grade.icon}</Text>
      </LinearGradient>
      
      <View style={styles.gradeInfo}>
        <Text style={[styles.gradeTitle, { color: theme.text }]}>{grade.title}</Text>
        <Text style={[styles.gradeSubtitle, { color: theme.textSecondary }]}>{grade.subtitle}</Text>
      </View>
      
      {selectedGrade?.id === grade.id && (
        <Ionicons name="checkmark-circle" size={24} color={grade.color} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header */}
        <LinearGradient
          colors={[theme.primary, theme.secondary]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.headerTitle}>Select Your Grade</Text>
          <Text style={styles.headerSubtitle}>Choose the grade you're currently studying in</Text>
        </LinearGradient>

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={[styles.welcomeText, { color: theme.text }]}>
            Hello {userProfile?.name}! 👋
          </Text>
          <Text style={[styles.welcomeSubtext, { color: theme.textSecondary }]}>
            Let's set up your learning journey by selecting your current grade.
          </Text>
        </View>

        {/* Grade Selection */}
        <View style={styles.gradesContainer}>
          {grades.map((grade) => (
            <GradeCard key={grade.id} grade={grade} />
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedGrade && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedGrade || isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                selectedGrade && !isLoading
                  ? [selectedGrade.color, selectedGrade.color + 'dd']
                  : ['#cbd5e1', '#94a3b8']
              }
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>Setting up...</Text>
              ) : (
                <>
                  <Text style={styles.buttonText}>Continue</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Extra bottom spacing */}
        <View style={styles.bottomSpacing} />
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  gradesContainer: {
    paddingHorizontal: 20,
    gap: 16,
    flex: 1,
  },
  gradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    elevation: 8,
  },
  gradeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  gradeIcon: {
    fontSize: 28,
  },
  gradeInfo: {
    flex: 1,
  },
  gradeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gradeSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  continueButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    shadowOpacity: 0.1,
    elevation: 2,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomSpacing: {
    height: 30,
  },
});

export default GradeSelectionScreen;