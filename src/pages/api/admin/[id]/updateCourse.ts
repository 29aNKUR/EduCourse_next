import { Course } from "@/lib/db";
import { ensureDbConnected } from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../../auth/[...nextauth]";


// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   // const session = await getSession({ req });
//   // if (!session) {
//   //   res.status(401).json({ message: "Unauthorized" , session});
//   //   return;
//   // }

//   const session = await getServerSession(req,res,authOptions);
//   if(!session){
//     res.send({error:"Unauthorized"})
//   }
//   else {
//     await ensureDbConnected();
//     try {
//       const course = new Course(req.body);
//       await course.save();
//       res.status(201).json({
//         success: true,
//         message: "course added successfully",
//         courseId: course.id,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }

// };


// Import necessary modules

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
    await ensureDbConnected();
    try {
      const courseId = req.query.id;
      const courseData = req.body;

      if (courseId) {
        // If courseId is provided, update the existing course
        const updatedCourse = await Course.findByIdAndUpdate(
          courseId,
          courseData,
          { new: true }
        );

        if (updatedCourse) {
          res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: updatedCourse,
          });
        } else {
          res.status(404).json({ success: false, message: "Course not found" });
        }
      } else {
          res.status(404).json({ success: false, message: "courseId not found"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
