import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { settings, updateSetting } = useSettings();

  const settingsGroups = [
    {
      title: 'Appearance',
      items: [
        {
          label: 'Dark Mode',
          icon: isDarkMode ? 'moon' : 'sunny',
          type: 'toggle',
          value: isDarkMode,
          onToggle: toggleTheme,
        },
      ],
    },
    {
      title: 'Audio',
      items: [
        {
          label: 'Background Music',
          icon: 'musical-notes',
          type: 'toggle',
          value: settings.musicEnabled,
          onToggle: () => updateSetting('musicEnabled', !settings.musicEnabled),
        },
        {
          label: 'Sound Effects',
          icon: 'volume-high',
          type: 'toggle',
          value: settings.soundEffects,
          onToggle: () => updateSetting('soundEffects', !settings.soundEffects),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          label: 'Push Notifications',
          icon: 'notifications',
          type: 'toggle',
          value: settings.notificationsEnabled,
          onToggle: () => updateSetting('notificationsEnabled', !settings.notificationsEnabled),
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          label: 'Help Center',
          icon: 'help-circle',
          type: 'navigation',
          onPress: () => navigation.navigate('HelpCenter'),
        },
        {
          label: 'Privacy Policy',
          icon: 'shield-checkmark',
          type: 'navigation',
          onPress: () => {},
        },
        {
          label: 'Terms of Service',
          icon: 'document-text',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
  ];

  const renderSettingItem = (item, index) => (
    <View key={index} style={[styles.settingItem, { borderBottomColor: theme.border }]}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
          <Ionicons name={item.icon} size={20} color={theme.primary} />
        </View>
        <Text style={[styles.settingLabel, { color: theme.text }]}>{item.label}</Text>
      </View>
      
      {item.type === 'toggle' ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: theme.border, true: theme.primary + '30' }}
          thumbColor={item.value ? theme.primary : '#f4f3f4'}
        />
      ) : (
        <TouchableOpacity onPress={item.onPress}>
          <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={[styles.groupTitle, { color: theme.textSecondary }]}>
              {group.title.toUpperCase()}
            </Text>
            <View style={[styles.groupContainer, { backgroundColor: theme.surface }]}>
              {group.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  settingsGroup: {
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 1,
  },
  groupContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;