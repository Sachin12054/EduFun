# EduFun Logo Integration Guide

## Overview
This guide helps you integrate the new EduFun logo into your React Native Expo app.

## Required Icon Sizes for Expo Apps

### Main App Icon (icon.png)
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Usage**: Primary app icon

### Adaptive Icon (adaptive-icon.png) - Android
- **Size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Usage**: Android adaptive icon foreground

### Splash Screen Icon (splash-icon.png)
- **Size**: 1024x1024 pixels (or larger)
- **Format**: PNG with transparency
- **Usage**: Shown during app loading

### Favicon (favicon.png) - Web
- **Size**: 48x48 pixels
- **Format**: PNG
- **Usage**: Web browser tab icon

## Steps to Update Icons

1. **Save the new logo** as a high-resolution PNG file (recommended: 2048x2048 pixels minimum)

2. **Create the required sizes** using an image editor or online tool:
   - Use tools like Photoshop, GIMP, or online resizers
   - Maintain aspect ratio and center the logo
   - Ensure transparency is preserved

3. **Replace the existing files** in the `/assets/` folder:
   - Replace `icon.png` with the 1024x1024 version
   - Replace `adaptive-icon.png` with the 1024x1024 version
   - Replace `splash-icon.png` with the 1024x1024 version
   - Replace `favicon.png` with the 48x48 version

4. **Test the changes**:
   ```bash
   expo start
   ```

5. **For production builds**, you may want to use Expo's icon generation:
   ```bash
   npx expo install expo-splash-screen
   npx expo generate-icons
   ```

## Current Configuration

Your `app.json` is already configured correctly:
- `"icon": "./assets/icon.png"`
- `"splash.image": "./assets/splash-icon.png"`
- `"android.adaptiveIcon.foregroundImage": "./assets/adaptive-icon.png"`
- `"web.favicon": "./assets/favicon.png"`

## Tips

- Keep the logo centered and ensure good contrast
- Test on different backgrounds (light/dark)
- The adaptive icon should work well when cropped to a circle
- Consider the splash screen background color (#ffffff in your config)

## Backup

Your original icons have been backed up with `-backup` suffix in the assets folder.