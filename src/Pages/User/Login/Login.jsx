import React, { useState } from "react";
import axios from "axios";
// import SingUpImg from '/Singup_img/Singup.svg';
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { BaseUrl } from "../../../App";

// const Url = import.meta.env.VITE_API_URL;
const SignIn = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({ phoneNumbe: "" });
  const [password, setPassword] = useState({ password: "", otp: "" });
  // const [otp, setOtp] = useState("");
  const [numberVerify, setNumberVerify] = useState(null);

  const myStyle = {
    paddingTop: "0.1rem",
    paddingBottom: "0.1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.375rem",
    borderWidth: "1px",
    borderColor: "#D1D5DB",
    width: "100%",
  };
  const [showPassword, setShowPassword] = useState(false);

  const [isRegistered, setIsRegistered] = useState(null); // null means unchecked, true means registered, false means not registered
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BaseUrl}/login/user/login-by-password`,
        { phoneNumber: value.phoneNumber, password: password.password }
      );
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/Dashboard");
        toast.success("Mobile number verified successfully!");
      } else {
        toast.error("Number verification failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying number. Please try again later.");
      console.error("Error verifying number:", error);
    }
  };
  const SendOtpRequst = async (e) => {
    e.preventDefault();
    setNumberVerify(false);
    try {
      const response = await axios.post(
        `${BaseUrl}/login/user/login-otp-request`,
        { phoneNumber: value.phoneNumber }
      );
      if (response.data.message === "OTP sent successfully") {
        toast.success("Otp Sent successfully!");
      } else {
        toast.error("Otp Sent  failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying number. Please try again later.");
      console.error("Error verifying number:", error);
    }
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setNumberVerify(false);
    try {
      const response = await axios.post(
        `${BaseUrl}/login/user/login-otp-validate`,
        { phoneNumber: value.phoneNumber, otp: password.otp }
      );
      if (response.data.accessToken) {
        toast.success("Otp verified successfully!");
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/Dashboard");
        toast.success("Mobile number verified successfully!");
      } else {
        toast.error("Otp verification failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying number. Please try again later.");
      console.error("Error verifying number:", error);
    }
  };

  const handleOtpChange = (e) => {
    setPassword((prevState) => ({ ...prevState, otp: e.target.value }));
  };

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setPassword((prevState) => ({ ...prevState, password: e.target.value }));
  };
  const handlePhoneChange = (value) => {
    //  console.log(value);
    if (value == undefined) {
      value = "";
      setValue((prevState) => ({ ...prevState, phoneNumber: value }));
    }

    setValue((prevState) => ({ ...prevState, phoneNumber: value }));

    if (value.length >= 13) {
      // Trigger verification
      verifyMobileNumber(value);
    } else {
      setIsRegistered(null);
    }
  };

  const verifyMobileNumber = async (number) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${BaseUrl}/login/user/mobileverification/?context=login`,
        { phoneNumber: number }
      );

      if (response.data.message === "User verified.") {
        setLoading(false);

        setIsRegistered(true);
        setNumberVerify(true);
        // toast.success('Mobile number verified successfully!');
      }
    } catch (error) {
      if (
        error.response.data.message === "Member not found" ||
        error.response.data.message ===
          "User account not found. Please create account."
      ) {
        // toast.error('Number verification failed. Please try again.');
        setLoading(false);

        setIsRegistered(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 select-none bg-blue-50">
      <ToastContainer />
      <div className="flex flex-col w-full max-w-5xl md:flex-row">
        <div className="items-center justify-center hidden w-1/2 p-8 md:flex bg-blue-50">
          <img
            src="assets\Singup.svg"
            alt="Network illustration"
            className="w-full"
          />
        </div>
        {numberVerify === null ? (
          <div className="p-8 bg-white shadow-lg md:w-1/2 md:rounded-br-none md:rounded-tr-none rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl">
            <h2 className="mb-4 text-2xl font-semibold text-blue-600 select-none ">
              Sign In
            </h2>
            <form>
              <div className="relative mb-4">
                <label
                  htmlFor="mobileNumber"
                  className="block mb-1 font-medium text-gray-700 select-none"
                >
                  Mobile Number
                </label>
                <span
                  className="absolute mt-1 text-sm text-blue-600 cursor-pointer bottom-[56px] right-1  "
                  onClick={() => navigate("/forgetPassword")}
                >
                  Forget Password
                </span>

                <PhoneInput
                  style={myStyle}
                  defaultCountry="IN"
                  required
                  placeholder="Enter Mobile Number"
                  value={value.phoneNumber}
                  onChange={handlePhoneChange}
                />

                {isRegistered !== null && !loading && (
                  <p
                    className={` mt-2 text-center ${
                      isRegistered ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isRegistered === true ? (
                      <>
                        {/* User is registered <span>&#10003;</span> */}
                        <img
                          className="absolute right-1 bottom-2"
                          width="25"
                          height="25"
                          src="https://img.icons8.com/fluency/48/instagram-check-mark.png"
                          alt="instagram-check-mark"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="absolute right-1 top-10"
                          width="25"
                          height="25"
                          src="https://img.icons8.com/fluency/48/cancel-2.png"
                          alt="cancel-2"
                        />
                        You are not a registered User
                        {/* User is not registered */}
                      </>
                    )}
                  </p>
                )}
              </div>
              <br />
              <button
                className={`w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  isRegistered === false || isRegistered === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>

              <p className="mt-4 text-center text-gray-600">
                Don’t have an account?{" "}
                <a href="#/signUp" className="text-blue-500 hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        ) : numberVerify === true ? (
          <div className="p-8 bg-white shadow-lg md:w-1/2 md:rounded-br-none md:rounded-tr-none rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl">
            <h2 className="mb-6 text-2xl font-semibold text-blue-600">
              Sign In
            </h2>
            <p className="mb-4 text-gray-700">
              {value.phoneNumber} &nbsp;{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setNumberVerify(null);
                  setValue({ ...value, phoneNumber: "" });
                  setIsRegistered(null);
                }}
              >
                Change
              </span>
            </p>
            <form onSubmit={handlePasswordSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Enter Password
                </label>
                <span
                  className="absolute mt-1 text-sm text-blue-600 cursor-pointer bottom-[56px] right-1 "
                  onClick={() => navigate("/forgetPassword")}
                >
                  Forget Password
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute text-gray-500 right-3 top-10 focus:outline-none"
                >
                  {showPassword ? (
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/sf-regular-filled/48/invisible.png"
                      alt="invisible"
                    />
                  ) : (
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/material-rounded/24/000000/visible.png"
                      alt="visible"
                    />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className={`w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  isRegistered === false || isRegistered === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={SendOtpRequst}
              className="w-full py-2 text-blue-500 transition-colors border border-blue-500 rounded-lg hover:bg-blue-50"
            >
              Get an OTP on your phone
            </button>
          </div>
        ) : (
          <div className="p-8 bg-white shadow-lg md:w-1/2 md:rounded-br-none md:rounded-tr-none rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl">
            <h2 className="mb-4 text-2xl font-semibold text-blue-600">
              Authentication required
            </h2>
            <p className="mb-2 text-gray-700">
              IN {value.phoneNumber}{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setNumberVerify(null);
                  setValue({ ...value, phoneNumber: "" });
                  setIsRegistered(null);
                }}
              >
                Change
              </span>
            </p>
            <p className="mb-6 text-gray-700">
              We've sent a One Time Password (OTP) to the mobile number above.
              Please enter it to complete verification.
            </p>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="654382"
                  required
                  value={password.otp}
                  onChange={handleOtpChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Verify
              </button>
              <p className="mt-4 text-center text-gray-600">
                <span
                  // onClick={handleResendOtp}
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={SendOtpRequst}
                >
                  Resend OTP
                </span>
              </p>
            </form>
            <p className="mr-2 text-center text-gray-700">or</p>

            <div className="flex justify-center ">
              <button
                onClick={() => {
                  setNumberVerify(true);
                  setPassword({ ...password, password: "" });
                }}
                className="w-full py-2 text-blue-500 transition-colors border border-blue-500 rounded-lg hover:bg-blue-50"
              >
                Sign in with your password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<     Forget password     >>>>>>>>>>>>>>>>>>>>>>>>

export const PasswordAssistance = () => {
  const [isRegistered, setIsRegistered] = useState(null); // null means unchecked, true means registered, false means not registered
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState({ phoneNumber: "" });
  const [numberVerify, setNumberVerify] = useState(null);
  const [otp, setOtp] = useState(null);

  const myStyle = {
    paddingTop: "0.1rem",
    paddingBottom: "0.1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "0.375rem",
    borderWidth: "1px",
    borderColor: "#D1D5DB",
    width: "100%",
  };

  const handlePhoneChange = (value) => {
    if (value === undefined) {
      value = "";
    }
    setValue((prevState) => ({ ...prevState, phoneNumber: value }));

    if (value.length >= 13) {
      // Trigger verification
      verifyMobileNumber(value);
    } else {
      setIsRegistered(null);
    }
  };

  const verifyMobileNumber = async (number) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BaseUrl}/login/user/mobileverification/?context=login`,
        { phoneNumber: number }
      );

      if (response.data.message === "User verified.") {
        setLoading(false);
        setIsRegistered(true);
        // toast.success('Mobile number verified successfully!');
      }
    } catch (error) {
      if (
        error.response.data.message === "Member not found" ||
        error.response.data.message ===
          "User account not found. Please create account."
      ) {
        setLoading(false);
        setIsRegistered(false);
      }
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BaseUrl}/login/user/forget-password`,
        { phoneNumber: value.phoneNumber }
      );

      if (response.data.message === "OTP sent successfully") {
        setLoading(false);
        setNumberVerify(true);
        // setIsRegistered(true);
        toast.success("Otp Sent successfully!");
      }
    } catch (error) {
      if (
        error.response.data.message === "Member not found" ||
        error.response.data.message ===
          "User account not found. Please create account."
      ) {
        setLoading(false);
        setIsRegistered(false);
      }
    }
  };
  const handleOTPverify = async (e) => {
    e.preventDefault();
    if (otp.length >= 4) {
      setNumberVerify(false);
    } else {
      setError("Enter Valid OTP");
    }
  };

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.password.length !== 0 &&
      formData.confirmPassword.length !== 0 &&
      formData.password === formData.confirmPassword
    ) {
      try {
        const response = await axios.post(
          `${BaseUrl}/login/user/reset-password`,
          {
            phoneNumber: value.phoneNumber,
            otp: otp,
            newPassword: formData.password,
          }
        );
        console.log(response.data);
        if (response.data.accessToken) {
          toast.success("Mobile number verified successfully!");
          toast.success("Otp verified successfully!");
          localStorage.setItem("accessToken", response.data.accessToken);
          navigate("/Dashboard");
        }
      } catch (error) {
        setNumberVerify(true);
        setOtp("");
        setFormData((prevState) => ({ ...prevState, password: "" }));
        setFormData((prevState) => ({ ...prevState, confirmPassword: "" }));
        toast.error("Otp verification Failed!");
      }
      // navigate('/login');
    } else {
      // Handle the error, e.g., show an error message
      toast.error("Passwords do not match or are empty.");

      // console.error("Passwords do not match or are empty.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-blue-50">
      <ToastContainer />
      <div className="flex flex-col w-full max-w-5xl md:flex-row">
        <div className="items-center justify-center hidden w-1/2 p-8 md:flex bg-blue-50">
          <img
            src="assets\Singup.svg"
            alt="Network illustration"
            className="w-full"
          />
        </div>
        {numberVerify === null ? (
          <div className="p-8 bg-white shadow-lg md:w-1/2 md:rounded-br-none md:rounded-tr-none rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl">
            <h2 className="mb-4 text-2xl font-semibold text-blue-600">
              Password assistance
            </h2>
            <p className="mb-6 text-gray-700">
              Enter the mobile phone number associated with your account.
            </p>
            <form onSubmit={handleContinue}>
              <div className="relative mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <PhoneInput
                  style={myStyle}
                  defaultCountry="IN"
                  required
                  placeholder="Enter Mobile Number"
                  value={value.phoneNumber}
                  onChange={handlePhoneChange}
                />
                {isRegistered !== null && !loading && (
                  <p
                    className={`mt-2 text-center ${
                      isRegistered ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <img
                          className="absolute right-1 bottom-2"
                          width="25"
                          height="25"
                          src="https://img.icons8.com/fluency/48/instagram-check-mark.png"
                          alt="instagram-check-mark"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="absolute right-1 top-10"
                          width="25"
                          height="25"
                          src="https://img.icons8.com/fluency/48/cancel-2.png"
                          alt="cancel-2"
                        />
                        You are not a registered User
                      </>
                    )}
                  </p>
                )}
              </div>
              <button
                className={`w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  isRegistered === false || isRegistered === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>
          </div>
        ) : numberVerify === true ? (
          <div className="p-8 bg-white shadow-lg md:w-1/2 md:rounded-br-none md:rounded-tr-none rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl">
            <h2 className="mb-4 text-2xl font-semibold text-blue-600">
              Authentication required
            </h2>
            <p className="mb-2 text-gray-700">
              IN {value.phoneNumber}{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => {
                  setNumberVerify(null);
                  setValue({ ...value, phoneNumber: "" });
                  setIsRegistered(null);
                }}
              >
                Change
              </span>
            </p>
            <p className="mb-6 text-gray-700">
              We've sent a One Time Password (OTP) to the mobile number above.
              Please enter it to complete verification.
            </p>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="654382"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error ? (
                <p className="w-full m-2 text-center text-red-500">{error}</p>
              ) : (
                <></>
              )}
              <button
                onClick={handleOTPverify}
                required
                className="w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>

              <p className="mt-4 text-center text-gray-600">
                <span className="text-blue-500 cursor-pointer hover:underline">
                  Resend OTP
                </span>
              </p>
            </form>
          </div>
        ) : (
          <>
            <div className="p-8 bg-white shadow-lg md:w-1/2 md:rounded-br-none md:rounded-tr-none rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl">
              <h2 className="mb-4 text-2xl font-semibold text-blue-600">
                Create New Password
              </h2>
              <p className="mb-6 text-gray-700">
                We'll ask for this password whenever you sign in.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    New password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute text-gray-500 right-3 top-9 focus:outline-none"
                  >
                    {showPassword ? (
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/sf-regular-filled/48/invisible.png"
                        alt="invisible"
                      />
                    ) : (
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/material-rounded/24/000000/visible.png"
                        alt="visible"
                      />
                    )}
                  </button>
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Re-Enter New password<span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute text-gray-500 right-3 top-9 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/sf-regular-filled/48/invisible.png"
                        alt="invisible"
                      />
                    ) : (
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/material-rounded/24/000000/visible.png"
                        alt="visible"
                      />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes and Sign in
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
