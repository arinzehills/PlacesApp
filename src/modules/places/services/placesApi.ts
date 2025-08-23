import { Place } from '../redux/slices/placesSlice';
import { API_CONFIG, GOOGLE_PLACES_STATUS, HTTP_STATUS } from './constants';
import {
  GooglePlaceDetails,
  GooglePlaceDetailsResponse,
  GooglePlacesAutocompleteResponse,
  GooglePlacesPrediction,
  PlacesApiError,
} from './types';

export class PlacesApiService {
  private static buildUrl(endpoint: string, params: Record<string, string>): string {
    const url = new URL(endpoint);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
    return url.toString();
  }

  private static async makeRequest<T>(url: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("RESPONSE at make request", response);

      if (!response.ok) {
        throw new PlacesApiError(
          `HTTP Error: ${response.status} ${response.statusText}`,
          undefined,
          response.status
        );
      }

      const data: T = await response.json();
      return data;
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof PlacesApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new PlacesApiError('Request timeout', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR);
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new PlacesApiError(
        `Network error: ${errorMessage}`,
        undefined,
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  }

  private static handleGooglePlacesStatus(status: string, errorMessage?: string): void {
    switch (status) {
      case GOOGLE_PLACES_STATUS.OK:
      case GOOGLE_PLACES_STATUS.ZERO_RESULTS:
        return;
      case GOOGLE_PLACES_STATUS.OVER_QUERY_LIMIT:
        throw new PlacesApiError('API quota exceeded', status, HTTP_STATUS.FORBIDDEN);
      case GOOGLE_PLACES_STATUS.REQUEST_DENIED:
        throw new PlacesApiError('API request denied', status, HTTP_STATUS.UNAUTHORIZED);
      case GOOGLE_PLACES_STATUS.INVALID_REQUEST:
        throw new PlacesApiError('Invalid request parameters', status, HTTP_STATUS.BAD_REQUEST);
      default:
        throw new PlacesApiError(
          errorMessage || 'Unknown API error',
          status,
          HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
  }

  private static transformPredictionToPlace(prediction: GooglePlacesPrediction): Place {
    return {
      id: prediction.place_id,
      name: prediction.structured_formatting.main_text,
      description: prediction.description,
      lat: 0,
      lng: 0,
      address: prediction.structured_formatting.secondary_text,
      placeId: prediction.place_id,
    };
  }

  private static transformDetailsToPlace(details: GooglePlaceDetails): Place {
    return {
      id: details.place_id,
      name: details.name,
      description: details.formatted_address,
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
      address: details.formatted_address,
      placeId: details.place_id,
    };
  }

  static async fetchAutocomplete(input: string, language = API_CONFIG.DEFAULT_LANGUAGE): Promise<Place[]> {
    if (!API_CONFIG.API_KEY) {
      throw new PlacesApiError('Google Places API key not configured', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    if (input.length < API_CONFIG.MIN_QUERY_LENGTH) {
      return [];
    }

    const url = this.buildUrl(API_CONFIG.ENDPOINTS.AUTOCOMPLETE, {
      input: encodeURIComponent(input),
      key: API_CONFIG.API_KEY,
      language,
    });

    try {
      const response = await this.makeRequest<GooglePlacesAutocompleteResponse>(url);

      this.handleGooglePlacesStatus(response.status, response.error_message);

      if (response.status === GOOGLE_PLACES_STATUS.ZERO_RESULTS) {
        return [];
      }

      return response.predictions.map(this.transformPredictionToPlace);
    } catch (error: unknown) {
      if (error instanceof PlacesApiError) {
        throw error;
      }
      throw new PlacesApiError('Failed to fetch autocomplete results', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }

  static async fetchPlaceDetails(placeId: string): Promise<Place> {
    if (!API_CONFIG.API_KEY) {
      throw new PlacesApiError('Google Places API key not configured', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    if (!placeId) {
      throw new PlacesApiError('Place ID is required', undefined, HTTP_STATUS.BAD_REQUEST);
    }

    const url = this.buildUrl(API_CONFIG.ENDPOINTS.DETAILS, {
      place_id: placeId,
      key: API_CONFIG.API_KEY,
    });

    try {
      const response = await this.makeRequest<GooglePlaceDetailsResponse>(url);

      this.handleGooglePlacesStatus(response.status, response.error_message);

      return this.transformDetailsToPlace(response.result);
    } catch (error: unknown) {
      if (error instanceof PlacesApiError) {
        throw error;
      }
      throw new PlacesApiError('Failed to fetch place details', undefined, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }
}