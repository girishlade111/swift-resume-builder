# 📄 LadeStack — Free ATS-Friendly Resume Builder

> **Build professional, ATS-optimized resumes in minutes — no sign-up required.**

🌐 **Website:** [ladestack.in](https://ladestack.in)

---

## 🚀 Overview

**LadeStack** is a free, open-source, browser-based resume builder designed to help job seekers create **ATS-friendly resumes** effortlessly. With **22+ professionally designed templates**, real-time preview, instant PDF download, and local data persistence — all running entirely in the browser with **zero backend dependency**.

---

## ✨ Key Features

### 🎨 Templates & Design
- **22 unique resume templates** across multiple categories:
  - **Professional** — Classic, Compact, Professional, Executive, Corporate
  - **Modern** — Modern, Bold, Tech, Gradient, Infographic
  - **Minimal** — Minimal, Clean, Monochrome, Starter
  - **Creative** — Creative, Elegant, Timeline, Magazine, Artistic, Academic, Designer, Left-Sidebar
- **Live A4 preview** — see changes instantly as you type
- **Category-based template browser** with visual thumbnails
- **Responsive layout** — works on desktop, tablet, and mobile

### 📝 Resume Sections
- **Personal Info** — name, job title, email, phone, location, portfolio, LinkedIn, GitHub, profile image upload
- **Professional Summary** — free-text summary with ATS optimization tips
- **Work Experience** — multiple entries with company, role, location, date range, current job toggle, and bullet points
- **Education** — school, degree, field of study, year range, and grade/GPA
- **Projects** — project name, link, tech stack, and bullet points
- **Skills** — tag-based input (Enter/comma to add, click to remove)
- **Extras** — certifications, languages, and achievements

### 📥 PDF Export
- **One-click PDF download** powered by `@react-pdf/renderer`
- **5 dedicated PDF templates** (Classic, Compact, Left-Sidebar, Modern, Minimal)
- **Generic PDF engine** with configurable color schemes for all other templates
- **Sanitized filenames** based on your name

### 💾 Data Persistence
- **LocalStorage auto-save** — your resume persists across browser sessions
- **Toggle persistence** on/off from the form
- **Reset to example** — pre-filled sample resume for quick start
- **Clear all** — start fresh with confirmation dialog

### 📚 Resource Pages
- **Resume Writing Guide** — ATS tips, formatting rules, keyword strategies
- **Cover Letter Tips** — structural templates and best practices
- **Interview Preparation** — STAR method, common questions, strategies

### 🔗 Additional Pages
- About, Blog, Careers, Contact
- Privacy Policy, Terms of Service, Cookie Policy

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 (SWC plugin) |
| **Styling** | Tailwind CSS 3 + `tailwindcss-animate` |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **PDF Generation** | `@react-pdf/renderer` |
| **Routing** | React Router DOM 6 |
| **State Management** | React Context API |
| **Forms** | React Hook Form + Zod validation |
| **Data Fetching** | TanStack React Query |
| **Icons** | Lucide React |
| **Testing** | Vitest + Testing Library |
| **Linting** | ESLint 9 + TypeScript ESLint |

---

## 📊 Project Stats

| Metric | Count |
|--------|-------|
| **Resume Templates** | 22 |
| **PDF Templates** | 6 (5 styled + 1 generic) |
| **UI Components** | 45+ (shadcn/ui) |
| **Pages** | 12 |
| **Resume Sections** | 7 |
| **TypeScript Coverage** | 100% |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── templates/          # 22 HTML preview templates
│   │   ├── ClassicTemplate.tsx
│   │   ├── ModernTemplate.tsx
│   │   ├── AllTemplates.tsx  # 15 additional templates
│   │   └── ...
│   ├── pdf/
│   │   └── PdfTemplates.tsx  # PDF render templates
│   ├── ui/                   # shadcn/ui components (45+)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ResumeForm.tsx        # Main form with accordion sections
│   ├── ResumePreview.tsx     # Live preview with template switching
│   ├── TemplateSelector.tsx  # Template browser dialog
│   ├── InfoSection.tsx
│   └── AtsTips.tsx
├── context/
│   └── ResumeContext.tsx     # Global resume state + persistence
├── data/
│   └── exampleResume.ts      # Sample resume data
├── pages/                    # 12 route pages
├── types/
│   └── resume.ts             # All TypeScript interfaces
├── hooks/                    # Custom React hooks
├── lib/
│   └── utils.ts              # Utility functions (cn)
└── index.css                 # Design tokens + Tailwind base
```

---

## ⚙️ Configuration

### Tailwind Config (`tailwind.config.ts`)
- **Dark mode**: class-based toggle
- **Design tokens**: HSL CSS variables for semantic colors (`--primary`, `--background`, `--accent`, etc.)
- **Container**: centered, `max-width: 1400px`, `padding: 2rem`
- **Animations**: accordion open/close keyframes via Radix

### Vite Config (`vite.config.ts`)
- **Dev server**: port `8080`, IPv6 enabled, HMR overlay disabled
- **Path alias**: `@/` → `./src/`
- **Plugin**: `@vitejs/plugin-react-swc` for fast refresh

### TypeScript Config
- **Strict null checks**: disabled for flexibility
- **Module**: ESNext with bundler resolution
- **Path mapping**: `@/*` → `./src/*`

---

## 🏁 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or **bun**)

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

The app will be available at **`http://localhost:8080`**

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with ESLint |

---

## 🌐 Deployment

Deploy instantly via [Lovable](https://lovable.dev):
1. Open your Lovable project
2. Click **Share → Publish**
3. Optionally connect a **custom domain** via Project → Settings → Domains

---

## 🔗 Connect With Us

| Platform | Link |
|----------|------|
| 🌐 **Website** | [ladestack.in](https://ladestack.in) |
| 📸 **Instagram** | [@girish_lade_](https://www.instagram.com/girish_lade_/) |
| 💼 **LinkedIn** | [Girish Lade](https://www.linkedin.com/in/girish-lade-075bba201/) |
| 🐙 **GitHub** | [girishlade111](https://github.com/girishlade111) |
| ✏️ **CodePen** | [Girish Lade](https://codepen.io/Girish-Lade-the-looper) |
| 📧 **Email** | [admin@ladestack.in](mailto:admin@ladestack.in) |

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute.

---

<p align="center">
  Built with ❤️ by <strong>Girish Lade</strong> — <a href="https://ladestack.in">ladestack.in</a>
</p>
