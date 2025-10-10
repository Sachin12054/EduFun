# 🧪 Database Testing Guide

## Prerequisites
Before testing, ensure:
1. ✅ Firebase project is created
2. ✅ Firebase config is added to `src/config/firebase.js`
3. ✅ Firestore is enabled in Firebase Console
4. ✅ Authentication is set up (Email/Password)

---

## 🔍 Testing Checklist

### 1. **Student Registration & Profile Creation**

**Test Steps:**
1. Open the app
2. Register a new student account (Email + Password)
3. Check Firebase Console → Firestore Database

**Expected Results:**
```
Collection: Students
└── {studentId}
    ├── Profile
    │   └── details
    │       ├── studentId: "abc123"
    │       ├── name: "Student Name"
    │       ├── email: "student@example.com"
    │       ├── grade: 1
    │       ├── avatar: "👦"
    │       ├── createdAt: timestamp
    │       └── updatedAt: timestamp
    │
    └── Progress
        └── stats
            ├── studentId: "abc123"
            ├── totalPoints: 0
            ├── totalCoins: 0
            ├── level: 1
            ├── completedLessons: []
            ├── quizResults: {}
            ├── badges: []
            ├── stickers: []
            ├── subjectProgress:
            │   ├── english: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 }
            │   ├── maths: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 }
            │   ├── science: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 }
            │   ├── social: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 }
            │   └── gk: { lessonsCompleted: 0, quizzesCompleted: 0, points: 0 }
            ├── createdAt: timestamp
            └── updatedAt: timestamp
```

**Status:** ✅ PASS / ❌ FAIL

---

### 2. **Lesson Completion**

**Test Steps:**
1. Login to the app
2. Go to Home Screen
3. Select any subject (e.g., Maths)
4. Select Grade 1
5. Complete "Numbers 1 to 10" lesson
6. Check Firebase Console

**Expected Results:**
```
Students/{studentId}/Progress/stats:
  completedLessons: ["maths_1_1"]
  totalPoints: 10
  totalCoins: 5
  subjectProgress:
    maths:
      lessonsCompleted: 1
      quizzesCompleted: 0
      points: 10

Students/{studentId}/LearningHistory/{activityId}:
  type: "lesson_completed"
  subject: "maths"
  grade: 1
  lessonId: 1
  lessonTitle: "Numbers 1 to 10"
  pointsEarned: 10
  coinsEarned: 5
  timestamp: timestamp
  date: "2025-10-10"

Students/{studentId}/CoinTransactions/{transactionId}:
  amount: 5
  reason: "Completed: Numbers 1 to 10"
  type: "earned"
  timestamp: timestamp
  date: "2025-10-10"
```

**App Display:**
- Lesson card shows ✅ checkmark
- Alert shows: "You earned 10 coins! 🪙"
- Points updated on dashboard
- Confetti animation plays

**Status:** ✅ PASS / ❌ FAIL

---

### 3. **Quiz Completion - Perfect Score**

**Test Steps:**
1. Go to Maths → Grade 1 → Quizzes Tab
2. Take "Counting Fun Quiz"
3. Answer ALL questions correctly (5/5)
4. Check Firebase Console

**Expected Results:**
```
Students/{studentId}/Progress/stats:
  quizResults:
    maths_1_1:
      score: 100
      totalQuestions: 5
      correctAnswers: 5
      pointsEarned: 30  (20 base + 10 bonus)
      coinsEarned: 15   (10 base + 5 bonus)
      completedAt: timestamp
  
  totalPoints: 40  (10 from lesson + 30 from quiz)
  totalCoins: 20   (5 from lesson + 15 from quiz)
  stickers: [
    {
      id: "star_1",
      name: "Golden Star",
      emoji: "⭐",
      earnedAt: timestamp
    }
  ]
  subjectProgress:
    maths:
      lessonsCompleted: 1
      quizzesCompleted: 1
      points: 40

Students/{studentId}/LearningHistory/{activityId}:
  type: "quiz_completed"
  subject: "maths"
  grade: 1
  quizId: 1
  quizTitle: "Counting Fun Quiz"
  score: 100
  correctAnswers: 5
  totalQuestions: 5
  pointsEarned: 30
  coinsEarned: 15
  timestamp: timestamp
  date: "2025-10-10"

Students/{studentId}/LearningHistory/{activityId2}:
  type: "sticker_earned"
  stickerId: "star_1"
  stickerName: "Golden Star"
  stickerEmoji: "⭐"
  timestamp: timestamp
  date: "2025-10-10"
```

**App Display:**
- Quiz modal shows final score: 100%
- Confetti animation plays
- Encouraging message appears
- Sticker notification shows

**Status:** ✅ PASS / ❌ FAIL

---

### 4. **Quiz Completion - Partial Score**

**Test Steps:**
1. Take another quiz
2. Answer 3 out of 5 correctly
3. Check results

**Expected Results:**
```
Score: 60%
Points Earned: 12 (60% of 20)
Coins Earned: 6 (60% of 10)
No sticker awarded
No confetti (< 80%)
```

**Status:** ✅ PASS / ❌ FAIL

---

### 5. **Real-Time Updates**

