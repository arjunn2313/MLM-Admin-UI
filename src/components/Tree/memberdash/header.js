import React from "react";

const Header = () => {
  return (
    <div className="bg-white   rounded-xl border-2 border-blue-400 py-1">
      <div className="p-4  flex flex-col md:flex-row w-3/4 justify-between items-center">
        <div className="flex items-center space-x-5">
          <img src="assets\user.svg" alt="user" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">Aadhi</h4>
            <p className="text-sm text-gray-600 ">ID20402</p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img src="assets\level.svg" alt="level" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">01</h4>
            <p className="text-sm text-gray-600 ">Level</p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img src="assets\sponsor.svg" alt="sponsor" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">ID202401</h4>
            <p className="text-sm text-gray-600 ">Sponsor ID</p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img src="assets\phone.svg" alt="phone" />
          <div className="space-y-1">
            <h4 className="font-semibold text-md">+91 90876 54321</h4>
            <p className="text-sm text-gray-500 ">Phone Number</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
