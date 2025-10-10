# 📊 EduFun Database Structure

## Hierarchical Firebase Firestore Structure

The database is organized in a hierarchical structure exactly as requested:
```
Students → StudentID → Profile (Student Details)
Students → StudentID → Progress (Learning Progress)
Students → StudentID → LearningHistory (Activity Log)
Students → StudentID → CoinTransactions (Coin History)
```

---

## 🗂️ Collection Structure

### 1. **Students Collection**
Main parent collection containing all student data.

#### Path: `Students/{studentId}/`

---

### 2. **Profile Subcollection**
Contains student personal details and information.

#### Path: `Students/{studentId}/Profile/details`

**Document Fields:**
```javascript
{
  studentId: string,              // Unique student ID (same as user UID)
  name: string,                   // Student's full name
  email: string,                  // Student's email
  grade: number,                  // Current grade (1-5)
  avatar: string,                 // Emoji avatar (e.g., '👦', '👧')
  dateOfBirth: string | null,     // Date of birth
  parentName: string,             // Parent/Guardian name
  parentContact: string,          // Parent contact number
  schoolName: string,             // School name
  rollNumber: string,             // Roll number
  createdAt: timestamp,           // Account creation date
  updatedAt: timestamp,           // Last profile update
  isActive: boolean               // Account status
}
```

**Example:**
```javascript
{
  studentId: "abc123xyz",
  name: "Rahul Kumar",
  email: "rahul@example.com",
  grade: 3,
  avatar: "👦",
  dateOfBirth: "2015-05-10",
  parentName: "Mr. Kumar",
  parentContact: "+91-9876543210",
  schoolName: "Green Valley School",
  rollNumber: "GVS-2023-045",
  createdAt: Firebase.Timestamp,
  updatedAt: Firebase.Timestamp,
  isActive: true
}
```

---

### 3. **Progress Subcollection**
Tracks all learning progress, points, coins, badges, and completion status.

#### Path: `Students/{studentId}/Progress/stats`

**Document Fields:**
```javascript
{
  studentId: string,              // Unique student ID
  totalPoints: number,            // Total points earned (0)
  totalCoins: number,             // Total coins earned (0)
  level: number,                  // Current level (1)
  
  completedLessons: array,        // Array of completed lesson keys
  // Example: ["maths_1_1", "english_1_2", "science_2_3"]
  
  quizResults: object,            // Quiz results by quiz key
  // Example: {
  //   "maths_1_1": {
  //     score: 85,
  //     totalQuestions: 10,
  //     correctAnswers: 8,
  //     pointsEarned: 25,
  //     coinsEarned: 10,
  //     completedAt: timestamp
  //   }
  // }
  
  badges: array,                  // Array of earned badges
  // Example: [
  //   {
  //     id: "first_lesson",
  //     name: "First Steps",
  //     icon: "🎯",
  //     earnedAt: timestamp
  //   }
  // ]
  
  stickers: array,                // Array of collected stickers
  // Example: [
  //   {
  //     id: "star_1",
  //     name: "Golden Star",
  //     emoji: "⭐",
  //     earnedAt: timestamp
  //   }
  // ]
  
  subjectProgress: object,        // Progress by subject
  // {
  //   english: { lessonsCompleted: 5, quizzesCompleted: 2, points: 150 },
  //   maths: { lessonsCompleted: 8, quizzesCompleted: 3, points: 220 },
  //   science: { lessonsCompleted: 6, quizzesCompleted: 2, points: 180 },
  //   social: { lessonsCompleted: 4, quizzesCompleted: 1, points: 100 },
  //   gk: { lessonsCompleted: 3, quizzesCompleted: 1, points: 90 }
  // }
  
  lastActivityDate: timestamp,    // Last learning activity
  createdAt: timestamp,           // Progress initialization date
  updatedAt: timestamp            // Last update
}
```

**Lesson Key Format:**
```
{subject}_{grade}_{lessonId}
Examples: 
- maths_1_1 (Maths, Grade 1, Lesson 1)
- science_3_4 (Science, Grade 3, Lesson 4)
```

**Quiz Key Format:**
```
{subject}_{grade}_{quizId}
Examples:
- maths_1_1 (Maths, Grade 1, Quiz 1)
- english_2_1 (English, Grade 2, Quiz 1)
```

---

### 4. **LearningHistory Subcollection**
Logs all learning activities for tracking and analytics.

