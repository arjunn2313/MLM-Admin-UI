import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="m-3">
      <div className="w-full p-4 flex flex-wrap justify-start gap-10">
        <div
          onClick={() => navigate(`income`)}
          className="bg-white border-2 border-blue-500 cursor-pointer flex  items-center justify-center space-x-4   w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-[100px] rounded-lg"
        >
          <span>
            <img src="assets\income.png" className="w-[30px] h-[30px] " />
          </span>
          <span className="text-xl text-blue-500 font-bold capitalize">
            Income
          </span>
        </div>

        <div
          onClick={() => navigate(`expense?tab=Commission`)}
          className="bg-white border-2 border-blue-500 cursor-pointer flex  items-center justify-center space-x-4   w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-[100px] rounded-lg"
        >
          <span>
            <img src="assets\expense.png" className="w-[30px] h-[30px] " />
          </span>
          <span className="text-xl text-blue-500 font-bold capitalize">
           Expense
          </span>
        </div>
      </div>
    </div>
  );
}
