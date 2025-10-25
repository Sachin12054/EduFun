import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function TeacherDashboardScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [teacherData, setTeacherData] = useState({
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    employeeId: 'EMP001',
    totalStudents: 234,
    activeClasses: 5,
    completedAssignments: 28,
    pendingGrades: 12,
  });

  // Animation values
  const fadeAnimation = useSharedValue(0);
  const slideAnimation = useSharedValue(50);

  useEffect(() => {
    // Initialize animations
    fadeAnimation.value = withTiming(1, { duration: 800 });
    slideAnimation.value = withSpring(0, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnimation.value,
    transform: [
      {
        translateY: slideAnimation.value,
      },
    ],
  }));

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const DashboardCard = ({ title, value, icon, color, onPress }) => (
    <TouchableOpacity style={[styles.dashboardCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
    </TouchableOpacity>
  );

  const QuickAction = ({ icon, title, color, onPress }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.quickActionTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {teacherData.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.teacherName}>{teacherData.name}</Text>
              <Text style={styles.departmentText}>{teacherData.department}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={animatedStyle}>
          {/* Dashboard Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dashboard Overview</Text>
            <View style={styles.statsGrid}>
              <DashboardCard
                title="Total Students"
                value={teacherData.totalStudents}
                icon="people-outline"
                color="#059669"
                onPress={() => navigation.navigate('Students')}
              />
              <DashboardCard
                title="Active Classes"
                value={teacherData.activeClasses}
                icon="library-outline"
                color="#3b82f6"
                onPress={() => navigation.navigate('Classes')}
              />
              <DashboardCard
                title="Assignments"
                value={teacherData.completedAssignments}
                icon="document-text-outline"
                color="#f59e0b"
                onPress={() => navigation.navigate('Assignments')}
              />
              <DashboardCard
                title="Pending Grades"
                value={teacherData.pendingGrades}
                icon="checkmark-circle-outline"
                color="#ef4444"
                onPress={() => navigation.navigate('Grading')}
              />
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <QuickAction
                icon="add-circle-outline"
                title="Create Assignment"
                color="#059669"
                onPress={() => navigation.navigate('CreateAssignment')}
              />
              <QuickAction
                icon="analytics-outline"
                title="View Analytics"
                color="#3b82f6"
                onPress={() => navigation.navigate('Analytics')}
              />
              <QuickAction
                icon="chatbubbles-outline"
                title="Message Students"
                color="#f59e0b"
                onPress={() => navigation.navigate('Messages')}
              />
              <QuickAction
                icon="calendar-outline"
                title="Schedule Class"
                color="#8b5cf6"
                onPress={() => navigation.navigate('Schedule')}
              />
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#dcfce7' }]}>
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Assignment Submitted</Text>
                  <Text style={styles.activityDescription}>
                    15 students submitted "Data Structures Quiz"
                  </Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>

              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="people" size={20} color="#2563eb" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>New Student Enrolled</Text>
                  <Text style={styles.activityDescription}>
                    Sarah Wilson joined "Advanced Programming"
                  </Text>
                  <Text style={styles.activityTime}>1 day ago</Text>
                </View>
              </View>

              <View style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: '#fef3c7' }]}>
                  <Ionicons name="document-text" size={20} color="#d97706" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Grade Reminder</Text>
                  <Text style={styles.activityDescription}>
                    12 assignments pending grading
                  </Text>
                  <Text style={styles.activityTime}>2 days ago</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Today's Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <View style={styles.scheduleList}>
              <View style={styles.scheduleItem}>
                <View style={styles.scheduleTime}>
                  <Text style={styles.scheduleTimeText}>9:00 AM</Text>
                </View>
                <View style={styles.scheduleContent}>
                  <Text style={styles.scheduleTitle}>Data Structures & Algorithms</Text>
                  <Text style={styles.scheduleLocation}>Room 301 • 45 students</Text>
                </View>
                <TouchableOpacity style={styles.scheduleAction}>
                  <Ionicons name="chevron-forward" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>

              <View style={styles.scheduleItem}>
                <View style={styles.scheduleTime}>
                  <Text style={styles.scheduleTimeText}>2:00 PM</Text>
                </View>
                <View style={styles.scheduleContent}>
                  <Text style={styles.scheduleTitle}>Advanced Programming</Text>
                  <Text style={styles.scheduleLocation}>Room 205 • 32 students</Text>
                </View>
                <TouchableOpacity style={styles.scheduleAction}>
                  <Ionicons name="chevron-forward" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'overview' && styles.activeNavItem]}
          onPress={() => setSelectedTab('overview')}
        >
          <Ionicons 
            name={selectedTab === 'overview' ? "home" : "home-outline"} 
            size={24} 
            color={selectedTab === 'overview' ? "#059669" : "#64748b"} 
          />
          <Text style={[styles.navText, selectedTab === 'overview' && styles.activeNavText]}>
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'classes' && styles.activeNavItem]}
          onPress={() => {
            setSelectedTab('classes');
            navigation.navigate('Classes');
          }}
        >
          <Ionicons 
            name={selectedTab === 'classes' ? "school" : "school-outline"} 
            size={24} 
            color={selectedTab === 'classes' ? "#059669" : "#64748b"} 
          />
          <Text style={[styles.navText, selectedTab === 'classes' && styles.activeNavText]}>
            Classes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'students' && styles.activeNavItem]}
          onPress={() => {
            setSelectedTab('students');
            navigation.navigate('Students');
          }}
        >
          <Ionicons 
            name={selectedTab === 'students' ? "people" : "people-outline"} 
            size={24} 
            color={selectedTab === 'students' ? "#059669" : "#64748b"} 
          />
          <Text style={[styles.navText, selectedTab === 'students' && styles.activeNavText]}>
            Students
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, selectedTab === 'profile' && styles.activeNavItem]}
          onPress={() => {
            setSelectedTab('profile');
            navigation.navigate('Profile');
          }}
        >
          <Ionicons 
            name={selectedTab === 'profile' ? "person" : "person-outline"} 
            size={24} 
            color={selectedTab === 'profile' ? "#059669" : "#64748b"} 
          />
          <Text style={[styles.navText, selectedTab === 'profile' && styles.activeNavText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  teacherName: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: 2,
  },
  departmentText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 1,
  },
  profileButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: (width - 60) / 2,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: (width - 60) / 2,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  activityList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  scheduleList: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  scheduleTime: {
    marginRight: 16,
  },
  scheduleTimeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  scheduleLocation: {
    fontSize: 14,
    color: '#64748b',
  },
  scheduleAction: {
    padding: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeNavItem: {
    backgroundColor: '#f0fdf4',
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 4,
  },
  activeNavText: {
    color: '#059669',
  },
});