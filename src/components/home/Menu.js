import React, { useState } from "react";
import { MdAddShoppingCart, MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi";
import { PiUsersDuotone, PiUsersThreeBold } from "react-icons/pi";
import { LiaUserPlusSolid } from "react-icons/lia";
import { ImTree } from "react-icons/im";
import { IoCashOutline, IoPeopleOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { TbFileDescription, TbSettings2 } from "react-icons/tb";
import { GiChainLightning, GiLevelEndFlag } from "react-icons/gi";
import { TfiWallet } from "react-icons/tfi";
import { AiOutlineLogout } from "react-icons/ai";
import CustomModal from "../modals/Modal";
import ReactDOM from "react-dom";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [loading, setLoading] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const navigate = useNavigate();
  const handleCloseLogoutModal = () => {
    setLogOutModal(false);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }, 300);
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 w-64 h-screen bg-white`}
      >
        <button className="md:hidden p-4 text-gray-700" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <nav className="mt-10">
          <ul className="space-y-4 text-gray-800 text-lg  ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <MdOutlineDashboard />
              </span>
              <span className="ml-4 ">Dashboard</span>
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <BiLockAlt />
              </span>
              <span className="ml-4">Register</span>
            </NavLink>
            <NavLink
              to="/tree/district"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <ImTree />
              </span>
              <span className="ml-4">Tree</span>
            </NavLink>
            <NavLink
              to="/incomplete-tree"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <ImTree />
              </span>
              <span className="ml-4">Incomplete Trees</span>
            </NavLink>
            <NavLink
              to="/completed-tree"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <ImTree />
              </span>
              <span className="ml-4 ">Completed Trees</span>
            </NavLink>

            <NavLink
              to="/levels-tracking"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <GiLevelEndFlag />
              </span>
              <span className="ml-4  ">Levels</span>
            </NavLink>

            <NavLink
              to="/members"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <IoPeopleOutline />
              </span>
              <span className="ml-4  ">Members</span>
            </NavLink>

            <li>
              <div
                className={`flex items-center space-x-4 py-2 px-6 hover:bg-blue-500 hover:text-white cursor-pointer ${
                  location.pathname.startsWith("/wallet")
                    ? "text-blue-500 border-l-4 border-blue-700"
                    : ""
                }`}
                onClick={() => setIsTreeOpen(!isTreeOpen)}
              >
                <TfiWallet />
                <span>Wallet</span>
                <span>
                  {isTreeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              {isTreeOpen && (
                <div className="relative">
                  <ul className="space-y-3   mt-2 ps-10 menu-stepper text-md">
                    <li>
                      <NavLink
                        to="/wallet/commission"
                        className={`flex items-center px-6 py-2 hover:bg-blue-100${
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
                        className={`flex items-center px-6 py-2 hover:bg-blue-100${
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
                        className={`flex items-center px-6 py-2 hover:bg-blue-100${
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
            <NavLink
              to="/district-head"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <PiUsersThreeBold />
              </span>
              <span className="ml-4">District Head</span>
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 ${
                  isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                <TbFileDescription />
              </span>
              <span className="ml-4">Reports</span>
            </NavLink>

            <NavLink
              onClick={() => setLogOutModal(true)}
              className={({ isActive }) =>
                `flex items-center px-6 py-2 hover:bg-blue-100 `
              }
            >
              <span className="sidebar-icon">
                <AiOutlineLogout />
              </span>
              <span className="ml-4">Logout</span>
            </NavLink>
          </ul>
        </nav>
      </div>

      {/* Render logout modal outside of sidebar */}
      {ReactDOM.createPortal(
        <CustomModal isOpen={logOutModal} onClose={handleCloseLogoutModal}>
          <div className="flex flex-col items-center">
            <p className="text-red-500 font-semibold text-xl">
              Logout Confirmation
            </p>
            <p className="text-gray-600 text-center mt-2">
              Are you sure you want to logout?
            </p>
            <div className="flex mt-4">
              <button
                className="bg-red-500 text-white p-2 px-4 rounded mr-2"
                onClick={handleLogout}
              >
                {loading ? "Logout..." : "Logout"}
              </button>
              <button
                className="bg-gray-500 text-white p-2 px-4 rounded"
                onClick={handleCloseLogoutModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </CustomModal>,
        document.body // Render the modal at the end of the body
      )}
    </>
  );
}
