import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  GestureResponderEvent,
} from 'react-native';
import { Place } from '../../redux/slices/placesSlice';
import { styles } from './HistoryItem.styles';

interface HistoryItemProps {
  place: Place;
  onPress: (place: Place) => void;
  onRemove?: (place: Place) => void;
  disabled?: boolean;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  place,
  onPress,
  onRemove,
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled) {
      onPress(place);
    }
  };

  const handleRemove = (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (onRemove && !disabled) {
      onRemove(place);
    }
  };

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const getTimeAgo = () => {
    // Since we don't have timestamp in the current Place interface,
    // we'll use a placeholder. In a real app, you'd add timestamp to Place
    return 'Recently searched';
  };

  const getIconText = () => {
    return place.name.charAt(0).toUpperCase();
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
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.icon}>
        <Text style={styles.iconText}>{getIconText()}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {place.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {place.address || place.description}
        </Text>
        <Text style={styles.timeText}>{getTimeAgo()}</Text>
      </View>
      
      {onRemove && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleRemove}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.actionButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};