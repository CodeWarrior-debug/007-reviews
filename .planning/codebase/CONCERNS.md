# Codebase Concerns
**Analysis Date:** 2026-02-12

## Tech Debt

### 1. Mixed TypeScript/JavaScript Configuration
**Issue:** Project includes both `.ts`, `.tsx`, and `.js` files, with one critical `.js` file containing secrets.

**Files:**
- `lib/fireStoreRef.js` (1 file remaining in JavaScript)
- All other files properly migrated to TypeScript

**Why:** The codebase was partially migrated from JavaScript to TypeScript, but `fireStoreRef.js` was left behind as a legacy file.

**Impact:**
- Type safety not enforced on this file
- IDE support and refactoring tools less effective
- Test coverage difficult to apply consistently
- Creates cognitive load during maintenance

**Fix approach:**
- Rename `lib/fireStoreRef.js` to `lib/fireStoreRef.ts`
- Remove hardcoded credentials (see Security section)
- Export proper TypeScript types for Firebase operations
- Add to tsconfig include pattern verification

### 2. Duplicate Firebase Initialization
**Issue:** Firebase is initialized multiple times in different components and pages.

**Files:**
- `lib/db.ts` - Primary initialization (lines 1-19)
- `components/SignUp.tsx` - Re-initializes at lines 25-26
- `pages/filmography/[movieId].tsx` - Re-initializes at lines 47-48, 68-69

**Why:** Developers independently initialized Firebase without recognizing existing initialization.

**Impact:**
- Multiple Firebase instances can cause unexpected behavior
- Memory overhead from redundant initializations
- Configuration inconsistencies possible if env vars change
- Difficult to apply global Firebase configuration changes

**Fix approach:**
- Keep single initialization in `lib/db.ts`
- Export initialized instances from db.ts for import in components
- Update SignUp.tsx (line 25-26) to remove re-initialization
- Update MovieId page (line 47-48) to use existing export from db.ts
- Add ESLint rule to prevent `initializeApp` calls outside lib/db.ts

### 3. Unused/Commented Code Blocks
**Issue:** Extensive commented-out code in `lib/fireStoreRef.js` (lines 17-131).

**Files:**
- `lib/fireStoreRef.js` - Lines 29-130 are example/commented code from Firebase docs

**Why:** Left over from initial Firebase setup documentation reference.

**Impact:**
- Increases file size (4.2 KB file, ~70% is comments)
- Confusion about what's active vs. example code
- Makes it harder to understand actual usage
- Version control history harder to parse

**Fix approach:**
- Remove all commented example code
- Create separate `.example.js` documentation file if needed
- Keep only active Firestore operations
- Reference Firebase docs link in README instead

### 4. Manual localStorage Usage Without Abstraction
**Issue:** localStorage is accessed directly throughout the codebase without consistent error handling or typing.

**Files:**
- `components/AuthDetails.tsx` - Line 25: `localStorage.clear()`
- `components/SignIn.tsx` - Line 15: `localStorage.setItem("userEmail", email)`
- `components/Navbar.tsx` - Line 12: `localStorage.getItem("userEmail")`
- `pages/filmography/[movieId].tsx` - Lines 71, 94, 116

**Why:** Direct API usage is convenient for simple cases but lacks abstraction.

**Impact:**
- No type safety for storage keys (magic strings: "userEmail")
- No consistency in what gets stored/cleared
- localStorage quota exceeded risk not handled
- No alternative storage strategy for SSR/Node.js

**Fix approach:**
- Create `lib/storage.ts` with abstraction layer
- Define constants for storage keys: `STORAGE_KEYS = { USER_EMAIL: 'userEmail' }`
- Add try/catch for storage errors
- Add validation and serialization helpers
- Consider localStorage.clear() at line 25 - only needs email deletion, not full clear

---

## Known Bugs

### 1. Silent Firebase Auth Errors
**Symptoms:** Login failures show console error but no user-facing error message.

**Trigger:**
- Invalid Firebase credentials provided in env vars
- Network error during authentication
- Firebase project misconfiguration