**Test Steps:**
1. Open app on Device 1 (or emulator)
2. Open same account on Device 2 (or different browser)
3. Complete a lesson on Device 1
4. Observe Device 2

**Expected Results:**
- Points/Coins update automatically on Device 2
- No refresh needed
- Progress syncs instantly

**Status:** ✅ PASS / ❌ FAIL

---

### 6. **Leaderboard Integration**

**Test Steps:**
1. Complete several lessons and quizzes
2. Check Firebase Console

**Expected Results:**
```
Collection: Leaderboard/grade1/Students/{studentId}
  studentId: "abc123"
  name: "Student Name"
  avatar: "👦"
  totalPoints: 100
  totalCoins: 50
  badges: 2
  grade: 1
  updatedAt: timestamp
```

**Status:** ✅ PASS / ❌ FAIL

---

### 7. **Badge & Sticker Awards**

**Test Steps:**
1. Complete 5 lessons to earn a badge
2. Check Firebase Console
3. Check app UI

**Expected Results:**
```
Students/{studentId}/Progress/stats:
  badges: [
    {
      id: "first_lesson",
      name: "First Steps",
      icon: "🎯",
      earnedAt: timestamp
    }
  ]

Students/{studentId}/LearningHistory/{activityId}:
  type: "badge_earned"
  badgeId: "first_lesson"
  badgeName: "First Steps"
  badgeIcon: "🎯"
  timestamp: timestamp
```

**App:** Badge notification appears

**Status:** ✅ PASS / ❌ FAIL

---

### 8. **Multiple Subjects**

**Test Steps:**
1. Complete lessons in Maths
2. Complete lessons in Science
3. Check subject-wise progress

**Expected Results:**
```
subjectProgress:
  maths:
    lessonsCompleted: 3
    quizzesCompleted: 1
    points: 65
  science:
    lessonsCompleted: 2
    quizzesCompleted: 0
    points: 24
```

**Status:** ✅ PASS / ❌ FAIL

---

### 9. **Learning History**

**Test Steps:**
1. Complete various activities
2. Query learning history
3. Verify chronological order

**Expected Results:**
```
Students/{studentId}/LearningHistory/
  - Activity 1 (most recent)
  - Activity 2
  - Activity 3
  ...
  - Activity N (oldest)
```

**Status:** ✅ PASS / ❌ FAIL

---

### 10. **Coin Transactions**

**Test Steps:**
1. Complete lessons and quizzes
2. Check coin transaction history

**Expected Results:**
```
Students/{studentId}/CoinTransactions/
  Transaction 1:
    amount: 5
    reason: "Completed: Numbers 1 to 10"
    type: "earned"
    timestamp: timestamp
  
  Transaction 2:
    amount: 15
    reason: "Quiz completed"
    type: "earned"
    timestamp: timestamp
```

**Status:** ✅ PASS / ❌ FAIL

---

## 🚀 Quick Test Commands

### Check Firestore Data (Firebase Console)
1. Go to https://console.firebase.google.com
2. Select your project
3. Navigate to Firestore Database
4. Look for `Students` collection

### Test in App
```javascript
// Open Developer Console in app
// Check UserProgress state
console.log(userProgress);

// Check Student Profile
console.log(studentProfile);
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Data Not Saving
**Solution:**
- Check Firebase config in `src/config/firebase.js`
- Verify Firestore is enabled
- Check Firebase Console for errors
- Ensure user is logged in: `console.log(user)`

### Issue 2: Real-time Updates Not Working
**Solution:**
- Check internet connection
- Verify Firestore listeners are set up
- Check for JavaScript errors in console
- Restart the app

### Issue 3: Permissions Error
**Solution:**
- Update Firestore Security Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Students/{studentId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == studentId;
    }
    match /Leaderboard/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### Issue 4: Duplicate Entries
**Solution:**
- Check if lesson/quiz completion is being called multiple times
- Add loading states to prevent double-clicks
- Use unique keys for lessons/quizzes

---

## 📊 Test Report Template

```markdown
# EduFun Database Test Report
Date: __________
Tester: __________

## Test Results
1. Profile Creation: ✅ / ❌
2. Lesson Completion: ✅ / ❌
3. Quiz - Perfect Score: ✅ / ❌
4. Quiz - Partial Score: ✅ / ❌
5. Real-Time Updates: ✅ / ❌
6. Leaderboard: ✅ / ❌
7. Badges & Stickers: ✅ / ❌
8. Multiple Subjects: ✅ / ❌
9. Learning History: ✅ / ❌
10. Coin Transactions: ✅ / ❌

## Issues Found
1. __________
2. __________

## Notes
__________
```

---

## ✅ Success Criteria

Database integration is successful when:
1. ✅ Student profiles are created automatically on registration
2. ✅ Progress is saved to Firebase in real-time
3. ✅ Learning history is logged correctly
4. ✅ Leaderboard updates automatically
5. ✅ Real-time sync works across devices
6. ✅ No data loss on app restart
7. ✅ All rewards (coins, badges, stickers) are tracked
8. ✅ Subject-wise progress is accurate

---

**Ready to test! 🚀**
