import React from "react";
import { PiUserCircleLight } from "react-icons/pi";

const DownlineMembers = () => {
  const members = [
    { name: "Praveen", id: "ID202406" },
    { name: "Gokul", id: "ID202407" },
  ];

  return (
    <div className="p-4 h-full bg-white shadow rounded-xl border-2 border-blue-400">
      <h2 className="font-bold text-lg mb-4 text-blue-500">Downline Members</h2>
      <div className="space-y-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 py-2 border-b"
          >
            <img src="assets\Add.svg" alt="down" />
            <div>
              <p className="font-bold">{member.name}</p>
              <p>{member.id}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center space-x-4 py-2 border-b">
          <img src="assets\downline.svg" alt="down" />
          <div className="text-custom-orange font-semibold">Add</div>
        </div>
      </div>
    </div>
  );
};

export default DownlineMembers;
