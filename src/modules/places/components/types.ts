export interface Place {
  id: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  imageUrl?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlaceCardProps {
  place: Place;
  onPress?: (place: Place) => void;
}

export interface PlaceListProps {
  places: Place[];
  onPlacePress?: (place: Place) => void;
  isLoading?: boolean;
}