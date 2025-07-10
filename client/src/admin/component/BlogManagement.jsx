import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import api from "../../utils/api.utils";
import LeftNavigation from "../LeftNavigation";
import TopBar from "../common/TopBar";
import user from "../images/layout_img/user_img.jpg";
import logo from "../images/logo/Logo.png";
import BlogPostForm from "./BlogPostForm";
import EditBlog from "./EditBlog";

const BlogManagement = () => {
  const [blogsList, setBlogList] = useState();
  const [createBlog, setCreateBlog] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const handleDataFromChild = (data) => {
    setCreateBlog(data);
    setEditForm(data);
  };

  useEffect(() => {
    const getBlogList = async () => {
      const response = await api.get("/list-blog");
      setBlogList(response.data);
    };
    getBlogList();
  }, []);

  const deleteBlog = async (blogId) => {
    // setEditForm(true);
    try {
      // Perform the delete request
      const response = await api.delete(`/delete-blog/${blogId}`);
      console.log(response, "del");
      if (response.status === 200) {
        setShow(true);
        setMsg(response.data.message);
        setBlogList(blogsList.filter((blog) => blog.id !== blogId));
      } else {
        setShow(false);
        setMsg(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  const editBlog = async (blogId) => {
    setSelectedBlogId(blogId);
    setEditForm(true);
    setCreateBlog(false);
    // try {
    //   // Perform the delete request
    //   await api.put(`/update-blog/${blogId}`); // Replace with your actual API endpoint
    //   // Update the state to reflect the deleted blog
    //   setBlogList(blogsList.filter((blog) => blog.id !== blogId));
    // } catch (error) {
    //   console.error("Error deleting blog:", error);
    // }
  };

  return (
    <>
      {/* <Header /> */}
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
                            >
                              <a href="#">
                                <Dropdown.Item as="button">
                                  My Profile
                                </Dropdown.Item>
                              </a>
                              <a href="#">
                                <Dropdown.Item as="button">
                                  Settings
                                </Dropdown.Item>
                              </a>
                              <a href="#">
                                <Dropdown.Item as="button">Help</Dropdown.Item>
                              </a>
                              <a href="#">
                                <Dropdown.Item as="button">
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
              </div> */}
              <TopBar />
              <div className="mh-100">
                <Navbar bg="light" expand="lg">
                  <Container>
                    <Navbar.Brand href="#home">Create Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                  </Container>
                </Navbar>

                <Container fluid>
                  <Row>
                    <Col
                      xs={11}
                      // style={{
                      //   padding: "20px",
                      //   marginTop: "200px",
                      //   marginLeft: "",
                      // }}
                    >
                      {msg && show ? (
                        <>
                          <div className="alert alert-success alert-dismissible mt-4">
                            <button type="button" className="close" data-dismiss="alert">
                              &times;
                            </button>
                            <strong>Success!</strong> {msg}
                          </div>
                        </>
                      ) : null}
                      {msg && !show && (
                        <>
                          <div className="alert alert-success alert-dismissible mt-4">
                            <button type="button" className="close" data-dismiss="alert">
                              &times;
                            </button>
                            <strong>Error!</strong> {msg}
                          </div>
                        </>
                      )}
                      {createBlog ? (
                        <BlogPostForm sendDataToParent={handleDataFromChild} />
                      ) : (
                        <div>
                          <button
                            className="btn main_bt btn-sm float-right mb-2"
                            onClick={() => setCreateBlog(true)}
                          >
                            Create New
                          </button>
                          {editForm ? (
                            <EditBlog
                              blogId={selectedBlogId}
                              sendDataToParent={handleDataFromChild}
                            />
                          ) : (
                            <table className="table table-striped mt-3">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Title</th>
                                  <th>Date</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {blogsList &&
                                  blogsList.map((blog) => (
                                    <tr key={blog.id}>
                                      <td>{blog.id}</td>
                                      <td>{blog.title}</td>
                                      <td>
                                        {new Date(blog.blog_date)
                                          .toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                          })
                                          .replace(/\//g, "-")}
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-danger btn-sm"
                                          onClick={() => editBlog(blog.id)}
                                        >
                                          <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                          className="btn btn-danger btn-sm"
                                          onClick={() => deleteBlog(blog.id)}
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                </Container>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogManagement;
