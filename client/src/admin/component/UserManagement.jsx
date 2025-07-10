import { useEffect, useState } from "react";
import user from "../../admin/images/layout_img/user_img.jpg";
import logo from "../../assets/images/Logo.png";
import api from "../../utils/api.utils";
import LeftNavigation from "../LeftNavigation";
import TopBar from "../common/TopBar";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users"); // Replace with your actual API endpoint
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      // Perform the delete request
      await api.delete(`your-api-endpoint/users/${userId}`); // Replace with your actual API endpoint
      // Update the state to reflect the deleted user
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
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
            <TopBar />
            <div className="container mt-5">
              <h2>User Management</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
