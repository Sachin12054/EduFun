import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const KidemyLogo = ({ 
  size = 100, 
  style = {},
  resizeMode = 'contain',
  showBackground = true,
  backgroundStyle = {}
}) => {
  return (
    <View style={[styles.container, style]}>
      {showBackground ? (
        <View style={[styles.logoBackground, { width: size, height: size, borderRadius: size/2 }, backgroundStyle]}>
          <Image
            source={require('../../assets/Logo/Logo.jpg')}
            style={[
              styles.logoImage,
              {
                width: size * 0.8,
                height: size * 0.8,
                borderRadius: (size * 0.8) / 2,
              }
            ]}
            resizeMode={resizeMode}
          />
        </View>
      ) : (
        <Image
          source={require('../../assets/Logo/Logo.jpg')}
          style={[
            styles.logo,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            }
          ]}
          resizeMode={resizeMode}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoImage: {
    // Additional styling applied via props
  },
  logo: {
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default KidemyLogo;