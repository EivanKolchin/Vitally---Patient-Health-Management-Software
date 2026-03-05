import {
  Patient,
  Hospital,
  AntibioticRecommendation,
  RiskCategory,
} from "@/types";
import { getLatestLabs } from "./riskScoring";

/**
 * Generate antibiotic recommendation based on:
 * - Hospital antibiogram (local resistance patterns)
 * - Patient allergies (penicillin)
 * - Renal function (creatinine)
 * - Risk category
 * 
 * Logic for intra-abdominal sepsis (likely organism: E. coli):
 * 
 * First-line: Piperacillin-Tazobactam (pip-tazo)
 * BUT:
 * - If hospital resistance to pip-tazo > 20% → prefer Meropenem
 * - If penicillin allergy → use Meropenem
 * - If creatinine > 150 µmol/L → dose adjustment required
 */
export function generateAntibioticRecommendation(
  patient: Patient,
  hospital: Hospital,
  riskCategory: RiskCategory
): AntibioticRecommendation {
  const labs = getLatestLabs(patient);
  const creatinine = labs.CREATININE;

  // Find E. coli susceptibility data
  const eColiData = hospital.antibiogram.find(
    (org) => org.organism === "E. coli"
  );

  const pipTazoResistance =
    eColiData?.susceptibilities.find((s) => s.antibioticId === "pip_tazo")
      ?.resistanceRatePercent || 0;

  const meropenemResistance =
    eColiData?.susceptibilities.find((s) => s.antibioticId === "meropenem")
      ?.resistanceRatePercent || 0;

  // Determine if renal dose adjustment needed (creatinine > 150 µmol/L)
  const renalAdjustmentNeeded = creatinine !== null && creatinine > 150;

  // Decision logic
  let primaryAntibiotic: string;
  let primaryDose: string;
  let primaryFrequency: string;
  let primaryNotes: string | undefined;

  let alternativeAntibiotic: string | undefined;
  let alternativeDose: string | undefined;
  let alternativeFrequency: string | undefined;
  let alternativeNotes: string | undefined;

  // Check for penicillin allergy or high pip-tazo resistance
  if (patient.allergies.penicillin) {
    // Penicillin allergy → use Meropenem
    primaryAntibiotic = "Meropenem";
    primaryDose = renalAdjustmentNeeded ? "500mg" : "1g";
    primaryFrequency = renalAdjustmentNeeded ? "Q12H" : "Q8H";
    primaryNotes = renalAdjustmentNeeded
      ? "Dose adjusted for renal impairment (CrCl reduced with Cr >150 µmol/L). Consider nephrology consultation."
      : undefined;

    // Alternative: Ciprofloxacin + Metronidazole (if meropenem not available)
    alternativeAntibiotic = "Ciprofloxacin + Metronidazole";
    alternativeDose = "400mg IV + 500mg IV";
    alternativeFrequency = "Q12H + Q8H";
    alternativeNotes =
      "Use if carbapenem-sparing approach preferred or meropenem unavailable.";
  } else if (pipTazoResistance > 20) {
    // High resistance to pip-tazo at this hospital → prefer Meropenem
    primaryAntibiotic = "Meropenem";
    primaryDose = renalAdjustmentNeeded ? "500mg" : "1g";
    primaryFrequency = renalAdjustmentNeeded ? "Q12H" : "Q8H";
    primaryNotes = renalAdjustmentNeeded
      ? "Dose adjusted for renal impairment. High local pip-tazo resistance."
      : `High local resistance to piperacillin-tazobactam (${pipTazoResistance}%).`;

    // Alternative: Pip-tazo still listed as alternative if resistance not extreme
    alternativeAntibiotic = "Piperacillin-Tazobactam";
    alternativeDose = "4.5g";
    alternativeFrequency = renalAdjustmentNeeded ? "Q8H" : "Q6H";
    alternativeNotes = `Consider if specific susceptibility confirmed. Local resistance ${pipTazoResistance}%.`;
  } else {
    // Standard first-line: Piperacillin-Tazobactam
    primaryAntibiotic = "Piperacillin-Tazobactam";
    primaryDose = "4.5g";
    primaryFrequency = renalAdjustmentNeeded ? "Q8H" : "Q6H";
    primaryNotes = renalAdjustmentNeeded
      ? "Dose interval extended for renal impairment (CrCl estimated reduced). Monitor renal function."
      : undefined;

    // Alternative: Meropenem (if pip-tazo fails or patient deteriorates)
    alternativeAntibiotic = "Meropenem";
    alternativeDose = renalAdjustmentNeeded ? "500mg" : "1g";
    alternativeFrequency = renalAdjustmentNeeded ? "Q12H" : "Q8H";
    alternativeNotes = "Reserve for treatment failure or severe sepsis/septic shock.";
  }

  // Build resistance summary
  const resistanceSummary = `At ${hospital.name}, E. coli resistance: Pip-Tazo ${pipTazoResistance}%, Meropenem ${meropenemResistance}%.`;

  return {
    primaryRegimen: {
      antibioticName: primaryAntibiotic,
      dose: primaryDose,
      route: "IV",
      frequency: primaryFrequency,
      durationDays: 7,
      notes: primaryNotes,
    },
    alternativeRegimen: alternativeAntibiotic
      ? {
          antibioticName: alternativeAntibiotic,
          dose: alternativeDose!,
          route: "IV",
          frequency: alternativeFrequency!,
          durationDays: 7,
          notes: alternativeNotes,
        }
      : undefined,
    rationaleInputs: {
      riskCategory,
      hospitalName: hospital.name,
      organism: "E. coli",
      resistanceSummary,
      penicillinAllergy: patient.allergies.penicillin,
      creatinine,
    },
  };
}

