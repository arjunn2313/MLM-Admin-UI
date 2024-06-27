import React, { useEffect, useState } from "react";
import { previewKey } from "../DummyData/Data";
import SelectBox from "../../components/form/SelectBox";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl, ImgUrl } from "../../request/URL";
import moment from "moment";
import Spinners from "../../components/placeholders/Spinners";

export default function Preview() {
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
      const res = await axios.get(`${BaseUrl}/agent/agent-preview/${memberId}`);
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

  const handleSubmit = () => {
    try {
      const data = {
        status: formData.status,
        paymentMode: formData.paymentMode,
        payment: formData.payment,
      };
      const res = axios.put(
        `${BaseUrl}/agent/update-status/${formData._id}`,
        data
      );
      alert("updated");
    } catch (error) {
      console.log(error);
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
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>
      <div className="container mx-auto  ">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Registration Form</h2>
            <button
              className="text-blue-500 hover:text-blue-700 flex items-center justify-center gap-2"
              onClick={() => navigate(`/register/update/${formData?.memberId}`)}
            >
              <CiEdit />
              Edit
            </button>
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
                <div className="grid grid-cols-2  ">
                  <label className="font-medium">Sponsor ID</label>
                  <p className="capitalize  text-gray-900">
                    {formData?.sponsorId}
                  </p>

                  <label className="font-medium">Sponsor ID</label>
                  <p className="capitalize  text-gray-900">
                    {formData?.sponsorId}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2  ">
                <label className="font-medium">Applicant Sign</label>
                {formData?.isHead ? (
                  ""
                ) : (
                  <label className="font-medium">Sponsor Sign</label>
                )}
              </div>

              <div className="grid grid-cols-2  ">
                <img
                  src={`${ImgUrl}${formData?.applicantSign}`}
                  className="w-[203px] h-[149px]"
                />
                {formData?.isHead ? (
                  ""
                ) : (
                  <img
                    src={`${ImgUrl}${formData?.sponsorSign}`}
                    className="w-[203px] h-[149px]"
                  />
                )}
              </div>

              {/* {formData?.status === "Un Approved" && ( */}
                <>
                  <div className="flex flex-col">
                    <label className="font-medium mb-2">Mode of Payment</label>
                    <select
                      className="rounded"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentMode: e.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <label className="font-medium">Payment Status</label>
                    <div className="flex flex-wrap">
                      <div className="flex items-center me-4">
                        <input
                          id="paid-radio"
                          type="radio"
                          value="Paid"
                          name="payment-status"
                          checked={formData?.payment === "Paid"}
                          onChange={handlePaymentChange}
                          className="w-4 h-4 text-green-600 bg-gray-100 border-green-500 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="paid-radio"
                          className="ms-2 text-md font-medium text-green-600 dark:text-gray-300"
                        >
                          Paid
                        </label>
                      </div>
                      <div className="flex items-center me-4">
                        <input
                          id="unpaid-radio"
                          type="radio"
                          value="Unpaid"
                          name="payment-status"
                          checked={formData?.payment === "Unpaid"}
                          onChange={handlePaymentChange}
                          className="w-4 h-4 text-red-600 bg-gray-100 border-red-500 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="unpaid-radio"
                          className="ms-2 text-md font-medium text-red-600 dark:text-gray-300"
                        >
                          Unpaid
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 items-center gap-2">
                    <label className="font-medium">Status</label>
                    <div className="flex flex-wrap">
                      <div className="flex items-center me-4">
                        <input
                          id="approved-radio"
                          type="radio"
                          value="Approved"
                          name="status"
                          checked={formData?.status === "Approved"}
                          onChange={handleStatusChange}
                          className="w-4 h-4 text-green-600 bg-gray-100 border-green-500 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="approved-radio"
                          className="ms-2 text-md font-medium text-green-600 dark:text-gray-300"
                        >
                          Approved
                        </label>
                      </div>
                      <div className="flex items-center me-4">
                        <input
                          id="unapproved-radio"
                          type="radio"
                          value="Un Approved"
                          name="status"
                          checked={formData?.status === "Un Approved"}
                          onChange={handleStatusChange}
                          className="w-4 h-4 text-red-600 bg-gray-100 border-red-500 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="unapproved-radio"
                          className="ms-2 text-md font-medium text-red-600 dark:text-gray-300"
                        >
                          Un Approved
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              {/* )} */}
            </div>

            <div>
              <img
                src={`${ImgUrl}${formData?.applicantPhoto}`}
                className="w-[170px] h-[170px]"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md"
              onClick={() => handleSubmit()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
