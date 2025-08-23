import React, { useRef, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Text } from '@ant-design/react-native';
import MapView, { Marker } from 'react-native-maps';
import { MapViewProps, MapMarker, MapLocation } from '../../types';
import { MAP_CONFIG, MAP_STYLES } from '../../constants';
import { useMapLocation } from '../../hooks';
import { styles } from './MapView.styles';

interface EnhancedMapViewProps extends MapViewProps {
  onMyLocationPress?: (location: MapLocation) => void;
  showMyLocationButton?: boolean;
  loading?: boolean;
}

export const CustomMapView: React.FC<EnhancedMapViewProps> = ({
  region,
  onRegionChange,
  showUserLocation = true,
  markers = [],
  onMarkerPress,
  onMyLocationPress,
  showMyLocationButton = true,
  loading = false,
}) => {
  const mapRef = useRef<MapView>(null);
  const { userLocation, refreshLocation } = useMapLocation();

  const handleMyLocationPress = useCallback(() => {
    if (userLocation?.coords) {
      const location: MapLocation = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };

      // Animate map to user location
      mapRef.current?.animateToRegion(
        {
          ...location,
          latitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.DELTA,
          longitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.DELTA,
        },
        MAP_CONFIG.ANIMATION_DURATION
      );

      onMyLocationPress?.(location);
    } else {
      // Try to refresh location if not available
      refreshLocation();
    }
  }, [userLocation, onMyLocationPress, refreshLocation]);

  const handleMarkerPress = useCallback(
    (marker: MapMarker) => {
      onMarkerPress?.(marker);
      
      // Animate to marker location
      mapRef.current?.animateToRegion(
        {
          ...marker.coordinate,
          latitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.DETAILED_DELTA,
          longitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.DETAILED_DELTA,
        },
        MAP_CONFIG.ANIMATION_DURATION
      );
    },
    [onMarkerPress]
  );

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={false} // Use custom button
        showsCompass={true}
        showsScale={true}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor || MAP_STYLES.MARKER_COLORS.PRIMARY}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>

      {showMyLocationButton && (
        <Button
          type="primary"
          style={styles.myLocationButton}
          onPress={handleMyLocationPress}
        >
          <Text style={styles.myLocationButtonText}>📍</Text>
        </Button>
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </View>
  );
};