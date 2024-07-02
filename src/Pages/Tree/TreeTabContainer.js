import React, { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Tree from "./Tree";
import SponsorContainer from "./sponsors/SponsorContainer";
import DownlineContainer from "./Downline/downlineContainer";
import MemberContainer from "./Member/MemberContainer";

export default function TreeTabContainer() {
  const navigate = useNavigate();
  const { name } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "TreeView";
  

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "TreeView":
        return <Tree />;
      case "Sponsors":
        return <SponsorContainer />;
      case "DownlineMember":
        return <DownlineContainer />;
      case "MemberList":
        return <MemberContainer />;

      default:
        return null;
    }
  };

  return (
    <div className="m-3 ">
      <div className="flex items-center space-x-8">
        <MdOutlineKeyboardBackspace
          size={30}
          className="my-3 text-gray-600 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <span className="text-xl text-blue-500 font-medium roboto-c">
          {name}
        </span>
      </div>

      {/* nav */}
      <div className="bg-white rounded-xl shadow-md px-5">
        <ul className="flex gap-10 text-gray-600 font-medium">
          <li
            className={`p-4 cursor-pointer${
              selectedTab === "TreeView"
                ? " text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => handleTabChange("TreeView")}
          >
            Tree View
          </li>
          <li
            className={`p-4 cursor-pointer${
              selectedTab === "Sponsors"
                ? " text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => handleTabChange("Sponsors")}
          >
            Sponsors
          </li>
          <li
            className={`p-4 cursor-pointer${
              selectedTab === "DownlineMember"
                ? " text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => handleTabChange("DownlineMember")}
          >
            Downline Member
          </li>
          <li
            className={`p-4 cursor-pointer${
              selectedTab === "MemberList"
                ? " text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => handleTabChange("MemberList")}
          >
            Member List
          </li>
        </ul>
      </div>

      {/* render items */}
      <div className="mt-5">{renderContent()}</div>
    </div>
  );
}

 
