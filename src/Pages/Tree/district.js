import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Modal from "../../components/modals/Modal";
import Spinners from "../../components/placeholders/Spinners";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../request/URL";

export default function District() {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/district/list`);
      setDistricts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BaseUrl}/district/create`, data);
      reset();
      setIsModalOpen(false);
      fetchData();
      setServerError("");
    } catch (error) {
      console.log("Error submitting data:", error);
      setServerError(error?.response?.data?.message);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setServerError("");
    reset();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setServerError("");
    reset();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-3/4">
        <Spinners />
      </div>
    );
  }

  return (
    <div className="m-3">
      <div className="w-full p-4 flex flex-wrap justify-start gap-10">
        {districts.map((district) => (
          <div
            key={district._id}
            onClick={() => navigate(`${district.name}/${district._id}`)}
            className="bg-white border-2 border-blue-500 cursor-pointer flex flex-col items-center justify-center space-y-3 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-[100px] rounded-lg"
          >
            <img
              src="assets\Mask group.svg"
              className="w-[30px] h-[30px] "
              alt={district.name}
            />
            <span className="text-xl text-blue-500 font-bold capitalize">
              {district.name}
            </span>
          </div>
        ))}
        <div
          onClick={handleOpenModal}
          className="bg-white cursor-pointer flex flex-col items-center justify-center space-y-4 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-[100px] rounded-lg border-2 border-dashed border-orange-300"
        >
          <MdAdd className="text-orange-400" size={35} />
          <span className="text-md text-orange-400 font-medium">New</span>
        </div>
      </div>

      {/* Modal form for adding new district */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-5"
              >
                New District Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter district name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("name", {
                  required: "District name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "District name should only contain letters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="serialNumber"
                className="block text-lg font-medium text-gray-700 mb-5"
              >
                Series Number
              </label>
              <input
                id="SerialNumber"
                type="text"
                placeholder="Enter Series Number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...register("SerialNumber", {
                  required: "Series number is required",
                  minLength: {
                    value: 3,
                    message: "Series number must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 3,
                    message: "Series number cannot exceed 3 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Series number should only contain letters",
                  },
                })}
              />
              {errors.SerialNumber && (
                <p className="text-red-500 text-sm">
                  {errors.SerialNumber.message}
                </p>
              )}
            </div>
          </div>

          {serverError && (
            <div className="py-3 text-red-600 text-center text-md">
              {serverError}
            </div>
          )}

          <div className="mt-4 flex gap-3 justify-end">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-red-500 focus:outline-none focus:ring-0 sm:text-sm"
              onClick={handleCloseModal}
            >
              Discard
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-14 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-0 sm:text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
