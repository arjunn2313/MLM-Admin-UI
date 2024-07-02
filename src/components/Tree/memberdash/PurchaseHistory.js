import React from "react";

const PurchaseHistory = () => {
  return (
    <div className="p-4 bg-white rounded-xl border-2 border-blue-400">
      <h2 className="font-semibold text-lg mb-4 text-blue-500">Purchase History</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-lg font-semibold text-gray-700">
            <th className="py-2">Sl. no.</th>
            <th className="py-2">Purchase Date</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <tr key={index} className="border-t text-gray-700">
              <td className="py-3">{item}</td>
              <td className="py-3">07/12/2023</td>
              <td className="py-3">Rs. 200</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
