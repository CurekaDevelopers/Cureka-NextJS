"use client";

import _ from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../redux/slices/auth.slice";
import api from "../../../utils/api.utils";
import { apiUrls } from "../../../utils/constants/api.constants";
import Image from "next/image";
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
          content="https://frontend.cureka.com/src/assets/images/logo.svg"
        />
      </Helmet>

      <div className="account-section p-4 bg-white rounded shadow-sm">
        <h2 className="mb-4 text-primary">Account Details</h2>

        <div className="row g-3">
          {/* First Name */}
          <div className="col-md-6">
            <label htmlFor="firstname" className="form-label fw-semibold">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="firstname"
              className="form-control"
              placeholder="Enter your First Name"
              value={userDetails?.first_name || ""}
              onChange={(e) => handleChange(e, "first_name")}
              disabled={isLoading}
            />
          </div>

          {/* Last Name */}
          <div className="col-md-6">
            <label htmlFor="lastname" className="form-label fw-semibold">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="lastname"
              className="form-control"
              placeholder="Enter your Last Name"
              value={userDetails?.last_name || ""}
              onChange={(e) => handleChange(e, "last_name")}
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your Email Address"
              value={userDetails?.email || ""}
              onChange={(e) => handleChange(e, "email")}
              disabled={isLoading}
            />
          </div>

          {/* Mobile Number */}
          <div className="col-md-6">
            <label htmlFor="mobileno" className="form-label fw-semibold">
              Mobile Number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="mobileno"
              className="form-control"
              placeholder="Enter your Mobile Number"
              value={userDetails?.mobile_number || ""}
              onChange={(e) => handleChange(e, "mobile_number")}
              disabled={isLoading}
            />
          </div>

          {/* Save Button */}
          <div className="col-12 mt-3">
            <button
              className="btns btn-primary px-4 py-2"
              onClick={handleSave}
              disabled={isLoading}
              style={{ backgroundColor: "#007bff", color: "white" }}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountTab;
