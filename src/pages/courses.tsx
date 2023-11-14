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
              <div style={{ width: "250px", height: "250px" }}>
                <img
                  src={course.imageLink}
                  alt="product image"
                  className="w-full h-full object-cover object-center rounded-lg shadow-md"
                />
              </div>

              <div className="subcard" style={{ width: "100%" }}>
                <div className="bg-white px-1 py-2 border md:px-4 md:py-1 rounded-lg shadow-lg flex flex-col justify-center">
                  <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate text-gray-600">
                  <div style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {course.title}
                    </div>
                  </h4>
                  <div className="text-gray-600 uppercase text-xs font-semibold tracking-wider overflow-hidden">
                    <div style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {course.description}
                    </div>
                  </div>
                  <div className="flex items-baseline flex-wrap">
                    {/* ... (other content) */}
                  </div>
                  <div className="mt-1 text-gray-600 dark:text-gray-700 uppercase text-xs font-semibold tracking-wider">
                    ₹ {course.price}
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
