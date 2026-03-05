import {
  Patient,
  AntibioticRecommendation,
  RecommendationExplanation,
  SepsisRiskScore,
} from "@/types";
import { getLatestVitals, getLatestLabs } from "./riskScoring";

/**
 * Generate human-readable explanation and clinical note
 * This is a deterministic templating function that could be replaced
 * with an LLM call in production.
 */
export function generateRecommendationExplanation(
  patient: Patient,
  recommendation: AntibioticRecommendation,
  riskScore: SepsisRiskScore
): RecommendationExplanation {
  const vitals = getLatestVitals(patient);
  const labs = getLatestLabs(patient);
  const { rationaleInputs } = recommendation;

  // Build short rationale (2-3 sentences)
  const shortRationale = buildShortRationale(
    riskScore,
    rationaleInputs,
    recommendation
  );

  // Build detailed rationale (longer explanation)
  const detailedRationale = buildDetailedRationale(
    patient,
    riskScore,
    vitals,
    labs,
    rationaleInputs,
    recommendation
  );

  // Build clinical note text
  const noteText = buildClinicalNote(
    patient,
    riskScore,
    vitals,
    labs,
    recommendation
  );

  return {
    shortRationale,
    detailedRationale,
    noteText,
  };
}

function buildShortRationale(
  riskScore: SepsisRiskScore,
  inputs: AntibioticRecommendation["rationaleInputs"],
  rec: AntibioticRecommendation
): string {
  const { riskCategory, penicillinAllergy } = inputs;
  const primaryAb = rec.primaryRegimen.antibioticName;

  let text = `This patient is at ${riskCategory} risk for sepsis (score: ${riskScore.totalScore}/5). `;

  if (penicillinAllergy) {
    text += `Due to documented penicillin allergy, ${primaryAb} is recommended as first-line therapy. `;
  } else {
    text += `${primaryAb} is recommended based on local antibiogram data. `;
  }

  text += `The regimen targets likely intra-abdominal pathogens including ${inputs.organism}.`;

  return text;
}

function buildDetailedRationale(
  patient: Patient,
  riskScore: SepsisRiskScore,
  vitals: ReturnType<typeof getLatestVitals>,
  labs: ReturnType<typeof getLatestLabs>,
  inputs: AntibioticRecommendation["rationaleInputs"],
  rec: AntibioticRecommendation
): string {
  let text = `**Clinical Assessment:**\n\n`;

  text += `${patient.name} is a ${patient.age}-year-old ${
    patient.sex === "M" ? "male" : "female"
  } who is ${patient.timeSinceSurgeryHours} hours post-${
    patient.surgeryType
  }. `;

  // Risk factors
  text += `The patient has ${riskScore.totalScore} sepsis risk factors:\n`;
  const factors = [];
  if (riskScore.factors.lowSBP) {
    factors.push(`- Hypotension (SBP ${vitals.SBP} mmHg)`);
  }
  if (riskScore.factors.highRR) {
    factors.push(`- Tachypnea (RR ${vitals.RR}/min)`);
  }
  if (riskScore.factors.abnormalWBC) {
    factors.push(`- Leukocytosis/leukopenia (WBC ${labs.WBC} ×10⁹/L)`);
  }
  if (riskScore.factors.elevatedLactate) {
    factors.push(`- Elevated lactate (${labs.LACTATE} mmol/L)`);
  }
  if (riskScore.factors.abnormalTemp) {
    factors.push(`- Fever or hypothermia (Temp ${vitals.TEMP}°C)`);
  }
  if (factors.length > 0) {
    text += factors.join("\n") + "\n";
  } else {
    text += "- No significant sepsis criteria met at this time.\n";
  }

  text += `\nThis places the patient in the **${inputs.riskCategory.toUpperCase()} RISK** category.\n\n`;

  // Antibiotic rationale
  text += `**Antibiotic Selection:**\n\n`;

  text += `For post-operative intra-abdominal sepsis, the most likely organism is ${inputs.organism}. `;

  text += `${inputs.resistanceSummary} `;

  if (inputs.penicillinAllergy) {
    text += `Given the patient's documented penicillin allergy, beta-lactam antibiotics including piperacillin-tazobactam are contraindicated. `;
    text += `${rec.primaryRegimen.antibioticName} is therefore selected as the primary empiric therapy. `;
  } else {
    text += `${rec.primaryRegimen.antibioticName} provides excellent coverage for intra-abdominal pathogens and is chosen based on favorable local susceptibility patterns. `;
  }

  // Renal considerations
  if (inputs.creatinine && inputs.creatinine > 150) {
    text += `\n\n**Renal Function:** Creatinine is elevated at ${inputs.creatinine} µmol/L. Dosing has been adjusted to account for reduced renal clearance. Close monitoring of renal function and antibiotic levels (if available) is recommended.`;
  }

  // Alternative
  if (rec.alternativeRegimen) {
    text += `\n\n**Alternative Regimen:** ${rec.alternativeRegimen.antibioticName} is listed as an alternative should the patient not respond to initial therapy or if specific contraindications arise.`;
  }

  return text;
}

