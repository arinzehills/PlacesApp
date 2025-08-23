export interface GooglePlacesPrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
  terms: {
    offset: number;
    value: string;
  }[];
}

export interface GooglePlacesAutocompleteResponse {
  predictions: GooglePlacesPrediction[];
  status: string;
  error_message?: string;
}

export interface GooglePlaceGeometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
}

export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: GooglePlaceGeometry;
  types: string[];
  rating?: number;
  price_level?: number;
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
  }[];
}

export interface GooglePlaceDetailsResponse {
  result: GooglePlaceDetails;
  status: string;
  error_message?: string;
}

export class PlacesApiError extends Error {
  constructor(
    message: string,
    public status?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'PlacesApiError';
  }
}