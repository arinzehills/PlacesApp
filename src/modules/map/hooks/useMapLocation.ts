import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { UserLocation } from '../types';

export const useMapLocation = () => {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    location: null,
    loading: false,
    error: null,
  });

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async (): Promise<Location.LocationObject | null> => {
    setUserLocation(prev => ({ ...prev, loading: true, error: null }));

    try {
      const hasPermission = await requestLocationPermission();
      
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        location,
        loading: false,
        error: null,
      });

      return location;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get location';
      
      setUserLocation({
        location: null,
        loading: false,
        error: errorMessage,
      });

      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please check your location settings.',
        [{ text: 'OK', style: 'default' }]
      );

      return null;
    }
  }, [requestLocationPermission]);

  // Get location on mount
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const refreshLocation = useCallback(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return {
    userLocation: userLocation.location,
    loading: userLocation.loading,
    error: userLocation.error,
    refreshLocation,
    hasLocation: Boolean(userLocation.location),
  };
};