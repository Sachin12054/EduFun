import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

// Import screens
import LoadingScreen from '../screens/LoadingScreen';
import LandingScreen from '../screens/LandingScreen';
import StudentAuthScreen from '../screens/StudentAuthScreen';
import TeacherAuthScreen from '../screens/TeacherAuthScreen';
import GradeSelectionScreen from '../screens/GradeSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import StudentHomeScreen from '../screens/StudentHomeScreen';
import Grade1Home from '../screens/Grade1Home';
import Grade2Home from '../screens/Grade2Home';
import Grade3Home from '../screens/Grade3Home';
import Grade4Home from '../screens/Grade4Home';
import Grade5Home from '../screens/Grade5Home';
import TeacherDashboardScreen from '../screens/TeacherDashboardScreen';
import ClassesScreen from '../screens/ClassesScreen';
import StudentsScreen from '../screens/StudentsScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import SubjectScreen from '../screens/SubjectScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminScreen from '../screens/AdminScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StudentTabs = () => {
  const { theme } = useTheme();
  const { userProfile } = useAuth();

  // Determine which home screen to use based on grade
  const getHomeScreen = () => {
    const grade = userProfile?.profile?.grade || userProfile?.grade;
    // Only route to specific grade if grade is set, otherwise default to Grade1
    if (grade === null || grade === undefined) {
      return Grade1Home; // Default fallback
    }
    
    switch (grade) {
      case 1:
        return Grade1Home;
      case 2:
        return Grade2Home;
      case 3:
        return Grade3Home;
      case 4:
        return Grade4Home;
      case 5:
        return Grade5Home;
      default:
        return Grade1Home; // Default fallback
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'StudentHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Subjects') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="StudentHome" 
        component={getHomeScreen()}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen name="Subjects" component={SubjectsScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const TeacherTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'TeacherDashboard') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Classes') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Students') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="TeacherDashboard" 
        component={TeacherDashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen name="Classes" component={ClassesScreen} />
      <Tab.Screen name="Students" component={StudentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MainTabs = () => {
  const { userProfile, isStudent, isTeacher } = useAuth();

  if (isStudent) {
    return <StudentTabs />;
  } else if (isTeacher) {
    return <TeacherTabs />;
  }

  // Fallback to student tabs if userType is not determined
  return <StudentTabs />;
};

const AppNavigator = () => {
  const { loading, isAuthenticated, userProfile, isStudent, isTeacher } = useAuth();
  const { isLoading: themeLoading } = useTheme();

  // Show loading screen while auth or theme is loading
  if (loading || themeLoading) {
    return <LoadingScreen />;
  }

  // Check if student needs grade selection
  const needsGradeSelection = isAuthenticated && isStudent && 
    (userProfile?.profile?.grade === null || userProfile?.profile?.grade === undefined ||
     userProfile?.grade === null || userProfile?.grade === undefined);

  console.log('🔍 Navigation State:', {
    isAuthenticated,
    isStudent,
    userProfile: userProfile?.name,
    grade: userProfile?.profile?.grade || userProfile?.grade,
    needsGradeSelection
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Not authenticated - show auth screens
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="StudentAuth" component={StudentAuthScreen} />
            <Stack.Screen name="TeacherAuth" component={TeacherAuthScreen} />
          </>
        ) : needsGradeSelection ? (
          // Authenticated student needs grade selection
          <>
            <Stack.Screen name="GradeSelection" component={GradeSelectionScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
          </>
        ) : (
          // Authenticated with complete profile - show main app
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="GradeSelection" component={GradeSelectionScreen} />
          </>
        )}
        
        {/* All other screens available after authentication */}
        {isAuthenticated && (
          <>
            {/* Student-specific screens */}
            <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
            <Stack.Screen name="Grade1Home" component={Grade1Home} />
            <Stack.Screen name="Grade2Home" component={Grade2Home} />
            <Stack.Screen name="Grade3Home" component={Grade3Home} />
            <Stack.Screen name="Grade4Home" component={Grade4Home} />
            <Stack.Screen name="Grade5Home" component={Grade5Home} />
            <Stack.Screen name="Subject" component={SubjectScreen} />
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
            
            {/* Teacher-specific screens */}
            <Stack.Screen name="TeacherDashboard" component={TeacherDashboardScreen} />
            <Stack.Screen name="Classes" component={ClassesScreen} />
            <Stack.Screen name="Students" component={StudentsScreen} />
            
            {/* Shared screens */}
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Subjects" component={SubjectsScreen} />
            
            {/* Legacy screens for backward compatibility */}
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;