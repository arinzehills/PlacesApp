# PlacesApp - React Native Places Search Application

A modern React Native application for searching and exploring places using Google Places API, built with clean architecture principles and professional mobile development practices.

## 📱 Live Preview

🎬 **[Watch App Demo](https://www.loom.com/share/a8da95e0b3fb4565bf2df418e33a878c?sid=583fea77-8c8f-48bc-9276-fc0f9ad1907f)** - See the app in action!

## 🚀 Features

- **Google Places Autocomplete**: Real-time place search with debounced input
- **Interactive Map View**: Visualize places on an interactive map with custom markers
- **Search History**: Persistent storage of recent searches
- **Place Details**: Comprehensive information about selected places
- **Clean Architecture**: Modular structure with separation of concerns

## 🛠 Tech Stack

- **React Native** with Expo Router for navigation
- **TypeScript** for type safety and better developer experience
- **Redux Toolkit** for state management with async thunks
- **Redux Persist** for data persistence
- **Ant Design React Native** for consistent UI components
- **React Native Maps** for map functionality
- **Jest** with comprehensive test coverage

## 📁 Project Structure

```
src/
├── app/                    # App-level configuration (Router, Layout)
├── modules/               # Feature modules
│   ├── places/           # Places search functionality
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom hooks (useAutocomplete, usePlaceDetails)
│   │   ├── redux/        # State management (slices, thunks)
│   │   ├── screens/      # Screen components
│   │   └── services/     # API services and business logic
│   ├── map/              # Map functionality
│   └── home/             # Home screen
├── shared/               # Shared utilities
│   └── utils/           # Common utilities (debounce, formatters, validation)
└── store/               # Redux store configuration
```

## 🧪 Testing

Comprehensive test suite covering:
- Unit tests for utility functions
- Redux slice and thunk testing
- Service layer testing
- Input validation testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
```

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 16)
- Expo CLI
- Google Places API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Add your Google Places API key to your environment
   - Configure `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`

4. Start the development server:
   ```bash
   npm start
   ```

## 🏗 Architecture Highlights

### Clean Architecture Pattern
- **Service Layer**: Handles API communication and data transformation
- **Redux Layer**: Manages application state with async operations
- **Hook Layer**: Provides reusable stateful logic
- **Component Layer**: Focuses purely on UI presentation

### Key Design Decisions
- **Modular Structure**: Features organized in self-contained modules
- **TypeScript First**: Full type safety across the application
- **Custom Hooks**: Encapsulated business logic in reusable hooks
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance**: Debounced search, optimized re-renders, and efficient state updates

### State Management
- **Redux Toolkit** for predictable state updates
- **Async Thunks** for API operations with loading states
- **Redux Persist** for seamless user experience across app restarts

## 🎯 Key Features Implementation

### Places Search
- Real-time autocomplete with 300ms debounce
- Error handling and loading states
- History management with duplicate prevention

### Map Integration
- Custom markers for search results
- User location tracking
- Smooth animations and region updates

### Data Persistence
- Search history persistence
- User preferences storage
- Offline capability preparation

## 🧩 Code Quality

- **ESLint** for code consistency
- **TypeScript** strict mode enabled
- **Modular architecture** with clear separation of concerns
- **Comprehensive testing** with Jest
- **Professional naming conventions** and file organization

---

**Built with ❤️ using modern React Native development practices**
