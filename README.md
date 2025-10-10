# EduFun Mobile App 📚📱🎓

A comprehensive educational platform for kids in Grades 1-5, built with React Native, Expo, and Firebase. Features interactive lessons, engaging quizzes, gamification with coins, badges, and stickers, plus a complete hierarchical database structure.

## 🚀 Features

### 🎓 **Educational Content**
- **5 Subjects**: English, Maths, Science, Social Studies, General Knowledge
- **5 Grade Levels**: Content for Grades 1-5
- **60+ Lessons**: Comprehensive, age-appropriate lessons with emojis
- **13+ Quizzes**: Interactive quizzes with instant feedback
- **88+ Questions**: Original, carefully crafted questions

### 🎮 **Gamification**
- **Coins System**: Earn coins for completing lessons and quizzes
- **Points & Levels**: Track learning progress with XP points
- **Badges**: Unlock achievement badges
- **Stickers**: Collect fun stickers (10% chance on lesson completion, guaranteed on perfect quiz scores)
- **Confetti Animations**: Celebrate success with visual effects
- **Encouraging Messages**: Positive reinforcement for every achievement

### 🔥 **Firebase Integration**
- **Real-time Database**: Instant synchronization across devices
- **Hierarchical Structure**: `Students → StudentID → Profile/Progress/History`
- **Secure Authentication**: Email/Password login
- **Activity Logging**: Complete learning history tracking
- **Leaderboard**: Grade-wise competitive rankings
- **Cloud Storage**: All progress saved securely

### 👤 **User Experience**
- **Personalized Profiles**: Student details, grade, avatar
- **Progress Tracking**: Subject-wise completion percentages
- **Learning History**: View all past activities
- **Coin Transactions**: Track all earnings
- **Responsive Design**: Works on iOS, Android, and Web
- **Offline Support**: Firebase offline persistence

## 📊 Database Structure

```
Students → {studentId} → Profile (Student Details)
                      → Progress (Learning Progress)  
                      → LearningHistory (Activity Logs)
                      → CoinTransactions (Coin History)

Leaderboard → {grade1-5} → Students → Rankings
```

See **[DATABASE_STRUCTURE.md](DATABASE_STRUCTURE.md)** for complete details.

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** (for development)
- **Git** - [Download here](https://git-scm.com/)
- **Firebase Account** - [Create here](https://console.firebase.google.com/)

### For Mobile Development:
- **Expo Go** app on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Or install **Android Studio** (for Android emulator) or **Xcode** (for iOS simulator)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Sachin12054/EduFun.git
cd EduFun
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Install Expo CLI (if not already installed)
```bash
npm install -g expo-cli
# or
npm install -g @expo/cli
```

### 4. Configure Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password provider)
3. Enable **Firestore Database**
3. Update the Firebase configuration in `src/config/firebase.js` with your project credentials

## 🏃‍♂️ Running the Application

### Start the Development Server
```bash
npm start
# or
expo start
```

### Run on Specific Platforms
```bash
# Run on Android
npm run android
# or
expo start --android

# Run on iOS
npm run ios
# or
expo start --ios

# Run on Web
npm run web
# or
expo start --web
```

### Using Physical Device
1. Install **Expo Go** app on your mobile device
2. Start the development server with `npm start`
3. Scan the QR code displayed in the terminal or browser with:
   - **iOS**: Camera app or Expo Go
   - **Android**: Expo Go app

### Using Emulator/Simulator
- **Android**: Make sure Android Studio is installed and an AVD is running
- **iOS**: Make sure Xcode is installed (macOS only)

## 📂 Project Structure

```
edufun-mobile/
├── assets/                 # Images and static assets
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── src/
│   ├── config/            # Configuration files
│   │   └── firebase.js    # Firebase configuration
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.js # Authentication context
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/           # Application screens
│   │   ├── AdminScreen.js
│   │   ├── AuthScreen.js
│   │   ├── HomeScreen.js
│   │   ├── LoadingScreen.js
│   │   ├── ProfileScreen.js
│   │   └── SubjectsScreen.js
│   └── services/          # API and service functions
│       └── api.js
├── App.js                 # Main application component
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🔧 Dependencies

### Main Dependencies:
- **Expo**: Development platform for React Native
- **React Navigation**: Navigation library
- **Firebase**: Backend services
- **Axios**: HTTP client for API requests
- **React Native Vector Icons**: Icon library
- **React Native Toast Message**: Toast notifications

### Key Packages:
```json
{
  "expo": "~54.0.12",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "@react-navigation/native": "^7.1.18",
  "firebase": "^12.4.0",
  "axios": "^1.12.2"
}
```

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** and set up sign-in methods
4. Create a **Firestore Database**
5. Get your config object and update `src/config/firebase.js`

## 🚨 Troubleshooting

### Common Issues:

1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **Node modules issues**: Delete `node_modules` and run `npm install` again
3. **Expo CLI issues**: Update with `npm install -g @expo/cli@latest`
4. **Firebase errors**: Check your Firebase configuration and API keys

### Reset Project:
```bash
# Clear Expo cache
expo start -c

# Clear npm cache
npm start -- --reset-cache

# Reinstall dependencies
rm -rf node_modules
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sachin** - [GitHub Profile](https://github.com/Sachin12054)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy Learning! 📚✨**