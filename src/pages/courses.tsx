
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router.js";
import { Course } from "@/store/atoms/course.js";
import Link from "next/link";


function Courses() {
    const [courses, setCourses] = useState([]);

    const init = async () => {
        const response = await axios.get('http://localhost:3000/api/admin/courses/');
        console.log(response , "asdfasf");
        setCourses(response.data.courses)
    }

    useEffect(() => {
        init();
    }, []);

    return <div className="flex flex-wrap justify-center">
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
}

export function Course({course}: {course: Course}) {


    return <div className="border shadow-lg p-5 w-60 m-5">
        <h1 className="font-bold text-lg">{course.title}</h1>
        <h2 className="font-semibold">{course.description}</h2>
        <img src={course.imageLink} ></img>
        <div>
        <Link href={`/courses/${course._id}`}>Edit</Link>
        </div>
    </div>

}

export default Courses;