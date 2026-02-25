# Codebase Structure
**Analysis Date:** 2026-02-12

## Directory Layout

```
/home/user/007-reviews/
├── .claude/                          # Claude AI configuration and tools
├── .git/                             # Git version control
├── .planning/                        # Planning and documentation
│   └── codebase/                     # This documentation
├── .vscode/                          # VS Code settings
├── __tests__/                        # Test suite mirror
│   ├── components/                   # Component tests
│   ├── lib/                          # Library tests
│   └── pages/                        # Page tests
├── assets/                           # Static assets and tools
│   ├── testreviews.js                # Test data utility
│   └── thunder-tests/                # Thunder Client API testing configs
├── components/                       # Reusable React components
├── lib/                              # Business logic and utilities
├── pages/                            # Next.js page routes
│   ├── filmography/                  # Movie collection routes
│   ├── 404.tsx                       # 404 error page
│   ├── 500.tsx                       # 500 error page
│   ├── _app.tsx                      # Application wrapper
│   ├── error.tsx                     # Error boundary
│   ├── index.tsx                     # Homepage
│   ├── infographics.tsx              # Analytics dashboard
│   └── login.tsx                     # Authentication page
├── public/                           # Static public assets
│   └── favicon/                      # Favicon files
├── styles/                           # Global CSS
├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore patterns
├── .nvmrc                            # Node version specification
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies and scripts
├── package-lock.json                 # Lock file for dependencies
├── postcss.config.js                 # PostCSS configuration
├── README.md                         # Project documentation
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── vitest.config.js                  # Vitest configuration
└── vitest.setup.js                   # Vitest setup file
```

## Directory Purposes

### `/components` - Reusable UI Components
**7 component files**, each representing a distinct UI piece:

- `Navbar.tsx` - Main navigation with links to HOME, CINEMATOGRAPHY, INFOGRAPHICS, SIGN IN/OUT
- `Footer.tsx` - Footer component (used on all pages)
- `Card.tsx` - Movie card with poster, title, overview, release date, rating
- `OneMovieReview.tsx` - Bar chart comparing user review vs TMDB rating
- `SignIn.tsx` - Email/password login form
- `SignUp.tsx` - Email/password registration form
- `AuthDetails.tsx` - Shows current user email and sign-out button

**Key Characteristics:**
- Pure functional components with TypeScript interfaces
- Styled with Tailwind CSS
- Reusable and composable
- Props-based configuration
- No direct API calls (except SignIn/SignUp which call Firebase Auth)

### `/lib` - Business Logic & Data Layer
**Core application logic and external service integrations:**

- `db.ts` - Firebase initialization, exports db, auth, provider instances
- `context.ts` - React Context for authentication state (AuthContext)
- `data.ts` - Mock analytics data for chart visualization
- `fireStoreRef.js` - Additional Firebase references (if needed)

**Key Characteristics:**
- Service abstractions and configurations
- Type definitions and interfaces
- Central point for external service access
- Reusable across entire application

### `/pages` - Next.js Routes
**10 route files** following Next.js file-based routing:

**Main Routes:**
- `index.tsx` - `/` (homepage with collection poster)
- `login.tsx` - `/login` (authentication page)
- `filmography/index.tsx` - `/filmography` (movie grid)
- `filmography/[movieId].tsx` - `/filmography/:id` (movie detail page)
- `infographics.tsx` - `/infographics` (analytics dashboard)

**Error Handling:**
- `404.tsx` - `/404` (404 Not Found)
- `500.tsx` - `/500` (500 Server Error)
- `error.tsx` - Error boundary page

**Special:**
- `_app.tsx` - Application wrapper (global context, styles, analytics)

**Key Characteristics:**
- SSG (Static Site Generation) with ISR (revalidate: 3600)
- getStaticProps for data fetching at build time
- getStaticPaths for dynamic route generation
- Component composition within pages
- TypeScript prop interfaces

### `/__tests__` - Test Suite
**13 test files** organized to mirror source structure:

**Component Tests:**
- `components/Navbar.test.tsx` - Navigation link tests
- `components/Card.test.tsx` - Movie card rendering
- `components/SignIn.test.tsx` - Login form interaction
- `components/SignUp.test.tsx` - Registration form
- `components/OneMovieReview.test.tsx` - Chart rendering
- `components/AuthDetails.test.tsx` - Auth status display
- `components/Footer.test.tsx` - Footer rendering

