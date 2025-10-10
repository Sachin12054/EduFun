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
    // Delay blur to prevent conflicts
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
    Keyboard.dismiss(); // Dismiss keyboard before toggling
    setIsLogin(!isLogin);
    resetForm();
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFocusedInput(null);
  };

  const renderInput = (field, placeholder, icon, options = {}) => {
    // Get the appropriate ref for this field
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
        <Ionicons name={icon} size={22} color={focusedInput === field ? '#4F46E5' : '#9CA3AF'} style={styles.inputIcon} />
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
          textContentType={options.textContentType || 'none'}
          autoComplete={options.autoComplete || 'off'}
          importantForAutofill="no"
          caretHidden={false}
          autoFocus={false}
          selectTextOnFocus={false}
        />
        {options.togglePassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => options.togglePassword()}
          >
            <Ionicons
              name={options.showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={styles.gradient}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          overScrollMode="never"
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="book" size={35} color="#FFFFFF" />
              </View>
              <Text style={styles.title}>EduFun</Text>
            </View>
            <Text style={styles.subtitle}>Your Gateway to Learning Excellence</Text>
          </View>

          <View style={styles.formWrapper}>
            <View style={styles.formContainer}>
              {/* Toggle Buttons */}
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, isLogin && styles.activeToggle]}
                  onPress={() => {
                    if (!isLogin) {
                      Keyboard.dismiss();
                      setIsLogin(true);
                      resetForm();
                      setShowPassword(false);
                      setShowConfirmPassword(false);
                      setFocusedInput(null);
                    }
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
                    if (isLogin) {
                      Keyboard.dismiss();
                      setIsLogin(false);
                      resetForm();
                      setShowPassword(false);
                      setShowConfirmPassword(false);
                      setFocusedInput(null);
                    }
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
                  {isLogin ? 'Sign in to continue your learning journey' : 'Join us to start your learning adventure'}
                </Text>

                {!isLogin && (
                  <>
                    {renderInput('firstName', 'First Name', 'person', { 
                      autoCapitalize: 'words',
                      returnKeyType: 'next',
                      onSubmitEditing: () => {
                        setTimeout(() => lastNameRef.current?.focus(), 50);
                      },
                      textContentType: 'givenName',
                      autoComplete: 'name-given'
                    })}
                    {renderInput('lastName', 'Last Name', 'person', { 
                      autoCapitalize: 'words',
                      returnKeyType: 'next',
                      onSubmitEditing: () => {
                        setTimeout(() => {
                          if (userType === 'student') {
                            classNameRef.current?.focus();
                          } else {
                            phoneNumberRef.current?.focus();
                          }
                        }, 50);
                      },
                      textContentType: 'familyName',
                      autoComplete: 'name-family'
                    })}
                    
                    {userType === 'student' && (
                      <>
                        {renderInput('className', 'Class (e.g., 5th Grade)', 'school', { 
                          autoCapitalize: 'words',
                          returnKeyType: 'next',
                          onSubmitEditing: () => {
                            setTimeout(() => sectionRef.current?.focus(), 50);
                          }
                        })}
                        {renderInput('section', 'Section (e.g., A)', 'bookmark', { 
                          autoCapitalize: 'characters',
                          returnKeyType: 'next',
                          onSubmitEditing: () => {
                            setTimeout(() => rollNumberRef.current?.focus(), 50);
                          }
                        })}
                        {renderInput('rollNumber', 'Roll Number (Optional)', 'calculator', {
                          returnKeyType: 'next',
                          onSubmitEditing: () => {
                            setTimeout(() => phoneNumberRef.current?.focus(), 50);
                          }
                        })}
                      </>
                    )}
                    
                    {renderInput('phoneNumber', 'Phone Number (Optional)', 'call', { 
                      keyboardType: 'phone-pad',
                      returnKeyType: 'next',
                      onSubmitEditing: () => {
                        setTimeout(() => emailRef.current?.focus(), 50);
                      },
                      textContentType: 'telephoneNumber',
                      autoComplete: 'tel'
                    })}
                  </>
                )}

                {renderInput('email', 'Email Address', 'mail', { 
                  keyboardType: 'email-address',
                  returnKeyType: 'next',
                  onSubmitEditing: () => {
                    setTimeout(() => passwordRef.current?.focus(), 50);
                  },
                  textContentType: 'emailAddress',
                  autoComplete: 'email'
                })}
                
                {renderInput('password', 'Password', 'lock-closed', {
                  secure: true,
                  showPassword: showPassword,
                  togglePassword: () => setShowPassword(!showPassword),
                  returnKeyType: isLogin ? 'done' : 'next',
                  onSubmitEditing: () => {
                    if (!isLogin) {
                      setTimeout(() => confirmPasswordRef.current?.focus(), 50);
                    } else {
                      Keyboard.dismiss();
                      setTimeout(() => handleSubmit(), 100);
                    }
                  },
                  textContentType: isLogin ? 'password' : 'newPassword',
                  autoComplete: 'password'
                })}

                {!isLogin && renderInput('confirmPassword', 'Confirm Password', 'lock-closed', {
                  secure: true,
                  showPassword: showConfirmPassword,
                  togglePassword: () => setShowConfirmPassword(!showConfirmPassword),
                  returnKeyType: 'done',
                  onSubmitEditing: () => {
                    Keyboard.dismiss();
                    setTimeout(() => handleSubmit(), 100);
                  },
                  textContentType: 'newPassword',
                  autoComplete: 'password'
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
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
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
    flexGrow: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 30,
    justifyContent: 'flex-start',
  },
  formContainer: {
    paddingVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    padding: 6,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  toggleText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeToggleText: {
    color: '#4F46E5',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  formSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 16,
  },
  inputContainer: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    height: 50,
  },
  inputContainerFocused: {
    borderColor: '#4F46E5',
    backgroundColor: '#FFFFFF',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
    color: '#9CA3AF',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
    paddingVertical: 0, // Remove extra padding that might cause issues
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 16,
    marginTop: -6,
  },
  forgotPasswordText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    paddingVertical: 12,
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