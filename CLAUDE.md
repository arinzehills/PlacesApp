# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm start` - Start Expo development server
- `npm run android` - Start Android development build
- `npm run ios` - Start iOS development build
- `npm run web` - Start web development build

### Testing & Quality
- `npm test` - Run all tests using Jest
- `npm run test:watch` - Run tests in watch mode for development
- `npm run lint` - Run ESLint for code linting

### Build
- `expo build:android` - Build Android APK
- `expo build:ios` - Build iOS IPA

## Project Architecture

### Module-Based Architecture
The app follows a clean, module-based architecture organized under `src/`:

**Core Structure:**
- `src/app/` - App-level routing and layout (Expo Router)
- `src/modules/` - Feature modules (places, map, home)
- `src/shared/` - Shared components, hooks, and utilities
- `src/store/` - Redux store configuration with persistence

**Feature Modules Pattern:**
Each module follows consistent structure:
```
modules/[feature]/
├── components/     # UI components with co-located styles
├── hooks/          # Custom hooks for business logic
├── redux/          # State management (slices, thunks)
├── screens/        # Screen components
└── services/       # API services and data layer
```

### State Management
- **Redux Toolkit** with TypeScript for state management
- **Redux Persist** with AsyncStorage for data persistence
- **Async Thunks** for API operations (searchPlaces, fetchPlaceDetails)
- **Redux slice pattern** with extraReducers for thunk handling

### Key Services
- `PlacesApiService` - Google Places API integration with error handling
- Custom hooks pattern: `usePlaceAutocomplete`, `usePlaceDetails`, `usePlaces`

### TypeScript Configuration
- Path aliases configured in tsconfig.json:
  - `@/*` → `./src/*`
  - `@/modules/*` → `./src/modules/*`
  - `@/app/*` → `./src/app/*`
  - `@/shared/*` → `./src/shared/*`
  - `@/store/*` → `./src/store/*`

### Testing Setup
- **Jest** with ts-jest preset
- **jsdom** test environment
- **Testing Library** for React Native component testing
- Path aliases work in tests via moduleNameMapper
- Test files located in `__tests__/` directories within feature modules

### Environment Variables
- `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY` - Required for Google Places API

### Key Dependencies
- **Expo Router** for file-based routing
- **React Native Maps** for map functionality
- **Ant Design React Native** for UI components
- **Redux Toolkit** with Redux Persist for state management
- **TypeScript** in strict mode

### Performance Patterns
- Debounced search input (300ms) via `useDebounce` hook
- Place search history with 20-item limit and duplicate prevention
- Lazy loading and component-level optimizations

### Code Conventions
- Component files use PascalCase with co-located styles
- Services use class-based static methods
- Redux slices follow RTK patterns with extraReducers
- Custom hooks start with 'use' prefix
- Error handling via custom `PlacesApiError` class