import { Region } from 'react-native-maps';
import * as Location from 'expo-location';

export interface MapLocation {
  latitude: number;
  longitude: number;
}

export interface MapRegion extends Region {}

export interface UserLocation {
  location: Location.LocationObject | null;
  loading: boolean;
  error: string | null;
}

export interface MapViewProps {
  region: MapRegion;
  onRegionChange?: (region: MapRegion) => void;
  showUserLocation?: boolean;
  markers?: MapMarker[];
  onMarkerPress?: (marker: MapMarker) => void;
}

export interface MapMarker {
  id: string;
  coordinate: MapLocation;
  title: string;
  description?: string;
  pinColor?: string;
}

export interface PlaceMapData {
  id: string;
  name: string;
  description: string;
  coordinate: MapLocation;
  address?: string;
}