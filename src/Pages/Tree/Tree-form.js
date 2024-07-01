import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import SelectGroup from "../../components/form/SelectGroup";
import Date from "../../components/form/DatePicker";
import SelectBox from "../../components/form/SelectBox";
import { BaseUrl } from "../../request/URL";
import axios from "axios";
import RegPreview from "../../components/form/RegPreview";

const GenderData = ["Male", "Female", "Other"];
const MaterialStatus = ["Single", "Married", "Other"];
const JoiningFee = [2500, 3000, 3500];

export default function TreeForm() {
  const { districtId, name } = useParams();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const naviagte = useNavigate();
  const alpicantRef = useRef(null);
  const apliacntSigRef = useRef(null);
  const [applicantPhoto, setApplicantPhoto] = useState(null);
  const [applicantSign, setApplicantSign] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleUploadClick = (type) => {
    if (type === "applicantPhoto") {
      alpicantRef.current.click();
    } else if (type === "applicantSign") {
      apliacntSigRef.current.click();
    }
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (type === "applicantPhoto") {
      setApplicantPhoto(file);
    } else if (type === "applicantSign") {
      setApplicantSign(file);
    }
  };

  const [phoneErrors, setPhoneErrors] = useState(null);

  // check phone

  const checkMobileNumber = async (phoneNumber) => {
    if (phoneNumber.length >= 10) {
      try {
        const response = await axios.get(
          `${BaseUrl}/agent/check-phone/${phoneNumber}`
        );
        setPhoneErrors(null);
      } catch (error) {
        console.log(error);
        setPhoneErrors(error.response.data.error);
      }
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("treeName", data?.treeName);
    formData.append("name", data?.name);
    formData.append("parentName", data?.parentInfo?.name);
    formData.append("relation", data?.parentInfo?.relation);
    formData.append("phoneNumber", data?.phoneNumber);
    formData.append("dateOfBirth", data?.dob);
    formData.append("gender", data?.gender);
    formData.append("maritalStatus", data?.maritalStatus);
    formData.append("panNumber", data?.panNumber);
    formData.append("accountNumber", data?.accountNumber);
    formData.append("ifscCode", data?.ifscCode);
    formData.append("bankName", data?.bankName);
    formData.append("address", data?.address);
    formData.append("city", data?.city);
    formData.append("district", data?.district);
    formData.append("state", data?.state);
    formData.append("country", data?.country);
    formData.append("zipCode", data?.zipCode);
    formData.append("nameOfNominee", data?.nomineeName);
    formData.append("relationshipWithNominee", data?.relationshipWithNominee);
    formData.append("joiningFee", data?.joiningFee);
    formData.append("applicantPhoto", applicantPhoto);
    formData.append("applicantSign", applicantSign);

    try {
      const res = await axios.post(
        `${BaseUrl}/section/create-head/${districtId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      alert("Registration completed");
      setShowPreview(true);
      setFormData(res.data.head);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showPreview ? (
        <RegPreview formData={formData} />
      ) : (
        <div className="m-3 p-6 bg-white rounded-lg shadow-md">
          <h5 className="text-xl font-bold mb-6 ">New Tree</h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="col-span-2">
              <Controller
                name="treeName"
                control={control}
                rules={{
                  required: "Tree Name is required",
                  minLength: {
                    value: 3,
                    message: "Tree Name must be at least 3 characters",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Name of Tree"
                    placeholder="Enter tree Name"
                    error={errors.treeName}
                    {...field}
                  />
                )}
              />
            </div>
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
              name="parentInfo"
              control={control}
              rules={{ required: "Parent information is required" }}
              render={({ field }) => (
                <SelectGroup
                  options={["S/O", "D/O"]}
                  label="Parent Information"
                  placeholder="Enter parent name"
                  error={errors.parentInfo}
                  {...field}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must contain only digits",
                },
              }}
              render={({ field }) => (
                <div>
                  <Input
                    label="Phone Number"
                    placeholder="Enter phone number"
                    error={errors.phoneNumber}
                    {...field}
                    onChange={(e) => {
                      const { value } = e.target;
                      field.onChange(value);
                      checkMobileNumber(value);
                    }}
                  />

                  {phoneErrors && (
                    <span className="text-red-500">* {phoneErrors}</span>
                  )}
                </div>
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
            <div></div>

            <div>
              <label className="block mb-3 font-medium">Tree Head Photo</label>
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
              <label className="block mb-3 font-medium">Tree Head Sign</label>
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

            <div className="col-span-1 md:col-span-2 flex justify-end mt-4 space-x-6">
              <button
                type="button"
                className="px-14 py-2 font-semibold text-red-500  "
                onClick={() => reset()}
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-14 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
