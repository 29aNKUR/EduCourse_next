import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";


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
    await ensureDbConnected();
    try {
      const course = new Course(req.body);
      await course.save();
      res.status(201).json({
        success: true,
        message: "course added successfully",
        courseId: course.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

};