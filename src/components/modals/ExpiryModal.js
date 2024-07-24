import React, { useEffect, useState } from "react";
import CustomModal from "./Modal";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/Auth";
import { FiAlertTriangle } from "react-icons/fi";

const ExpiryModal = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const navigateTimer = setTimeout(() => {
        logout(navigate);
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(navigateTimer);
      };
    }
  }, [isOpen, navigate]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center p-6 bg-white rounded-lg ">
        <FiAlertTriangle className="text-red-500 text-5xl mb-4" />
        <p className="text-red-500 font-semibold text-2xl">Session Expired</p>
        <p className="text-gray-600 text-center mt-2">
          Your login session has expired. Please log in again to continue.
        </p>
        <p className="text-gray-600 text-center text-sm mt-2">
          Redirecting to login page in{" "}
          <span className="font-bold text-red-500 animate-pulse">
            {countdown}
          </span>{" "}
          seconds...
        </p>
      </div>
    </CustomModal>
  );
};

export default ExpiryModal;
