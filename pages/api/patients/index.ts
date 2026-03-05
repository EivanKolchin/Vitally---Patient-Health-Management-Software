import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPatients } from "@/data/patients";
import { getHospitalById } from "@/data/hospitals";
import { calculateSepsisRisk } from "@/lib/clinical/riskScoring";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const patients = getAllPatients();

    // Enrich with risk scores for dashboard display
    const enrichedPatients = patients.map((patient) => {
      const riskScore = calculateSepsisRisk(patient);
      const hospital = getHospitalById(patient.hospitalId);

      return {
        id: patient.id,
        name: patient.name,
        age: patient.age,
        sex: patient.sex,
        surgeryType: patient.surgeryType,
        timeSinceSurgeryHours: patient.timeSinceSurgeryHours,
        hospitalName: hospital?.name || "Unknown",
        riskCategory: riskScore.riskCategory,
        riskScore: riskScore.totalScore,
      };
    });

    res.status(200).json(enrichedPatients);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

