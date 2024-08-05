import axios from "axios";
import React, { useEffect, useState } from "react";
import { Config } from "../../utils/Auth";
import ExpiryModal from "../modals/ExpiryModal";
import { BaseUrl } from "../../App";
import { MdAdd } from "react-icons/md";
import Spinners from "../placeholders/Spinners";
import { useNavigate } from "react-router-dom";

const DistrictHeads = () => {
  const [districtHeads, setDistrictHeads] = useState([]);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHead();
  }, []);

  const fetchHead = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/admin/dashboard/district-head?limit=2`,
        Config()
      );
      setDistrictHeads(response.data);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      }
      setError(error.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/4 lg:mt-0 mt-6">
      {sectionExpired && <ExpiryModal isOpen={sectionExpired} />}
      <h2 className="text-xl font-semibold mb-4 text-blue-500">
        District Heads
      </h2>
      {loading ? (
        <Spinners />
      ) : (
        <>
          {districtHeads.map((head, index) => (
            <div
              key={index}
              className="flex items-center mb-4 border-b-2 border-blue-50 pb-3"
            >
              <img
                src={`${BaseUrl}/${head.applicantImage}`}
                alt={head.name}
                className="w-10 h-10 rounded-full mr-4 border-2 border-blue-500"
              />
              <div>
                <h3 className="text-md">{head.name}</h3>
                <p className="text-gray-400 text-sm font-medium">
                  {head.districtName}
                </p>
              </div>
            </div>
          ))}
          <div
            className="flex items-center mb-4 space-x-4 text-custom-orange font-semibold border-b-2 border-blue-50 pb-3 cursor-pointer "
            onClick={() => navigate("/district-head/registration")}
          >
            <span className="border rounded-full p-1 border-custom-orange">
              <MdAdd size={30} />
            </span>
            <div>
              <h5 className="text-md">Add District Head</h5>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DistrictHeads;
