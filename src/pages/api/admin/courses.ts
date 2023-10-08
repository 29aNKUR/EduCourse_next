import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect"
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest,res: NextApiResponse) => {

  const session =  await getSession({req});
  console.log(session);
    if(!session) {
      res.status(401).json({message: 'Unauthorized'});
      return;
    }

    await ensureDbConnected();
    const courses = await Course.find({});
    if(courses){
      res.status(200).json({sucess: true , courses});
    }
    res.status(404).json({success: false, message:"No Course is present"})
    
}