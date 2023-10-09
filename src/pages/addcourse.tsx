import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup"; // Use lowercase 'y' for Yup

const addcourse = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      price: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      description: Yup.string().required("Description is required."),
      image: Yup.string().required("Image Link is required."),
      price: Yup.string().required("Price is required."), // Change to string
    }),
    onSubmit: async (data) => {
      try {
        const response = await axios.put(
          `${process.env.NEXTAUTH_URL || ''}/api/admin/addCourse`,
          {
            title: data.title,
            description: data.description,
            imageLink: data.image,
            price: data.price,
          }
        );
        alert("course added!");
        console.log(response);
        router.push("/");
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center justify-center h-screen mt-10">
        <div className="my-7 border-2 p-5 shadow-2xl">
          <div className="mb-3">
            <input
              type="text"
              id="title"
              placeholder="Course Title"
              className="border rounded-lg p-2"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.errors.title && formik.touched.title ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.title}
              </p>
            ) : null}
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="description"
              placeholder="Course Description"
              className="border rounded-lg p-2"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.errors.description && formik.touched.description ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.description}
              </p>
            ) : null}
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="image"
              placeholder="Course ImageLink"
              className="border rounded-lg p-2"
              onChange={formik.handleChange}
              value={formik.values.image}
            />
            {formik.errors.image && formik.touched.image ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.image}
              </p>
            ) : null}
          </div>
          <div className="mb-3">
            <input
              type="number"
              id="price"
              placeholder="Course Price"
              className="border rounded-lg p-2"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            {formik.errors.price && formik.touched.price ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.price}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="button"
          >
            Add Course
          </button>
        </div>
      </div>
    </form>
  );
};

export default addcourse;
