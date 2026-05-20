# MediQueue — Tutor Booking System

**Live site:** [https://mediqueue-tutor-booking-system.vercel.app/](https://mediqueue-tutor-booking-system.vercel.app/)

MediQueue is a full-stack tutor booking web application. Students can register, browse tutors, book learning sessions, and manage bookings. Tutors can list profiles with availability, slot limits, and session dates. The platform uses digital session management with real-time slot tracking.

---

## Features

- **User authentication** — Email/password registration and login, plus Google sign-in (Better Auth + MongoDB).
- **Tutor discovery** — Public home page with carousel, featured tutors, and a searchable tutors directory with case-insensitive name search (`$regex`) and registration date filtering (`$gte` / `$lte`).
- **Session booking** — Book sessions from tutor detail pages; slots decrease automatically on booking and restore when a booking is cancelled.
- **Dashboards** — **My Tutors** (create, edit, delete your listings) and **My Booked Sessions** (view and cancel your bookings in a table layout).
- **Modern UX** — Dark/light theme toggle, toast notifications, loading states, protected routes, smooth page animations (Framer Motion), and Flowbite UI components.
- **Responsive design** — Works on mobile, tablet, and desktop with a consistent MediQueue brand style.

---

## Tech stack

| Layer | Technologies |
|--------|----------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, HeroUI, Flowbite React, Framer Motion |
| Auth | Better Auth |
| Backend API | Express.js, MongoDB (separate server repo) |
| Deployment | Vercel (client) |

---

## Run locally

### Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)
- Express API running (default: `http://localhost:8000`)

### 1. Clone and install (client)

```bash
cd mediqueue_tutor_booking_system
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
BETTER_AUTH_SECRET=your-long-random-secret
MONGODB_URI=your-mongodb-connection-string

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_CLIENT_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_BASE_URL=http://localhost:8000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Start the API server

In the `mediqueue_server` folder:

```bash
npm install
node index.js
```

### 4. Start the Next.js app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Production (Vercel)

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Example |
|----------|---------|
| `BETTER_AUTH_URL` | `https://mediqueue-tutor-booking-system.vercel.app` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | `https://mediqueue-tutor-booking-system.vercel.app` |
| `BETTER_AUTH_CLIENT_URL` | `https://mediqueue-tutor-booking-system.vercel.app` |
| `NEXT_PUBLIC_BASE_URL` | Your deployed Express API URL |
| `MONGODB_URI` | MongoDB Atlas URI |
| `BETTER_AUTH_SECRET` | Strong random secret |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | If using Google login |

On your **API host** (Render, Railway, etc.), set:

| Variable | Value |
|----------|--------|
| `BETTER_AUTH_URL` | `https://mediqueue-tutor-booking-system.vercel.app` |
| `BETTER_AUTH_CLIENT_URL` | same as above |

Redeploy **both** API and Vercel after updating env vars. Booking runs in the browser: wrong `NEXT_PUBLIC_BASE_URL`, missing CORS, or wrong `BETTER_AUTH_URL` on the API usually shows a clear toast error.

---

## Main routes

| Route | Description |
|-------|-------------|
| `/` | Home — carousel, tutors preview, info sections |
| `/Tutors` | All tutors + search & filter |
| `/Tutors/[id]` | Tutor details & book session (login required) |
| `/Add_Tutor` | Add a new tutor (login required) |
| `/My_Tutors` | Your tutor listings (login required) |
| `/My_Booked_Sessions` | Your bookings (login required) |
| `/login` / `/register` | Authentication |
| `/profile` | User profile |
| `/privacy` | Privacy policy |

---

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Author

Assignment project — **MediQueue Tutor Booking System** (CAT_02).
