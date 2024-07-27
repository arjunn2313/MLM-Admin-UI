import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/form/Input";
import SelectGroup from "../../../components/form/SelectGroup";
import Date from "../../../components/form/DatePicker";
import SelectBox from "../../../components/form/SelectBox";
import axios from "axios";
import RegPreview from "../../../components/form/RegPreview";
import { PhoneNumber } from "../../../components/form/PhoneNumber";
import {
  validateAadharNumber,
  validateAccountNumber,
  validateFile,
  validateIFSC,
  validatePAN,
  validatePhoneNumber,
  validateZipCode,
} from "../../../components/form/CustomValidations";
import FileInput from "../../../components/form/FileInput";
import { BaseUrl } from "../../../App";
import { Config } from "../../../utils/Auth";
import ExpiryModal from "../../../components/modals/ExpiryModal";

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
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(null);
  const [sectionExpired, setSectionExpired] = useState(false);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/api/admin/settings`)
      .then((res) => {
        console.log(res);
        setValue("joiningFee", res.data.joiningFee);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [phoneErrors, setPhoneErrors] = useState(null);

  // check phone

  const checkMobileNumber = async (phoneNumber) => {
    if (phoneNumber && phoneNumber.length >= 10) {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/admin/agent/check-phone/${phoneNumber}`,
          Config()
        );
        setPhoneErrors(null);
      } catch (error) {
        setPhoneErrors(error.response.data.error);
        if (error.response && error.response.status === 403) {
          setSectionExpired(true);
        }
      }
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    const applicantPhotoBase64 = await fileToBase64(data.applicantPhoto[0]);

    const plainObject = {
      ...data,
      applicantPhoto: applicantPhotoBase64,
    };

    localStorage.setItem("formData", JSON.stringify(plainObject));
    naviagte("terms-and-condition");
  };

  return (
    <>
      {sectionExpired && <ExpiryModal isOpen={sectionExpired} />}
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
              rules={{ required: "Date of birth is required" }}
              render={({ field }) => (
                <Date
                  label="Date Of Birth"
                  type="date"
                  error={errors.dateOfBirth}
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
              name="nameOfNominee"
              control={control}
              rules={{ required: "Nominee name is required" }}
              render={({ field }) => (
                <Input
                  label="Name of the Nominee"
                  placeholder="Enter nominee name"
                  error={errors.nameOfNominee}
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
              // rules={{ required: "Nominee name is required" }}
              render={({ field }) => (
                <Input
                  label="Joining Fee"
                  // placeholder="Enter nominee name"
                  error={errors.joiningFee}
                  {...field}
                  disabled={true}
                />
              )}
            />

            <Controller
              name="applicantPhoto"
              control={control}
              rules={{ validate: validateFile }}
              render={({ field }) => (
                <FileInput
                  label="Tree Head Photo"
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
                Next
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
