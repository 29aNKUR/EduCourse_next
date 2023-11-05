import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "@/store/atoms/course.js";
import Link from "next/link";
import Shimmer from "../../components/shimmer";
function Courses() {
  const [courses, setCourses] = useState([]);

  const allcourses = async () => {
    const response = await axios.get(`/api/admin/courses/`);
    setCourses(response.data.courses);
  };

  useEffect(() => {
    allcourses();
  }, []);

  return (
    <div>
      {!courses ? (
        <Shimmer />
      ) : (
        <div className="flex justify-center flex-wrap mt-10">
          {courses.map((course) => {
            return <Course course={course} />;
          })}
        </div>
      )}
    </div>
  );
}

export function Course({ course }: { course: Course }) {
  return (
    <div className="hover:animate-bounce">
      <div className="card">
        <Link href={`/courses/${course._id}`}>
          <div className="wrapper bg-gray-400 antialiased text-gray-900 p-10">
            <div>
              <img
                style={{ height: "250px" }}
                src={course.imageLink}
                alt="product image"
                className="w-full h-64 object-cover object-center rounded-lg shadow-md"
              />

              <div className="subcard">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate text-gray-600">
                    {course.title}
                  </h4>
                  <div className="flex items-baseline">
                    <div className=" text-gray-600 uppercase text-xs font-semibold tracking-wider">
                      {course.description}
                    </div>
                  </div>
                  <div className="mt-1">
                    ₹ {course.price}
                    <span className="text-gray-600 uppercase text-xs font-semibold tracking-wider"></span>
                  </div>
                  <div className="mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Courses;

//added for custom client session handling
Courses.auth = true;
