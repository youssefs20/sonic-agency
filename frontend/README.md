# Sonic Agency — Frontend

Marketing website for Sonic, a digital marketing agency. This is the
frontend: a Next.js (App Router, TypeScript, Tailwind CSS) single-page
site with light/dark mode, a contact form, lightweight analytics, and a
branded loading animation.

The Go API and PostgreSQL database live in the sibling `../backend`
directory.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To exercise the contact form and analytics against the real API, start
the backend (see `../backend`) and set the API URL:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Project structure

```
app/                 Routes, root layout, global styles, favicons
components/
  layout/            Header, Footer, LoadingScreen
  sections/          Hero, About, Services, Portfolio, Testimonials, Contact
  ui/                Button, SectionTitle, ThemeToggle
  AnalyticsTracker   Fires a page_view on load
lib/
  api.ts             All calls to the Go backend
  analytics.ts       Tracking helper (page views, clicks, form submits)
public/assets/       Brand logo and imagery
```

## Build

```bash
npm run build
npm run start
```
