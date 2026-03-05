import { Patient } from "@/types";

/**
 * Synthetic patient data for demo
 * Patient 1: High risk - multiple abnormalities
 * Patient 2: Moderate risk - some concerning trends
 * Patient 3: Low risk - stable post-op
 */

// Helper to create time series data points
function createTimePoints(
  baseTime: Date,
  values: number[],
  intervalHours: number = 4
) {
  return values.map((value, index) => ({
    time: new Date(
      baseTime.getTime() + index * intervalHours * 60 * 60 * 1000
    ).toISOString(),
    value,
  }));
}

const now = new Date();
const surgeryTime24hAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const surgeryTime48hAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
const surgeryTime12hAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);

export const patients: Patient[] = [
  {
    id: "patient_001",
    name: "Sarah Johnson",
    age: 67,
    sex: "F",
    hospitalId: "hospital_a",
    surgeryType: "Emergency laparotomy for perforated diverticulitis",
    timeSinceSurgeryHours: 24,
    allergies: {
      penicillin: false,
    },
    vitals: [
      {
        type: "HR",
        data: createTimePoints(surgeryTime24hAgo, [78, 85, 92, 105, 112, 118]),
      },
      {
        type: "SBP",
        data: createTimePoints(surgeryTime24hAgo, [125, 118, 108, 98, 94, 92]),
      },
      {
        type: "DBP",
        data: createTimePoints(surgeryTime24hAgo, [72, 70, 68, 62, 58, 55]),
      },
      {
        type: "RR",
        data: createTimePoints(surgeryTime24hAgo, [16, 18, 20, 24, 26, 28]),
      },
      {
        type: "TEMP",
        data: createTimePoints(surgeryTime24hAgo, [
          36.8, 37.2, 37.8, 38.4, 38.9, 39.2,
        ]),
      },
      {
        type: "SPO2",
        data: createTimePoints(surgeryTime24hAgo, [98, 97, 96, 94, 93, 92]),
      },
    ],
    labs: {
      WBC: createTimePoints(surgeryTime24hAgo, [11.2, 14.8, 18.5], 8),
      LACTATE: createTimePoints(surgeryTime24hAgo, [1.2, 2.4, 3.8], 8),
      CREATININE: createTimePoints(surgeryTime24hAgo, [85, 102, 145], 8),
    },
  },
  {
    id: "patient_002",
    name: "Michael Chen",
    age: 52,
    sex: "M",
    hospitalId: "hospital_b",
    surgeryType: "Laparoscopic cholecystectomy",
    timeSinceSurgeryHours: 48,
    allergies: {
      penicillin: true, // Penicillin allergy!
    },
    vitals: [
      {
        type: "HR",
        data: createTimePoints(surgeryTime48hAgo, [
          72, 75, 78, 82, 88, 92, 95, 98, 102, 105, 108, 112,
        ]),
      },
      {
        type: "SBP",
        data: createTimePoints(surgeryTime48hAgo, [
          130, 128, 125, 122, 118, 115, 112, 108, 105, 102, 100, 98,
        ]),
      },
      {
        type: "DBP",
        data: createTimePoints(surgeryTime48hAgo, [
          78, 76, 75, 73, 70, 68, 66, 64, 62, 60, 58, 56,
        ]),
      },
      {
        type: "RR",
        data: createTimePoints(surgeryTime48hAgo, [
          14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        ]),
      },
      {
        type: "TEMP",
        data: createTimePoints(surgeryTime48hAgo, [
          36.6, 36.7, 36.8, 37.0, 37.3, 37.6, 37.9, 38.2, 38.5, 38.7, 38.9,
          39.0,
        ]),
      },
      {
        type: "SPO2",
        data: createTimePoints(surgeryTime48hAgo, [
          99, 98, 98, 97, 97, 96, 96, 95, 95, 94, 94, 93,
        ]),
      },
    ],
    labs: {
      WBC: createTimePoints(surgeryTime48hAgo, [9.8, 11.2, 13.5, 15.8], 12),
      LACTATE: createTimePoints(surgeryTime48hAgo, [1.0, 1.4, 1.8, 2.2], 12),
      CREATININE: createTimePoints(surgeryTime48hAgo, [92, 95, 98, 105], 12),
    },
  },
  {
    id: "patient_003",
    name: "Emily Rodriguez",
    age: 34,
    sex: "F",
    hospitalId: "hospital_a",
    surgeryType: "Laparoscopic appendicectomy",
    timeSinceSurgeryHours: 12,
    allergies: {
      penicillin: false,
    },
    vitals: [
      {
        type: "HR",
        data: createTimePoints(surgeryTime12hAgo, [68, 72, 74]),
      },
      {
        type: "SBP",
        data: createTimePoints(surgeryTime12hAgo, [118, 122, 120]),
      },
      {
        type: "DBP",
        data: createTimePoints(surgeryTime12hAgo, [75, 78, 76]),
      },
      {
        type: "RR",
        data: createTimePoints(surgeryTime12hAgo, [14, 15, 16]),
      },
      {
        type: "TEMP",
        data: createTimePoints(surgeryTime12hAgo, [36.8, 37.0, 37.2]),
      },
      {
        type: "SPO2",
        data: createTimePoints(surgeryTime12hAgo, [99, 98, 98]),
      },
    ],
    labs: {
      WBC: createTimePoints(surgeryTime12hAgo, [8.5, 9.2], 6),
      LACTATE: createTimePoints(surgeryTime12hAgo, [0.9, 1.1], 6),
      CREATININE: createTimePoints(surgeryTime12hAgo, [72, 75], 6),
    },
  },
];

export function getPatientById(id: string): Patient | undefined {
  return patients.find((p) => p.id === id);
}

export function getAllPatients(): Patient[] {
  return patients;
}

