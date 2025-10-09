import React, { useState } from 'react';
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    setIsLogin(!isLogin);
    resetForm();
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFocusedInput(null);
  };

  const renderInput = (field, placeholder, icon, options = {}) => (
    <View style={[
      styles.inputContainer,
      focusedInput === field && styles.inputContainerFocused
    ]}>
      <Ionicons name={icon} size={22} color={focusedInput === field ? '#4F46E5' : '#9CA3AF'} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        onFocus={() => setFocusedInput(field)}
        onBlur={() => setFocusedInput(null)}
        secureTextEntry={options.secure && !options.showPassword}
        keyboardType={options.keyboardType || 'default'}
        autoCapitalize={options.autoCapitalize || 'none'}
        autoCorrect={false}
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Ionicons name="book" size={40} color="#FFFFFF" />
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
                    onPress={() => setIsLogin(true)}
                  >
                    <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>
                      Login
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleButton, !isLogin && styles.activeToggle]}
                    onPress={() => setIsLogin(false)}
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
                    {renderInput('firstName', 'First Name', 'person', { autoCapitalize: 'words' })}
                    {renderInput('lastName', 'Last Name', 'person', { autoCapitalize: 'words' })}
                    
                    {userType === 'student' && (
                      <>
                        {renderInput('className', 'Class (e.g., 5th Grade)', 'school', { autoCapitalize: 'words' })}
                        {renderInput('section', 'Section (e.g., A)', 'bookmark', { autoCapitalize: 'characters' })}
                        {renderInput('rollNumber', 'Roll Number (Optional)', 'calculator')}
                      </>
                    )}
                    
                    {renderInput('phoneNumber', 'Phone Number (Optional)', 'call', { keyboardType: 'phone-pad' })}
                  </>
                )}

                {renderInput('email', 'Email Address', 'mail', { keyboardType: 'email-address' })}
                
                {renderInput('password', 'Password', 'lock-closed', {
                  secure: true,
                  showPassword: showPassword,
                  togglePassword: () => setShowPassword(!showPassword)
                })}

                {!isLogin && renderInput('confirmPassword', 'Confirm Password', 'lock-closed', {
                  secure: true,
                  showPassword: showConfirmPassword,
                  togglePassword: () => setShowConfirmPassword(!showConfirmPassword)
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
                >
                  <Text style={styles.secondaryButtonText}>
                    {isLogin ? 'New here? Create an account' : 'Already have an account? Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: '100%',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    padding: 6,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
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
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    height: 56,
    transition: 'all 0.3s ease',
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
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AuthScreen;