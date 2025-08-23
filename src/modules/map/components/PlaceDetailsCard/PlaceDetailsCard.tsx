import React from 'react';
import { View } from 'react-native';
import { Card, Text, Button, Tag } from '@ant-design/react-native';
import { PlaceMapData } from '../../types';
import { styles } from './PlaceDetailsCard.styles';

interface PlaceDetailsCardProps {
  place: PlaceMapData;
  onClose?: () => void;
  showCoordinates?: boolean;
}

export const PlaceDetailsCard: React.FC<PlaceDetailsCardProps> = ({
  place,
  onClose,
  showCoordinates = false,
}) => {
  const formatCoordinate = (value: number, isLatitude: boolean): string => {
    const direction = isLatitude 
      ? (value >= 0 ? 'N' : 'S')
      : (value >= 0 ? 'E' : 'W');
    return `${Math.abs(value).toFixed(6)}° ${direction}`;
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Header
          title={
            <Text style={styles.title} numberOfLines={2}>
              {place.name}
            </Text>
          }
          extra={
            onClose && (
              <Button
                type="ghost"
                size="small"
                onPress={onClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </Button>
            )
          }
        />
        <Card.Body>
          <Text style={styles.subtitle} numberOfLines={3}>
            {place.address || place.description}
          </Text>
          
          {showCoordinates && (
            <View style={styles.coordinates}>
              <Tag style={styles.coordinatesTag}>
                📍 {formatCoordinate(place.coordinate.latitude, true)}, {' '}
                {formatCoordinate(place.coordinate.longitude, false)}
              </Tag>
            </View>
          )}
        </Card.Body>
      </Card>
    </View>
  );
};