# Smart To-Do List

A polished, professional task manager built with React, TanStack Start, and Tailwind CSS. Organize your day with priorities, due dates, search, and filters — all in a refined dark UI.

## ✨ Features

- ✅ Add, complete, and delete tasks
- 🎯 Priority levels (Low / Medium / High) with color-coded pills
- 📅 Due dates with overdue highlighting
- 🔍 Live search and status filters (All / Active / Completed)
- 💾 Persistent storage via `localStorage`
- 🎨 Glassmorphism dark theme with Space Grotesk + Inter typography
- 📱 Fully responsive

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh) (or Node.js 18+)

### Install
```bash
bun install
```

### Develop
```bash
bun run dev
```
Open http://localhost:8080

### Build for production
```bash
bun run build
```

## 🧱 Tech Stack

- **Framework:** TanStack Start (React 19 + Vite 7)
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui + Radix primitives
- **Icons:** lucide-react
- **Language:** TypeScript

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoApp.tsx       # Main to-do application
│   └── ui/               # shadcn/ui components
├── routes/
│   ├── __root.tsx        # Root layout + SEO
│   └── index.tsx         # Home route
├── assets/               # Images and static assets
└── styles.css            # Tailwind theme & design tokens
```

## 📝 Scripts

| Command          | Description                |
| ---------------- | -------------------------- |
| `bun run dev`    | Start the dev server       |
| `bun run build`  | Build for production       |
| `bun run preview`| Preview the production build |
| `bun run lint`   | Run ESLint                 |
| `bun run format` | Format with Prettier       |

## 🚢 Deployment

### ⚠️ Why GitHub Pages won't work

This project is built with **TanStack Start**, a full‑stack React framework that relies on a server runtime for:

- Server‑side rendering (SSR) of routes
- Server functions (`createServerFn`) and API routes under `src/routes/api/`
- Environment variables and secrets read at request time
- Future backend features (auth, database, edge functions via Lovable Cloud)

**GitHub Pages only serves static files** — there is no Node/Worker process to execute server code. Deploying there would either fail to build or ship a broken app: SSR routes would 404 on refresh, server functions would never respond, and any API endpoint would return the raw HTML shell instead of JSON.

Static‑export workarounds (prerendering every route) would strip out exactly the features TanStack Start exists to provide, so it isn't a supported path for this project.

### ✅ Supported deployment options

| Option | Best for | Notes |
| --- | --- | --- |
| **Lovable (Publish button)** | Fastest path | One click → live at `your-app.lovable.app`. SSR, server functions, and Lovable Cloud all work out of the box. Custom domains supported after first publish. |
| **Cloudflare Workers / Pages (Workers runtime)** | Production self‑hosting on the edge | Matches the runtime the app is already targeted at. |
| **Netlify / Vercel** | Familiar PaaS hosting | Use their TanStack Start / Vite SSR adapters. |
| **Node server (VPS, Fly.io, Render, Railway, etc.)** | Full control | Run `bun run build` and serve the produced server bundle with Node 18+. |

If you only need a public link, the simplest option is to click **Publish** inside Lovable.

## 📄 License

Released under the [MIT License](./LICENSE).
