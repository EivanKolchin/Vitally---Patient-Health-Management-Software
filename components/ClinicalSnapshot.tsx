"use client";

interface ClinicalSnapshotProps {
  vitals: {
    HR: number | null;
    SBP: number | null;
    DBP: number | null;
    RR: number | null;
    TEMP: number | null;
    SPO2: number | null;
  };
  labs: {
    WBC: number | null;
    LACTATE: number | null;
    CREATININE: number | null;
  };
  patient: any;
}

export default function ClinicalSnapshot({
  vitals,
  labs,
  patient,
}: ClinicalSnapshotProps) {
  const formatValue = (value: number | null, unit: string) => {
    if (value === null) return "N/A";
    return `${value.toFixed(1)} ${unit}`;
  };

  const isAbnormal = (type: string, value: number | null): boolean => {
    if (value === null) return false;

    switch (type) {
      case "HR":
        return value < 60 || value > 100;
      case "SBP":
        return value < 100 || value > 140;
      case "RR":
        return value >= 22;
      case "TEMP":
        return value >= 38.5 || value <= 36.0;
      case "SPO2":
        return value < 95;
      case "WBC":
        return value < 4 || value > 12;
      case "LACTATE":
        return value >= 2;
      case "CREATININE":
        return value > 120;
      default:
        return false;
    }
  };

  const VitalRow = ({
    label,
    value,
    type,
  }: {
    label: string;
    value: number | null;
    type: string;
  }) => {
    const abnormal = isAbnormal(type, value);
    return (
      <div
        className={`flex items-center justify-between py-2 px-3 rounded ${
          abnormal ? "bg-red-50" : ""
        }`}
      >
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span
          className={`text-sm font-semibold ${
            abnormal ? "text-red-700" : "text-gray-900"
          }`}
        >
          {value !== null ? value.toFixed(1) : "N/A"}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">
          Clinical Snapshot
        </h2>
      </div>

      {/* Allergies Alert */}
      {patient.allergies.penicillin && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 text-red-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-sm font-semibold text-red-800">
            Penicillin Allergy
          </span>
        </div>
      )}

      {/* Vital Signs */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Vital Signs
        </h3>
        <div className="space-y-1">
          <VitalRow label="Heart Rate" value={vitals.HR} type="HR" />
          <VitalRow
            label="Blood Pressure"
            value={vitals.SBP}
            type="SBP"
          />
          <div className="flex items-center justify-between py-2 px-3">
            <span className="text-sm font-medium text-gray-600">BP</span>
            <span className="text-sm font-semibold text-gray-900">
              {vitals.SBP !== null && vitals.DBP !== null
                ? `${vitals.SBP.toFixed(0)}/${vitals.DBP.toFixed(0)} mmHg`
                : "N/A"}
            </span>
          </div>
          <VitalRow label="Respiratory Rate" value={vitals.RR} type="RR" />
          <VitalRow label="Temperature" value={vitals.TEMP} type="TEMP" />
          <VitalRow label="SpO₂" value={vitals.SPO2} type="SPO2" />
        </div>
      </div>

      {/* Laboratory Values */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Laboratory Values
        </h3>
        <div className="space-y-1">
          <VitalRow label="WBC" value={labs.WBC} type="WBC" />
          <VitalRow label="Lactate" value={labs.LACTATE} type="LACTATE" />
          <VitalRow
            label="Creatinine"
            value={labs.CREATININE}
            type="CREATININE"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-3 h-3 bg-red-50 border border-red-200 rounded"></div>
          <span>Indicates abnormal value</span>
        </div>
      </div>
    </div>
  );
}

