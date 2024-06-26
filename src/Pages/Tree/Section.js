import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionTable from "../../components/Tree/SectionTable";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { BaseUrl } from "../../request/URL";

export default function Section() {
  const { name, districtId } = useParams();
  const navigate = useNavigate();
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSectionData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/section/list/${districtId}`);
      setSectionData(response.data.sections);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionData();
  }, [name]);

  return (
    <div className="m-3">
      <MdOutlineKeyboardBackspace
        size={30}
        className="my-3 text-gray-600 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className=" bg-white rounded-lg px-5 py-5">
        <div className="grid grid-cols-2 ">
          <div className="capitalize text-blue-500 roboto-c text-xl font-bold">
            {name}
          </div>
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
                //   value={searchQuery}
                //   onChange={handleSearch}
              />
            </div>

            <div>
              <button className="bg-blue-500 text-white px-5 py-1 rounded-md">
                New Tree
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="my-5">
          <SectionTable sectionData={sectionData} loading={loading} />
        </div>
      </div>
    </div>
  );
}
