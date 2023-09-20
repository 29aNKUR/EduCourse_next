// import {useRecoilValue} from "recoil";
// import { userEmailState } from "../store/selectors/userEmail"
// import {isUserLoading} from "../store/selectors/isUserLoading";
import { useRouter } from "next/router";
import Header from "./header";
import { useSession, signIn, signOut } from "next-auth/react";
import Courses from "./courses";


const Home = () => {
  const session = useSession();
  // const router = useRouter();
  // const userEmail = useRecoilValue(userEmailState);
  // const userLoading = useRecoilValue(isUserLoading);
  return (
    <div>
      <Header session={session}/>
      {session.data && <div><Courses/></div>}
      {!session.data && <div className="flex justify-between mt-40 ml-5">
          <div className="">
            <h1>EduCourse Admin</h1>
            <h5>A place to learn and grow</h5>
            <div className="mt-5">
              <button className="p-5 border-gray-500 bg-blue-500 text-white rounded-lg mr-5">
                Signup
              </button>
              <button className="p-5 border-gray-500 bg-blue-500 text-white rounded-lg">
                Signin
              </button>
            </div>
          </div>
          <div className="mr-10">
            <img
              src={
                "https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg"
              }
            />
          </div>
        </div>}  
       
    </div>
  );
};

export default Home;