**Library Tests:**
- `lib/context.test.tsx` - React Context tests
- `lib/data.test.ts` - Data utility tests

**Page Tests:**
- `pages/Home.test.tsx` - Homepage rendering
- `pages/Filmography.test.tsx` - Movie grid
- `pages/MovieDetail.test.tsx` - Movie detail page
- `pages/Infographics.test.tsx` - Analytics dashboard

**Key Characteristics:**
- Vitest + React Testing Library
- Mock Next.js modules (next/link, next/font, next/image)
- Focus on component behavior, not implementation
- localStorage mocking for auth tests
- Setup in vitest.config.js with jsdom environment

### `/styles` - Global Styling
**Single CSS file** with Tailwind directives:

- `globals.css` - Global styles, custom CSS layers, dialog styling, golden gradient

**Key Characteristics:**
- Tailwind directives (@tailwind, @layer)
- Custom dialog styling with backdrop
- Golden radial gradient utility class
- Imported in `_app.tsx` for global scope

### `/public` - Static Assets
**Favicon and static files:**
- `favicon/` - favicon.ico and related files
- Served directly by Next.js

### `/assets` - Development Tools & Test Data
- `testreviews.js` - Test data utility script
- `thunder-tests/` - Thunder Client API collection and environment files
  - `thunderActivity.json` - Thunder Client activity log
  - `thunderclient.json` - API request configurations
  - `thunderEnvironment.json` - Environment variables for testing
  - `thunderCollection.json` - Request collection

### Configuration Files (Root)

**Build & Runtime:**
- `next.config.js` - Next.js config (remote image patterns)
- `package.json` - Dependencies and npm scripts
- `package-lock.json` - Locked dependency versions

