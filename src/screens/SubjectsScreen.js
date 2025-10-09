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

const SubjectsScreen = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects');
      setSubjects(response.data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      Alert.alert('Error', 'Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const getGradientColors = (colorGradient) => {
    const gradientMap = {
      'from-blue-400 to-blue-600': ['#60A5FA', '#2563EB'],
      'from-green-400 to-green-600': ['#4ADE80', '#16A34A'],
      'from-purple-400 to-purple-600': ['#A78BFA', '#7C3AED'],
      'from-pink-400 to-pink-600': ['#F472B6', '#DB2777'],
      'from-yellow-400 to-yellow-600': ['#FBBF24', '#D97706'],
    };
    return gradientMap[colorGradient] || ['#60A5FA', '#2563EB'];
  };

  const getSubjectIcon = (icon) => {
    const iconMap = {
      'Calculator': '📊',
      'BookOpen': '📚',
      'Globe': '🔬',
      'Palette': '🎨',
    };
    return iconMap[icon] || '📖';
  };

  const SubjectCard = ({ subject }) => (
    <TouchableOpacity 
      style={styles.subjectCard}
      onPress={() => Alert.alert(subject.name, `Opening ${subject.name} activities...`)}
    >
      <LinearGradient
        colors={getGradientColors(subject.color_gradient)}
        style={styles.subjectGradient}
      >
        <View style={styles.subjectContent}>
          <Text style={styles.subjectIcon}>{getSubjectIcon(subject.icon)}</Text>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.subjectDescription}>{subject.description}</Text>
          <View style={styles.subjectMeta}>
            <Text style={styles.subjectClass}>Class {subject.class_level}</Text>
            {subject.state && (
              <Text style={styles.subjectState}>{subject.state}</Text>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading subjects...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Subjects</Text>
        <Text style={styles.headerSubtitle}>Choose a subject to start learning</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subjectsContainer}>
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </View>

        {subjects.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>📚 No subjects available</Text>
            <Text style={styles.emptyStateSubtext}>Check back later for new subjects!</Text>
          </View>
        )}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subjectCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  subjectGradient: {
    padding: 20,
    minHeight: 160,
  },
  subjectContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subjectIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subjectDescription: {
    fontSize: 14,
    color: '#F3F4F6',
    lineHeight: 18,
    marginBottom: 15,
  },
  subjectMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectClass: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '600',
  },
  subjectState: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: '600',
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
    paddingVertical: 50,
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

export default SubjectsScreen;