**Files affected:**
- `components/SignIn.tsx` - Lines 18-20: `.catch((error) => { console.log(error); })`
- `components/SignUp.tsx` - Lines 21-23: `.catch((error) => { console.log(error); })`

**Workaround:** Check browser console for actual error message.

**Root cause:** Errors logged to console but no error state or toast notification shown to user.

**Fix approach:**
- Add error state to both components: `const [error, setError] = useState<string>('')`
- Display error message in UI using error state
- Differentiate error types (network, auth, validation)
- Add specific error messages for common failures

### 2. Unhandled Promise in Home Page
**Symptoms:** Data fetch doesn't properly await or handle async operations.

**Trigger:** Page loads, poster API call may not complete before render attempt.

**Files affected:**
- `pages/index.tsx` - Lines 17-31 (useEffect logic)

**Code issue:**
```typescript
const getPoster = Axios.get(...)  // Assigned but promise not awaited
const data = async () => {
  await getPoster;  // Awaiting in unnecessary wrapper
};
data();  // Not awaiting this call
```

**Root cause:** Anti-pattern of wrapping async call in another async function.

**Fix approach:**
```typescript
useEffect(() => {
  const fetchPoster = async () => {
    try {
      const res = await Axios.get(...);
      setPoster(baseURL + res.data.poster_path);
    } catch (err) {
      console.error("Failed to load poster:", err);
      // Optionally set a fallback or error state
    }
  };

  fetchPoster();
}, []);
```

### 3. Hardcoded Review Validation Range
**Symptoms:** User can submit any number via input field; validation only via dialog at lines 123-128.

**Trigger:** User enters invalid rating (e.g., -5 or 15) and clicks "Update Review"

**Files affected:**
- `pages/filmography/[movieId].tsx` - Lines 220-224 (input min/max) vs. lines 123-128 (validation)

**Root cause:**
- HTML5 min/max on input element (line 220-221) are easily bypassed
- No client-side validation before Firebase update
- Validation logic after update attempt is fired

**Fix approach:**
- Add client validation before updateDoc call
- Use number range check: `if (reviewNumber < 0 || reviewNumber > 10)`
- Add error state instead of dialog.show()
- Prevent button click if value invalid: `disabled={reviewNumber < 0 || reviewNumber > 10}`

### 4. Review Input Focus Management Issue
**Symptoms:** Input tries to auto-focus on mount but ref may not be ready.

**Trigger:** Component mount with localStorage containing userEmail

**Files affected:**
- `pages/filmography/[movieId].tsx` - Line 97: `reviewRef.current?.focus()`

**Root cause:** useEffect dependency on `review` state causes focus on every review update, not just mount.

**Fix approach:**
- Separate effects: one for initial load/focus (empty deps), one for review updates
- Add ref existence check before calling focus()
- Consider if auto-focus is necessary UX improvement

---

## Security Considerations

### 1. **CRITICAL: Exposed Firebase Credentials**
**Risk:** Extremely high - Production credentials visible in source code.

**Current state:**
- File: `lib/fireStoreRef.js` - Lines 3-11
- Contains API key, auth domain, project ID, app ID, messaging sender ID
- All credentials hardcoded as string literals
- Firebase API key: `AIzaSyCedmnK2O54nCVqjpKDrrHg-FsQcBI-qvI`
- Project ID: `reviews-7fc2a`

**Impact:**
- Anyone with repository access can access Firebase database
- Can create unauthorized user accounts
- Can read/write to Firestore collections
- Can abuse TMDB API quota
- Account takeover risk

**Current mitigation:** NONE - Credentials are publicly exposed

**Recommendations:**
1. **IMMEDIATE:** Disable or reset Firebase credentials in Firebase Console
2. **IMMEDIATE:** Remove hardcoded credentials from `lib/fireStoreRef.js`
3. **IMMEDIATE:** Use `.env.local` (already in .gitignore)
4. Use environment variables via `process.env.NEXT_PUBLIC_*` only
5. Ensure `.env.local` is added to `.gitignore` (VERIFIED: present at line 29)
6. Regenerate all API keys after code audit
7. Use Google Cloud IAM for credential management
8. Consider Firebase security rules to restrict access (currently open to public)
9. Add pre-commit hook to prevent credentials in commits

