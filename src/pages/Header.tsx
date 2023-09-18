import React from "react";

const Header = () => {
  return (
    <div className="p-5 bg-slate-400 flex justify-between shadow-lg">
      <div className="text-2xl text-white font-bold"> EduCourse</div>

      <div>
        <button className="p-5 border-gray-500 bg-blue-500 text-white rounded-lg mr-5">
          Signup
        </button>
        <button className="p-5 border-gray-500 bg-blue-500 text-white rounded-lg">
          Signin
        </button>
      </div>
    </div>
  );
};

export default Header;