function buildClinicalNote(
  patient: Patient,
  riskScore: SepsisRiskScore,
  vitals: ReturnType<typeof getLatestVitals>,
  labs: ReturnType<typeof getLatestLabs>,
  rec: AntibioticRecommendation
): string {
  const now = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  let note = `CLINICAL NOTE - SEPSIS ASSESSMENT\n`;
  note += `Date/Time: ${now}\n`;
  note += `Patient: ${patient.name}, ${patient.age}yo ${patient.sex}\n`;
  note += `Surgery: ${patient.surgeryType} (${patient.timeSinceSurgeryHours}h post-op)\n`;
  note += `\n`;

  note += `SEPSIS RISK: ${riskScore.riskCategory.toUpperCase()} (Score: ${
    riskScore.totalScore
  }/5)\n`;
  note += `\n`;

  note += `VITAL SIGNS:\n`;
  note += `  HR: ${vitals.HR} bpm | BP: ${vitals.SBP}/${vitals.DBP} mmHg | RR: ${vitals.RR}/min\n`;
  note += `  Temp: ${vitals.TEMP}°C | SpO2: ${vitals.SPO2}%\n`;
  note += `\n`;

  note += `LABS:\n`;
  note += `  WBC: ${labs.WBC} ×10⁹/L | Lactate: ${labs.LACTATE} mmol/L | Cr: ${labs.CREATININE} µmol/L\n`;
  note += `\n`;

  note += `ASSESSMENT:\n`;
  note += `  Post-operative intra-abdominal sepsis, ${riskScore.riskCategory} risk.\n`;
  if (patient.allergies.penicillin) {
    note += `  Known penicillin allergy.\n`;
  }
  if (labs.CREATININE && labs.CREATININE > 150) {
    note += `  Renal impairment noted (Cr ${labs.CREATININE}).\n`;
  }
  note += `\n`;

  note += `PLAN:\n`;
  note += `  1. Initiate empiric antibiotic therapy:\n`;
  note += `     ${rec.primaryRegimen.antibioticName} ${rec.primaryRegimen.dose} ${rec.primaryRegimen.route} ${rec.primaryRegimen.frequency}\n`;
  if (rec.primaryRegimen.notes) {
    note += `     Note: ${rec.primaryRegimen.notes}\n`;
  }
  note += `  2. Blood cultures x2 (prior to antibiotics if possible)\n`;
  note += `  3. Fluid resuscitation as needed (target MAP >65 mmHg)\n`;
  note += `  4. Serial lactate monitoring\n`;
  note += `  5. Consider source control / imaging if not already done\n`;
  note += `  6. Re-assess in 24-48h; adjust antibiotics based on culture data\n`;

  return note;
}

