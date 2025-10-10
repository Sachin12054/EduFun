# Firebase Database Structure for EduFun

## Overview
This document describes the complete Firebase Firestore database structure for the EduFun educational app for students in Grades 1-5.

## Database Collections

### 1. Users Collection
**Path:** `/users/{userId}`

```json
{
  "uid": "user123",
  "email": "student@example.com",
  "displayName": "John Doe",
  "role": "student",
  "grade": 1,
  "schoolName": "ABC School",
  "parentEmail": "parent@example.com",
  "profilePicture": "url_to_image",
  "createdAt": "2025-01-01T00:00:00Z",
  "lastLogin": "2025-01-15T10:30:00Z"
}
```

### 2. User Progress Collection
**Path:** `/userProgress/{userId}`

This is the MAIN collection for tracking all student learning data.

```json
{
  "userId": "user123",
  
  // Overall Statistics
  "totalPoints": 450,
  "coins": 320,
  "currentStreak": 7,
  "longestStreak": 15,
  "lastActiveDate": "2025-01-15T10:30:00Z",
  
  // Lessons Progress
  "completedLessons": [
    "english_grade1_lesson_1",
    "english_grade1_lesson_2",
    "maths_grade1_lesson_1",
    "science_grade1_lesson_1"
  ],
  
  // Quizzes Progress
  "completedQuizzes": [
    {
      "id": "english_grade1_quiz_1",
      "score": 5,
      "maxScore": 5,
      "points": 20,
      "completedAt": "2025-01-15T09:00:00Z"
    },
    {
      "id": "maths_grade1_quiz_1",
      "score": 4,
      "maxScore": 5,
      "points": 16,
      "completedAt": "2025-01-15T10:00:00Z"
    }
  ],
  
  // Quick lookup for quiz results
  "quizResults": {
    "english_grade1_quiz_1": {
      "score": 5,
      "total": 5,
      "percentage": 100,
      "completedAt": "2025-01-15T09:00:00Z"
    },
    "maths_grade1_quiz_1": {
      "score": 4,
      "total": 5,
      "percentage": 80,
      "completedAt": "2025-01-15T10:00:00Z"
    }
  },
  
  // Subject-wise Progress
  "subjectProgress": {
    "english": {
      "lessons": 2,
      "quizzes": 1,
      "points": 40
    },
    "maths": {
      "lessons": 1,
      "quizzes": 1,
      "points": 35
    },
    "science": {
      "lessons": 1,
      "quizzes": 0,
      "points": 10
    },
    "social": {
      "lessons": 0,
      "quizzes": 0,
      "points": 0
    },
    "gk": {
      "lessons": 0,
      "quizzes": 0,
      "points": 0
    }
  },
  
  // Badges & Achievements
  "badges": [
    {
      "id": "super_learner",
      "earnedAt": "2025-01-10T14:00:00Z"
    },
    {
      "id": "quiz_master",
      "earnedAt": "2025-01-12T16:00:00Z"
    }
  ],
  
  // Sticker Collection
  "stickers": [1, 2, 5, 7, 9, 10],
  
  // General Achievements
  "achievements": [
    {
      "id": "first_lesson",
      "name": "First Lesson Complete!",
      "unlockedAt": "2025-01-05T11:00:00Z"
    }
  ],
  
  // Metadata
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-15T10:30:00Z"
}
```

### 3. Student Details Collection
**Path:** `/students/{userId}`

Complete student information and parent details.

```json
{
  "studentId": "user123",
  "personalInfo": {
    "fullName": "John Doe",
    "dateOfBirth": "2015-05-15",
    "age": 10,
    "gender": "Male",
    "grade": 1,
    "section": "A",
    "rollNumber": "101"
  },
  
  "schoolInfo": {
    "schoolName": "ABC School",
    "schoolCode": "SCH001",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India"
  },
  
  "parentInfo": {
    "fatherName": "Parent Name",
    "fatherEmail": "father@example.com",
    "fatherPhone": "+91-9876543210",
    "motherName": "Parent Name",
    "motherEmail": "mother@example.com",
    "motherPhone": "+91-9876543211"
  },
  
  "emergencyContact": {
    "name": "Guardian Name",
    "relation": "Uncle",
    "phone": "+91-9876543212"
  },
  
  "address": {
    "street": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  
  "preferences": {
    "favoriteSubjects": ["maths", "science"],
    "learningStyle": "visual",
    "notifications": true,
    "soundEffects": true
  },
  
  "enrollmentDate": "2025-01-01T00:00:00Z",
  "status": "active"
}
```

