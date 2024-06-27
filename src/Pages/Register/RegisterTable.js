import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosSearch, IoIosEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../request/URL";
import Pagination from "../../components/Helpers/Pagination";

import moment from "moment";

export default function RegisterTable() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const fetchMembers = async (query = "", page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/agent/list?limit=9`, {
        params: { search: query, page },
      });
      setMembers(response.data.members);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching members:", error);
      setError(error);
      setLoading(false);
    }
  };

  console.log(members);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // if (loading) {
  //   return <TableSkeleton />;
  // }

  if (error) {
    return <div>Error loading members: {error.message}</div>;
  }

  return (
    <div className="m-3 p-3 h-fit bg-white shadow-md rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
        <div>
          <h2 className="text-2xl text-gray-700 roboto-light-italic">
            Registered Members
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

          <div className="flex justify-center md:justify-end">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-lg"
              onClick={() => navigate("form")}
            >
              New Registration
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full mt-8">
          <thead>
            <tr>
              <th className="p-2 font-bold text-left">Sl. no.</th>
              <th className="p-2 font-bold text-left">Member ID</th>
              <th className="p-2 font-bold text-left">Name</th>
              <th className="p-2 font-bold text-left">Phone Number</th>
              <th className="p-2 font-bold text-left">Date of Joining</th>
              <th className="p-2 font-bold text-left">Sponsor ID</th>
              <th className="p-2 font-bold text-left">Payment</th>
              <th className="p-2 font-bold text-left">Status</th>
              <th className="p-2 font-bold text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member, index) => (
                <tr
                  key={member._id}
                  className="border-t border-gray-200 text-gray-700"
                >
                  <td className="p-2 py-4 text-left">{index + 1}</td>
                  <td className="p-2 text-left">{member?.memberId}</td>
                  <td className="p-2 text-left">{member?.name}</td>
                  <td className="p-2 text-left">{member?.phoneNumber}</td>
                  <td className="p-2 text-left">
                    {" "}
                    {moment(new Date(member?.createdAt)).format("DD-MM-YYYY")}
                  </td>
                  {member.isHead ? (
                    <td className="p-2 text-left">Tree Head</td>
                  ) : (
                    <td className="p-2 text-left">{member?.sponsorId}</td>
                  )}
                  <td className="p-2 text-left">{member?.joiningFee} Rs</td>
                  <td
                    className={`p-2 text-left ${
                      member?.status === "Un Approved"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {member.status}
                  </td>
                  <td
                    className="p-2 text-left"
                    onClick={() => navigate(`preview/${member?.memberId}`)}
                  >
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
