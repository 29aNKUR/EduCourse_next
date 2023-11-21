import { prisma } from "../../../../server/db/client"


export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case "POST":
      const course = await prisma.course.create({
        data: req.body,
      })
      res.status(201).json(course)
      console.log(course)
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}