import type { NextApiRequest, NextApiResponse } from "next";
import { getPatientById } from "@/data/patients";
import { getHospitalById } from "@/data/hospitals";
import {
  calculateSepsisRisk,
  getLatestVitals,
  getLatestLabs,
} from "@/lib/clinical/riskScoring";
import { generateAntibioticRecommendation } from "@/lib/clinical/recommendations";
import { generateRecommendationExplanation } from "@/lib/clinical/explanations";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, hospitalId } = req.query;

  if (req.method === "GET") {
    const patient = getPatientById(id as string);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Allow hospital override for demo purposes
    const effectiveHospitalId = (hospitalId as string) || patient.hospitalId;
    const hospital = getHospitalById(effectiveHospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Calculate risk score
    const riskScore = calculateSepsisRisk(patient);

    // Get latest vitals and labs
    const latestVitals = getLatestVitals(patient);
    const latestLabs = getLatestLabs(patient);

    // Generate antibiotic recommendation
    const recommendation = generateAntibioticRecommendation(
      patient,
      hospital,
      riskScore.riskCategory
    );

    // Generate explanation
    const explanation = generateRecommendationExplanation(
      patient,
      recommendation,
      riskScore
    );

    // Return comprehensive patient data
    res.status(200).json({
      patient: {
        ...patient,
        hospitalId: effectiveHospitalId, // Return effective hospital
      },
      hospital,
      riskScore,
      latestVitals,
      latestLabs,
      recommendation,
      explanation,
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

