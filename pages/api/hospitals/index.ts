import type { NextApiRequest, NextApiResponse } from "next";
import { hospitals } from "@/data/hospitals";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Return just id and name for dropdown
    const hospitalList = hospitals.map((h) => ({
      id: h.id,
      name: h.name,
    }));

    res.status(200).json(hospitalList);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

