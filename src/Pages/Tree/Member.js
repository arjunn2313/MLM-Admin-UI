import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosSearch, IoIosEye } from "react-icons/io";
import moment from "moment";
import { BaseUrl } from "../../request/URL";
import axios from "axios";
import Spinners from "../../components/placeholders/Spinners";

export default function Member() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { treeName } = useParams();
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchSectionData();
  }, []);

  const fetchSectionData = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/agent/all-tree-members/${treeName}`
      );
      setMembers(response.data.members);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinners />;
  }

  return (
    <div className="p-3 h-fit bg-white shadow-md rounded-md">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
        <div>
          <h2 className="text-2xl text-gray-700 roboto-light-italic">
          Downline Members
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-around gap-3">
          <div className="flex items-center justify-center md:justify-end">
            <div className="border px-5   rounded-lg flex items-center gap-2 border-blue-500 w-full md:w-auto">
              <IoIosSearch />
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                className="outline-none w-full md:w-auto border-0 focus:ring-0"
                placeholder="Search..."
              />
            </div>
          </div>

        
        </div>
      </div> */}

      <div className="overflow-x-auto">
        <table className="min-w-full mt-8">
          <thead>
            <tr>
              <th className="p-2 font-bold text-left">Sl. no.</th>
              <th className="p-2 font-bold text-left">Member ID</th>
              <th className="p-2 font-bold text-left">Name</th>
              <th className="p-2 font-bold text-left">Level</th>
              <th className="p-2 font-bold text-left">Sponsor ID</th>

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
                  <td className="p-2 text-left">{member?.memberId}</td>
                  <td className="p-2 text-left">{member?.name}</td>
                  <td className="p-2 text-left">{member?.level}</td>
                  {member?.isHead ? (
                    <td className="p-2 text-left">Head</td>
                  ) : (
                    <td className="p-2 text-left">{member?.sponsorId}</td>
                  )}

                  <td className="p-2  text-left ">
                    <button className="text-blue-500">
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

      {/* <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    /> */}
    </div>
  );
}
