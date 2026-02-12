# 007-Reviews — Codebase Hardening

## What This Is

A James Bond movie review application built with Next.js, Firebase, and TMDB API. Users browse the Bond filmography, view movie details and infographics, and submit personal ratings that persist via Firestore. This milestone focuses on hardening the existing codebase: fixing security issues, eliminating tech debt, adding missing error handling, and closing test coverage gaps identified in the codebase concerns audit.

## Core Value

Users can browse Bond movies and save personal ratings reliably, without security vulnerabilities or silent failures degrading the experience.

## Requirements

### Validated

- ✓ Browse Bond filmography via TMDB collection — existing
- ✓ View individual movie details (runtime, revenue, ratings, etc.) — existing
- ✓ Submit and update personal movie ratings (0-10, fractional like 8.5 supported) — existing
- ✓ Sign up / sign in with email+password via Firebase Auth — existing
- ✓ View infographics (ratings, votes, popularity charts) — existing
- ✓ Responsive design with custom Tailwind breakpoints — existing
- ✓ Static generation with ISR for movie pages — existing

### Active

- [ ] Remove hardcoded Firebase credentials from source code
- [ ] Complete TypeScript migration (eliminate remaining .js files)
- [ ] Consolidate duplicate Firebase initialization to single source
- [ ] Surface auth errors to users instead of silent console.log
- [ ] Fix duplicate ChartJS plugin registration
- [ ] Add rel="noopener noreferrer" to external links
- [ ] Fix async anti-pattern in home page useEffect
- [ ] Fix review input focus management
- [ ] Add environment variable validation
- [ ] Add React Error Boundary
- [ ] Add HTTP security headers (CSP, X-Frame-Options, etc.)
- [ ] Add input validation before Firestore writes
- [ ] Add error scenario test coverage (API, Auth, Firestore)
- [ ] Create localStorage abstraction with typed keys
- [ ] Add loading states for async operations
- [ ] Add route protection for authenticated pages
- [ ] Update outdated dependencies (firebase, axios, chart.js)
- [ ] Add user feedback (toast) on review updates

### Out of Scope

- Scaling limits (Firestore write rate, SSG build time, localStorage quota) — acceptable for current user base
- Review validation range changes — 8.5 fractional ratings are intentional
- App Router migration — Pages Router is working fine
- New features beyond hardening — this is a quality milestone

## Context

Codebase was recently migrated from JavaScript to TypeScript with ~88% coverage. Comprehensive test suite exists (12 test files, ~80% line coverage) but lacks error scenario testing. One critical security issue: Firebase credentials hardcoded in `lib/fireStoreRef.js`. Multiple instances of duplicate Firebase initialization across components. Silent error handling throughout auth and data flows.

Codebase map available at `.planning/codebase/` with 7 documents covering stack, architecture, structure, conventions, testing, integrations, and concerns.

## Constraints

- **Tech stack**: Keep Next.js Pages Router, Firebase, TMDB API — no architectural changes
- **Backwards compatibility**: All existing features must continue working
- **Test coverage**: Existing tests must continue passing; new tests for error scenarios

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep Pages Router | Working fine, App Router migration is out of scope | — Pending |
| Fractional ratings (8.5) intentional | User confirmed this is by design | ✓ Good |
| Skip scaling limits | User doesn't care about these for current usage | ✓ Good |
| Priority: quick+critical first | User wants fast wins before longer work | — Pending |

---
*Last updated: 2026-02-12 after initialization*
