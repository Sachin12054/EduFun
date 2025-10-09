import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const AuthScreen = ({ route }) => {
  const { userType = 'student' } = route.params || {};
  const { createAccount, signIn, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
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
  };

  const fillDemoCredentials = () => {
    setFormData(prev => ({
      ...prev,
      email: 'student@demo.com',
      password: 'demo123',
    }));
  };

  const renderInput = (field, placeholder, icon, options = {}) => (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
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
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <LinearGradient
          colors={['#3B82F6', '#1D4ED8']}
          style={styles.gradient}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.title}>🎓 EduFun</Text>
              <Text style={styles.subtitle}>Learning Made Fun & Easy!</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Toggle Buttons */}
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, isLogin && styles.activeToggle]}
                  onPress={() => setIsLogin(true)}
                >
                  <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>
                    🔑 Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, !isLogin && styles.activeToggle]}
                  onPress={() => setIsLogin(false)}
                >
                  <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>
                    ⭐ Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.form}>
                <Text style={styles.formTitle}>
                  {isLogin ? '👋 Welcome Back!' : '🌟 Join the Fun!'}
                </Text>

                {!isLogin && (
                  <>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>📝 Your Full Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>🎒 Class & Section</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., 5th Grade - A"
                        value={classSection}
                        onChangeText={setClassSection}
                        autoCapitalize="words"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>🌍 Country</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your country"
                        value={country}
                        onChangeText={setCountry}
                        autoCapitalize="words"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>🏛️ State</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your state"
                        value={state}
                        onChangeText={setState}
                        autoCapitalize="words"
                      />
                    </View>
                  </>
                )}

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>📧 Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>🔒 Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                {isLogin && (
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>🤔 Forgot Password?</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAuth}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading ? '⏳ Loading...' : (isLogin ? '🚀 Let\'s Go!' : '🎉 Create Account')}
                  </Text>
                </TouchableOpacity>

                {isLogin && (
                  <TouchableOpacity
                    style={styles.demoButton}
                    onPress={fillDemoCredentials}
                  >
                    <Text style={styles.demoButtonText}>🎯 Try Demo Account</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.demoInfo}>
                <Text style={styles.demoTitle}>Demo Accounts:</Text>
                <Text style={styles.demoText}>Student: student@demo.com / demo123</Text>
                <Text style={styles.demoText}>Admin: admin@demo.com / admin123</Text>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#E0E7FF',
    textAlign: 'center',
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E7FF',
  },
  activeToggleText: {
    color: '#3B82F6',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoButton: {
    backgroundColor: '#10B981',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  demoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  demoInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
  },
  demoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  demoText: {
    color: '#E0E7FF',
    fontSize: 14,
    marginBottom: 3,
    textAlign: 'center',
  },
});

export default AuthScreen;