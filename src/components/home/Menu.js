import React, { useState } from "react";
import { MdAddShoppingCart, MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiLockAlt } from "react-icons/bi";
import { PiUsersDuotone } from "react-icons/pi";
import { LiaUserPlusSolid } from "react-icons/lia";
import { ImTree } from "react-icons/im";
import { IoCashOutline, IoPeopleOutline } from "react-icons/io5";
import { SlSettings } from "react-icons/sl";
import { TbFileDescription, TbSettings2 } from "react-icons/tb";
import { GiChainLightning } from "react-icons/gi";
import { TfiWallet } from "react-icons/tfi";

// export default function Menu() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isTreeOpen, setIsTreeOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <div className="flex flex-col h-screen   ">
//       <nav>
//         <ul className="space-y-3 py-3 text-lg text-gray-600 roboto-light-italic">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `flex items-center  space-x-4 py-2 px-6 hover:bg-blue-500 hover:text-white ${
//                   isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
//                 }`
//               }
//             >
//               <MdOutlineDashboard size={25} />
//               <span>Dashboard</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/register"
//               className={({ isActive }) =>
//                 ` flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
//                   isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
//                 }`
//               }
//             >
//               <BiLockAlt size={25} />
//               <span>Register</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/tree/district"
//               className={({ isActive }) =>
//                 ` flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
//                   isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
//                 }`
//               }
//             >
//               <ImTree size={25} />
//               <span>Tree</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/incomplete-tree"
//               className={({ isActive }) =>
//                 ` flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
//                   isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
//                 }`
//               }
//             >
//               <ImTree size={25} />
//               <span>Incomplete Trees</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/completed-tree"
//               className={({ isActive }) =>
//                 ` flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
//                   isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
//                 }`
//               }
//             >
//               <ImTree size={25} />
//               <span>Completed Trees</span>
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/members"
//               className={({ isActive }) =>
//                 `flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
//                   isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
//                 }`
//               }
//             >
//               <IoPeopleOutline size={25} />
//               <span>Members</span>
//             </NavLink>
//           </li>

//           <li>
//             <div
//               className={`flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white cursor-pointer ${
//                 location.pathname.startsWith("/wallet")
//                   ? "text-blue-500 border-l-4 border-blue-700"
//                   : ""
//               }`}
//               onClick={() => setIsTreeOpen(!isTreeOpen)}
//             >
//               <TfiWallet size={25} />
//               <span>Wallet</span>
//               <span>{isTreeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
//             </div>
//             {isTreeOpen && (
//               <div className="relative">
//                 <ul className="space-y-3  roboto-light-italic  mt-2 ps-12 menu-stepper text-lg">
//                   <li>
//                     <NavLink
//                       to="/wallet/commission"
//                       className={`${
//                         location.pathname.includes("/commission") &&
//                         "text-blue-500"
//                       }`}
//                     >
//                       Commission
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/wallet/referal"
//                       className={`${
//                         location.pathname.includes("/referal") &&
//                         "text-blue-500"
//                       }`}
//                     >
//                       Referral Bonus
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/wallet/settings"
//                       className={`${
//                         location.pathname.includes("/settings") &&
//                         "text-blue-500"
//                       }`}
//                     >
//                       Settings
//                     </NavLink>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </li>

//           <li>
//             <NavLink
//               to="/reports"
//               className={({ isActive }) =>
//                 `flex items-center space-x-4 py-2 px-5 hover:bg-blue-500 hover:text-white ${
//                   isActive ? "text-blue-700 border-l-4 border-blue-700" : ""
//                 }`
//               }
//             >
//               <TbFileDescription size={25} />
//               <span>Reports</span>
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
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
          {/* <li>
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
          </li> */}
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
              <span>{isTreeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
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
        </ul>
      </nav>
    </div>
  );
}
