import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { PlacesList, SearchInput, SearchHistory } from "../components";
import { usePlaceAutocomplete, usePlaceDetails, usePlaces } from "../hooks";
import { Place } from "../redux/slices/placesSlice";
import { useRouter } from "expo-router";

export default function PlaceScreen() {
  const router = useRouter();
  
  const {
    query,
    results,
    loading: searchLoading,
    error: searchError,
    handleQueryChange,
    clearQuery,
  } = usePlaceAutocomplete({
    debounceMs: 300,
    minLength: 3,
  });

  const {
    selectedPlace,
    loading: detailsLoading,
    error: detailsError,
    fetchDetails,
  } = usePlaceDetails();

  const { history, clearHistory, removeFromHistory } = usePlaces();

  const handlePlacePress = async (place: Place) => {
    if (place.placeId) {
      // First fetch details to get coordinates, then navigate to map
      await fetchDetails(place.placeId);
      
      // Navigate to map screen with place data
      router.push({
        pathname: '/map',
        params: {
          place: JSON.stringify(place),
        },
      });
    }
  };

  const handleHistoryPlacePress = async (place: Place) => {
    // When user taps a history item, navigate directly to map
    if (place.placeId) {
      router.push({
        pathname: '/map',
        params: {
          place: JSON.stringify(place),
        },
      });
    }
  };

  const handleRemoveFromHistory = (place: Place) => {
    if (place.placeId) {
      removeFromHistory(place.placeId);
    } else if (place.id) {
      removeFromHistory(place.id);
    }
  };

  const error = searchError || detailsError;
  const showHistory = query.length === 0 && history.length > 0;

  return (
    <View style={styles.container}>
      <SearchInput
        value={query}
        onChangeText={handleQueryChange}
        onClear={clearQuery}
        loading={searchLoading}
        error={error}
        placeholder="Search for places..."
        minLength={3}
      />

      {showHistory && (
        <SearchHistory
          history={history}
          onPlacePress={handleHistoryPlacePress}
          onClearHistory={clearHistory}
          onRemovePlace={handleRemoveFromHistory}
          visible={showHistory}
          maxItems={10}
        />
      )}

      <PlacesList
        places={results}
        onPlacePress={handlePlacePress}
        loading={searchLoading && results.length === 0}
        error={error}
        emptyMessage={
          query.length >= 3
            ? "No places found"
            : showHistory
            ? ""
            : "Start typing to search for places"
        }
        emptySubMessage={
          query.length >= 3
            ? "Try a different search term"
            : showHistory
            ? ""
            : "Enter at least 3 characters"
        }
        loadingPlaceId={detailsLoading ? selectedPlace?.placeId : null}
      />

      {/* TODO: Add MapView component here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});
