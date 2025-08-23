import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PlaceCardProps } from './types';

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  const handlePress = () => {
    onPress?.(place);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {place.imageUrl && (
        <Image source={{ uri: place.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {place.description}
        </Text>
        {place.rating && (
          <Text style={styles.rating}>Rating: {place.rating}/5</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default PlaceCard;