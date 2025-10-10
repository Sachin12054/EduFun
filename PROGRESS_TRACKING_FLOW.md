# Progress Tracking Flow Diagram 📊

## Lesson Completion Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER COMPLETES LESSON                       │
│                    (SubjectScreen.js)                            │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  completeLesson(subjectId, lessonId, points, grade, title)      │
│  ────────────────────────────────────────────────────────────   │
│  Example: completeLesson('science', 1, 10, 1, 'Plants')         │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│              UserProgressContext.js                              │
│  ────────────────────────────────────────────────────────────   │
│  Calls: database.markLessonComplete()                           │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                   database.js                                    │
│  ────────────────────────────────────────────────────────────   │
│  1. Create lesson key: "science_grade1_lesson_1"                │
│  2. Add to completedLessons array                               │
│  3. Increment totalPoints (+10)                                 │
│  4. Increment totalCoins (+5)                                   │
│  5. Update subjectProgress.science.lessonsCompleted (+1)        │
│  6. Update subjectProgress.science.points (+10)                 │
│  7. Log activity in LearningHistory                             │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FIREBASE FIRESTORE                            │
│  ────────────────────────────────────────────────────────────   │
│  Path: Students/{studentId}/Progress/stats                      │
│  {                                                               │
│    completedLessons: ["science_grade1_lesson_1"],              │
│    totalPoints: 10,                                             │
│    totalCoins: 5,                                               │
│    subjectProgress: {                                           │
│      science: { lessonsCompleted: 1, points: 10 }              │
│    }                                                            │
│  }                                                              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│              REAL-TIME LISTENER (Firebase)                       │
│  ────────────────────────────────────────────────────────────   │
│  subscribeToStudentProgress()                                   │
│  ↓                                                              │
│  Detects change in Firestore                                    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│              UserProgressContext Updates                         │
│  ────────────────────────────────────────────────────────────   │
│  handleProgressUpdate(updatedProgress)                          │
│  ↓                                                              │
│  setUserProgress({ ...updatedProgress })                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UI UPDATES (Instant!)                         │
│  ────────────────────────────────────────────────────────────   │
│  ✅ Green checkmark appears on lesson card                      │
│  ✅ Progress bar: "1/6 lessons completed"                       │
│  ✅ Points display: 10 points                                   │
│  ✅ Coins display: 5 coins                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Quiz Completion Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   USER COMPLETES QUIZ                            │
│                    (SubjectScreen.js)                            │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  handleQuizSubmit()                                             │
│  ────────────────────────────────────────────────────────────   │
│  Calculate: score, percentage, coins, stickers                  │
│  Call: completeQuiz(subject, quizId, score, maxScore, ...)     │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│              database.saveQuizResult()                           │
│  ────────────────────────────────────────────────────────────   │
│  Key: "science_grade1_quiz_1"                                   │
│  Save: { score, correctAnswers, pointsEarned, coinsEarned }    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FIREBASE UPDATE                               │
│  ────────────────────────────────────────────────────────────   │
│  quizResults: {                                                 │
│    "science_grade1_quiz_1": {                                   │
│      score: 80,                                                 │
│      correctAnswers: 4,                                         │
│      totalQuestions: 5,                                         │
│      pointsEarned: 16,                                          │
│      coinsEarned: 8                                             │
│    }                                                            │
│  }                                                              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UI SHOWS RESULTS                              │
│  ────────────────────────────────────────────────────────────   │
│  🏆 Quiz completed badge                                        │
│  📊 Best Score: 4/5 (80%)                                       │
│  🪙 +16 points, +8 coins                                        │
└─────────────────────────────────────────────────────────────────┘
```

## Subject Progress Display

```
┌──────────────────────────────────────────────────────────┐
│              SCIENCE SUBJECT SCREEN                       │
│ ─────────────────────────────────────────────────────────│
│                                                          │
│  📚 Science                                              │
│  Grade 1 • Explore nature and experiments               │
│                                                          │
│  🪙 25 Coins    ⭐ 50 Points                             │
│                                                          │
│  Progress: 2/6 lessons completed                         │
│  [████████░░░░░░░░░░░░] 33%                             │
│                                                          │
│  ┌─ Lessons Tab ──────────────────────────────────┐     │
│  │                                                  │     │
│  │  🌱 Plants Around Us               ✅           │     │
│  │  Learn about plants...                          │     │
│  │  ⏱️ 10 min  🪙 10  Beginner                     │     │
│  │                                                  │     │
│  │  🐶 Animals - Our Friends          ✅           │     │
│  │  Learn about different animals...               │     │
│  │  ⏱️ 12 min  🪙 12  Beginner                     │     │
│  │                                                  │     │
│  │  👋 Our Body Parts                 🔓           │     │
│  │  Learn about human body...                      │     │
│  │  ⏱️ 12 min  🪙 12  Beginner                     │     │
│  │                                                  │     │
│  └──────────────────────────────────────────────────┘     │
│                                                          │
│  ┌─ Quizzes Tab ────────────────────────────────────┐    │
│  │                                                  │     │
│  │  🎯 Science Explorer Quiz         🏆            │     │
│  │  Explore the world of science!                  │     │
│  │  Best Score: 7/7 (100%)                         │     │
│  │  ❓ 7 questions  🪙 20  Easy                    │     │
│  │                                                  │     │
│  └──────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

## Leaderboard Display

