import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider, SettingsProvider } from './src/contexts/ThemeContext';
import { UserProgressProvider } from './src/contexts/UserProgressContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <UserProgressProvider>
              <AppNavigator />
            </UserProgressProvider>
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
      <Toast />
    </SafeAreaProvider>
  );
}
