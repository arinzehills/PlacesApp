import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 4,
  },
  closeButton: {
    borderRadius: 16,
    minWidth: 32,
    height: 32,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '400',
  },
  coordinates: {
    marginTop: 12,
  },
  coordinatesTag: {
    backgroundColor: '#E6F7FF',
    borderColor: '#91D5FF',
  },
});