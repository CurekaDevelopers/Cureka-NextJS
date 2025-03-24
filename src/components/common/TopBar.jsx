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
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import user from "../images/layout_img/user_img.jpg";
import logo from "../images/logo/Logo.png";

export default function TopBar() {
  const navigate = useRouter();
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page or another appropriate page
    navigate.push("/admin/ogin");
  };
  return (
    <div className="topbar">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="full">
          <button type="button" id="sidebarCollapse" className="sidebar_toggle">
            {/* <i class="fa fa-bars"></i> */}
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
                    {/* <i class="fa fa-bell-o"></i> */}
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
                    {/* <i class="fa fa-question-circle"></i> */}
                    <FontAwesomeIcon
                      icon={faCircleQuestion}
                      style={{ "--fa-secondary-color": "#e7ecf3" }}
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    {/* <i class="fa fa-envelope-o"></i> */}
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
                  >
                    <a href="/admin/profile">
                      <Dropdown.Item as="button">My Profile</Dropdown.Item>
                    </a>
                    {/* <a href="/admin/settings">
                      <Dropdown.Item as="button">Settings</Dropdown.Item>
                    </a>
                    <a href="/admin/help">
                      <Dropdown.Item as="button">Help</Dropdown.Item>
                    </a> */}
                    <a href="#">
                      <Dropdown.Item as="button" onClick={handleLogout}>
                        Log Out
                        <FontAwesomeIcon
                          className="ml-1"
                          icon={faRightFromBracket}
                        />
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
  );
}
