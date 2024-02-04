//Working
import { courseState } from "@/store/atoms/course";
import {
  courseDescription,
  // courseDescription,
  courseImage,
  coursePrice,
  courseTitle,
  // courseDetails
} from "@/store/selectors/course";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ShimmerCourse from "../../../components/shimmerCourse";
import toast from "react-hot-toast";

const Course = () => {
  const { query } = useRouter();
  // console.log(query, "Router");
  const setCourse = useSetRecoilState(courseState);
  // const courseDetail = useRecoilValue(courseDetails);
  const [loading, setLoading] = useState(true);

    const init = async () => {
      try {
        const response = await axios.get(`/api/admin/${query.id}/route`);
        setCourse({ course: response?.data?.courses });
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };    // console.log(courseDetail,"new courseDetails") 

  useEffect(() => {
    init();
  }, [query.id]);

  // const course = useRecoilValue(courseState);
  // console.log(course,"course")

  if (loading) {
    return <ShimmerCourse />;
  }

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
  console.log(courseDetails,"courseDetails")
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
    if(courseDetails?.course){
    setTitle(courseDetails?.course?.title || "");
    setDescription(courseDetails?.course?.description || "");
    setImage(courseDetails?.course?.imageLink || "");
    setPrice(
      typeof courseDetails?.course?.price === 'number'
        ? courseDetails?.course?.price
        : parseFloat(courseDetails?.course?.price || '0')
    );
    }
  }, [courseDetails]);

  return (
    <div>
     <div className="p-5 md:border shadow-lg rounded-lg">
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
              `/api/admin/${courseDetails?.course?.id}/updateCourse`,
              {
                title: title,
                description: description,
                imageLink: image,
                published: true,
                price: price || 0,
              }
            );
            let updatedCourse = {
              id: courseDetails?.course?.id || '',
              title: title,
              description: description,
              imageLink: image,
              price: price || 0,
            };
            setCourse({ course: updatedCourse });
            toast.success("Course Updated!");
          }}
        >
          Update Course
        </button>

        <button
          className="button"
          onClick={async () => {
            axios.put(
              `/api/admin/${courseDetails?.course?.id}/deleteCourse`
            );
            toast.success("course deleted!");
            router.push("/");
          }}
        >
          Delete Course
        </button>
      </div>
    </div>
  </div>
   
  );
}

function CourseCard() {
  const imageLink = useRecoilValue(courseImage);
  const desc = useRecoilValue(courseDescription)

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

    <div className="md:flex md:justify-center md:h-screen border:none md:border p-5 shadow-lg w-1 md:p-5 md:w-3 lg:my-5 z-20 rounded-lg">
      <div>
        <img className="rounded-lg flex justify-start" src={imageLink} alt="product image" style={{ height: "400px", width: "400px" }}/>
        <div className="mt-2">
          <h5 className="font-bold md:tracking-wide">{desc}</h5>
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              <h1 className="text-gray-500"> Price </h1>
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
      <b className="">{price} </b>
      {/* </h1> */}
    </>
  );
}
