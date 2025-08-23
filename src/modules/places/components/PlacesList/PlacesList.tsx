import React from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import { Place } from '../../redux/slices/placesSlice';
import { PlaceItem } from './PlaceItem';
import { styles } from './PlacesList.styles';

interface PlacesListProps {
  places: Place[];
  onPlacePress: (place: Place) => void;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  emptySubMessage?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  loadingPlaceId?: string | null;
}

export const PlacesList: React.FC<PlacesListProps> = ({
  places,
  onPlacePress,
  loading = false,
  error,
  emptyMessage = 'No places found',
  emptySubMessage = 'Try searching for a different location',
  refreshing = false,
  onRefresh,
  loadingPlaceId,
}) => {
  const renderPlaceItem: ListRenderItem<Place> = ({ item }) => (
    <PlaceItem
      place={item}
      onPress={onPlacePress}
      loading={loadingPlaceId === item.placeId}
      disabled={Boolean(loadingPlaceId && loadingPlaceId !== item.placeId)}
    />
  );

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
        <Text style={styles.emptySubText}>{emptySubMessage}</Text>
      </View>
    );
  };

  const refreshControl = onRefresh ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#007AFF"
    />
  ) : undefined;

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <FlatList
        style={styles.list}
        data={places}
        renderItem={renderPlaceItem}
        keyExtractor={(item) => item.placeId || item.id}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={refreshControl}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};