import React, { useEffect, useState } from "react";
import { previewKey } from "../DummyData/Data";
import SelectBox from "../../components/form/SelectBox";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../request/URL";

export default function Preview() {

  const [formData,setFormData] = useState()
  const {memberId} = useParams()

  useEffect(()=>{
    axios.get(`${BaseUrl}/member/member-preview/${memberId}`).then((res)=>{
      console.log(res);
      setFormData(res.data)
    }).catch((error)=>{
      console.log(error);
    })
  },[])

 


 
  const previewData = [
    {
      key: "Member ID",
      value: "",
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
      value: formData?.dob,
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
      value: formData?.name,
    },
    {
      key: "Relationship with Nominee",
      value: formData?.nomineeName,
    },
    {
      key: "Sponsor ID",
      value: formData?.sponsorID,
    },
    {
      key: "Applicant Placement Level",
      value: formData?.applicantPlacementLevel,
    },
    {
      key: "Joining Date",
      value: formData?.name,
    },
    {
      key: "Joining Fee",
      value: formData?.joiningFee,
    },
  ];
  return (
    <div className="px-4">
      <div className="d-flex items-center py-2 text-gray-800 cursor-pointer">
        <MdOutlineKeyboardBackspace
          size={30}
          // onClick={onBack}
          className="cursor-pointer"
        />
      </div>
      <div className="container mx-auto  ">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Registration Form</h2>
            <button
              className="text-blue-500 hover:text-blue-700 flex items-center justify-center gap-2"
              // onClick={onBack}
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
                  <p className="capitalize font-medium">{p?.value}</p>
                </div>
              ))}

              <div className="grid grid-cols-2  ">
                <label className="font-medium">Applicant Sign</label>
                <label className="font-medium">Sponsor Sign</label>
              </div>

              {/* <div className="grid grid-cols-2  ">
                <img
                  src={URL.createObjectURL(formData?.applicantSign)}
                  className="w-[203px] h-[149px]"
                />
                <img
                  src={URL.createObjectURL(formData?.sponsorSign)}
                  className="w-[203px] h-[149px]"
                />
              </div> */}

              <div className="">
                <label className="font-medium">Mode of Payment</label>
                <SelectBox />
              </div>

              <div className="grid grid-cols-2 items-center gap-2">
                <label className="font-medium">Payment Status</label>
                <div className="space-x-6">
                  <label
                    htmlFor="paid"
                    className="inline-flex items-center space-x-2"
                  >
                    <input type="radio" id="paid" name="paymentStatus" />
                    <div className="custom-radio paid-radio border border-green-600"></div>
                    <span className="font-medium">Paid</span>
                  </label>
                  <label
                    htmlFor="unpaid"
                    className="inline-flex items-center space-x-2"
                  >
                    <input type="radio" id="unpaid" name="paymentStatus" />
                    <div className="custom-radio unpaid-radio border border-red-600"></div>
                    <span className="font-medium">Unpaid</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center gap-2 mt-4">
                <label className="font-medium">Status</label>
                <div className="space-x-6">
                  <label
                    htmlFor="statusPaid"
                    className="inline-flex items-center space-x-2"
                  >
                    <input type="radio" id="statusPaid" name="status" />
                    <div className="custom-radio paid-radio border border-green-600"></div>
                    <span className="font-medium">Paid</span>
                  </label>
                  <label
                    htmlFor="statusUnpaid"
                    className="inline-flex items-center space-x-2"
                  >
                    <input type="radio" id="statusUnpaid" name="status" />
                    <div className="custom-radio unpaid-radio border border-red-600"></div>
                    <span className="font-medium">Unpaid</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <img
                src={`${BaseUrl}${formData?.applicantPhoto}`}
                className="w-[170px] h-[170px]"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
