import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { getLeaderboard } from '../services/database';

const LeaderboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { studentProfile, userProgress } = useUserProgress();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  // Load leaderboard data
  useEffect(() => {
    loadLeaderboard();
  }, [studentProfile]);

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);
      const grade = studentProfile?.grade || 1;
      const data = await getLeaderboard(grade, 50); // Get top 50
      
      // Add current user if not in top 50
      const currentUserId = user?.uid;
      const userInLeaderboard = data.find(entry => entry.studentId === currentUserId);
      
      if (!userInLeaderboard && studentProfile && userProgress) {
        // Add current user to the list
        data.push({
          rank: data.length + 1,
          studentId: currentUserId,
          name: studentProfile.name || 'You',
          avatar: studentProfile.avatar || '👦',
          totalPoints: userProgress.totalPoints || 0,
          totalCoins: userProgress.totalCoins || 0,
          badges: userProgress.badges?.length || 0,
          isCurrentUser: true
        });
      } else if (userInLeaderboard) {
        userInLeaderboard.isCurrentUser = true;
      }
      
      // Map to display format
      const formattedData = data.map((entry, index) => ({
        rank: entry.rank || (index + 1),
        name: entry.isCurrentUser ? 'You' : entry.name,
        points: entry.totalPoints || 0,
        avatar: entry.avatar || entry.name?.charAt(0)?.toUpperCase() || '?',
        color: getAvatarColor(index),
        studentId: entry.studentId,
        isCurrentUser: entry.isCurrentUser
      }));

      setLeaderboardData(formattedData);
      
      // Find current user rank
      const userEntry = formattedData.find(entry => entry.isCurrentUser);
      if (userEntry) {
        setCurrentUserRank(userEntry.rank);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      // Fallback to showing just current user
      if (studentProfile && userProgress) {
        setLeaderboardData([{
          rank: 1,
          name: 'You',
          points: userProgress.totalPoints || 0,
          avatar: studentProfile.avatar || '👦',
          color: '#4ECDC4',
          isCurrentUser: true
        }]);
        setCurrentUserRank(1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAvatarColor = (index) => {
    const colors = [
      '#FFD700', '#C0C0C0', '#CD7F32', '#667eea', '#4ECDC4', 
      '#FF6B6B', '#96CEB4', '#FECA57', '#A8E6CF', '#FF8B94'
    ];
    return colors[index % colors.length];
  };

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
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={loadLeaderboard}
        >
          <Ionicons name="refresh" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading rankings...</Text>
        </View>
      ) : (
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
                  backgroundColor: user.isCurrentUser ? theme.primary + '10' : theme.surface,
                  borderColor: user.isCurrentUser ? theme.primary : 'transparent',
                  borderWidth: user.isCurrentUser ? 2 : 0,
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
                  <Text style={styles.avatarText}>{typeof user.avatar === 'string' && user.avatar.length === 1 ? user.avatar : user.avatar}</Text>
                </View>
                
                <View style={styles.userDetails}>
                  <Text style={[styles.userName, { color: theme.text }]}>
                    {user.name}
                    {user.isCurrentUser && ' 👤'}
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

        {/* Your Current Rank */}
        {currentUserRank && (
          <View style={[styles.currentRankSection, { backgroundColor: theme.surface }]}>
            <Text style={[styles.currentRankTitle, { color: theme.text }]}>Your Current Rank</Text>
            <View style={styles.currentRankBadge}>
              <Text style={styles.currentRankNumber}>#{currentUserRank}</Text>
              <Text style={[styles.currentRankPoints, { color: theme.textSecondary }]}>
                {userProgress?.totalPoints || 0} points
              </Text>
            </View>
          </View>
        )}
        </ScrollView>
      )}
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
  refreshButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
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
  currentRankSection: {
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentRankTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  currentRankBadge: {
    alignItems: 'center',
  },
  currentRankNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 4,
  },
  currentRankPoints: {
    fontSize: 14,
  },
});

export default LeaderboardScreen;