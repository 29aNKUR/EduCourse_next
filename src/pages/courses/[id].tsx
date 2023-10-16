//Working
// import { NEXT_URL } from "@/config";
import { courseState } from "@/store/atoms/course";
import {
  courseDescription,
  courseImage,
  coursePrice,
  courseTitle,
} from "@/store/selectors/course";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Course = () => {
  const { query } = useRouter();
  console.log(query, "Router");

  if(!query) return 'Loading;...'
  const setCourse = useSetRecoilState(courseState);

  const init = async () => {

      const response = await axios.get(
        `https://edu-course-next.vercel.app/api/admin/${query.id}/route`
      );
      
      // setCourse({ course: response?.data?.course });
        console.log(response);

  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <GrayTopper />
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <CourseCard />
        </div>
        <br />
        <br />
        <div className="">
          <UpdateCard />
        </div>
      </div>
    </div>
  );
};

export default Course;

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div className="h-60 bg-gray-900 top-0 min-w-full -mb-96 mt-10">
      <div className="h-60 flex justify-center flex-col">
        <div>
          <h1 className="text-2xl flex justify-center -mt-20 font-bold">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}

function UpdateCard() {
  const router = useRouter();
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(courseDetails?.course?.title || "");
  const [description, setDescription] = useState(
    courseDetails?.course?.description || ""
  );
  const [image, setImage] = useState(courseDetails?.course?.imageLink || "");
  const [price, setPrice] = useState<number | undefined>(
    typeof courseDetails?.course?.price === 'number'
      ? courseDetails?.course?.price
      : parseFloat(courseDetails?.course?.price || '0')
  );
  

  //For re-render the page to get correct course details in update card
  useEffect(() => {
    setTitle(courseDetails?.course?.title || "");
    setDescription(courseDetails?.course?.description || "");
    setImage(courseDetails?.course?.imageLink || "");
    setPrice(
      typeof courseDetails?.course?.price === 'number'
        ? courseDetails?.course?.price
        : parseFloat(courseDetails?.course?.price || '0')
    );
  }, [courseDetails]);

  return (
    <div className="p-5 border shadow-lg">
      <h1 className="text-xl font-bold mb-4">Update course details</h1>
      <div className="flex flex-col">
        <input
          className="border rounded-lg py-4 px-2 mb-5"
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <input
          className="border rounded-lg py-4 px-2 mb-5"
          value={description}
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <input
          className="border rounded-lg py-4 px-2 mb-5"
          value={image}
          placeholder="ImageLink"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <input
          className="border rounded-lg py-4 px-2"
          value={price}
          placeholder="Price"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = parseFloat(e.target.value)
            {(!isNaN(inputValue)) ? setPrice(inputValue) : setPrice(0)}
          }}
        />
      </div>
      <div className="flex justify-between mt-5">
        <button
          className="button"
          onClick={async () => {
            axios.put(
              `/api/admin/${courseDetails?.course?._id}/updateCourse`,
              {
                title: title,
                description: description,
                imageLink: image,
                published: true,
                price: price || 0,
              }
            );
            let updatedCourse = {
              _id: courseDetails?.course?._id || '',
              title: title,
              description: description,
              imageLink: image,
              price: price || 0,
            };
            setCourse({ course: updatedCourse });
            alert("course updated!");
          }}
        >
          Update Course
        </button>

        <button
          className="button"
          onClick={async () => {
            axios.put(
              `/api/admin/${courseDetails?.course?._id}/deleteCourse`
            );
            alert("course deleted!");
            router.push("/");
          }}
        >
          Delete Course
        </button>
      </div>
    </div>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);

  return (
    // <div className="dark:bg-slate-400">
    //   <div className="mt-64 md:ml-auto md:mr-9 lg:mr-44 rounded-lg border bg-white w-72 shadow-lg">
    //     <div className="">
    //       <img src={imageLink} className="rounded-lg h-64"></img>
    //     </div>
    //     <div className="ml-10">
    //       <h1 className="font-bold">{title}</h1>
    //       <Price />
    //     </div>
    //   </div>
    // </div>

    <div className="flex justify-end h-screen border shadow-lg p-5 w-3 lg:my-5 z-20">
      <div>
        <img className="p-8 rounded-lg" src={imageLink} alt="product image" />
        <div className="px-5 pb-5 dark:bg-red-500">
          <h5 className="text-lg font-bold tracking-wide">{title}</h5>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              <h1 className="text-gray-400"> Price </h1>
              ₹ <Price />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);
  return (
    <>
      {/* <h1 style={{ color: "gray" }}>Price</h1> */}
      {/* <h1> */}
      <b>{price} </b>
      {/* </h1> */}
    </>
  );
}
