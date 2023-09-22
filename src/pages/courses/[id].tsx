//Working
import { courseState } from "@/store/atoms/course";
import { courseDescription, courseImage, coursePrice, courseTitle } from "@/store/selectors/course";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";



const Course= () => {

  
  const {query} = useRouter();
  console.log(query, "Router");

  const setCourse = useSetRecoilState(courseState);

  const title = useRecoilValue(courseTitle);
  const description = useRecoilValue(courseDescription);
  const price = useRecoilValue(coursePrice);
  const image = useRecoilValue(courseImage);

  const init = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/${query.id}`);
      setCourse({isLoading: false, course: response?.data?.course});
      console.log(response);


    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
   init()
  },[]);
      

  return (

    <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <h2>{price}</h2>
        <img src={image} alt="" />


    </div>

  )
}

export default Course;



// export const getStaticPaths = async () => {
//   const response = await axios.get(`http://localhost:3000/api/admin/courses`);

//   const paths = response?.data?.courses.map((course) => {
//     return {
//       params: { 
//         id: course._id
//       }  
//     }
//   })
   
//   return {
//     paths,
//     fallback: false
//   }
// }


// export const getStaticProps = async () => {
//   const { query } = useRouter();
//   const response = await axios.get(`http://localhost:3000/api/admin/${query.id}`);

//     return {
//       props: { 
//         data: response?.data?.course
//       }  
//     }
//   }
   
 


// const myCourse = ({data}) => {
//   console.log(data);
//   return (
//     <div>
//       <h1></h1>
//     </div>
//   )
// }

// export default myCourse;
