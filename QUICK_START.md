# 🚀 Quick Start Guide - EduFun Mobile

## ⚡ Get Started in 5 Minutes!

### Prerequisites
- Node.js installed
- Expo CLI installed (`npm install -g expo-cli`)
- Firebase account

---

## 🎯 Step 1: Install Dependencies
```bash
cd edufun-mobile
npm install
```

---

## 🔥 Step 2: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing
3. Enable **Firestore Database**
4. Copy your config and update `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 🏃 Step 3: Run the App
```bash
npx expo start
```

Then:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web
- Scan QR code with Expo Go app

---

## ✅ Step 4: Test the Features

### Test Login:
1. Create a test student account
2. Login with email/password

### Test Learning Flow:
1. Click **"Subjects"** from dashboard
2. Choose **"English"**
3. Click a lesson (e.g., "Alphabets A-Z 🔤")
4. Read content and click **"Start Learning"**
5. See coins earned! 🪙

### Test Quiz:
1. In English subject, switch to **"Quizzes"** tab
2. Click **"Alphabet Quiz 🔤"**
3. Answer questions one by one
4. Get instant feedback (✅/❌)
5. See encouraging messages!
6. Submit and view results
7. Collect coins and maybe a sticker! 🎁

### Verify Firebase:
1. Go to Firebase Console → Firestore
2. Check `userProgress/{userId}` collection
3. You should see:
   - `totalPoints` increased
   - `coins` increased
   - `completedLessons` array updated
   - `quizResults` object populated

---

## 📚 What You Can Do Now

### ✅ Implemented Features:
- [x] 5 subjects (English, Maths, Science, Social Studies, GK)
- [x] 19 lessons for Grade 1
- [x] 5 interactive quizzes
- [x] Coins & points system
- [x] Instant quiz feedback
- [x] Encouraging messages
- [x] Confetti animations
- [x] Progress tracking
- [x] Sticker rewards
- [x] Badge system
- [x] Firebase real-time sync

### 🎨 Content Available:
**English** 📚
- Alphabets A-Z
- Vowels
- Rhyming Words
- Simple Words
- Alphabet Quiz (5 questions)

**Maths** 🔢
- Numbers 1-10
- Addition
- Shapes
- Subtraction
- Math Quiz (5 questions)

**Science** 🔬
- Plants
- Animals
- Body Parts
- Weather
- Science Quiz (5 questions)

**Social Studies** 🌍
- My Family
- My School
- Festivals
- India
- Social Quiz (5 questions)

**General Knowledge** 💡
- National Symbols
- Colors
- Days of Week
- Fruits & Vegetables
- GK Quiz (5 questions)

---

## 🎮 How to Navigate

```
App Launch
    ↓
Login Screen
    ↓
Dashboard
    ↓
Click "Subjects"
    ↓
SubjectsScreen (Shows all 5 subjects)
    ↓
Click any subject (e.g., English)
    ↓
SubjectScreen
    ├── Lessons Tab
    │   ├── Click lesson
    │   ├── Read content
    │   └── Complete & earn coins
    │
    └── Quizzes Tab
        ├── Click quiz
        ├── Answer questions
        ├── Get instant feedback
        └── View results & rewards
```

---

## 🪙 Reward System

### How to Earn Coins:
- ✅ Complete a lesson → **10-15 coins** 🪙
- ✅ Pass a quiz → **Up to 20 coins** 🪙
- ✅ Perfect score → **Bonus sticker!** 🎁

### How to Earn Points:
- ✅ Every lesson → **10-18 points** ⭐
- ✅ Every quiz question → **Points based on score** ⭐

### How to Get Badges:
- ✅ Complete 10 lessons → **Super Learner** 🌟
- ✅ 5 perfect quizzes → **Quiz Master** 🎯
- ✅ Complete all Math → **Math Magician** 🧮
- ✅ 7-day streak → **Streak Champion** 🔥

### How to Collect Stickers:
- ✅ 10% chance on lesson completion
- ✅ Guaranteed on 100% quiz score
- ✅ 10 unique stickers to collect!

---

## 🐛 Quick Troubleshooting

### Problem: App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start --clear
```

### Problem: Firebase not working
1. Check `src/config/firebase.js` credentials
2. Enable Firestore in Firebase Console
3. Check security rules
4. Verify internet connection

### Problem: Navigation errors
```bash
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
```

### Problem: Can't see data
1. Check Firebase Console → Firestore
2. Make sure user is logged in
3. Check browser console for errors
4. Verify `userProgress/{userId}` exists

---

## 📖 Important Files

```
edufun-mobile/
├── src/
│   ├── data/
│   │   └── subjectsData.js          ← All lesson & quiz content
│   ├── screens/
│   │   ├── SubjectsScreen.js        ← Subject selection
│   │   └── SubjectScreen.js         ← Lessons & quizzes
│   ├── contexts/
│   │   └── UserProgressContext.js   ← Progress tracking
│   └── config/
│       └── firebase.js              ← Firebase config
├── IMPLEMENTATION_GUIDE.md          ← Detailed setup guide
├── FIREBASE_DATABASE_STRUCTURE.md   ← Database documentation
└── FEATURES_SUMMARY.md              ← Complete feature list
```

---

## 🎨 Customization Quick Tips

### Add a New Lesson:
Edit `src/data/subjectsData.js`:
```javascript
{
  id: 5,
  title: 'My New Lesson 🎉',
  content: 'Learning content here...',
  description: 'Short description',
  image: '📚',
  duration: '10 min',
  difficulty: 'Beginner',
  points: 12
}
```

### Add a New Quiz Question:
```javascript
{
  question: 'What is 1 + 1?',
  options: ['1', '2', '3', '4'],
  correct: 1,  // Index of correct answer
  emoji: '➕'
}
```

### Change Subject Colors:
```javascript
english: {
  color: '#FF6B6B',  // Change this!
  // ... rest of config
}
```

---

## 📊 Testing Checklist

- [ ] Login works
- [ ] Subjects screen loads
- [ ] Can open a subject
- [ ] Lessons display correctly
- [ ] Can complete a lesson
- [ ] Coins increase
- [ ] Quiz opens
- [ ] Questions show with emojis
- [ ] Instant feedback works
- [ ] Confetti appears on correct answer
- [ ] Quiz results show
- [ ] Sticker awarded (sometimes)
- [ ] Progress saves to Firebase
- [ ] Data persists after app restart

---

## 🚀 You're Ready!

**Everything is set up and working!** 

Now you can:
1. ✅ Test all features
2. ✅ Add more content for Grades 2-5
3. ✅ Customize colors and emojis
4. ✅ Add more subjects
5. ✅ Build parent dashboard
6. ✅ Deploy to app stores

---

## 💡 Pro Tips

1. **Start with Grade 1**: It's fully populated with content
2. **Test the quiz flow**: It has the most interactions
3. **Check Firebase Console**: Watch data update in real-time
4. **Try different answers**: See the encouraging messages
5. **Complete multiple lessons**: Earn coins and stickers
6. **Retake quizzes**: You can improve your score!

---

## 🎉 Have Fun!

The app is designed to make learning **fun, engaging, and rewarding** for kids!

**Happy Learning! 🌟📚🚀**

---

**Need help?** Check:
- `IMPLEMENTATION_GUIDE.md` for detailed instructions
- `FIREBASE_DATABASE_STRUCTURE.md` for database info
- `FEATURES_SUMMARY.md` for complete feature list
