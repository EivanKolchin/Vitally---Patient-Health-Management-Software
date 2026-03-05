"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VitalsChart from "@/components/VitalsChart";
import Timeline from "@/components/Timeline";
import AntibioticPlan from "@/components/AntibioticPlan";
import ClinicalSnapshot from "@/components/ClinicalSnapshot";

interface PatientDetailData {
  patient: any;
  hospital: any;
  riskScore: any;
  latestVitals: any;
  latestLabs: any;
  recommendation: any;
  explanation: any;
}

export default function PatientDetail() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  const [data, setData] = useState<PatientDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("");
  const [hospitals, setHospitals] = useState<any[]>([]);

  // Fetch hospitals list
  useEffect(() => {
    fetch("/api/hospitals")
      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch((error) => console.error("Error fetching hospitals:", error));
  }, []);

  // Fetch patient data
  useEffect(() => {
    if (!patientId) return;

    const url = selectedHospitalId
      ? `/api/patients/${patientId}?hospitalId=${selectedHospitalId}`
      : `/api/patients/${patientId}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((responseData) => {
        setData(responseData);
        if (!selectedHospitalId) {
          setSelectedHospitalId(responseData.patient.hospitalId);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patient:", error);
        setLoading(false);
      });
  }, [patientId, selectedHospitalId]);

  const handleHospitalChange = (newHospitalId: string) => {
    setSelectedHospitalId(newHospitalId);
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { patient, hospital, riskScore, latestVitals, latestLabs, recommendation, explanation } = data;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "moderate":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
              <svg
                className="w-4 h-4 text-yellow-600"
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
              <span className="text-xs font-medium text-yellow-800">
                Demo only – not for clinical use
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Patient Header Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {patient.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span>
                  {patient.age}yo {patient.sex === "M" ? "Male" : "Female"}
                </span>
                <span>•</span>
                <span>{patient.surgeryType}</span>
                <span>•</span>
                <span className="font-medium">
                  {patient.timeSinceSurgeryHours}h post-op
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Hospital Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium">
                  Hospital
                </label>
                <select
                  value={selectedHospitalId}
                  onChange={(e) => handleHospitalChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Risk Badge */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium">
                  Sepsis Risk
                </label>
                <div
                  className={`px-4 py-2 rounded-lg text-sm font-bold border ${getRiskColor(
                    riskScore.riskCategory
                  )}`}
                >
                  {riskScore.riskCategory.toUpperCase()} ({riskScore.totalScore}/5)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Clinical Snapshot & Timeline */}
          <div className="lg:col-span-4 space-y-6">
            <ClinicalSnapshot
              vitals={latestVitals}
              labs={latestLabs}
              patient={patient}
            />
            <VitalsChart patient={patient} />
            <Timeline patient={patient} riskScore={riskScore} />
          </div>

          {/* Right Column - Antibiotic Plan */}
          <div className="lg:col-span-8">
            <AntibioticPlan
              recommendation={recommendation}
              explanation={explanation}
              hospital={hospital}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

