"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import _ from "lodash";
import { useDispatch } from "react-redux";
import Link from "next/link";
import logo from "../public/images/logo.svg";
import "../styles/loginmodal.css";
import { setAccessToken, setUserDetails } from "../redux/slices/auth.slice";
import { pagePaths } from "../utils/constants/constant";
import api from "../utils/api.utils";
import { apiUrls } from "../utils/constants/api.constants";
import { initialValues, validationSchema } from "./helper";
import Image from "next/image";

const UserLogin = ({ handleCloseLoginModel }) => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [msg, setMsg] = useState("");
  const [mailmsg, setmailMsg] = useState("");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [useMobileLogin, setUseMobileLogin] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      if (useMobileLogin) {
        handleOtpLogin(values);
      } else {
        handleEmailPasswordLogin(values);
      }
    },
    onSubmit1: async (values) => {
      try {
        setLoading(true);
        if (!showOtpInput) {
          const response = await api.post(apiUrls.sendOtp, {
            mobile_number: values.mobile_number,
          });
          if (response.status === 200) {
            setShowOtpInput(true);
            setMsg(response.data.message);
          } else {
            setShowOtpInput(false);
            setMsg(response.data.message);
          }
        } else {
          const response = await api.post(apiUrls.verifyOtp, {
            mobile_number: values.mobile_number,
            otp: values.otp,
          });
          if (response.status === 200) {
            setShowOtpInput(true);
            setMsg(response.data.message);
            dispatch(setAccessToken(response.data?.data?.access_token));
            setTimeout(() => {
              handleCloseLoginModel();
            }, 300);
            api.get(apiUrls.getAccountDetails).then((response) => {
              const userDetails = _.get(response, "data.userDetails");
              if (userDetails) {
                dispatch(setUserDetails(userDetails));
              }
            });
          } else {
            setShowOtpInput(false);
            setMsg(response.data.message);

            // setMsg(response && response.data && response.data.message);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMsg(
          error &&
            error.response &&
            error.response.data &&
            error.response.data.message
        );
      }
    },
  });
  // Email & Password Login
  const handleEmailPasswordLogin = async (values) => {
    try {
      setLoading(true);
      const response = await api.post(apiUrls.emailLogin, {
        data: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        dispatch(setAccessToken(response.data?.data?.access_token));
        setmailMsg("Login successful!");
        setTimeout(() => {
          handleCloseLoginModel();
        }, 300);
        api.get(apiUrls.getAccountDetails).then((response) => {
          const userDetails = _.get(response, "data.userDetails");
          if (userDetails) {
            dispatch(setUserDetails(userDetails));
          }
        });
      }
    } catch (error) {
      setMsg(
        error.response?.data?.message || "Invalid username/email or password"
      );
    } finally {
      setLoading(false);
    }
  };
  // OTP-Based Login
  const handleOtpLogin = async (values) => {
    try {
      setLoading(true);
      if (!showOtpInput) {
        const response = await api.post(apiUrls.sendOtp, {
          mobile_number: values.mobile_number,
        });
        if (response.status === 200) {
          setShowOtpInput(true);
          setMsg(response.data.message);
        } else {
          setShowOtpInput(false);
          setMsg(response.data.message);
        }
      } else {
        const response = await api.post(apiUrls.verifyOtp, {
          mobile_number: values.mobile_number,
          otp: values.otp,
        });
        if (response.status === 200) {
          setShowOtpInput(true);
          setMsg(response.data.message);
          dispatch(setAccessToken(response.data?.data?.access_token));
          setTimeout(() => {
            handleCloseLoginModel();
          }, 300);
          api.get(apiUrls.getAccountDetails).then((response) => {
            const userDetails = _.get(response, "data.userDetails");
            if (userDetails) {
              dispatch(setUserDetails(userDetails));
            }
          });
        } else {
          setShowOtpInput(false);
          setMsg(response.data.message);

          // setMsg(response && response.data && response.data.message);
        }
      }
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        setMsg(
          error.response?.data?.message ||
            "Invalid credentials. Please try again."
        );
      } else {
        setMsg("An error occurred. Please try again.");
      }
      // setLoading(false);
      // setMsg(error && error.response && error.response.data && error.response.data.message);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      const response = await api.post(apiUrls.sendOtp, {
        mobile_number: formik.values.mobile_number,
      });
      if (response.status === 200) {
        setMsg(response.data.message);
      } else {
        setShowOtpInput(false);
        setMsg(response.data.message); // Only error message
      }
    } catch (error) {
      setMsg(
        error &&
          error.response &&
          error.response.data &&
          error.response.data.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="">
        <div className="full_container">
          <div className="container" id="formm">
            <div className="center">
              <div className="login_sectionone">
                <div className="">
                  <div className="center">
                    <Image width="210" src={logo} alt="#" />
                  </div>
                </div>
                {msg != "Invalid OTP" && showOtpInput ? (
                  <>
                    <div className="alert alert-success alert-dismissible mt-4">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        &times;
                      </button>
                      <strong>Success!</strong> {msg}
                    </div>
                  </>
                ) : null}
                {msg && !showOtpInput && (
                  <>
                    <div className="alert alert-danger alert-dismissible mt-4">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        &times;
                      </button>
                      <strong>Error!</strong> {msg}
                    </div>
                  </>
                )}

                {mailmsg && (
                  <>
                    <div className="alert alert-success  mt-4">
                      <button type="button" className="close"></button>
                      {mailmsg}
                    </div>
                  </>
                )}
                {msg == "Invalid OTP" && showOtpInput && (
                  <>
                    <div className="alert alert-danger alert-dismissible mt-4">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                      >
                        &times;
                      </button>
                      <strong>Error!</strong> {msg}
                    </div>
                  </>
                )}
                <div className="form-group">
                  <form onSubmit={formik.handleSubmit}>
                    <fieldset>
                      {!showOtpInput ? (
                        <>
                          {/* Toggle Between Email/Password and Mobile Number */}
                          {!useMobileLogin ? (
                            <div className="field ">
                              <label
                                className="email-phone mt-5"
                                htmlFor="email"
                              >
                                Enter Email or Username
                              </label>
                              <input
                                type="text"
                                id="email"
                                className="form-control"
                                placeholder="Enter Email ID or Username"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                required
                              />
                              <label
                                className="email-password mt-2"
                                htmlFor="password"
                              >
                                Enter Password
                              </label>
                              <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                required
                              />
                            </div>
                          ) : (
                            <div className="field">
                              <label
                                className="email-phone"
                                htmlFor="mobile_number"
                              >
                                Enter Mobile Number To Sign In Or Register
                              </label>
                              <input
                                type="number"
                                id="mobile_number"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                name="mobile_number"
                                value={formik.values.mobile_number}
                                onChange={(event) => {
                                  const inputValue = event.target.value;
                                  const numericValue = inputValue.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  event.target.value = numericValue.slice(
                                    0,
                                    10
                                  );
                                  formik.handleChange(event);
                                }}
                                required
                              />
                            </div>
                          )}
                          {/* Toggle Button for Login Method */}
                          {/* <button
                            type="button"
                            onClick={() => setUseMobileLogin(!useMobileLogin)}
                            className="toggle-login-method"
                          >
                            {useMobileLogin ? "Login with Email & Password" : "Login with Mobile OTP"}
                          </button> */}
                          <div>
                            <p className="mt-3">
                              {useMobileLogin
                                ? " Already have an account?"
                                : "Or"}

                              <button
                                type="button"
                                className="btn btn-link"
                                onClick={() =>
                                  setUseMobileLogin(!useMobileLogin)
                                }
                              >
                                {useMobileLogin
                                  ? "Login with Email & Password"
                                  : "Login with Mobile OTP"}
                              </button>
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="sign">
                          <label className="label_field">Enter OTP</label>
                          <input
                            type="text"
                            id="otp"
                            className="form-control"
                            placeholder="Enter OTP"
                            name="otp"
                            onChange={(event) => {
                              const inputValue = event.target.value;
                              const numericValue = inputValue.replace(
                                /[^0-9]/g,
                                ""
                              );
                              event.target.value = numericValue.slice(0, 6);
                              formik.handleChange(event);
                            }}
                            value={formik.values.otp}
                            required
                          />
                        </div>
                      )}

                      <div className="field margin_0 mt-4 ">
                        <button disabled={loading} className="main_btns">
                          {loading ? "Signing In..." : "Sign In"}
                        </button>

                        {showOtpInput && (
                          <a
                            href="#"
                            className="ml-3"
                            onClick={handleResend}
                            style={{
                              pointerEvents: loading ? "none" : "auto",
                              opacity: loading ? 0.6 : 1,
                            }}
                          >
                            {loading ? "Resend OTP" : "Resend OTP"}
                          </a>
                        )}
                      </div>
                    </fieldset>
                  </form>
                </div>

                <p className="sms-update">
                  You might receive SMS updates from Cureka and have the option
                  to opt out with an OTP at any time.
                </p>
                <p className="signinterms">
                  <span className="required-star gap-2">*</span>By continuing,
                  you agree with our&nbsp;
                  <Link
                    className="signinconditions"
                    href={pagePaths.privacyPolicy}
                  >
                    Privacy Policy&nbsp;
                  </Link>
                  and&nbsp;
                  <Link
                    href={pagePaths.termsAndConditions}
                    className="signincondition"
                  >
                    Terms and Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
