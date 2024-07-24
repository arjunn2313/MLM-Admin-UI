import React, { useRef, useState, useEffect } from "react";
import Input from "../../../components/form/Input";
import Date from "../../../components/form/DatePicker";
import SelectBox from "../../../components/form/SelectBox";
import SelectGroup from "../../../components/form/SelectGroup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import moment from "moment";
import { BaseUrl } from "../../../App";
import { Config } from "../../../utils/Auth";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ExpiryModal from "../../../components/modals/ExpiryModal";
import {
  validateAadharNumber,
  validateAccountNumber,
  validateFile,
  validateFileUpdate,
  validateIFSC,
  validatePAN,
  validatePhoneNumber,
  validateZipCode,
} from "../../../components/form/CustomValidations";
import FileInput from "../../../components/form/FileInput";
import { PhoneNumber } from "../../../components/form/PhoneNumber";

const GenderData = ["Male", "Female", "Other"];
const MaterialStatus = ["Single", "Married", "Other"];

export default function UpdateMember() {
  const { memberId } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [sectionExpired, setSectionExpired] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (data?.applicantPhoto) {
      formData.append("applicantPhoto", data.applicantPhoto[0]);
    }

    try {
      const res = await axios.put(
        `${BaseUrl}/api/admin/agent/agent-update/${memberId}`,
        formData,
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

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 403) {
        setSectionExpired(true);
      } else {
        toast.error("An error occurred. Please try again.", {
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
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/admin/agent/agent-preview/${memberId}`,
          Config()
        );
        const data = response.data;

        // console.log(data);

        setValue("name", data.name);
        setValue("parentInfo", {
          name: data.parentName,
          relation: data.relation,
        });
        setValue("whatsAppNumber", data.whatsAppNumber);
        setValue(
          "dob",
          moment(new Date(data?.dateOfBirth)).format("DD-MM-YYYY")
        );
        setValue("gender", data.gender);
        setValue("occupation", data.occupation);
        setValue("maritalStatus", data.maritalStatus);
        setValue("panNumber", data.panNumber);
        setValue("accountNumber", data.accountNumber);
        setValue("branchName", data.branchName);
        setValue("ifscCode", data.ifscCode);
        setValue("bankName", data.bankName);
        setValue("address", data.address);
        setValue("city", data.city);
        setValue("aadharNumber", data.aadharNumber);
        setValue("district", data.district);
        setValue("state", data.state);
        setValue("country", data.country);
        setValue("zipCode", data.zipCode);
        setValue("nameOfNominee", data.nameOfNominee);
        setValue("relationshipWithNominee", data.relationshipWithNominee);
        setValue("joiningFee", data.joiningFee);
        // setValue("applicantPhoto", data.applicantPhoto);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 403) {
          setSectionExpired(true);
        }
      }
    };

    fetchData();
  }, [memberId, setValue]);

  return (
    <>
      {sectionExpired && <ExpiryModal isOpen={sectionExpired} />}
      <ToastContainer />
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
            rules={{
              required: "PAN number is required",
              validate: validatePAN,
            }}
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
            name="nameOfNominee"
            control={control}
            rules={{ required: "Nominee name is required" }}
            render={({ field }) => (
              <Input
                label="Name of Nominee"
                placeholder="Enter name of nominee"
                error={errors.nameOfNominee}
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

          <Controller
            name="applicantPhoto"
            control={control}
            rules={{ validate: validateFileUpdate }}
            render={({ field }) => (
              <FileInput
                label="Applicant Photo"
                id="applicantPhoto"
                error={errors.applicantPhoto}
                onChange={(e) => field.onChange(e.target.files)}
                uploaded={field.value && field.value.length > 0}
              />
            )}
          />

          <div className="col-span-1  md:col-span-2 text-center">
            {Object.keys(errors).length > 0 && (
              <span className="text-red-500 text-center">
                {" "}
                Please correct the errors and fill in all required fields.
              </span>
            )}
          </div>

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
