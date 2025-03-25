"use client";

import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../redux/slices/auth.slice";
import api from "../../../utils/api.utils";
import { apiUrls } from "../../../utils/constants/api.constants";

const AccountTab = () => {
  const { userDetails } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAccountDetails();
  }, []);

  const getAccountDetails = () => {
    api
      .get(apiUrls.getAccountDetails)
      .then((response) => {
        const userDetails = _.get(response, "data.userDetails");
        if (userDetails) {
          dispatch(setUserDetails(userDetails));
        }
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });
  };

  const handleChange = (e, propName) => {
    dispatch(
      setUserDetails({
        ...userDetails,
        [propName]: e.target.value,
      })
    );
  };

  const handleSave = () => {
    // Validation for first name
    if (!userDetails.first_name || userDetails.first_name.trim() === "") {
      toast.error("First name is required.");
      return;
    }

    // Validation for last name
    if (!userDetails.last_name || userDetails.last_name.trim() === "") {
      toast.error("Last name is required.");
      return;
    }

    // Validation for email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userDetails.email || !emailPattern.test(userDetails.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Validation for mobile number
    const mobilePattern = /^[0-9]{10}$/;
    if (
      !userDetails.mobile_number ||
      !mobilePattern.test(userDetails.mobile_number)
    ) {
      toast.error("Mobile number must be numeric and exactly 10 digits.");
      return;
    }
    setIsLoading(true);
    api
      .post(apiUrls.updateAccountDetails, userDetails)
      .then((response) => {
        if (!response) {
          getAccountDetails();
        } else {
          toast.success(response && response.data && response.data.message);
        }
      })
      .catch((error) => {
        toast.error(
          error &&
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error
        );
        console.error("Error updating account details:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>
          My Account - Manage Orders, Shipping, and Personal Information |
          Cureka
        </title>
        <meta
          name="description"
          content="Access your account on Cureka to track orders, view order history, manage shipping addresses, and update personal information. Secure and personalized shopping made easy."
        />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cureka" />
        <meta
          property="og:description"
          content="Access your account on Cureka to track orders, view order history, manage shipping addresses, and update personal information. Secure and personalized shopping made easy."
        />
        <meta
          property="og:image"
          content="https://frontend.cureka.com/assets/images/logo.svg"
        />
      </Helmet>
      <div
        className="tab-pane fade show active"
        id="account-tab"
        role="tabpanel"
        aria-labelledby="account-vertical-tab"
      >
        <div className="account-section" id="edit-address">
          <h1 className="order-heading">Account Details</h1>

          <div className="row address-two px-0 px-lg-3">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="firstname" htmlFor="firstname">
                      First Name
                      <span className="required-star">*</span>
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="Enter your First Name"
                      value={userDetails?.first_name || ""}
                      onChange={(e) => {
                        handleChange(e, "first_name");
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="lastname" htmlFor="lastname">
                      Last Name
                      <span className="required-star">*</span>
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Enter your Last Name"
                      value={userDetails?.last_name || ""}
                      onChange={(e) => {
                        handleChange(e, "last_name");
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="email" htmlFor="last_name">
                      Email Address
                      <span className="required-star">*</span>
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter your mail address"
                      value={userDetails?.email || ""}
                      onChange={(e) => {
                        handleChange(e, "email");
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="mobileno" htmlFor="mobileno">
                      Mobile Number
                      <span className="required-star">*</span>
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="mobileno"
                      name="mobileno"
                      placeholder="Enter your Mobile Number"
                      value={userDetails?.mobile_number || ""}
                      onChange={(e) => {
                        handleChange(e, "mobile_number");
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mt-3">
                  <button
                    className="text-decoartion-none rate-btn"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountTab;
