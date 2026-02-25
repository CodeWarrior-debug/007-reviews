# Phase 1: Critical Security & Quick Fixes - Context

**Gathered:** 2026-02-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Remove exposed Firebase credentials from source code, fix external link security attributes, fix async anti-patterns, fix review input focus management, and surface auth errors to users. All quick wins with critical or high priority impact.

Requirements: SEC-01, SEC-03, SEC-05, DEBT-04, DEBT-05, ERR-01

</domain>

<decisions>
## Implementation Decisions

### Auth error messaging
- Generic error messages — don't expose specifics like "wrong password" or "email already in use"
- Something like "Sign in failed. Please check your credentials and try again."
- Display inline below the form, not as a toast or banner

### Credential handling approach
- Clean up `lib/fireStoreRef.js` in place — don't delete the file yet (full migration to TS is Phase 3)
- Move hardcoded Firebase config values to environment variables (`process.env.NEXT_PUBLIC_*`)
- Remove the active Firestore "cities" doc read (lines 117-125) — it's leftover example code, not used by the app
- Remove all commented-out example code blocks
- Keep the file importing from env vars for now; Phase 3 handles the full TS rename and consolidation

### Env var validation behavior
- Degraded state, not crash — app should still render when env vars are missing
- Show user-facing messages like "TMDB service unavailable" where data would normally appear
- Log clear warning to console identifying which env var is missing
- Validation runs at build time (getStaticProps) and client-side (useEffect) — both paths handle gracefully

### Claude's Discretion
- Exact wording of generic auth error messages
- Placement/styling of inline error text below forms
- How env var validation helper is structured (`lib/env.ts` or inline checks)
- Exact async/await refactoring pattern for home page useEffect
- How to separate mount vs update effects for review focus management

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. The key constraint is: don't break existing functionality, keep changes minimal and focused.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-critical-security-quick-fixes*
*Context gathered: 2026-02-12*
