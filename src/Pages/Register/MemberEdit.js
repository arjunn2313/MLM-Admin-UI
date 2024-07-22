import React, { useRef, useState, useEffect } from "react";
import Input from "../../components/form/Input";
import Date from "../../components/form/DatePicker";
import SelectBox from "../../components/form/SelectBox";
import SelectGroup from "../../components/form/SelectGroup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../request/URL";
import { MdVerified } from "react-icons/md";
import moment from "moment";

const GenderData = ["Male", "Female", "Other"];
const MaterialStatus = ["Single", "Married", "Other"];
const JoiningFee = [2500, 3000, 3500];

export default function UpdateMember() {
  const { memberId } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

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
  };

  const [showPreview, setShowPreview] = useState(false);
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
    try {
      // Retrieve existing formData from localStorage
      const storedData = localStorage.getItem("formData");

      let updatedData;

      if (storedData) {
        const existingData = JSON.parse(storedData);
        // Merge existing data with new data
        updatedData = { ...existingData, ...data };
      } else {
        updatedData = data;
      }

      // Save updated data back to localStorage
      localStorage.setItem("formData", JSON.stringify(updatedData));

      // Navigate to the next page
      navigate("/register/form/terms-and-condition/preview");
    } catch (error) {
      console.log("Error saving form data to localStorage:", error);
    }
  };

  // const onSubmit = async (data) => {
  //   const formData = new FormData();
  //   formData.append("name", data?.name);
  //   formData.append("parentName", data?.parentInfo?.name);
  //   formData.append("relation", data?.parentInfo?.relation);
  //   formData.append("phoneNumber", data?.phoneNumber);
  //   formData.append("dateOfBirth", data?.dob);
  //   formData.append("gender", data?.gender);
  //   formData.append("maritalStatus", data?.maritalStatus);
  //   formData.append("panNumber", data?.panNumber);
  //   formData.append("accountNumber", data?.accountNumber);
  //   formData.append("ifscCode", data?.ifscCode);
  //   formData.append("bankName", data?.bankName);
  //   formData.append("address", data?.address);
  //   formData.append("city", data?.city);
  //   formData.append("district", data?.district);
  //   formData.append("state", data?.state);
  //   formData.append("country", data?.country);
  //   formData.append("zipCode", data?.zipCode);
  //   formData.append("nameOfNominee", data?.nomineeName);
  //   formData.append("relationshipWithNominee", data?.relationshipWithNominee);
  //   formData.append("sponsorId", data?.sponsorId);
  //   formData.append("sponsorName", sponsorDetails?.name);
  //   formData.append(
  //     "sponsorPlacementLevel",
  //     sponsorDetails?.sponsorPlacementLevel
  //   );
  //   formData.append(
  //     "applicantPlacementLevel",
  //     sponsorDetails?.sponsorPlacementLevel + 1
  //   );
  //   formData.append("joiningFee", data?.joiningFee);
  //   if (applicantPhoto) formData.append("applicantPhoto", applicantPhoto);
  //   if (applicantSign) formData.append("applicantSign", applicantSign);
  //   if (sponsorSign) formData.append("sponsorSign", sponsorSign);

  //   try {
  //     const res = await axios.put(
  //       `${BaseUrl}/member/update/${memberId}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(res);
  //     alert("Update completed");
  //     navigate(-1);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleBack = () => {
    setShowPreview(false);
  };

  // State variables for sponsor details
  const [sponsorDetails, setSponsorDetails] = useState(null);
  const [loadingSponsor, setLoadingSponsor] = useState(false);
  const [sponsorError, setSponsorError] = useState(null);

  // Function to fetch sponsor details
  const fetchSponsorDetails = async (sponsorId) => {
    if (sponsorId.length >= 4) {
      setLoadingSponsor(true);
      try {
        const response = await axios.get(
          `${BaseUrl}/member/sponsor-member/${sponsorId}`
        );
        setSponsorDetails(response.data);
        setValue(
          "applicantPlacementLevel",
          response.data.sponsorPlacementLevel + 1
        );
        setSponsorError(null);
        console.log(response);
      } catch (error) {
        setSponsorDetails(null);
        setSponsorError(error?.response?.data?.error);
        setValue("applicantPlacementLevel", "");
        console.log(error);
      } finally {
        setLoadingSponsor(false);
      }
    }
  };

  // Fetch existing member data when the component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BaseUrl}/member/member-preview/${memberId}`
  //       );
  //       const data = response.data;

  //       // Populate form fields with the fetched data
  //       setValue("name", data.name);
  //       setValue("parentInfo", {
  //         name: data.parentName,
  //         relation: data.relation,
  //       });
  //       setValue("phoneNumber", data.phoneNumber);
  //       setValue(
  //         "dob",
  //         moment(new Date(data?.dateOfBirth)).format("DD-MM-YYYY")
  //       );
  //       setValue("gender", data.gender);
  //       setValue("maritalStatus", data.maritalStatus);
  //       setValue("panNumber", data.panNumber);
  //       setValue("accountNumber", data.accountNumber);
  //       setValue("ifscCode", data.ifscCode);
  //       setValue("bankName", data.bankName);
  //       setValue("address", data.address);
  //       setValue("city", data.city);
  //       setValue("district", data.district);
  //       setValue("state", data.state);
  //       setValue("country", data.country);
  //       setValue("zipCode", data.zipCode);
  //       setValue("nomineeName", data.nameOfNominee);
  //       setValue("relationshipWithNominee", data.relationshipWithNominee);
  //       setValue("sponsorId", data.sponsorId);
  //       setValue("joiningFee", data.joiningFee);
  //       setSponsorDetails({
  //         name: data.sponsorName,
  //         sponsorPlacementLevel: data.sponsorPlacementLevel,
  //       });
  //       setApplicantPhoto(data.applicantPhoto);
  //       setApplicantSign(data.applicantSign);
  //       setSponsorSign(data.sponsorSign);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, [memberId, setValue]);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("formData");

      if (storedData) {
        const data = JSON.parse(storedData);

        // Populate form fields with the fetched data
        setValue("name", data.name);
        // setValue("parentInfo", {
        //   name: data.name,
        //   relation: data.relation,
        // });
        setValue("phoneNumber", data.phoneNumber);
        setValue(
          "dob",
          moment(new Date(data?.dateOfBirth)).format("DD-MM-YYYY")
        );
        setValue("gender", data.gender);
        setValue("maritalStatus", data.maritalStatus);
        setValue("panNumber", data.panNumber);
        setValue("accountNumber", data.accountNumber);
        setValue("ifscCode", data.ifscCode);
        setValue("bankName", data.bankName);
        setValue("address", data.address);
        setValue("city", data.city);
        setValue("district", data.district);
        setValue("state", data.state);
        setValue("country", data.country);
        setValue("zipCode", data.zipCode);
        setValue("nomineeName", data.nameOfNominee);
        setValue("relationshipWithNominee", data.relationshipWithNominee);
        setValue("sponsorId", data.sponsorId);
        setValue("joiningFee", data.joiningFee);
        setSponsorDetails({
          name: data.sponsorName,
          sponsorPlacementLevel: data.sponsorPlacementLevel,
        });
        setApplicantPhoto(data.applicantPhoto);
        setApplicantSign(data.applicantSign);
        setSponsorSign(data.sponsorSign);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setValue]);

  return (
    <>
      <div className="m-3 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Update Member</h2>
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
          {/* <Controller
            name="parentInfo"
            control={control}
            rules={{ required: "Parent information is required" }}
            render={({ field }) => (
              <div className="mb-4 w-full">
                <label className="block mb-3 font-medium">{label}</label>
                <select
                  className={`w-full border ${
                    error ? "border-red-600" : "border-gray-600"
                  } outline-none p-2 rounded-md`}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  <option>Select</option>
                  {options?.map((itm) => (
                    <option key={itm} value={itm} className="capitalize">
                      {itm}
                    </option>
                  ))}
                </select>
                {error && <span className="text-red-600">{error.message}</span>}
              </div>
            )}
          /> */}
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
                label="Date of Birth"
                placeholder="Select date"
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
                placeholder="Select gender"
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
                placeholder="Select marital status"
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
                label="PAN Number"
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
                label="Name of Nominee"
                placeholder="Enter name of nominee"
                error={errors.nomineeName}
                {...field}
              />
            )}
          />
          <Controller
            name="relationshipWithNominee"
            control={control}
            rules={{ required: "Relationship with nominee is required" }}
            render={({ field }) => (
              <Input
                label="Relationship with Nominee"
                placeholder="Enter relationship with nominee"
                error={errors.relationshipWithNominee}
                {...field}
              />
            )}
          />
          {/* <Controller
            name="sponsorId"
            control={control}
            rules={{
              required: "Sponsor ID is required",
              minLength: {
                value: 4,
                message: "Sponsor ID must be at least 4 characters",
              },
              validate: {
                checkSponsor: async (value) => {
                  await fetchSponsorDetails(value);
                  return sponsorDetails !== null || "Sponsor not found";
                },
              },
            }}
            render={({ field }) => (
              <Input
                label="Sponsor ID"
                placeholder="Enter sponsor ID"
                error={errors.sponsorId}
                {...field}
              />
            )}
          />
          {loadingSponsor ? (
            <p>Loading sponsor details...</p>
          ) : sponsorDetails ? (
            <div className="mt-4 flex items-center text-green-500">
              <MdVerified className="mr-1" />
              <span>{sponsorDetails.name}</span>
            </div>
          ) : sponsorError ? (
            <div className="mt-4 text-red-500">{sponsorError}</div>
          ) : null}
          <Controller
            name="joiningFee"
            control={control}
            rules={{ required: "Joining fee is required" }}
            render={({ field }) => (
              <SelectBox
                options={JoiningFee}
                label="Joining Fee"
                placeholder="Select joining fee"
                error={errors.joiningFee}
                {...field}
              />
            )}
          /> */}
          {/* <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Upload Photo of Applicant
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={alpicantRef}
                onChange={(e) => handleFileChange("applicantPhoto", e)}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleUploadClick("applicantPhoto")}
              >
                Upload Photo
              </button>
              {applicantPhoto && (
                <span className="text-sm text-gray-700">
                  {applicantPhoto.name}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Upload Signature of Applicant
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={apliacntSigRef}
                onChange={(e) => handleFileChange("applicantSign", e)}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleUploadClick("applicantSign")}
              >
                Upload Signature
              </button>
              {applicantSign && (
                <span className="text-sm text-gray-700">
                  {applicantSign.name}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Upload Signature of Sponsor
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={sponserRef}
                onChange={(e) => handleFileChange("sponsorSign", e)}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleUploadClick("sponsorSign")}
              >
                Upload Signature
              </button>
              {sponsorSign && (
                <span className="text-sm text-gray-700">
                  {sponsorSign.name}
                </span>
              )}
            </div>
          </div> */}
          <div className="flex justify-end col-span-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              Update Member
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
