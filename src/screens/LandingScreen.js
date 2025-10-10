import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const features = [
    {
      icon: 'trophy',
      title: 'Gamified Learning',
      description: 'Earn points, badges, and climb the leaderboard',
    },
    {
      icon: 'book',
      title: 'Interactive Courses',
      description: 'Engage with dynamic educational content',
    },
    {
      icon: 'stats-chart',
      title: 'Track Progress',
      description: 'Monitor your learning journey in real-time',
    },
    {
      icon: 'people',
      title: 'Community',
      description: 'Learn together with fellow students',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <Image
                  source={require('../../assets/Logo/Logo.jpg')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>
            
            <Text style={styles.title}>EduFun</Text>
            <Text style={styles.tagline}>
              Transform Learning into an Adventure
            </Text>
            <Text style={styles.description}>
              Join thousands of students on a gamified educational journey that makes learning fun, engaging, and rewarding!
            </Text>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Why Choose EduFun?</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <View style={styles.featureIconContainer}>
                    <Ionicons name={feature.icon} size={32} color="#667eea" />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaSection}>
            {/* Role Selection Title */}
            <Text style={styles.roleSelectionTitle}>Select Your Role</Text>
            
            {/* Role Selection Buttons */}
            <View style={styles.roleButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'student' && styles.roleButtonSelected
                ]}
                onPress={() => setSelectedRole('student')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={selectedRole === 'student' ? ['#667eea', '#764ba2'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)']}
                  style={styles.roleButtonGradient}
                >
                  <Ionicons 
                    name="school" 
                    size={40} 
                    color={selectedRole === 'student' ? 'white' : '#a5b4fc'} 
                  />
                  <Text style={[
                    styles.roleButtonText,
                    selectedRole === 'student' && styles.roleButtonTextSelected
                  ]}>
                    Student
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  selectedRole === 'teacher' && styles.roleButtonSelected
                ]}
                onPress={() => setSelectedRole('teacher')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={selectedRole === 'teacher' ? ['#667eea', '#764ba2'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)']}
                  style={styles.roleButtonGradient}
                >
                  <Ionicons 
                    name="person" 
                    size={40} 
                    color={selectedRole === 'teacher' ? 'white' : '#a5b4fc'} 
                  />
                  <Text style={[
                    styles.roleButtonText,
                    selectedRole === 'teacher' && styles.roleButtonTextSelected
                  ]}>
                    Teacher
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Get Started Button */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                !selectedRole && styles.primaryButtonDisabled
              ]}
              onPress={() => {
                if (selectedRole) {
                  navigation.navigate('Auth', { userType: selectedRole });
                }
              }}
              activeOpacity={selectedRole ? 0.9 : 1}
              disabled={!selectedRole}
            >
              <LinearGradient
                colors={selectedRole ? ['#667eea', '#764ba2'] : ['#999', '#666']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Active Students</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 EduFun. Learning Made Fun.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192f6a',
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  logoBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    padding: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 22,
    color: '#a5b4fc',
    marginBottom: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 340,
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
  ctaSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  roleSelectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  roleButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  roleButtonSelected: {
    borderColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  roleButtonGradient: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a5b4fc',
    marginTop: 8,
  },
  roleButtonTextSelected: {
    color: 'white',
  },
  primaryButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
  },
});

export default LandingScreen;