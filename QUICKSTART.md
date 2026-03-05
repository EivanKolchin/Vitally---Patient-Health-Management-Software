# Quick Start - Sepsis Sentinel

**Get up and running in 3 minutes!**

---

## 🚀 Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open your browser
# Navigate to http://localhost:3000
```

---

## 🎯 What You'll See

### Dashboard (Home Page)
- **3 patient cards** with color-coded risk indicators
- Click any patient to view details

### Patient Detail Page
- **Left Panel:**
  - Clinical Snapshot (vitals & labs)
  - Vitals Trend Chart
  - Clinical Timeline

- **Right Panel:**
  - Antibiotic Recommendations
  - Rationale (click "Show Rationale")
  - Clinical Note (click "Copy Note")

---

## 🎬 Demo the Killer Feature

1. Click on **Sarah Johnson** (High Risk patient)
2. Note her antibiotic recommendation: **Piperacillin-Tazobactam**
3. **Change the hospital dropdown** from "St. Mary's" to "University Medical Center"
4. **Watch the recommendation change** to **Meropenem**!

**Why?** Because University Medical Center has higher E. coli resistance (28% vs 12%)

This demonstrates **hospital-specific antibiotic stewardship** - the core value proposition!

---

## 📂 Key Files to Explore

### Clinical Logic (The Smart Stuff)
- `lib/clinical/riskScoring.ts` - Sepsis risk calculation
- `lib/clinical/recommendations.ts` - Antibiotic selection engine
- `lib/clinical/explanations.ts` - Rationale generator

### Data
- `data/patients.ts` - 3 synthetic patients
- `data/hospitals.ts` - 2 hospitals with different antibiograms

### UI Components
- `app/page.tsx` - Dashboard
- `app/patient/[id]/page.tsx` - Patient detail page
- `components/AntibioticPlan.tsx` - The recommendation card

### API
- `pages/api/patients/index.ts` - List all patients
- `pages/api/patients/[id].ts` - Get patient + recommendations

---

## 🎤 Explaining to Judges (30 seconds)

> "Sepsis Sentinel is a clinical decision support system that calculates sepsis risk and recommends antibiotics based on local hospital resistance patterns. Watch what happens when I switch hospitals—the recommendation changes from pip-tazo to meropenem because of higher resistance. This is real antibiotic stewardship using local data, which most hospitals don't do well today."

---

## 💡 Key Talking Points

1. **Problem:** Sepsis kills 270,000 Americans/year; early antibiotics cut mortality 50%
2. **Solution:** Automated risk scoring + smart antibiotic recommendations
3. **Innovation:** Hospital-specific recommendations based on local resistance
4. **Impact:** Saves lives, combats resistance, saves clinician time
5. **Tech:** Full-stack TypeScript, Next.js, Tailwind, deterministic clinical algorithms

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
PORT=3001 npm run dev
```

**Errors during install?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Page won't load?**
- Check console (F12) for errors
- Make sure dev server is running
- Try http://localhost:3000 in a different browser

---

## 📖 Next Steps

- **Full documentation:** See `README.md`
- **Demo script:** See `DEMO_SCRIPT.md` (5-minute walkthrough)
- **Installation help:** See `INSTALLATION.md`
- **Clinical evidence:** See `CLINICAL_EVIDENCE.md`

---

## 🏆 Ready to Win!

You now have:
- ✅ A working full-stack application
- ✅ Intelligent clinical algorithms
- ✅ Beautiful, modern UI
- ✅ A killer demo (hospital switching)
- ✅ Clear value proposition
- ✅ Comprehensive documentation

**Go show those judges what real clinical AI looks like! 🚀**

