import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../../context/UserContex";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnloading, verifyOtp } = useGlobalContext();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }

  const verfiyOnSubmit = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
              </div>
            </div>

            <div>
              <form onSubmit={verfiyOnSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-full h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 "
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        id="otp"
                        name="otp"
                      />
                      <br />
                      <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <br /> <br />
                  <div className="flex flex-col space-y-5">
                    <div>
                      {show && (
                        <button
                          disabled={btnloading}
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        >
                          {btnloading ? "Verifying..." : "Verify OTP"}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <Link
                        to={"/register"}
                        className="flex flex-row items-center text-blue-600"
                      >
                        try agin !
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="auth-page">
        <div className="auth-form">
          <h2>Verify Account</h2>
          <form onSubmit={verfiyOnSubmit}>
            <label htmlFor="otp">Otp</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              id="otp"
              name="otp"
            />
            <button disabled={btnloading} type="submit">
              {btnloading ? "Please Wait.." : "Verify"}
            </button>
          </form>
          <p>
            Go to <Link to={"/login"}>Login </Link> Page
          </p>
        </div>
      </div> */}
    </>
  );
};

export default Verify;
