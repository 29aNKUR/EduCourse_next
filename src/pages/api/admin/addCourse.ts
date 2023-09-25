import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect"
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react";


export default async (req: NextApiRequest,res: NextApiResponse) => {

  const session =  await getSession({req});
  if(!session) {
    res.status(401).json({message: 'Unauthorized'});
    return;
  }

    await ensureDbConnected();

    const course = new Course(req.body);

    await course.save();

    res.status(201).json({
      success: true,
      message: "course added successfully",
      courseId: course.id
    })
};