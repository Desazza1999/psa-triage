# 🏥 PSA Triage Assistant

**A clinical decision support app that helps prostate cancer patients interpret their PSA values — automatically determining whether to contact their doctor based on their specific treatment history.**

🔗 [Live Demo](https://69e4f1fcf5e13c9d43d852bd--rad-croquembouche-ce5eab.netlify.app/) · Built with React 18 + Tailwind CSS 4 + Vite

---

## The Problem

Patients receive PSA (Prostate-Specific Antigen) test results but can't interpret them on their own. The alarm threshold **isn't the same for everyone** — it depends on treatments received (surgery, radiotherapy, hormone therapy, or combinations). This creates confusion, anxiety, and unnecessary calls to doctors.

| Treatment Profile | Threshold |
|---|---|
| Healthy (no treatment) | PSA < 4 ng/ml + trend check |
| Post-prostatectomy | PSA < 0.2 ng/ml |
| Post-radiotherapy | PSA < nadir + 2 ng/ml (personalised) |
| Prostatectomy + radiotherapy | PSA < 0.2 ng/ml (ideal < 0.08) |
| Prostatectomy + hormone therapy | PSA < 0.08 ng/ml |
| Radiotherapy + hormone therapy | PSA < 0.08 OR < last PSA |
| All three treatments | PSA < 0.08 ng/ml |

Plus an exclusion filter for metastatic patients or those with initial PSA > 50 ng/ml.

## What I Built

A full-featured web application that automates this clinical triage:

### Core Decision Engine
- **7 distinct clinical profiles** with therapy-specific PSA thresholds
- **Dynamic threshold calculation** for post-radiotherapy patients (nadir + 2 ng/ml)
- **Trend detection**: flags 3 consecutive rising PSA values even when below threshold
- **Dual-condition logic** (OR) for radiotherapy + hormone therapy profile
- **Metastatic/high-PSA exclusion filter**

### Patient-Facing Features
- **Clinical onboarding wizard**: patient completes treatment history once (therapies, dates, nadir PSA, Gleason score, TNM staging, doctor contact)
- **PSA entry**: date, value, lab report attachment (photo/scan), instant automated verdict
- **3 visual outcomes**: ✅ PSA OK (green) · ⚠️ Notify doctor (amber) · 🚨 Call doctor (red)
- **Interactive PSA trend chart** with visual threshold line (Recharts)
- **Complete history timeline** with verdict badges per measurement
- **Printable PDF report** for physician visits (patient data, treatments, full measurement table)
- **Direct call-to-doctor** button on alarm
- **Full Italian/English internationalisation**

### Technical
- User authentication (registration + login)
- localStorage persistence (prepared for Supabase/Firebase migration)
- Responsive design (mobile + desktop)
- Deployed on Vercel with CI/CD from GitHub

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    Frontend                      │
│         React 18 + Tailwind CSS 4 + Vite         │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌───────────┐  ┌──────────────┐  │
│  │ Clinical │  │   PSA     │  │  Dashboard   │  │
│  │Onboarding│→ │  Entry    │→ │  + History   │  │
│  │  Wizard  │  │ + Verdict │  │  + Reports   │  │
│  └──────────┘  └───────────┘  └──────────────┘  │
│                      │                           │
│              ┌───────▼────────┐                  │
│              │ Decision Engine │                  │
│              │  7 profiles ×   │                  │
│              │  threshold logic │                 │
│              │  + trend detect  │                 │
│              └────────────────┘                  │
│                                                  │
├─────────────────────────────────────────────────┤
│  Persistence: localStorage (→ Supabase ready)    │
│  i18n: Italian / English                         │
│  Charts: Recharts                                │
│  Icons: Lucide React                             │
└─────────────────────────────────────────────────┘
```

## The Process

This project wasn't just about writing code — it was about understanding a complex clinical domain and modelling it correctly.

1. **Clinical analysis**: Received and synthesised two medical documents (a PowerPoint decision flowchart + a Word document with treatment rules). Identified 7 distinct clinical profiles with specific threshold logic.

2. **Decision flow modelling**: Created 5 iterative versions of the flowchart on Miro, evolving from an expanded decision tree (every combination as a separate node) to an optimised cascade structure with "YES descends / NO goes horizontal" pattern.

3. **MVP prototype**: Built a first interactive React prototype with step-by-step wizard flow, input validation, and 3 distinct visual outcomes.

4. **Full application**: Evolved the prototype into the complete app with auth, onboarding, dashboard, trend charts, PDF reports, and internationalisation.

5. **Deployment**: Configured Vercel deployment with CI/CD from GitHub. Fully responsive, works on mobile and desktop.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Tailwind CSS 4 |
| Build | Vite |
| Charts | Recharts |
| Icons | Lucide React |
| Hosting | Vercel (auto-deploy from GitHub) |
| Flowcharts | Miro |
| Persistence | localStorage (Supabase-ready) |
| Languages | Italian + English |

## Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/psa-triage-assistant.git
cd psa-triage-assistant
npm install
npm run dev
```

Open `http://localhost:5173`

## What This Project Demonstrates

- Translating complex medical requirements into testable software rules
- Domain modelling: 7 clinical profiles × threshold logic × trend detection
- UX design for non-technical users (elderly patients)
- Full development lifecycle: domain analysis → flow modelling → prototyping → production → deployment
- Iterative design (5 flowchart versions, 2 app versions)

## License

This project is for demonstration and educational purposes.
