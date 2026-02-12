# Roadmap: 007-Reviews Codebase Hardening

## Overview

This milestone hardens the existing 007-Reviews codebase by addressing security vulnerabilities (especially exposed Firebase credentials), eliminating technical debt, adding comprehensive error handling, and closing test coverage gaps. The roadmap prioritizes quick wins with critical/high impact first, followed by foundational improvements and comprehensive testing.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Critical Security & Quick Fixes** - Remove exposed credentials and fix immediate security/UX issues
- [ ] **Phase 2: User Experience & Validation** - Add user feedback, validation, and loading states
- [ ] **Phase 3: Foundation Consolidation** - Migrate to TypeScript, consolidate Firebase, abstract storage
- [ ] **Phase 4: Error Resilience** - Add error boundaries and HTTP security headers
- [ ] **Phase 5: Test Coverage** - Comprehensive error scenario testing for all integrations
- [ ] **Phase 6: Dependencies** - Update outdated dependencies to latest stable versions

## Phase Details

### Phase 1: Critical Security & Quick Fixes
**Goal**: Eliminate critical security vulnerability and fix immediate code quality issues
**Depends on**: Nothing (first phase)
**Requirements**: SEC-01, SEC-03, SEC-05, DEBT-04, DEBT-05, ERR-01
**Success Criteria** (what must be TRUE):
  1. Firebase credentials no longer visible in source code, loaded from environment variables
  2. Application validates all required environment variables at startup with clear error messages
  3. All external links in Footer component include rel="noopener noreferrer" attribute
  4. Home page poster fetch uses proper async/await pattern without anti-patterns
  5. Review input focus management works correctly without focusing on every state update
  6. Auth errors (sign in/sign up failures) display user-friendly messages instead of silent console logging
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 2: User Experience & Validation
**Goal**: Add user feedback mechanisms, input validation, and essential UX improvements
**Depends on**: Phase 1
**Requirements**: SEC-04, ERR-03, UX-01, UX-02, DEBT-03
**Success Criteria** (what must be TRUE):
  1. Review input validates for NaN/Infinity before Firestore writes, preventing invalid data
  2. User sees toast notification on review update success or failure
  3. Loading indicators appear during async operations (poster fetch, review operations)
  4. Unauthenticated users are redirected from authenticated-only actions
  5. ChartJS plugin registered only once in application lifecycle
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 3: Foundation Consolidation
**Goal**: Complete TypeScript migration and consolidate core infrastructure
**Depends on**: Phase 2
**Requirements**: DEBT-01, DEBT-02, QUAL-01
**Success Criteria** (what must be TRUE):
  1. All JavaScript files migrated to TypeScript with proper type safety
  2. Firebase initialized in exactly one location (lib/db.ts), no component re-initialization
  3. localStorage access abstracted through typed interface with error handling
  4. Dead commented code removed from codebase
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 4: Error Resilience
**Goal**: Add architectural error handling and HTTP security hardening
**Depends on**: Phase 3
**Requirements**: SEC-02, ERR-02
**Success Criteria** (what must be TRUE):
  1. React Error Boundary catches and displays render errors gracefully
  2. HTTP security headers configured (X-Frame-Options, X-Content-Type-Options, CSP, HSTS)
  3. Users see friendly error page instead of blank screen when React errors occur
  4. Application protected from clickjacking and MIME-type sniffing attacks
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 5: Test Coverage
**Goal**: Comprehensive error scenario testing for all external integrations
**Depends on**: Phase 4
**Requirements**: QUAL-02, QUAL-03, QUAL-04
**Success Criteria** (what must be TRUE):
  1. Test suite covers TMDB API error scenarios (404, 500, timeout, malformed responses)
  2. Test suite covers Firebase Auth error scenarios (wrong password, user not found, network errors)
  3. Test suite covers Firestore error scenarios (permission denied, unavailable, document not found)
  4. All error scenarios have documented expected behavior
  5. Test coverage remains above 80% line coverage after additions
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 6: Dependencies
**Goal**: Update all outdated dependencies to latest stable versions
**Depends on**: Phase 5
**Requirements**: DEP-01
**Success Criteria** (what must be TRUE):
  1. Firebase SDK updated to latest v9.x stable version
  2. Axios updated to latest stable version
  3. Chart.js updated to latest stable version
  4. All tests pass after dependency updates
  5. npm audit shows no high or critical vulnerabilities
**Plans**: TBD

Plans:
- [ ] TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Critical Security & Quick Fixes | 0/TBD | Not started | - |
| 2. User Experience & Validation | 0/TBD | Not started | - |
| 3. Foundation Consolidation | 0/TBD | Not started | - |
| 4. Error Resilience | 0/TBD | Not started | - |
| 5. Test Coverage | 0/TBD | Not started | - |
| 6. Dependencies | 0/TBD | Not started | - |
