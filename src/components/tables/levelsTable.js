import React from "react";
import { useNavigate } from "react-router-dom";
import Spinners from "../placeholders/Spinners";
import { IoIosEye } from "react-icons/io";

export default function LevelsTable({ members, loading, error }) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Spinners />
      </div>
    );
  }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full mt-8">
        <thead>
          <tr>
            <th className="p-2 font-bold text-left">Sl. no.</th>
            <th className="p-2 font-bold text-left">Member ID</th>
            <th className="p-2 font-bold text-left">Name</th>
            <th className="p-2 font-bold text-left">Level</th>
            <th className="p-2 font-bold text-left">Sponsor ID</th>
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
                <td className="p-2 text-left">{member?.level}</td>
                {member?.sponsorId ? (
                  <>
                    <td className="p-2 text-left">{member?.sponsorId}</td>
                    <td className="p-2 text-left">{member?.placementId}</td>
                  </>
                ) : (
                  <>
                    <td className="p-2 text-left">Head</td>
                    <td className="p-2 text-left">Head</td>
                  </>
                )}
                <td
                  className="p-2 text-left"
                  onClick={() =>
                    navigate(`/register/preview/${member?.memberId}`)
                  }
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
  );
}
