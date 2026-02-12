# 007-Reviews

A Next.js (Pages Router) app for browsing James Bond movies and saving personal ratings. Uses Firebase Auth + Firestore, TMDB API, and Chart.js.

## Project Management

This project uses [GSD (Get Shit Done)](https://github.com/codeium-ai/gsd) for planning and execution. Install locally with `/gsd:update` if not present.

Planning docs live in `.planning/`. Use `/gsd:progress` to check current state or `/gsd:help` for available commands.

## Stack

- Next.js 13 (Pages Router) + TypeScript
- Firebase v9 (Auth + Firestore)
- TMDB API for movie data
- Chart.js for rating visualizations
- Tailwind CSS for styling
- Vitest + React Testing Library for tests

## Key Decisions

- Pages Router only — no App Router migration
- Fractional ratings (e.g., 8.5) are intentional
- Firebase credentials must come from `NEXT_PUBLIC_*` env vars, never hardcoded
