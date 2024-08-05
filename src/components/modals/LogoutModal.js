import React, { useState } from "react";
import CustomModal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function LogoutModal() {
  const [logOutModal, setLogOutModal] = useState(true);
  const navigate = useNavigate();

  const handleCloseLogoutModal = () => {
    setLogOutModal(false);
  };

  const handleLogout = () => {
    console.log("hi");
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }, 300);
  };

  return (
    <>
      {/* logout modal */}
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
              Logout
            </button>
            <button
              className="bg-gray-500 text-white p-2 px-4 rounded"
              onClick={handleCloseLogoutModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
