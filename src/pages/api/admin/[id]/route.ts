import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await ensureDbConnected();
    const courseId = req.query.id;
    console.log(courseId, "id");

    const course = await Course.findById(courseId);

    if (course) {
      return res.status(200).json({ success: true, course });
    } else {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
