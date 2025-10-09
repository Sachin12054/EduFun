import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const LeaderboardScreen = ({ navigation }) => {
  const { theme } = useTheme();

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Alex Chen', points: 2840, avatar: 'A', color: '#FFD700' },
    { rank: 2, name: 'Sarah Kim', points: 2675, avatar: 'S', color: '#C0C0C0' },
    { rank: 3, name: 'Mike Johnson', points: 2450, avatar: 'M', color: '#CD7F32' },
    { rank: 4, name: 'Emma Davis', points: 2320, avatar: 'E', color: '#667eea' },
    { rank: 5, name: 'You', points: 2150, avatar: 'Y', color: '#4ECDC4' },
    { rank: 6, name: 'James Wilson', points: 2080, avatar: 'J', color: '#FF6B6B' },
    { rank: 7, name: 'Lisa Brown', points: 1950, avatar: 'L', color: '#96CEB4' },
    { rank: 8, name: 'David Lee', points: 1820, avatar: 'D', color: '#FECA57' },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return 'trophy';
      case 2: return 'medal';
      case 3: return 'medal';
      default: return 'person-circle';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return theme.textSecondary;
    }
  };

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Leaderboard</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Top 3 Podium */}
        <View style={styles.podiumSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🏆 Top Performers</Text>
          <View style={styles.podium}>
            {/* Second Place */}
            {leaderboardData[1] && (
              <View style={styles.podiumItem}>
                <View style={[styles.podiumAvatar, { backgroundColor: leaderboardData[1].color }]}>
                  <Text style={styles.avatarText}>{leaderboardData[1].avatar}</Text>
                </View>
                <View style={[styles.podiumBar, styles.secondPlace, { backgroundColor: theme.border }]}>
                  <Text style={[styles.podiumRank, { color: theme.text }]}>2</Text>
                </View>
                <Text style={[styles.podiumName, { color: theme.text }]}>{leaderboardData[1].name}</Text>
                <Text style={[styles.podiumPoints, { color: theme.textSecondary }]}>{leaderboardData[1].points} pts</Text>
              </View>
            )}

            {/* First Place */}
            {leaderboardData[0] && (
              <View style={styles.podiumItem}>
                <Ionicons name="crown" size={24} color="#FFD700" style={styles.crown} />
                <View style={[styles.podiumAvatar, { backgroundColor: leaderboardData[0].color }]}>
                  <Text style={styles.avatarText}>{leaderboardData[0].avatar}</Text>
                </View>
                <View style={[styles.podiumBar, styles.firstPlace, { backgroundColor: theme.border }]}>
                  <Text style={[styles.podiumRank, { color: theme.text }]}>1</Text>
                </View>
                <Text style={[styles.podiumName, { color: theme.text }]}>{leaderboardData[0].name}</Text>
                <Text style={[styles.podiumPoints, { color: theme.textSecondary }]}>{leaderboardData[0].points} pts</Text>
              </View>
            )}

            {/* Third Place */}
            {leaderboardData[2] && (
              <View style={styles.podiumItem}>
                <View style={[styles.podiumAvatar, { backgroundColor: leaderboardData[2].color }]}>
                  <Text style={styles.avatarText}>{leaderboardData[2].avatar}</Text>
                </View>
                <View style={[styles.podiumBar, styles.thirdPlace, { backgroundColor: theme.border }]}>
                  <Text style={[styles.podiumRank, { color: theme.text }]}>3</Text>
                </View>
                <Text style={[styles.podiumName, { color: theme.text }]}>{leaderboardData[2].name}</Text>
                <Text style={[styles.podiumPoints, { color: theme.textSecondary }]}>{leaderboardData[2].points} pts</Text>
              </View>
            )}
          </View>
        </View>

        {/* Full Leaderboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>📊 Full Rankings</Text>
          {leaderboardData.map((user, index) => (
            <View 
              key={index} 
              style={[
                styles.leaderboardItem, 
                { 
                  backgroundColor: user.name === 'You' ? theme.primary + '10' : theme.surface,
                  borderColor: user.name === 'You' ? theme.primary : 'transparent',
                  borderWidth: user.name === 'You' ? 2 : 0,
                }
              ]}
            >
              <View style={styles.userInfo}>
                <View style={[styles.rankContainer, { backgroundColor: getRankColor(user.rank) + '20' }]}>
                  <Ionicons 
                    name={getRankIcon(user.rank)} 
                    size={20} 
                    color={getRankColor(user.rank)} 
                  />
                  <Text style={[styles.rank, { color: getRankColor(user.rank) }]}>#{user.rank}</Text>
                </View>
                
                <View style={[styles.avatar, { backgroundColor: user.color }]}>
                  <Text style={styles.avatarText}>{user.avatar}</Text>
                </View>
                
                <View style={styles.userDetails}>
                  <Text style={[styles.userName, { color: theme.text }]}>
                    {user.name}
                    {user.name === 'You' && ' 👤'}
                  </Text>
                  <Text style={[styles.userPoints, { color: theme.textSecondary }]}>
                    {user.points} points
                  </Text>
                </View>
              </View>
              
              {user.rank <= 3 && (
                <Ionicons 
                  name={getRankIcon(user.rank)} 
                  size={24} 
                  color={getRankColor(user.rank)} 
                />
              )}
            </View>
          ))}
        </View>

        {/* Performance Tips */}
        <View style={[styles.tipsSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.tipsTitle, { color: theme.text }]}>💡 Tips to Climb Higher</Text>
          <Text style={[styles.tipsText, { color: theme.textSecondary }]}>
            • Complete daily lessons to earn bonus points{'\n'}
            • Take quizzes to test your knowledge{'\n'}
            • Maintain your learning streak{'\n'}
            • Help classmates to earn extra points
          </Text>
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
  podiumSection: {
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 200,
  },
  podiumItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  crown: {
    position: 'absolute',
    top: -15,
    zIndex: 1,
  },
  podiumAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  podiumBar: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  firstPlace: {
    height: 80,
  },
  secondPlace: {
    height: 60,
  },
  thirdPlace: {
    height: 40,
  },
  podiumRank: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumPoints: {
    fontSize: 12,
    textAlign: 'center',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  rank: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userPoints: {
    fontSize: 14,
  },
  tipsSection: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default LeaderboardScreen;