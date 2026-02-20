#!/usr/bin/env bash
# TypeScript Performance Benchmark Script
# Measures: cold tsc, warm tsc, next build, vitest run, bundle size
# Usage: ./scripts/benchmark.sh [runs=5]
set -uo pipefail

RUNS=${1:-5}
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

RAW_OUTPUT="scripts/benchmark-raw.csv"

echo "=== TypeScript Performance Benchmark ==="
echo "TypeScript version: $(npx tsc --version)"
echo "Node version: $(node --version)"
echo "Runs per measurement: $RUNS"
echo ""

# Helper: run a command N times, collect durations, report median
bench() {
  local label="$1"
  shift
  local times=()

  for i in $(seq 1 "$RUNS"); do
    local start end duration
    start=$(date +%s%N)
    eval "$@" > /dev/null 2>&1 || true
    end=$(date +%s%N)
    duration=$(( (end - start) / 1000000 ))
    times+=("$duration")
    echo "  Run $i: ${duration}ms"
  done

  IFS=$'\n' sorted=($(sort -n <<<"${times[*]}")); unset IFS
  local mid=$(( RUNS / 2 ))
  local median="${sorted[$mid]}"
  echo "  >> Median: ${median}ms"
  echo "$label,$median" >> "$RAW_OUTPUT"
  echo ""
}

echo "metric,median_ms" > "$RAW_OUTPUT"

# 1. Cold tsc --noEmit
echo "[1/5] Cold tsc --noEmit (full type-check, no incremental cache)"
bench "cold_tsc" "rm -f tsconfig.tsbuildinfo && npx tsc --noEmit"

# 2. Warm tsc --noEmit (incremental)
echo "[2/5] Warm tsc --noEmit (incremental)"
npx tsc --noEmit > /dev/null 2>&1 || true
bench "warm_tsc" "npx tsc --noEmit"

# 3. next build
echo "[3/5] next build (production build)"
bench "next_build" "rm -rf .next && npx next build"

# 4. vitest run (test suite)
echo "[4/5] vitest run (full test suite)"
bench "vitest_run" "npx vitest run"

# 5. Bundle size
echo "[5/5] Capturing bundle size..."
rm -rf .next && npx next build > /dev/null 2>&1 || true
next_size=$(du -sh .next 2>/dev/null | cut -f1 || echo "N/A")
echo "  .next/ total size: $next_size"
echo "next_dir_size,$next_size" >> "$RAW_OUTPUT"

echo ""
echo "=== Benchmark Complete ==="
echo "Raw data: $RAW_OUTPUT"
