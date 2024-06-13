import React, { useRef, useState } from "react";
import Input from "../../components/form/Input";
import Date from "../../components/form/DatePicker";
import SelectBox from "../../components/form/SelectBox";
import SelectGroup from "../../components/form/SelectGroup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Preview from "./Preview";

const GenderData = ["male", "female", "other"];
const MaterialStatus = ["single", "married", "other"];
const JoiningFee = ["2,500", "3,000", "3,500"];

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const naviagte = useNavigate();

  const alpicantRef = useRef(null);
  const apliacntSigRef = useRef(null);
  const sponserRef = useRef(null);

  const handleUploadClick = (type) => {
    if (type === "applicantPhoto") {
      alpicantRef.current.click();
    } else if (type === "applicantSign") {
      apliacntSigRef.current.click();
    } else if (type === "sponsorSign") {
      sponserRef.current.click();
    }
    // fileInputRef.current.click();
  };
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(null);
  const [applicantPhoto, setApplicantPhoto] = useState(null);
  const [applicantSign, setApplicantSign] = useState(null);
  const [sponsorSign, setSponsorSign] = useState(null);

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (type === "applicantPhoto") {
      setApplicantPhoto(file);
    } else if (type === "applicantSign") {
      setApplicantSign(file);
    } else if (type === "sponsorSign") {
      setSponsorSign(file);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      applicantPhoto,
      applicantSign,
      sponsorSign,
    };
    console.log(formData);
    setFormData(formData);
    setShowPreview(true);
  };

  const handleBack = () => {
    setShowPreview(false);
  };

  return (
    <>
      {showPreview ? (
        <Preview formData={formData} onBack={handleBack} />
      ) : (
        <div className="m-3 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Name of Applicant"
                  placeholder="Enter Name"
                  error={errors.name}
                  {...field}
                />
              )}
            />
            <Controller
              name="parentName"
              control={control}
              rules={{ required: "Parent name is required" }}
              render={({ field }) => (
                <SelectGroup
                  label="Parent Name"
                  placeholder="Enter parent name"
                  error={errors.parentName}
                  {...field}
                />
              )}
            />{" "}
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <Input
                  label="Phone Number"
                  placeholder="Enter phone number"
                  error={errors.phoneNumber}
                  {...field}
                />
              )}
            />
            <Controller
              name="dob"
              control={control}
              rules={{ required: "Date of birth is required" }}
              render={({ field }) => (
                <Date
                  label="Date Of Birth"
                  type="date"
                  error={errors.dob}
                  {...field}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <SelectBox
                  options={GenderData}
                  label="Gender"
                  error={errors.gender}
                  {...field}
                />
              )}
            />
            <Controller
              name="maritalStatus"
              control={control}
              rules={{ required: "Marital status is required" }}
              render={({ field }) => (
                <SelectBox
                  options={MaterialStatus}
                  label="Marital Status"
                  error={errors.maritalStatus}
                  {...field}
                />
              )}
            />
            <Controller
              name="panNumber"
              control={control}
              rules={{ required: "PAN number is required" }}
              render={({ field }) => (
                <Input
                  label="Pan Number"
                  placeholder="Enter PAN number"
                  error={errors.panNumber}
                  {...field}
                />
              )}
            />
            <Controller
              name="accountNumber"
              control={control}
              rules={{ required: "Account number is required" }}
              render={({ field }) => (
                <Input
                  label="Account Number"
                  placeholder="Enter account number"
                  error={errors.accountNumber}
                  {...field}
                />
              )}
            />
            <Controller
              name="ifscCode"
              control={control}
              rules={{ required: "IFSC code is required" }}
              render={({ field }) => (
                <Input
                  label="IFSC Code"
                  placeholder="Enter IFSC code"
                  error={errors.ifscCode}
                  {...field}
                />
              )}
            />
            <Controller
              name="bankName"
              control={control}
              rules={{ required: "Bank name is required" }}
              render={({ field }) => (
                <Input
                  label="Bank Name"
                  placeholder="Enter bank name"
                  error={errors.bankName}
                  {...field}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Input
                  label="Address"
                  placeholder="Enter address"
                  error={errors.address}
                  {...field}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input
                  label="City"
                  placeholder="Enter city"
                  error={errors.city}
                  {...field}
                />
              )}
            />
            <Controller
              name="district"
              control={control}
              rules={{ required: "District is required" }}
              render={({ field }) => (
                <Input
                  label="District"
                  placeholder="Enter district"
                  error={errors.district}
                  {...field}
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Input
                  label="State"
                  placeholder="Enter state"
                  error={errors.state}
                  {...field}
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Input
                  label="Country"
                  placeholder="Enter country"
                  error={errors.country}
                  {...field}
                />
              )}
            />
            <Controller
              name="zipCode"
              control={control}
              rules={{ required: "Zip code is required" }}
              render={({ field }) => (
                <Input
                  label="Zip Code"
                  placeholder="Enter zip code"
                  error={errors.zipCode}
                  {...field}
                />
              )}
            />
            <Controller
              name="nomineeName"
              control={control}
              rules={{ required: "Nominee name is required" }}
              render={({ field }) => (
                <Input
                  label="Name of the Nominee"
                  placeholder="Enter nominee name"
                  error={errors.nomineeName}
                  {...field}
                />
              )}
            />
            <Controller
              name="relationshipWithNominee"
              control={control}
              rules={{ required: "Relationship is required" }}
              render={({ field }) => (
                <Input
                  label="Relationship with Nominee"
                  placeholder="Enter relationship"
                  error={errors.relationshipWithNominee}
                  {...field}
                />
              )}
            />
            <Controller
              name="sponsorID"
              control={control}
              rules={{ required: "Sponsor ID is required" }}
              render={({ field }) => (
                <Input
                  label="Sponsor ID"
                  placeholder="Enter sponsor ID"
                  error={errors.sponsorID}
                  {...field}
                />
              )}
            />
            <div className="flex items-end  justify-around  ">
              <span>
                Sponsor Name :{" "}
                <span className="text-blue-500 font-medium">Reenu</span>
              </span>
              <span>
                Sponsor Placement Level :{" "}
                <span className="text-blue-500 font-medium">01</span>
              </span>
            </div>
            <Controller
              name="applicantPlacementLevel"
              control={control}
              rules={{ required: "Placement level is required" }}
              render={({ field }) => (
                <Input
                  label="Applicant Placement Level"
                  placeholder="Enter placement level"
                  error={errors.applicantPlacementLevel}
                  {...field}
                />
              )}
            />
            <div></div>
            <Controller
              name="joiningFee"
              control={control}
              rules={{ required: "Joining fee is required" }}
              render={({ field }) => (
                <SelectBox
                  options={JoiningFee}
                  label="Joining Fee"
                  error={errors.joiningFee}
                  {...field}
                />
              )}
            />
            <div>
              <label className="block mb-3 font-medium">Applicant Photo</label>
              <div
                className={`w-full border border-dashed border-blue-500 p-2 rounded-md text-center underline text-blue-500 ${
                  applicantPhoto && "border-green-600 text-green-600"
                }`}
                onClick={() => handleUploadClick("applicantPhoto")}
              >
                {applicantPhoto ? "Uploaded" : "Upload image"}
              </div>
              <input
                type="file"
                ref={alpicantRef}
                className="hidden"
                onChange={(e) => handleFileChange("applicantPhoto", e)}
              />
            </div>
            <div>
              <label className="block mb-3 font-medium">Applicant Sign</label>
              <div
                className={`w-full border border-dashed border-blue-500 p-2 rounded-md text-center underline text-blue-500 ${
                  applicantSign && "border-green-600 text-green-600"
                }`}
                onClick={() => handleUploadClick("applicantSign")}
              >
                {applicantSign ? "Uploaded" : "Upload image"}
              </div>
              <input
                type="file"
                ref={apliacntSigRef}
                className="hidden"
                onChange={(e) => handleFileChange("applicantSign", e)}
              />
            </div>
            <div>
              <label className="block mb-3 font-medium">Sponsor Sign</label>
              <div
                className={`w-full border border-dashed border-blue-500 p-2 rounded-md text-center underline text-blue-500 ${
                  sponsorSign && "border-green-600 text-green-600"
                }`}
                onClick={() => handleUploadClick("sponsorSign")}
              >
                {sponsorSign ? "Uploaded" : "Upload image"}
              </div>
              <input
                type="file"
                ref={sponserRef}
                className="hidden"
                onChange={(e) => handleFileChange("sponsorSign", e)}
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-end mt-4 space-x-6">
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-red-500  "
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-10 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
