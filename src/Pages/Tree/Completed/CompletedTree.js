import React from 'react'
import { useSearchParams } from "react-router-dom";
import Tree from "../../../components/Tree/DownlineTree";

export default function CompletedTree() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memberId = searchParams.get("memberId");
  const memberName = searchParams.get("memberName");
  return (
    <div className="h-screen overflow-hidden ">
      <div className="bg-white w-full p-3 flex gap-10 rounded">
        <div className="flex flex-col px-10 space-y-3">
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member ID :</span>{" "}
            <span className="text-custom-orange">{memberId}</span>
          </span>
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member Name :</span>{" "}
            <span className="text-custom-orange">{memberName}</span>
          </span>
        </div>

        <div className="flex flex-col px-10 border-l border-blue-500 space-y-3">
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Level :</span>{" "}
            <span className="text-custom-pink"> </span>
          </span>{" "}
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Total Downline members :</span>{" "}
            <span className="text-custom-pink"> </span>
          </span>
        </div>
      </div>

      <Tree member={memberId} />
    </div>
  );
}
