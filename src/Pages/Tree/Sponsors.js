import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosEye } from "react-icons/io";
import moment from "moment";

export default function Sponsors() {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className=" p-3 h-fit bg-white shadow-md rounded-md">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
        <div>
          <h2 className="text-2xl text-gray-700 roboto-light-italic">
            Sponsors
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
              Change Sponsors
            </button>
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
              <th className="p-2 font-bold text-left">Sponsor ID</th>
              <th className="p-2 font-bold text-left">Sponsor Level</th>
              <th className="p-2 font-bold text-left">Placement</th>
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
                  <td className="p-2 text-left">{member?.phoneNumber}</td>
                  <td className="p-2 text-left">
                    {" "}
                    {moment(new Date(member?.createdAt)).format("DD-MM-YYYY")}
                  </td>
                  <td className="p-2 text-left">{member?.sponsorId}</td>
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

      {/* <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  /> */}
    </div>
  );
}
