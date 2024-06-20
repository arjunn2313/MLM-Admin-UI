import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 my-3 pt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-3 bg-gray-200 text-gray-700 rounded-full disabled:opacity-50"
      >
        <IoIosArrowBack/>
      </button>
      <button
        className={`px-4 py-2 rounded ${
          currentPage
            ? "text-white bg-blue-500 rounded-full"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {currentPage}
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-3 rounded-full bg-gray-200 text-gray-700   disabled:opacity-50"
      >
       <IoIosArrowForward/>
      </button>
    </div>
  );
};

export default Pagination;