**Development Tools:**
- `tsconfig.json` - TypeScript compiler options
- `.eslintrc.json` - ESLint rules configuration
- `vitest.config.js` - Vitest configuration
- `vitest.setup.js` - Vitest setup (testing library matchers)
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.js` - Tailwind CSS configuration

**Git & Environment:**
- `.gitignore` - Git ignore patterns
- `.nvmrc` - Node.js version (specified in file)
- `.vscode/settings.json` - VS Code workspace settings

**Documentation:**
- `README.md` - Project overview and usage

## Key File Locations

### Entry Points:
- **Application Root:** `/home/user/007-reviews/pages/_app.tsx`
- **Homepage:** `/home/user/007-reviews/pages/index.tsx`
- **Authentication:** `/home/user/007-reviews/pages/login.tsx`
- **Main Feature:** `/home/user/007-reviews/pages/filmography/index.tsx`
- **Analytics:** `/home/user/007-reviews/pages/infographics.tsx`

### Shared Services:
- **Firebase Config:** `/home/user/007-reviews/lib/db.ts`
- **Auth Context:** `/home/user/007-reviews/lib/context.ts`
- **Mock Data:** `/home/user/007-reviews/lib/data.ts`

### Styling:
- **Global CSS:** `/home/user/007-reviews/styles/globals.css`
- **Tailwind Config:** `/home/user/007-reviews/tailwind.config.js`

### Configuration:
- **Next.js:** `/home/user/007-reviews/next.config.js`
- **TypeScript:** `/home/user/007-reviews/tsconfig.json`
- **Testing:** `/home/user/007-reviews/vitest.config.js`
- **Dependencies:** `/home/user/007-reviews/package.json`

### Navigation Component:
- **Navbar:** `/home/user/007-reviews/components/Navbar.tsx`
- **Footer:** `/home/user/007-reviews/components/Footer.tsx`

### Authentication Components:
- **Sign In Form:** `/home/user/007-reviews/components/SignIn.tsx`
- **Sign Up Form:** `/home/user/007-reviews/components/SignUp.tsx`
- **Auth Status:** `/home/user/007-reviews/components/AuthDetails.tsx`

### Movie Display Components:
- **Movie Card:** `/home/user/007-reviews/components/Card.tsx`
- **Review Chart:** `/home/user/007-reviews/components/OneMovieReview.tsx`

## Naming Conventions

### Component Files:
- **PascalCase** - All component files (e.g., `Navbar.tsx`, `Card.tsx`, `OneMovieReview.tsx`)
- **Exported as default** - Components exported as named defaults
- **Props interfaces** - Named as `{ComponentName}Props` (e.g., `CardProps`, `MovieIdProps`)

### Page Files:
- **index.tsx** - Route parent (maps to `/` or `/path/`)
- **[param].tsx** - Dynamic routes (maps to `/path/:param`)
- **_app.tsx** - Special Next.js app wrapper
- **error.tsx** - Error boundary page

### Function Names:
- **camelCase** - All utility functions and handlers
- **Event Handlers** - Prefixed with `handle` (e.g., `handleViewClick`, `handleUpdateClick`)
- **Data Fetchers** - Prefixed with `get` or `fetch` (e.g., `getStaticProps`, `getGradient`)

### Variable Names:
- **camelCase** - All variables and constants
- **UPPER_SNAKE_CASE** - Environment variables (e.g., `NEXT_PUBLIC_TMDB_API_KEY`)
- **Descriptive names** - Variables describe their purpose (e.g., `posterDisplayLabel`, `movieFacts`)

### Type/Interface Names:
- **PascalCase** - All type and interface definitions
- **Descriptive names** - Include context (e.g., `MovieFacts`, `FilmographyProps`, `UserDataEntry`)
- **Context suffixes** - Auth context named `AuthContext`

### File Organization:
- **Barrel exports** - Not used (direct imports from files)
- **Test files** - Mirror source structure with `.test.tsx` suffix
- **Feature grouping** - Organized by domain (components, lib, pages)

### CSS Classes:
- **Tailwind utility classes** - Primary styling method
- **Custom classes** - kebab-case (e.g., `.golden-bg`)
- **Custom breakpoints** - mvID1-4 (movie ID breakpoints for responsive design)

### API & Data:
- **PascalCase** - API response types (e.g., `Movie`, `MovieFacts`)
- **camelCase** - Response field names from TMDB API
- **User data** - Keyed by email in Firestore; movie IDs converted to words

## Where to Add New Code

### Adding a New Page:
1. Create file in `/home/user/007-reviews/pages/` with `.tsx` extension
2. Use PascalCase filename for page components
3. Import Navbar and Footer for consistency
4. Add getStaticProps or getStaticPaths if data fetching needed
5. Export default page component
6. Navbar automatically links if route is main section

### Adding a New Component:
1. Create file in `/home/user/007-reviews/components/` with PascalCase name
2. Define TypeScript interface for props (suffix: `Props`)
3. Create functional component with React.FC<Props> type
4. Style with Tailwind CSS classes
5. Export as default
6. Add corresponding test file in `/__tests__/components/`

### Adding Business Logic:
1. Add new functions to `/home/user/007-reviews/lib/`
2. Export functions and types
3. Import in pages or components as needed
4. Add tests in `/__tests__/lib/`

### Adding Styling:
1. **Component Styles** - Use Tailwind classes directly in components
2. **Global Styles** - Add to `/home/user/007-reviews/styles/globals.css` with @layer
3. **Custom Classes** - Define in globals.css with kebab-case naming
4. **Responsive** - Use custom breakpoints (mvID1-4) from tailwind.config.js

### Adding Tests:
1. Create `.test.tsx` file in `/__tests__/` mirroring source structure
2. Use Vitest describe/it syntax
3. Mock Next.js modules as needed
4. Import component and test with React Testing Library
5. Focus on behavior, not implementation

### Adding API Integration:
1. Create fetcher function in `/home/user/007-reviews/lib/`
2. Use Axios for HTTP requests
3. Add error handling with try-catch or .catch()
4. Call in getStaticProps/getServerSideProps for pages
5. Manage environment variables with NEXT_PUBLIC_* prefix

### Adding Authentication Feature:
1. Extend `AuthContext` in `/home/user/007-reviews/lib/context.ts` if global state needed
2. Use Firebase Auth methods from `lib/db.ts`
3. Check localStorage for "userEmail" in components
4. Update AuthDetails or create new auth component
5. Add conditional rendering based on isLoggedIn state

## Special Directories

### `/.claude/` - Claude AI Tools
- Integration with Claude AI development environment
- Get-Shit-Done (GSD) templates and configurations
- Hooks for status line and update checking
- Not part of application code

### `/.planning/codebase/` - Documentation
- Architecture and structure documentation
- Planning notes and decisions
- Analysis and design documents

### `/assets/thunder-tests/` - API Testing
- Thunder Client configurations for API endpoints
- Test collections for TMDB and Firebase endpoints
- Environment files for testing
- Development tool, not shipped with application

### `/public/` - Static Assets Served by Next.js
- Favicon and related icon files
- Directly accessible at `/favicon/*`
- Pre-optimized and never cached invalidated

---
*Structure analysis: 2026-02-12*
