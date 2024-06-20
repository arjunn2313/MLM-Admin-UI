import React from "react";

const TableSkeleton = () => {
  return (
    <div
      role="status"
      className="w-full p-4 space-y-4    divide-y   rounded  animate-pulse   md:p-6 h-full "
    >
      <table className="w-full">
        <thead>
          <tr>
            <th className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-100 rounded-full dark:bg-gray-300"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>

              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-100 rounded-full dark:bg-gray-300"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(4)].map((_, index) => (
            <tr key={index}>
              <td className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                </div>

                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                </div>

                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                </div>

                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 w-12"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TableSkeleton;
