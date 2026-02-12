# Architecture
**Analysis Date:** 2026-02-12

## Pattern Overview

This is a **Next.js 15.2.0 full-stack application** using a **page-based routing pattern** with server-side static generation (SSG) for public content and client-side state management for authentication and user interactions. The architecture follows a **layered approach** separating presentation, business logic, and data access concerns.

**Tech Stack:**
- Frontend Framework: Next.js 15.2.0 with React 19.0
- Language: TypeScript 5.9
- Styling: Tailwind CSS 3.2 with custom breakpoints
- Backend Services: Firebase (Authentication & Firestore)
- External APIs: TMDB API (The Movie Database)
- Testing: Vitest 4.0 with React Testing Library
- Charts: Chart.js 4.2 with react-chartjs-2
- Utilities: Axios, date-fns, numeral, number-to-words

## Layers

### 1. **Presentation Layer** (`/components` and `/pages`)
Responsible for UI rendering and user interaction.

**Components** (`/components`):
- `Navbar.tsx` - Navigation bar with links to all major routes
- `Footer.tsx` - Footer component used across pages
- `Card.tsx` - Movie card component displaying poster, title, overview, release date, and rating
- `OneMovieReview.tsx` - Bar chart component comparing user review vs. TMDB audience rating
- `SignIn.tsx` - Login form component
- `SignUp.tsx` - Registration form component
- `AuthDetails.tsx` - Display authentication status and sign-out button

**Pages** (`/pages`):
- `index.tsx` - Homepage with James Bond collection poster (SSR with TMDB API)
- `filmography/index.tsx` - Movie grid displaying all Bond films (SSG with ISR)
- `filmography/[movieId].tsx` - Detailed movie page with reviews, stats, and user rating input (SSG with ISR)
- `infographics.tsx` - Dashboard with three bar charts showing ratings, votes, and popularity (SSG with ISR)
- `login.tsx` - Authentication page with sign-in, sign-up, and auth status sections
- `_app.tsx` - Next.js application wrapper with global styles and analytics
- `404.tsx`, `500.tsx`, `error.tsx` - Error pages

### 2. **Data & Business Logic Layer** (`/lib`)
Manages external API calls, database interactions, and application context.

**Files:**
- `db.ts` - Firebase configuration and initialization (exports: db, auth, provider)
- `context.ts` - React Context for authentication state (AuthContext with authEmail and setAuthEmail)
- `data.ts` - Mock user analytics data for chart visualization
- `fireStoreRef.js` - Additional Firebase references (if needed)

### 3. **Styling Layer** (`/styles` and Tailwind Config)
Global styles and design system configuration.

**Files:**
- `globals.css` - Custom CSS with Tailwind directives and dialog styling
- `tailwind.config.js` - Tailwind configuration with custom breakpoints (mvID1-4)

### 4. **Configuration Layer** (Root)
Framework and tool configurations.

**Files:**
- `next.config.js` - Next.js config (remote image patterns for TMDB)
- `tsconfig.json` - TypeScript compiler options
- `vitest.config.js` - Vitest test runner configuration
- `postcss.config.js` - PostCSS configuration for Tailwind

### 5. **Testing Layer** (`/__tests__`)
Unit and component tests mirroring source structure.

**Test Files:**
- `components/` - Component tests (Navbar, Card, SignIn, SignUp, OneMovieReview, AuthDetails, Footer)
- `lib/` - Library tests (context, data)
- `pages/` - Page tests (Home, Filmography, MovieDetail, Infographics)

## Data Flow

### Request Flow (Public Pages - SSG/ISR):

1. **Build Time/ISR Revalidation:**
   - `getStaticProps` fetches movie collection from TMDB API
   - Data is cached and pre-rendered as static HTML
   - ISR revalidates every 3600 seconds

2. **Runtime - Public Content Display:**
   - User requests page → Next.js serves static HTML
   - Browser renders page with cached movie data
   - Images load from TMDB CDN (image.tmdb.org)

3. **Dynamic Pages (Movie Details):**
   - `getStaticPaths` generates paths for each movie ID
   - `getStaticProps` fetches detailed movie facts from TMDB
   - Client-side hydration enables interactive features

### Authentication & User Review Flow:

1. **User Authentication:**
   - User submits email/password on `/login` page
   - `SignIn.tsx` or `SignUp.tsx` calls Firebase Auth methods
   - Firebase returns user credentials
   - Email stored in localStorage (key: "userEmail")

2. **Review Save Flow:**
   - User navigates to movie detail page
   - `useEffect` checks localStorage for "userEmail"
   - If logged in: `retrieveReview()` fetches user reviews from Firestore
   - User submits rating → `handleUpdateClick()` sends to Firestore
   - Firestore document structure: `users/{email}/{movieId_in_words}: rating_number}`

3. **Chart Generation:**
   - `OneMovieReview.tsx` receives user and audience ratings as props
   - Chart.js renders gradient bar chart comparing ratings
   - `Infographics.tsx` displays three charts for all movies

### External API Integration:

**TMDB API Calls:**
- Endpoint: `https://api.themoviedb.org/3/collection/{COLLECTION_ID}`
- Parameters: API key from `NEXT_PUBLIC_TMDB_API_KEY` environment variable
- Data returned: Movie collection with full details (title, overview, ratings, revenue, budget, etc.)
- Used in: `filmography/index.tsx`, `filmography/[movieId].tsx`, `infographics.tsx`

