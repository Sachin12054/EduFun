# Kidemy - Gamified Learning Platform

A comprehensive mobile learning platform built with React Native and Expo that transforms education into an engaging, gamified experience for students across grades 1-5.

## 📱 Features

### 🎯 Role-Based System
- **Student Portal**: Interactive learning environment with progress tracking
- **Teacher Dashboard**: Classroom management and student monitoring
- **Admin Panel**: Platform-wide administration and analytics

### 🎓 Educational Content
- **Multi-Grade Support**: Tailored content for Grades 1-5
- **Subject Coverage**: Mathematics, Science, English, and more
- **Interactive Learning**: Engaging lessons with multimedia content

### 🏆 Gamification Elements
- **Progress Tracking**: Monitor learning achievements and milestones
- **Leaderboard System**: Competitive learning environment
- **Achievement Badges**: Reward system for completed tasks
- **Interactive Challenges**: Fun quizzes and activities

### 🎨 User Experience
- **Modern UI/UX**: Professional, intuitive interface design
- **Responsive Design**: Optimized for various screen sizes
- **Smooth Animations**: Enhanced user interactions
- **Dark/Light Mode Support**: Customizable viewing preferences

### 🔐 Security & Authentication
- **Firebase Authentication**: Secure user management
- **Role-Based Access Control**: Separate access levels for students, teachers, and admins
- **Data Protection**: Secure storage with Firestore

## 🛠️ Technology Stack

- **Framework**: React Native with Expo (SDK 54)
- **Navigation**: React Navigation (Stack, Drawer, Bottom Tabs)
- **Backend**: Firebase (Authentication & Firestore Database)
- **UI Libraries**: 
  - React Native Paper
  - Expo Linear Gradient
  - React Native Vector Icons
- **State Management**: React Context API
- **Build Tool**: EAS Build

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI**: `npm install -g expo-cli`
- **EAS CLI** (for building): `npm install -g eas-cli`
- **Git** - [Download](https://git-scm.com/)

### For Testing on Physical Devices
- **Expo Go app** on your iOS or Android device
- Or **Android Studio** / **Xcode** for emulators

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sachin12054/EduFun.git
cd edufun-mobile
```

### 2. Install Dependencies

```bash
npm install
```

or using yarn:

```bash
yarn install
```

### 3. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database
3. Update the Firebase configuration in `src/config/firebase.js` with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. Set up Firestore security rules from `firestore.rules`

### 4. Start the Development Server

```bash
npm start
```

or

```bash
expo start
```

This will open the Expo Developer Tools in your browser.

## 📱 Running on Devices

### On Physical Device (Recommended for Testing)

1. Install **Expo Go** app from:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code from the terminal or Expo Developer Tools:
   - **iOS**: Use the Camera app
   - **Android**: Use the Expo Go app

### On Android Emulator

1. Install Android Studio with an Android emulator
2. Start your emulator
3. Run:
```bash
npm run android
```

### On iOS Simulator (macOS only)

1. Install Xcode from the Mac App Store
2. Run:
```bash
npm run ios
```

## 🏗️ Building for Production

### Prerequisites for Building

1. Create an Expo account at [expo.dev](https://expo.dev)
2. Login to EAS CLI:
```bash
eas login
```

### Build Android APK

```bash
eas build --platform android --profile production-apk
```

### Build Android App Bundle (for Play Store)

```bash
eas build --platform android --profile production
```

### Build iOS App (macOS required)

```bash
eas build --platform ios --profile production
```

The build will be processed on Expo's servers, and you'll receive a download link when complete.

## 📂 Project Structure

```
edufun-mobile/
├── App.js                      # Main application entry point
├── app.json                    # Expo configuration
├── eas.json                    # EAS Build configuration
├── assets/                     # Images, fonts, and other assets
│   └── Logo/                   # App logo files
├── credentials/                # Build credentials (keystore)
│   └── android/
├── src/
│   ├── components/             # Reusable React components
│   │   ├── CustomDrawerContent.js
│   │   └── KidemyLogo.js
│   ├── config/                 # Configuration files
│   │   └── firebase.js         # Firebase configuration
│   ├── contexts/               # React Context providers
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   └── UserProgressContext.js
│   ├── data/                   # Static data and content
│   │   └── subjectsData.js
│   ├── navigation/             # Navigation configuration
│   │   └── AppNavigator.js
│   ├── screens/                # Screen components
│   │   ├── LandingScreen.js
│   │   ├── StudentAuthScreen.js
│   │   ├── TeacherAuthScreen.js
│   │   ├── AdminScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── GradeSelectionScreen.js
│   │   ├── SubjectsScreen.js
│   │   └── ... (other screens)
│   ├── services/               # API and database services
│   │   ├── api.js
│   │   └── database.js
│   └── utils/                  # Utility functions
│       └── validation.js
└── package.json                # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start in web browser

## 🌐 Firebase Setup

### Required Firebase Services

1. **Authentication**
   - Email/Password authentication enabled
   - User role management (student/teacher/admin)

2. **Firestore Database**
   - Collections: users, classes, students, progress, leaderboard
   - Security rules configured (see `firestore.rules`)

3. **Storage** (Optional)
   - For user profiles and educational content

## ⚙️ Configuration

### App Configuration (`app.json`)

- App name: Kidemy
- Bundle identifiers:
  - iOS: `com.kidemy.mobile`
  - Android: `com.kidemy.mobile`
- Version: 1.0.0

### Build Profiles (`eas.json`)

- **development**: Development builds with dev client
- **preview**: Internal distribution APK
- **production**: App bundle for store submission
- **production-apk**: Standalone APK for direct distribution

## 🎨 Customization

### Branding

- Update app logo in `assets/Logo/`
- Modify colors and themes in screen files
- Update splash screen and app icons in `assets/`

### Content

- Edit subject data in `src/data/subjectsData.js`
- Customize grade-specific content in respective grade screen files

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   expo start -c
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Expo Go connection issues**
   - Ensure your device and computer are on the same network
   - Try restarting the Expo Dev Tools

4. **Build failures**
   - Verify credentials are properly configured
   - Check EAS build logs for specific errors
   - Ensure all dependencies are compatible

## 📞 Support

For issues and questions:
- Email: support@kidemy.com
- GitHub Issues: [Report a bug](https://github.com/Sachin12054/EduFun/issues)

## 👥 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔒 Security

- All user data is encrypted and stored securely in Firebase
- Authentication tokens are managed by Firebase Auth
- Firestore security rules prevent unauthorized access
- Sensitive configuration should be stored in environment variables

## 📱 Deployment

### Google Play Store (Android)

1. Build the app bundle: `eas build --platform android --profile production`
2. Download the `.aab` file
3. Upload to Google Play Console
4. Complete store listing and submit for review

### Apple App Store (iOS)

1. Build the app: `eas build --platform ios --profile production`
2. Use Application Loader or Transporter to upload
3. Complete App Store Connect listing
4. Submit for review

## 🎯 Roadmap

- [ ] Offline mode support
- [ ] Parent monitoring dashboard
- [ ] Advanced analytics and reporting
- [ ] AI-powered personalized learning paths
- [ ] Multi-language support
- [ ] Video lesson integration
- [ ] Real-time collaboration features

---

**Built with ❤️ using React Native and Expo**

*Transform Learning Into Adventure with Kidemy*
