import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ClassesScreen({ navigation }) {
  const classes = [
    {
      id: 1,
      name: 'Data Structures & Algorithms',
      code: 'CS-301',
      students: 45,
      time: '9:00 AM - 10:30 AM',
      room: 'Room 301',
      color: '#3b82f6',
    },
    {
      id: 2,
      name: 'Advanced Programming',
      code: 'CS-205',
      students: 32,
      time: '2:00 PM - 3:30 PM',
      room: 'Room 205',
      color: '#059669',
    },
    {
      id: 3,
      name: 'Database Management',
      code: 'CS-401',
      students: 28,
      time: '11:00 AM - 12:30 PM',
      room: 'Room 102',
      color: '#f59e0b',
    },
  ];

  const ClassCard = ({ classItem }) => (
    <TouchableOpacity style={styles.classCard}>
      <View style={[styles.classHeader, { backgroundColor: classItem.color }]}>
        <Text style={styles.classCode}>{classItem.code}</Text>
        <Text style={styles.studentCount}>{classItem.students} students</Text>
      </View>
      <View style={styles.classContent}>
        <Text style={styles.className}>{classItem.name}</Text>
        <View style={styles.classDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#64748b" />
            <Text style={styles.detailText}>{classItem.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#64748b" />
            <Text style={styles.detailText}>{classItem.room}</Text>
          </View>
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
          <Text style={styles.headerTitle}>My Classes</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {classes.map((classItem) => (
          <ClassCard key={classItem.id} classItem={classItem} />
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
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  classCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  classHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classCode: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  studentCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  classContent: {
    padding: 16,
  },
  className: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  classDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});