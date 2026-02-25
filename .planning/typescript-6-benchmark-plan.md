# TypeScript 6.0 Performance Benchmark Plan

## Current State
- **TypeScript:** 5.9.3 (stable)
- **Next.js:** 15.2.0 (SWC-based transpilation)
- **tsconfig target:** ES2020, strict mode, incremental builds
- **Codebase:** 31 TS/TSX files, ~1,019 LOC
- **Node:** >=20.x

## What TypeScript 6.0 Beta Brings
TS 6.0 (released Feb 11, 2026 as beta) is a **bridge release** — the last JS-based compiler before TS 7.0 (Go-native, ~10x faster). Realistic gains for 6.0:

- **`types` defaults to `[]`** — eliminates unnecessary `@types` scanning (20–50% build improvement on larger projects)
- **`target` moves to `es2025`** — less downleveling, potentially smaller output
- **`module` defaults to `esnext`** — already our setting, no change
- **`strict` defaults to `true`** — already our setting, no change
- **Smarter type inference** — fewer type errors, marginal perf benefit

### Honest Assessment
- This is a ~1K LOC project. Compile-time deltas will be small in absolute terms (seconds, not minutes). The benchmark is still useful as a **methodology** and to validate the claimed improvements.
- TypeScript does NOT affect runtime performance — it compiles away entirely. SWC handles the actual JS transpilation for Next.js. "Live site" differences would come from the `target` change (ES2025 vs ES2020 = less polyfilling = marginally smaller bundles).

---

## Benchmark Plan

### Phase 1: Baseline Measurements (TS 5.9.3)

Create a benchmark script that captures:

#### A. Compile-Time Metrics
1. **Cold `tsc --noEmit`** — full type-check from scratch (delete `.tsbuildinfo` first)
2. **Warm `tsc --noEmit`** — incremental type-check (with `.tsbuildinfo`)
3. **`next build`** — full production build (includes SWC transpilation + type-checking)
4. **`next dev` startup** — time to "ready" message
5. Run each measurement **5 times**, record median

#### B. Bundle / Output Metrics
1. **Total build output size** (`.next/` directory)
2. **JS bundle sizes** from `next build` output (First Load JS)
3. **Page-level sizes** from build output

#### C. Dev Experience Metrics (optional, manual)
1. Editor responsiveness (hard to automate, note qualitatively)

### Phase 2: Upgrade to TypeScript 6.0 Beta

1. `npm install typescript@beta` (installs 6.0 beta)
2. Update `tsconfig.json` to align with TS 6.0 defaults:
   - `target`: `ES2020` → `ES2025`
   - Keep explicit `strict: true`, `module: esnext` (already aligned)
   - Note any new deprecation warnings
3. Fix any type errors or breaking changes introduced by TS 6.0
4. Document all changes made

### Phase 3: Post-Upgrade Measurements (TS 6.0)

Re-run the exact same benchmarks from Phase 1:
- Cold tsc, warm tsc, next build, next dev startup (5 runs each, median)
- Bundle sizes
- Record any new warnings or deprecations

### Phase 4: Results & Analysis

Generate a comparison report:

```
| Metric                  | TS 5.9.3  | TS 6.0β   | Delta   | % Change |
|-------------------------|-----------|-----------|---------|----------|
| Cold tsc --noEmit       |           |           |         |          |
| Warm tsc --noEmit       |           |           |         |          |
| next build (total)      |           |           |         |          |
| next dev startup        |           |           |         |          |
| First Load JS (bytes)   |           |           |         |          |
| .next/ total size       |           |           |         |          |
```

---

## Deliverables

1. **`scripts/benchmark.sh`** — automated benchmark runner (runs measurements, outputs CSV/table)
2. **`BENCHMARK_RESULTS.md`** — comparison table with analysis
3. **Branch with TS 6.0 upgrade** — all changes on feature branch

## Risks & Caveats

- **Small codebase** — absolute time differences will be small; percentage differences are more meaningful
- **Beta software** — TS 6.0 beta may have bugs; `next build` compatibility not guaranteed
- **SWC decoupling** — Next.js uses SWC for transpilation, not `tsc`. Compile-time gains from TS 6.0 only affect type-checking, not the actual build transpilation step
- **No runtime impact** — TypeScript compiles away; "live site" speed is identical unless bundle sizes change from the target shift
