import { Course } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { prisma } from "../../../../../server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
    try {
      await prisma.$connect();
      const {id} = req.query;
      const course = await prisma.course.delete({
        where : {id: parseInt(id as string)}
      });
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
