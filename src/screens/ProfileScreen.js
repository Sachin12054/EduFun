import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = () => {
  const { userData, userStats, logout, currentUser } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const ProfileItem = ({ icon, title, value, onPress }) => (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
      <View style={styles.profileItemLeft}>
        <Text style={styles.profileItemIcon}>{icon}</Text>
        <Text style={styles.profileItemTitle}>{title}</Text>
      </View>
      <Text style={styles.profileItemValue}>{value}</Text>
    </TouchableOpacity>
  );

  const StatItem = ({ title, value, color }) => (
    <View style={[styles.statItem, { borderLeftColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8']}
        style={styles.header}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(userData?.name || currentUser?.displayName || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>
            {userData?.name || currentUser?.displayName || 'User'}
          </Text>
          <Text style={styles.userEmail}>
            {userData?.email || currentUser?.email}
          </Text>
          {userData?.role && (
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{userData.role.toUpperCase()}</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <View style={styles.statsContainer}>
            <StatItem 
              title="Total Points" 
              value={userStats?.totalPoints || userData?.total_points || 0} 
              color="#10B981" 
            />
            <StatItem 
              title="Badges Earned" 
              value={userStats?.totalBadges || userData?.total_badges || 0} 
              color="#F59E0B" 
            />
            <StatItem 
              title="Activities Done" 
              value={userStats?.completedActivities || 0} 
              color="#8B5CF6" 
            />
            <StatItem 
              title="Streak Days" 
              value={userStats?.streakDays || userData?.streak_days || 0} 
              color="#EF4444" 
            />
          </View>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.profileItems}>
            {userData?.class_level && (
              <ProfileItem 
                icon="🎓" 
                title="Class" 
                value={`Class ${userData.class_level}`}
                onPress={() => Alert.alert('Class', `You are in Class ${userData.class_level}`)}
              />
            )}
            {userData?.section && (
              <ProfileItem 
                icon="📚" 
                title="Section" 
                value={`Section ${userData.section}`}
                onPress={() => Alert.alert('Section', `You are in Section ${userData.section}`)}
              />
            )}
            {userData?.country && (
              <ProfileItem 
                icon="🌍" 
                title="Country" 
                value={userData.country}
                onPress={() => Alert.alert('Country', userData.country)}
              />
            )}
            {userData?.state && (
              <ProfileItem 
                icon="📍" 
                title="State" 
                value={userData.state}
                onPress={() => Alert.alert('State', userData.state)}
              />
            )}
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionItems}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Settings', 'Settings feature coming soon!')}
            >
              <Text style={styles.actionButtonIcon}>⚙️</Text>
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('Help', 'Help & Support feature coming soon!')}
            >
              <Text style={styles.actionButtonIcon}>❓</Text>
              <Text style={styles.actionButtonText}>Help & Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => Alert.alert('About', 'EduFun - Gamified Learning Platform v1.0')}
            >
              <Text style={styles.actionButtonIcon}>ℹ️</Text>
              <Text style={styles.actionButtonText}>About</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Text style={styles.actionButtonIcon}>🚪</Text>
              <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 5,
  },
  profileItems: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  profileItemTitle: {
    fontSize: 16,
    color: '#1F2937',
  },
  profileItemValue: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionItems: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionButtonIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#1F2937',
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#EF4444',
  },
});

export default ProfileScreen;