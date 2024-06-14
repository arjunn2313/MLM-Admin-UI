import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoIosEye } from "react-icons/io";

const members = [
  {
    id: "ID202402",
    name: "Aadhi",
    phone: "+91 90876 54321",
    joiningDate: "12/01/2024",
    sponsorId: "ID202401",
    payment: "Paid",
    status: "Unapproved",
  },
  {
    id: "ID202404",
    name: "Amal Devis",
    phone: "+91 90876 54321",
    joiningDate: "01/02/2024",
    sponsorId: "ID202401",
    payment: "Paid",
    status: "Approved",
  },
  {
    id: "ID202405",
    name: "Reenu",
    phone: "+91 90876 54321",
    joiningDate: "14/02/2024",
    sponsorId: "ID202401",
    payment: "Paid",
    status: "Approved",
  },
  {
    id: "ID202406",
    name: "Praveen",
    phone: "+91 90876 54321",
    joiningDate: "20/02/2024",
    sponsorId: "ID202402",
    payment: "Paid",
    status: "Unapproved",
  },
  {
    id: "ID202407",
    name: "Gokul",
    phone: "+91 90876 54321",
    joiningDate: "11/03/2024",
    sponsorId: "ID202404",
    payment: "Unpaid",
    status: "Unapproved",
  },
  {
    id: "ID202408",
    name: "Ajith",
    phone: "+91 90876 54321",
    joiningDate: "23/03/2024",
    sponsorId: "ID202404",
    payment: "Paid",
    status: "Unapproved",
  },
  {
    id: "ID202409",
    name: "Ajin",
    phone: "+91 90876 54321",
    joiningDate: "07/04/2024",
    sponsorId: "ID202401",
    payment: "Paid",
    status: "Approved",
  },
  {
    id: "ID202410",
    name: "Sherin",
    phone: "+91 90876 54321",
    joiningDate: "18/04/2024",
    sponsorId: "ID202404",
    payment: "Paid",
    status: "Approved",
  },
  {
    id: "ID202411",
    name: "Abish",
    phone: "+91 90876 54321",
    joiningDate: "30/04/2024",
    sponsorId: "ID202405",
    payment: "Unpaid",
    status: "Unapproved",
  },
];

export default function RegisterTable() {
  const navigate = useNavigate();
  return (
    <div className="m-3 p-3 h-screen bg-white shadow-md rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Registered Members</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-around gap-3">
          <div className="flex items-center justify-center md:justify-end">
            <div className="border px-5 py-2 rounded-lg flex items-center gap-2 border-blue-500 w-full md:w-auto">
              <IoIosSearch />
              <input
                type="search"
                className="outline-none w-full md:w-auto"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-lg"
              onClick={() => navigate("/form")}
            >
              New Registration
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full mt-8">
          <thead className=" ">
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
            {members.map((member, index) => (
              <tr key={member.id} className="border-t border-gray-200">
                <td className="p-2 text-left">0{index + 1}</td>
                <td className="p-2 text-left">{member.id}</td>
                <td className="p-2 text-left">{member.name}</td>
                <td className="p-2 text-left">{member.phone}</td>
                <td className="p-2 text-left">{member.joiningDate}</td>
                <td className="p-2 text-left">{member.sponsorId}</td>
                <td className="p-2 text-left">{member.payment}</td>
                <td className="p-2 text-left">{member.status}</td>
                <td className="p-2 text-left">
                  <button className="text-blue-500"><IoIosEye/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
