# Real Estate Listings Platform

A modern web-based real estate listings platform that allows users to browse, search, and filter property listings. Built using React, Redux Toolkit, and TypeScript, the platform provides a seamless and interactive user experience with a clean architecture and reusable components.

---

## Features
- **Property Listings**: Display real estate listings with detailed information and images.
- **Filters**: Users can filter listings by location, price, and features.
- **Responsive Design**: Optimized for all screen sizes.
- **State Management**: Efficient global state handling with Redux Toolkit.
- **Routing**: Dynamic page navigation using React Router.

---

## Architecture

The project follows a modular and scalable folder structure:

```
src/
├── components/            # Reusable UI components
│   ├── alert/            # Alert notification component
│   ├── back-button/      # Navigation back button
│   ├── contact-form/     # Form to contact property listers
│   ├── dropdown/         # Dropdown components for filters
│   ├── empty-state/      # Placeholder for empty data
│   ├── filter-section/   # Filter UI for listings
│   ├── listing-section/  # Component to display property listings
│   ├── loading-state/    # Loader component
│   └── modal/            # Modal for various uses
├── middlewares/           # Custom middlewares
├── pages/                 # Route-specific pages
│   └── listing-detail/   # Details page for a specific listing
├── store/                 # Redux store configuration
│   ├── slices/           # Redux slices for state
│   ├── thunks/           # Async actions using Redux Thunks
│   └── index.ts          # Store setup
├── types/                 # TypeScript type definitions
├── tests/                 # Test files for components and features
├── App.tsx                # Main application component
├── index.css              # Global styles
├── main.tsx               # Entry point of the application
└── vite-env.d.ts          # Vite environment types
```

---

## Libraries and Tools Used

- **React**: UI Library
- **Redux Toolkit**: State management
- **TypeScript**: Static typing
- **Vite**: Development build tool
- **Vitest**: Unit testing framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Styling framework

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (>=14.x)
- npm (>=6.x) or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
To start the development server:
```bash
npm run dev
```

### Build
To build the project for production:
```bash
npm run build
```

### Preview
To preview the production build:
```bash
npm run preview
```

### Linting
To run ESLint and check for code issues:
```bash
npm run lint
```

### Testing
To execute all tests with detailed output:
```bash
npm run test
```

---

## Scripts

The following scripts are available:

| Script       | Description                                      |
|--------------|--------------------------------------------------|
| `dev`        | Starts the development server                   |
| `build`      | Builds the application for production           |
| `preview`    | Previews the production build                   |
| `lint`       | Runs ESLint to check code quality               |
| `test`       | Runs all unit tests with detailed output        |

---

## Testing Strategy

The project uses **Vitest** and **React Testing Library** for testing. Tests are located in the `src/tests` folder and cover:
- Component rendering
- Redux state updates
- API interactions
- error handling
