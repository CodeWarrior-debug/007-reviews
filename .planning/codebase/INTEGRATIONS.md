# External Integrations
**Analysis Date:** 2026-02-12

## APIs & External Services

### TMDB (The Movie Database)
- **Service**: Movie and collection data API
- **Integration Type**: REST API via Axios
- **Usage**:
  - Fetches James Bond movie collection data for filmography page
  - Retrieves detailed movie information (title, overview, release date, ratings, budget, revenue, etc.)
  - Provides movie poster and backdrop images
  - Supplies trending scores and vote counts
- **Files**:
  - `/home/user/007-reviews/pages/filmography/index.tsx` - Collection endpoint
  - `/home/user/007-reviews/pages/filmography/[movieId].tsx` - Movie details endpoint
  - `/home/user/007-reviews/pages/index.tsx` - Home page poster fetch
  - `/home/user/007-reviews/pages/infographics.tsx` - Analytics data fetch
- **Base URL**: `https://api.themoviedb.org/3/`
- **Endpoints**:
  - `GET /collection/{collection_id}` - Get collection data with all parts
  - `GET /movie/{movie_id}` - Get detailed movie information
- **Authentication**: API key via `NEXT_PUBLIC_TMDB_API_KEY` environment variable
- **Collection ID**: Configured via `NEXT_PUBLIC_TMDB_COLLECTION_ID` environment variable
- **Image CDN**: `https://image.tmdb.org/t/p/original/` - Movie poster and backdrop images
- **Response Caching**: 3600-second ISR (Incremental Static Regeneration) revalidation

### Icons8 API
- **Service**: Icon and asset library
- **Integration Type**: External link reference
- **Usage**: Attribution for 007 icon used in footer
- **Files**: `/home/user/007-reviews/components/Footer.tsx`
- **Base URL**: `https://icons8.com/icon/19532/007`

## Data Storage

### Firebase Firestore
- **Service**: NoSQL cloud database for user reviews
- **Integration Type**: SDK via Firebase Admin/Client SDK
- **Usage**:
  - Store user movie reviews (0-10 ratings)
  - Persist user-submitted review data
  - Document-based storage with user email as document ID
- **Files**: `/home/user/007-reviews/lib/db.ts`, `/home/user/007-reviews/pages/filmography/[movieId].tsx`
- **Collection**: `users` - Contains user documents indexed by email
- **Document Structure**:
  - Fields are movie IDs converted to words (via number-to-words)
  - Values are numeric ratings (0-10)
  - Example: `{five: 7.5, six: 8.0}` for movies with IDs 5 and 6
- **Configuration**:
  - Project ID: `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - Auth Domain: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - Storage Bucket: `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - API Key: `NEXT_PUBLIC_FIREBASE_API_KEY`

## Authentication & Identity

### Firebase Authentication
- **Service**: Authentication and authorization
- **Integration Type**: Firebase Client SDK
- **Authentication Methods**:
  - Email/Password authentication
  - Google OAuth sign-in provider
- **Files**:
  - `/home/user/007-reviews/lib/db.ts` - Provider initialization
  - `/home/user/007-reviews/components/SignIn.tsx` - Email/password login
  - `/home/user/007-reviews/components/SignUp.tsx` - User registration
- **User Session**:
  - Stored in localStorage as `userEmail` key
  - Used to retrieve and persist user reviews
  - Email verified as Firestore document ID
- **Configuration**:
  - Auth Domain: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - Messaging Sender ID: `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - App ID: `NEXT_PUBLIC_FIREBASE_APP_ID`
- **Provider**: `GoogleAuthProvider` exported from `/home/user/007-reviews/lib/db.ts`
- **User Context**: Custom React Context for managing authenticated user email (`/home/user/007-reviews/lib/context.ts`)
  - `AuthContext` - Provides `authEmail` state and setter
  - Used for component-level auth state management

## Monitoring & Observability

### Vercel Analytics
- **Service**: Web analytics and performance monitoring
- **Integration Type**: Vercel Analytics React component
- **Usage**: Track pageviews, performance metrics, and user interactions
- **Files**: `/home/user/007-reviews/pages/_app.tsx`
- **Import**: `@vercel/analytics/react`
- **Component**: `<Analytics />` wrapper in root `_app.tsx`
- **Configuration**: Automatic via Vercel deployment environment

## CI/CD & Deployment

### Vercel Platform
- **Service**: Deployment, hosting, and serverless functions
- **Integration Type**: Native Next.js deployment platform
- **Configuration Files**:
  - `.vercel/` directory (not committed, generated during deployment)
  - Environment variables stored in Vercel project settings
- **Next.js Optimization**:
  - Image optimization server
  - Serverless function execution for API routes
  - Built-in caching and CDN
- **Build Process**:
  - Automatic on git push
  - Build script: `next build`
  - Start script: `next start`

## Environment Configuration

### Environment Variables
All environment variables use `NEXT_PUBLIC_` prefix for client-side access:

**Firebase Configuration:**
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Auth domain (e.g., project.firebaseapp.com)
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project identifier
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Storage bucket URL
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Cloud messaging identifier
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Firebase application ID

**TMDB Configuration:**
- `NEXT_PUBLIC_TMDB_API_KEY` - The Movie Database API key
- `NEXT_PUBLIC_TMDB_COLLECTION_ID` - James Bond collection ID (predefined on TMDB)

### Environment Files
- Local development: `.env.local` (gitignored)
- Vercel: Environment variables stored in project settings (not committed)
- No root `.env` file committed to repository

## Webhooks & Callbacks

### None Configured
The application does not implement incoming webhooks or callback endpoints. However:
- Firebase Authentication provides real-time listener events for auth state changes
- Firestore provides real-time listeners for document changes (not currently implemented in code)
- TMDB API calls are unidirectional (request-response only)

### External Links & Attribution
- **TMDB Attribution**: Required disclaimer in footer linking to `https://www.themoviedb.org/`
- **Icons8 Attribution**: Icon attribution link in footer
- **GitHub Repository**: Reference to source code at `https://github.com/CodeWarrior-debug/007-reviews`

---
*Integration audit: 2026-02-12*
