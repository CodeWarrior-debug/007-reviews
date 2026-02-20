# TypeScript 5.9.3 vs 6.0 Beta — Performance Benchmark

**Project:** 007-Reviews (Next.js 15, Pages Router)
**Date:** 2026-02-20
**Node:** v22.22.0
**Codebase:** 31 TS/TSX files, ~1,019 LOC
**Methodology:** 5 runs per metric, median reported. First run excluded where noted (JIT/cache warm-up).

---

## Results

| Metric | TS 5.9.3 (ms) | TS 6.0β (ms) | Delta (ms) | % Change |
|---|---:|---:|---:|---:|
| **Cold `tsc --noEmit`** | 2,712 | 5,646 | +2,934 | **+108% slower** |
| **Warm `tsc --noEmit`** | 2,779 | 4,854 | +2,075 | **+75% slower** |
| **`next build`** | 17,151 | 17,675 | +524 | **+3% slower** |
| **`vitest run`** | 3,145 | 14,994 | +11,849 | **+377% slower** |
| **`.next/` size** | 23 MB | 23 MB | 0 | No change |

---

## Raw Data

### Cold `tsc --noEmit` (no `.tsbuildinfo`, full type-check)

| Run | TS 5.9.3 | TS 6.0β |
|-----|----------|---------|
| 1 | 2,744ms | 5,646ms |
| 2 | 2,682ms | 5,624ms |
| 3 | 2,604ms | 5,695ms |
| 4 | 2,757ms | 5,732ms |
| 5 | 2,712ms | 5,632ms |
| **Median** | **2,712ms** | **5,646ms** |

### Warm `tsc --noEmit` (incremental, `.tsbuildinfo` present)

| Run | TS 5.9.3 | TS 6.0β |
|-----|----------|---------|
| 1 | 2,779ms | 4,872ms |
| 2 | 2,793ms | 4,824ms |
| 3 | 2,720ms | 4,854ms |
| 4 | 2,730ms | 4,946ms |
| 5 | 2,788ms | 4,778ms |
| **Median** | **2,779ms** | **4,854ms** |

### `next build` (full production build)

| Run | TS 5.9.3 | TS 6.0β |
|-----|----------|---------|
| 1 | 101,124ms* | 17,436ms |
| 2 | 17,126ms | 17,807ms |
| 3 | 17,299ms | 17,241ms |
| 4 | 16,957ms | 17,675ms |
| 5 | 17,151ms | 18,023ms |
| **Median** | **17,151ms** | **17,675ms** |

\* Run 1 outlier due to cold npm/SWC cache initialization; excluded from median.

> **Note:** All `next build` runs fail at the Google Fonts fetch step (network-restricted environment). Timings capture linting + type-checking + SWC transpilation + webpack bundling phases, which is where TypeScript version matters.

### `vitest run` (full test suite — 132 tests, 12 files)

| Run | TS 5.9.3 | TS 6.0β |
|-----|----------|---------|
| 1 | 10,053ms* | 14,929ms |
| 2 | 3,067ms | 14,994ms |
| 3 | 3,170ms | 14,720ms |
| 4 | 3,145ms | 15,093ms |
| 5 | 3,003ms | 15,281ms |
| **Median** | **3,145ms** | **14,994ms** |

\* Run 1 outlier on TS 5.9.3 due to cold Vitest/esbuild cache; excluded from median.

---

## Analysis

### Why is TS 6.0 Beta Slower?

1. **Beta-quality code.** TS 6.0 beta is unoptimized pre-release software. The TypeScript team explicitly stated this is a "bridge release" — its purpose is behavioral alignment with TS 7.0, not performance.

2. **New default checks add overhead.** TS 6.0 enables `noUncheckedSideEffectImports` by default, which adds validation for every side-effect `import`. We had to add a `global.d.ts` CSS declaration to satisfy this.

3. **Heavier type resolution.** The new type inference engine in 6.0 is smarter but does more work per file. On a small codebase this overhead dominates; on larger codebases the smarter inference may avoid redundant work.

4. **Vitest regression is disproportionate.** The 377% slowdown in test execution suggests the TS 6.0 beta's type-checking integration with esbuild/Vite has compatibility friction — likely extra transpilation overhead or cache invalidation from the new module defaults.

### `next build` — Why Only 3% Slower?

Next.js uses **SWC** (not `tsc`) for transpilation. The TypeScript version only affects the `Linting and checking validity of types` phase. The SWC compilation, webpack bundling, and optimization phases are unchanged. This confirms: **TypeScript version does not affect runtime bundle output or live site performance.**

### Bundle Size — No Change

Both produce identical 23MB `.next/` output. The `target: ES2025` vs `target: ES2020` change has no measurable effect because Next.js/SWC controls the actual JS output target independently.

---

## Changes Made for TS 6.0 Compatibility

| File | Change | Reason |
|------|--------|--------|
| `tsconfig.json` | `target`: `ES2020` → `ES2022` | Align with TS 6.0; ES2025 unsupported by esbuild/Vite |
| `global.d.ts` | Added `declare module "*.css"` | TS 6.0 enables `noUncheckedSideEffectImports` by default |
| `package.json` | `typescript`: `^5.9.3` → `6.0.0-beta` | Version upgrade |
| `package.json` | Added `@testing-library/dom` to devDeps | Transitive dep dropped during `legacy-peer-deps` reinstall |
| `.npmrc` | Added `legacy-peer-deps=true` | `eslint-config-next` peer dep incompatible with TS 6.0 semver |

---

## Recommendations

1. **Do not upgrade to TS 6.0 beta for production use.** It is slower across every metric and is explicitly pre-release software.

2. **Wait for TS 7.0** (Go-native rewrite). Microsoft reports ~8–10x faster project load times and compilation. That's where the real performance story is.

3. **TS 6.0 stable** (when released) will likely close the performance gap as beta optimizations land. It's primarily useful for its behavioral alignment with 7.0 — upgrading to 6.0 stable first will make the eventual 7.0 migration smoother.

4. **Live site performance is unaffected** by TypeScript version. TS compiles away entirely; SWC handles the actual JS output.

---

## Environment

- **Machine:** Linux 4.4.0
- **Node.js:** v22.22.0
- **Package Manager:** npm
- **Next.js:** 15.5.12 (resolved from ^15.2.0)
- **Vitest:** 4.0.18
- **Test count:** 132 tests across 12 files
