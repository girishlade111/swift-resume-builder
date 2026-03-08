

# Simple ATS-Friendly Resume Builder MVP

## Overview
A single-page, client-side-only resume builder where users fill a form, see a live preview, and download a clean ATS-friendly PDF. No backend, no auth, no signup.

## Layout Structure
- **Top Nav**: "Lade Stack Resume" logo left, "Why ATS-friendly?" scroll link + "Feedback" mailto link right
- **Main Area**: Two-column on desktop (form left, preview right), stacked on mobile
- **Bottom**: ATS info section + minimal footer

## Resume Data Model
Typed TypeScript model with sections: Personal Info, Summary, Experience (dynamic list), Education (dynamic list), Projects (dynamic list), Skills (string array), Extras (certifications, languages, achievements). Managed via React Context with in-memory state and optional localStorage toggle.

## Form Editor (Left Panel)
- Accordion/collapsible sections for each resume category
- Dynamic add/remove for Experience, Education, Projects entries
- Skills as comma-separated input converting to chips
- Character counter on Summary textarea
- ATS tips callout boxes in Experience and Skills sections
- Auto-saves as user types (controlled inputs updating context)
- "Reset to example resume" button with sample fresher data
- Basic validation: name, email required; at least one experience or project

## Live Preview (Right Panel)
- Template selector with 5 templates at the top (thumbnail buttons)
- A4 paper-like preview card, scaled to fit on desktop, scrollable on mobile
- Real-time sync with form data via shared context
- All templates follow ATS guidelines: system fonts, clear section headings, bullet points, no fancy graphics

### 5 Templates
1. **Classic** — Single column, clean serif-style headers, traditional layout
2. **Modern** — Single column, bold name header, accent color section dividers
3. **Minimal** — Maximum whitespace, understated styling
4. **Professional** — Subtle left border accents, structured spacing
5. **Clean** — Two-tone header area (light background for name/contact), single column body

## PDF Export
- Uses `@react-pdf/renderer` — dedicated PDF component per template
- A4 page size with proper margins
- "Download PDF" button above preview with loading spinner
- Filename: `FullName-JobTitle-Resume.pdf`
- Entirely client-side, zero network calls

## ATS Info Section
Static content block explaining what ATS is, why formatting matters, and how this tool helps — placed below the main editor area.

## Design & UX
- Light background, white cards, subtle shadows, rounded corners
- Single blue accent color for buttons/highlights
- Mobile-first responsive design (works down to 360px)
- Keyboard accessible form fields and buttons
- Clean, modern, minimal aesthetic inspired by FlowCV

## Key Components
- `ResumeContext` — state provider
- `ResumeForm` — accordion-based form sections
- `ResumePreview` — live HTML preview with template switching
- `TemplateSelector` — template thumbnail picker
- `Template1–5` — HTML preview components
- `PdfTemplate1–5` — `@react-pdf/renderer` document components
- `AtsInfoSection` — static educational content
- `Navbar` / `Footer` — app shell

