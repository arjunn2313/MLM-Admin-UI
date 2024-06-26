import React from "react";
import Spinners from "../placeholders/Spinners";

export default function SectionTable({ sectionData, loading }) {
  const tableHeading = [
    "Sl. no.",
    "Tree Name ",
    "Tree Head",
    "Total Levels",
    "No. of Members",
    "Action",
  ];
  if (loading) {
    return <Spinners />;
  }
  return (
    <div className="overflow-x-auto  ">
      {sectionData?.length === 0 ? (
        <div className="flex items-center justify-center">
          <p>No data found</p>
        </div>
      ) : (
        <>
          <table className="min-w-full mt-8">
            <thead>
              <tr>
                {tableHeading?.map((heading) => (
                  <th className="p-2 font-bold text-left" key={heading}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectionData?.map((data, index) => (
                <tr
                  key={data._id}
                  className={`border-t border-gray-200 capitalize`}
                >
                  <td className="p-2  text-left">{index + 1}</td>
                  <td className="p-2  text-left">{data.treeName}</td>
                  <td className="p-2  text-left">{data.headName}</td>
                  <td className="p-2  text-left">{data.levels}</td>
                  <td className="p-2  text-left">{data.levels}</td>
                  <td className="p-2  text-left ">
                    <img
                      src="assets\Mask group.svg"
                      alt="tree-icon"
                      className="bg-orange-50 p-1 rounded-lg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
