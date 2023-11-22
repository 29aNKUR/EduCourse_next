import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { prisma } from '../../../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
  
    try {
      await prisma.$connect();
      const {courseId} = req.query;
      const courseData = req.body;
      // If courseId is provided, update the existing course
      const updatedCourse = await prisma.course.update({
        where: { id: parseInt(courseId as string, 10) },
        data: courseData,
      });
  
      console.log(updatedCourse,"updatedCourse");
      if (updatedCourse) {
        res.status(200).json({
          success: true,
          message: "Course updated successfully",
          course: updatedCourse,
        });
      } else {
        res.status(404).json({ success: false, message: "Course not found" });
      }
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect(); // Disconnect from the database
    }
  }
};
