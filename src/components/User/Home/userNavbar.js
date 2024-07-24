import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md  ">
      <div className="     py-4 flex justify-between items-center    ">
        <div className="flex items-center  ">
          <div className="bg-blue-500 text-white px-4 py-1 text-2xl text-center rounded-r-full font-bold">
            MLM
          </div>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-8 px-5">
          <button
            className="text-blue-500 p-1 px-3 rounded-full border border-blue-500"
            onClick={() => navigate("/user/register/form")}
          >
            New Registration
          </button>
          <div className="flex items-center space-x-2 border-l pl-4 border-blue-300">
            <img
              className="w-8 h-8 rounded-full"
              src="assets/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer 1.png"
              alt="Profile"
            />
            <div className="space-y-1">
              <div className="text-sm font-medium">Joseph</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
