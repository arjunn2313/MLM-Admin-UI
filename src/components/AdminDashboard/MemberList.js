import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../App";
import axios from "axios";
import { Config } from "../../utils/Auth";
import ExpiryModal from "../modals/ExpiryModal";
import Spinners from "../placeholders/Spinners";
import { useNavigate } from "react-router-dom";

const MembersList = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSectionData();
  }, []);

  const fetchSectionData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/api/admin/agent/list`, {
        params: {
          limit: 5,
        },
        ...Config(),
      });
      setMembers(response.data.members);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spinners />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6  overflow-x-auto">
      {sectionExpired && <ExpiryModal isOpen={sectionExpired} />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-500">Members List</h2>
        <button
          className=" text-blue-500 border border-blue-500 py-2 px-4 rounded"
          onClick={() => navigate("/members")}
        >
          View All
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left ">
            <th className="p-2 font-bold">Sl. no.</th>
            <th className="p-2 font-bold">Tree District</th>
            <th className="p-2 font-bold">Tree Name</th>
            <th className="p-2 font-bold">Member ID</th>
            <th className="p-2 font-bold">Name</th>
            <th className="p-2 font-bold">Level</th>
            <th className="p-2 font-bold">Sponsor ID</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index} className="border-t border-gray-200 text-gray-700">
              <td className="p-2 py-4 text-left">0{index + 1}</td>
              <td className="p-2 py-4 text-left">{member.districtName}</td>
              <td className="p-2 py-4 text-left">{member.treeName}</td>
              <td className="p-2 py-4 text-left">{member.memberId}</td>
              <td className="p-2 py-4 text-left">{member.name}</td>
              <td className="p-2 py-4 text-left">{member.level}</td>
              <td className="p-2 py-4 text-left">{member.sponsorId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersList;
