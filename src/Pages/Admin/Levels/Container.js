import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NewMembers from "./New";
import LevelOne from "./LevelOne";
import LevelTwo from "./LevelTwo";
import LevelThree from "./LevelThree";
import LevelFour from "./LevelFour";
import LevelFive from "./LevelFive.js";
import LevelSix from "./LevelSix";

export default function Container() {
  const navigate = useNavigate();
  const { name } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "New";

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "New":
        return <NewMembers />;

      case "level-01":
        return <LevelOne />;

      case "level-02":
        return <LevelTwo />;

      case "level-03":
        return <LevelThree />;

      case "level-04":
        return <LevelFour />;

      case "level-05":
        return <LevelFive />;

      case "level-06":
        return <LevelSix />;

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
          onClick={() => navigate("/levels-tracking")}
        />
        <span className="text-xl text-blue-500 font-medium roboto-c">
          Levels
        </span>
      </div>
      {/* tab */}
      <div className="bg-white rounded-xl shadow-md px-5 ">
        <div className="flex flex-row sm:flex-row justify-between items-center">
          <ul className="flex flex-nowrap gap-4 sm:gap-10 text-gray-600 font-medium overflow-x-auto">
            {[
              "New",
              "level-01",
              "level-02",
              "level-03",
              "level-04",
              "level-05",
              "level-06",
            ].map((tab, index) => (
              <li
                key={index}
                className={`p-4 cursor-pointer whitespace-nowrap text-sm sm:text-base md:text-md ${
                  selectedTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : ""
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab === "New" ? "New" : `Level 0${index}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* render items */}
      <div className="mt-5">{renderContent()}</div>
    </div>
  );
}
