import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../App";
import { Config } from "../../../utils/Auth";
import Pagination from "../../../components/Helpers/Pagination";
import Spinners from "../../../components/placeholders/Spinners";
import { IoIosEye } from "react-icons/io";
import Dropdown from "../../../components/Helpers/CustomDropDown";

export default function HeadList() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTreeName, setSelectedTreeName] = useState("All");
  const [selectedTreeDistrict, setSelectedTreeDistrict] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sectionExpired, setSectionExpired] = useState(false);
  const navigate = useNavigate();
  const [treeDistricts, setTreeDistricts] = useState([]);

  useEffect(() => {
    fetchCategory();
    fetchSectionData();
  }, [
    searchQuery,
    currentPage,
    selectedTreeDistrict,
    selectedLevel,
    selectedTreeName,
  ]);

  const fetchSectionData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/admin/district-head/list`,
        {
          params: {
            search: searchQuery,
            page: currentPage,
            limit: 9,
            districtName:
              selectedTreeDistrict === "All" ? "" : selectedTreeDistrict,
          },
          ...Config(),
        }
      );
      setMembers(response.data.members);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      }
      setError(error.message || "An error occurred while fetching data.");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/admin/section/incomplete-filter?districtName=${
          selectedTreeDistrict === "All" ? "" : selectedTreeDistrict
        }`,
        Config()
      );

      setTreeDistricts(["All", ...response.data.districtNames]);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      }
      setError(error.message || "An error occurred while fetching data.");
      setMembers([]);
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

  const handleSelectTreeDistrict = (item) => {
    setSelectedTreeDistrict(item);
    setCurrentPage(1);
  };

  console.log(selectedTreeDistrict);

  return (
    <>
      <div className="m-3 p-5 bg-white   rounded-md">
        {/* filter */}

        <div className="flex items-center justify-between space-x-5">
          <div className="flex lg:space-x-8 items-center">
            <span className="text-xl font-medium text-gray-700">
              District Head
            </span>

            <div>
              <Dropdown
                items={treeDistricts}
                onSelect={handleSelectTreeDistrict}
                label="Tree District"
              />
            </div>
          </div>

          {/* <div className="relative">
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
          </div> */}

          <div>
            <button
              className="bg-blue-500 text-white px-5 py-1 rounded-md"
              onClick={() => navigate("registration")}
            >
              Register District Head
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Spinners />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full mt-8">
              <thead>
                <tr>
                  <th className="p-2 font-bold text-left">Sl. no.</th>
                  <th className="p-2 font-bold text-left">District</th>
                  <th className="p-2 font-bold text-left">Head Name</th>
                  <th className="p-2 font-bold text-left">Number of Trees</th>
                  <th className="p-2 font-bold text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {members?.length > 0 ? (
                  members.map((member, index) => (
                    <tr
                      key={member._id}
                      className="border-t border-gray-200 text-gray-700"
                    >
                      <td className="p-2 py-4 text-left">{index + 1}</td>
                      <td className="p-2 text-left">{member?.districtName}</td>
                      <td className="p-2 text-left">{member?.name}</td>
                      <td className="p-2 text-left">
                        {member?.districtSection?.length}
                      </td>

                      <td className="p-2  text-left flex items-center space-x-3 ">
                        <button
                          onClick={() =>
                            navigate(
                              `/tree/district/${member.districtName}/${member.districtId._id}`
                            )
                          }
                        >
                          <img
                            src="assets/Mask group.svg"
                            alt="tree-icon"
                            className="bg-orange-50 p-1 rounded-lg"
                          />
                        </button>
                        <button
                          className="text-blue-500 cursor-pointer"
                          onClick={() => navigate(`preview/${member?._id}`)}
                        >
                          <IoIosEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="p-2 text-center">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
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
