import { useEffect, useState } from "react";
import axios from "axios";
import { Course } from "@/store/atoms/course.js";
import Link from "next/link";
function Courses() {
  const [courses, setCourses] = useState([]);

  const allcourses = async () => {
    const response = await axios.get(`http://localhost:3000/api/admin/courses/`);
    setCourses(response.data.courses);
  };

  useEffect(() => {
    allcourses();
  }, []);

  if (!courses) return "Loading...";
  return (
    <div className="flex justify-center flex-wrap">
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }: { course: Course }) {
  return (
    // <div className= "shadow-lg dark:shadow-2xl p-5 w-52 lg:my-5 mt-10">
    //   <Link href={`/courses/${course._id}`}>
    //     <div className="mt-10 mx-10">
    //       <img
    //         className="p-8 rounded-lg4"
    //         src={course.imageLink}
    //         alt="product image"
    //       />
    //       <div className="px-5 pb-5 dark:bg-red-500">
    //         <h5 className="text-lg font-bold tracking-wide">{course.title}</h5>
    //         <h5 className="text-md font-semibold tracking-wide w-9 m-52">
    //           {course.description}
    //         </h5>
    //         <div className="flex items-center justify-between">
    //           <span className="text-lg font-bold">₹ {course.price}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </div>

    // <div className="card">
    //   <Link href={`/courses/${course._id}`}>
    //     <div className="wrapper bg-gray-400 antialiased text-gray-900 p-10">
    //       <div>
    //         <img
    //           src={course.imageLink}
    //           alt="product image"
    //           className="w-full object-cover object-center rounded-lg shadow-md h-52"
    //         />

    //         <div className="subcard">
    //           <div className="bg-white p-6 rounded-lg shadow-lg">
    //             <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
    //               {course.title}
    //             </h4>
    //             <div className="flex items-baseline">
    //               {/* <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
    //     New
    //   </span> */}
    //               <div className=" text-gray-600 uppercase text-xs font-semibold tracking-wider">
    //                 {course.description}
    //               </div>
    //             </div>
    //             <div className="mt-1">
    //               ₹ {course.price}
    //               <span className="text-gray-600 text-sm"></span>
    //             </div>
    //             <div className="mt-4">
    //               {/* <span className="text-teal-600 text-md font-semibold">4/5 ratings </span>
    // <span className="text-sm text-gray-600">(based on 234 ratings)</span> */}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </div>

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
                <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                  {course.title}
                </h4>
                <div className="flex items-baseline">
                  <div className=" text-gray-600 uppercase text-xs font-semibold tracking-wider">
                    {course.description}
                  </div>
                </div>
                <div className="mt-1">
                  ₹ {course.price}
                  <span className="text-gray-600 text-sm"></span>
                </div>
                <div className="mt-4"></div>
              </div>
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
