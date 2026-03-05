// Core type definitions for Sepsis Sentinel

export type VitalType = "HR" | "SBP" | "DBP" | "RR" | "TEMP" | "SPO2";

export interface TimeSeriesPoint {
  time: string; // ISO string
  value: number;
}

export interface VitalSeries {
  type: VitalType;
  data: TimeSeriesPoint[];
}

export interface LabTypeMap {
  WBC?: TimeSeriesPoint[]; // white cell count (x10^9/L)
  LACTATE?: TimeSeriesPoint[]; // mmol/L
  CREATININE?: TimeSeriesPoint[]; // µmol/L
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: "M" | "F";
  hospitalId: string; // link to hospital
  surgeryType: string; // e.g. "Laparoscopic appendicectomy"
  timeSinceSurgeryHours: number;
  allergies: {
    penicillin: boolean;
  };
  vitals: VitalSeries[];
  labs: LabTypeMap;
}

export interface Antibiotic {
  id: string; // e.g. "pip_tazo", "ceftriaxone", "meropenem"
  name: string; // display name
}

export interface OrganismSusceptibility {
  organism: string; // e.g. "E. coli"
  susceptibilities: {
    antibioticId: string;
    resistanceRatePercent: number; // e.g. 15 = 15% resistant
  }[];
}

export interface Hospital {
  id: string;
  name: string;
  antibiogram: OrganismSusceptibility[];
}

export type RiskCategory = "low" | "moderate" | "high";

export interface SepsisRiskScore {
  totalScore: number;
  riskCategory: RiskCategory;
  factors: {
    lowSBP: boolean;
    highRR: boolean;
    abnormalWBC: boolean;
    elevatedLactate: boolean;
    abnormalTemp: boolean;
  };
}

export interface AntibioticRecommendation {
  primaryRegimen: {
    antibioticName: string;
    dose: string;
    route: string;
    frequency: string;
    durationDays: number;
    notes?: string; // e.g. "Adjust dose for creatinine > 150 µmol/L"
  };
  alternativeRegimen?: {
    antibioticName: string;
    dose: string;
    route: string;
    frequency: string;
    durationDays: number;
    notes?: string;
  };
  rationaleInputs: {
    riskCategory: RiskCategory;
    hospitalName: string;
    organism: string;
    resistanceSummary: string;
    penicillinAllergy: boolean;
    creatinine: number | null;
  };
}

export interface RecommendationExplanation {
  shortRationale: string; // 2–3 sentences
  detailedRationale: string; // a short paragraph explaining reasoning
  noteText: string; // formatted clinical note snippet
}

