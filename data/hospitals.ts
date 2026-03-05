import { Hospital } from "@/types";

/**
 * Hospital A: Lower resistance profile - pip-tazo is still effective
 * Hospital B: Higher ESBL rate - pip-tazo resistance > 20%, prefer meropenem
 */

export const hospitals: Hospital[] = [
  {
    id: "hospital_a",
    name: "St. Mary's General Hospital",
    antibiogram: [
      {
        organism: "E. coli",
        susceptibilities: [
          { antibioticId: "pip_tazo", resistanceRatePercent: 12 },
          { antibioticId: "ceftriaxone", resistanceRatePercent: 18 },
          { antibioticId: "meropenem", resistanceRatePercent: 2 },
          { antibioticId: "ciprofloxacin", resistanceRatePercent: 25 },
        ],
      },
    ],
  },
  {
    id: "hospital_b",
    name: "University Medical Center",
    antibiogram: [
      {
        organism: "E. coli",
        susceptibilities: [
          { antibioticId: "pip_tazo", resistanceRatePercent: 28 }, // High resistance!
          { antibioticId: "ceftriaxone", resistanceRatePercent: 35 },
          { antibioticId: "meropenem", resistanceRatePercent: 3 },
          { antibioticId: "ciprofloxacin", resistanceRatePercent: 42 },
        ],
      },
    ],
  },
];

export const antibiotics = [
  { id: "pip_tazo", name: "Piperacillin-Tazobactam" },
  { id: "ceftriaxone", name: "Ceftriaxone" },
  { id: "meropenem", name: "Meropenem" },
  { id: "ciprofloxacin", name: "Ciprofloxacin" },
  { id: "metronidazole", name: "Metronidazole" },
];

export function getHospitalById(id: string): Hospital | undefined {
  return hospitals.find((h) => h.id === id);
}

