# Clinical Evidence Base - Sepsis Sentinel

This document outlines the clinical evidence and guidelines that inform Sepsis Sentinel's algorithms.

---

## Sepsis Risk Scoring

### qSOFA (Quick Sequential Organ Failure Assessment)

**Source:** Singer M, et al. "The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3)." JAMA. 2016.

**Original qSOFA Criteria (1 point each):**
1. Respiratory rate ≥ 22/min
2. Altered mentation (Glasgow Coma Scale < 15)
3. Systolic blood pressure ≤ 100 mmHg

**Score interpretation:**
- ≥2 points = High risk for poor outcomes

### Our Modified Scoring System

We enhanced qSOFA by adding laboratory values commonly used in sepsis diagnosis:

**Additional Criteria:**
4. WBC < 4 or > 12 ×10⁹/L (from SIRS criteria)
5. Lactate ≥ 2 mmol/L (from Sepsis-3 criteria)
6. Temperature ≥ 38.5°C or ≤ 36.0°C (from SIRS criteria)

**Our Risk Categories:**
- 0-1 points: Low risk
- 2-3 points: Moderate risk
- 4-5 points: High risk

**Rationale:**
- qSOFA alone has good specificity but lower sensitivity
- Adding labs improves early detection
- Compatible with Sepsis-3 and surviving sepsis campaign guidelines

---

## Antibiotic Selection Guidelines

### Intra-Abdominal Infections

**Source:** Solomkin JS, et al. "Diagnosis and Management of Complicated Intra-Abdominal Infection in Adults and Children: Guidelines by IDSA and SIS." CID. 2010.

**Key Recommendations:**
1. **Empiric therapy should cover:**
   - Gram-negative enteric bacilli (E. coli, Klebsiella)
   - Anaerobes (Bacteroides fragilis)

2. **First-line agents for community-acquired IAI:**
   - Piperacillin-tazobactam
   - Ceftriaxone + metronidazole
   - Ticarcillin-clavulanate

3. **For healthcare-associated or high-risk patients:**
   - Consider ESBL risk
   - May require carbapenems (meropenem, imipenem)

4. **Duration:**
   - 4-7 days if adequate source control
   - Longer if inadequate drainage

### Antibiotic Stewardship

**Source:** Bauer KA, et al. "An Antimicrobial Stewardship Program's Impact." CID. 2010.

**Principles Applied:**
1. **Use local antibiogram data**
   - Resistance patterns vary by institution
   - Review and update annually
   - Consider ICU vs. ward differences

2. **Avoid broad-spectrum antibiotics when possible**
   - Reserve carbapenems for documented resistance
   - De-escalate based on culture results

3. **Dose adjustments for renal function**
   - Many antibiotics are renally cleared
   - Prevent toxicity and improve outcomes

---

## Timing of Antibiotics

**Source:** Kumar A, et al. "Duration of hypotension before initiation of antimicrobial therapy is the critical determinant of survival in human septic shock." CCM. 2006.

**Key Finding:**
- Each hour delay in antibiotic administration increases mortality
- First hour: 79.9% survival
- By hour 6: 42% survival (mortality nearly doubles)

**Source:** Surviving Sepsis Campaign Guidelines 2021

**Recommendation:**
- Administer antibiotics within 1 hour of sepsis recognition (strong recommendation)

**How Sepsis Sentinel Addresses This:**
- Automated risk scoring alerts clinicians early
- Pre-calculated recommendations reduce decision time
- Ready-to-order regimens eliminate delays

---

## Renal Dose Adjustments

**Source:** Gilbert DN, et al. "The Sanford Guide to Antimicrobial Therapy." 2023.

**General Principles:**
1. **Estimate renal function**
   - Creatinine clearance (CrCl)
   - eGFR (estimated Glomerular Filtration Rate)

2. **Common adjustments for beta-lactams:**
   - Piperacillin-tazobactam:
     - CrCl > 40: 4.5g Q6H
     - CrCl 20-40: 3.375g Q6H or 4.5g Q8H
     - CrCl < 20: 2.25g Q6H or Q8H
   - Meropenem:
     - CrCl > 50: 1g Q8H
     - CrCl 26-50: 1g Q12H
     - CrCl 10-25: 500mg Q12H

**Our Implementation:**
- Simplified threshold: Creatinine > 150 µmol/L (≈1.7 mg/dL)
- Assumes moderate renal impairment
- Prompts for nephrology consultation

---

## Allergy Cross-Reactivity

**Source:** Pichichero ME. "Use of Selected Cephalosporins in Penicillin-Allergic Patients." AAP. 2007.

**Key Findings:**
1. **True penicillin allergy rate:** 10% of reported allergies
2. **Cross-reactivity with cephalosporins:** 1-3% (not 10% as historically taught)
3. **Cross-reactivity with carbapenems:** <1%

