# Mamadi International Website

Corporate website for Mamadi International, covering the company profile, sectors, project portfolio, leadership, insights, careers and contact information.

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Local development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000` by default.

## Environment configuration

Copy `.env.example` to `.env.local` when a Google Maps API key is available:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

The contact map falls back to an embedded map when no key is configured.

## Production

```bash
npm run build
npm run preview
```

The production output is written to `dist/`. The deployment host must route application paths such as `/projects`, `/about` and `/contact` to `index.html`. Apache and Netlify-compatible rewrite files are included in `public/`.

## Project structure

```text
components/   React page and interface components
data/         Shared website content and contact data
public/       Static images, documents and crawler files
App.tsx       Application routing and page composition
index.tsx     React entry point
index.html    Document metadata and base markup
```

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
