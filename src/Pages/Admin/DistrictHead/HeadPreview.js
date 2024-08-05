import React, { useEffect, useState } from "react";
import SelectBox from "../../../components/form/SelectBox";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Spinners from "../../../components/placeholders/Spinners";
import { BaseUrl } from "../../../App";
import { Config } from "../../../utils/Auth";
import ExpiryModal from "../../../components/modals/ExpiryModal";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function HeadPreview() {
  const [formData, setFormData] = useState();
  const { memberId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);

  useEffect(() => {
    fetchAgentData();
  }, []);

  const fetchAgentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${BaseUrl}/api/admin/district-head/head-preview/${memberId}`,
        Config()
      );

      setFormData(res.data);
    } catch (error) {
      setError(error);
      if (error.response.status === 403) {
        setSectionExpired(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const previewData = [
    {
      key: "District Name",
      value: formData?.districtName,
    },

    {
      key: "District Head Name",
      value: formData?.name,
    },
    {
      key: "Parent Name",
      value: formData?.parentName,
    },
    {
      key: "Phone Number",
      value: formData?.phoneNumber,
    },
    {
      key: "WhatsApp Number",
      value: formData?.whatsAppNumber,
    },
    {
      key: "Occupation",
      value: formData?.occupation,
    },
    {
      key: "Date Of Birth",
      value: moment(new Date(formData?.dateOfBirth)).format("DD-MM-YYYY"),
    },
    {
      key: "Gender",
      value: formData?.gender,
    },
    {
      key: "Martial Status",
      value: formData?.maritalStatus,
    },
    {
      key: "Pan Number",
      value: formData?.panNumber,
    },
    {
      key: "Account Number",
      value: formData?.accountNumber,
    },
    {
      key: "IFSC Code",
      value: formData?.ifscCode,
    },
    {
      key: "Bank Name",
      value: formData?.bankName,
    },
    {
      key: "Branch Name",
      value: formData?.branchName,
    },
    {
      key: "Aadhar Number",
      value: formData?.aadharNumber,
    },
    {
      key: "Address",
      value: formData?.address,
    },
  ];

  const handlePaymentChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        payment: e.target.value,
      });
    }
  };

  const handleStatusChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        status: e.target.value,
      });
    }
  };

  const handleSubmit = () => {
    try {
      const data = {
        status: formData.status,
        // paymentMode: formData.paymentMode,
        // payment: formData.payment,
      };
      const res = axios.put(
        `${BaseUrl}/api/admin/agent/update-status/${formData._id}`,
        data,
        Config()
      );
      toast.success("Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      if (error.response.status === 403) {
        setSectionExpired(true);
      }
    }
  };

  const navigate = useNavigate();

  if (loading) {
    return <Spinners />;
  }
  return (
    <div className="px-4">
      {setSectionExpired && <ExpiryModal isOpen={sectionExpired} />}
      <ToastContainer />
      <div className="d-flex items-center py-2 text-gray-800 cursor-pointer">
        <MdOutlineKeyboardBackspace
          size={30}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>
      <div className="container mx-auto  ">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">
              District Head Registration
            </h2>
            {/* <button
                className="text-blue-500 hover:text-blue-700 flex items-center justify-center gap-2"
                onClick={() => navigate(`/register/update/${formData?.memberId}`)}
              >
                <CiEdit />
                Edit
              </button> */}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2 gap-5 ">
              {previewData.map((p, index) => (
                <div className="grid grid-cols-2  " key={index}>
                  <label className="font-medium">{p?.key}</label>
                  <p className="capitalize  text-gray-900">{p?.value}</p>
                </div>
              ))}

              {formData?.isHead === false && (
                <>
                  <div className="grid grid-cols-2  ">
                    <label className="font-medium">Sponsor ID</label>
                    <p className="capitalize  text-gray-900">
                      {" "}
                      {formData?.sponsorId}
                    </p>
                  </div>
                  <div className="grid grid-cols-2  ">
                    <label className="font-medium">Placement ID</label>
                    <p className="capitalize  text-gray-900">
                      {" "}
                      {formData?.placementId}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div>
              <img
                src={`${BaseUrl}/${formData?.applicantPhoto}`}
                className="w-[170px] h-[170px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
