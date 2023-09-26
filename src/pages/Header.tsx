import { signIn, signOut } from "next-auth/react";
import AddCourse from "./addcourse";
import Link from "next/link";

const Header = ({ session }) => {
  // console.log(session);
  return (
    <div className="p-5 bg-slate-400 shadow-lg">
      {!session?.data && (
        <div className="flex justify-between">
          <div className="text-2xl py-3 text-white font-bold">EduCourse</div>
          <div>
            <button
              className="px-5 py-3 border-gray-500 bg-blue-500 text-white rounded-lg mr-5"
              onClick={() => signIn()}
            >
              Signup
            </button>
          </div>
        </div>
      )}
      {session?.data && (
        <div className="flex justify-between">
          <div className="text-2xl py-3 text-white font-bold">
            {session?.data?.user?.email}
          </div>
          <div>
            <Link href="/addcourse">
              {" "}
              <button className="px-5 py-3 border-gray-500 bg-blue-500 text-white rounded-lg mr-5">
                Add Course
              </button>
            </Link>

            <button
              className="px-5 py-3 border-gray-500 bg-blue-500 text-white rounded-lg mr-5"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
