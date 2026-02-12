# Technology Stack
**Analysis Date:** 2026-02-12

## Languages
- **TypeScript** - Primary language for type-safe development (`/home/user/007-reviews/tsconfig.json`)
- **JavaScript** - Configuration files and legacy support
- **CSS** - Styling through Tailwind and PostCSS
- **JSX/TSX** - React component markup

## Runtime
- **Node.js** >= 20.x (specified in `package.json` engines field)
- **Browser** - Client-side React 19.0.0 execution

## Frameworks
- **Next.js** ^15.2.0 - Full-stack React framework for SSR, SSG, and API routes (`/home/user/007-reviews/next.config.js`)
  - Static generation with `getStaticProps` and `getStaticPaths` for movie collections
  - Image optimization via Next Image component
  - Font optimization with next/font (Google Fonts: Libre Franklin, Montserrat)
- **React** ^19.0.0 - UI library for component-based architecture
- **React DOM** ^19.0.0 - DOM rendering

## Key Dependencies

### Data Fetching & HTTP
- **axios** ^1.1.3 - HTTP client for TMDB API requests (`/home/user/007-reviews/pages/filmography/index.tsx`, `/home/user/007-reviews/pages/filmography/[movieId].tsx`)

### Database & Authentication
- **firebase** ^9.17.1 - Backend-as-a-service for authentication and database
  - Firestore for user review storage
  - Firebase Auth with Google OAuth provider (`/home/user/007-reviews/lib/db.ts`)
  - Email/password authentication (`/home/user/007-reviews/components/SignIn.tsx`)

### Data Visualization
- **chart.js** ^4.2.1 - Charting library
- **react-chartjs-2** ^5.2.0 - React wrapper for Chart.js
- **chartjs-plugin-datalabels** ^2.2.0 - Plugin for displaying data labels on charts

### Date & Number Formatting
- **date-fns** ^2.29.3 - Date manipulation and formatting
- **numeral** ^2.0.6 - Number formatting and manipulation
- **number-to-words** ^1.2.4 - Convert numbers to written words

### Styling & UI
- **tailwindcss** ^3.2.1 - Utility-first CSS framework (`/home/user/007-reviews/tailwind.config.js`)
- **postcss** ^8.4.18 - CSS transformations (`/home/user/007-reviews/postcss.config.js`)
- **autoprefixer** ^10.4.12 - PostCSS plugin for vendor prefixes
- **classnames** ^2.3.2 - Conditional CSS class names

### Analytics & Monitoring
- **@vercel/analytics** ^1.6.0 - Analytics integration for Vercel deployments (`/home/user/007-reviews/pages/_app.tsx`)

### Development & Testing
- **vitest** ^4.0.18 - Unit testing framework (`/home/user/007-reviews/vitest.config.js`)
- **@vitejs/plugin-react** ^5.1.3 - React support for Vite
- **@testing-library/react** ^16.3.2 - React testing utilities
- **@testing-library/jest-dom** ^6.9.1 - DOM matchers for testing
- **jsdom** ^28.0.0 - DOM implementation for Node.js testing
- **@vitest/coverage-v8** ^4.0.18 - Code coverage reporting

### Linting & Code Quality
- **eslint** ^9.0.0 - Code linting
- **eslint-config-next** ^15.2.0 - Next.js ESLint configuration (`/home/user/007-reviews/.eslintrc.json`)

### TypeScript Types
- **@types/react** ^19.2.14
- **@types/react-dom** ^19.2.3
- **@types/node** ^25.2.3
- **@types/number-to-words** ^1.2.3
- **@types/numeral** ^2.0.5
- **typescript** ^5.9.3

## Configuration

### Build & Development
- **TypeScript Configuration** (`/home/user/007-reviews/tsconfig.json`):
  - Target: ES2020
  - Module: ESNext
  - JSX: react-jsx
  - Strict mode enabled
  - Incremental compilation enabled

- **Next.js Configuration** (`/home/user/007-reviews/next.config.js`):
  - React Strict Mode enabled
  - Remote image patterns allowed for `image.tmdb.org`
  - Image optimization for TMDB poster and backdrop assets

- **Tailwind CSS Configuration** (`/home/user/007-reviews/tailwind.config.js`):
  - Custom breakpoints: mvID1 (875px), mvID2 (555px), mvID3 (455px), mvID4 (390px)
  - Custom gradient-radial background image

- **PostCSS Configuration** (`/home/user/007-reviews/postcss.config.js`):
  - Tailwind CSS plugin
  - Autoprefixer plugin

### Testing & Linting
- **Vitest Configuration** (`/home/user/007-reviews/vitest.config.js`):
  - Environment: jsdom for DOM testing
  - Global test utilities enabled
  - Coverage reporters: text, json, html
  - Setup file: `./vitest.setup.js`

- **ESLint Configuration** (`/home/user/007-reviews/.eslintrc.json`):
  - Extends: next/core-web-vitals

### Environment Variables
(Configured via Next.js environment variables, not committed to repository):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_TMDB_API_KEY`
- `NEXT_PUBLIC_TMDB_COLLECTION_ID`

### Scripts
- `dev` - Start development server with `next dev`
- `build` - Build production bundle with `next build`
- `start` - Start production server with `next start`
- `lint` - Run ESLint with `next lint`
- `test` - Run tests in watch mode with `vitest`
- `test:run` - Run tests once with `vitest run`

## Platform Requirements

### Minimum Requirements
- Node.js >= 20.x
- npm or yarn package manager

### Deployment
- Compatible with Vercel (Next.js native platform)
- Includes `.vercel` in gitignore for Vercel configuration
- Analytics configured for Vercel platform monitoring

### Supported Browsers
- Modern browsers with ES2020 support
- Mobile-responsive design (custom breakpoints in Tailwind)

---
*Stack analysis: 2026-02-12*
