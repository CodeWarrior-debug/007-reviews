# Coding Conventions

**Analysis Date:** 2026-02-12

## Naming Patterns

### Component Naming
- **PascalCase** for component files and exports: `Navbar.tsx`, `Card.tsx`, `SignUp.tsx`, `AuthDetails.tsx`, `OneMovieReview.tsx`, `SignIn.tsx`, `Footer.tsx`
- **Default exports** used for all components with `export default Component`
- Interface names use PascalCase: `CardProps`, `MovieFacts`, `MovieIdProps`, `OneMovieReviewProps`

### Function & Variable Naming
- **camelCase** for functions and variables: `getPoster()`, `signUp()`, `signIn()`, `userSignOut()`, `dateStringToDate()`, `retrieveReview()`, `handleViewClick()`, `handleUpdateClick()`
- **State variables** use descriptive camelCase: `isLoggedIn`, `posterDisplayLabel`, `review`, `myDatas`, `posterOnly`, `userData`
- **Constants** use camelCase: `montserrat`, `redhatdisplay`, `plusjakartasans`, `baseURL`
- **Event handlers** prefixed with `handle`: `handleViewClick()`, `handleUpdateClick()`
- **Fetch functions** prefixed with verb: `getPoster()`, `retrieveReview()`, `getOneDoc()`

### Boolean Variables
- Prefixed with `is` or simple names: `isLoggedIn`, `exists`

### Utility Functions
- Descriptive names with action verbs: `dateStringToDate()`, `updateOneReview()`, `setUpUser()`, `getGradient()`

## Code Style

### File Organization
- **Imports** at the top of file, grouped logically:
  1. React/Next imports first (`import React`, `import { useEffect, useState }`)
  2. Next.js specific (`import Link from "next/link"`, `import Head from "next/head"`, `import Image from "next/image"`)
  3. Font imports (`import { Montserrat } from "next/font/google"`)
  4. Third-party libraries (`import Axios from "axios"`, `import cls from "classnames"`)
  5. Local imports (`import Navbar from "../components/Navbar"`)
  6. Utility/Firebase imports (`import { auth, firebaseConfig } from "../lib/db"`)
- **CSS imports** mixed with component imports, not strictly separated

### Spacing & Formatting
- **Indentation**: 2 spaces (inferred from code)
- **Line length**: Long ternaries and conditionals allowed to wrap (see `[movieId].tsx` lines with className attributes)
- **Semicolons**: Used consistently at end of statements
- **Quotes**: Double quotes for strings consistently used
- **Trailing commas**: Present in multi-line object/array definitions

### Import Style
- **Named imports** used for utilities: `import { useEffect, useState }`, `import { format } from "date-fns"`
- **Default imports** used for components and libraries: `import Link from "next/link"`, `import Navbar from "../components/Navbar"`
- **Mixed imports** used when needed: `import type { GetStaticPaths, GetStaticProps } from "next"`

### Conditional Rendering
- **Ternary operators** for simple conditionals: `{isLoggedIn ? "" : <div>...</div>}`
- **Short-circuit evaluation** for display logic: `{poster && (<Image ... />)}`
- **Multi-line JSX** wrapped in parentheses when complex

## Error Handling

### Try-Catch Patterns
- **Async/await with try-catch**: Used in `retrieveReview()`, `getOneDoc()` functions
- **Graceful fallbacks**: Return default values on error:
  - `dateStringToDate()` returns "Unknown" on parse failure
  - Returns `dateString` as fallback if parsing fails

### Promise Chains vs Async-Await
- **Promise.then().catch()** pattern common throughout:
  - `signUp()` in `/home/user/007-reviews/components/SignUp.tsx` uses `.then().catch()`
  - `signIn()` in `/home/user/007-reviews/components/SignIn.tsx` uses `.then().catch()`
  - API calls use `.then().catch()`: `Axios.get().then().catch()`
- **Async-await** used in functions like `retrieveReview()`, `handleViewClick()`, `handleUpdateClick()` with `.then().catch()` chains inside

