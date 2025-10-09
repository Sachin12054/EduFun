import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { userData, userStats, currentUser, logout } = useAuth();
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(true);

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  const fetchRecentActivities = async () => {
    try {
      const response = await api.get('/activities/recent');
      setRecentActivities(response.data || []);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      '👋 See You Soon!',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, Log Out', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const menuItems = [
    { title: '🏠 Home', action: () => setSidebarVisible(false) },
    { title: '⚙️ Settings', action: () => Alert.alert('Settings', 'Settings page coming soon!') },
    { title: '📊 Dashboard', action: () => Alert.alert('Dashboard', 'Dashboard page coming soon!') },
    { title: '🏆 Leaderboard', action: () => Alert.alert('Leaderboard', 'Leaderboard coming soon!') },
    { title: '❓ Help Center', action: () => Alert.alert('Help', 'Help center coming soon!') },
  ];

  const subjects = [
    { name: 'Mathematics', icon: '🔢', color: '#FF6B6B', description: 'Fun with numbers!' },
    { name: 'English', icon: '📚', color: '#4ECDC4', description: 'Stories & words' },
    { name: 'Science', icon: '🔬', color: '#45B7D1', description: 'Explore & discover' },
    { name: 'Social Studies', icon: '🌍', color: '#96CEB4', description: 'Learn about world' },
    { name: 'Art & Craft', icon: '🎨', color: '#FECA57', description: 'Create & imagine' },
  ];

  const StatCard = ({ title, value, color, icon }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const SubjectCard = ({ subject }) => (
    <TouchableOpacity 
      style={[styles.subjectCard, { backgroundColor: subject.color + '20' }]}
      onPress={() => Alert.alert(subject.name, `Opening ${subject.name} activities...`)}
    >
      <View style={[styles.subjectIconContainer, { backgroundColor: subject.color }]}>
        <Text style={styles.subjectIcon}>{subject.icon}</Text>
      </View>
      <Text style={styles.subjectName}>{subject.name}</Text>
      <Text style={styles.subjectDescription}>{subject.description}</Text>
      <View style={styles.subjectFooter}>
        <Text style={styles.startButton}>🚀 Start</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Menu and Profile */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>🎓 EduFun</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => setProfileVisible(true)}
        >
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>
              {(userData?.name || currentUser?.displayName || 'Student')[0].toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.welcomeCard}
        >
          <Text style={styles.welcomeText}>
            Hello, {userData?.name || currentUser?.displayName || 'Amazing Student'}! 🌟
          </Text>
          <Text style={styles.welcomeSubtext}>Ready to learn something awesome today?</Text>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Your Progress</Text>
          <View style={styles.statsContainer}>
            <StatCard 
              title="Points" 
              value={userStats?.totalPoints || 145} 
              color="#FF6B6B"
              icon="⭐"
            />
            <StatCard 
              title="Badges" 
              value={userStats?.totalBadges || 8} 
              color="#4ECDC4"
              icon="🏅"
            />
            <StatCard 
              title="Activities" 
              value={userStats?.completedActivities || 23} 
              color="#45B7D1"
              icon="📝"
            />
            <StatCard 
              title="Streak" 
              value={userStats?.streakDays || 7} 
              color="#96CEB4"
              icon="🔥"
            />
          </View>
        </View>

        {/* Subjects Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Your Subjects</Text>
          <View style={styles.subjectsContainer}>
            {subjects.map((subject, index) => (
              <SubjectCard key={index} subject={subject} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sidebar Menu Modal */}
      <Modal
        visible={sidebarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSidebarVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setSidebarVisible(false)}
        >
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setSidebarVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  setSidebarVisible(false);
                  item.action();
                }}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}

            {/* Settings toggles */}
            <View style={styles.settingsSection}>
              <TouchableOpacity 
                style={styles.settingItem}
                onPress={() => setIsMusicOn(!isMusicOn)}
              >
                <Text style={styles.settingText}>
                  {isMusicOn ? '🎵 Music: ON' : '🔇 Music: OFF'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.settingItem}
                onPress={() => setIsDarkTheme(!isDarkTheme)}
              >
                <Text style={styles.settingText}>
                  {isDarkTheme ? '🌙 Dark Theme' : '☀️ Light Theme'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>🚪 Log Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Profile Modal */}
      <Modal
        visible={profileVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setProfileVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setProfileVisible(false)}
        >
          <View style={styles.profileModal}>
            <View style={styles.profileHeader}>
              <View style={[styles.profileCircle, styles.largeProfileCircle]}>
                <Text style={styles.largeProfileText}>
                  {(userData?.name || currentUser?.displayName || 'Student')[0].toUpperCase()}
                </Text>
              </View>
              <Text style={styles.profileName}>
                {userData?.name || currentUser?.displayName || 'Amazing Student'}
              </Text>
              <Text style={styles.profileEmail}>
                {currentUser?.email || 'student@edufun.com'}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>✏️ Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeProfileButton}
              onPress={() => setProfileVisible(false)}
            >
              <Text style={styles.closeProfileText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#4A5568',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  profileButton: {
    padding: 4,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeCard: {
    borderRadius: 20,
    padding: 25,
    marginVertical: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    width: '48%',
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subjectCard: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  subjectIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  subjectIcon: {
    fontSize: 30,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 4,
  },
  subjectDescription: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 12,
  },
  subjectFooter: {
    alignItems: 'center',
  },
  startButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    backgroundColor: '#FFFFFF',
    width: width * 0.75,
    height: '100%',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  closeButton: {
    fontSize: 24,
    color: '#A0AEC0',
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  menuItemText: {
    fontSize: 18,
    color: '#4A5568',
  },
  settingsSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  settingItem: {
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#4A5568',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FED7D7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E53E3E',
  },
  // Profile Modal Styles
  profileModal: {
    backgroundColor: '#FFFFFF',
    margin: 40,
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  largeProfileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  largeProfileText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#718096',
  },
  editProfileButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 15,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  closeProfileButton: {
    paddingVertical: 10,
  },
  closeProfileText: {
    color: '#A0AEC0',
    fontSize: 16,
  },
});

export default HomeScreen;