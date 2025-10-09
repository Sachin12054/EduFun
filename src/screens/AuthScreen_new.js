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
  const { userType = 'student', isLogin: initialIsLogin = false } = route.params || {};
  const { createAccount, signIn, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  
  // Individual state for each field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [classSection, setClassSection] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    if (!isLogin && !name) {
      Alert.alert('Error', 'Name is required for sign up');
      return;
    }

    try {
      if (isLogin) {
        const result = await signIn(email, password);
        if (!result.success) {
          Alert.alert('Login Failed', result.error);
        }
      } else {
        const profileData = {
          userType,
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ').slice(1).join(' ') || '',
          name: name,
          classSection: classSection,
          country: country,
          state: state,
          email: email,
        };

        const result = await createAccount(email, password, profileData);
        if (!result.success) {
          Alert.alert('Registration Failed', result.error);
        }
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('student@demo.com');
    setPassword('demo123');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear form
    setEmail('');
    setPassword('');
    setName('');
    setClassSection('');
    setCountry('');
    setState('');
  };

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
                        placeholderTextColor="#999"
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
                        placeholderTextColor="#999"
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
                        placeholderTextColor="#999"
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
                        placeholderTextColor="#999"
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
                    placeholderTextColor="#999"
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
                    placeholderTextColor="#999"
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

                <TouchableOpacity
                  style={styles.toggleModeButton}
                  onPress={toggleMode}
                >
                  <Text style={styles.toggleModeText}>
                    {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                  </Text>
                </TouchableOpacity>
              </View>

              {isLogin && (
                <View style={styles.demoInfo}>
                  <Text style={styles.demoTitle}>Demo Accounts:</Text>
                  <Text style={styles.demoText}>Student: student@demo.com / demo123</Text>
                  <Text style={styles.demoText}>Admin: admin@demo.com / admin123</Text>
                </View>
              )}
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
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activeToggleText: {
    color: '#3B82F6',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  demoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleModeButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  toggleModeText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  demoInfo: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 4,
  },
});

export default AuthScreen;
