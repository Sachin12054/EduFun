import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function StudentsScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [students] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@student.edu',
      class: 'CS-301',
      grade: 'A',
      progress: 85,
      avatar: 'AJ',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@student.edu',
      class: 'CS-205',
      grade: 'B+',
      progress: 78,
      avatar: 'BS',
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol.davis@student.edu',
      class: 'CS-301',
      grade: 'A-',
      progress: 92,
      avatar: 'CD',
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@student.edu',
      class: 'CS-401',
      grade: 'B',
      progress: 73,
      avatar: 'DW',
    },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchText.toLowerCase()) ||
    student.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const StudentCard = ({ student }) => (
    <TouchableOpacity style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{student.avatar}</Text>
        </View>
        <View style={styles.studentDetails}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentEmail}>{student.email}</Text>
          <Text style={styles.studentClass}>{student.class}</Text>
        </View>
      </View>
      <View style={styles.studentStats}>
        <View style={styles.gradeContainer}>
          <Text style={styles.gradeLabel}>Grade</Text>
          <Text style={styles.gradeValue}>{student.grade}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${student.progress}%` }]} 
            />
          </View>
          <Text style={styles.progressText}>{student.progress}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Students</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            placeholderTextColor="#64748b"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </LinearGradient>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{filteredStudents.length}</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {Math.round(filteredStudents.reduce((acc, s) => acc + s.progress, 0) / filteredStudents.length)}%
          </Text>
          <Text style={styles.statLabel}>Avg Progress</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {filteredStudents.filter(s => s.progress >= 80).length}
          </Text>
          <Text style={styles.statLabel}>Excellent</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </ScrollView>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  contentContainer: {
    padding: 20,
  },
  studentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  studentEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  studentClass: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeContainer: {
    alignItems: 'center',
  },
  gradeLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  gradeValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
  },
  progressContainer: {
    flex: 1,
    marginLeft: 24,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
  },
});