### Console Logging
- **Debug logging**: `console.log()` used for errors and state: `console.log(error)`, `console.log("sign out successful")`
- **No structured error reporting**: Console logging is primary error handling mechanism

### Validation
- **Input validation** before operations: `if (!docID) return;`, `if (!reviewRef.current) return;`
- **Null/undefined checks** scattered: `movieFacts.homepage ? movieFacts.homepage : "#"`
- **Range validation**: In `[movieId].tsx`, review validation checks `reviewNumber > 10 || reviewNumber < 0`
- **Dialog-based user feedback**: Invalid reviews trigger dialog modal with timed auto-close

## Logging

### Logging Approach
- **Console.log for errors**: Primary logging method
  - `console.log(error)` in catch blocks
  - `console.log("error: ", err)` in API error handlers
  - `console.log("sign out successful")` for successful operations
  - `console.log("Document does not exist")` for state checks

### No Structured Logging
- No logger library used (winston, pino, etc.)
- No log levels (debug, info, warn, error) differentiation
- All logging to console with string concatenation

## Comments

### Comment Style
- **Minimal inline comments** - code is mostly self-documenting
- **No JSDoc** comments used on functions or components
- **Functional comments**: When present, describe "why" not "what"
- Example: `// Expected to fail` in test error handling

### Documentation Approach
- Code clarity through naming conventions preferred over comments
- Component structure clear from JSX layout and prop interfaces

## Function Design

### Component Functions
- **Functional components** exclusively used (no class components)
- **React.FC type** used: `const SignUp: React.FC = () => {...}`
- **Props interfaces** defined above component: `interface CardProps { ... }`
- **Props destructuring** in function parameters: `({ movieFacts }: MovieIdProps)`

### Function Complexity
- **Side effects managed with useEffect**:
  - Dependency arrays documented: `useEffect(() => {...}, [isLoggedIn])`
  - Cleanup functions returned: `return () => { listen(); }`
- **Custom event handlers**: Named with `handle` prefix, accept events
- **Async operations**: Chained promises or async-await inside useEffect

### Utility Functions
- **Exported inline** within components or as standalone functions
- **Pure functions** for data transformation: `dateStringToDate()`, `getGradient()`
- **Side-effect functions** for Firebase: `retrieveReview()`, `userSignOut()`, `updateOneReview()`

### Return Patterns
- **Early returns** for validation: `if (!docID) return;`
- **Optional returns** in conditionals: `if (!chartArea) { return; }`
- **Fragment wrapping**: Components wrapped in `<> </>` to avoid div containers

## Module Design

### File Structure
- **Components**: `components/` directory contains stateful and presentational components
- **Pages**: `pages/` directory follows Next.js convention with dynamic routes using `[movieId].tsx`
- **Tests**: `__tests__/` directory mirrors source structure with `components/` and `pages/` subdirectories
- **Library**: `lib/` directory for configuration and utilities (`lib/db.ts` for Firebase config)

### Export Style
- **Default exports** used exclusively for components
- **Named exports** for utility functions in tests: `export const getStaticPaths`, `export const getStaticProps`
- **Type exports** using `type` keyword: `import type { GetStaticPaths, GetStaticProps } from "next"`

### Dependencies
- **Next.js fonts**: Google Fonts loaded through `next/font/google`
- **Styling**: Tailwind CSS for utility classes, classnames (`cls`) for conditional classes
- **Charts**: Chart.js with react-chartjs-2 for data visualization
- **Firebase**: For authentication and Firestore data persistence
- **API Integration**: Axios for TMDB API calls

### State Management
- **React hooks only**: useState, useEffect, useRef
- **No Redux or Context API** used (except implicit Next.js app context)
- **Local component state** for UI state: `isLoggedIn`, `review`, `posterOnly`
- **LocalStorage** for persistence: `localStorage.setItem("userEmail", email)`, `localStorage.getItem("userEmail")`

---
*Convention analysis: 2026-02-12*
