# Sepsis Sentinel 🏥

**Clinical Decision Support System for Post-Operative Sepsis Management**

A hackathon-ready, full-stack web application that helps clinicians identify and manage post-operative intra-abdominal sepsis through intelligent risk scoring, hospital-specific antibiotic recommendations, and transparent clinical reasoning.

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
   - Done! ✅

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

## 🆕 What's New (Hackathon Edition)

### New Features Added
✅ **About Page** - Compelling explanation of the clinical problem and solution
✅ **Enhanced Animations** - Smooth fade-in effects and hover states
✅ **Batch Files** - One-click start/stop for Windows users
✅ **Pre-Demo Test Script** - Verify everything works before presenting
✅ **Winning Strategy Guide** - Complete hackathon presentation playbook
✅ **Hackathon Pitch Document** - 60-second pitch + judge Q&A responses

### New Documentation
- `HACKATHON_PITCH.md` - Complete pitch script with timing
- `WINNING_STRATEGY.md` - How to win with your presentation
- `start.bat` / `stop.bat` - One-click server control
- `test-demo.bat` - Pre-presentation testing

### UI Enhancements
- Sticky header on dashboard
- "About" link in navigation
- Smooth card animations on load
- Enhanced loading states with messages
- Better hover effects (scale + shadow)

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

## 🎯 Demo Script for Hackathon Judges

**Goal:** Showcase the app's clinical intelligence and real-world utility in 3-5 minutes.

### Step 1: Dashboard Overview (30 seconds)
1. Open the dashboard at http://localhost:3000
2. Point out:
   - **3 post-operative patients** with different risk levels
   - **Color-coded risk indicators** (green/amber/red)
   - **Key patient info**: surgery type, time post-op, hospital

> **Say:** "Sepsis Sentinel monitors post-operative patients and calculates real-time sepsis risk scores based on vital signs and lab values."

---

### Step 2: High-Risk Patient Deep Dive (90 seconds)
1. Click on **Sarah Johnson** (High Risk patient)
2. Highlight the **patient header**:
   - 67-year-old female
   - Emergency laparotomy for perforated diverticulitis
   - 24 hours post-op
   - **HIGH RISK (5/5 score)**

3. Point to **Clinical Snapshot** (left panel):
   - Red-highlighted abnormal values:
     - SBP 92 mmHg (hypotension)
     - RR 28/min (tachypnea)
     - Temp 39.2°C (fever)
     - WBC 18.5 (leukocytosis)
     - Lactate 3.8 (elevated)

4. Show **Vitals Trend Chart**:
   - Deteriorating trend over 24 hours
   - Rising heart rate, dropping BP, fever spike

5. Show **Timeline**:
   - Surgery → Lab draws → Fever spikes
   - Active risk factors displayed

> **Say:** "Sarah has 5 sepsis risk factors. Her vitals are deteriorating, and she needs immediate antibiotic therapy."

---

### Step 3: Antibiotic Recommendation (60 seconds)
1. Scroll to **Recommended Antibiotic Regimen** (right panel)
2. Highlight:
   - **Primary regimen**: Piperacillin-Tazobactam 4.5g IV Q6H for 7 days
   - **Renal adjustment note**: Dose interval extended due to elevated creatinine
   - **Local antibiogram data**: Shows E. coli resistance at St. Mary's is only 12%

3. Click **Show Rationale**:
   - Read key points from the detailed explanation
   - Mentions risk category, organism, resistance patterns, renal adjustment

4. Click **Copy Note**:
   - Show the generated clinical note
   - Ready to paste into EHR

> **Say:** "The system recommends pip-tazo based on low resistance at this hospital and adjusts dosing for her renal impairment. The rationale is transparent and the note is ready to use."

---

### Step 4: Hospital Switching - THE KILLER DEMO (90 seconds)
1. **Change the hospital dropdown** from "St. Mary's General Hospital" to "University Medical Center"
2. **Watch the page update in real-time**
3. Point out the changes:
   - **Primary regimen NOW changes to Meropenem**
   - **Rationale updates** to explain:
     - High pip-tazo resistance (28%) at University Medical Center
     - Meropenem preferred due to ESBL concerns
   - **Antibiogram data shows the difference**: 12% vs 28% resistance

> **Say:** "This is the power of Sepsis Sentinel. At a different hospital with higher resistance rates, the system automatically recommends a carbapenem instead. This ensures appropriate therapy based on LOCAL data—which is critical for antibiotic stewardship."

---

### Step 5: Moderate Risk Patient (Optional, 30 seconds)
1. Go back to dashboard
2. Click on **Michael Chen** (Moderate Risk)
3. Show:
   - Penicillin allergy alert in red
   - Recommendation is **Meropenem** (avoiding penicillin)
   - Alternative regimen provided

> **Say:** "The system also handles patient allergies intelligently, automatically selecting safe alternatives."

---

### Step 6: Low Risk Patient (Optional, 15 seconds)
1. Show **Emily Rodriguez** (Low Risk)
2. Stable vitals, low risk score
3. Recommendation still provided (pip-tazo), but less urgent

> **Say:** "Even for stable patients, we provide evidence-based recommendations for early intervention if needed."

---

### Closing (15 seconds)
> **Say:** "Sepsis Sentinel combines clinical algorithms, local resistance data, and patient-specific factors to provide intelligent, explainable antibiotic recommendations. It's designed to improve patient outcomes, support antibiotic stewardship, and save clinician time. Thank you!"

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

---

## 👥 Credits

Built with ❤️ for the hackathon.

**Technologies Used:**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

---

## 📞 Support

For questions or issues:
- Check the code comments (extensively documented)
- Review the clinical logic files in `lib/clinical/`
- Inspect the data files in `data/`

---

## 🏆 Winning This Hackathon

### Why Sepsis Sentinel Stands Out

1. **Real Clinical Problem** - Sepsis kills 270,000 Americans/year
2. **Intelligent Solution** - Not just data display; actual clinical reasoning
3. **Actionable Output** - Ready-to-use recommendations and notes
4. **Evidence-Based** - Uses real clinical criteria and antibiogram data
5. **Transparent AI** - Explains every decision
6. **Beautiful UX** - Clinicians will actually want to use this
7. **Demo-Ready** - Hospital switching shows clear value
8. **Extensible** - Clear path to production deployment

### Key Talking Points

- **"This saves lives."** - Early, appropriate antibiotics reduce sepsis mortality by 50%
- **"This combats resistance."** - Stewardship through local antibiogram integration
- **"This saves time."** - Auto-generated clinical notes
- **"This scales."** - Can be deployed across hospital networks
- **"This is explainable."** - Not a black box; clinicians trust it

---

**Good luck at your hackathon! 🚀**
