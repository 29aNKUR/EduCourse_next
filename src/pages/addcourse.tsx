import axios from "axios";
import { useRouter } from "next/navigation";

const addcourse = () => {
  const router = useRouter();
  const init = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/addCourse"
      );
      //   setCourse({course: response?.data?.course});
      console.log(response);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex-col justify-center m-60">
      <div className="my-7">
        <div className="my-2">
          <input type="text" placeholder="Course Title" className="border"/>
        </div>

        <div className="my-2">
          <input type="text" placeholder="Course Description" className="border"/>
        </div>

        <div className="my-2">
          <input type="text" placeholder="Course ImageLink" className="border"/>
        </div>

        <div className="my-2">
          <input type="text" placeholder="Course Price" className="border"/>
        </div>
      </div>
      <button
        onClick={() => init()}
        className="px-5 py-3 border-gray-500 bg-blue-500 text-white rounded-lg mr-5"
      >
        Add Course
      </button>
    </div>
  );
};

export default addcourse;
