import React, { useState } from "react";
import Header from "../../components/Tree/memberdash/header";
import Pagination from "../../components/Helpers/Pagination";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
 

export default function MemberExpense() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen m-3">
        <div className="d-flex items-center py-2 text-gray-800 cursor-pointer">
        <MdOutlineKeyboardBackspace
          size={30}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>

      <Header />

      <div className="p-3 h-[80%] mt-3  bg-white   border-2 border-blue-400 rounded-md">
        <div className="flex items-center justify-between space-x-5">
          <div className="flex gap-6">
            <h5 className="text-lg text-blue-500 font-semibold">
              Earnings History
            </h5>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-54 py-1 ps-8 text-sm text-gray-900 rounded bg-white focus:ring-lavender--600 focus:border-lavender--600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lavender--600 dark:focus:border-lavender--600"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left mt-8">
            <thead>
              <tr className="text-lg font-semibold text-gray-700">
                <th className="py-2">Sl. no.</th>
                <th className="py-2">Expense Date</th>
                <th className="py-2">Expense Type</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <tr key={index} className="border-t text-gray-700 ">
                  <td className="py-3">{item}</td>
                  <td className="py-3">01/07/2024</td>
                  <td className="py-3">Office Supplies</td>
                  <td className="py-3">Rs. 100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="py-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
