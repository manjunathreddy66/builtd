# BUILTD — Build your digital identity.

BUILTD is a modern, student-focused portfolio-building web application engineered specifically for engineering and college students.

> *"You build your skills. BUILTD builds the place where you can show them."*

Students never need to write HTML, CSS, JavaScript, or configure web hosting. They answer questions one step at a time, and BUILTD automatically turns their achievements into a recruiter-ready, responsive personal website with an instant public link:

`https://builtd.vercel.app/:username`

---

## 🚀 Key Features

1. **One Step At a Time UX**:
   - **Step 0**: Real-time username availability checker with automatic normalization and suggestion engine.
   - **Step 01 — About you**: Name, headline, bio, location, and avatar upload (saved as `username.png`).
   - **Step 02 — Education**: Degree, college, branch, university, and GPA.
   - **Step 03 — Skills**: Categorized chips (Programming, Web, Design, Tools) + custom skills (no fake percentage bars).
   - **Step 04 — Projects**: Unlimited project entries with GitHub links, live demos, and key technical takeaways.
   - **Step 05 — Experience**: Internships, college clubs, freelancing, and leadership.
   - **Step 06 — Achievements**: Hackathon wins, research papers, awards, and certifications.
   - **Step 07 — Links**: GitHub, LinkedIn, LeetCode, Codeforces, and contact emails.
   - **Step 08 — Resume**: Direct PDF resume attachment.

2. **5 Curated Design Templates**:
   - `01 — MINIMAL`: Serene typography, generous whitespace, stark elegance.
   - `02 — EDITORIAL`: Swiss-inspired layout, bold asymmetric headers, magazine structure.
   - `03 — GRID`: Bento-grid modular layout with high visual density and organized cards.
   - `04 — CREATIVE`: Developer & builder flair with terminal accents and code tags.
   - `05 — PROFESSIONAL`: Executive corporate timeline with structured recruiter clarity.

3. **Subtle Three.js Visual Identity**:
   - Isometric architectural blocks echoing the brand emblem, floating wireframes, and particle drift.
   - Damped mouse parallax interaction.
   - Graceful fallback for non-WebGL devices and full respect for `prefers-reduced-motion`.

4. **Brand Assets**:
   - `built.png`: Main / large brand logo used on landing page hero and celebration screen.
   - `builtd.png`: Compact logo mark used across navbar, sidebar, dashboard, and footer.

5. **Dynamic Public Routing (`/:username`)**:
   - Single deployment supporting unlimited student URLs:
     - `/manjunath`
     - `/rahul`
     - `/ananya`
   - Does not render empty sections.
   - Dynamic SEO metadata (page title and bio meta description).

6. **Student Dashboard & Live Editor**:
   - Real-time profile completion score with actionable recommendations.
   - Tabbed editor with instant live responsive preview (Desktop / Tablet / Mobile toggle).
   - Instant shareable link and copy-to-clipboard functionality.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 6, React Router DOM 7
- **3D Graphics**: Three.js
- **Styling**: Vanilla CSS Design System with Space Grotesk & Inter typography
- **Backend & Database**: Firebase Auth, Cloud Firestore, Firebase Storage (with seamless local dev fallback)
- **Deployment**: Vercel ready (`vercel.json` SPA rewrites included)

---

## 🏁 Quickstart

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