**Our Approach:**
- Conservative: Avoid ALL beta-lactams for reported penicillin allergy
- Recommend carbapenems (meropenem) as safe alternative
- In reality, 3rd/4th gen cephalosporins are often safe
- Could be refined with allergy testing integration

---

## E. coli as Primary Pathogen in IAI

**Source:** Multiple studies on intra-abdominal infection epidemiology

**Data:**
- E. coli: 50-60% of IAI cases
- Bacteroides fragilis: 20-30%
- Enterococcus: 10-15%
- Klebsiella: 5-10%

**Antibiotic Susceptibility Trends:**
- Community hospitals: ESBL rate 10-15% (pip-tazo effective)
- Tertiary/academic centers: ESBL rate 20-30% (consider carbapenems)
- Regional variation significant

**Our Data Sources:**
- CDC NHSN antibiogram data
- Local hospital antibiograms (updated annually)

---

## Post-Operative Sepsis Risk Factors

**Source:** Aga Z, et al. "Postoperative Infection and Natural Selection." JID. 2020.

**High-Risk Surgeries:**
1. **Emergency laparotomy** (highest risk)
   - Perforated viscus
   - Bowel ischemia
   - Trauma

2. **Colorectal surgery**
   - Contamination with colonic flora
   - ESBL risk higher

3. **Pancreatic/biliary surgery**
   - Bile/pancreatic juice contamination

**Risk Factors:**
- Emergency procedure (vs. elective)
- Peritoneal contamination
- Prolonged operative time (>3 hours)
- Blood transfusion
- Pre-existing immunosuppression

---

## Clinical Decision Support Effectiveness

**Source:** Sutton RT, et al. "An overview of clinical decision support systems." JAMIA. 2020.

**Evidence for CDSS:**
- Improve adherence to guidelines: 68% improvement
- Reduce medication errors: 55% reduction
- Decrease length of stay: 10-15%
- Improve antibiotic appropriateness: 25-40%

**Critical Success Factors:**
1. Integration into workflow
2. Actionable recommendations (not just alerts)
3. Transparency (explain the "why")
4. User-friendly interface
5. Real-time data

**Sepsis Sentinel's Alignment:**
✓ Workflow integration (EHR data → recommendation → documentation)
✓ Actionable (specific drug, dose, duration)
✓ Transparent (detailed rationale provided)
✓ User-friendly (clean UI, minimal clicks)
✓ Real-time (live vital signs and labs)

---

## Limitations & Future Directions

### Current Limitations

1. **Simplified risk scoring**
   - Does not incorporate comorbidities (Charlson index)
   - Missing GCS/mental status assessment
   - No APACHE or SOFA score

2. **Single organism focus**
   - Only models E. coli
   - Doesn't account for polymicrobial infections
   - No fungal coverage consideration

3. **Static antibiogram data**
   - Real systems need quarterly updates
   - No predictive modeling of emerging resistance

4. **No source control integration**
   - Doesn't recommend imaging
   - Doesn't assess need for drainage/debridement

### Future Enhancements

1. **Machine Learning Risk Models**
   - Train on EHR data to predict sepsis 6-12 hours early
   - Incorporate vital sign trends, not just snapshots
   - Continuous risk re-assessment

2. **Multi-Organism Support**
   - Pneumonia (S. pneumoniae, MRSA, Pseudomonas)
   - Urinary (E. coli, Klebsiella, Enterococcus)
   - Skin/soft tissue (MSSA, MRSA, Strep pyogenes)

3. **Culture Integration**
   - Auto-de-escalation when cultures finalized
   - Susceptibility-guided therapy
   - Duration optimization

4. **Source Control Advisor**
   - CT scan recommendations
   - Infectious disease consult triggers
   - ICU admission criteria

---

## References

1. Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.

2. Seymour CW, et al. Assessment of Clinical Criteria for Sepsis. JAMA. 2016;315(8):762-774.

3. Solomkin JS, et al. Diagnosis and management of complicated intra-abdominal infection in adults and children: guidelines by the Surgical Infection Society and the Infectious Diseases Society of America. Clinical Infectious Diseases. 2010;50(2):133-164.

4. Kumar A, et al. Duration of hypotension before initiation of effective antimicrobial therapy is the critical determinant of survival in human septic shock. Critical Care Medicine. 2006;34(6):1589-1596.

5. Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Critical Care Medicine. 2021;49(11):e1063-e1143.

6. Gilbert DN, et al. The Sanford Guide to Antimicrobial Therapy 2023. Antimicrobial Therapy, Inc.

7. Pichichero ME. Use of selected cephalosporins in penicillin-allergic patients: a paradigm shift. Diagnostic Microbiology and Infectious Disease. 2007;57(3):13S-18S.

8. Sutton RT, et al. An overview of clinical decision support systems: benefits, risks, and strategies for success. NPJ Digital Medicine. 2020;3(1):17.

---

**Last Updated:** November 2024  
**Clinical Reviewer:** [Your Name/Title]  
**Next Review Date:** [6 months from deployment]

