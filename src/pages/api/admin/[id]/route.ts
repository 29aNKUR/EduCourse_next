
import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect"
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export default async (req: NextApiRequest,res: NextApiResponse) => {

  const session =  await getSession({req});
    if(!session) {
      res.status(401).json({message: 'Unauthorized'});
      return;
    }

    await ensureDbConnected();
    const courseId = req.query.id;
    console.log(courseId, "id");
    const course = await Course.find({ _id: courseId});
    if(course){
      return NextResponse.json({sucess: true , course});
    }
     return NextResponse.json({sucess: false }, {status:500});

  }


   
    
