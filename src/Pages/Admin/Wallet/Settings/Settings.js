import React from "react";
import { useSearchParams } from "react-router-dom";
import SetCommision from "./SetCommision";
import SetReferal from "./SetReferal";

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "commision";

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "commision":
        return <SetCommision />;
      case "referal":
        return <SetReferal />;
      default:
        return null;
    }
  };

  return (
    <div className="m-3 h-fit   overflow-hidden">
      <div className="flex gap-2 overflow-hidden">
        <div className="bg-white min-h-screen w-1/4 ">
          <ul className="text-lg text-gray-600 font-medium cursor-pointer">
            <li
              className={`border-b  p-7 ${ selectedTab === "commision" && "bg-blue-200"}`}
              onClick={() => handleTabChange("commision")}
            >
              Commission
            </li>
            <li
              className={`border-b  p-7 ${ selectedTab === "referal" && "bg-blue-200"}`}
              onClick={() => handleTabChange("referal")}
            >
              Referral Bonus
            </li>
          </ul>
        </div>
        <div className=" w-3/4 h-full">{renderContent()}</div>
      </div>
    </div>
  );
}
