import React, { useState } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ActivityIndicator,
  GestureResponderEvent 
} from 'react-native';
import { Place } from '../../redux/slices/placesSlice';
import { styles } from './PlaceItem.styles';

interface PlaceItemProps {
  place: Place;
  onPress: (place: Place) => void;
  loading?: boolean;
  disabled?: boolean;
}

export const PlaceItem: React.FC<PlaceItemProps> = ({
  place,
  onPress,
  loading = false,
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled && !loading) {
      onPress(place);
    }
  };

  const handlePressIn = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const containerStyle = [
    styles.container,
    isPressed && styles.containerPressed,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <Text style={styles.mainText} numberOfLines={1}>
        {place.name}
      </Text>
      
      <View style={styles.loadingContainer}>
        <Text style={styles.secondaryText} numberOfLines={2}>
          {place.address || place.description}
        </Text>
        
        {loading && (
          <>
            <ActivityIndicator size="small" color="#666" style={{ marginLeft: 8 }} />
            <Text style={styles.loadingText}>Loading details...</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};