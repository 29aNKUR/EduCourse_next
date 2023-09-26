import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router.js";
import { Course } from "@/store/atoms/course.js";
import Link from "next/link";
import { signIn, getSession, useSession } from "next-auth/react";

function Courses() {
  const [courses, setCourses] = useState([]);

  const allcourses = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/admin/courses/"
    );
    setCourses(response.data.courses);
  };

  useEffect(() => {
    allcourses();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }: { course: Course }) {
  return (
    <div className="border shadow-lg p-5 w-60 m-5">
      <h1 className="font-bold text-lg">{course.title}</h1>
      <h2 className="font-semibold">{course.description}</h2>
      <img src={course.imageLink}></img>
      <div>
        <Link href={`/courses/${course._id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default Courses;

//added for custom client session handling
Courses.auth = true;
