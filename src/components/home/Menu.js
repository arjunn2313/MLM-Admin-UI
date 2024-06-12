import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { GiChainLightning } from "react-icons/gi";
import { PiUsersDuotone } from "react-icons/pi";
import { LiaUserPlusSolid } from "react-icons/lia";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTreeOpen, setIsTreeOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <nav className={`md:block ${isOpen ? "block" : "hidden"}`}>
        <ul className="space-y-3 py-3 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-4 py-2 px-4 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-700" : ""
                }`
              }
            >
              <MdOutlineDashboard />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                ` flex items-center space-x-4 py-2 px-4 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-700 " : ""
                }`
              }
            >
              <LiaUserPlusSolid />
              <span>Register</span>
            </NavLink>
          </li>

          <li>
            <div
              className="flex items-center space-x-4 py-2 px-4 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => setIsTreeOpen(!isTreeOpen)}
            >
              <GiChainLightning />
              <span>Tree</span>
              <span>{isTreeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>
            {/* {isTreeOpen && (
              <div className="pl-4">
                <ul className="space-y-1">
                  <li className="relative flex items-center space-x-2">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full border-l-2 border-gray-300"></div>
                    <span>Tree View</span>
                  </li>
                  <li className="relative flex items-center space-x-2">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full border-l-2 border-gray-300"></div>
                    <span>Sponsors</span>
                  </li>
                  <li className="relative flex items-center space-x-2">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full border-l-2 border-gray-300"></div>
                    <span>Downline Members</span>
                  </li>
                </ul>
              </div>
            )} */}
          </li>

          <li>
            <NavLink
              to="/members"
              className={({ isActive }) =>
                `flex items-center space-x-4 py-2 px-4 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-500" : ""
                }`
              }
            >
              <PiUsersDuotone />
              <span>Members</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
