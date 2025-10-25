import React, { useEffect, useState } from 'react';
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
import api from '../services/api';

const AdminScreen = () => {
  const [stats, setStats] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Fetch admin stats
      const statsResponse = await api.get('/admin/stats');
      setStats(statsResponse.data || {});

      // Fetch notifications
      const notificationsResponse = await api.get('/admin/notifications');
      setNotifications(notificationsResponse.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      Alert.alert('Error', 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const NotificationCard = ({ notification }) => (
    <TouchableOpacity 
      style={[styles.notificationCard, !notification.is_read && styles.unreadNotification]}
      onPress={() => Alert.alert(notification.title, notification.message)}
    >
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationTime}>
          {new Date(notification.created_at).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.notificationMessage} numberOfLines={2}>
        {notification.message}
      </Text>
      <Text style={styles.notificationType}>{notification.notification_type}</Text>
    </TouchableOpacity>
  );

  const ActionButton = ({ title, icon, color, onPress }) => (
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading admin dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#7C3AED', '#5B21B6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Manage Kidemy Platform</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Statistics</Text>
          <View style={styles.statsContainer}>
            <StatCard 
              title="Total Students" 
              value={stats.totalUsers || 0} 
              color="#10B981" 
              icon="👥"
            />
            <StatCard 
              title="Active Sessions" 
              value={stats.activeSessions || 0} 
              color="#3B82F6" 
              icon="⚡"
            />
            <StatCard 
              title="Total Activities" 
              value={stats.totalActivities || 0} 
              color="#F59E0B" 
              icon="🎯"
            />
            <StatCard 
              title="Subjects Available" 
              value={stats.totalSubjects || 0} 
              color="#8B5CF6" 
              icon="📚"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <ActionButton 
              title="Manage Users"
              icon="👤"
              color="#3B82F6"
              onPress={() => Alert.alert('Manage Users', 'User management feature coming soon!')}
            />
            <ActionButton 
              title="Add Subject"
              icon="➕"
              color="#10B981"
              onPress={() => Alert.alert('Add Subject', 'Add subject feature coming soon!')}
            />
            <ActionButton 
              title="Analytics"
              icon="📊"
              color="#F59E0B"
              onPress={() => Alert.alert('Analytics', 'Analytics feature coming soon!')}
            />
            <ActionButton 
              title="Settings"
              icon="⚙️"
              color="#8B5CF6"
              onPress={() => Alert.alert('Settings', 'Settings feature coming soon!')}
            />
          </View>
        </View>

        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity onPress={() => Alert.alert('Notifications', 'View all notifications')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {notifications.length > 0 ? (
            notifications.slice(0, 5).map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>🔔 No notifications</Text>
              <Text style={styles.emptyStateSubtext}>All caught up!</Text>
            </View>
          )}
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <View style={styles.healthContainer}>
            <View style={styles.healthItem}>
              <View style={[styles.healthIndicator, { backgroundColor: '#10B981' }]} />
              <Text style={styles.healthText}>Database: Online</Text>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIndicator, { backgroundColor: '#10B981' }]} />
              <Text style={styles.healthText}>API: Operational</Text>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthIndicator, { backgroundColor: '#10B981' }]} />
              <Text style={styles.healthText}>Firebase: Connected</Text>
            </View>
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
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -15,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
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
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  notificationType: {
    fontSize: 12,
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
  },
  healthContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  healthIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  healthText: {
    fontSize: 14,
    color: '#1F2937',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default AdminScreen;