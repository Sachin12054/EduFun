import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const HelpCenterScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: 'rocket',
      items: [
        'How to create an account',
        'Setting up your profile',
        'Understanding the dashboard',
        'Your first lesson',
      ],
    },
    {
      title: 'Learning',
      icon: 'book',
      items: [
        'How to access lessons',
        'Taking quizzes',
        'Tracking your progress',
        'Earning points and achievements',
      ],
    },
    {
      title: 'Technical Support',
      icon: 'settings',
      items: [
        'App not loading',
        'Audio/Video issues',
        'Syncing problems',
        'Account recovery',
      ],
    },
    {
      title: 'Account & Privacy',
      icon: 'shield-checkmark',
      items: [
        'Managing your account',
        'Privacy settings',
        'Data security',
        'Deleting your account',
      ],
    },
  ];

  const contactOptions = [
    {
      title: 'Email Support',
      subtitle: 'Get help via email',
      icon: 'mail',
      action: () => Linking.openURL('mailto:support@kidemy.com'),
    },
    {
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      icon: 'chatbubbles',
      action: () => {},
    },
    {
      title: 'FAQ',
      subtitle: 'Frequently asked questions',
      icon: 'help-circle',
      action: () => {},
    },
  ];

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={[styles.welcomeSection, { backgroundColor: theme.surface }]}>
          <Ionicons name="help-circle" size={48} color={theme.primary} />
          <Text style={[styles.welcomeTitle, { color: theme.text }]}>How can we help you?</Text>
          <Text style={[styles.welcomeSubtitle, { color: theme.textSecondary }]}>
            Find answers to common questions or contact our support team
          </Text>
        </View>

        {/* Quick Contact Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📞 Contact Support</Text>
          {contactOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.contactItem, { backgroundColor: theme.surface }]}
              onPress={option.action}
            >
              <View style={[styles.contactIcon, { backgroundColor: theme.primary + '20' }]}>
                <Ionicons name={option.icon} size={24} color={theme.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>{option.title}</Text>
                <Text style={[styles.contactSubtitle, { color: theme.textSecondary }]}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📚 Browse by Category</Text>
          {helpCategories.map((category, index) => (
            <View key={index} style={[styles.categoryCard, { backgroundColor: theme.surface }]}>
              <View style={styles.categoryHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: theme.primary + '20' }]}>
                  <Ionicons name={category.icon} size={24} color={theme.primary} />
                </View>
                <Text style={[styles.categoryTitle, { color: theme.text }]}>{category.title}</Text>
              </View>
              {category.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[styles.helpItem, { borderBottomColor: theme.border }]}
                >
                  <Text style={[styles.helpItemText, { color: theme.textSecondary }]}>{item}</Text>
                  <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* App Info */}
        <View style={[styles.appInfoSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.appInfoTitle, { color: theme.text }]}>App Information</Text>
          <View style={styles.appInfoItem}>
            <Text style={[styles.appInfoLabel, { color: theme.textSecondary }]}>Version:</Text>
            <Text style={[styles.appInfoValue, { color: theme.text }]}>1.0.0</Text>
          </View>
          <View style={styles.appInfoItem}>
            <Text style={[styles.appInfoLabel, { color: theme.textSecondary }]}>Build:</Text>
            <Text style={[styles.appInfoValue, { color: theme.text }]}>2024.01.001</Text>
          </View>
          <View style={styles.appInfoItem}>
            <Text style={[styles.appInfoLabel, { color: theme.textSecondary }]}>Platform:</Text>
            <Text style={[styles.appInfoValue, { color: theme.text }]}>React Native</Text>
          </View>
        </View>
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
  welcomeSection: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 16,
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  helpItemText: {
    fontSize: 14,
    flex: 1,
  },
  appInfoSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  appInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  appInfoLabel: {
    fontSize: 14,
  },
  appInfoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HelpCenterScreen;