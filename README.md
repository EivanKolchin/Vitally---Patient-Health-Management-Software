# Sepsis Sentinel 🏥 - A Clinica-data Hackathon build with Heidi

**Clinical Decision Support System for Post-Operative Sepsis Management**

A full-stack web application that helps clinicians identify and manage post-operative intra-abdominal sepsis through intelligent risk scoring, hospital-specific antibiotic recommendations, and transparent clinical reasoning.

---

## 🌟 Key Features

### 1. **Intelligent Sepsis Risk Scoring**
- Modified qSOFA-based scoring system
- Real-time risk categorization (Low / Moderate / High)
- Tracks 5 critical clinical parameters:
  - Systolic Blood Pressure < 100 mmHg
  - Respiratory Rate ≥ 22/min
  - WBC < 4 or > 12 ×10⁹/L
  - Lactate ≥ 2 mmol/L
  - Temperature ≥ 38.5°C or ≤ 36.0°C

### 2. **Hospital-Specific Antibiotic Recommendations**
- Integrates local antibiogram data (resistance patterns)
- Tailored recommendations based on:
  - E. coli resistance rates at specific hospitals
  - Patient allergies (penicillin)
  - Renal function (creatinine-based dosing adjustments)
- Primary and alternative regimens provided

### 3. **Transparent Clinical Reasoning**
- Short rationale (2-3 sentence summary)
- Detailed clinical explanation
- Ready-to-paste clinical note for EHR
- Clear documentation of decision factors

### 4. **Live Hospital Switching Demo**
- Switch between hospitals to see real-time recommendation changes
- Demonstrates impact of local resistance patterns
- Perfect for hackathon demonstrations

### 5. **Beautiful, Modern UI**
- Clean, professional design with Tailwind CSS
- Intuitive dashboard with color-coded risk indicators
- Interactive vital signs charts
- Timeline view of clinical events
- Responsive layout for all screen sizes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

#### Windows (Easiest!)

1. **Double-click `start.bat`**
   - Automatically installs dependencies (first time only)
   - Starts the development server
   - Opens the app in your browser

2. **To stop the server:**
   - Run `stop.bat` or press Ctrl+C

#### Manual Installation (All Platforms)

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Pre-Demo Testing

Before your hackathon presentation, run:
```bash
test-demo.bat
```

This will verify all features are working correctly.

### Building for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
sepsis-sentinel/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Dashboard (patient list)
│   ├── patient/[id]/page.tsx     # Patient detail view
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── pages/api/                    # API routes
│   ├── patients/
│   │   ├── index.ts              # GET all patients
│   │   └── [id].ts               # GET patient details + recommendations
│   └── hospitals/
│       └── index.ts              # GET hospital list
├── components/                   # React components
│   ├── ClinicalSnapshot.tsx      # Vitals & labs display
│   ├── VitalsChart.tsx           # Interactive charts
│   ├── Timeline.tsx              # Clinical event timeline
│   └── AntibioticPlan.tsx        # Recommendation display
├── lib/clinical/                 # Clinical logic
│   ├── riskScoring.ts            # Sepsis risk calculation
│   ├── recommendations.ts        # Antibiotic recommendation engine
│   └── explanations.ts           # Rationale generator
├── data/                         # Synthetic data
│   ├── patients.ts               # 3 synthetic patients
│   └── hospitals.ts              # 2 hospitals with antibiograms
├── types/                        # TypeScript definitions
│   └── index.ts                  # Core type definitions
└── README.md                     # This file
```

---

## 🔬 Clinical Logic Explained

### Sepsis Risk Scoring Algorithm

The app uses a **modified qSOFA-like scoring system**:

```
Score = 0 initially

Add 1 point for each of the following:
  ✓ SBP < 100 mmHg
  ✓ RR ≥ 22/min
  ✓ WBC < 4 or > 12 ×10⁹/L
  ✓ Lactate ≥ 2 mmol/L
  ✓ Temperature ≥ 38.5°C or ≤ 36.0°C

Risk Category:
  • 0-1 points → Low Risk
  • 2-3 points → Moderate Risk
  • 4-5 points → High Risk
