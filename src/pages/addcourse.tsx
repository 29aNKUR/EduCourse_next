import axios from "axios";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const addcourse = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const handleAddCourse = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/addCourse",
        {
          title: title,
          description: description,
          imageLink: image,
          price: price,
        }
      );
      //   setCourse({course: response?.data?.course});
      alert("course added!");
      console.log(response);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (  
    <div className="flex items-center justify-center h-screen">
      <div className="my-7 border-2 p-5 shadow-2xl">
        <div className="mb-3">
          {/* <label htmlFor="title" className="block mb-1">Course Title</label> */}
          <input
            type="text"
            id="title"
            placeholder="Course Title"
            className="border rounded-lg p-2"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="description" className="block mb-1">Course Description</label> */}
          <input
            type="text"
            id="description"
            placeholder="Course Description"
            className="border rounded-lg p-2"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="image" className="block mb-1">Course ImageLink</label> */}
          <input
            type="text"
            id="image"
            placeholder="Course ImageLink"
            className="border rounded-lg p-2"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="price" className="block mb-1">Course Price</label> */}
          <input
            type="number"
            id="price"
            placeholder="Course Price"
            className="border rounded-lg p-2"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button
          onClick={() => handleAddCourse()}
          className="border px-7 py-2 rounded-lg bg-indigo-600 text-white"
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default addcourse;

//added for custom client session handling
addcourse.auth = true;
