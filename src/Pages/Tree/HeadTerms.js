import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseUrl } from "../../request/URL";

export default function HeadTerms() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { districtId, name } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(null);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
    try {
      const localData = localStorage.getItem("formData");
      if (!localData) {
        throw new Error("No form data found in localStorage");
      }

      const data = JSON.parse(localData);
      const formData = new FormData();

      if (data.applicantPhoto) {
        const applicantPhotoFile = base64ToFile(
          data.applicantPhoto,
          "applicantPhoto.png"
        );
        console.log(applicantPhotoFile);
        formData.append("applicantPhoto", applicantPhotoFile);
      } else {
        throw new Error("Applicant photo is missing or invalid");
      }

      formData.append("treeName", data?.treeName);
      formData.append("name", data?.name);
      formData.append("parentName", data?.parentInfo?.name);
      formData.append("relation", data?.parentInfo?.relation);
      formData.append("phoneNumber", data?.phoneNumber);
      formData.append("whatsAppNumber", data?.whatsAppNumber);
      formData.append("occupation", data?.occupation);
      formData.append("dateOfBirth", data?.dob);
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
      formData.append("nameOfNominee", data?.nomineeName);
      formData.append("relationshipWithNominee", data?.relationshipWithNominee);
      formData.append("joiningFee", data?.joiningFee);
      formData.append("status", "Approved");

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
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="m-3  p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Terms & Conditions
      </h2>
      <div className="space-y-8">
        <section className="space-y-3">
          <h3 className="font-semibold text-lg">Conditions of use</h3>
          <p className="text-gray-800  ">
            By using this website, you certify that you have read and reviewed
            this Agreement and that you agree to comply with its terms. If you
            do not want to be bound by the terms of this Agreement, you are
            advised to stop using the website accordingly. [Company name] only
            grants use and access of this website, its products, and its
            services to those who have accepted its terms.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-lg">Privacy policy</h3>
          <p className="text-gray-800">
            Before you continue using our website, we advise you to read our
            privacy policy [link to privacy policy] regarding our user data
            collection. It will help you better understand our practices.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-lg">Age Restriction</h3>
          <p className="text-gray-800">
            You must be at least 18 (eighteen) years of age before you can use
            this website. By using this website, you warrant that you are at
            least 18 years of age and you may legally adhere to this Agreement.
            [Company name] assumes no responsibility for liabilities related to
            age misrepresentation.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-lg">Intellectual property</h3>
          <p className="text-gray-800">
            You agree that all materials, products, and services provided on
            this website are the property of [company name], its affiliates,
            directors, officers, employees, agents, suppliers, or licensors
            including all copyrights, trade secrets, trademarks, patents, and
            other intellectual property. You also agree that you will not
            reproduce or redistribute the [company name]'s intellectual property
            in any way, including electronic, digital, or new trademark
            registrations. You grant [company name] a royalty-free and
            non-exclusive license to display, use, copy, transmit, and broadcast
            the content you upload and publish. For issues regarding
            intellectual property claims, you should contact the company in
            order to come to an agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-lg">User accounts</h3>
          <p className="text-gray-800">
            As a user of this website, you may be asked to register with us and
            provide private information. You are responsible for ensuring the
            accuracy of this information, and you are responsible for
            maintaining the safety and security of your identifying information.
            You are also responsible for all activities that occur under your
            account or password. If you think there are any possible issues
            regarding the security of your account on the website, inform us
            immediately so we may address them accordingly. We reserve all
            rights to terminate accounts, edit or remove content and cancel
            orders at our sole discretion.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-lg">Applicable law</h3>
          <p className="text-gray-800">
            By using this website, you agree that the laws of the [your
            location], without regard to principles of conflict laws, will
            govern these terms and conditions, or any dispute of any sort that
            might come between [company name] and you, or its business partners
            and associates.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-lg">Disputes</h3>
          <p className="text-gray-800">
            Any dispute related in any way to your use of this website or to
            products you purchase from us shall be arbitrated by state or
            federal court [your location] and you consent to exclusive
            jurisdiction and venue of such courts.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-lg">Indemnification</h3>
          <p className="text-gray-800">
            You agree to indemnify [company name] and its affiliates and hold
            [company name] harmless against legal claims and demands that may
            arise from your use of our services. We reserve the right to select
            our own legal counsel.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="font-semibold text-lg">Limitation on liability</h3>
          <p className="text-gray-800">
            [Company name] is not liable for any damages that may occur to you
            as a result of your misuse of our website. [Company name] reserves
            the right to edit, modify, and change this Agreement at any time. We
            shall let our users know of these changes through electronic mail.
            This Agreement is an understanding between [company name] and the
            user, and this supersedes and replaces all prior agreements
            regarding the use of this website.
          </p>
        </section>
      </div>

      <div className="mt-6 flex items-center">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm">
          I accept the Terms and Conditions
        </label>
      </div>

      <div className="flex items-end justify-end">
        <button
          className={`mt-4 px-4 py-2 rounded ${
            isChecked
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isChecked}
          onClick={() => handleSubmit()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