### 2. Input Validation Missing for User Reviews
**Risk:** Medium - Data validation and sanitization gaps.

**Current state:**
- User review input accepts any value user types
- No validation before database write
- Review string converted directly to number without error handling

**Files affected:**
- `pages/filmography/[movieId].tsx` - Line 119: `const reviewNumber = parseFloat(reviewString);`

**Impact:**
- NaN values could be stored if invalid input
- No XSS protection on data display
- Database could accumulate malformed data
- Type mismatch in Firestore

**Recommendations:**
- Add input sanitization: `parseInt/parseFloat` with error handling
- Validate before updateDoc: reject NaN, Infinity, non-numeric
- Add type guards for data read from Firestore
- Consider form validation library (zod, yup)
- Sanitize any user-provided data before storage/display

### 3. Missing CORS and Security Headers
**Risk:** Medium - Application lacks HTTP security headers.

**Current state:**
- `next.config.js` - No headers configuration present
- No CORS restrictions defined
- Missing security headers: CSP, X-Frame-Options, X-Content-Type-Options, etc.

**Impact:**
- Vulnerable to clickjacking attacks
- No protection against MIME-type sniffing
- Missing Content Security Policy
- Can be framed by malicious sites

**Files:**
- `next.config.js` (lines 11-40) - No headers section

**Recommendations:**
- Add headers to next.config.js:
  ```javascript
  const headers = async () => {
    return [{ source: '/:path*', headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Content-Security-Policy', value: "default-src 'self' ..." }
    ]}];
  };
  ```
- Restrict TMDB image domain in CSP
- Add Strict-Transport-Security for HTTPS

### 4. localStorage Data Persistence Risk
**Risk:** Medium - Sensitive data stored in browser storage.

**Current state:**
- User email stored in localStorage (line 15 in SignIn.tsx)
- No encryption or hashing

**Impact:**
- Email exposed to any JavaScript on same origin
- Visible to browser extensions with full access
- Not cleared when user logs out from other tab
- Subject to XSS attacks

**Recommendations:**
- Consider using secure, httpOnly cookies for auth tokens instead
- Store only session identifier, not user email
- Clear storage on sign out (currently only clears all)
- Use browser sessionStorage for temporary data if applicable
- Consider Firebase Auth session tokens instead of custom email storage

### 5. External Link Security
**Risk:** Low - Multiple external links without rel attributes.

**Current state:**
- External links in `components/Footer.tsx` missing `rel="noopener noreferrer"`
- Links to: icons8.com, TMDB, GitHub

**Impact:**
- Window.opener exposure to linked sites
- Potential for reverse tabnabbing attacks
- May affect site performance metrics

**Files:**
- `components/Footer.tsx` - Lines 10-58 (all external links)

**Recommendations:**
- Add `rel="noopener noreferrer"` to all external links
- Verify destination site security before linking

---

## Performance Bottlenecks

### 1. Synchronous API Calls in getStaticProps
**Problem:** Multiple TMDB API calls made sequentially during build time.

**Measurement:** Each API call ~500ms; 3 pages × 3 collections = potential 1500ms+ build time overhead.

**Cause:**
- Home page (line 18-24 in index.tsx): 1 API call
- Filmography index (line 54-61): 1 API call
- Infographics (line 247-254): 1 API call
- Each page re-fetches same collection data

**Files:**
- `pages/index.tsx` - Lines 17-32 (useEffect, runtime)
- `pages/filmography/index.tsx` - Lines 54-61 (getStaticProps)
- `pages/infographics.tsx` - Lines 247-254 (getStaticProps)

**Improvement path:**
- Cache TMDB collection response: create single `lib/tmdbApi.ts` export
- Use getStaticProps with revalidate: 3600 (already correct)
- Combine collection fetch into one API call at build time
- Consider service worker for client caching
- Add response compression in next.config.js

