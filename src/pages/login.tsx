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
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-purple-700 to-amber-700">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex flex-col justify-center mt-10">
            <button onClick={() => signIn(provider.id)} className="bg-indigo-700 border font-bold text-xl w-48">
              Sign in with {provider.name}
            </button>
          </div>
        ))}

        {" "}
        <form onSubmit={formik.handleSubmit} className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Username
            <input
            className="w-96 px-3 py-2 rounded-md border border-slate-400" 
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username && formik.touched.username ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.username}
              </p>
            ) : null}
          </label>
          <label>
            Password
            <input
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            ) : null}
          </label>
          <button type="submit">Sign in</button>
          <Toaster />
        </form>
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