```
┌──────────────────────────────────────────────────────────┐
│                    LEADERBOARD                            │
│ ─────────────────────────────────────────────────────────│
│                                                          │
│  🏆 Top Performers                                       │
│                                                          │
│      🥈 Sarah         👑 Alex         🥉 Mike            │
│       2675pts          2840pts         2450pts           │
│                                                          │
│  📊 Full Rankings                                        │
│                                                          │
│  ┌────────────────────────────────────────────────┐      │
│  │ 🏆 #1  👤 Alex Chen         2840 points   🏆  │      │
│  └────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────┐      │
│  │ 🥈 #2  👤 Sarah Kim         2675 points   🥈  │      │
│  └────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────┐      │
│  │ 🥉 #3  👤 Mike Johnson      2450 points   🥉  │      │
│  └────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────┐      │
│  │ 👤 #4  👤 Emma Davis        2320 points        │      │
│  └────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────┐      │
│  │ 👤 #5  👦 You 👤            2150 points        │  ◄── │
│  └────────────────────────────────────────────────┘   YOU│
│  ┌────────────────────────────────────────────────┐      │
│  │ 👤 #6  👤 James Wilson      2080 points        │      │
│  └────────────────────────────────────────────────┘      │
│                                                          │
│  ┌─ Your Current Rank ──────────────────────────┐        │
│  │                                              │        │
│  │              #5                              │        │
│  │          2150 points                         │        │
│  │                                              │        │
│  └──────────────────────────────────────────────┘        │
│                                                          │
│  💡 Tips to Climb Higher                                 │
│  • Complete daily lessons to earn bonus points           │
│  • Take quizzes to test your knowledge                   │
│  • Maintain your learning streak                         │
└──────────────────────────────────────────────────────────┘
```

## Data Storage Structure

```
Firebase Firestore
│
├── Students
│   └── {studentId} (e.g., "user123")
│       │
│       ├── Profile
│       │   └── details
│       │       ├── name: "Rahul"
│       │       ├── grade: 1
│       │       ├── avatar: "👦"
│       │       └── email: "rahul@example.com"
│       │
│       ├── Progress
│       │   └── stats
│       │       ├── totalPoints: 150
│       │       ├── totalCoins: 75
│       │       ├── level: 2
│       │       ├── completedLessons: [
│       │       │     "science_grade1_lesson_1",
│       │       │     "science_grade1_lesson_2",
│       │       │     "maths_grade1_lesson_1"
│       │       │   ]
│       │       ├── quizResults: {
│       │       │     "science_grade1_quiz_1": {
│       │       │       score: 100,
│       │       │       correctAnswers: 7,
│       │       │       totalQuestions: 7,
│       │       │       pointsEarned: 30,
│       │       │       coinsEarned: 15
│       │       │     }
│       │       │   }
│       │       ├── subjectProgress: {
│       │       │     science: {
│       │       │       lessonsCompleted: 2,
│       │       │       quizzesCompleted: 1,
│       │       │       points: 50
│       │       │     },
│       │       │     maths: {
│       │       │       lessonsCompleted: 1,
│       │       │       quizzesCompleted: 0,
│       │       │       points: 10
│       │       │     }
│       │       │   }
│       │       ├── badges: [...]
│       │       └── stickers: [...]
│       │
│       ├── LearningHistory
│       │   ├── {activityId1}
│       │   │   ├── type: "lesson_completed"
│       │   │   ├── subject: "science"
│       │   │   ├── lessonTitle: "Plants Around Us"
│       │   │   ├── pointsEarned: 10
│       │   │   └── timestamp: "2025-10-10T10:30:00Z"
│       │   │
│       │   └── {activityId2}
│       │       ├── type: "quiz_completed"
│       │       ├── subject: "science"
│       │       ├── score: 100
│       │       └── timestamp: "2025-10-10T11:00:00Z"
│       │
│       └── CoinTransactions
│           ├── {transactionId1}
│           │   ├── amount: 5
│           │   ├── reason: "Completed: Plants Around Us"
│           │   ├── type: "earned"
│           │   └── timestamp: "2025-10-10T10:30:00Z"
│           │
│           └── {transactionId2}
│               ├── amount: 15
│               ├── reason: "Perfect quiz score"
│               ├── type: "earned"
│               └── timestamp: "2025-10-10T11:00:00Z"
│
└── Leaderboard
    ├── grade1
    │   └── Students
    │       ├── {studentId1}
    │       │   ├── name: "Rahul"
    │       │   ├── totalPoints: 2840
    │       │   ├── avatar: "👦"
    │       │   └── updatedAt: timestamp
    │       │
    │       └── {studentId2}
    │           ├── name: "Priya"
    │           ├── totalPoints: 2675
    │           ├── avatar: "👧"
    │           └── updatedAt: timestamp
    │
    └── grade2
        └── Students
            └── ...
```

## Key Concepts

### 1. **Lesson Key Format**
- Format: `{subject}_grade{grade}_lesson_{lessonId}`
- Example: `science_grade1_lesson_1`
- Used in: `completedLessons` array

### 2. **Quiz Key Format**
- Format: `{subject}_grade{grade}_quiz_{quizId}`
- Example: `science_grade1_quiz_1`
- Used in: `quizResults` object

### 3. **Real-time Updates**
- Firebase listeners detect changes instantly
- UI updates automatically without refresh
- No manual polling needed

### 4. **Progress Calculation**
```javascript
Progress % = (completedLessons + completedQuizzes) / (totalLessons + totalQuizzes) × 100

Example for Science Grade 1:
- Total lessons: 6
- Total quizzes: 1
- Completed lessons: 2
- Completed quizzes: 0
- Progress: (2 + 0) / (6 + 1) × 100 = 28.57%
```

---

**Created:** October 10, 2025
**Purpose:** Visual guide for progress tracking implementation
