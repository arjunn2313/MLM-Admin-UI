import React, { useState } from 'react';
import { ImTree } from 'react-icons/im';
import { IoCashOutline } from 'react-icons/io5';
import { MdAddShoppingCart, MdOutlineDashboard } from 'react-icons/md';
import { TbSettings2 } from 'react-icons/tb';

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 w-64 h-screen bg-white shadow-lg`}>
      <button
        className="md:hidden p-4 text-gray-700"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      <nav className="mt-10">
        <ul className="space-y-4">
          <li className="flex items-center px-6 py-2 hover:bg-blue-100">
            <span className="sidebar-icon">
              <i className="fas fa-tachometer-alt"><MdOutlineDashboard/></i>
            </span>
            <span className="ml-4 text-gray-700">Dashboard</span>
          </li>
          <li className="flex items-center px-6 py-2 hover:bg-blue-100">
            <span className="sidebar-icon">
              <i className="fas fa-tree"><ImTree/></i>
            </span>
            <span className="ml-4 text-gray-700">My Tree</span>
          </li>
          <li className="flex items-center px-6 py-2 hover:bg-blue-100">
            <span className="sidebar-icon">
              <i className="fas fa-history"><MdAddShoppingCart/></i>
            </span>
            <span className="ml-4 text-gray-700">Purchase History</span>
          </li>
          <li className="flex items-center px-6 py-2 hover:bg-blue-100">
            <span className="sidebar-icon">
              <i className="fas fa-dollar-sign"><IoCashOutline /></i>
            </span>
            <span className="ml-4 text-gray-700">Earnings History</span>
          </li>
          <li className="flex items-center px-6 py-2 hover:bg-blue-100">
            <span className="sidebar-icon">
              <i className="fas fa-cog"><TbSettings2 /></i>
            </span>
            <span className="ml-4 text-gray-700">Settings</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
