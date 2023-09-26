import axios from "axios";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const addcourse = () => {

  const router = useRouter();

  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0)


  const handleAddCourse = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/addCourse", {
          title: title,
          description: description,
          imageLink: image,
          price: price
        }
      );
      //   setCourse({course: response?.data?.course});
      alert("course added!");
      console.log(response);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <div className="flex-col justify-center m-60">
      <div className="my-7">
        <div className="my-2">
          <input type="text" placeholder="Course Title" className="border" onChange={(e) => setTitle(e.target.value)}/>
        </div>

        <div className="my-2">
          <input type="text" placeholder="Course Description" className="border" onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <div className="my-2">
          <input type="text" placeholder="Course ImageLink" className="border" onChange={(e) => setImage(e.target.value)}/>
        </div>

        <div className="my-2">
          <input type="Number" placeholder="Course Price" className="border" onChange={(e) => setPrice(e.target.value)}/>
        </div>
      </div>
      <button
        onClick={() => handleAddCourse()}
        className="px-5 py-3 border-gray-500 bg-blue-500 text-white rounded-lg mr-5"
      >
        Add Course
      </button>
    </div>
  );
};

export default addcourse;

addcourse.auth = true;