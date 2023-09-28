import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../../auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
    await ensureDbConnected();
    try {
      const courseId = req.query.id;
      const course = await Course.findByIdAndDelete(courseId);
      if (course) {
        res
          .status(200)
          .json({ success: true, message: "Course deleted successfully!" });
      } else {
        res.status(404).json({ success: false, message: "Course not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
