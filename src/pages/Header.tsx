import { signIn, signOut, useSession } from "next-auth/react";
import AddCourse from "./addcourse";
import Link from "next/link";


const Header = () => {

  const {data:session} = useSession();
    // console.log(session,"header session"); 
  return (
    <div className="p-3 shadow-lg w-auto">
      {!session?.user?.email && (
        <div className="flex justify-between">
          <div className="text-2xl py-1 font-bold">EduCourse</div>
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
      {session?.user?.email && (
        <div className="flex justify-between relative">
          <div className="text-2xl py-1 font-bold">
            EduCourse
          </div>
          <div>
            <Link href="/addcourse">
              {" "}
              <button className="md:px-5 md:py-3 py-1 px-1 m-1 md:mx-5 border-gray-500 bg-blue-500 text-white rounded-lg mr-5">
                Add Course
              </button>
            </Link>

            <Link href="/"> <button className="hidden md:inline md:px-5 md:py-3 py-1 px-1 m-1 md:mx-5 border-gray-500 bg-blue-500 text-white rounded-lg mr-5">
            Courses  
            </button></Link>
           

            <button
              className="md:px-5 md:py-3 py-1 px-1 md:mx-5 border-gray-500 bg-blue-500 text-white rounded-lg md:mr-5"
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
