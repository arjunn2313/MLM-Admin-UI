// src/pages/admin/sections/NewMembers.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../../App";
import { Config } from "../../../utils/Auth";
import ExpiryModal from "../../../components/modals/ExpiryModal";
import Pagination from "../../../components/Helpers/Pagination";
import LevelsTable from "../../../components/tables/levelsTable";

export default function LevelThree() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);
  const { treeName } = useParams();

  useEffect(() => {
    fetchSectionData();
  }, [searchQuery, currentPage]);

  const fetchSectionData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/admin/levels-tracker/level3-members`,
        {
          params: {
            search: searchQuery,
            page: currentPage,
            limit: 9,
          },
          ...Config(),
        }
      );
     
      setMembers(response.data.members);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (error) {
      setError(error.message || "An error occurred while fetching data.");
      setMembers([]);
      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen">
      {sectionExpired && <ExpiryModal isOpen={sectionExpired} />}
      <div className="p-5 bg-white shadow-md rounded-md">
        <div className="flex items-center justify-end space-x-5">
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

        <LevelsTable members={members} loading={loading} error={error} />
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