**Image URL Construction:**
- Base: `https://image.tmdb.org/t/p/original/`
- Appended with: `poster_path` or `backdrop_path` from API
- Configured in `next.config.js` under `remotePatterns`

## Key Abstractions

### 1. **Component Composition**
- Reusable UI components (`Card`, `OneMovieReview`, `Footer`, `Navbar`)
- Page components compose smaller components into full pages
- Props-based configuration enables flexible usage

### 2. **Firebase Abstraction**
- `db.ts` centralizes Firebase initialization and exports
- Auth and Firestore instances available throughout app
- Email-based document references for user data

### 3. **React Context**
- `AuthContext` manages email state across components
- Single source of truth for authentication state
- Can be extended for global auth state management

### 4. **Data Type Interfaces**
- `MovieFacts` - Complete movie details from TMDB
- `Movie` - Simplified movie object for lists
- `UserDataEntry` - Analytics data structure
- `CardProps`, `OneMovieReviewProps` - Component prop types

### 5. **Static Generation Strategy**
- SSG for public content (filmography, infographics)
- ISR (revalidate: 3600) for periodic updates
- Fallback: "blocking" for new movies before next build

## Entry Points

### Application Entry Points:

1. **`/pages/_app.tsx`** - Application root
   - Wraps all pages with global context and styling
   - Applies Libre Franklin font globally
   - Integrates Vercel Analytics

2. **`/pages/index.tsx`** - Public homepage
   - Primary landing page
   - Displays Bond collection poster
   - No authentication required

3. **`/pages/login.tsx`** - Authentication gateway
   - Sign-in and sign-up forms
   - Authentication status display
   - Stores user email in localStorage

4. **`/pages/filmography/index.tsx`** - Movie grid
   - Lists all James Bond films
   - Links to detailed movie pages
   - Protected display when logged in

5. **`/pages/filmography/[movieId].tsx`** - Dynamic movie detail
   - Individual movie information
   - User review input (if logged in)
   - Comparative ratings visualization

6. **`/pages/infographics.tsx`** - Analytics dashboard
   - Three bar charts for entire collection
   - Ratings, votes, and popularity metrics
   - Responsive design for different screen sizes

### API Integration Entry Points:

- **TMDB API** - Called via Axios in getStaticProps
- **Firebase Auth** - Called directly in form components
- **Firestore** - Called for reading/writing reviews

## Error Handling

### Error Pages:
- `/pages/404.tsx` - 404 Not Found page
- `/pages/500.tsx` - 500 Server Error page
- `/pages/error.tsx` - General error boundary page

### Try-Catch Patterns:
- **API Calls:** `.then().catch()` patterns in Axios requests
- **Firebase Operations:** Try-catch in Firestore document retrieval
- **Form Submissions:** Error logging in sign-in/sign-up forms
- **Dialog Validation:** Review rating validation (0-10 range) with custom dialog

### Console Logging:
- Error messages logged to browser console (not production-safe)
- Examples: API failures, Firebase errors, form submission failures

### Graceful Degradation:
- Missing images: Image component has fallback alt text
- Unauthorized content: Sign-in prompt on movie detail page
- API failures: Logged but don't break application

## Cross-Cutting Concerns

### 1. **Authentication & Authorization**
- Checked via localStorage presence ("userEmail")
- Applied in `movieId.tsx` (review input visibility)
- Navbar doesn't show protected content (stateless design)

### 2. **Styling Strategy**
- Tailwind CSS with custom breakpoints for responsive design
- Custom breakpoints: mvID1 (875px), mvID2 (555px), mvID3 (455px), mvID4 (390px)
- Global CSS for dialog styling and golden gradient
- Font loading from Google Fonts (Montserrat, Libre Franklin, Red Hat Display, Plus Jakarta Sans)

### 3. **State Management**
- Local component state via `useState`
- localStorage for authentication persistence
- Firebase as source of truth for user reviews
- No global state manager (noted in README as future improvement)

### 4. **Performance Optimization**
- ISR (Incremental Static Regeneration) for content updates
- Image optimization via Next.js Image component
- Lazy loading of images
- Environment variables for API keys (NEXT_PUBLIC_* pattern)

### 5. **Testing Infrastructure**
- Vitest as test runner
- React Testing Library for component testing
- jsdom environment for DOM simulation
- Mock implementations for Next.js modules (next/link, next/font)
- Global vitest setup in `vitest.setup.js`

### 6. **Analytics & Monitoring**
- Vercel Analytics integrated in `_app.tsx`
- No custom error tracking (mentioned as future improvement)

### 7. **Data Transformation**
- `date-fns` for date formatting (release dates)
- `numeral` for number formatting (currency, votes)
- `number-to-words` for movie ID to word conversion (Firestore key generation)
- `classnames` utility for conditional CSS classes

### 8. **Environment Configuration**
- NEXT_PUBLIC_TMDB_API_KEY - TMDB API key
- NEXT_PUBLIC_TMDB_COLLECTION_ID - James Bond collection ID
- NEXT_PUBLIC_FIREBASE_* - Firebase config values
- `.env.local` (not in repo) for sensitive values

---
*Architecture analysis: 2026-02-12*
