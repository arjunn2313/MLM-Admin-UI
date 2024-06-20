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
    <div className="flex flex-col h-screen ">
      <nav className={`md:block ${isOpen ? "block" : "hidden"}`}>
        <ul className="space-y-3 py-3   text-gray-600 roboto-light-italic">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center  space-x-4 py-2 px-6 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
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
                ` flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <LiaUserPlusSolid />
              <span>Register</span>
            </NavLink>
          </li>

          <li>
            <div
              className="flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => setIsTreeOpen(!isTreeOpen)}
            >
              <GiChainLightning />
              <span>Tree</span>
              <span>{isTreeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>
            {isTreeOpen && (
              <div className="relative">
                <ul className="space-y-3  roboto-light-italic  mt-2 ps-12 menu-stepper">
                  <li>
                    <NavLink to="/tree">Tree View</NavLink>
                  </li>
                  <li>
                    <NavLink to="/sponsors">Sponsors</NavLink>
                  </li>
                  <li>
                    <NavLink to="/downline-member">Downline Members</NavLink>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <NavLink
              to="/members"
              className={({ isActive }) =>
                `flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
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
