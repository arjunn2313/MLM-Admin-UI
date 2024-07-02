import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function SetCommision() {
  const [commissions, setCommissions] = useState([
    { level: "01", amount: "Rs. 250" },
    { level: "02", amount: "Rs. 1,250" },
    { level: "03", amount: "Rs. 6,250" },
    { level: "04", amount: "Rs. 31,250" },
    { level: "05", amount: "Rs. 1,56,250" },
    { level: "06", amount: "Rs. 7,81,250" },
  ]);

  const handleAddValue = () => {
    setCommissions([...commissions, { level: "", amount: "" }]);
  };

  const handleDelete = (index) => {
    const newCommissions = commissions.filter((_, i) => i !== index);
    setCommissions(newCommissions);
  };

  return (
    <div className=" rounded  h-full ">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Commission per person
        </h2>

        <input
          type="text"
          className="border-2 border-blue-400 rounded-lg p-2 w-80 mb-4"
          defaultValue="Rs. 50"
        />

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Set level wise commission
        </h2>
        {commissions.map((commission, index) => (
          <div
            key={index}
            className="flex items-center space-x-5 space-y-2 w-[90%] mb-2"
          >
            <input
              type="text"
              className="border-2 border-blue-400 rounded-lg p-2 w-full "
              value={commission.level}
              onChange={(e) => {
                const newCommissions = [...commissions];
                newCommissions[index].level = e.target.value;
                setCommissions(newCommissions);
              }}
              placeholder="Level"
            />
            <input
              type="text"
              className="border-2 border-blue-400 rounded-lg p-2 w-full"
              value={commission.amount}
              onChange={(e) => {
                const newCommissions = [...commissions];
                newCommissions[index].amount = e.target.value;
                setCommissions(newCommissions);
              }}
              placeholder="Commission Amount (Rs)"
            />
            <button
              className="text-red-500 flex items-center justify-center gap-3"
              onClick={() => handleDelete(index)}
            >
              <RiDeleteBin6Line />
              Delete
            </button>
          </div>
        ))}
        <button
          className="text-blue-500 mb-4 font-medium underline text-md"
          onClick={handleAddValue}
        >
          + Add values
        </button>
      </div>

      <div className="bg-white mt-3 p-10 rounded">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Cash Debit</h2>
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <input type="checkbox" id="levelwise-debit" className="mr-5 border-blue-500 border-2 focus:ring-0 rounded" />
            <label htmlFor="levelwise-debit" className="text-gray-700 text-lg">Level Wise Debit</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="weekly-debit" className="mr-5  border-blue-500 border-2 focus:ring-0 rounded" />
            <label htmlFor="weekly-debit" className="text-gray-700 text-lg">Weekly Debit</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="immediate-debit" className="mr-5  border-blue-500 border-2 focus:ring-0 rounded" />
            <label htmlFor="immediate-debit" className="text-gray-700 text-lg">Immediate Debit</label>
          </div>
        </div>
      </div>

      <div className="flex justify-end py-5 space-x-4">
        <button className="  text-red-500 font-medium px-4 py-2 rounded-lg text-lg">
          Discard
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
