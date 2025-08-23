import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Result } from '@ant-design/react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomMapView, PlaceDetailsCard, MapHeader } from '../components';
import { MapRegion, MapMarker, PlaceMapData, MapLocation } from '../types';
import { DEFAULT_REGIONS, MAP_CONFIG, MAP_STYLES } from '../constants';
import { Place } from '../../places/redux/slices/placesSlice';

export default function MapScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  // Parse and memoize the place data from navigation params
  const place: Place | null = useMemo(() => {
    try {
      return params.place ? JSON.parse(params.place as string) : null;
    } catch (error) {
      console.error('Error parsing place data:', error);
      return null;
    }
  }, [params.place]);

  // Convert Place to PlaceMapData
  const placeMapData: PlaceMapData | null = useMemo(() => {
    if (!place || !place.lat || !place.lng) return null;
    
    return {
      id: place.placeId || place.id,
      name: place.name,
      description: place.description,
      coordinate: {
        latitude: place.lat,
        longitude: place.lng,
      },
      address: place.address,
    };
  }, [place]);

  // Initialize map region
  const initialRegion: MapRegion = useMemo(() => ({
    latitude: placeMapData?.coordinate.latitude || DEFAULT_REGIONS.ABUJA.latitude,
    longitude: placeMapData?.coordinate.longitude || DEFAULT_REGIONS.ABUJA.longitude,
    latitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.DELTA,
    longitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.DELTA,
  }), [placeMapData?.coordinate]);

  // Map markers
  const markers: MapMarker[] = useMemo(() => {
    if (!placeMapData) return [];
    
    return [
      {
        id: placeMapData.id,
        coordinate: placeMapData.coordinate,
        title: placeMapData.name,
        description: placeMapData.address || placeMapData.description,
        pinColor: MAP_STYLES.MARKER_COLORS.PRIMARY,
      },
    ];
  }, [placeMapData]);

  const [showDetailsCard, setShowDetailsCard] = useState(true);

  // Handlers
  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const handleMarkerPress = useCallback((marker: MapMarker) => {
    setShowDetailsCard(true);
  }, []);

  const handleMyLocationPress = useCallback((location: MapLocation) => {
    console.log('User location:', location);
    // Could add additional logic here, like showing distance to place
  }, []);

  const handleCloseDetails = useCallback(() => {
    setShowDetailsCard(false);
  }, []);

  // Error state
  if (!place) {
    return (
      <View style={styles.errorContainer}>
        <MapHeader
          title="Map Error"
          onBackPress={handleBackPress}
        />
        <View style={styles.errorContent}>
          <Result
            img="error"
            title="No Place Data"
            message="Unable to load place information. Please go back and try again."
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Map View */}
      <CustomMapView
        region={initialRegion}
        markers={markers}
        onMarkerPress={handleMarkerPress}
        onMyLocationPress={handleMyLocationPress}
        showUserLocation={true}
        showMyLocationButton={true}
      />

      {/* Header */}
      <MapHeader
        title={place.name}
        onBackPress={handleBackPress}
      />

      {/* Place Details Card */}
      {showDetailsCard && placeMapData && (
        <PlaceDetailsCard
          place={placeMapData}
          onClose={handleCloseDetails}
          showCoordinates={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});