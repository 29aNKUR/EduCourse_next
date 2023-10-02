//Working
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

  const setCourse = useSetRecoilState(courseState);

  const init = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/${query.id}/route`
      );
      setCourse({ course: response?.data?.course });
      //   console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="">
      <GrayTopper />
      <div className="grid">
        <div className="grid-cols-12 md:grid-cols-4 ml-9 md:ml-0 lg:grid-cols-3">
          <CourseCard />
        </div>
        <div className="grid-cols-12 md:grid-cols-8 mt-10 md:mt-0 lg:grid-cols-9">
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
    <div className="h-60 bg-gray-900 top-0 min-w-full -mb-96">
      <div className="h-60 flex justify-center flex-col">
        <div>
          <h1 className="text-white text-2xl flex justify-center -mt-20 font-bold">
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
  const [title, setTitle] = useState(courseDetails?.course?.title);
  const [description, setDescription] = useState(
    courseDetails?.course?.description
  );
  const [image, setImage] = useState(courseDetails?.course?.imageLink);
  const [price, setPrice] = useState(courseDetails?.course?.price);

  //For re-render the page to get correct course details in update card
  useEffect(() => {
    setTitle(courseDetails?.course?.title);
    setDescription(courseDetails?.course?.description);
    setImage(courseDetails?.course?.imageLink);
    setPrice(courseDetails?.course?.price);
  }, [courseDetails]);

  return (
    <div>
      <div className="flex flex-col md:w-96 md:ml-9 md:-mt-64 xl:ml-60 xl:-mt-72 bg-gray-800 rounded-lg">
        <div className="h-4/6 shadow-2xl p-10">
          <h1 className="text-xl font-bold text-white">
            Update course details
          </h1>
          <div className="flex flex-col">
            <input
              className="border mt-9 p-2 rounded-lg"
              value={title}
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <input
              className="border mt-9 p-2 rounded-lg"
              value={description}
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <input
              className="border mt-9 p-2 rounded-lg"
              value={image}
              placeholder="ImageLink"
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
            <input
              className="border mt-9 p-2 rounded-lg"
              value={price}
              placeholder="Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          <button
            className="border px-2 py-2 rounded-lg bg-indigo-600 text-white"
            onClick={async () => {
              axios.put(
                `http://localhost:3000/api/admin/${courseDetails?.course?._id}/updateCourse`,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price: price,
                }
              );
              let updatedCourse = {
                _id: courseDetails?.course?._id,
                title: title,
                description: description,
                imageLink: image,
                price: price,
              };
              setCourse({ course: updatedCourse });
              alert("course updated!");
            }}
          >
            Update course
          </button>

          <button
            className="border px-2 py-2 rounded-lg bg-indigo-600 text-white"
            onClick={async () => {
              axios.put(
                `http://localhost:3000/api/admin/${courseDetails?.course?._id}/deleteCourse`
              );
              alert("course deleted!");
              router.push("/");
            }}
          >
            Delete course
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);

  return (
    <div className="dark:bg-slate-400">
      <div className="mt-64 md:ml-auto md:mr-9 lg:mr-44 rounded-lg border bg-white w-72 shadow-lg">
        <div className="">
          <img src={imageLink} className="rounded-lg h-64"></img>
        </div>
        <div className="ml-10">
          <h1 className="font-bold">{title}</h1>
          <Price />
        </div>
      </div>
    </div>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);
  return (
    <>
      <h1 style={{ color: "gray" }}>Price</h1>
      <h1>
        <b>Rs {price} </b>
      </h1>
    </>
  );
}
