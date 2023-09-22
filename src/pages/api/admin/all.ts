import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest,res: NextApiResponse) => {

    await ensureDbConnected();

    const title="safd", description="asdf";

    await Course.create({
      title,
      description
    });

    res.status(201).json({
      success: true,
      message: "course added successfully"
    })
};