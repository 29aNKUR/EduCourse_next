import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getCsrfToken } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export default function SignIn({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Please add username."),
      password: Yup.string().required("Please add password."),
    }),

    onSubmit: async (data) => {
      if (formik.isValid) {
        toast.loading("Logging you in...", { duration: 1000 });

        const loginData = {
          username: data.username,
          password: data.password,
          callbackUrl: "/",
          redirect: false,
        };

        const login = await signIn("credentials", loginData);
        console.log(login);

        if (login?.ok) {
          toast.success("Successfully Logged in! Redirecting...");
          router.push("/");
        } else {
          toast.error("Login failed.");
        }
      }
    },
  });

  const handleGoogleSignInClick = (e: any) => {
    // Prevent the default behavior for the "Sign in with Google" button
    e.preventDefault();

    // Add your custom Google sign-in logic here
    // For example, you can use the signIn function from NextAuth.js
    signIn("google"); // Replace "google" with your Google provider name

    // You may also want to display a loading message or other UI feedback
    toast.loading("Signing in with Google...", { duration: 1000 });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center mt-10">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.submitForm(); // Use formik.submitForm() to submit the form
          }}
          className="form"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="block font-bold my-5">
            Username
            <input
              className="w-full px-3 py-2 rounded-md border border-slate-400 dark:text-white dark:bg-gray-700"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error">
                {formik.errors.username}
              </p>
            ) : null}
          </label>
          <label className="block font-bold my-5">
            Password
            <input
              className="w-full px-3 py-2 rounded-md border border-slate-400 dark:text-white dark:bg-gray-700"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <p className="error">
                {formik.errors.password}
              </p>
            ) : null}
          </label>
          <div className="flex flex-col items-center">
            {/* {Object.values(providers).map((provider) => (
            <button
              type="submit"
              key={provider.name}
              className="bg-indigo-700 hover:bg-indigo-800 dark:text-white font-bold text-xl px-4 py-2 rounded-md mt-4 border shadow-lg"
            >
              Sign in with {provider.name}
            </button>
          ))} */}
            {Object.values(providers).map((provider) => {
              if (provider.name === "Credentials") {
                return (
                  <button
                    type="submit"
                    key={provider.name}
                    className="button"
                  >
                    Sign in with {provider.name}
                  </button>
                );
              }
              return null;
            })}

            <hr />
            <br />
            <span className="text-sm text-gray-500 dark:text-white">---------------or---------------</span>
            {Object.values(providers).map((provider) => {
              if (provider.name === "Google") {
                return (
                  <button
                    key={provider.name}
                    onClick={handleGoogleSignInClick} // Add the click handler
                    className="button"
                  >
                    Sign in with {provider.name}
                  </button>
                );
              }
              return null;
            })}
          </div>

         
 
          <Toaster />
        </form>
      </div>

      <hr />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers: providers ?? [],
      csrfToken,
    },
  };
}
