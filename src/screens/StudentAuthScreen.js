import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { validateForm, validateEmail, validatePassword } from '../utils/validation';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function StudentAuthScreen({ navigation }) {
  const { signup, login, loading } = useAuth();
  
  // State Management
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Refs for form navigation
  const nameRef = useRef(null);
  const studentIdRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Animation Values
  const tabIndicatorPosition = useSharedValue(isLogin ? 0 : 1);
  const formTranslateY = useSharedValue(0);
  const spinValue = useSharedValue(0);
  const loadingOpacity = useSharedValue(0);
  const entranceAnimation = useSharedValue(0);

  // Initialize entrance animation and sync tab indicator
  useEffect(() => {
    entranceAnimation.value = withSpring(1, {
      duration: 800,
      dampingRatio: 0.8,
    });
    
    // Sync tab indicator with current state
    tabIndicatorPosition.value = isLogin ? 0 : 1;
  }, []);

  // Update tab indicator when login state changes
  useEffect(() => {
    tabIndicatorPosition.value = withSpring(isLogin ? 0 : 1, {
      duration: 600,
      dampingRatio: 0.8,
    });
  }, [isLogin]);

  // Animated Styles
  const tabIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          tabIndicatorPosition.value,
          [0, 1],
          [0, width * 0.5 - 48]
        ),
      },
    ],
  }));

  const formContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: formTranslateY.value,
      },
    ],
  }));

  const loadingStyle = useAnimatedStyle(() => ({
    opacity: loadingOpacity.value,
  }));

  const spinStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${spinValue.value * 360}deg`,
      },
    ],
  }));

  const formEntranceStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(entranceAnimation.value, [0, 1], [50, 0]),
      },
    ],
    opacity: entranceAnimation.value,
  }));

  // Form Validation Functions
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleInputBlur = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'name':
        error = value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
        break;
      case 'confirmPassword':
        error = value !== formData.password ? 'Passwords do not match' : '';
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { score: 0, label: 'Enter password', color: '#e0e0e0' };
    if (password.length < 6) return { score: 1, label: 'Weak', color: '#ff6b6b' };
    if (password.length < 8) return { score: 2, label: 'Fair', color: '#ffa726' };
    if (password.length < 12 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { score: 3, label: 'Good', color: '#42a5f5' };
    }
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return { score: 4, label: 'Strong', color: '#66bb6a' };
    }
    return { score: 2, label: 'Fair', color: '#ffa726' };
  };

  // Tab Switch Handler
  const handleTabSwitch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Immediately switch tabs and clear form data
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      studentId: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setFocusedField(null);
  };

  // Authentication Handler
  const handleAuth = async () => {
    Keyboard.dismiss();
    
    const validationErrors = validateForm(formData, isLogin);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0];
      const refs = {
        name: nameRef,
        studentId: studentIdRef,
        email: emailRef,
        password: passwordRef,
        confirmPassword: confirmPasswordRef,
      };
      
      if (refs[firstErrorField]?.current) {
        refs[firstErrorField].current.focus();
      }
      
      return;
    }

    setIsLoading(true);
    loadingOpacity.value = withTiming(1, { duration: 300 });
    
    // Start loading spinner
    spinValue.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );

    try {
      if (isLogin) {
        // Login existing student
        await login(formData.email, formData.password, 'student');
      } else {
        // Register new student
        await signup(formData.email, formData.password, {
          name: formData.name,
          studentId: formData.studentId || `STU${Date.now()}`,
          userType: 'student',
        });
      }
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Let the AppNavigator handle the routing automatically
      // New students will go to GradeSelection, existing students to Main
      
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Authentication Failed', 
        error.message || 'Please check your credentials and try again.'
      );
      console.error('Student auth error:', error);
    } finally {
      setIsLoading(false);
      loadingOpacity.value = withTiming(0, { duration: 300 });
      spinValue.value = 0;
    }
  };

  // Keyboard handling
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      formTranslateY.value = withSpring(-keyboardHeight / 4, {
        duration: 300,
        dampingRatio: 0.8,
      });
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      formTranslateY.value = withSpring(0, {
        duration: 300,
        dampingRatio: 0.8,
      });
    });

    return () => {
      keyboardWillShow?.remove();
      keyboardWillHide?.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155', '#475569']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView 
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Professional Header Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Ionicons name="school" size={28} color="#3b82f6" />
            </View>
            <Text style={styles.logoText}>Kidemy</Text>
            <Text style={styles.logoSubtitle}>Student Portal</Text>
            <View style={styles.headerDivider} />
          </View>

          {/* Professional Tab Switcher */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, isLogin && styles.activeTab]}
              onPress={!isLogin ? handleTabSwitch : null}
            >
              <Ionicons 
                name="log-in-outline" 
                size={18} 
                color={isLogin ? "#3b82f6" : "rgba(255,255,255,0.7)"} 
                style={styles.tabIcon}
              />
              <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, !isLogin && styles.activeTab]}
              onPress={isLogin ? handleTabSwitch : null}
            >
              <Ionicons 
                name="person-add-outline" 
                size={18} 
                color={!isLogin ? "#3b82f6" : "rgba(255,255,255,0.7)"} 
                style={styles.tabIcon}
              />
              <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Container */}
          <Animated.View style={[styles.formCard, formContainerStyle, formEntranceStyle]}>
            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.welcomeTitle}>
                {isLogin ? 'Welcome Back' : 'Join as Student'}
              </Text>
              <Text style={styles.welcomeSubtitle}>
                {isLogin 
                  ? 'Sign in to continue your learning journey' 
                  : 'Start your educational adventure with us'
                }
              </Text>

              {/* Form Fields */}
              <View style={styles.formFields}>
                {/* Name Field - Only for Sign Up */}
                {!isLogin && (
                  <View style={styles.inputWrapper}>
                    <View style={[
                      styles.inputContainer, 
                      errors.name && styles.inputError,
                      focusedField === 'name' && styles.inputFocused
                    ]}>
                      <Ionicons name="person-outline" size={20} color="#64748b" style={styles.inputIcon} />
                      <TextInput
                        ref={nameRef}
                        style={styles.textInput}
                        placeholder="Full Name"
                        placeholderTextColor="#94a3b8"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => {
                          setFocusedField(null);
                          handleInputBlur('name', formData.name);
                        }}
                        autoCapitalize="words"
                        returnKeyType="next"
                        onSubmitEditing={() => studentIdRef.current?.focus()}
                      />
                    </View>
                    {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                  </View>
                )}

                {/* Student ID Field - Only for Sign Up */}
                {!isLogin && (
                  <View style={styles.inputWrapper}>
                    <View style={[
                      styles.inputContainer,
                      focusedField === 'studentId' && styles.inputFocused
                    ]}>
                      <Ionicons name="id-card-outline" size={20} color="#64748b" style={styles.inputIcon} />
                      <TextInput
                        ref={studentIdRef}
                        style={styles.textInput}
                        placeholder="Student ID (Optional)"
                        placeholderTextColor="#94a3b8"
                        value={formData.studentId}
                        onChangeText={(text) => handleInputChange('studentId', text)}
                        onFocus={() => setFocusedField('studentId')}
                        onBlur={() => setFocusedField(null)}
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current?.focus()}
                      />
                    </View>
                  </View>
                )}

                {/* Email Field */}
                <View style={styles.inputWrapper}>
                  <View style={[
                    styles.inputContainer, 
                    errors.email && styles.inputError,
                    focusedField === 'email' && styles.inputFocused
                  ]}>
                    <Ionicons name="mail-outline" size={20} color="#64748b" style={styles.inputIcon} />
                    <TextInput
                      ref={emailRef}
                      style={styles.textInput}
                      placeholder="Email Address"
                      placeholderTextColor="#94a3b8"
                      value={formData.email}
                      onChangeText={(text) => handleInputChange('email', text)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => {
                        setFocusedField(null);
                        handleInputBlur('email', formData.email);
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                  </View>
                  {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                </View>

                {/* Password Field */}
                <View style={styles.inputWrapper}>
                  <View style={[
                    styles.inputContainer, 
                    errors.password && styles.inputError,
                    focusedField === 'password' && styles.inputFocused
                  ]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#64748b" style={styles.inputIcon} />
                    <TextInput
                      ref={passwordRef}
                      style={styles.textInput}
                      placeholder="Password"
                      placeholderTextColor="#94a3b8"
                      value={formData.password}
                      onChangeText={(text) => handleInputChange('password', text)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => {
                        setFocusedField(null);
                        handleInputBlur('password', formData.password);
                      }}
                      secureTextEntry={!showPassword}
                      returnKeyType={isLogin ? "done" : "next"}
                      onSubmitEditing={() => {
                        if (isLogin) {
                          handleAuth();
                        } else {
                          confirmPasswordRef.current?.focus();
                        }
                      }}
                    />
                    <TouchableOpacity
                      style={styles.passwordToggle}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons 
                        name={showPassword ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="#64748b" 
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                  
                  {/* Password Strength Indicator for Sign Up */}
                  {!isLogin && formData.password.length > 0 && (
                    <View style={styles.passwordStrengthContainer}>
                      <Text style={styles.passwordStrengthTitle}>Password Strength:</Text>
                      <View style={styles.passwordStrengthBars}>
                        {[1, 2, 3, 4].map((bar) => {
                          const strength = getPasswordStrength(formData.password);
                          return (
                            <View
                              key={bar}
                              style={[
                                styles.passwordStrengthBar,
                                { backgroundColor: bar <= strength.score ? strength.color : '#e0e0e0' }
                              ]}
                            />
                          );
                        })}
                      </View>
                      <Text style={[styles.passwordStrengthText, { color: getPasswordStrength(formData.password).color }]}>
                        {getPasswordStrength(formData.password).label}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Confirm Password Field - Only for Sign Up */}
                {!isLogin && (
                  <View style={styles.inputWrapper}>
                    <View style={[
                      styles.inputContainer, 
                      errors.confirmPassword && styles.inputError,
                      focusedField === 'confirmPassword' && styles.inputFocused
                    ]}>
                      <Ionicons name="lock-closed-outline" size={20} color="#64748b" style={styles.inputIcon} />
                      <TextInput
                        ref={confirmPasswordRef}
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#94a3b8"
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleInputChange('confirmPassword', text)}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => {
                          setFocusedField(null);
                          handleInputBlur('confirmPassword', formData.confirmPassword);
                        }}
                        secureTextEntry={!showConfirmPassword}
                        returnKeyType="done"
                        onSubmitEditing={handleAuth}
                      />
                      <TouchableOpacity
                        style={styles.passwordToggle}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <Ionicons 
                          name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                          size={20} 
                          color="#64748b" 
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
                  </View>
                )}
              </View>

              {/* Forgot Password - Only for Login */}
              {isLogin && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              {/* Auth Button */}
              <TouchableOpacity 
                style={[styles.authButton, isLoading && styles.authButtonDisabled]} 
                onPress={handleAuth}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={isLoading ? ['#cbd5e1', '#94a3b8'] : ['#3b82f6', '#2563eb', '#1d4ed8']}
                  style={styles.authButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {isLoading ? (
                    <Animated.View style={[styles.loadingContainer, loadingStyle]}>
                      <Animated.View style={[styles.loadingSpinner, spinStyle]}>
                        <Ionicons name="refresh-outline" size={20} color="white" />
                      </Animated.View>
                      <Text style={styles.authButtonText}>
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </Text>
                    </Animated.View>
                  ) : (
                    <Text style={styles.authButtonText}>
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Features Section - Only for Sign Up */}
              {!isLogin && (
                <View style={styles.featuresContainer}>
                  <View style={styles.featureItem}>
                    <Ionicons name="trophy-outline" size={16} color="#3b82f6" />
                    <Text style={styles.featureText}>Gamified Learning Experience</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="analytics-outline" size={16} color="#3b82f6" />
                    <Text style={styles.featureText}>Track Your Progress</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="people-outline" size={16} color="#3b82f6" />
                    <Text style={styles.featureText}>Join Study Groups</Text>
                  </View>
                </View>
              )}
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  logoWrapper: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  logoSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  headerDivider: {
    width: 60,
    height: 3,
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
    borderRadius: 2,
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: '#3b82f6',
  },
  formCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 30,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  formFields: {
    gap: 18,
  },
  inputWrapper: {
    gap: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#3b82f6',
    backgroundColor: '#f0f9ff',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  inputError: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.7,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  passwordToggle: {
    padding: 8,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
    marginLeft: 4,
  },
  passwordStrengthContainer: {
    marginTop: 8,
    gap: 6,
  },
  passwordStrengthTitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  passwordStrengthBars: {
    flexDirection: 'row',
    gap: 4,
  },
  passwordStrengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  authButton: {
    borderRadius: 16,
    marginTop: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  authButtonDisabled: {
    shadowOpacity: 0.1,
    elevation: 2,
  },
  authButtonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  loadingSpinner: {
    // Animation will be applied via Animated.View
  },
  featuresContainer: {
    marginTop: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});