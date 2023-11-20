import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from '../../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getSession({ req });
  // if (!session) {
  //   res.status(401).json({ message: "Unauthorized" , session});
  //   return;
  // }

  const session = await getServerSession(req,res,authOptions);
  if(!session){
    res.send({error:"Unauthorized"})
  }
  else {
    try {
      await prisma.$connect();
      const course = await prisma.course.create({
        data: req.body,
      });

      res.status(201).json({
        success: true,
        message: 'Course added successfully',
        courseId: course.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  }

};