# Personal Portfolio | Mohit Kumar (`mohitdevx`)

A craft-focused, high-performance personal developer portfolio engineered with React 19, TypeScript, Tailwind CSS v4, and Vite. Designed with an editorial, human-first aesthetic that emphasizes systems engineering, cybersecurity principles, and full-stack development.

---

## ✨ Features

- **🛸 Floating Island Command Dock**: Centered floating capsule navbar featuring live telemetry indicator, real-time scroll spy highlighting active sections, and a tactile dark/light mode toggle.
- **📊 Live GitHub Activity Matrix**: Synced with the GitHub Contributions API (`@mohitdevx`) accompanied by an ambient canvas laser tracer and continuous vertical activity ticker with pause-on-hover.
- **⚡ Dual-Direction Tech Marquee**: Infinite-scrolling marquee presenting languages, frameworks, and DevOps tools with official brand vectors from `react-icons`.
- **💼 Editorial Case Studies**: Human-centered project breakdowns focusing on real architecture decisions, Redis message queues, Docker environments, and security monitoring.
- **🌓 Reactive Theme Engine**: Smooth, synchronized CSS variable architecture supporting both deep graphite dark mode (`#09090b`) and crisp light mode (`#fafafa`) with persistent `localStorage` sync.
- **📱 Responsive & Clean Layout**: Constrained to an optimal reading width (`max-w-3xl`) with zero visible browser scrollbars (`.no-scrollbar`).

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Remix Icon](https://remixicon.com/), [React Icons (Simple Icons & VS Code)](https://react-icons.github.io/react-icons/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Button.tsx              # Reusable interactive button & link component
│   ├── ContributionShooter.tsx # Canvas laser particle tracer & activity matrix
│   ├── Footer.tsx              # Dynamic year & social links footer
│   ├── Navbar.tsx              # Floating island command dock with scroll spy
│   └── SectionHeader.tsx       # Centered glowing divider line & section header
├── pages/
│   ├── About.tsx               # Narrative bio & engineering philosophy
│   ├── Contributions.tsx       # Live GitHub contribution matrix & activity stream
│   ├── Projects.tsx            # Engineering case studies & project links
│   └── TechStack.tsx           # Dual-row continuous running tech marquee
├── App.tsx                     # Primary layout orchestration
├── index.css                   # Tailwind v4 theme variables, animations & masks
└── main.tsx                    # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **pnpm**: v9.0.0 or higher (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/mohitdevx/Personal-Portfolio.git

# Navigate to project directory
cd Personal-Portfolio

# Install dependencies
pnpm install
```

### Development

```bash
# Start local development server with HMR
pnpm run dev
```

### Build & Lint

```bash
# Run ESLint validation
pnpm run lint

# Compile TypeScript and build production bundle
pnpm run build

# Preview production build locally
pnpm run preview
```

---

## 👤 Author

**Mohit Kumar**
- GitHub: [@mohitdevx](https://github.com/mohitdevx)
- LinkedIn: [in/mohitdevx](https://linkedin.com/in/mohitdevx)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
