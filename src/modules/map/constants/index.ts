import { MapRegion } from '../types';

export const MAP_CONFIG = {
  DEFAULT_ZOOM: {
    DELTA: 0.01,
    DETAILED_DELTA: 0.005,
    CITY_DELTA: 0.1,
  },
  ANIMATION_DURATION: 1000,
  PERMISSION_TIMEOUT: 10000,
} as const;

export const DEFAULT_REGIONS = {
  ABUJA: {
    latitude: 9.05785,
    longitude: 7.49508,
    latitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.CITY_DELTA,
    longitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.CITY_DELTA,
  },
  LAGOS: {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.CITY_DELTA,
    longitudeDelta: MAP_CONFIG.DEFAULT_ZOOM.CITY_DELTA,
  },
} as const satisfies Record<string, MapRegion>;

export const MAP_STYLES = {
  MARKER_COLORS: {
    PRIMARY: 'red',
    SECONDARY: 'blue',
    USER: 'green',
  },
} as const;