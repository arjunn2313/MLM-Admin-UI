import React from "react";
import { useNavigate } from "react-router-dom";

const ExpenseHistory = ({member}) => {
  const navigate = useNavigate()
  return (
    <div className="p-4 bg-white rounded-xl border-2 border-blue-400">
      <div className="flex items-center justify-between ">
      <h2 className="font-semibold text-lg mb-4 text-blue-500">Expense History</h2>
      <button className="border-2 border-blue-400 p-1 px-3 rounded-lg text-md text-blue-500"
       onClick={()=>navigate(`?tab=MemberList&tree=history&memberId=${member?.memberId}`)}
      >View All</button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-lg font-semibold text-gray-700">
            <th className="py-2">Sl. no.</th>
            <th className="py-2">Expense Date</th>
            <th className="py-2">Expense Type</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <tr key={index} className="border-t text-gray-700 ">
              <td className="py-3">{item}</td>
              <td className="py-3">01/07/2024</td>
              <td className="py-3">Office Supplies</td>
              <td className="py-3">Rs. 100</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseHistory;
