import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Logo/Logo.jpg')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>EduFun</Text>
          <Text style={styles.subtitle}>Gamified Learning Platform</Text>
          <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#E0E7FF',
    marginBottom: 50,
    textAlign: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#E0E7FF',
  },
});

export default LoadingScreen;