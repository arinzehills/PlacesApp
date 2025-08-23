import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { Place } from '../../redux/slices/placesSlice';
import { HistoryItem } from './HistoryItem';
import { styles } from './SearchHistory.styles';

interface SearchHistoryProps {
  history: Place[];
  onPlacePress: (place: Place) => void;
  onClearHistory: () => void;
  onRemovePlace?: (place: Place) => void;
  visible?: boolean;
  maxItems?: number;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onPlacePress,
  onClearHistory,
  onRemovePlace,
  visible = true,
  maxItems = 10,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!visible || history.length === 0) {
    return null;
  }

  const displayedHistory = isExpanded ? history.slice(0, maxItems) : history.slice(0, 3);

  const renderHistoryItem: ListRenderItem<Place> = ({ item }) => (
    <HistoryItem
      place={item}
      onPress={onPlacePress}
      onRemove={onRemovePlace}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🕒</Text>
      <Text style={styles.emptyText}>No recent searches</Text>
    </View>
  );

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const showToggleButton = history.length > 3;
  const hasMoreItems = history.length > 3 && !isExpanded;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Recent Searches ({history.length})
        </Text>
        <View style={styles.headerActions}>
          {history.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={onClearHistory}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          )}
          {showToggleButton && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleExpanded}
            >
              <Text style={styles.toggleButtonText}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {displayedHistory.length === 0 ? (
          renderEmpty()
        ) : (
          <FlatList
            data={displayedHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.placeId || item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
        
        {hasMoreItems && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleExpanded}
          >
            <Text style={styles.toggleButtonText}>
              +{history.length - 3} more places
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};