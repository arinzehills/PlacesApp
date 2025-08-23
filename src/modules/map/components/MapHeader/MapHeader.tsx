import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './MapHeader.styles';

interface MapHeaderProps {
  title: string;
  onBackPress: () => void;
  showBackButton?: boolean;
}

export const MapHeader: React.FC<MapHeaderProps> = ({
  title,
  onBackPress,
  showBackButton = true,
}) => {
  const insets = useSafeAreaInsets();
  
  const containerStyle = [
    styles.container,
    { paddingTop: insets.top + 8 }
  ];

  return (
    <View style={containerStyle}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color="#007AFF" 
            style={styles.backIcon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      
      <View style={styles.placeholder} />
    </View>
  );
};