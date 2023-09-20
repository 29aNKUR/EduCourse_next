import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router.js";
import { Course } from "@/store/atoms/course.js";

function Courses() {
    const [courses, setCourses] = useState([]);

    const init = async () => {
        const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/admin/courses/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(response.data.courses)
    }

    useEffect(() => {
        init();
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
}

export function Course({course}: {course: Course}) {
    const router = useRouter();

    return <div style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <h1>{course.title}</h1>
        <h2>{course.description}</h2>
        <img src={course.imageLink} ></img>
        <div>
            <button onClick={() => {
                router.push("/course/" + course._id);
            }}>Edit</button>
        </div>
    </div>

}

export default Courses;