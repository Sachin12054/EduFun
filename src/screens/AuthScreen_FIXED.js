import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StatusBar,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const AuthScreen = ({ route }) => {
  const { userType = 'student' } = route.params || {};
  const { createAccount, signIn, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    className: '',
    section: '',
    rollNumber: '',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Create refs for all input fields
  const scrollViewRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const classNameRef = useRef(null);
  const sectionRef = useRef(null);
  const rollNumberRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field) => {
    setFocusedInput(field);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFocusedInput(null);
    }, 100);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Email and password are required');
      return false;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return false;
      }

      if (!formData.firstName || !formData.lastName) {
        Alert.alert('Error', 'First name and last name are required');
        return false;
      }

      if (userType === 'student' && (!formData.className || !formData.section)) {
        Alert.alert('Error', 'Class and section are required for students');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isLogin) {
        const result = await signIn(formData.email, formData.password);
        if (!result.success) {
          Alert.alert('Login Failed', result.error);
        }
      } else {
        const profileData = {
          userType,
          firstName: formData.firstName,
          lastName: formData.lastName,
          displayName: `${formData.firstName} ${formData.lastName}`,
          className: formData.className,
          section: formData.section,
          rollNumber: formData.rollNumber,
          phoneNumber: formData.phoneNumber,
        };

        const result = await createAccount(formData.email, formData.password, profileData);
        if (!result.success) {
          Alert.alert('Registration Failed', result.error);
        }
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      className: '',
      section: '',
      rollNumber: '',
      phoneNumber: '',
    });
  };

  const toggleMode = () => {
    Keyboard.dismiss();
    setIsLogin(!isLogin);
    resetForm();
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFocusedInput(null);
  };

  const renderInput = (field, placeholder, icon, options = {}) => {
    let inputRef = null;
    switch(field) {
      case 'firstName': inputRef = firstNameRef; break;
      case 'lastName': inputRef = lastNameRef; break;
      case 'className': inputRef = classNameRef; break;
      case 'section': inputRef = sectionRef; break;
      case 'rollNumber': inputRef = rollNumberRef; break;
      case 'phoneNumber': inputRef = phoneNumberRef; break;
      case 'email': inputRef = emailRef; break;
      case 'password': inputRef = passwordRef; break;
      case 'confirmPassword': inputRef = confirmPasswordRef; break;
    }

    return (
      <View style={[
        styles.inputContainer,
        focusedInput === field && styles.inputContainerFocused
      ]}>
        <Ionicons name={icon} size={20} color={focusedInput === field ? '#4F46E5' : '#9CA3AF'} style={styles.inputIcon} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          onFocus={() => handleFocus(field)}
          onBlur={handleBlur}
          secureTextEntry={options.secure && !options.showPassword}
          keyboardType={options.keyboardType || 'default'}
          autoCapitalize={options.autoCapitalize || 'none'}
          autoCorrect={false}
          returnKeyType={options.returnKeyType || 'next'}
          onSubmitEditing={options.onSubmitEditing}
          blurOnSubmit={false}
          editable={!loading}
        />
        {options.togglePassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => options.togglePassword()}
          >
            <Ionicons
              name={options.showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          style={styles.gradient}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View style={styles.header}>
              <View style={styles.logoCircle}>
                <Ionicons name="book" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.title}>EduFun</Text>
              <Text style={styles.subtitle}>Your Gateway to Learning Excellence</Text>
            </View>

            <View style={styles.formWrapper}>
              {/* Toggle Buttons */}
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, isLogin && styles.activeToggle]}
                  onPress={() => {
                    if (!isLogin) toggleMode();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, !isLogin && styles.activeToggle]}
                  onPress={() => {
                    if (isLogin) toggleMode();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.form}>
                <Text style={styles.formTitle}>
                  {isLogin ? 'Welcome Back' : 'Create Your Account'}
                </Text>
                <Text style={styles.formSubtitle}>
                  {isLogin ? 'Sign in to continue' : 'Join us to start learning'}
                </Text>

                {!isLogin && (
                  <>
                    {renderInput('firstName', 'First Name', 'person', { 
                      autoCapitalize: 'words',
                      returnKeyType: 'next',
                      onSubmitEditing: () => lastNameRef.current?.focus(),
                    })}
                    {renderInput('lastName', 'Last Name', 'person', { 
                      autoCapitalize: 'words',
                      returnKeyType: 'next',
                      onSubmitEditing: () => {
                        if (userType === 'student') {
                          classNameRef.current?.focus();
                        } else {
                          emailRef.current?.focus();
                        }
                      },
                    })}
                    
                    {userType === 'student' && (
                      <>
                        {renderInput('className', 'Class (e.g., 5th)', 'school', { 
                          autoCapitalize: 'words',
                          returnKeyType: 'next',
                          onSubmitEditing: () => sectionRef.current?.focus(),
                        })}
                        {renderInput('section', 'Section (e.g., A)', 'bookmark', { 
                          autoCapitalize: 'characters',
                          returnKeyType: 'next',
                          onSubmitEditing: () => emailRef.current?.focus(),
                        })}
                      </>
                    )}
                  </>
                )}

                {renderInput('email', 'Email Address', 'mail', { 
                  keyboardType: 'email-address',
                  returnKeyType: 'next',
                  onSubmitEditing: () => passwordRef.current?.focus(),
                })}
                
                {renderInput('password', 'Password', 'lock-closed', {
                  secure: true,
                  showPassword: showPassword,
                  togglePassword: () => setShowPassword(!showPassword),
                  returnKeyType: isLogin ? 'done' : 'next',
                  onSubmitEditing: () => {
                    if (!isLogin) {
                      confirmPasswordRef.current?.focus();
                    } else {
                      Keyboard.dismiss();
                      handleSubmit();
                    }
                  },
                })}

                {!isLogin && renderInput('confirmPassword', 'Confirm Password', 'lock-closed', {
                  secure: true,
                  showPassword: showConfirmPassword,
                  togglePassword: () => setShowConfirmPassword(!showConfirmPassword),
                  returnKeyType: 'done',
                  onSubmitEditing: () => {
                    Keyboard.dismiss();
                    handleSubmit();
                  },
                })}

                {isLogin && (
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleSubmit}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={toggleMode}
                  activeOpacity={0.7}
                >
                  <Text style={styles.secondaryButtonText}>
                    {isLogin ? 'New here? Create an account' : 'Already have an account? Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  formWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 26,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#FFFFFF',
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeToggleText: {
    color: '#4F46E5',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 14,
    height: 52,
  },
  inputContainerFocused: {
    borderColor: '#4F46E5',
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    padding: 0,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AuthScreen;