```

**Implementation:** See `lib/clinical/riskScoring.ts`

---

### Antibiotic Recommendation Logic

**Condition:** Post-operative intra-abdominal sepsis  
**Likely Organism:** *E. coli*  
**Coverage Needed:** Gram-negative + anaerobic

**Decision Tree:**

1. **Check for Penicillin Allergy**
   - If YES → Meropenem (carbapenem class)
   - If NO → Continue

2. **Check Hospital Antibiogram**
   - Get E. coli resistance to pip-tazo at this hospital
   - If resistance > 20% → Prefer Meropenem
   - If resistance ≤ 20% → Piperacillin-Tazobactam

3. **Check Renal Function**
   - Get latest creatinine
   - If Cr > 150 µmol/L → Adjust dose/frequency
   - Add notes about renal dosing

4. **Provide Alternative Regimen**
   - Always include a backup option
   - Explain when to escalate

**Implementation:** See `lib/clinical/recommendations.ts`

---

### Explanation Generator

The rationale generator creates:
1. **Short Rationale** (2-3 sentences) - Quick summary
2. **Detailed Rationale** (paragraph) - Full clinical reasoning
3. **Clinical Note** (structured text) - EHR-ready documentation

**Template includes:**
- Patient demographics and surgery
- Sepsis risk assessment with specific vitals/labs
- Antibiotic selection rationale
- Resistance patterns at the hospital
- Allergy and renal considerations
- Management plan

**Implementation:** See `lib/clinical/explanations.ts`

---

## 🗄️ Synthetic Data

### Patients

1. **Sarah Johnson** (High Risk)
   - 67yo F
   - Emergency laparotomy for perforated diverticulitis
   - 24h post-op
   - 5/5 risk factors (SBP 92, RR 28, Temp 39.2, WBC 18.5, Lactate 3.8)
   - No allergies
   - Elevated creatinine (145)

2. **Michael Chen** (Moderate Risk)
   - 52yo M
   - Laparoscopic cholecystectomy
   - 48h post-op
   - 3/5 risk factors
   - **Penicillin allergy**
   - Normal renal function

3. **Emily Rodriguez** (Low Risk)
   - 34yo F
   - Laparoscopic appendicectomy
   - 12h post-op
   - 0/5 risk factors
   - Stable vitals
   - No allergies

### Hospitals

1. **St. Mary's General Hospital**
   - E. coli resistance to pip-tazo: **12%** (low)
   - Meropenem resistance: 2%

2. **University Medical Center**
   - E. coli resistance to pip-tazo: **28%** (high, >20%)
   - Meropenem resistance: 3%
   - Higher ESBL prevalence

**Data files:** `data/patients.ts` and `data/hospitals.ts`

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Next.js 14, TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Backend:** Next.js API Routes (serverless functions)
- **Data:** In-memory JSON (no database required for demo)

---

## 🎨 UI/UX Highlights

### Color Coding
- 🟢 **Green** - Low risk, stable
- 🟠 **Amber** - Moderate risk, concerning
- 🔴 **Red** - High risk, critical

### Key Design Patterns
- **Card-based layout** - Clean separation of concerns
- **Responsive grid** - Works on desktop, tablet, mobile
- **Interactive charts** - Visual vital signs trends
- **Timeline view** - Chronological clinical events
- **Copy-to-clipboard** - One-click clinical note export
- **Live updates** - Hospital switching without page reload

### Safety Features
- Prominent "Demo only" warning banner
- Red alerts for patient allergies
- Highlighted abnormal values in Clinical Snapshot

---

## 🔐 Safety & Disclaimer

**⚠️ IMPORTANT: This is a demonstration application only.**

- **NOT FDA approved**
- **NOT for real clinical use**
- **NOT a substitute for clinical judgment**
- **NOT validated against clinical outcomes**

This app is designed for:
- Educational purposes
- Hackathon demonstrations
- Proof-of-concept for clinical decision support
- Research and development

---

## 🚀 Future Enhancements

### Clinical Features
- [ ] Real-time vital signs integration (HL7/FHIR)
- [ ] Machine learning risk prediction
- [ ] Source control recommendations (imaging, drainage)
- [ ] Fluid resuscitation calculator
- [ ] Sepsis bundle compliance tracking
- [ ] Culture results integration

### Technical Features
- [ ] Real LLM integration (OpenAI GPT-4) for explanations
- [ ] Database backend (PostgreSQL)
- [ ] User authentication
- [ ] Multi-hospital deployment
- [ ] EHR integration (Epic, Cerner)
- [ ] Mobile app (React Native)

### Stewardship Features
- [ ] Antibiotic de-escalation prompts
- [ ] Cost analysis
- [ ] Resistance trend tracking
- [ ] Peer comparison metrics

---

## 🤝 Contributing

This is a hackathon project! If you'd like to extend or improve it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is provided as-is for educational and demonstration purposes.
