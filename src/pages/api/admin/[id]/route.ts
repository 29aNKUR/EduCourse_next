
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
    const courseId = req.query.id;
    console.log(courseId, "id");
    const course = await Course.findById({ _id: courseId});
    if(course){
      res.status(200).json({sucess: true , course});
    }
    res.status(404).json({success: false, messgae: "Course not found"});

  }


   
    
