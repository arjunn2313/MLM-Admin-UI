import React, { useEffect, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import {
  MdOutlineFileDownload,
  MdOutlineKeyboardBackspace,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../../components/Helpers/CustomDropDown";
import Pagination from "../../../../components/Helpers/Pagination";
import IncomeTable from "../../../../components/tables/IncomTable";

export default function IncomeList() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);
  const [selectedTreeName, setSelectedTreeName] = useState("All");
  const [selectedTreeDistrict, setSelectedTreeDistrict] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [date, setDate] = useState("");
  const [treeNames, setTreeNames] = useState([]);
  const [treeDistricts, setTreeDistricts] = useState([]);
  const levels = ["All", 0, 1, 2, 3, 4, 5];

  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    setToday(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    // setFromDate(today);
    // setToDate(today);
  }, [date]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectTreeName = (item) => {
    setSelectedTreeName(item);
    setCurrentPage(1);
  };

  const handleSelectTreeDistrict = (item) => {
    setSelectedTreeDistrict(item);
    setCurrentPage(1);
  };

  const handleSelectLevel = (item) => {
    setSelectedLevel(item);
    setCurrentPage(1);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="m-3 ">
      <div className="flex items-center justify-between mx-2">
        <div className="flex items-center space-x-8">
          <MdOutlineKeyboardBackspace
            size={30}
            className="my-3 text-gray-600 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <span className="text-xl text-blue-500 font-medium roboto-c">
            Income Report
          </span>
        </div>

        <div className="flex items-center space-x-5">
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

          <div className="flex flex-col items-center text-custom-orange font-medium">
            <span>
              <MdOutlineFileDownload size={20} />
            </span>
            <span className="text-sm ">Download</span>
          </div>

          <div className="flex flex-col items-center text-custom-orange font-medium">
            <span>
              <FiPrinter size={20} />
            </span>
            <span className="text-sm ">Print</span>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="p-5 bg-white shadow-md rounded-md ">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-0 border rounded-lg px-1 w-full lg:w-auto">
              <label htmlFor="from-date" className="text-gray-700">
                From:
              </label>
              <input
                type="date"
                id="from-date"
                className="border-0 focus:ring-0 rounded px-2 py-1"
                max={today}
                value={fromDate}
                onChange={handleFromDateChange}
              />
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-0 border rounded-lg px-1 w-full lg:w-auto">
              <label htmlFor="to-date" className="text-gray-700">
                To:
              </label>
              <input
                type="date"
                id="to-date"
                className="border-0 focus:ring-0 rounded px-2 py-1"
                max={today}
                value={toDate}
                onChange={handleToDateChange}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div>
              <Dropdown
                items={treeDistricts}
                onSelect={handleSelectTreeDistrict}
                label="Tree District"
              />
            </div>

            <div>
              <Dropdown
                disabled={selectedTreeDistrict === "All"}
                items={treeNames}
                onSelect={handleSelectTreeName}
                label="Tree Name"
              />
            </div>

            <div>
              <Dropdown
                items={levels}
                onSelect={handleSelectLevel}
                label="Level"
              />
            </div>
          </div>
        </div>
        <IncomeTable members={members} loading={loading} error={error} />
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