### 4. Learning History Collection
**Path:** `/learningHistory/{userId}/sessions/{sessionId}`

Detailed tracking of each learning session.

```json
{
  "sessionId": "session_20250115_1030",
  "userId": "user123",
  "startTime": "2025-01-15T10:30:00Z",
  "endTime": "2025-01-15T11:00:00Z",
  "duration": 1800,
  
  "activities": [
    {
      "type": "lesson",
      "subjectId": "english",
      "grade": 1,
      "lessonId": "english_grade1_lesson_1",
      "lessonTitle": "Alphabets A-Z",
      "pointsEarned": 10,
      "coinsEarned": 10,
      "timestamp": "2025-01-15T10:35:00Z"
    },
    {
      "type": "quiz",
      "subjectId": "english",
      "grade": 1,
      "quizId": "english_grade1_quiz_1",
      "quizTitle": "Alphabet Quiz",
      "score": 5,
      "maxScore": 5,
      "percentage": 100,
      "pointsEarned": 20,
      "coinsEarned": 20,
      "stickerEarned": 3,
      "timestamp": "2025-01-15T10:45:00Z"
    }
  ],
  
  "totalPointsEarned": 30,
  "totalCoinsEarned": 30,
  "lessonsCompleted": 1,
  "quizzesCompleted": 1
}
```

### 5. Leaderboard Collection
**Path:** `/leaderboards/{gradeLevel}/students/{userId}`

For displaying rankings and competition.

```json
{
  "userId": "user123",
  "displayName": "John Doe",
  "grade": 1,
  "totalPoints": 450,
  "totalCoins": 320,
  "completedLessons": 15,
  "completedQuizzes": 8,
  "badges": 5,
  "rank": 3,
  "lastUpdated": "2025-01-15T10:30:00Z"
}
```

### 6. Rewards & Transactions Collection
**Path:** `/rewards/{userId}/transactions/{transactionId}`

Track all coin and sticker rewards.

```json
{
  "transactionId": "txn_123",
  "userId": "user123",
  "type": "coin",
  "amount": 20,
  "source": "quiz_completion",
  "sourceId": "english_grade1_quiz_1",
  "description": "Completed Alphabet Quiz with 100% score!",
  "timestamp": "2025-01-15T10:45:00Z"
}
```

## Database Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /userProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /students/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /learningHistory/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /rewards/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Leaderboard is read-only for students
    match /leaderboards/{gradeLevel}/{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // Only backend can write
    }
  }
}
```

## Key Features of This Structure

### 1. **Hierarchical Organization**
- Students → StudentID → {details, progress, marks, badges, rewards}
- Clear separation of concerns

### 2. **Efficient Queries**
- Quick lookups for quiz results
- Indexed subject progress
- Fast leaderboard access

### 3. **Scalability**
- Sub-collections for history and transactions
- Prevents document size limits
- Easy to add new grades/subjects

### 4. **Real-time Updates**
- Progress syncs across devices
- Live leaderboard updates
- Instant badge notifications

### 5. **Analytics Ready**
- Detailed session tracking
- Learning pattern analysis
- Performance metrics

### 6. **Privacy & Security**
- User-specific data isolation
- Secure parent access
- Role-based permissions

## Sample Queries

### Get Student's Total Progress
```javascript
const progressRef = doc(db, 'userProgress', userId);
const progressSnap = await getDoc(progressRef);
const progress = progressSnap.data();
```

### Get All Completed Lessons for a Subject
```javascript
const lessons = progress.completedLessons.filter(
  lesson => lesson.startsWith('english_grade1')
);
```

### Get Top 10 Students in Grade 1
```javascript
const leaderboardRef = collection(db, 'leaderboards', 'grade1', 'students');
const q = query(leaderboardRef, orderBy('totalPoints', 'desc'), limit(10));
const snapshot = await getDocs(q);
```

### Get Today's Learning Activity
```javascript
const today = new Date().toISOString().split('T')[0];
const sessionsRef = collection(db, 'learningHistory', userId, 'sessions');
const q = query(
  sessionsRef, 
  where('startTime', '>=', today),
  orderBy('startTime', 'desc')
);
```

## Implementation Notes

1. **Initialize Progress**: When a student first logs in, create their documents in all collections
2. **Update Progress**: After each lesson/quiz, update multiple collections atomically if possible
3. **Sync Data**: Use Firebase's `onSnapshot` for real-time updates
4. **Backup**: Enable automatic backups in Firebase console
5. **Indexes**: Create composite indexes for complex queries

This structure provides a complete, scalable, and efficient database design for tracking student learning in the EduFun app! 🎓📚
