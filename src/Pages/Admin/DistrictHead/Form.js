import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../../components/form/Input";
import SelectGroup from "../../../components/form/SelectGroup";
import Date from "../../../components/form/DatePicker";
import SelectBox from "../../../components/form/SelectBox";
import {
  validateAadharNumber,
  validateAccountNumber,
  validateFile,
  validateIFSC,
  validatePAN,
  validateZipCode,
} from "../../../components/form/CustomValidations";
import { MdVerified } from "react-icons/md";
import FileInput from "../../../components/form/FileInput";
import { PhoneNumber } from "../../../components/form/PhoneNumber";
import { BaseUrl } from "../../../App";
import { Config } from "../../../utils/Auth";
import axios from "axios";

const GenderData = ["Male", "Female", "Other"];
const MaterialStatus = ["Single", "Married", "Other"];

export default function DistrictHeadForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [phoneErrors, setPhoneErrors] = useState(null);
  const validatePhoneNumber = () => {};
  const [loading, setLoading] = useState(true);
  const [treeDistricts, setTreeDistricts] = useState([]);
  const [error, setError] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const checkMobileNumber = async (phoneNumber) => {
    if (phoneNumber && phoneNumber.length >= 10) {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/admin/district-head/check-phone/${phoneNumber}`,
          Config()
        );
        setPhoneErrors(null);
      } catch (error) {
        console.log(error);
        setPhoneErrors(error.response.data.error);
      }
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/admin/section/incomplete-filter?districtName`,
        Config()
      );

      setTreeDistricts(response.data.districtNames);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      }
      setError(error.message || "An error occurred while fetching data.");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("districtName", data?.districtName);
      formData.append("name", data?.name);
      formData.append("parentName", data?.parentInfo?.name);
      formData.append("relation", data?.parentInfo?.relation);
      formData.append("phoneNumber", data?.phoneNumber);
      formData.append("whatsAppNumber", data?.whatsAppNumber);
      formData.append("occupation", data?.occupation);
      formData.append("dateOfBirth", data?.dateOfBirth);
      formData.append("gender", data?.gender);
      formData.append("maritalStatus", data?.maritalStatus);
      formData.append("panNumber", data?.panNumber);
      formData.append("accountNumber", data?.accountNumber);
      formData.append("ifscCode", data?.ifscCode);
      formData.append("bankName", data?.bankName);
      formData.append("branchName", data?.branchName);
      formData.append("aadharNumber", data?.aadharNumber);
      formData.append("address", data?.address);
      formData.append("city", data?.city);
      formData.append("district", data?.district);
      formData.append("state", data?.state);
      formData.append("country", data?.country);
      formData.append("zipCode", data?.zipCode);
      if (data?.applicantPhoto) {
        formData.append("applicantPhoto", data?.applicantPhoto[0]);
      } else {
        alert("Applicant photo is required");
        return;
      }

      const res = await axios.post(
        `${BaseUrl}/api/admin/district-head/register/`,
        formData,
        Config()
      );

      alert("Registration successful");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      } else {
        alert(
          "An error occurred: " +
            (error.response?.data?.message || error.message)
        );
      }
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="m-3 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-6 ">Registration Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Controller
          name="districtName"
          control={control}
          rules={{
            required: "Name is required",
          }}
          render={({ field }) => (
            <SelectBox
              label="District Name"
              options={treeDistricts}
              error={errors.districtName}
              {...field}
            />
          )}
        />

        <div></div>
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
              options={["S/O", "D/O", "W/O"]}
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
            validate: validatePhoneNumber,
          }}
          render={({ field }) => (
            <div>
              <PhoneNumber
                label="Phone Number"
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={field.value || ""}
                onChange={(value) => {
                  field.onChange(value);
                  checkMobileNumber(value);
                }}
                error={errors.phoneNumber}
              />
              {phoneErrors && (
                <span className="text-red-500">* {phoneErrors}</span>
              )}
            </div>
          )}
        />

        <Controller
          name="whatsAppNumber"
          control={control}
          rules={{
            required: "What's App number is required",
            validate: validatePhoneNumber,
          }}
          render={({ field }) => (
            <PhoneNumber
              label="Whatsapp Number"
              defaultCountry="IN"
              placeholder="Enter  whats app number"
              value={field.value}
              onChange={field.onChange}
              error={errors.whatsAppNumber}
            />
          )}
        />

        <Controller
          name="occupation"
          control={control}
          rules={{ required: "Occupation  is required" }}
          render={({ field }) => (
            <Input
              label="Occupation "
              placeholder="Enter Occupation "
              error={errors.occupation}
              {...field}
            />
          )}
        />

        <Controller
          name="dateOfBirth"
          control={control}
          rules={{
            required: "Date of birth is required",
            // validate: validateDOB,
          }}
          render={({ field }) => (
            <Date
              label="Date Of Birth"
              type="date"
              value={field.value || ""}
              onChange={field.onChange}
              error={errors.dateOfBirth}
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
          rules={{
            required: "PAN number is required",
            validate: validatePAN,
          }}
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
          rules={{
            required: "Account number is required",
            validate: validateAccountNumber,
          }}
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
          rules={{
            required: "IFSC code is required",
            validate: validateIFSC,
          }}
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
          name="branchName"
          control={control}
          rules={{ required: "Branch Name is required" }}
          render={({ field }) => (
            <Input
              label="Branch Name"
              placeholder="Enter Branch Name"
              error={errors.branchName}
              {...field}
            />
          )}
        />

        <Controller
          name="aadharNumber"
          control={control}
          rules={{
            required: "Aadhar Number is required",
            validate: validateAadharNumber,
          }}
          render={({ field }) => (
            <Input
              label="Aadhar Number"
              placeholder="Enter Aadhar Number"
              error={errors.aadharNumber}
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
          rules={{
            required: "Zip code is required",
            validate: validateZipCode,
          }}
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
          name="applicantPhoto"
          control={control}
          rules={{ validate: validateFile }}
          render={({ field }) => (
            <FileInput
              label="Applicant Photo"
              id="applicantPhoto"
              error={errors.applicantPhoto}
              onChange={(e) => {
                field.onChange(e.target.files);
              }}
              uploaded={field.value && field.value.length > 0}
              fileName={
                field.value && field.value.length > 0 ? field.value[0].name : ""
              }
            />
          )}
        />
        {/* {submitError && <p>{submitError}</p>} */}
        <div className="col-span-1  md:col-span-2 text-center">
          {Object.keys(errors).length > 0 && (
            <span className="text-red-500 text-center">
              {" "}
              Please correct the errors and fill in all required fields.
            </span>
          )}
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-end mt-4 space-x-6">
          <button
            type="button"
            className="px-4 py-2 font-semibold text-red-500  "
            onClick={() => window.location.reload()}
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
  );
}
