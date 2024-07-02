import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi";
import { PiUsersDuotone } from "react-icons/pi";
import { LiaUserPlusSolid } from "react-icons/lia";
import { ImTree } from "react-icons/im";
import { IoPeopleOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { TbFileDescription } from "react-icons/tb";
import { GiChainLightning } from "react-icons/gi";
import { TfiWallet } from "react-icons/tfi";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen   ">
      <nav>
        <ul className="space-y-3 py-3 text-lg text-gray-600 roboto-light-italic">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center  space-x-4 py-2 px-6 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <MdOutlineDashboard size={25} />
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
              <BiLockAlt size={25} />
              <span>Register</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tree/district"
              className={({ isActive }) =>
                ` flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <ImTree size={25} />
              <span>Tree</span>
            </NavLink>
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
              <IoPeopleOutline size={25} />
              <span>Members</span>
            </NavLink>
          </li>

          <li>
            <div
              className={`flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white cursor-pointer ${
                location.pathname.startsWith("/wallet")
                  ? "text-blue-500 border-l-4 border-blue-700"
                  : ""
              }`}
              onClick={() => setIsTreeOpen(!isTreeOpen)}
            >
              <TfiWallet size={25} />
              <span>Wallet</span>
              <span>{isTreeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>
            {isTreeOpen && (
              <div className="relative">
                <ul className="space-y-3  roboto-light-italic  mt-2 ps-12 menu-stepper text-lg">
                  <li>
                    <NavLink
                      to="/wallet/commission"
                      className={`${
                        location.pathname.includes("/commission") &&
                        "text-blue-500"
                      }`}
                    >
                      Commission
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wallet/referal"
                      className={`${
                        location.pathname.includes("/referal") &&
                        "text-blue-500"
                      }`}
                    >
                      Referral Bonus
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wallet/settings"
                      className={`${
                        location.pathname.includes("/settings") &&
                        "text-blue-500"
                      }`}
                    >
                      Settings
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <TbFileDescription size={25} />
              <span>Reports</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
