import {
  faBars,
  faBell,
  faCircleQuestion,
  faEnvelope,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import user from "../../admin/images/layout_img/user_img.jpg";
import logo from "../../assets/images/Logo.png";
import api from "../../utils/api.utils";
import LeftNavigation from "../LeftNavigation";

const VerifyOTPForm = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleGetOTP = async (e) => {
    e.preventDefault();

    // You can add validation for the mobile number here

    try {
      const response = await api.post("/get-otp", {
        mobileNumber,
      });

      if (response.status === 200) {
        // OTP sent successfully
        setVerificationStatus("OTP sent successfully.");
      } else {
        // Handle error response
        setVerificationStatus("Error: Unable to send OTP.");
      }
    } catch (error) {
      // Handle network error or other errors
      setVerificationStatus("Error: " + error.message);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const data = {
      mobileNumber,
      otp,
    };

    try {
      const response = await api.post("/verify-otp", data);

      if (response.status === 200) {
        // OTP verified successfully
        setVerificationStatus("OTP verified successfully.");
      } else {
        // Handle error response
        setVerificationStatus("Error: Unable to verify OTP.");
      }
    } catch (error) {
      // Handle network error or other errors
      setVerificationStatus("Error: " + error.message);
    }
  };

  return (
    <div className="inner_page profile_page">
      <div className="full_container">
        <div className="inner_container">
          <nav id="sidebar">
            <div className="sidebar_blog_1">
              <div className="sidebar-header">
                <div className="logo_section">
                  <a href="index.html">
                    <img className="logo_icon img-responsive" src={logo} alt="#" />
                  </a>
                </div>
              </div>
              <div className="sidebar_user_info">
                <div className="icon_setting"></div>
                <div className="user_profle_side">
                  <div className="user_img">
                    <img className="img-responsive" src={user} alt="#" />
                  </div>
                  <div className="user_info">
                    <h6>John David</h6>
                    <p>
                      <span className="online_animation"></span> Online
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar_blog_2">
              <h4>General</h4>
              <ul className="list-unstyled components">
                <LeftNavigation />
              </ul>
            </div>
          </nav>
          <div id="content">
            <div className="topbar">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="full">
                  <button type="button" id="sidebarCollapse" className="sidebar_toggle">
                    {/* <i className="fa fa-bars"></i> */}
                    <FontAwesomeIcon icon={faBars} style={{ color: "#fafcff" }} />
                  </button>
                  <div className="logo_section">
                    <a href="index.html">
                      <img className="img-responsive" src={logo} alt="#" />
                    </a>
                  </div>
                  <div className="right_topbar">
                    <div className="icon_info">
                      <ul>
                        <li>
                          <a href="#">
                            {/* <i className="fa fa-bell-o"></i> */}
                            <FontAwesomeIcon
                              icon={faBell}
                              style={{
                                color: "#edeff3",
                                backgroundcolor: "transparent",
                                fontweight: "400",
                              }}
                            />
                            <span className="badge">2</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            {/* <i className="fa fa-question-circle"></i> */}
                            <FontAwesomeIcon
                              icon={faCircleQuestion}
                              style={{ "--fa-secondary-color": "#e7ecf3" }}
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            {/* <i className="fa fa-envelope-o"></i> */}
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className="badge">3</span>
                          </a>
                        </li>
                      </ul>

                      <ul className="user_profile_dd" id="user_prof">
                        <li>
                          <a className>
                            <img className="img-responsive rounded-circle" src={user} alt="#" />
                          </a>

                          <DropdownButton
                            className="user-title"
                            id="dropdown-item-button"
                            title="John David"
                          >
                            <a href="#">
                              <Dropdown.Item as="button">My Profile</Dropdown.Item>
                            </a>
                            <a href="#">
                              {" "}
                              <Dropdown.Item as="button">Settings</Dropdown.Item>
                            </a>
                            <a href="#">
                              {" "}
                              <Dropdown.Item as="button">Help</Dropdown.Item>
                            </a>
                            <a href="#">
                              {" "}
                              <Dropdown.Item as="button">
                                Log Out
                                <FontAwesomeIcon className="ml-1" icon={faRightFromBracket} />
                              </Dropdown.Item>
                            </a>
                          </DropdownButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <div className="change_form container">
              <form onSubmit={handleGetOTP}>
                <fieldset>
                  <div className="fields">
                    <label className="label_fieldswidth">Mobile Number: </label>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                      required
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <br />
                  <div className="field margin_otp">
                    <button type="submit" className="main_btnone ">
                      Get OTP
                    </button>
                  </div>
                </fieldset>
              </form>

              {verificationStatus && <p>{verificationStatus}</p>}

              <form className="forms" onSubmit={handleVerifyOTP}>
                <fieldset>
                  <div className="fields">
                    <label className="label_fields">OTP: </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOTPChange}
                      required
                      placeholder="Enter otp"
                    />
                  </div>
                  <br />
                  <div className="field margin_otp">
                    <button type="submit" className="main_bt">
                      Verify OTP
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPForm;
