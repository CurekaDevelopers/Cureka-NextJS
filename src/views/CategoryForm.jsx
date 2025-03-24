import { useState } from "react";
import api from "../utils/api.utils";

const CategoryForm = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [concernStatus, setConcernStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") setCategory(value);
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
    formData.append("category", category);
    formData.append("description", description);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post("/categories", formData, {
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
          {/* <nav id="sidebar">
            <div className="sidebar_blog_1">
              <div className="sidebar-header">
                <div className="logo_section">
                  <a href="index.html">
                    <img
                      className="logo_icon img-responsive"
                      src={logo}
                      alt="#"
                    />
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
          </nav> */}
          <div id="content1">
            {/* <div className="topbar">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="full">
                  <button
                    type="button"
                    id="sidebarCollapse"
                    className="sidebar_toggle"
                  >
                    
                    <FontAwesomeIcon
                      icon={faBars}
                      style={{ color: "#fafcff" }}
                    />
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
                            
                            <FontAwesomeIcon
                              icon={faCircleQuestion}
                              style={{ "--fa-secondary-color": "#e7ecf3" }}
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className="badge">3</span>
                          </a>
                        </li>
                      </ul>

                      <ul className="user_profile_dd" id="user_prof">
                        <li>
                          <a className>
                            <img
                              className="img-responsive rounded-circle"
                              src={user}
                              alt="#"
                            />
                          </a>

                          <DropdownButton
                            className="user-title"
                            id="dropdown-item-button"
                            title="John David"
                          ><a href="#">
                            <Dropdown.Item as="button">
                              My Profile
                            </Dropdown.Item></a>
                            <a href="#"> <Dropdown.Item as="button">Settings</Dropdown.Item></a>
                            <a href="#">  <Dropdown.Item as="button">Help</Dropdown.Item></a>
                            <a href="#">  <Dropdown.Item as="button">
                              Log Out
                              <FontAwesomeIcon
                                className="ml-1"
                                icon={faRightFromBracket}
                              />
                            </Dropdown.Item></a>
                          </DropdownButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div> */}
            <div className="change_form container">
              <form onSubmit={handleFormSubmit}>
                <fieldset>
                  <div className="fields">
                    <label className="label_fields">Category: </label>
                    <input
                      type="text"
                      name="category"
                      value={category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="fields">
                    <label className="label_fields">Description: </label>
                    <input
                      name="description"
                      value={description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="fields">
                    <label className="label_fields">Status: </label>
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

export default CategoryForm;
