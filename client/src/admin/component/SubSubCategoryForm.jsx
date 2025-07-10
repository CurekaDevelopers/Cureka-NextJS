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
const SubSubCategoryForm = () => {
  const [subSubCategory, setSubSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [concernStatus, setConcernStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "subSubCategory") setSubSubCategory(value);
    else if (name === "description") setDescription(value);
    else if (name === "status") setStatus(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subSubCategory", subSubCategory);
    formData.append("description", description);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post("/sub-sub-categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        // Concern post created successfully
        setConcernStatus("Concern post created successfully.");
      } else {
        // Handle error response
        setConcernStatus("Error: Unable to create concern post.");
      }
    } catch (error) {
      // Handle network error or other errors
      setConcernStatus("Error: " + error.message);
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
              <form onSubmit={handleFormSubmit}>
                <fieldset>
                  <div className="fields">
                    <label className="label_fieldssub">Sub Sub Category: </label>
                    <input
                      type="text"
                      name="subSubCategory"
                      value={subSubCategory}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="fields">
                    <label className="label_fieldssub">Description: </label>
                    <input
                      name="description"
                      value={description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="fields">
                    <label className="label_fieldssub">Status: </label>
                    <input
                      type="text"
                      name="status"
                      value={status}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="fieldschange">
                    <label className="label_fields">Image: </label>
                    <input
                      className="image-space"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <br />
                  <div className="field margin_btn">
                    <button type="submit" className="main_bt">
                      Submit Concern
                    </button>
                  </div>
                </fieldset>
              </form>
              {concernStatus && <p>{concernStatus}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubSubCategoryForm;
