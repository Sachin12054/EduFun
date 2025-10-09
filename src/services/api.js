import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Update this URL to your backend server IP address when testing on physical device
// For Expo development, localhost works in simulator/emulator
const API_BASE_URL = __DEV__ ? 'http://localhost:8000' : 'http://your-server-ip:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.removeItem('token');
        // Navigate to auth screen - you'll need to implement navigation here
      } catch (storageError) {
        console.error('Error removing token from AsyncStorage:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;