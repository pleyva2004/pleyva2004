# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Principles

**SIMPLICITY FIRST:**
- ALWAYS prioritize minimal code changes
- Prefer editing existing files over creating new ones
- Keep implementations simple and focused
- Avoid unnecessary complexity or abstraction

**TESTING WITH PUPPETEER:**
- Use Puppeteer for automated testing and validation
- Take screenshots to verify visual functionality
- Test responsive behavior across different screen sizes
- Validate interactive elements and user flows

## Development Commands

This is a React + TypeScript portfolio website built with Vite and deployed to GitHub Pages.

**Common Commands:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compiler + Vite build)
- `npm run lint` - Run ESLint with TypeScript support
- `npm run test` - Run Puppeteer tests (if available)
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages (runs predeploy + gh-pages)

**Testing Process:**
- Use Puppeteer to automate browser interactions
- Take screenshots for visual validation
- Test mobile and desktop responsive layouts
- Verify all interactive components work correctly

## Architecture Overview

**Tech Stack:**
- React 18 with TypeScript
- Vite for build tooling and dev server
- Tailwind CSS with custom dark theme colors
- Framer Motion for animations
- Lucide React for icons
- ESLint for code quality
- Puppeteer for end-to-end testing

**Project Structure:**
- `src/App.tsx` - Main app component with layout (Sidebar, Header, Hero, Timeline, Contact)
- `src/components/` - React components for different sections
- `src/data/timeline.ts` - Timeline data with TypeScript interfaces
- `public/` - Static assets including profile photos
- `dist/` - Build output directory (deployed to GitHub Pages)
- `tests/` - Puppeteer tests and screenshots

## Key Files to Understand

- `src/data/timeline.ts` - Contains professional experience data and TypeScript interfaces
- `src/components/Timeline.tsx` - Complex responsive timeline layout
- `tailwind.config.js` - Custom dark theme color definitions
- `vite.config.ts` - Build configuration with base path for GitHub Pages