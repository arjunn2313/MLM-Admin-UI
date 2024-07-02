import React from "react";
import { useSearchParams } from "react-router-dom";
import Tree from "../../../components/Tree/SponsorTree";

export default function SponsorTree() {
    const [searchParams, setSearchParams] = useSearchParams();
    const memberId = searchParams.get("memberId");
    const memberName = searchParams.get("memberName");
    const sponsorId = searchParams.get("sponsorId");
    const headName = searchParams.get("headName");


  return (
    <div className="h-screen overflow-hidden">
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
            <span className="text-blue-500">Sponsor ID :</span>{" "}
            <span className="text-custom-pink">{sponsorId}</span>
          </span>{" "}
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member Name :</span>{" "}
            <span className="text-custom-pink">{headName}</span>
          </span>
        </div>
      </div>

      <Tree head={sponsorId} member={memberId}/>
    </div>
  );
}
