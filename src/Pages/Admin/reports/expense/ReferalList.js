import React, { useEffect, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import {
  MdOutlineFileDownload,
  MdOutlineKeyboardBackspace,
} from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import LevelsTable from "../../../../components/tables/levelsTable";
import Dropdown from "../../../../components/Helpers/CustomDropDown";
import Pagination from "../../../../components/Helpers/Pagination";
import { IoIosEye } from "react-icons/io";
import Spinners from "../../../../components/placeholders/Spinners";
import IncomeTable from "../../../../components/tables/IncomTable";
import ReferalTable from "../../../../components/tables/ReferalTable";

export default function ReferalList() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
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
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "New";
  const [today, setToday] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    setToday(`${year}-${month}-${day}`);
  }, []);

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
    <>
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
        <ReferalTable members={members} loading={loading} error={error} />{" "}
      </div>

      <div className="py-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
