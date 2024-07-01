import React, { useState } from 'react';

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="p-2 bg-blue-500 text-white lg:hidden"
        onClick={toggleDrawer}
      >
        Menu
      </button>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="bg-white w-64 h-full p-4">
          <button
            className="p-2 bg-red-500 text-white"
            onClick={toggleDrawer}
          >
            Close
          </button>
          <ul className="space-y-4">
            <li className="text-gray-900">Item 1</li>
            <li className="text-gray-900">Item 2</li>
            <li className="text-gray-900">Item 3</li>
            <li className="text-gray-900">Item 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
