import { useState } from "react";

import {
  faBars,
  faBell,
  faCircleQuestion,
  faEnvelope,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import user from "../../admin/images/layout_img/user_img.jpg";
import logo from "../../assets/images/Logo.png";
import api from "../../utils/api.utils";
import LeftNavigation from "../LeftNavigation";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeStatus, setChangeStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate that new password and confirm password match
    if (newPassword !== confirmPassword) {
      setChangeStatus("Error: New password and confirm password do not match.");
      return;
    }

    try {
      const response = await api.post("/change-password", {
        headers: {
          key: "Content-Type",
          value: "application/json",
          type: "default",
        },
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        // Password changed successfully
        setChangeStatus("Password changed successfully.");
      } else {
        // Handle error response
        setChangeStatus("Error: Unable to change password.");
      }
    } catch (error) {
      // Handle network error or other errors
      setChangeStatus("Error: " + error.message);
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
              <form onSubmit={handleFormSubmit}>
                <fieldset>
                  <div className="fields">
                    <label className="label_fields">Old Password :</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter old password"
                    />
                  </div>
                  <br />
                  <div className="fields">
                    <label className="label_fields">New Password : </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter new password"
                    />
                  </div>
                  <br />
                  <div className="fields">
                    <label className="label_fields">Confirm New Password : </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Re-enter new password"
                    />
                  </div>

                  <br />
                  <div className="field margin_btn">
                    <button className="main_bt">Submit</button>
                  </div>
                </fieldset>
              </form>
            </div>
            {changeStatus && <p>{changeStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
