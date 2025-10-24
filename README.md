# Arca Gidan Prize

An award for those who push open source AI art models to their artistic limits.

## Tech Stack

### Frontend
- **React 18.3.1** with **TypeScript 5.5.3**
- **Vite 5.4.1** (build tool with SWC for fast compilation)
- **React Router 6.26.2** (client-side routing)
- **Tailwind CSS 3.4.11** (styling)
- **shadcn/ui** (UI component library built on Radix UI primitives)
- **TanStack Query** (React Query) for data fetching/caching
- **React Hook Form + Zod** for forms and validation

### Backend & Database (Ready for Integration)
- **Supabase** (Backend-as-a-Service)
- **PostgreSQL** database
- **Drizzle ORM** for type-safe database operations
- Authentication & Authorization ready

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Hero.tsx         # Hero section with video panels
│   ├── AboutSection.tsx # About section
│   ├── ThemesSection.tsx # Themes grid
│   ├── PrizeSection.tsx # Prize information
│   ├── FAQSection.tsx   # FAQ accordion
│   └── Footer.tsx       # Footer with countdown
├── pages/
│   └── HomePage.tsx     # Main landing page
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # App root with routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Features

- ✅ Responsive design
- ✅ 4-panel video hero with hover effects
- ✅ Animated sections
- ✅ Live countdown timer
- ✅ FAQ accordion
- ✅ Theme showcase
- 🔜 User authentication (Supabase ready)
- 🔜 Submission system
- 🔜 Admin dashboard

## Future Enhancements

This app is built with extensibility in mind:
- Authentication system with Supabase
- User profiles and submissions
- Admin panel for managing entries
- Voting/judging system
- Gallery showcase

## Deployment

Ready to deploy on **Railway** or any platform supporting Node.js/Vite apps.

Domain: `reigh.art`

## License

MIT

