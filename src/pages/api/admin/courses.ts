import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../server/db/client';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    await prisma.$connect();
    const courses = await prisma.course.findMany();

    if (courses && courses.length > 0) {
      res.status(200).json({ success: true, courses });
    } else {
      res.status(404).json({ success: false, message: 'No Course is present' });
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};
