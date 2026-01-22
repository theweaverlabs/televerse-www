<div align="center">
  <img src="public/bot.png" alt="Televerse Logo" width="80" height="80">
  
  # Televerse Website

  **The official landing page & documentation website for the Televerse Telegram Bot Framework**

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)

  [Live Website](https://televerse.weaverlabs.ca) · [Televerse Package](https://pub.dev/packages/televerse) · [Documentation](https://televerse.weaverlabs.ca/docs)

</div>

---

## ✨ Overview

This repository contains the source code for the official Televerse website — a modern, animated landing page and comprehensive documentation hub for the most powerful Telegram Bot framework in the Dart ecosystem.

### What's Televerse?

Televerse is a type-safe, extensible Telegram Bot API framework for Dart featuring:

- 🎯 **Zero dynamic types** on public interfaces
- 🔍 **80+ built-in filters** with logical operators (`+`, `*`, `-`)
- 🔌 **Plugin architecture** for sessions, conversations, and logging
- 🌐 **Built-in webhook server** & Local Bot API support
- 💬 **Conversation API** for multi-step user interactions

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript 5** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **GSAP** | Smooth scroll-based animations |
| **Prism.js** | Dart/code syntax highlighting |
| **Firebase Hosting** | Production deployment |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/theweaverlabs/televerse-www.git
cd televerse-www

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

---

## 📁 Project Structure

```
www/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   └── docs/               # Documentation pages
│   │       ├── layout.tsx      # Docs layout with sidebar
│   │       ├── page.tsx        # Docs overview
│   │       ├── getting-started/
│   │       ├── installation/
│   │       └── features/
│   ├── components/
│   │   └── docs/               # Documentation components
│   │       ├── Sidebar.tsx     # Navigation sidebar
│   │       ├── CodeBlock.tsx   # Syntax-highlighted code
│   │       ├── DocContent.tsx  # Content wrapper
│   │       └── TableOfContents.tsx
│   └── consts.ts               # Shared constants
├── public/
│   └── bot.png                 # Televerse logo
└── firebase.json               # Firebase Hosting config
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## 🎨 Design Features

- **Dark theme** with elegant zinc/black color palette
- **Gradient orb backgrounds** for depth and visual interest
- **GSAP scroll animations** with ScrollTrigger
- **Custom typography** using Space Grotesk, Inter, and JetBrains Mono
- **Magnetic button effects** for interactive CTAs
- **Responsive design** optimized for all screen sizes
- **Prism.js syntax highlighting** for Dart code examples

---

## 🌍 Deployment

The website is automatically deployed to Firebase Hosting via GitHub Actions:

- **Push to `main`** → Live deployment at [televerse.weaverlabs.ca](https://televerse.weaverlabs.ca)
- **Pull requests** → Preview deployments for review

### Manual Deployment

```bash
# Build the project
pnpm build

# Deploy to Firebase
firebase deploy --only hosting
```

---

## 🔗 Related Links

| Resource | Link |
|----------|------|
| 📦 Televerse Package | [pub.dev/packages/televerse](https://pub.dev/packages/televerse) |
| 📖 Documentation | [televerse.weaverlabs.ca/docs](https://televerse.weaverlabs.ca/docs) |
| 💬 Telegram Community | [@TeleverseDart](https://telegram.me/TeleverseDart) |
| 🐙 GitHub Repository | [theweaverlabs/televerse-www](https://github.com/theweaverlabs/televerse-www) |

---

## 🤝 Contributing

Contributions to improve the website are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

<div align="center">
  
  Made with ❤️ by [Weaver Labs](https://weaverlabs.ca)
  
  **Bot API 9.3** • Built with Dart 💙
  
</div>
