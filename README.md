# 🚀 LadeStack — Free ATS-Friendly Resume Builder

> **Build professional, ATS-optimized resumes in minutes — no sign-up required, 100% free forever.**

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://ladestack.in)
[![License](https://img.shields.io/badge/License-Open%20Source-blue?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)](https://react.dev/)

**[🌐 Visit Website](https://ladestack.in)** • **[📱 Try Live Demo](https://ladestack.in)** • **[📧 Contact](mailto:admin@ladestack.in)**

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Stats](#-project-stats)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Connect With Us](#-connect-with-us)
- [License](#-license)

---

## 🎯 Overview

**LadeStack** is a **free, open-source, browser-based resume builder** designed to help job seekers create **ATS-friendly resumes** effortlessly. Built with modern web technologies, it offers a seamless experience for creating professional resumes without any signup, installation, or cost.

### 💡 Why LadeStack?

| Feature | Benefit |
|---------|---------|
| **🔒 100% Client-Side** | Your data never leaves your browser — maximum privacy |
| **💸 Completely Free** | No hidden fees, no premium tiers, no watermarks |
| **⚡ Instant Start** | No signup required — start building immediately |
| **📱 Mobile-First** | Works perfectly on desktop, tablet, and mobile |
| **🎨 22+ Templates** | Professional designs for every industry |
| **📄 ATS-Optimized** | Formats that pass applicant tracking systems |

---

## ✨ Key Features

### 🎨 Templates & Design

- **22 Unique Resume Templates** across 4 categories:
  - **📋 Professional** — Classic, Executive, Professional, Corporate, Elegant
  - **🚀 Modern** — Modern, Bold, Tech, Gradient, Infographic, Timeline
  - **🎯 Minimal** — Minimal, Clean, Monochrome, Starter
  - **🎨 Creative** — Creative, Artistic, Magazine, Designer, Academic, Left-Sidebar, Compact

- **Live A4 Preview** — See changes instantly as you type with real-time rendering
- **Category-Based Template Browser** — Visual thumbnails with organized filtering
- **Responsive Design** — Optimized for desktop (1920px+), tablet (768px), and mobile (320px+)
- **Print-Ready Output** — Perfect formatting for both digital and physical printing

### 📝 Resume Builder Features

#### **Personal Information**
- ✅ Full name and job title
- ✅ Contact details (email, phone, location)
- ✅ Social links (LinkedIn, GitHub, Portfolio)
- ✅ Profile image upload (with preview)

#### **Professional Summary**
- ✅ Free-text summary editor
- ✅ Character count with recommendations
- ✅ ATS optimization tips

#### **Work Experience**
- ✅ Multiple position entries
- ✅ Company, role, location fields
- ✅ Date range picker with "Currently Working" toggle
- ✅ Dynamic bullet points (one per line)
- ✅ Add/remove entries instantly

#### **Education**
- ✅ Multiple education entries
- ✅ School/university name
- ✅ Degree and field of study
- ✅ Year range (start/end)
- ✅ Grade/GPA (optional)

#### **Projects**
- ✅ Project name and link
- ✅ Tech stack description
- ✅ Achievement bullet points
- ✅ Add unlimited projects

#### **Skills Management**
- ✅ Tag-based input system
- ✅ Press Enter or comma to add skills
- ✅ Click to remove skills
- ✅ Visual skill chips

#### **Extras Section**
- ✅ Certifications (multi-line)
- ✅ Languages spoken
- ✅ Achievements and awards

### 📥 PDF Export

- **One-Click Download** — Generate PDF instantly
- **6 PDF Templates** — 5 styled + 1 generic factory
- **Smart Filename Generation** — `YourName-JobTitle-Resume.pdf`
- **High-Quality Output** — Print-ready 300 DPI PDFs
- **Color-Accurate** — Matches on-screen preview

### 💾 Data Management

- **LocalStorage Persistence** — Auto-save to browser
- **Toggle Persistence** — Enable/disable with one click
- **Example Resume** — Pre-filled sample for quick start
- **Clear All Data** — Reset with confirmation dialog
- **No Server Storage** — 100% client-side processing

### 📚 Resource Center

- **Resume Writing Guide** — Step-by-step ATS optimization
- **Cover Letter Tips** — Templates and best practices
- **Interview Preparation** — STAR method, common questions
- **Blog Articles** — Weekly career advice

### 🔒 Privacy & Security

- **No Data Collection** — We don't store your resume
- **No Tracking** — Privacy-respecting analytics only
- **No Third-Party Ads** — Clean, distraction-free experience
- **HTTPS Encryption** — Secure connection always
- **Open Source** — Transparent codebase

---

## 🛠️ Tech Stack

### **Frontend Framework**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **TypeScript** | 5.8.3 | Type safety |
| **React Router** | 6.30.1 | Client-side routing |

### **Build & Development**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Vite** | 5.4.19 | Build tool & dev server |
| **SWC** | Latest | Fast Rust-based transpiler |
| **Vitest** | 3.2.4 | Testing framework |
| **ESLint** | 9.32.0 | Code linting |

### **Styling & UI**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS |
| **shadcn/ui** | Latest | UI component library |
| **Radix UI** | Latest | Accessible primitives |
| **tailwindcss-animate** | 1.0.7 | Animation utilities |

### **State & Forms**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Context** | Built-in | Global state management |
| **React Hook Form** | 7.61.1 | Form handling |
| **Zod** | 3.25.76 | Schema validation |
| **TanStack Query** | 5.83.0 | Data fetching |

### **PDF & Export**
| Technology | Version | Purpose |
|------------|---------|---------|
| **@react-pdf/renderer** | 4.3.0 | PDF generation |

### **Icons & Utilities**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Lucide React** | 0.462.0 | Icon library |
| **clsx** | 2.1.1 | Class name utility |
| **tailwind-merge** | 2.6.0 | Class merging |

---

## 📊 Project Stats

| Metric | Count | Details |
|--------|-------|---------|
| **📄 Resume Templates** | **22** | 4 categories, unique designs |
| **📥 PDF Templates** | **6** | 5 styled + 1 generic |
| **🧩 UI Components** | **45+** | shadcn/ui primitives |
| **📄 Pages** | **12** | Including legal & resources |
| **📝 Resume Sections** | **7** | Personal to Extras |
| **📦 NPM Dependencies** | **60+** | Production + dev |
| **📁 Source Files** | **80+** | TypeScript modules |
| **📏 Lines of Code** | **15,000+** | Well-documented |
| **🎯 TypeScript Coverage** | **100%** | Full type safety |
| **📱 Responsive Breakpoints** | **4** | Mobile to desktop |

---

## 📸 Screenshots

### Desktop View
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Lade Stack    [Nav Links]    [Why ATS?] [Feedback] │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │                 │  │                                 │  │
│  │   Resume Form   │  │      Live Preview (A4)          │  │
│  │   - Personal    │  │                                 │  │
│  │   - Experience  │  │   [Template: Classic ▼]         │  │
│  │   - Education   │  │   [Download PDF]                │  │
│  │   - Skills      │  │                                 │  │
│  │                 │  │   ┌─────────────────────┐       │  │
│  │                 │  │   │  JOHN DOE           │       │  │
│  │                 │  │   │  Software Engineer  │       │  │
│  │                 │  │   │                     │       │  │
│  │                 │  │   │  EXPERIENCE         │       │  │
│  │                 │  │   │  • Built React app  │       │  │
│  │                 │  │   └─────────────────────┘       │  │
│  └─────────────────┘  └─────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Why ATS-friendly resumes matter...                         │
└─────────────────────────────────────────────────────────────┘
```

### Mobile View
```
┌──────────────────────┐
│ [☰] Lade Stack       │
├──────────────────────┤
│ Build Your Resume    │
│ ┌──────────────────┐ │
│ │ Personal Info ▼  │ │
│ │ [Form Fields]    │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Experience ▼     │ │
│ │ [Form Fields]    │ │
│ └──────────────────┘ │
│ [Scroll to Preview▼] │
├──────────────────────┤
│ Live Preview         │
│ ┌──────────────────┐ │
│ │ [Resume Preview] │ │
│ └──────────────────┘ │
│ [Templates] [PDF ▼]  │
└──────────────────────┘
```

---

## 🏁 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Minimum Version | Recommended |
|-------------|-----------------|-------------|
| **Node.js** | 18.x | 20.x LTS |
| **npm** | 9.x | 10.x |
| **Git** | 2.x | Latest |

### Installation

#### **Step 1: Clone the Repository**

```bash
git clone https://github.com/girishlade111/swift-resume-builder.git
cd swift-resume-builder
```

#### **Step 2: Install Dependencies**

```bash
# Using npm
npm install

# Or using bun (faster)
bun install
```

#### **Step 3: Start Development Server**

```bash
npm run dev
```

The application will be available at **`http://localhost:8080`**

### Build for Production

```bash
# Production build
npm run build

# Development build (unminified)
npm run build:dev

# Preview production build
npm run preview
```

---

## ⚙️ Configuration

### **Vite Configuration** (`vite.config.ts`)

```typescript
{
  server: {
    port: 8080,      // Dev server port
    host: "::",      // IPv6 enabled
    hmr: {
      overlay: false // Disable error overlay
    }
  },
  resolve: {
    alias: {
      "@": "./src"   // Path alias
    }
  }
}
```

### **Tailwind Configuration** (`tailwind.config.ts`)

| Setting | Value | Description |
|---------|-------|-------------|
| **Dark Mode** | `class` | Toggle via class on html |
| **Container** | `1400px` | Max width, centered |
| **Content** | All source files | Purge unused CSS |
| **Theme** | HSL variables | Semantic color tokens |
| **Plugins** | `tailwindcss-animate` | Animation utilities |

### **TypeScript Configuration** (`tsconfig.json`)

| Setting | Value | Description |
|---------|-------|-------------|
| **Target** | `ES2020` | JavaScript target |
| **Module** | `ESNext` | Module system |
| **Strict** | `false` | Flexible null checks |
| **Paths** | `@/*` → `./src/*` | Import aliases |
| **JSX** | `react-jsx` | React 17+ JSX transform |

### **Environment Variables**

No environment variables required! The app runs entirely client-side.

---

## 📋 Available Scripts

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run dev` | Start dev server | Local development |
| `npm run build` | Production build | Deploy to hosting |
| `npm run build:dev` | Development build | Debugging builds |
| `npm run preview` | Preview production | Test production build |
| `npm run test` | Run tests | CI/CD, validation |
| `npm run test:watch` | Watch mode tests | Development testing |
| `npm run lint` | ESLint check | Code quality |
| `npm run lint:fix` | Auto-fix lint | Fix formatting |

---

## 📂 Project Structure

```
swift-resume-builder/
├── public/
│   ├── favicon.ico           # Browser favicon
│   ├── og-image.svg          # Open Graph image
│   ├── robots.txt            # Crawler instructions
│   ├── sitemap.xml           # SEO sitemap
│   └── site.webmanifest      # PWA manifest
│
├── src/
│   ├── components/
│   │   ├── templates/        # 22 HTML preview templates
│   │   │   ├── ClassicTemplate.tsx
│   │   │   ├── ModernTemplate.tsx
│   │   │   ├── CompactTemplate.tsx
│   │   │   ├── MinimalTemplate.tsx
│   │   │   ├── ProfessionalTemplate.tsx
│   │   │   ├── CleanTemplate.tsx
│   │   │   ├── LeftSidebarTemplate.tsx
│   │   │   └── AllTemplates.tsx  # 15 additional templates
│   │   │
│   │   ├── pdf/
│   │   │   └── PdfTemplates.tsx  # PDF render templates
│   │   │
│   │   ├── ui/               # shadcn/ui components (45+)
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (40+ more)
│   │   │
│   │   ├── Navbar.tsx        # Top navigation
│   │   ├── Footer.tsx        # Footer with links
│   │   ├── ResumeForm.tsx    # Main form editor
│   │   ├── ResumePreview.tsx # Live A4 preview
│   │   ├── TemplateSelector.tsx  # Template gallery
│   │   ├── InfoSection.tsx   # ATS info section
│   │   └── AtsTips.tsx       # ATS tips component
│   │
│   ├── context/
│   │   └── ResumeContext.tsx # Global state provider
│   │
│   ├── data/
│   │   └── exampleResume.ts  # Sample resume data
│   │
│   ├── hooks/
│   │   └── (custom hooks)
│   │
│   ├── lib/
│   │   └── utils.ts          # Utility functions (cn)
│   │
│   ├── pages/
│   │   ├── Index.tsx         # Main builder page
│   │   ├── About.tsx         # About page
│   │   ├── Blog.tsx          # Blog listing
│   │   ├── Careers.tsx       # Careers page
│   │   ├── Contact.tsx       # Contact page
│   │   ├── PrivacyPolicy.tsx # Privacy policy
│   │   ├── TermsOfService.tsx # Terms of service
│   │   ├── CookiePolicy.tsx  # Cookie policy
│   │   ├── ResumeGuide.tsx   # Resume writing guide
│   │   ├── CoverLetterTips.tsx # Cover letter tips
│   │   ├── InterviewPrep.tsx # Interview preparation
│   │   └── NotFound.tsx      # 404 page
│   │
│   ├── types/
│   │   └── resume.ts         # TypeScript interfaces
│   │
│   ├── test/
│   │   ├── example.test.ts   # Test examples
│   │   └── setup.ts          # Test setup
│   │
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # Vite type declarations
│
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── vite.config.ts            # Vite config
├── vitest.config.ts          # Vitest config
├── eslint.config.js          # ESLint config
└── README.md                 # This file
```

---

## 🌐 Deployment

### **Option 1: Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Option 2: Netlify**

```bash
# Build
npm run build

# Drag & drop dist/ folder to Netlify
```

### **Option 3: GitHub Pages**

```bash
# Install gh-pages
npm i -D gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### **Option 4: Manual Hosting**

1. Run `npm run build`
2. Upload `dist/` folder contents to your web server
3. Configure server for SPA routing (redirect all to index.html)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **How to Contribute**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test on mobile and desktop
- Update documentation as needed

### **What We Need Help With**

- 🐛 Bug fixes
- ✨ New templates
- 📝 Documentation improvements
- 🌍 Translations
- 🧪 Test coverage
- 🎨 UI/UX improvements

---

## 🔗 Connect With Us

| Platform | Link | Description |
|----------|------|-------------|
| 🌐 **Website** | [ladestack.in](https://ladestack.in) | Live demo & main site |
| 📸 **Instagram** | [@girish_lade_](https://www.instagram.com/girish_lade_/) | Updates & announcements |
| 💼 **LinkedIn** | [Girish Lade](https://www.linkedin.com/in/girish-lade-075bba201/) | Professional network |
| 🐙 **GitHub** | [girishlade111](https://github.com/girishlade111) | Source code & issues |
| ✏️ **CodePen** | [Girish Lade](https://codepen.io/Girish-Lade-the-looper) | Code demos |
| 📧 **Email** | [admin@ladestack.in](mailto:admin@ladestack.in) | Support & inquiries |

---

## 📄 License

This project is **open source** and available under the MIT License.

- ✅ Free to use for personal and commercial projects
- ✅ Free to modify and distribute
- ✅ No warranty provided

---

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** — Beautiful UI components
- **[Radix UI](https://www.radix-ui.com/)** — Accessible primitives
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS
- **[Vite](https://vitejs.dev/)** — Lightning-fast build tool
- **[React](https://react.dev/)** — UI framework
- **[@react-pdf/renderer](https://react-pdf.org/)** — PDF generation

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star!

**Built with ❤️ by [Girish Lade](https://github.com/girishlade111)**

[🔝 Back to Top](#-ladestack--free-ats-friendly-resume-builder)

</div>
