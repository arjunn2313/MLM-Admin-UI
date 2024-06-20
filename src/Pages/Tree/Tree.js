import React from "react";
import { IoIosSearch } from "react-icons/io";
import BinaryTree from "./BinaryTree";

export default function Tree() {
  return (
    <div className="m-3">
      <div className="w-full bg-white grid grid-cols-1 md:grid-cols-4 p-3 rounded-md gap-4">
        <div className="flex items-center justify-center md:justify-start md:ps-10">
          <span className="text-3xl text-blue-500 font-bold">Tree View</span>
        </div>
        <div className="flex flex-col items-center md:items-start gap-3 border-t md:border-t-0 md:border-l md:ps-5 border-blue-500 pt-3 md:pt-0">
          <span className="text-amber-800 font-semibold text-lg">12</span>
          <span className="text-blue-500 font-semibold text-lg">
            Total Members
          </span>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3 border-t md:border-t-0 md:border-l md:ps-5 border-blue-500 pt-3 md:pt-0">
          <span className="text-amber-800 font-semibold text-lg">02/06</span>
          <span className="text-blue-500 font-semibold text-lg">
            Total Levels
          </span>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <div className="border px-3   rounded-lg flex items-center gap-2 border-blue-500 w-full md:w-auto">
            <IoIosSearch />
            <input
              type="search"
              className="outline-none w-full md:w-auto border-0 focus:ring-0"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      {/* tree */}

      <BinaryTree/>
    </div>
  );
}
