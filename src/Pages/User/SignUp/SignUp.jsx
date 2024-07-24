/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
// import SingUpImg from '/Singup_img/Singup.svg';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import './signup.css';
// const Url = import.meta.env.VITE_API_URL;
import { useNavigate, useLocation } from "react-router-dom";
import { BaseUrl } from '../../../App';
  // const apiKey = import.meta.env.VITE_API_KEY;
  // const appTitle = import.meta.env.VITE_APP_TITLE;
const CreateAccountForm = () => {
  const navigate = useNavigate();
  let location = useLocation()
  let { state } = useLocation(); 
  // console.log(state.event.fullName);
  // console.log(Url);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // useEffect(() => {
  //   const getLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(`
  //             latitude: ${position.coords.latitude},
  //             longitude: ${position.coords.longitude},
  //           `);
  //         },
  //         (error) => {
  //           console.error("Error getting location: ", error);
  //         }
  //       );
  //     } else {
  //       alert("Geolocation is not supported by this browser.");
  //     }
  //   };

  // VIGNESH A
  // 11:31 AM
  // https://nodejs.perkinscampus.com/
  //   getLocation()
   
  // },);
  useEffect(() => {
    if (state && state.event && state.event.fullName) {
      const Data = state.event;
      setFormData({
        fullName: Data.fullName,
        phoneNumber: Data.phoneNumber,
        email: Data.email,
        password: Data.password,
        confirmPassword: Data.confirmPassword,
      });
    }
  }, [state]);
  const [isRegistered, setIsRegistered] = useState(null); // null means unchecked, true means registered, false means not registered
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const myStyle = {
    paddingTop: '0.1rem',
    paddingBottom: '0.1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    borderRadius: '0.375rem',
    borderWidth: '1px',
    borderColor: '#D1D5DB',
    width: '100%',
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhoneChange = (value) => {
   
    if (value==undefined) {
      value=""
    setFormData((prevState) => ({ ...prevState, phoneNumber: value }));
      
    }
    setFormData((prevState) => ({ ...prevState, phoneNumber: value }));
    setError(null)
   
    if (value.length >= 13) {
      // Trigger verification
      console.log(value);
      verifyMobileNumber(value);
    }else{
      setIsRegistered(null)
    }
  };

   const verifyMobileNumber = async (number) => {

    try {
      const response = await axios.post(`${BaseUrl}/login/user/mobileverification/?context=create`, { phoneNumber: number });
      if (response.data.message==="User verified.") {
        setIsRegistered(true);
      } 
  
    } catch (error) {
      if (error.response.data.message==="Member not found") {
      setIsRegistered(false);
    }else{
      if( error.response.data.message==="User account found. Please log in." ){
        setError("User account found. Please log in.")
      }
    }

    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BaseUrl}/login/user/create`, formData);
      console.log('Form submitted successfully:', response.data.otp);
      if (response.data.message==='OTP sent successfully') {
        navigate("/Authentication", { state: { "otp":response.data.otp, "formData":{fullName: formData.fullName,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword}} });
      }

    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-blue-50">
      <div className="flex flex-col w-full max-w-5xl md:flex-row">
        <div className="items-center justify-center hidden w-1/2 p-8 md:flex bg-blue-50">
          <img src="assets\Singup.svg" alt="Network illustration" className="w-full" />
        </div>
        <div className="p-8 bg-white shadow-lg md:w-1/2 md:rounded-br-none md:rounded-tr-none rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl">
          <h2 className="mb-4 text-2xl font-semibold text-blue-600">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block mb-1 font-medium text-gray-700">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="mobileNumber" className="block mb-1 font-medium text-gray-700">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <PhoneInput
                style={myStyle}
                defaultCountry="IN"
                required
                placeholder="Enter Mobile Number"
                value={formData.mobileNumber}
                onChange={handlePhoneChange}
                
              />
              
              {isRegistered !== null && !loading && (
                <p className={` mt-2 text-center ${isRegistered ? 'text-green-600' : 'text-red-600'}`}>
                  {isRegistered===true ? (
                    <>
                      {/* User is registered <span>&#10003;</span> */}
                      <img className="absolute right-1 bottom-2" width="25" height="25" src="https://img.icons8.com/fluency/48/instagram-check-mark.png" alt="instagram-check-mark"/>
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
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="abcd@gmail.com"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                Enter password<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
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
                  <img width="24" height="24" src="https://img.icons8.com/sf-regular-filled/48/invisible.png" alt="invisible" />
                ) : (
                  <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/visible.png" alt="visible" />
                )}
              </button>
            </div>
            <div className="relative mb-4">
              <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">
                Re-Enter password<span className="text-red-500">*</span>
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
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
                  <img width="24" height="24" src="https://img.icons8.com/sf-regular-filled/48/invisible.png" alt="invisible" />
                ) : (
                  <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/visible.png" alt="visible" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className={`w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${isRegistered===false || isRegistered===null ?'opacity-50 cursor-not-allowed' : ''}`}

              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Signup'}
            </button>
            {error && <p className="mt-4 text-center text-red-600">{error}</p>}
<p className="mt-4 text-center text-gray-600">
Already have an account?{' '}
<a href="/#/SignIn" className="text-blue-500 hover:underline">
Sign in
</a>
</p>
</form>
</div>
</div>
</div>
);
};

export default CreateAccountForm;



// import SingUpImg from '/Singup_img/Singup.svg';
// OTP Authentication Component

export const OTPAuthentication = () => {
  const navigate = useNavigate();

  let location = useLocation()
  let { state } = useLocation(); 
 
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const handleChange = async (event) => {
// console.log(event);
    navigate("/", { state: { event}});
  }
  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/login/user/validate-otp`, { phoneNumber: state.formData.phoneNumber, otp });
      
      if (response.data.message==="OTP validated successfully") {
        setMessage('OTP verified successfully!');
        navigate("/Dashboard");

        // Redirect or perform further actions upon successful verification
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('An error occurred while verifying OTP. Please try again later.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/login/user/create`,  state.formData );
      console.log(response.data);
      if (response.data.message==='OTP sent successfully') {
        setMessage('OTP has been resent successfully!');
      } else {
        setMessage('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setMessage('An error occurred while resending OTP. Please try again later.');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-blue-50">
    <div className="flex flex-col w-full max-w-5xl md:flex-row">
      <div className="items-center justify-center hidden w-1/2 p-8 md:flex bg-blue-50">
        <img src="assets\Singup.svg" alt="Network illustration" className="w-full" />
      </div>
      <div className="p-8 bg-white shadow-lg md:w-1/2 md:rounded-br-none md:rounded-tr-none rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rounded-tr-3xl">
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">Authentication required</h2>
        <p className="mb-2 text-gray-700">
          IN {state.formData.phoneNumber}   &nbsp; <span  onClick={(e) => handleChange(state.formData)} className="text-blue-500 hover:underline">Change</span>
        </p>
        <p className="mb-6 text-gray-700">
          We've sent a One Time Password (OTP) to the mobile number above. Please enter it to complete verification.
        </p>
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-1 font-medium text-gray-700">Enter OTP</label>
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
          <button
            type="submit"
            className="w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
        <div className="mt-4 text-center text-gray-600">
          Didn't receive the OTP? 
          <button
            onClick={handleResendOtp}
            className="ml-1 text-blue-500 hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

  