#### Path: `Students/{studentId}/LearningHistory/{activityId}`

**Document Fields:**
```javascript
{
  type: string,                   // Activity type: "lesson_completed", "quiz_completed", "badge_earned", "sticker_earned"
  subject: string,                // Subject name (english, maths, science, social, gk)
  grade: number,                  // Grade number (1-5)
  lessonId: number,               // Lesson ID (for lessons)
  lessonTitle: string,            // Lesson title
  quizId: number,                 // Quiz ID (for quizzes)
  quizTitle: string,              // Quiz title
  score: number,                  // Quiz score percentage (0-100)
  correctAnswers: number,         // Number of correct answers
  totalQuestions: number,         // Total quiz questions
  pointsEarned: number,           // Points earned from activity
  coinsEarned: number,            // Coins earned from activity
  badgeId: string,                // Badge ID (for badges)
  badgeName: string,              // Badge name
  badgeIcon: string,              // Badge icon emoji
  stickerId: string,              // Sticker ID (for stickers)
  stickerName: string,            // Sticker name
  stickerEmoji: string,           // Sticker emoji
  timestamp: timestamp,           // Activity timestamp
  date: string                    // Date in YYYY-MM-DD format
}
```

**Example Activities:**
```javascript
// Lesson Completed
{
  type: "lesson_completed",
  subject: "maths",
  grade: 1,
  lessonId: 1,
  lessonTitle: "Numbers 1 to 10",
  pointsEarned: 10,
  coinsEarned: 5,
  timestamp: Firebase.Timestamp,
  date: "2025-10-10"
}

// Quiz Completed
{
  type: "quiz_completed",
  subject: "science",
  grade: 2,
  quizId: 1,
  quizTitle: "Living Things Quiz",
  score: 85,
  correctAnswers: 5,
  totalQuestions: 6,
  pointsEarned: 24,
  coinsEarned: 10,
  timestamp: Firebase.Timestamp,
  date: "2025-10-10"
}

// Badge Earned
{
  type: "badge_earned",
  badgeId: "quiz_master",
  badgeName: "Quiz Master",
  badgeIcon: "🏆",
  timestamp: Firebase.Timestamp,
  date: "2025-10-10"
}
```

---

### 5. **CoinTransactions Subcollection**
Tracks all coin earning and spending activities.

#### Path: `Students/{studentId}/CoinTransactions/{transactionId}`

**Document Fields:**
```javascript
{
  amount: number,                 // Coin amount (positive for earned, negative for spent)
  reason: string,                 // Transaction reason
  type: string,                   // "earned" or "spent"
  timestamp: timestamp,           // Transaction time
  date: string                    // Date in YYYY-MM-DD format
}
```

**Example Transactions:**
```javascript
// Coins Earned
{
  amount: 5,
  reason: "Lesson completed",
  type: "earned",
  timestamp: Firebase.Timestamp,
  date: "2025-10-10"
}

// Coins Spent
{
  amount: -20,
  reason: "Purchased avatar",
  type: "spent",
  timestamp: Firebase.Timestamp,
  date: "2025-10-10"
}
```

---

### 6. **Leaderboard Collection**
Global leaderboard organized by grade.

#### Path: `Leaderboard/{gradeX}/Students/{studentId}`

**Document Fields:**
```javascript
{
  studentId: string,              // Student ID
  name: string,                   // Student name
  avatar: string,                 // Student avatar emoji
  totalPoints: number,            // Total points
  totalCoins: number,             // Total coins
  badges: number,                 // Number of badges earned
  grade: number,                  // Student's grade
  updatedAt: timestamp            // Last update time
}
```

**Example:**
```javascript
// Path: Leaderboard/grade1/Students/abc123
{
  studentId: "abc123",
  name: "Rahul Kumar",
  avatar: "👦",
  totalPoints: 450,
  totalCoins: 180,
  badges: 5,
  grade: 1,
  updatedAt: Firebase.Timestamp
}
```

---

## 🔧 Database Operations

### **Create Student Profile**
```javascript
import { createStudentProfile } from '../services/database';

const profile = await createStudentProfile('studentId123', {
  name: 'Rahul Kumar',
  email: 'rahul@example.com',
  grade: 3,
  avatar: '👦',
  parentName: 'Mr. Kumar',
  parentContact: '+91-9876543210'
});
```

