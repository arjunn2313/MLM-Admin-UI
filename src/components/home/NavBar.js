import React from "react";
import Drawer from "./Drawer";
import { FcBusinessman } from "react-icons/fc";

const Navbar = () => {
  return (
    <nav className="bg-white  ">
      <div className="  mx-auto   py-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white px-10 py-1 text-2xl  text-center rounded-r-full  font-bold">
           S I P
          </div>
        </div>

        <div className="lg:pe-14  py-3 flex">
          <div className="flex items-center justify-center space-x-2 border-l ps-6 border-blue-300">
            <img
              className="w-8 h-8 rounded-full"
              src="assets\waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer 1.png"
              alt="Profile"
            />
            <div className="space-y-1">
              <div className="text-sm font-medium">Joseph</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>

          <Drawer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
