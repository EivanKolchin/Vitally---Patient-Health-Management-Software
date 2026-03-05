# Sepsis Sentinel - Project Summary

**Built:** November 2024  
**Purpose:** Hackathon-ready clinical decision support system  
**Status:** ✅ Complete and ready to demo

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Dashboard   │  │   Patient    │  │ Components│ │
│  │   (List)     │  │   Detail     │  │  (shared) │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                         │
                    API Calls (fetch)
                         │
┌─────────────────────────────────────────────────────┐
│               API Routes (Next.js)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ GET /patients│  │GET /patients │  │GET /hosps │ │
│  │              │  │     /[id]    │  │           │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                         │
                    Function Calls
                         │
┌─────────────────────────────────────────────────────┐
│              Clinical Logic Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │Risk Scoring  │  │ Recommend.   │  │Explanation│ │
│  │   Engine     │  │   Engine     │  │ Generator │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────┘
                         │
                    Read Data
                         │
┌─────────────────────────────────────────────────────┐
│                 Data Layer (JSON)                   │
│  ┌──────────────┐  ┌──────────────┐                │
│  │   Patients   │  │  Hospitals   │                │
│  │  (3 records) │  │ (2 records)  │                │
│  └──────────────┘  └──────────────┘                │
└─────────────────────────────────────────────────────┘
```

---

## 🧠 Clinical Intelligence

### Risk Scoring Algorithm
- **Input:** Vitals (HR, BP, RR, Temp, SpO2) + Labs (WBC, Lactate, Creatinine)
- **Process:** Modified qSOFA scoring (5 criteria)
- **Output:** Risk category (Low/Moderate/High) + specific factors

### Antibiotic Recommendation Algorithm
- **Input:** Patient data, Hospital antibiogram, Risk score
- **Process:**
  1. Check for penicillin allergy → Meropenem
  2. Check hospital resistance rate → If >20%, prefer Meropenem
  3. Check renal function → Dose adjustment if Cr >150
  4. Generate primary + alternative regimens
- **Output:** Structured recommendation with dosing

### Explanation Generator
- **Input:** Patient, Recommendation, Risk score
- **Process:** Template-based generation (could be LLM in production)
- **Output:**
  - Short rationale (2-3 sentences)
  - Detailed rationale (paragraph)
  - Clinical note (EHR-ready)

---

## 📈 Data Flow Example

**Scenario:** User clicks on "Sarah Johnson"

1. **Frontend** → `GET /api/patients/patient_001?hospitalId=hospital_a`

2. **API Route** (`pages/api/patients/[id].ts`) →
   - Fetches patient data
   - Fetches hospital data
   - Calls `calculateSepsisRisk(patient)`
   - Calls `generateAntibioticRecommendation(patient, hospital, riskCategory)`
   - Calls `generateRecommendationExplanation(patient, recommendation, riskScore)`
   - Returns JSON with all computed data

3. **Frontend** → Renders patient detail page with:
   - Clinical snapshot
   - Charts
   - Timeline
   - Recommendation cards

4. **User changes hospital dropdown** →
   - Frontend calls same API with `hospitalId=hospital_b`
   - New recommendations computed
   - Page re-renders with updated data

---

## 🎯 Value Proposition

### For Clinicians
- **Saves Time:** Auto-generated clinical notes
- **Reduces Cognitive Load:** Clear recommendations, not raw data
- **Supports Decision-Making:** Transparent rationale
- **Improves Confidence:** Evidence-based suggestions

### For Hospitals
- **Improves Outcomes:** Early, appropriate antibiotics
- **Reduces Mortality:** Sepsis kills; we catch it early
- **Antibiotic Stewardship:** Local resistance-aware recommendations
- **Regulatory Compliance:** CMS Sepsis Core Measure (SEP-1)

### For Healthcare System
- **Cost Savings:** Reduced ICU stays, complications
- **Resistance Mitigation:** Smarter antibiotic use
- **Scalable:** Can deploy across hospital networks
- **Data-Driven:** Continuous improvement via analytics

---

## 💰 Business Model (For Judges)

### Revenue
- **SaaS Model:** $50k-$200k per hospital annually
- **Tiered Pricing:**
  - Basic: Single specialty (surgery)
  - Professional: Hospital-wide
  - Enterprise: Health system-wide + analytics

### ROI for Hospitals
- **Mortality reduction:** 5-10% sepsis mortality ↓ = $500k-$1M saved
- **Length of stay:** 1-2 days reduction = $200k-$400k saved
- **Antibiotic costs:** Better stewardship = $50k-$100k saved
- **Total:** $750k-$1.5M annual savings per hospital

### Market Size
- **US Hospitals:** 6,000+
- **TAM:** $300M-$1.2B
- **SAM (initial):** Large academic centers (300 hospitals) = $15M-$60M

---

## 🚀 Path to Production

### Phase 1: MVP Enhancement (3 months)
- [ ] EHR integration (HL7/FHIR)
- [ ] Real-time vital signs feed
- [ ] User authentication
- [ ] Database backend (PostgreSQL)
- [ ] Multi-hospital deployment

### Phase 2: Clinical Validation (6-12 months)
- [ ] IRB approval
- [ ] Pilot at 2-3 hospitals
- [ ] Prospective observational study
- [ ] Measure: Time to antibiotics, mortality, LOS
- [ ] Publish results

### Phase 3: Expansion (12-24 months)
- [ ] FDA 510(k) clearance (Class II medical device)
- [ ] Multi-specialty modules (pneumonia, UTI, etc.)
- [ ] Machine learning integration
- [ ] Mobile app
- [ ] National rollout

---

## 🏅 Competitive Advantages

1. **Local Data Integration:** Most systems use generic guidelines
2. **Explainable AI:** Transparency builds trust
3. **Workflow Integration:** Not just alerts; actionable recommendations
4. **Beautiful UX:** Clinicians will actually use it
5. **Full-Stack Demo:** Proves technical execution capability

---

## 📝 File Manifest

### Core Application
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `tailwind.config.ts` - Tailwind config
- `next.config.js` - Next.js config

### Frontend
- `app/page.tsx` - Dashboard
- `app/patient/[id]/page.tsx` - Patient detail
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles

### Components
- `components/ClinicalSnapshot.tsx`
- `components/VitalsChart.tsx`
- `components/Timeline.tsx`
- `components/AntibioticPlan.tsx`

### API Routes
- `pages/api/patients/index.ts`
- `pages/api/patients/[id].ts`
- `pages/api/hospitals/index.ts`

### Clinical Logic
- `lib/clinical/riskScoring.ts`
- `lib/clinical/recommendations.ts`
- `lib/clinical/explanations.ts`

### Data
- `data/patients.ts`
- `data/hospitals.ts`

### Types
- `types/index.ts`

### Documentation
- `README.md` - Main documentation
- `DEMO_SCRIPT.md` - 5-minute demo guide
- `INSTALLATION.md` - Setup instructions
- `QUICKSTART.md` - Fast start guide
- `CLINICAL_EVIDENCE.md` - Evidence base
- `PROJECT_SUMMARY.md` - This file