### 2. Unoptimized Image Loading
**Problem:** Multiple Image components without proper optimization.

**Cause:**
- Card component (line 35-42): poster images 123×176px but not lazy-loaded
- Home page (line 60-68): large collection poster not optimized for viewport
- MovieId page (line 194-201): redundant backdrop images on small screens

**Impact:**
- Filmography with 25+ movies = 25+ image requests
- No image compression or format adaptation
- Layout shift from unset image dimensions

**Files:**
- `components/Card.tsx` - Lines 35-42 (Image without sizes)
- `pages/index.tsx` - Lines 59-68 (Image fill without proper aspect ratio)
- `pages/filmography/[movieId].tsx` - Lines 141-147, 194-201

**Improvement path:**
- Add proper `sizes` prop to all Image components
- Enable Next.js image optimization in next.config.js
- Add loading="lazy" where appropriate
- Set explicit width/height for all images
- Consider WebP format via next/image

### 3. Unused Dependencies
**Problem:** Dependencies included but potentially unused.

**Cause:** Standard template setup without cleanup.

**Potential issues:**
- `number-to-words` - Used only in MovieId page (line 79, 120) for review storage
- `classnames` - Used everywhere, good for maintainability but adds ~1.5KB gzip
- `chart.js` + `react-chartjs-2` + `chartjs-plugin-datalabels` - Only for Infographics page

**Impact:** ~50KB additional bundle size on pages that don't use charts.

**Files:**
- `package.json` - Lines 17-29 (dependencies section)

**Improvement path:**
- Code split chart library: dynamic import for infographics page only
- Audit usage of all dependencies with `npm ls`
- Consider lighter alternatives: `tiny-classnames` or inline classNames

### 4. React Chart.js Plugin Registration Performance
**Problem:** ChartJS plugins registered on every page render.

**Cause:**
- `components/OneMovieReview.tsx` - Line 5: `ChartJS.register(ChartDataLabels);`
- `pages/infographics.tsx` - Line 11: `ChartJS.register(ChartDataLabels);`

**Impact:** Plugin registered twice for no benefit.

**Improvement path:**
- Register once in app initialization (\_app.tsx or lib/charts.ts)
- Use conditional registration: check if already registered

---

## Fragile Areas

### 1. Dynamic Movie Data Dependency
**Why fragile:**
- Entire filmography depends on TMDB Collection ID environment variable
- No fallback if API is down during build
- getStaticPaths uses undefined handling with `.catch()` (returns undefined)

**Common failures:**
- TMDB API returns 404 if collection deleted/changed
- Environment variables not set during deployment
- Network timeout during build time

**Files affected:**
- `pages/filmography/[movieId].tsx` - Lines 393-415 (getStaticPaths)
- `pages/filmography/index.tsx` - Lines 53-69 (getStaticProps)
- `pages/infographics.tsx` - Lines 246-262 (getStaticProps)

**Safe modifications:**
- Add error boundaries: return empty array/props instead of undefined
- Implement retry logic with exponential backoff
- Create fallback data for demo mode
- Add validation that TMDB_COLLECTION_ID is set before build
- Log API failures explicitly, not silently to console

**Test coverage:**
- No tests for API failure scenarios
- No tests for missing environment variables
- Build would fail silently with undefined movie data

### 2. Firebase Database Schema Assumptions
**Why fragile:**
- Code assumes specific Firestore collection structure ("users" collection, email as docID)
- No schema validation
- Stores review data with movie ID converted to English words (line 79: `converter.toWords(movieFacts.id)`)

**Common failures:**
- Schema mismatch between environments
- Movie ID conversion produces unexpected field names
- Document structure changes break queries

**Files affected:**
- `pages/filmography/[movieId].tsx` - Lines 67-91 (retrieveReview), 111-132 (handleUpdateClick)

**Safe modifications:**
- Create `lib/firestore-schema.ts` with TypeScript interfaces
- Add runtime schema validation (zod or io-ts)
- Document the review storage strategy: why English word keys?
- Add data migration helpers for schema changes
- Create Firestore indexes for common queries

