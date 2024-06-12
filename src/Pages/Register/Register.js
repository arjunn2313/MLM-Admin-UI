import React from "react";
import Input from "../../components/form/Input";
import Date from "../../components/form/DatePicker";
import SelectBox from "../../components/form/SelectBox";
import SelectGroup from "../../components/form/SelectGroup";

const GenderData = ["male", "female", "other"];
const MaterialStatus = ["single", "married", "other"];
const JoiningFee = ["2,500", "3,000", "3,500"];

export default function Register() {
  return (
    <div className="m-3 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Name of Applicant" placeholder="Enter Name" />
        <SelectGroup label="Parent Name" placeholder="Enter parent name" />
        <Input label="Phone Number" placeholder="Enter phone number" />
        <Date label="Date Of Birth" type="date" />
        <SelectBox options={GenderData} label="Gender" />
        <SelectBox options={MaterialStatus} label="Marital Status" />
        <Input label="Pan Number" placeholder="Enter PAN number" />
        <Input label="Account Number" placeholder="Enter account number" />
        <Input label="IFSC Code" placeholder="Enter IFSC code" />
        <Input label="Bank Name" placeholder="Enter bank name" />
        <Input label="Address" placeholder="Enter address" />
        <Input label="City" placeholder="Enter city" />
        <Input label="District" placeholder="Enter district" />
        <Input label="State" placeholder="Enter state" />
        <Input label="Country" placeholder="Enter country" />
        <Input label="Zip Code" placeholder="Enter zip code" />
        <Input label="Name of the Nominee" placeholder="Enter nominee name" />
        <Input
          label="Relationship with Nominee"
          placeholder="Enter relationship"
        />
        <Input label="Sponsor ID" placeholder="Enter sponsor ID" />
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

        <Input
          label="Applicant Placement Level"
          placeholder="Enter placement level"
        />
        <div></div>
        <SelectBox options={JoiningFee} label="Joining Fee" />

        <div>
          <label className="block mb-3 font-medium">Applicant Photo</label>
          <div className="w-full border border-dashed border-blue-500  otliune-none  p-2 rounded-md text-center underline text-blue-500">
            Upload image
          </div>
        </div>

        <div>
          <label className="block mb-3 font-medium">Applicant Sign</label>
          <div className="w-full border border-dashed border-blue-500  otliune-none  p-2 rounded-md text-center underline text-blue-500">
            Upload image
          </div>
        </div>

        <div>
          <label className="block mb-3 font-medium">Sponsor Sign</label>
          <div className="w-full border border-dashed border-blue-500  otliune-none  p-2 rounded-md text-center underline text-blue-500">
            Upload image
          </div>
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
  );
}
