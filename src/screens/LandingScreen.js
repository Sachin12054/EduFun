import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import EduFunLogo from '../components/EduFunLogo';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.5)).current;
  const logoRotateAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(-20)).current;
  const featureAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const buttonAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const particleAnimations = useRef(
    Array.from({ length: 6 }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    // Start particle animations
    particleAnimations.forEach((particle, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(particle.opacity, {
            toValue: 0.8,
            duration: 1000 + index * 200,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0,
            duration: 1000 + index * 200,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.timing(particle.scale, {
          toValue: 1,
          duration: 1500 + index * 150,
          useNativeDriver: true,
        })
      ).start();
    });

    // Main animation sequence - Much faster timing
    Animated.sequence([
      // Logo entrance with rotation - Fast
      Animated.parallel([
        Animated.timing(logoScaleAnim, {
          toValue: 1,
          duration: 400, // Reduced from 1000ms
          useNativeDriver: true,
        }),
        Animated.timing(logoRotateAnim, {
          toValue: 1,
          duration: 400, // Reduced from 1000ms
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300, // Reduced from 800ms
          useNativeDriver: true,
        }),
      ]),
      // Title slide in - Fast
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: 250, // Reduced from 600ms
        useNativeDriver: true,
      }),
      // Content slide in - Fast
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200, // Reduced from 500ms
        useNativeDriver: true,
      }),
      // Feature pills with stagger - Fast
      Animated.stagger(50, // Reduced from 100ms
        featureAnimations.map(anim =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 200, // Reduced from 400ms
            useNativeDriver: true,
          })
        )
      ),
      // Button animations with bounce - Fast and dramatic
      Animated.stagger(75, // Reduced from 150ms
        buttonAnimations.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            tension: 120, // Increased for snappier animation
            friction: 6, // Reduced for more bounce
            useNativeDriver: true,
          })
        )
      ),
    ]).start();
  }, []);

  const features = [
    { icon: 'trophy', title: 'Gamified', color: '#FFD700' },
    { icon: 'book', title: 'Interactive', color: '#4ECDC4' },
    { icon: 'stats-chart', title: 'Progress', color: '#45B7D1' },
    { icon: 'people', title: 'Community', color: '#96CEB4' },
  ];

  const handleRolePress = (role) => {
    // Professional press animation with haptic feedback
    const buttonIndex = role === 'student' ? 0 : 1;
    
    // Scale down animation
    Animated.sequence([
      Animated.timing(buttonAnimations[buttonIndex], {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(buttonAnimations[buttonIndex], {
        toValue: 1,
        tension: 150,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after animation
    setTimeout(() => {
      navigation.navigate(role === 'student' ? 'StudentAuth' : 'TeacherAuth');
    }, 200);
  };

  const logoRotate = logoRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent hidden />
      <LinearGradient
        colors={['#6366f1', '#8b5cf6', '#a855f7']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated Background Particles */}
        {particleAnimations.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                opacity: particle.opacity,
                transform: [
                  { translateX: particle.x },
                  { translateY: particle.y },
                  { scale: particle.scale },
                ],
              },
            ]}
          />
        ))}

        <View style={styles.content}>
          {/* Header Section - Compact */}
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: logoScaleAnim },
                  { rotate: logoRotate },
                ],
              },
            ]}
          >
            <View style={styles.logoContainer}>
              <EduFunLogo 
                size={100}
                showBackground={true}
                backgroundStyle={styles.logoBackground}
              />
            </View>
          </Animated.View>

          {/* Brand Section */}
          <Animated.View 
            style={[
              styles.brandSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: titleAnim }],
              },
            ]}
          >
            <Text style={styles.title}>EduFun</Text>
            <Text style={styles.tagline}>Transform Learning Into Adventure</Text>
          </Animated.View>

          {/* Feature Pills - Horizontal */}
          <Animated.View 
            style={[
              styles.featuresContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.featurePills}>
              {features.map((feature, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.featurePill,
                    { backgroundColor: feature.color + '20' },
                    {
                      opacity: featureAnimations[index],
                      transform: [
                        {
                          translateY: featureAnimations[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }),
                        },
                        {
                          scale: featureAnimations[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.8, 1],
                          }),
                        },
                        {
                          rotateZ: featureAnimations[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['-5deg', '0deg'],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Ionicons name={feature.icon} size={16} color={feature.color} />
                  <Text style={[styles.featurePillText, { color: feature.color }]}>
                    {feature.title}
                  </Text>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Enhanced Role Selection with Professional Animations */}
          <Animated.View 
            style={[
              styles.roleSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.roleTitleContainer,
                {
                  transform: [
                    {
                      scale: buttonAnimations[0].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.roleTitle}>Choose Your Path</Text>
              <Text style={styles.roleSubtitle}>Embark on your learning journey</Text>
              <View style={styles.titleUnderline} />
            </Animated.View>
            
            <View style={styles.roleCards}>
              <Animated.View
                style={[
                  styles.roleCardWrapper,
                  {
                    opacity: buttonAnimations[0],
                    transform: [
                      {
                        translateX: buttonAnimations[0].interpolate({
                          inputRange: [0, 1],
                          outputRange: [-50, 0],
                        }),
                      },
                      {
                        scale: buttonAnimations[0].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.roleCard}
                  onPress={() => handleRolePress('student')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#0ea5e9', '#0284c7', '#0369a1']}
                    style={styles.roleCardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.roleCardOverlay} />
                    <View style={styles.roleCardContent}>
                      <View style={styles.roleCardIconContainer}>
                        <View style={[styles.roleCardIcon, styles.studentIconStyle]}>
                          <Ionicons name="school" size={26} color="white" />
                        </View>
                      </View>
                      <View style={styles.roleCardTextContainer}>
                        <Text style={styles.roleCardTitle}>Student</Text>
                        <Text style={styles.roleCardSubtitle}>Start Learning Journey</Text>
                      </View>
                      <View style={styles.roleCardArrowContainer}>
                        <Animated.View 
                          style={[
                            styles.roleCardArrow,
                            styles.studentArrowStyle,
                            {
                              transform: [
                                {
                                  translateX: buttonAnimations[0].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [15, 0],
                                  }),
                                },
                              ],
                            },
                          ]}
                        >
                          <Ionicons name="arrow-forward" size={22} color="white" />
                        </Animated.View>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={[
                  styles.roleCardWrapper,
                  {
                    opacity: buttonAnimations[1],
                    transform: [
                      {
                        translateX: buttonAnimations[1].interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                      {
                        scale: buttonAnimations[1].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.roleCard}
                  onPress={() => handleRolePress('teacher')}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#f97316', '#ea580c', '#dc2626']}
                    style={styles.roleCardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.roleCardOverlay} />
                    <View style={styles.roleCardContent}>
                      <View style={styles.roleCardIconContainer}>
                        <View style={[styles.roleCardIcon, styles.teacherIconStyle]}>
                          <Ionicons name="person" size={26} color="white" />
                        </View>
                      </View>
                      <View style={styles.roleCardTextContainer}>
                        <Text style={styles.roleCardTitle}>Teacher</Text>
                        <Text style={styles.roleCardSubtitle}>Guide & Inspire Students</Text>
                      </View>
                      <View style={styles.roleCardArrowContainer}>
                        <Animated.View 
                          style={[
                            styles.roleCardArrow,
                            styles.teacherArrowStyle,
                            {
                              transform: [
                                {
                                  translateX: buttonAnimations[1].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [15, 0],
                                  }),
                                },
                              ],
                            },
                          ]}
                        >
                          <Ionicons name="arrow-forward" size={22} color="white" />
                        </Animated.View>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.View 
            style={[
              styles.footer,
              { 
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }
            ]}
          >
            <Text style={styles.footerText}>
              Join thousands of learners worldwide
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366f1', // Fallback color
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: 'space-evenly',
  },

  // Animated Background Particles
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },

  // Header Section - Compact
  header: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  logoBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },

  // Brand Section
  brandSection: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: 'white',
    marginBottom: 6,
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    lineHeight: 20,
  },

  // Features Section - Horizontal Pills
  featuresContainer: {
    paddingVertical: 12,
  },
  featurePills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(15px)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  featurePillText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },

  // Enhanced Role Selection Section
  roleSection: {
    paddingVertical: 15,
  },
  roleTitleContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  roleTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  roleSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.4,
  },
  titleUnderline: {
    width: 50,
    height: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,
  },
  roleCards: {
    gap: 18,
  },
  roleCardWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  roleCard: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  roleCardGradient: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 18,
    position: 'relative',
  },
  roleCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  roleCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    zIndex: 2,
  },
  roleCardIconContainer: {
    marginRight: 16,
  },
  roleCardIcon: {
    width: 55,
    height: 55,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  studentIconStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  teacherIconStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  roleCardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  roleCardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  roleCardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.92)',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  roleCardArrowContainer: {
    marginLeft: 16,
  },
  roleCardArrow: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  studentArrowStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  teacherArrowStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default LandingScreen;