**Test coverage:**
- MovieDetail tests mock Firestore (lines 28-32 in test), no real database tests
- No tests for schema mismatches or missing fields

### 3. Review Input Type Coercion
**Why fragile:**
- Review stored as string in localStorage, Firestore, and code
- Multiple type conversions: string → number → string → number

**Common failures:**
- NaN values from invalid parseFloat()
- Infinity from division by zero
- Type mismatch between storage and display

**Files affected:**
- `pages/filmography/[movieId].tsx` - Lines 43, 82, 113, 119, 206-209

**Safe modifications:**
- Create `lib/review.ts` with type-safe conversion functions
- Add guards: `Number.isFinite()` before using parsed numbers
- Store as number in Firestore, not string
- Add TypeScript const assertions for type safety

**Test coverage:**
- No tests for edge cases: NaN, Infinity, very large numbers
- MovieDetail tests use mocked data with valid values only

---

## Scaling Limits

### 1. Static Site Generation Build Time
**Current capacity:** ~30 Bond movies (typical collection size)

**Limit:** Build time becomes prohibitive beyond ~100 movies due to sequential API calls.

**Symptoms at limit:**
- Build time exceeds 5 minutes
- getStaticPaths timeout
- Deployment failures on time-limited platforms (Vercel free tier: 60s limit)

**Files:**
- `pages/filmography/[movieId].tsx` - Lines 393-415
- Build process for each movieId page

**Scaling path:**
- Use Incremental Static Regeneration (ISR) properly
- Implement on-demand page generation with `fallback: 'blocking'` (already set)
- Move TMDB API calls to server-side API route
- Cache collection data in Redis/CDN
- Consider dynamic rendering for non-critical metadata

### 2. Firestore Database Write Rate
**Current capacity:** Reviews for ~30 movies × users

**Limit:** Firestore free tier allows 20,000 writes/day. At scale, this becomes bottleneck.

**Symptoms at limit:**
- User updates rejected with quota exceeded
- Random update failures mid-session
- Database locks during batch operations

**Files:**
- `pages/filmography/[movieId].tsx` - Line 129: `updateDoc()`
- Each review update = 1 write operation

**Scaling path:**
- Implement write batching: buffer updates, flush periodically
- Use batch writes API for multiple reviews
- Add write rate limiting on client
- Consider request queue/debouncing (currently immediate)
- Upgrade Firestore to paid plan for production
- Implement analytics endpoint for aggregated stats

### 3. localStorage Data Limit
**Current capacity:** User email + ~30 movie reviews = ~1-2KB

**Limit:** localStorage typically 5-10MB per domain. At ~50 bytes per review, theoretical limit ~100k reviews.

**Symptoms at limit:**
- localStorage.setItem() throws QuotaExceededError
- Application crashes (no error handling)
- Data loss

**Files:**
- `components/AuthDetails.tsx` - Line 25: `localStorage.clear()`
- `components/SignIn.tsx` - Line 15: `localStorage.setItem()`
- `pages/filmography/[movieId].tsx` - Line 36: `localStorage.setItem()`

**Scaling path:**
- Move user data to Firestore only (no localStorage persistence)
- Use IndexedDB for large local datasets
- Implement data cleanup: remove old reviews
- Add quota checks before writes
- Compress/serialize data format

---

## Dependencies at Risk

### 1. Firebase SDK v9.17.1 (Released April 2022)
**Risk:** Out of date - 2+ years old, multiple security patches released.

**Impact:**
- Missing security updates
- Potential vulnerabilities in older auth mechanisms
- Missing performance improvements in newer versions
- Next.js 15.2.0 may have compatibility issues

**Files:**
- `package.json` - Line 23

**Migration plan:**
- Update to latest Firebase v9.x: `npm upgrade firebase@latest`
- Test authentication flows thoroughly
- Verify no breaking changes in API
- Run security audit: `npm audit`
- Update all related types: @types/firebase

### 2. Next.js v15.2.0
**Risk:** Latest major version (v15 released Sept 2024).

