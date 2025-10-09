import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/ThemeContext';

const CustomDrawerContent = (props) => {
  const { userProfile, logout } = useAuth();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { settings, updateSetting } = useSettings();

  const menuItems = [
    {
      label: 'Home',
      icon: 'home-outline',
      onPress: () => props.navigation.navigate('MainTabs'),
    },
    {
      label: 'Dashboard',
      icon: 'analytics-outline',
      onPress: () => props.navigation.navigate('Dashboard'),
    },
    {
      label: 'Leaderboard',
      icon: 'trophy-outline',
      onPress: () => props.navigation.navigate('Leaderboard'),
    },
    {
      label: 'Settings',
      icon: 'settings-outline',
      onPress: () => props.navigation.navigate('Settings'),
    },
    {
      label: 'Help Center',
      icon: 'help-circle-outline',
      onPress: () => props.navigation.navigate('HelpCenter'),
    },
  ];

  const toggleMusicSetting = () => {
    updateSetting('musicEnabled', !settings.musicEnabled);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.surface }]}>
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userProfile?.firstName?.charAt(0) || 'S'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              Hi, {userProfile?.firstName || 'Student'}!
            </Text>
            <Text style={styles.profileDetails}>
              {userProfile?.className && userProfile?.section
                ? `Class ${userProfile.className} - ${userProfile.section}`
                : 'Student'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.menuContainer}>
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            NAVIGATION
          </Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { borderBottomColor: theme.border }]}
              onPress={item.onPress}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={theme.primary}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuText, { color: theme.text }]}>
                {item.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            PREFERENCES
          </Text>
          
          <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: theme.border }]}
            onPress={toggleMusicSetting}
          >
            <Ionicons
              name={settings.musicEnabled ? 'musical-notes' : 'musical-notes-outline'}
              size={22}
              color={theme.primary}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuText, { color: theme.text }]}>
              Music
            </Text>
            <View style={styles.toggleContainer}>
              <Text style={[styles.toggleText, { color: theme.textSecondary }]}>
                {settings.musicEnabled ? 'On' : 'Off'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomColor: theme.border }]}
            onPress={toggleTheme}
          >
            <Ionicons
              name={isDarkMode ? 'moon' : 'sunny'}
              size={22}
              color={theme.primary}
              style={styles.menuIcon}
            />
            <Text style={[styles.menuText, { color: theme.text }]}>
              Theme
            </Text>
            <View style={styles.toggleContainer}>
              <Text style={[styles.toggleText, { color: theme.textSecondary }]}>
                {isDarkMode ? 'Dark' : 'Light'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.error }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileDetails: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  menuSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 15,
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuIcon: {
    marginRight: 15,
    width: 22,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  toggleContainer: {
    alignItems: 'flex-end',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default CustomDrawerContent;