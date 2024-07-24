import React, { useEffect, useState } from "react";
// import { previewKey } from "../Admin/DummyData/Data";
import SelectBox from "../../../components/form/SelectBox";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import moment from "moment";
import Spinners from "../../../components/placeholders/Spinners";
import { BaseUrl } from "../../../App";

export default function AgentPreview() {
  const [formData, setFormData] = useState();
  const { memberId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgentData();
  }, []);

  const fetchAgentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${BaseUrl}/api/admin/agent/agent-preview/${memberId}`
      );
      console.log(res);
      setFormData(res.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const previewData = [
    {
      key: "Member ID",
      value: formData?.memberId,
    },
    {
      key: "Name of Applicant",
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
    {
      key: "Name of the Nominee",
      value: formData?.nameOfNominee,
    },
    {
      key: "Relationship with Nominee",
      value: formData?.relationshipWithNominee,
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

  const navigate = useNavigate();

  if (loading) {
    return <Spinners />;
  }
  return (
    <div className="px-4">
      <div className="d-flex items-center py-2 text-gray-800 cursor-pointer">
        <MdOutlineKeyboardBackspace
          size={30}
          onClick={() => navigate("/user/register/form")}
          className="cursor-pointer"
        />
      </div>
      <div className="container mx-auto  ">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Registration Form</h2>
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