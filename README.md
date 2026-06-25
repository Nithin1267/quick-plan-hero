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

## 📄 License

Released under the [MIT License](./LICENSE).