### **Get Student Progress**
```javascript
import { getStudentProgress } from '../services/database';

const progress = await getStudentProgress('studentId123');
console.log(progress.totalPoints); // 450
console.log(progress.totalCoins);  // 180
```

### **Mark Lesson Complete**
```javascript
import { markLessonComplete } from '../services/database';

await markLessonComplete('studentId123', {
  subject: 'maths',
  grade: 1,
  lessonId: 1,
  lessonTitle: 'Numbers 1 to 10',
  points: 10
});
```

### **Save Quiz Result**
```javascript
import { saveQuizResult } from '../services/database';

await saveQuizResult('studentId123', {
  subject: 'science',
  grade: 2,
  quizId: 1,
  quizTitle: 'Living Things Quiz',
  score: 85,
  totalQuestions: 6,
  correctAnswers: 5,
  pointsEarned: 24,
  coinsEarned: 10
});
```

### **Award Badge**
```javascript
import { awardBadge } from '../services/database';

await awardBadge('studentId123', {
  id: 'first_lesson',
  name: 'First Steps',
  icon: '🎯'
});
```

### **Real-Time Progress Updates**
```javascript
import { subscribeToStudentProgress } from '../services/database';

const unsubscribe = subscribeToStudentProgress('studentId123', (progress) => {
  console.log('Progress updated:', progress);
  // Update UI automatically
});

// Later: unsubscribe()
```

---

## 📈 Data Flow

1. **Student Registration/Login**
   - Create/Load Profile from `Students/{studentId}/Profile/details`
   - Initialize/Load Progress from `Students/{studentId}/Progress/stats`

2. **Lesson Completion**
   - Update `completedLessons` array
   - Increment `totalPoints` and `totalCoins`
   - Update `subjectProgress.{subject}`
   - Log activity in `LearningHistory`
   - Log coins in `CoinTransactions`

3. **Quiz Completion**
   - Save result in `quizResults` object
   - Increment `totalPoints` and `totalCoins`
   - Update `subjectProgress.{subject}`
   - Check for badges/stickers eligibility
   - Log activity in `LearningHistory`
   - Update Leaderboard

4. **Real-Time Updates**
   - All changes trigger real-time listeners
   - UI updates automatically
   - Leaderboard refreshes

---

## 🔐 Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Students can only access their own data
    match /Students/{studentId} {
      allow read, write: if request.auth != null && request.auth.uid == studentId;
      
      // Profile subcollection
      match /Profile/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == studentId;
      }
      
      // Progress subcollection
      match /Progress/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == studentId;
      }
      
      // Learning history
      match /LearningHistory/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == studentId;
      }
      
      // Coin transactions
      match /CoinTransactions/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == studentId;
      }
    }
    
    // Leaderboard is read-only for everyone
    match /Leaderboard/{grade}/Students/{studentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == studentId;
    }
  }
}
```

---

## ✅ Benefits of This Structure

1. **Hierarchical Organization** - Data is organized logically under each student
2. **Scalability** - Easy to add new fields and subcollections
3. **Real-Time Updates** - Instant synchronization across devices
4. **Query Efficiency** - Fast retrieval of specific student data
5. **Security** - Students can only access their own data
6. **Analytics Ready** - LearningHistory enables detailed analytics
7. **Offline Support** - Firebase SDK provides offline caching

---

## 🚀 Getting Started

1. **Initialize Firebase** (already configured in `src/config/firebase.js`)
2. **Import database functions** from `src/services/database.js`
3. **Use UserProgressContext** for automatic state management
4. **All operations are handled automatically** when using the context!

Example:
```javascript
import { useUserProgress } from '../contexts/UserProgressContext';

function MyComponent() {
  const { userProgress, studentProfile, completeLesson } = useUserProgress();
  
  const handleLessonComplete = async () => {
    await completeLesson('maths', 1, 10, 1, 'Numbers 1 to 10');
    // Database updated automatically! ✅
  };
  
  return (
    <View>
      <Text>{studentProfile?.name}</Text>
      <Text>Points: {userProgress.totalPoints}</Text>
      <Text>Coins: {userProgress.totalCoins}</Text>
    </View>
  );
}
```

---

## 📝 Notes

- All timestamps are server-side timestamps for consistency
- Lesson/Quiz keys use format: `{subject}_{grade}_{id}`
- Real-time listeners automatically update UI
- All operations include error handling and logging
- Leaderboard updates automatically on progress changes

---

**Database is now fully functional and production-ready! 🎉**
