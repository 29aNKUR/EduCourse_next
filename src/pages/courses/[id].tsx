//Working
import { courseState } from "@/store/atoms/course";
import { courseDescription, courseImage, coursePrice, courseTitle } from "@/store/selectors/course";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Course= () => {

  
  const {query} = useRouter();
  console.log(query, "Router");

  const setCourse = useSetRecoilState(courseState);
  const title = useRecoilValue(courseTitle);

  const init = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/${query.id}`);
      setCourse({course: response?.data?.course});
      console.log(response);


    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
   init()
  },[]);
      

  return <div>
        {/* <GrayTopper /> */}
        <div>
            <div>
                {/* <UpdateCard /> */}
            </div>
            <div>
                {/* <CourseCard /> */}
                {title}
            </div>
        </div>
    </div>
}

export default Course;

// function GrayTopper() {
//     const title = useRecoilValue(courseTitle);
//     return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
//         <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
//             <div>
//                 <h1>
//                     {title}
//                 </h1>
//             </div>
//         </div>
//     </div>
// }

// function UpdateCard() {
//     const [courseDetails, setCourse] = useRecoilState(courseState);

//     const [title, setTitle] = useState(courseDetails?.course?.title);
//     const [description, setDescription] = useState(courseDetails?.course?.description);
//     const [image, setImage] = useState(courseDetails?.course?.imageLink);
//     const [price, setPrice] = useState(courseDetails?.course?.price);

//     return <div style={{display: "flex", justifyContent: "center"}}>
//     <div>
//         <div style={{padding: 20}}>
//             <h1 style={{marginBottom: 10}}>Update course details</h1>
//             <input
//                 value={title}
//                 style={{marginBottom: 10}}
//                 onChange={(e) => {
//                     setTitle(e.target.value)
//                 }}
//             />

//             <input
//                 value={description}
//                 style={{marginBottom: 10}}
//                 onChange={(e) => {
//                     setDescription(e.target.value)
//                 }}

//             />

//             <input
//                 value={image}
//                 style={{marginBottom: 10}}
//                 onChange={(e) => {
//                     setImage(e.target.value)
//                 }}
//             />
//             <input
//                 value={price}
//                 style={{marginBottom: 10}}
//                 onChange={(e) => {
//                     setPrice(e.target.value)
//                 }}
//             />

//             <button
//                 onClick={async () => {
//                     axios.put(`${BASE_URL}/admin/courses/` + courseDetails.course._id, {
//                         title: title,
//                         description: description,
//                         imageLink: image,
//                         published: true,
//                         price
//                     }, {
//                         headers: {
//                             "Content-type": "application/json",
//                             "Authorization": "Bearer " + localStorage.getItem("token")
//                         }
//                     });
//                     let updatedCourse = {
//                         _id: courseDetails.course._id,
//                         title: title,
//                         description: description,
//                         imageLink: image,
//                         price
//                     };
//                     setCourse({course: updatedCourse, isLoading: false});
//                 }}
//             > Update course</button>
//         </div>
//     </div>
// </div>
// }

// function CourseCard() {
//     const title = useRecoilValue(courseTitle);
//     const imageLink = useRecoilValue(courseImage);

//     return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
//      <div style={{
//         margin: 10,
//         width: 350,
//         minHeight: 200,
//         borderRadius: 20,
//         marginRight: 50,
//         paddingBottom: 15,
//         zIndex: 2
//     }}>
//         <img src={imageLink} style={{width: 350}} ></img>
//         <div style={{marginLeft: 10}}>
//             <h1>{title}</h1>
//             <Price />
//         </div>
//     </div>
//     </div>
// }

// function Price() {

//     const price = useRecoilValue(coursePrice);
//     return <>
//         <h1 style={{color: "gray"}}>
//             Price
//         </h1>
//         <h1>
//             <b>Rs {price} </b>
//         </h1>
//     </>
// }
