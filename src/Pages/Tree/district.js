import React from "react";
import { MdAdd } from "react-icons/md";
export default function District() {
  return (
    <div className="m-3">
      <div className=" w-full p-4 flex flex-wrap justify-start gap-10">
        <div className="bg-white border-2 border-blue-500 cursor-pointer flex flex-col items-center justify-center space-y-4 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-[100px]   rounded-lg">
          <img src="assets\Vector.png" className="w-[25px] h-[25px]" />
          <span className="text-xl text-blue-500 font-bold capitalize">
            Kanniyakumari
          </span>
        </div>

        <div
          //   onClick={handleOpenModal}
          className="bg-white  cursor-pointer flex flex-col items-center justify-center space-y-4 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-[100px] rounded-lg border-2 border-dashed border-orange-300"
        >
          <img
            src="assets\Mask group (3).png"
            className="w-[25px] h-[25px]"
            alt="New Offerings"
          />
          <span
            className="text-md text-orange-400 font-medium"
          >
            New
          </span>
        </div>
      </div>
    </div>
  );
}
