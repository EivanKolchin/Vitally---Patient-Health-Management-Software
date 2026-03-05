import { Patient, SepsisRiskScore, RiskCategory, TimeSeriesPoint } from "@/types";

/**
 * Get the most recent value from a time series
 */
function getLatestValue(data: TimeSeriesPoint[] | undefined): number | null {
  if (!data || data.length === 0) return null;
  return data[data.length - 1].value;
}

/**
 * Calculate sepsis risk score based on modified qSOFA-like criteria
 * 
 * Scoring criteria (add 1 point for each):
 * - SBP < 100 mmHg
 * - RR ≥ 22/min
 * - WBC < 4 or > 12 (x10^9/L)
 * - Lactate ≥ 2 mmol/L
 * - Temperature ≥ 38.5°C or ≤ 36.0°C
 * 
 * Risk categories:
 * - 0-1 points: Low risk
 * - 2-3 points: Moderate risk
 * - ≥4 points: High risk
 */
export function calculateSepsisRisk(patient: Patient): SepsisRiskScore {
  let score = 0;
  
  // Initialize factors
  const factors = {
    lowSBP: false,
    highRR: false,
    abnormalWBC: false,
    elevatedLactate: false,
    abnormalTemp: false,
  };

  // Get latest vital signs
  const sbpSeries = patient.vitals.find((v) => v.type === "SBP");
  const rrSeries = patient.vitals.find((v) => v.type === "RR");
  const tempSeries = patient.vitals.find((v) => v.type === "TEMP");

  const latestSBP = getLatestValue(sbpSeries?.data);
  const latestRR = getLatestValue(rrSeries?.data);
  const latestTemp = getLatestValue(tempSeries?.data);

  // Get latest lab values
  const latestWBC = getLatestValue(patient.labs.WBC);
  const latestLactate = getLatestValue(patient.labs.LACTATE);

  // Check SBP < 100
  if (latestSBP !== null && latestSBP < 100) {
    score += 1;
    factors.lowSBP = true;
  }

  // Check RR ≥ 22
  if (latestRR !== null && latestRR >= 22) {
    score += 1;
    factors.highRR = true;
  }

  // Check WBC < 4 or > 12
  if (latestWBC !== null && (latestWBC < 4 || latestWBC > 12)) {
    score += 1;
    factors.abnormalWBC = true;
  }

  // Check Lactate ≥ 2
  if (latestLactate !== null && latestLactate >= 2) {
    score += 1;
    factors.elevatedLactate = true;
  }

  // Check Temperature ≥ 38.5 or ≤ 36.0
  if (latestTemp !== null && (latestTemp >= 38.5 || latestTemp <= 36.0)) {
    score += 1;
    factors.abnormalTemp = true;
  }

  // Determine risk category
  let riskCategory: RiskCategory;
  if (score <= 1) {
    riskCategory = "low";
  } else if (score <= 3) {
    riskCategory = "moderate";
  } else {
    riskCategory = "high";
  }

  return {
    totalScore: score,
    riskCategory,
    factors,
  };
}

/**
 * Get latest vital signs as a snapshot object
 */
export function getLatestVitals(patient: Patient) {
  return {
    HR: getLatestValue(patient.vitals.find((v) => v.type === "HR")?.data),
    SBP: getLatestValue(patient.vitals.find((v) => v.type === "SBP")?.data),
    DBP: getLatestValue(patient.vitals.find((v) => v.type === "DBP")?.data),
    RR: getLatestValue(patient.vitals.find((v) => v.type === "RR")?.data),
    TEMP: getLatestValue(patient.vitals.find((v) => v.type === "TEMP")?.data),
    SPO2: getLatestValue(patient.vitals.find((v) => v.type === "SPO2")?.data),
  };
}

/**
 * Get latest lab values as a snapshot object
 */
export function getLatestLabs(patient: Patient) {
  return {
    WBC: getLatestValue(patient.labs.WBC),
    LACTATE: getLatestValue(patient.labs.LACTATE),
    CREATININE: getLatestValue(patient.labs.CREATININE),
  };
}

