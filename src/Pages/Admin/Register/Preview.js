import React, { useEffect, useState } from "react";
import { previewKey } from "../../Admin/DummyData/Data";
import SelectBox from "../../../components/form/SelectBox";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl, ImgUrl } from "../../../request/URL";
import moment from "moment";
import Spinners from "../../../components/placeholders/Spinners";

const convertBase64Image = (base64, outputFormat = "image/jpeg") => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(outputFormat);
      resolve(dataURL);
    };
    img.onerror = (error) => reject(error);
    img.src = base64;
  });
};

export default function Preview() {
  const [formData, setFormData] = useState();
  const { memberId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [convertedImg, setConvertedImg] = useState(null);

  useEffect(() => {
    // fetchAgentData();
    const data = localStorage.getItem("formData");
    if (data) {
      const parsedData = JSON.parse(data);
      setFormData({ ...parsedData, status: "Approved" });
    }
    setLoading(false);
  }, []);

  const previewData = [
    {
      key: "Name of Applicant",
      value: formData?.name,
    },
    {
      key: "Parent Name",
      value: formData?.parentInfo?.name,
    },
    {
      key: "Phone Number",
      value: formData?.phoneNumber,
    },
    {
      key: "Whatsapp Number",
      value: formData?.whatsAppNumber,
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

  const handleStatusChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        status: e.target.value,
      });
    }
  };

  const navigate = useNavigate();


  const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const handleSubmit = async () => {
    const data = new FormData();

    // Ensure applicantPhoto is a valid base64 string before converting
    if (formData.applicantPhoto) {
      const applicantPhotoFile = await base64ToFile(
        formData.applicantPhoto,
        "applicantPhoto.png"
      );
      console.log(applicantPhotoFile);
      data.append("applicantPhoto", applicantPhotoFile);
    } else {
      throw new Error("Applicant photo is missing or invalid");
    }

    // Append other form data fields to FormData
    data.append("aadharNumber", formData.aadharNumber);
    data.append("accountNumber", formData.accountNumber);
    data.append("address", formData.address);
    data.append("applicantPlacementLevel", formData.applicantPlacementLevel);
    data.append("bankName", formData.bankName);
    data.append("branchName", formData.branchName);
    data.append("city", formData.city);
    data.append("country", formData.country);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("district", formData.district);
    data.append("gender", formData.gender);
    data.append("ifscCode", formData.ifscCode);
    data.append("joiningFee", formData.joiningFee);
    data.append("maritalStatus", formData.maritalStatus);
    data.append("name", formData.name);
    data.append("nameOfNominee", formData.nameOfNominee);
    data.append("occupation", formData.occupation);
    data.append("panNumber", formData.panNumber);
    data.append("parentName", formData.parentInfo.name);
    data.append("relation", formData.parentInfo.relation);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("placementId", formData.placementId);
    data.append("placementName", formData.placementName);
    data.append("placementPlacementLevel", formData.placementPlacementLevel);
    data.append("relationshipWithNominee", formData.relationshipWithNominee);
    data.append("sponsorId", formData.sponsorId);
    data.append("state", formData.state);
    data.append("whatsAppNumber", formData.whatsAppNumber);
    data.append("zipCode", formData.zipCode);
    data.append("status", formData.status);

    try {
      const res = await axios.post(`${BaseUrl}/agent/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      alert("Registration completed");

      setFormData(res.data.data);
      navigate('/register')
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error, e.g., setSubmitError(error.response.data.error);
    }
  };


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
              onClick={() =>
                navigate(`/register/form/terms-and-condition/update`)
              }
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

              {/* <div className="grid grid-cols-2  ">
                <label className="font-medium">Applicant Sign</label>
                {formData?.isHead ? (
                  ""
                ) : (
                  <label className="font-medium">Sponsor Sign</label>
                )}
              </div> */}

              {/* <div className="grid grid-cols-2  ">
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
              </div> */}

              {/* {formData?.status === "Un Approved" && ( */}
              {formData?.isPayed ? null : (
                <>
                  {/* <div className="flex flex-col">
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
                  </div> */}
                  {/* <div className="grid grid-cols-2 items-center gap-2">
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
                  </div> */}

                  <div className="grid grid-cols-2 items-center mt-8 gap-2">
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
              )}
              {/* )} */}
            </div>

            <div>
              <img
                src={`${formData?.applicantPhoto}`}
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