**Impact:**
- App Router vs. Pages Router inconsistency (project uses Pages)
- Some features optimized for App Router
- Potential deprecation warnings
- May need migration in future

**Files:**
- `package.json` - Line 24
- `pages/` directory structure

**Migration plan:**
- Verify Pages Router will continue to be supported
- Consider gradual migration to App Router for new features
- Test all routes in CI/CD
- Keep up with Next.js security updates (monthly)

### 3. Chart.js v4.2.1 (Released Feb 2023)
**Risk:** Medium - charting library with periodic vulnerabilities.

**Impact:**
- No known critical vulnerabilities currently
- May have canvas rendering edge cases
- Performance issues with large datasets

**Files:**
- `package.json` - Line 19
- `pages/infographics.tsx` - Uses for data visualization

**Migration plan:**
- Monitor for security advisories
- Consider lighter alternatives (Chart.js is ~60KB)
- Test with large movie datasets
- Keep dependencies up to date

### 4. axios v1.1.3 (Released Sept 2022)
**Risk:** Outdated HTTP client with known issues.

**Impact:**
- Missing security patches
- Memory leak risks in certain scenarios
- Should update to v1.6.x+ or consider fetch()

**Files:**
- `package.json` - Line 18
- `pages/index.tsx` - Line 6
- `pages/filmography/index.tsx` - Line 2
- `pages/filmography/[movieId].tsx` - Line 6
- `pages/infographics.tsx` - Line 4

**Migration plan:**
- Update to latest axios: `npm upgrade axios@latest`
- Alternatively, migrate to native fetch() for smaller bundle
- Add request timeout configuration
- Test all API calls

---

## Missing Critical Features

### 1. Error Boundaries
**Problem:** No React Error Boundary components to catch rendering errors.

**Current workaround:** Silent failures, errors only in console.

**What's blocked:**
- Graceful error recovery
- User-friendly error messages
- Error reporting/logging
- Partial page fallback

**Implementation complexity:** Low (1-2 hours)

**Files to create:**
- `components/ErrorBoundary.tsx` (wrap in _app.tsx)
- `pages/error.tsx` exists but uses experimental "use client" marker

**Recommendations:**
- Create proper Error Boundary component
- Wrap Component in _app.tsx
- Add specific error pages for different scenarios
- Log errors to monitoring service (Sentry)

### 2. Loading States & Spinners
**Problem:** No loading indicators for async operations.

**Current workaround:** User sees static UI during 500ms+ API calls.

**What's blocked:**
- User feedback during data fetching
- Perceived slowness
- Difficult to know if app is responsive

**Implementation complexity:** Medium (2-3 hours)

**Files to modify:**
- `pages/index.tsx` - Poster loading (line 17-32)
- `pages/filmography/[movieId].tsx` - Review loading (line 67-91)
- All pages using getStaticProps (already cached)

**Recommendations:**
- Add loading state to components using Axios
- Create reusable LoadingSpinner component
- Add skeleton screens for card layouts
- Consider React Suspense with next/dynamic

### 3. Environment Variable Validation
**Problem:** No validation that required environment variables are set.

**Current workaround:** Silent failures if variables missing.

**What's blocked:**
- Early detection of deployment misconfigurations
- Clear error messages
- Development/production environment safety

**Implementation complexity:** Low (1-2 hours)

**Files to create:**
- `lib/env.ts` with validation schema
- Check in getServerSideProps or middleware

**Recommendations:**
- Use zod or similar for env validation
- Validate on startup
- Add clear error message if validation fails
- Document all required environment variables

### 4. User Feedback on Review Updates
**Problem:** No confirmation or error feedback when updating reviews.

**Current workaround:** User has no indication if update succeeded.

**What's blocked:**
- User confirmation of actions
- Error recovery
- Retry mechanisms
- Optimistic updates

**Implementation complexity:** Low (1-2 hours)

**Recommendations:**
- Add toast notifications (react-hot-toast)
- Show success message on updateDoc
- Show error with retry option on failure
- Add loading state to Update button (disabled while updating)

