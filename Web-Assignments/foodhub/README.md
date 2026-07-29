# Flame & Co — Food Ordering Demo

A production-styled demo food ordering website built with **Next.js (App Router)**
and **Tailwind CSS**. Built as a front-end assignment demo — no database or
backend, everything runs on local component state (`useState`).

## Features

- Home page with an autoplay hero slider, category rail, deals section, and
  popular items grid
- Menu / collection page with **search**, **category filters**, **price
  filters**, and **rating filters**
- Product quick-view modal with quantity selector and optional add-ons
- Cart drawer (slide-in panel) with quantity controls, subtotal, delivery fee,
  and a demo checkout flow
- Login and Sign Up pages with simple client-side validation (no backend)
- Fully responsive layout (mobile, tablet, desktop)
- Animated splash/loading screen on first load + route-level loading skeleton
  on the menu page
- Icons via `lucide-react`

## Tech

- Next.js 14 (App Router, JavaScript only — no TypeScript)
- Tailwind CSS
- React Context + `useState` for cart state (no custom hooks, no external
  state library)
- Static in-memory data in `/data` (no database)

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.js         Root layout (fonts, navbar, footer, providers)
  page.js            Home page
  menu/page.js        Menu / collection page (filters + search)
  menu/loading.js      Route loading skeleton
  login/page.js       Login page
  signup/page.js      Sign up page
  not-found.js       404 page
  globals.css        Tailwind + global styles

components/
  Navbar.jsx          Site header + mobile menu
  Footer.jsx           Site footer
  HeroSlider.jsx        Autoplay hero slider
  ProductCard.jsx        Product/deal card
  ProductModal.jsx        Product quick-view modal (qty + add-ons)
  CartDrawer.jsx        Slide-in cart panel
  FilterSidebar.jsx       Category / price / rating filters
  RatingStars.jsx         Star rating display
  PageLoader.jsx         Splash loading animation
  Toast.jsx            Small toast notification
  Providers.jsx          Wraps CartProvider + global overlays

context/
  CartContext.jsx        Cart state (React Context + useState)

data/
  products.js           Product catalog
  deals.js              Combo deals, hero slides, categories
```

## Notes

- All images are pulled from Unsplash via `next/image` remote patterns —
  an internet connection is required to load them.
- This is a **front-end only** demo: login/signup and checkout simulate a
  network delay with `setTimeout` and do not persist any data.
