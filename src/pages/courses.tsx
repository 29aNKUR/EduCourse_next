import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "@/store/atoms/course.js";
import Link from "next/link";


function Courses() {
  const [courses, setCourses] = useState([]);
  const allcourses = async () => {
    const response = await axios.get(
      `${process.env.NEXT_BASE_URL || ''}/api/admin/courses/`
    );
    setCourses(response.data.courses);
  };

  useEffect(() => {
    allcourses();
  }, []);

  return (
    <div className="flex justify-center flex-wrap m-10">
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }: { course: Course }) {
  return (
    <div className= " shadow-lg dark:shadow-2xl p-5 w-52 lg:my-5 mt-10">
      <Link href={`/courses/${course._id}`}>
        <div className="mt-10 mx-10">
          <img
            className="p-8 rounded-lg"
            src={course.imageLink}
            alt="product image"
          />
          <div className="px-5 pb-5 dark:bg-red-500">
            <h5 className="text-lg font-bold tracking-wide">{course.title}</h5>
            <h5 className="text-md font-semibold tracking-wide w-9 m-52">
              {course.description}
            </h5>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">₹ {course.price}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Courses;

//added for custom client session handling
Courses.auth = true;