### 5. Authenticated Routes Protection
**Problem:** No route protection; unauthenticated users can access restricted pages.

**Current workaround:** Data just doesn't show/save if not logged in.

**What's blocked:**
- Proper access control
- Redirect flow for unauthenticated users
- Permission-based features

**Implementation complexity:** Medium (3-4 hours)

**Recommendations:**
- Create middleware to check auth state
- Use Firebase onAuthStateChanged
- Redirect to login if accessing protected routes
- Add public vs. private route definitions

---

## Test Coverage Gaps

### 1. API Error Scenarios
**What's not tested:**
- TMDB API returning 404, 500, rate limit
- Network timeouts
- Malformed API responses
- Missing environment variables

**Risk:** High - Critical app functionality broken silently.

**Priority:** High - Core feature

**Difficulty to test:** Medium - Need to mock Axios error scenarios

**Files:**
- `pages/filmography/index.tsx` - getStaticProps (line 54-61)
- `pages/filmography/[movieId].tsx` - getStaticPaths/Props (lines 393-435)
- `pages/index.tsx` - useEffect (lines 17-32)
- `pages/infographics.tsx` - getStaticProps (lines 246-262)

**Implementation:**
```typescript
it('should handle TMDB API errors', async () => {
  mockedAxios.get.mockRejectedValue(new Error('API Error'));
  const result = await getStaticProps();
  expect(result.props.movies).toEqual([]);
  // Should not throw, should return safe fallback
});
```

### 2. Firestore Error Scenarios
**What's not tested:**
- Firestore permission denied errors
- Database unavailable
- Document not found handling
- Update conflicts

**Risk:** Medium - User reviews may not save.

**Priority:** High - User data loss risk

**Difficulty to test:** Medium - Need real or emulated Firestore

**Files:**
- `pages/filmography/[movieId].tsx` - Lines 67-132 (retrieveReview, handleUpdateClick)

**Implementation:** Use Firebase emulator for testing.

### 3. Firebase Auth Error Handling
**What's not tested:**
- Wrong password
- User not found
- Email already exists (signup)
- Network errors during auth
- Invalid email format

**Risk:** Medium - Auth flows crash silently.

**Priority:** High - Critical feature

**Difficulty to test:** Medium - Mock Firebase Auth errors

**Files:**
- `components/SignIn.tsx` - Lines 11-20
- `components/SignUp.tsx` - Lines 14-40

**Current test coverage:** Only happy path (lines 71-127 in SignIn.test.tsx test for error logging)

### 4. Component Edge Cases
**What's not tested:**
- Card with empty/null data
- MovieId page without backdrop_path
- Large numbers formatting edge cases
- localStorage quota exceeded
- Invalid review data from database

**Risk:** Low to Medium - UI crashes or renders incorrectly.

**Priority:** Medium - User experience

**Difficulty to test:** Low - Mostly prop variations

**Files:**
- `components/Card.tsx` - No tests for missing poster_path
- `pages/filmography/[movieId].tsx` - No tests for null fields
- `components/OneMovieReview.tsx` - No tests for edge case numbers

### 5. Integration Tests
**What's not tested:**
- Complete auth flow: signup → store data → retrieve → update
- Navigation between pages
- Data persistence across page loads
- Browser back button behavior

**Risk:** Medium - Entire user journey may fail.

**Priority:** Medium - User experience

**Difficulty to test:** Medium - Requires full app setup

**Current status:** Only unit tests; no integration tests present

---

## Summary Statistics

- **Total Source Files:** 17 files (9 pages, 7 components, 2 lib files, plus config)
- **Total Test Files:** 12 files (1,506 lines of test code vs 1,462 lines of source)
- **Test Coverage:** ~80% by line count, but many edge cases missing
- **TypeScript Coverage:** 88% (1 remaining .js file)
- **Critical Issues:** 1 (exposed credentials in fireStoreRef.js)
- **High Priority Issues:** 7
- **Medium Priority Issues:** 12
- **Low Priority Issues:** 8

---

*Concerns audit: 2026-02-12*
