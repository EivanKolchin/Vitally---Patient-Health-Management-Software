# Sepsis Sentinel - 5-Minute Demo Script

**For Hackathon Judges**

---

## ⏱️ Timing: 3-5 minutes total

---

## 🎬 STEP 1: Dashboard (30 sec)

**Action:** Open http://localhost:3000

**Point out:**
- "We have 3 post-operative patients being monitored"
- "Each card shows real-time sepsis risk: Green (low), Amber (moderate), Red (high)"
- "Notice the surgery types and time post-op"

**Say:**
> *"Sepsis Sentinel automatically monitors post-operative patients and calculates sepsis risk based on vital signs and lab values. Let's look at our high-risk patient."*

---

## 🔴 STEP 2: High-Risk Patient - Sarah Johnson (90 sec)

**Action:** Click on Sarah Johnson

**Point out LEFT panel:**
1. **Patient Header:**
   - "67-year-old female, 24 hours after emergency bowel surgery"
   - "HIGH RISK - 5 out of 5 sepsis criteria"

2. **Clinical Snapshot (scroll through):**
   - "Red highlights show abnormal values"
   - "Blood pressure dropping to 92"
   - "Respiratory rate elevated at 28"
   - "Fever of 39.2 degrees"
   - "White count 18.5, Lactate 3.8"

3. **Chart:**
   - "You can see her vitals deteriorating over 24 hours"

4. **Timeline:**
   - "Timeline shows surgery, lab draws, and fever spikes"

**Say:**
> *"Sarah has all 5 sepsis risk factors. She's in trouble and needs antibiotics immediately. But which antibiotics?"*

---

## 💊 STEP 3: Antibiotic Recommendation (60 sec)

**Action:** Scroll to right panel

**Point out:**
1. **Blue summary box:**
   - "System recommends this is HIGH RISK, needs intra-abdominal coverage"

2. **Primary Regimen (green card):**
   - "Piperacillin-Tazobactam 4.5g IV every 6 hours"
   - "Notice the NOTE: dose adjusted for her kidney function"
   - "Creatinine is 145, so we're spacing doses"

3. **Antibiogram box:**
   - "At St. Mary's Hospital, E. coli resistance to pip-tazo is only 12%"
   - "Low resistance = safe to use"

**Action:** Click "Show Rationale"

**Point out:**
- "Full clinical explanation"
- "References specific vital signs"
- "Explains why this drug was chosen"
- "Mentions renal adjustment"

**Action:** Click "Copy Note"

**Point out:**
- "Generated clinical note"
- "Ready to paste into the medical record"
- "Includes assessment and full plan"

**Say:**
> *"The recommendation is transparent, evidence-based, and ready to use. But here's the really cool part..."*

---

## 🏥 STEP 4: Hospital Switching - THE KILLER DEMO (90 sec)

**Action:** Change hospital dropdown from "St. Mary's" to "University Medical Center"

**Wait for page to update (1-2 seconds)**

**Point out (with enthusiasm):**

1. **Primary regimen CHANGED:**
   - "It's now recommending Meropenem instead!"
   - "Different hospital, different recommendation"

2. **Scroll to antibiogram box:**
   - "Look: at University Medical Center, pip-tazo resistance is 28%"
   - "That's above our 20% safety threshold"
   - "System automatically switches to a carbapenem"

3. **Scroll to rationale:**
   - "Explanation updated to mention high ESBL rates at this hospital"

**Say:**
> *"THIS is why Sepsis Sentinel matters. The same patient, but at a hospital with different resistance patterns, gets a DIFFERENT antibiotic. This is REAL antibiotic stewardship—using LOCAL DATA to guide therapy. Most hospitals don't do this well, and it leads to treatment failures and increased resistance."*

---

## 🔶 STEP 5: Allergies (30 sec, if time)

**Action:** Go back to dashboard, click Michael Chen

**Point out:**
- "Red allergy alert: Penicillin allergy"
- "System automatically recommends Meropenem"
- "Won't give pip-tazo to someone with penicillin allergy"

**Say:**
> *"The system also handles patient-specific factors like allergies intelligently."*

---

## 🎯 CLOSING (30 sec)

**Action:** Return to dashboard

**Say:**
> *"To recap: Sepsis Sentinel combines clinical scoring, local antibiogram data, and patient-specific factors to provide SMART, EXPLAINABLE antibiotic recommendations. It's designed to:*
> - *Save lives through early, appropriate therapy*
> - *Combat antibiotic resistance through stewardship*
> - *Save clinician time with auto-generated documentation*
> - *Scale across hospital networks*
>
> *Sepsis kills 270,000 Americans every year. Early, appropriate antibiotics reduce mortality by 50%. This tool makes that happen. Thank you!"*

---

## 🎤 Q&A Prep

**Expected Questions:**

**Q: "Is this real data?"**
A: "The patients are synthetic for the demo, but the clinical logic is real—based on qSOFA criteria and IDSA guidelines. In production, this would integrate with EHR systems via HL7 or FHIR."

**Q: "How do you get antibiogram data?"**
A: "Every hospital publishes annual antibiograms. We'd import that data. For the demo, we created realistic resistance profiles: a community hospital (12% resistance) vs. a tertiary center (28% resistance)."

**Q: "What about other organisms?"**
A: "We focused on intra-abdominal sepsis where E. coli is most common. The system is extensible—you could add modules for pneumonia (Strep pneumo, Staph), UTI, etc."

**Q: "How does this make money?"**
A: "SaaS model: license to hospitals. ROI comes from reduced mortality, shorter ICU stays, and better antibiotic stewardship metrics (which CMS tracks). A single prevented sepsis death saves $20,000-$50,000."

**Q: "What about AI/LLM integration?"**
A: "The explanation generator is currently template-based, but we have a clear integration point for OpenAI GPT-4 or Med-PaLM. That would make the rationales even more nuanced and conversational."

---

## 📋 Pre-Demo Checklist

- [ ] App is running on localhost:3000
- [ ] Browser window is full-screen or projected
- [ ] Have backup demo video (if possible)
- [ ] Water nearby
- [ ] Practiced timing (aim for 4 minutes, leaves 1 min for Q&A)

---

## 🏆 Why This Wins

1. **Solves a HUGE problem** - Sepsis is deadly and expensive
2. **Shows REAL intelligence** - Not just displaying data; making clinical decisions
3. **Demonstrates clear VALUE** - Hospital switching shows obvious benefit
4. **Beautiful execution** - Clean UI, smooth demo
5. **Technically impressive** - Full stack, TypeScript, smart algorithms
6. **Ready to deploy** - Clear path to production

---

**GO WIN THAT HACKATHON! 🚀**

